package com.xr.service.impl;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xr.controller.WebSocketController;
import com.xr.dao.AEFServiceMapper;
import com.xr.service.AEFServiceService;
import com.xr.util.AESUtil;
import com.xr.util.FilePathCreate;

import sun.misc.BASE64Encoder;

@Service
public class AEFServiceServiceImpl implements AEFServiceService {

	private static final File InputStream = null;
	@Autowired
	private AEFServiceMapper aefServiceMapper;
	
	/**
	 * 根据设备SN号获取对应的组织架构
	 */
	@Override
	public List<Map<String, Object>> getGroupList(String s) {
		com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("deviceSn", jsonObject.get("deviceSn"));
		List<Map<String, Object>> list = aefServiceMapper.getGroupList(param);
		return list;
	}
	
	/**
	 * 获取访客的组织架构
	 */
	@Override
	public List<Map<String, Object>> getGroupListVistors(String s) {
		com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("deviceSn", jsonObject.get("deviceSn"));
		List<Map<String, Object>> list2 = aefServiceMapper.getGroupListVistors(param);
		return list2;
	}
	
	/**
	 * 获取自助登记的组织架构
	 */
	@Override
	public List<Map<String, Object>> getGroupListVistorsWX(String s) {
		com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("deviceSn", jsonObject.get("deviceSn"));
		List<Map<String, Object>> list2 = aefServiceMapper.getGroupListVistorsWX(param);
		return list2;
	}

	/**
	 * 根据组织架构ID获取对应的人员列表
	 * @throws ParseException 
	 */
	@Override
	public List<Map<String, Object>> getHolderList(com.alibaba.fastjson.JSONObject s) throws ParseException {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("departmentNo", s.get("groupId"));
		param.put("deviceSn", s.get("deviceSn"));
		List<Map<String, Object>> list = aefServiceMapper.getHolderList(param);
		//日期字段转换为时间戳（CreateDate，UpdateDate）
		for(int i=0;i<list.size();i++){
			String CreateDate = list.get(i).get("CreateDate").toString();
			String UpdateDate = list.get(i).get("UpdateDate").toString();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date upDate = simpleDateFormat.parse(UpdateDate);
	        Date crDate = simpleDateFormat.parse(CreateDate);
	        long upts = upDate.getTime();
	        long crts = crDate.getTime();
			list.get(i).put("CreateDate", crts);
			list.get(i).put("UpdateDate", upts);
		}
		return list;
	}
	
	/**
	 * 根据访客组，获取访客列表
	 * @throws ParseException 
	 */
	@Override
	public List<Map<String, Object>> getHolderListVistors(JSONObject s) throws ParseException {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("departmentNo", s.get("groupId"));
		param.put("deviceSn", s.get("deviceSn"));
		List<Map<String, Object>> list = aefServiceMapper.getHolderListVistors(param);
		List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
		
		for(int i=0;i<list.size();i++){
			if(list.get(i).get("limitType") != null && list.get(i).get("limitType").toString().equals("1")){
				String startDate = list.get(i).get("startDate").toString();
				String endDate = list.get(i).get("endDate").toString();
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
				String thisDate = df.format(new Date());
				if(thisDate.compareTo(startDate) >= 0 && thisDate.compareTo(endDate) <= 0){
					list2.add(list.get(i));
					continue;
				}
			}else if(list.get(i).get("limitType") != null && list.get(i).get("limitType").toString().equals("2")){
				if(list.get(i).get("limitCount") != null && (Integer.valueOf(list.get(i).get("limitCount").toString()) > 0)){
					list2.add(list.get(i));
					continue;
				}
			}if(list.get(i).get("limitType") != null && list.get(i).get("limitType").toString().equals("3")){
				if(list.get(i).get("limitCount") != null && (Integer.valueOf(list.get(i).get("limitCount").toString()) > 0)){
					list2.add(list.get(i));
					continue;
				}
			}
		}
		//日期字段转换为时间戳（CreateDate，UpdateDate）
		for(int i=0;i<list2.size();i++){
			String CreateDate = list2.get(i).get("CreateDate").toString();
			String UpdateDate = list2.get(i).get("UpdateDate").toString();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date upDate = simpleDateFormat.parse(UpdateDate);
	        Date crDate = simpleDateFormat.parse(CreateDate);
	        long upts = upDate.getTime();
	        long crts = crDate.getTime();
			list2.get(i).put("CreateDate", crts);
			list2.get(i).put("UpdateDate", upts);
		}
		return list2;
	}
	
	/**
	 * 根据组织架构获取，获取自助登记人员列表
	 */
	@Override
	public List<Map<String, Object>> getHolderListVistorsWX(JSONObject s) throws ParseException {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("departmentNo", s.get("groupId"));
		param.put("deviceSn", s.get("deviceSn"));
		List<Map<String, Object>> list = aefServiceMapper.getHolderListVistorsWX(param);
		//日期字段转换为时间戳（CreateDate，UpdateDate）
		for(int i=0;i<list.size();i++){
			String CreateDate = list.get(i).get("CreateDate").toString();
			String UpdateDate = list.get(i).get("UpdateDate").toString();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date upDate = simpleDateFormat.parse(UpdateDate);
	        Date crDate = simpleDateFormat.parse(CreateDate);
	        long upts = upDate.getTime();
	        long crts = crDate.getTime();
			list.get(i).put("CreateDate", crts);
			list.get(i).put("UpdateDate", upts);
		}
		return list;
	}

	/**
	 * 根据用户ID获取人员详细信息
	 * 用户ID是多个，以逗号分割的字符串
	 */
	@Override
	public List<Map<String, Object>> groupUser(JSONObject s) throws ParseException {
		Map<String,Object> param = new HashMap<String, Object>();
		//param.put("departmentNo", s.get("groupId"));
		param.put("holderNos", ("'"+s.get("userIds")+"'").replaceAll(",", "','"));
		List<Map<String, Object>> list = aefServiceMapper.groupUser(param);//获取用户列表
		//获取人员的时间权限列表
		//日期字段转换为时间戳（CreateDate，UpdateDate）
		for(int i=0;i<list.size();i++){
			String CreateDate = list.get(i).get("CreateDate").toString();
			String UpdateDate = list.get(i).get("UpdateDate").toString();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date upDate = simpleDateFormat.parse(UpdateDate);
	        Date crDate = simpleDateFormat.parse(CreateDate);
	        long upts = upDate.getTime();
	        long crts = crDate.getTime();
			list.get(i).put("CreateDate", crts);
			list.get(i).put("UpdateDate", upts);
		}
		return list;
	}
	
	/**
	 * 根据访客ID获取访客人员详细信息
	 */
	@Override
	public List<Map<String, Object>> groupUserVistors(JSONObject s) throws ParseException {
		Map<String,Object> param = new HashMap<String, Object>();
		//param.put("departmentNo", s.get("groupId"));
		param.put("holderNos", ("'"+s.get("userIds")+"'").replaceAll(",", "','"));
		List<Map<String, Object>> list = aefServiceMapper.groupUserVistors(param);//获取用户列表
		//获取人员的时间权限列表
		//日期字段转换为时间戳（CreateDate，UpdateDate）
		for(int i=0;i<list.size();i++){
			String CreateDate = list.get(i).get("CreateDate").toString();
			String UpdateDate = list.get(i).get("UpdateDate").toString();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date upDate = simpleDateFormat.parse(UpdateDate);
	        Date crDate = simpleDateFormat.parse(CreateDate);
	        long upts = upDate.getTime();
	        long crts = crDate.getTime();
			list.get(i).put("CreateDate", crts);
			list.get(i).put("UpdateDate", upts);
		}
		return list;
	}
	
	/**
	 * 获取自主登记人员详细信息
	 */
	@Override
	public List<Map<String, Object>> groupUserVistorsWX(JSONObject s) throws ParseException {
		Map<String,Object> param = new HashMap<String, Object>();
		//param.put("departmentNo", s.get("groupId"));
		param.put("holderNos", ("'"+s.get("userIds")+"'").replaceAll(",", "','"));
		List<Map<String, Object>> list = aefServiceMapper.groupUserVistorsWX(param);//获取用户列表
		//获取人员的时间权限列表
		//日期字段转换为时间戳（CreateDate，UpdateDate）
		for(int i=0;i<list.size();i++){
			String CreateDate = list.get(i).get("CreateDate").toString();
			String UpdateDate = list.get(i).get("UpdateDate").toString();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date upDate = simpleDateFormat.parse(UpdateDate);
	        Date crDate = simpleDateFormat.parse(CreateDate);
	        long upts = upDate.getTime();
	        long crts = crDate.getTime();
			list.get(i).put("CreateDate", crts);
			list.get(i).put("UpdateDate", upts);
		}
		return list;
	}
	
	/**
	 * 下载图片
	 * 人员信息同步完成后同步人员的注册照
	 */
	@Override
	public Map<String, Object> getImagePath(JSONObject jsonObject) {
		Map<String,Object> paraMap = new HashMap<String,Object>();
		paraMap.put("avatarId", jsonObject.get("avatarId"));
		Map<String, Object> oneInfo = aefServiceMapper.getImagePath(paraMap);
		return oneInfo;
	}
	
	/**
	 * 下载图片信息（访客）
	 */
	@Override
	public Map<String, Object> getImagePathVisitors(JSONObject jsonObject) {
		Map<String,Object> paraMap = new HashMap<String,Object>();
		paraMap.put("avatarId", jsonObject.get("avatarId"));
		Map<String, Object> oneInfo = aefServiceMapper.getImagePathVisitors(paraMap);
		return oneInfo;
	}

	/**
	 * 下载图片信息（自助登记）
	 */
	@Override
	public Map<String, Object> getImagePathVisitorsWX(JSONObject jsonObject) {
		Map<String,Object> paraMap = new HashMap<String,Object>();
		paraMap.put("avatarId", jsonObject.get("avatarId"));
		Map<String, Object> oneInfo = aefServiceMapper.getImagePathVisitorsWX(paraMap);
		return oneInfo;
	}
	
	/**
	 * 根据设备SN获取设备信息
	 * @throws ParseException 
	 */
	@Override
	public Map<String, Object> getOneDeviceInfo(Map<String, Object> deviceParm) throws ParseException {
		//根据设备sn获取设备信息
		Map<String,Object> deviceInfo = aefServiceMapper.getOneDeviceInfo(deviceParm);
		String updateTime2 = deviceInfo.get("updateTime").toString();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date upDate = simpleDateFormat.parse(updateTime2);
        long upts = upDate.getTime();
		deviceInfo.put("updateTime2", upts);
		return deviceInfo;
	}
	
	/**
	 * 上传通行记录
	 * @throws IOException 
	 */
	@Override
	public int saveRecord(JSONObject jsonObject,HttpServletResponse resp) throws IOException {
		//根据设备sn获取设备信息
		Map<String,Object> deviceParm = new HashMap<String,Object>();
		deviceParm.put("deviceSn", jsonObject.get("deviceSn"));
		Map<String,Object> deviceInfo = aefServiceMapper.getOneDeviceInfo(deviceParm);//获取设备信息
		
		//根据卡号获取卡ID
		Map<String,Object> cardInfo = null;
		if(jsonObject.get("icNumber") != null && !jsonObject.get("icNumber").equals("")){
			Map<String,Object> cardParm = new HashMap<String,Object>();
			String ten = jsonObject.get("icNumber").toString().trim();
			System.out.println(ten);
			String hex= Long.toHexString(Long.parseLong(ten));//10进制转16进制
			while(hex.length() != 16){
				hex = "0"+hex;
			}
			cardParm.put("CardNo", hex);
			cardInfo = aefServiceMapper.getOneCardInfo(cardParm);
		}
		
		//进出时间戳转换为时间
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String IODate = sdf.format(new Date(Long.parseLong(String.valueOf(jsonObject.get("signTime")))));
		String IOTime = IODate.substring(IODate.indexOf(" ")+1);
		String IOStatus = "";
		if(deviceInfo.get("IOStatus") != null && deviceInfo.get("IOStatus").toString().equals("1")){
			IOStatus = "进入";
		}else{
			IOStatus = "外出";
		}
		
		Map<String ,Object> parmMap = new HashMap<String,Object>();
		parmMap.put("companyId", jsonObject.get("companyId"));//公司ID
		parmMap.put("deviceSn", jsonObject.get("deviceSn"));//设备SN号
		parmMap.put("signAvatar", jsonObject.get("signAvatar"));//上传的人脸图片的ID
		parmMap.put("signBgAvatar", jsonObject.get("signBgAvatar"));//上传的背景图的ID号(没有维护该字段)
		parmMap.put("timestamp", jsonObject.get("timestamp"));//当前时间戳
		parmMap.put("token", jsonObject.get("token"));
		parmMap.put("DeviceNo", deviceInfo.get("DeviceNo"));//设备ID
		parmMap.put("DoorNo", deviceInfo.get("doorNo"));//门区ID
		if(cardInfo != null){
			parmMap.put("CardNo", cardInfo.get("CardNo"));//卡号ID
			parmMap.put("UID", cardInfo.get("CardID"));//卡内码
		}
		
		parmMap.put("HolderNo", jsonObject.get("userId"));//人员ID
		parmMap.put("IODate", IODate);//进去日期
		parmMap.put("IOTime", IOTime);//进出时间
		parmMap.put("IOStatus", "11");//11:进，12:出,目前设备表中没有维护该字段
		parmMap.put("DeviceName", deviceInfo.get("DeviceName"));//设备名称
		parmMap.put("DoorName", deviceInfo.get("DoorName"));//门区名称
		parmMap.put("HolderName", jsonObject.get("userName"));//用户名称
		parmMap.put("DeptNo", jsonObject.get("groupId"));//部门ID
		parmMap.put("DeptName", jsonObject.get("groupName"));//部门名称
		parmMap.put("IODateTime", IODate);//进出时间
		parmMap.put("IOStatusLang", IOStatus);//进出状态
		if(jsonObject.get("signAvatar") == null || jsonObject.get("signAvatar").equals("")){
			parmMap.put("OpenType", "1");
			parmMap.put("OpenTypeName", "刷卡出入");
		}else{
			parmMap.put("OpenType", "2");
			parmMap.put("OpenTypeName", "人脸识别");
		}
		
		//1、添加通行记录数据
		int b = aefServiceMapper.saveRecord(parmMap);
		//2、更新IODataPhoto字段
		parmMap.put("recordFid", b);
		int a=aefServiceMapper.updateImage(parmMap);
		
		//推送数据至武警进出监控页面
		jsonObject.put("DataNo", b);
		Map<String,Object> oneInfo = aefServiceMapper.getThisRecordWithID(jsonObject);//获取IOData的数据
		BufferedImage photo = null;
		BufferedImage basePhoto = null;
		byte[] imageInByte = null;
		byte[] imageInByte2 = null;
		if(oneInfo.get("photo") != null){
			ByteArrayInputStream in1 = new ByteArrayInputStream((byte[]) (oneInfo.get("photo")));    //将b作为输入流；
			BufferedImage image1 = ImageIO.read(in1);     //将in作为输入流，读取图片存入image中，而这里in可以为ByteArrayInputStream();
			photo = zoomOutImage(image1, 3);
			
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ImageIO.write( photo, "jpg", baos );
			baos.flush();
			imageInByte = baos.toByteArray();
			baos.close();
		}
		
		if(oneInfo.get("basePhoto") != null){
			ByteArrayInputStream in2 = new ByteArrayInputStream((byte[]) (oneInfo.get("basePhoto")));    //将b作为输入流；
			BufferedImage image2 = ImageIO.read(in2);
			basePhoto = zoomOutImage(image2, 3);
			
			ByteArrayOutputStream baos2 = new ByteArrayOutputStream();
			ImageIO.write( basePhoto, "jpg", baos2 );
			baos2.flush();
			imageInByte2 = baos2.toByteArray();
			baos2.close();
		}
		
		oneInfo.put("photo", imageInByte);
		oneInfo.put("basePhoto",imageInByte2);
		pushInfoToPage(oneInfo,b);
		return b;
	}
	
	private void pushInfoToPage(Map<String, Object> map,int b) {
		WebSocketController wk = new WebSocketController();
		Session session = null;
		String oneInfo = JSON.toJSONString(map);
		wk.onMessage(oneInfo, session);
	}
	
	public static BufferedImage zoomOutImage(BufferedImage  originalImage, Integer times){
        int width = 270;
        int height = 301;
        BufferedImage newImage = new BufferedImage(width,height,originalImage.getType());
        Graphics g = newImage.getGraphics();
        g.drawImage(originalImage, 0,0,width,height,null);
        g.dispose();
        return newImage;
    }
	
	/**
	 * 上传图片
	 * type=1：上传注册照片，设备添加人员时调用
	 * type=2：上传人脸照（人脸开门）
	 * type=3：上传背景照（人脸开门）
	 */
	@Override
	public String imageUplod(JSONObject jsonObject, MultipartFile file) throws IOException {
		String type = jsonObject.get("type").toString();
		int  photoID = 0;//保存图片的ID
		
		//获取基本路径
		Properties properties = new Properties();
		properties = PropertiesLoaderUtils.loadAllProperties("loadParm.properties");
		String basePath = (String) properties.get("filePath");
		String upLoadPath = basePath+"\\alf";//图片上传路径
		boolean b = FilePathCreate.checkExist(upLoadPath);
		if(!b){
			FilePathCreate.createPath(upLoadPath);
		}
		
		if(type.equals("1")){//设备上传人员信息时上传图，此时不上传图片
			
		}else if(type.equals("2") || type.equals("3")){//打卡上传图片，同时保存值数据库
			if(type.equals("2")){
				//上传图片
				byte[] imgByte = file.getBytes();
				String fileRealName = FilePathCreate.uploadFile(file, upLoadPath,null);//上传图片，并返回图片的名称
				
				//上传的图片信息保存至IODataPhoto中
				Map<String,Object> mapParm = new HashMap<String,Object>();
				mapParm.put("picPath", upLoadPath+"\\"+fileRealName);
				mapParm.put("photo", imgByte);
				mapParm.put("IODataID", "");
				int r = aefServiceMapper.imageUplod(mapParm);
				//获取保存图片的ID
				if(r>=0){
					photoID = aefServiceMapper.getMaxPhotoID(mapParm);
				}
			}
			
			//上传背景图片
		}
		return photoID+"";
	}
	
	/**
	 * 根据设备sn获取设备对应的门区
	 */
	@Override
	public Map<String, Object> getDoorWithAEFService(JSONObject jsonObject) {
		Map<String,Object> resultMap = aefServiceMapper.getDoorWithAEFService(jsonObject);
		return resultMap;
	}
	
	@Override
	public void updateWXVisitorsStatus(Map<String, Object> parmMap) {
		int b = aefServiceMapper.updateWXVisitorsStatus(parmMap);
	}
	
	//==========================================================设备段注册人员信息时start===============================================
	/**
	 * 人脸机注册人员时，图片上传
	 */
	@Override
	public Integer saveImagePath(JSONObject jsonObject) throws IOException {
		Properties properties = new Properties();
		//获取保存图片的基本路径
		properties = PropertiesLoaderUtils.loadAllProperties("loadParm.properties");
		String basePath = (String) properties.get("filePath");
		String uploadPath = basePath+"\\alf\\face\\upload";
		
		//图片路径保存至数据库
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("fno", jsonObject.get("avatarId"));
		paramMap.put("holderNo", jsonObject.get("userId"));
		paramMap.put("imagePath", uploadPath+"\\"+jsonObject.get("avatarId"));
		Integer b = aefServiceMapper.saveImagePath(paramMap);
		return b;
	}

	
	public static void main(String[] args) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        System.out.println(df.format(new Date()));// new Date()为获取当前系统时间
	}

	@Override
	public Map<String, Object> getOneVisitorInfoWithID(Map<String, Object> jsonObject) {
		Map<String,Object> resultMap = aefServiceMapper.getOneVisitorInfoWithID(jsonObject);
		return resultMap;
	}

	@Override
	public void updateLimitCount(Map<String, Object> countMap) {
		int b = aefServiceMapper.updateLimitCount(countMap);
	}
}
