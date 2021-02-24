package com.xr.service.impl;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.Session;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xr.controller.WebSocketController;
import com.xr.dao.FP_ConsumeRecordMapper;
import com.xr.dao.FacePayCallBackMapper;
import com.xr.entity.HY_MeetingSummary;
import com.xr.service.FacePayCallBackService;
import com.xr.service.FacePayRecordService;
import com.xr.util.DownloadFile;
import com.xr.util.FacePayDevice;
import com.xr.util.FilePathCreate;
import com.xr.util.FtpUtil;

@Service
public class FacePayCallBackServiceImpl implements FacePayCallBackService {

	@Autowired
	private FacePayCallBackMapper facePayMapper;
	
	@Autowired
	private FacePayRecordService facePayRecordService;
	
	@Autowired
	private FP_ConsumeRecordMapper consumeDataMapper;
	
	/**
	 * 人脸比对回调接口
	 */
	@Override
	public void identifyCallBack(Map<String, Object> map) throws Exception {
		if(!map.get("passTimeType").toString().equals("1")){//时间权限验证
			return;
		}
		
		if(!map.get("type").toString().endsWith("_0")){
			return;
		}
		
		//时间戳转时间字符串
		String faceTime = getTime(map.get("time").toString());
		Map<String,Object> restaurantInfo = facePayMapper.getRestaurantInfo(map);//根据设备SN获取设备归属餐厅
		Map<String,Object> roleInfo = facePayMapper.getRoleInfo(map);//根据人员获取人员身份
		map.put("consumeRoleID", roleInfo.get("consumeRoleID"));
		map.put("restaurantID", restaurantInfo.get("restaurantID"));
		map.put("faceTime", faceTime.substring(faceTime.indexOf(" ")).replaceAll(":", ""));
		Map<String,Object> timeInfo = facePayMapper.getTimeInfo(map);//根据餐厅、时间、身份获取餐次
		
		//上传消费记录
		int b = saveRecord(map,restaurantInfo,roleInfo,timeInfo);
		
		//上传图片
		if(b>=0){
			uploadRecordPhoto(b,map);
		}
		
		//刷脸/打卡成功，更新账户余额
		map.put("consumeAccount", timeInfo.get("amount"));
		int c = updateAccountBalance(map);
		
		//数据推送至页面
		pushInfoToPage(map,faceTime,b);
		
		//删除设备消费记录
		Map<String,Object> result1 = deltDeviceRecord(map);
		
		//根据余额更新人员在设备的时间权限与名称
		//updateDeviceTimeInfo(map,timeInfo);
	}
	
	/**
	 * 根据余额更新人员在设备的时间权限与名称
	 * @param map
	 * @param timeInfo
	 * @throws Exception
	 */
	private void updateDeviceTimeInfo(Map<String, Object> map,Map<String, Object> timeInfo) throws Exception {
		//获取账户当前余额
		Map<String,Object> accountInfo = facePayMapper.getAccountInfo(map);//根据holderNo获取账户信息
		System.out.println(accountInfo.get("Balance").toString());
		if(timeInfo != null)
		if(Double.valueOf(accountInfo.get("Balance").toString()) < Double.valueOf(timeInfo.get("amount").toString())){//如果账户余额小于下次消费金额
			//更新设备人员的名字为“余额不足”
			Map<String, Object> voiceMap = updateDeviceVoice(map);
			
			//删除时间权限
			Map<String, Object> delTimeMap = delDeviceTime(map);
			
			//重新添加人员时间权限
			Map<String, Object> timeMap = updateDeviceTime(map);
		}
	}

	/**
	 * 删除人员在设备上的时间权限
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private Map<String, Object> delDeviceTime(Map<String, Object> map) throws Exception {
		map.put("data", map.get("deviceKey"));
		Map<String,Object> deviceInfo = facePayRecordService.getDeviceInfoWithSn(map);
		
		Map<String,Object> pramMap = new HashMap<String,Object>();
		pramMap.put("personId", map.get("personId"));
		pramMap.put("pass", deviceInfo.get("password"));
		Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("ip").toString()+":8090/person/deletePasstime", pramMap,"POST");
		return resultMap;
	}

	/**
	 * 添加人员在设备的时间权限："00:00:01,00:00:02"
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private Map<String, Object> updateDeviceTime(Map<String, Object> map) throws Exception {
		map.put("data", map.get("deviceKey"));
		Map<String,Object> deviceInfo = facePayRecordService.getDeviceInfoWithSn(map);
		Map<String,Object> passtime = new HashMap<String,Object>();
		passtime.put("personId", map.get("personId"));
		passtime.put("passtime", "00:00:01,00:00:02");
		
		Map<String,Object> pramMap = new HashMap<String,Object>();
		pramMap.put("passtime", passtime);
		pramMap.put("pass", deviceInfo.get("password"));
		Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("ip").toString()+":8090/person/createPasstime", pramMap,"POST");
		return resultMap;
	}

	/**
	 * 更新人员在设备的名称："余额不足"
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private Map<String, Object> updateDeviceVoice(Map<String, Object> map) throws Exception {
		map.put("data", map.get("deviceKey"));
		Map<String,Object> deviceInfo = facePayRecordService.getDeviceInfoWithSn(map);
		Map<String,Object> personMap = new HashMap<String,Object>();
		personMap.put("id", map.get("personId"));
		personMap.put("name", "余额不足！");
		
		Map<String,Object> pramMap = new HashMap<String,Object>();
		pramMap.put("person", personMap);
		pramMap.put("pass", deviceInfo.get("password"));
		Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("ip").toString()+":8090/person/update", pramMap,"POST");
		return resultMap;
	}

	/**
	 * 更新账户余额
	 * @param map
	 * @return
	 */
	private int updateAccountBalance(Map<String, Object> map) {
		int c= facePayMapper.updateAccountBalance(map);
		return c;
	}

	/**
	 * 推送数据至页面
	 * @param map
	 * @param faceTime
	 * @param b
	 */
	private void pushInfoToPage(Map<String, Object> map,String faceTime,int b) {
		WebSocketController wk = new WebSocketController();
		Session session = null;
		Map<String,Object> socketMap = new HashMap<String,Object>();
		socketMap.put("holderNo", map.get("personId"));
		socketMap.put("faceTime", faceTime);
		socketMap.put("fid", b);
		List<Map<String,Object>> faceList = consumeDataMapper.getConsumeList(socketMap);
		for(int j=0;j<faceList.size();j++){
			String oneInfo = JSON.toJSONString(faceList.get(j));
			wk.onMessage(oneInfo, session);
		}
	}

	/**
	 * 记录保存成功后删除设备对应的记录
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private Map<String, Object> deltDeviceRecord(Map<String,Object> map) throws Exception {
		map.put("data", map.get("deviceKey"));
		Map<String,Object> deviceInfo = facePayRecordService.getDeviceInfoWithSn(map);
		Map<String,Object> pramMap = new HashMap<String,Object>();
		pramMap.put("pass", deviceInfo.get("password"));
		pramMap.put("personId", map.get("personId"));
		pramMap.put("startTime", Long.parseLong(map.get("time").toString()));
		pramMap.put("endTime", Long.parseLong(map.get("time").toString())+1);
		Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("ip").toString()+":8090/newDeleteRecordsByUnixTime", pramMap,"POST");
		return resultMap;
	}

	/**
	 * 上消费记录
	 * @param map
	 * @return
	 * @throws ParseException
	 */
	private int saveRecord(Map<String, Object> map,Map<String, Object> restaurantInfo,Map<String, Object> roleInfo,Map<String, Object> timeInfo) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		Map<String,Object> recordMap = new HashMap<String,Object>();
		String faceTimeID = "";
		
		//判断时间是否为空，为空则
		if(timeInfo == null){
			faceTimeID = "-1";
		}else{
			faceTimeID = timeInfo.get("fid").toString();
		}
		
		//消费人员结果
		String consumeResult="";
		if(map.get("type").toString().endsWith("_0")){//刷脸/卡成功
			consumeResult = "消费成功！";
		}else if(map.get("type").toString().endsWith("_1")){//刷脸/卡失败
			consumeResult = "时间权限不足";
		}else if(map.get("type").toString().endsWith("_2")){//陌生人
			consumeResult = "陌生人！";
		}
		
		recordMap.put("holderNo", map.get("personId"));//人员ID
		recordMap.put("consumeDate", getTime(map.get("time").toString()));//刷脸时间
		recordMap.put("consumeTime", getTime(map.get("time").toString()));//刷脸时间
		recordMap.put("restauRantID", restaurantInfo.get("restaurantID"));//刷脸餐厅
		recordMap.put("consumeTimeID", faceTimeID);//餐次ID
		recordMap.put("consumeTypeID", roleInfo.get("consumeRoleID"));//身份ID
		recordMap.put("acccountID", roleInfo.get("holderAccountID"));//消费账户ID
		recordMap.put("payType", "1");//消费方式
		recordMap.put("faceType", consumeResult);
		
		int b = facePayMapper.saveRecord(recordMap);//上传消费记录
		return b;
	}

	/**
	 * 上传消费图片
	 * @param b
	 * @param map
	 * @throws IOException
	 */
	private void uploadRecordPhoto(int b,Map<String, Object> map) throws IOException {
		//path=ftp://192.168.2.197:8010/IdentifyRecords/2020-03-28/10/spot-20200328_103818_580_0014.jpg
		String[] ftpPath = map.get("path").toString().substring(6).split("/");
		String hostname = ftpPath[0].substring(0, ftpPath[0].indexOf(":"));//"192.168.2.197";
        int port = 8010;
        String username = "ftp";
        String password = "";
        String pathname = "";
        for(int i=1;i<ftpPath.length-1;i++){
        	pathname = pathname+"/"+ftpPath[i];
        }
        String filename = ftpPath[ftpPath.length-1];//图片名称
        String localpath = "";//图片保存路径
        
        Properties properties = new Properties();
		properties = PropertiesLoaderUtils.loadAllProperties("loadParm.properties");
		String basePath = (String) properties.get("filePath");
		localpath = basePath+"\\UfacePhoto\\"+ftpPath[2];
		boolean b2 = FilePathCreate.checkExist(localpath);
		if(!b2){
			FilePathCreate.createPath(localpath);
		}
		
        FtpUtil.downloadFile(hostname, port, username, password, pathname, filename, localpath);
        
        //图片上传完成，保存图片至数据库表
        File file = new File(localpath+"\\"+filename);//读取图片
        byte[] fileByte = Files.readAllBytes(file.toPath());
        
        Map<String,Object> photoParm = new HashMap<String,Object>();
        photoParm.put("ConsumeDataID", b);
        photoParm.put("photo", fileByte);
        photoParm.put("path", localpath+"\\"+filename);
        facePayMapper.saveRecordPhoto(photoParm);
	}

	/**
	 * 根据时间戳获取时间
	 * @param time
	 * @return
	 * @throws ParseException
	 */
	public static String getTime(String time) throws ParseException{
		 String res;
	     SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	     long lt = new Long(time);
	     Date date = new Date(lt);
	     res = simpleDateFormat.format(date);
	     return res;
	}
	
	
	
	public static void main(String[] args) throws ParseException {
		String time = getTime("1585273669375");
		System.out.println(time);
		System.out.println(time.substring(time.indexOf(" ")).replaceAll(":", ""));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		System.out.println(sdf.format(new Date(Long.valueOf("1585273669375"))));
	}
	
}
