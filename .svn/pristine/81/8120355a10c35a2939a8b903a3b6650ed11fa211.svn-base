package com.xr.controller;

import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.xr.entity.HY_MeetingSummary;
import com.xr.service.AEFServiceService;
import com.xr.util.AESUtil;

import net.sf.json.JSONObject;


@RequestMapping("/alf")
@Controller
public class AEFServiceController {
	
	@Autowired
	private AEFServiceService aefServiceService;
	
	//AES加密密码
	private String AES_KEY="9999Ky509UBCCVz7";
	
	/**
	 * 设备登录服务器
	 * @param map
	 * @return
	 */
	@RequestMapping("/login")
	@ResponseBody
	public Map<String,Object> login(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		Map<String,Object> result = new HashMap<String, Object>();
		Map<String,Object> dataMap = new HashMap<String, Object>();//返回结果加密
		try {
			//解密参数
			String s=AESUtil.aesDecrypt(map.get("data").toString(), "fbe47880b9171706");
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			
			Map<String,Object> deviceParm = new HashMap<String,Object>();
			deviceParm.put("deviceSn", jsonObject.get("deviceSn"));
			//根据设备SN获取设备信息
			Map<String,Object> deviceInfo = aefServiceService.getOneDeviceInfo(deviceParm);
			if(deviceInfo != null){
				result.put("key", "0333f893b077426482e678ccaf9eab2e");
				result.put("token", "6Q1eu7iTAmHgCU7DkiHb2A==");
				result.put("AESPassWord", AES_KEY);
				resultMap.put("result", result);
				resultMap.put("code", 0);
				resultMap.put("description", "OK");
				//dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
				dataMap.put("data", "477/+M8CRu/GtiuT+27Cxg9xNTW7ct0qmiqDg7DPBHizhYG1Trm+cMDEGnS0zWF5td2W0sRHim70M9BFDU9he1N6S8QVqWAl41M0N0DrJQNvD1q1YUgN335mEomfEvmP1gfHDywT+Rb6rASTpSr9j2ujNZgihMI4WZPczDnohPtOAvHhYwXg6Zp9rTDC1I+H8NWziLGV654mgHOLX2N6Zg==");
			}else{
				resultMap.put("code", -1);
				resultMap.put("description", "设备不存在！！");
				resultMap.put("result", null);
				dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
			}
		} catch (Exception e) {
			try {
				resultMap.put("code", -1);
				resultMap.put("description", "程序异常，请联系管理员！！");
				resultMap.put("result", null);
				dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		}
		return dataMap;
	}
	
	/**
	 * 获取服务器配置
	 * @param map
	 * @return
	 */
	@RequestMapping("/serverConfig/time")
	@ResponseBody
	public Map<String,Object> serverConfigTime(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		Map<String,Object> result = new HashMap<String, Object>();
		Map<String,Object> dataMap = new HashMap<String, Object>();//返回结果加密
		try {
			//解密参数
			//String s=AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY);
			//com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			//获取配置信息
			//Map<String,Object> DeviceParm = aefServiceService.getOneDeviceInfo(jsonObject);
			
			//获取设备对应的组织架构信息，组织架构时间最新的一条数据
			//Map<String,Object> TimeMaxGroup = aefServiceService.getOneGroupInfo(jsonObject);
			
			//获取当前时间戳
			long time = System.currentTimeMillis();
			resultMap.put("code", "0");
			resultMap.put("description", "OK");
			//设备配置更新时间"1590893645000"
			result.put("configUpTime", time+(3600*24*1000));//Long.parseLong(DeviceParm.get("updateTime2").toString())
			//组织结构更新时间（系统功能需调整为：人员更新，添加，删除时要更新组织架构的更新时间）
			result.put("groupUpTime", time+(3600*24*1000));
			result.put("companyUpTime", null);//公司配置信息更新时间
			result.put("advertisingTime", time+(3600*24*1000));//广告更新时间
			resultMap.put("result", result);
			dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dataMap;
	}
	
	/**
	 * 获取配置信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/config")
	@ResponseBody
	public Map<String,Object> config(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> result = new HashMap<String, Object>();
		Map<String,Object> dataMap = new HashMap<String, Object>();
		try {
			String s=AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY);
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			Map<String,Object> DeviceParm = aefServiceService.getOneDeviceInfo(jsonObject);
			long time = System.currentTimeMillis();
			resultMap.put("code", "0");
			resultMap.put("description", "OK");
			result.put("deviceSn", jsonObject.get("deviceSn"));
			result.put("deviceName", DeviceParm.get("DeviceName"));
			result.put("oneOne", DeviceParm.get("oneOne"));
			result.put("oneN", DeviceParm.get("oneN"));
			result.put("livenessSwitch", DeviceParm.get("livenessSwitch"));
			result.put("serverSwitch", DeviceParm.get("serverSwitch"));
			result.put("verifyAddr", "8989");
			result.put("runMode", DeviceParm.get("runMode"));
			result.put("flashMode", DeviceParm.get("flashMode"));
			result.put("standyInterval", DeviceParm.get("standyInterval"));
			result.put("openDoor", DeviceParm.get("openDoor"));
			result.put("relayAddr", DeviceParm.get("relayAddr"));
			result.put("weigand", DeviceParm.get("weigand"));
			result.put("openInterval", DeviceParm.get("openInterval"));
			result.put("thirdUpload", DeviceParm.get("thirdUpload"));
			result.put("thirdAddr", "9090");
			result.put("autoReboot", DeviceParm.get("autoReboot"));
			result.put("rebootInterval", DeviceParm.get("rebootInterval"));
			result.put("rebootTime", DeviceParm.get("rebootTime"));
			result.put("passWord", "XubA==");
			result.put("upAvatar", DeviceParm.get("upAvatar"));
			result.put("upBgFlag", DeviceParm.get("upBgFlag"));
			result.put("updateTime", time+(3600*24*100));
			result.put("inOut", DeviceParm.get("inOut"));
			result.put("requestInterval", DeviceParm.get("requestInterval"));
			result.put("adminPassWord", "5b1b68a9abf4d2cd155c81a9225fd158");
			resultMap.put("result", result);
			dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dataMap;
	}
	
	/**
	 * 获取公司配置信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/company/config")
	@ResponseBody
	public Map<String,Object> companyConfig(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> dataMap = new HashMap<String, Object>();
		try {
			resultMap.put("code", 0);
			resultMap.put("description", "OK");
			resultMap.put("result", "");
			dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dataMap;
	}
	
	/**
	 * 根据设备SN获取组织架构列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/group")
	@ResponseBody
	public Map<String,Object> group(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		List<Map<String,Object>> listData = new ArrayList<Map<String,Object>>();
		Map<String,Object> dataMap = new HashMap<String, Object>();//加密后的结果
		try {
			String s=AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY); //解密参数
			List<Map<String,Object>> list = aefServiceService.getGroupList(s);//根据设备SN号获取组织架构列表
			List<Map<String,Object>> list2 = aefServiceService.getGroupListVistors(s);//根据设备SN号获取组织架构列表
			List<Map<String,Object>> list3 = aefServiceService.getGroupListVistorsWX(s);//根据设备SN号获取组织架构列表
			list.addAll(list2);
			list.addAll(list3);
			
			//获取当前时间戳
			long time = System.currentTimeMillis();
			for(int i=0;i<list.size();i++){
				Map<String,Object> obj = new HashMap<String,Object>();
				obj.put("groupId", list.get(i).get("DepartmentNo"));
				obj.put("groupName", list.get(i).get("DepartmentName"));
				obj.put("updatedAt",  time+(3600*24*1000));//组织架构更新时间
				//obj.put("deviceSn", jsonObject.get("deviceSn"));
				obj.put("createdAt",  time+(3600*24*1000));//组织架构创建时间
				listData.add(obj);
			}
			resultMap.put("result", listData);
			resultMap.put("code", 0);
			resultMap.put("description", "OK");
		
			dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));//对返回结果加密
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return dataMap;
	}
	
	/**
	 * 根据组织架构ID获取对应的人员列表
	 * 组织架构ID一次只有一个
	 * @param map
	 * @return
	 */
	@RequestMapping("/group/info")
	@ResponseBody
	public Map<String,Object> groupInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		List<Map<String,Object>> listData = new ArrayList<Map<String,Object>>();
		Map<String,Object> dataMap = new HashMap<String, Object>();//加密后的结果
		try {
			String s=AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY); //解密参数
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			List<Map<String,Object>> list = aefServiceService.getHolderList(jsonObject);//根据部门ID获取用户
			
			//访客才走下面流程
			if(jsonObject.get("groupId") != null && jsonObject.get("groupId").toString().startsWith("v_")){
				List<Map<String,Object>> list2 = aefServiceService.getHolderListVistors(jsonObject);//根据部门ID(访客)获取用户
				list.addAll(list2);
			}else if(jsonObject.get("groupId") != null && jsonObject.get("groupId").toString().startsWith("WX_")){//自主登记才走下面流程
				List<Map<String,Object>> list3 = aefServiceService.getHolderListVistorsWX(jsonObject);//根据部门ID(自主登记)获取用户
				list.addAll(list3);
			}
			
			//获取当前时间戳
			//long time = System.currentTimeMillis();
			for(int i=0;i<list.size();i++){
				Map<String,Object> obj = new HashMap<String,Object>();
				obj.put("userId", list.get(i).get("HolderNo"));
				obj.put("updatedAt", list.get(i).get("UpdateDate"));//用户更新时间list.get(i).get("UpdateDate")
				obj.put("groupId", jsonObject.get("groupId"));//用户归属的部门
				obj.put("createdAt", list.get(i).get("CreateDate"));//用户创建时间list.get(i).get("CreateDate")
				listData.add(obj);
			}
			resultMap.put("result", listData);
			resultMap.put("code", 0);
			resultMap.put("description", "OK");
		
			dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));//返回结果加密
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dataMap;
	}
	
	/**
	 * 根据用户ID获取人员信息
	 * 用户ID是多个，以逗号分割的字符串
	 * @param map
	 * @return
	 */
	@RequestMapping("/group/user")
	@ResponseBody
	public Map<String,Object> groupUser(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		List<Map<String,Object>> listData = new ArrayList<Map<String,Object>>();
		Map<String,Object> dataMap = new HashMap<String, Object>();//加密后的结果
		try {
			String s=AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY); //解密参数
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			List<Map<String,Object>> list = aefServiceService.groupUser(jsonObject);//根据用户ID获取用户详细信息
			List<Map<String,Object>> list2 = aefServiceService.groupUserVistors(jsonObject);//根据用户ID获取用户详细信息
			List<Map<String,Object>> list3 = aefServiceService.groupUserVistorsWX(jsonObject);//根据用户ID获取用户详细信息
			list.addAll(list2);
			list.addAll(list3);
			for(int i=0;i<list.size();i++){
				Map<String,Object> obj = new HashMap<String,Object>();
				String icNumber="";//卡号
				String icNumber2="";//卡号
				if(list.get(i).get("icNumber") != null 
						&& !list.get(i).get("icNumber").equals("")){
					icNumber = new BigInteger(list.get(i).get("icNumber").toString(), 16).toString();
					StringBuffer Str16 = new StringBuffer(list.get(i).get("icNumber").toString());
					for(int k=2;k<Str16.length();k+=3){
						Str16.insert(k, ',');
					}
					String[] array = Str16.toString().split(",");
					for (int m=array.length;m>=1;m--) {
						if(icNumber2.equals("")){
							icNumber2 = array[m-1];
						}else{
							icNumber2 = icNumber2 + array[m-1];
						}
			        }
				}
				obj.put("groupId", list.get(i).get("groupId"));//部门ID
				obj.put("groupName", list.get(i).get("groupName"));//部门名称
				obj.put("userId", list.get(i).get("userId"));//用户ID
				obj.put("userName", list.get(i).get("userName"));//用户名称
				obj.put("icNumber", icNumber);//卡号
				obj.put("outPutCardNunber", icNumber2);//韦根信号输出的卡号
				obj.put("idNumber", list.get(i).get("idNumber"));//身份证号
				obj.put("companyId", "1");//公司ID
				obj.put("birthDay", "");//list.get(i).get("birthDay")
				obj.put("modelVersion", "local");
				obj.put("feature", "");
				obj.put("avatarId", list.get(i).get("photoId"));//HolderPhoto的ID
				obj.put("artAvatar", "1");
				obj.put("createdAt", list.get(i).get("CreateDate"));//用户创建时间Long.parseLong(list.get(i).get("CreateDate").toString())
				obj.put("updatedAt", list.get(i).get("UpdateDate"));//用户更新时间Long.parseLong(list.get(i).get("UpdateDate").toString())
				obj.put("userUpdatedAt", list.get(i).get("CreateDate"));
				obj.put("thirdpartyId", "");
				obj.put("prompt", list.get(i).get("userName"));//语音提示信息
				obj.put("type", 1);//用户类型（显示人员身份），没做区分
				obj.put("permission", "0");//1：允许通行，0：禁止通行
				obj.put("userMassage", "");
				obj.put("userValidStartTime", "1590893645000");//用户有效通行时间（保留字段）
				obj.put("userValidEndTime", "1590893645000");//用户有效结束时间（保留字段）
				listData.add(obj);
			}
			resultMap.put("code", 0);
			resultMap.put("result", listData);
			resultMap.put("description", "OK");
			dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dataMap;
	}
	
	/**
	 * 下载图片
	 * 人员信息同步完成后同步人员的注册照
	 * 以文件流的方式返回前端
	 * @param map
	 * @param resp
	 */
	@RequestMapping("/image/download")
	@ResponseBody
	public void imageDownLoad(@RequestParam Map<String,Object> map,HttpServletResponse resp){

		try {
			//解密
 			String s = AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY);//解密参数
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			
			Map<String,Object> oneInfo = null;
			if(jsonObject.get("avatarId").toString().startsWith("v_")){
				oneInfo = aefServiceService.getImagePathVisitors(jsonObject);//根据图片的ID获取HolderPhoto中的信息
			}else if(jsonObject.get("avatarId").toString().startsWith("WX_")){
				oneInfo = aefServiceService.getImagePathVisitorsWX(jsonObject);//根据图片的ID获取HolderPhoto中的信息
			}else{
				oneInfo = aefServiceService.getImagePath(jsonObject);//根据图片的ID获取HolderPhoto中的信息
			}
			
			//转化为输入流
			if(oneInfo != null)
			if(oneInfo.get("DataPhoto") != null && !oneInfo.get("DataPhoto").equals("")){
				byte[] dataphoto = (byte[]) oneInfo.get("DataPhoto");
				ByteArrayInputStream inputStream = new ByteArrayInputStream(dataphoto);
				BufferedImage img = ImageIO.read(inputStream);
				
				if(img != null){
					/*ByteArrayInputStream inputStream2 = new ByteArrayInputStream(bufferedImageTobytes(img,0.9f));
					BufferedImage img2 = ImageIO.read(inputStream2);
					String format = "png";
					ImageIO.write(img2, format, resp.getOutputStream());
					
					img2.flush();
					inputStream2.close();*/
					resp.addHeader("Access-Control-Allow-Origin", "*");
					resp.setHeader("Content-Transfer-Encoding","binary");
		   			resp.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
		   			resp.setHeader("Pragma", "public");
		   			resp.flushBuffer();
					ByteArrayInputStream is = new ByteArrayInputStream(bufferedImageTobytes(img,0.9f));
					ServletOutputStream out = resp.getOutputStream();
					byte[] buffer = new byte[10240];
					int len = 0;
					
					while ((len = is.read(buffer)) != -1){
						//System.out.println(len);
						out.write(buffer, 0, len);
					}
					is.close();
	   	        	out.flush();
	   	        	out.close();
				}
				img.flush();
				inputStream.close();
				resp.flushBuffer();
			}
		} catch (Exception e1) {
			e1.printStackTrace();
		} 
	
	} 
	
	/**
	 * 上传通行记录
	 * @param map
	 * @return
	 */
	@RequestMapping("/record")
	@ResponseBody
	public Map<String,Object> record(@RequestParam Map<String,Object> map,HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		Map<String,Object> dataMap = new HashMap<String, Object>();//加密后的结果
		String s = null;
		try {
			s = AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY);
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			int b = aefServiceService.saveRecord(jsonObject,resp);//上传通行记录
			
			//自助登记才走该流程
			if(jsonObject.get("groupId").toString().equals("WX_001")){
				Map<String,Object> parmMap = new HashMap<String,Object>();
				parmMap.put("userId", jsonObject.get("userId"));
				//获取设备关联的门区状态（进/出）
				Map<String,Object> doorInfo = aefServiceService.getDoorWithAEFService(jsonObject);
				if(doorInfo != null && !doorInfo.get("doorlimit").toString().equals("0")){
					if(doorInfo.get("IOType") != null && doorInfo.get("IOType").toString().equals("1")){//IOType(进/出，1：进，0：出)
						parmMap.put("status", 20);
					}else{
						parmMap.put("status", 30);
					}
					aefServiceService.updateWXVisitorsStatus(parmMap);
				}
			}
			
			//访客登记才走该流程
			if(jsonObject.get("groupId").toString().equals("v_001")){
				Map<String,Object> doorInfo = aefServiceService.getDoorWithAEFService(jsonObject);//获取设备关联的门区状态（进/出）
				if(doorInfo.get("IOType") != null && doorInfo.get("IOType").toString().equals("1")){//IOType(进/出，1：进，0：出)
					
				}else{
					Map<String,Object> parmMap = new HashMap<String,Object>();
					parmMap.put("userId", jsonObject.get("userId"));
					Map<String,Object> visitorInfo = aefServiceService.getOneVisitorInfoWithID(parmMap);//获取访客的信息
					//判断访客的赋权方式
					if(visitorInfo.get("LimitType") != null && visitorInfo.get("LimitType").toString().equals("1")){//时间段控制权限
						
					}else if(visitorInfo.get("LimitType") != null && visitorInfo.get("LimitType").toString().equals("2")){//次数控制权限
						int limitCount = Integer.valueOf(visitorInfo.get("LimitCount").toString());
						Map<String,Object> countMap = new HashMap<String,Object>();
						if(limitCount == 0){
							countMap.put("limitCount", limitCount);
						}else{
							countMap.put("limitCount", limitCount-1);
						}
						
						countMap.put("userId", jsonObject.get("userId"));
						aefServiceService.updateLimitCount(countMap);
					}if(visitorInfo.get("LimitType") != null && visitorInfo.get("LimitType").toString().equals("3")){//出门消权方式
						Map<String,Object> countMap = new HashMap<String,Object>();
						countMap.put("limitCount", 0);
						countMap.put("userId", jsonObject.get("userId"));
						aefServiceService.updateLimitCount(countMap);
					}
				}
			}
			
			if(b>=0){
				resultMap.put("code", 0);
				resultMap.put("description", "OK");
				resultMap.put("result", "");
				dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
			}
		} catch (Exception e) {
			System.out.println("记录上传失败！");
		}
		return dataMap;
	}
	
	/**
	 * 上传图片
	 * type=1：上传注册照片，设备添加人员时调用
	 * type=2：上传人脸照（人脸开门）
	 * type=3：上传背景照（人脸开门）
	 * @param map
	 * @param file
	 * @return
	 */
	@RequestMapping("/image/upload")
	@ResponseBody
	public Map<String,Object> imageUplod(@RequestParam Map<String,Object> map,@RequestParam("image") MultipartFile file){
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		Map<String,Object> result = new HashMap<String,Object>();
		Map<String,Object> dataMap = new HashMap<String, Object>();//加密后的结果
		String s;
		try {
			s = AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY);//解密参数
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			String ID = aefServiceService.imageUplod(jsonObject,file);//上传图片并存入IODataPhoto，同时返回ID
			result.put("mid", ID);//图片的ID
			resultMap.put("code", 0);
			resultMap.put("description", "OK");
			resultMap.put("result", result);
			dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return dataMap;
	}
	
	@RequestMapping("/advertising")
	@ResponseBody
	public Map<String,Object> advertising(@RequestParam Map<String,Object> map,HttpServletRequest request) throws Exception{
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		Map<String,Object> result = new HashMap<String,Object>();
		Map<String,Object> dataMap = new HashMap<String, Object>();//加密后的结果
		
		
		Properties properties = new Properties();
		properties = PropertiesLoaderUtils.loadAllProperties("loadParm.properties");
		String basePath = (String) properties.get("adviceImgPath");
		
		String s1=request.getSession().getServletContext().getRealPath("/adviceImg/");//获取图片的绝对路径
		List fileList = getFileList(s1);//获取文件夹下的所有文件名称
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		for(int i=0;i<fileList.size();i++){
			Map<String,Object> oneInfo = new HashMap<String,Object>();
			String filePath = fileList.get(i).toString();//文件路径
			int index = fileList.get(i).toString().lastIndexOf("\\");
			String fileName = filePath.substring(index+1);//文件名称
			oneInfo.put("advertisingBitmapUrl", basePath+fileName);
			list.add(oneInfo);
		}
		
		resultMap.put("code", 0);
		resultMap.put("description", "OK");
		result.put("carouselTime", 2);
		result.put("urlList", list);
		resultMap.put("result", result);
		JSONObject jsonObject = JSONObject.fromObject(resultMap);
		dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
		return dataMap;
	}
	
	public List getFileList(String path) { 
		List list = new ArrayList(); 
		try { 
			File file = new File(path); 
			String[] filelist = file.list(); 
			for (int i = 0; i < filelist.length; i++) { 
				list.add(path+"\\"+filelist[i]); 
			} 
		} catch (Exception e) { 
			e.printStackTrace(); 
		} 
		return list; 
	} 
	
	/**
	  * 生成签名sign
	  * map：ASCII排序后的参数
	  * key：为商户平台设置的密钥key
	  * @param map
	  * @param key
	  * @return
	  */
	 public static String getSignString(TreeMap<String, Object> map,String key){
		 Iterator<?> iterator = map.keySet().iterator();
		 StringBuffer stringA = new StringBuffer();
		 while (iterator.hasNext()) {
            Object k = iterator.next();
            //并将获得的值进行拼接
			 if(stringA.equals("")){
				 stringA.append(key+"="+(String)map.get(k));
			 }else{
				 stringA.append("&"+key+"="+(String)map.get(k));
			 }
        }    
		 
		 String stringSignTemp=stringA+"&key="+key;
		 String sign = MD5(stringSignTemp).toUpperCase();
		 return sign;
	 }
	 
	 /**
	  * MD5加密
	  * @param key
	  * @return
	  */
	 public static String MD5(String key) {
		 char hexDigits[] = {
	             '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
	     };
	     try {
	         byte[] btInput = key.getBytes();
	         // 获得MD5摘要算法的 MessageDigest 对象
	         MessageDigest mdInst = MessageDigest.getInstance("MD5");
	         // 使用指定的字节更新摘要
	         mdInst.update(btInput);
	         // 获得密文
	         byte[] md = mdInst.digest();
	         // 把密文转换成十六进制的字符串形式
	         int j = md.length;
	         char str[] = new char[j * 2];
	         int k = 0;
	         for (int i = 0; i < j; i++) {
	             byte byte0 = md[i];
	             str[k++] = hexDigits[byte0 >>> 4 & 0xf];
	             str[k++] = hexDigits[byte0 & 0xf];
	         }
	         return new String(str);
	     } catch (Exception e) {
	         return null;
	     }
	}
	
	//图片压缩处理
	private byte[] bufferedImageTobytes(BufferedImage image, float quality) {    
        // 如果图片空，返回空  
        /*if (image == null) {  
            return null;  
        } */    
        // 得到指定Format图片的writer  
        Iterator<ImageWriter> iter = ImageIO.getImageWritersByFormatName("jpg");// 得到迭代器  
        ImageWriter writer = (ImageWriter) iter.next(); // 得到writer  

        // 得到指定writer的输出参数设置(ImageWriteParam )  
        ImageWriteParam iwp = writer.getDefaultWriteParam();  
        iwp.setCompressionMode(ImageWriteParam.MODE_EXPLICIT); // 设置可否压缩  
        iwp.setCompressionQuality(quality); // 设置压缩质量参数  

        iwp.setProgressiveMode(ImageWriteParam.MODE_DISABLED);  

        ColorModel colorModel = image.getColorModel();  
        // 指定压缩时使用的色彩模式  
        iwp.setDestinationType(new javax.imageio.ImageTypeSpecifier(colorModel,  
                colorModel.createCompatibleSampleModel(16, 16)));  

        // 开始打包图片，写入byte[]  
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); // 取得内存输出流  
        IIOImage iIamge = new IIOImage(image, null, null);  
        try {  
            // 此处因为ImageWriter中用来接收write信息的output要求必须是ImageOutput  
            // 通过ImageIo中的静态方法，得到byteArrayOutputStream的ImageOutput  
            writer.setOutput(ImageIO  
                    .createImageOutputStream(byteArrayOutputStream)); 
            writer.write(null, iIamge, iwp);  

        } catch (IOException e) {  
            System.out.println("write errro");  
            e.printStackTrace();  
        }  
        return byteArrayOutputStream.toByteArray();  
    }
	
	//=====================================================================================================================
	/**
	 * 上传员工信息，该接口会新增一条员工信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/add/staff")
	@ResponseBody
	public Map<String,Object> addStaff(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();//返回结果
		Map<String,Object> dataMap = new HashMap<String, Object>();//加密后的结果
		String s = null;
		try {
			//解密参数
			s = AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY);
			com.alibaba.fastjson.JSONObject jsonObject = JSON.parseObject(s);
			Integer b = aefServiceService.saveImagePath(jsonObject);
			if(b>=0){
				resultMap.put("code", 0);
				resultMap.put("description", "OK");
				resultMap.put("result", "");
				dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
			}else if(b==-2){
				resultMap.put("code", -2);
				resultMap.put("description", "人员 id不可用");
				resultMap.put("result", "");
				dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
			}
			
		} catch (Exception e1) {
			e1.printStackTrace();
		} 
		return dataMap;
	} 
	
	/**
	 * 人脸比对（第三方服务器，无需实现）
	 * @param map
	 * @param file
	 * @return
	 */
	@RequestMapping("/thislocality")
	@ResponseBody
	public Map<String,Object> thislocality(@RequestParam Map<String,Object> map,@RequestParam("image") MultipartFile file){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> result = new HashMap<String, Object>();
		Map<String,Object> dataMap = new HashMap<String, Object>();
		//String s;
		try {
			//s = AESUtil.aesDecrypt(map.get("data").toString(), AES_KEY);
			resultMap.put("code", 0);
			result.put("avatarId", "1582272365698");
			result.put("companyId", "1");
			result.put("icNumber", "3196213421");
			result.put("birthDay", "1995-08-27");
			result.put("modelVersion", "local");
			result.put("idNumber", "3196213421999");
			result.put("createdAt", "1551801600000");
			result.put("userUpdatedAt", "1551801600000");
			result.put("permission", "1");
			result.put("type", "1");
			result.put("artAvatar", "1");
			result.put("feature", "1");
			result.put("userId", "0011");
			result.put("prompt", "验证通过");
			result.put("groupId", "001001");
			result.put("groupName", "软件后端部");
			result.put("userName", "李文博");
			result.put("userValidStartTime", "1551801600000");
			result.put("userValidEndTime", "1551801600000");
			resultMap.put("result", result);
			dataMap.put("data", AESUtil.aesEncrypt(JSON.toJSONString(resultMap),AES_KEY));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return dataMap;
	}
	
}
