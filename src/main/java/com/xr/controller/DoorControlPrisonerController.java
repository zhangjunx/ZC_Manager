package com.xr.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.DoorControlPrisonerService;
import com.xr.util.FacePayDevice;

import net.sf.json.JSONArray;

/**
 * 监狱监区门区控制中心
 * @author Administrator
 *
 */
@RequestMapping("/doorControlPrisoner")
@Controller
public class DoorControlPrisonerController {
	
	@Autowired
	private DoorControlPrisonerService service;
	
	/**
	 * 获取登录人员的管理的监区门区列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getInitPrisonerDoor")
	@ResponseBody
	public Map<String,Object> getInitPrisonerDoor(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getInitPrisonerDoor(map);
		return resultMap;
	}
	
	/**
	 * 开门、常开命令
	 * @throws Exception 
	 */
	@RequestMapping("/openDoorLimit")
	@ResponseBody
	public Map<String,Object> openDoorLimit(@RequestBody Map<String,Object> map) throws Exception{
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> loginMap = loginService();
		if(loginMap.get("ResultStatus") == null || !loginMap.get("ResultStatus").toString().equals("0")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "登陆失败！");
			return resultMap;
		}
		//开门命令下发
		Map<String,Object> openMap = new HashMap<String,Object>();
		String Token = loginMap.get("Token").toString();
		String servicePath = loginMap.get("servicePath").toString();
		openMap.put("CommonNo", "100");
		openMap.put("CommonData", map.get("CommonData"));
		openMap.put("CommonAction", map.get("CommonAction"));
		openMap.put("Token", Token);
		Map<String,Object> openResult = FacePayDevice.sentToURL(servicePath+"RemoteOpenDoor", openMap, "POST");
		
		if(openResult.get("ResultStatus") == null || !openResult.get("ResultStatus").toString().equals("0")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "开门失败！");
		}else{
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "开门成功！");
		}
		return resultMap;
	}
	
	/**
	 * 一键常开命令
	 * @throws Exception 
	 */
	@RequestMapping("/openDoorLimitLongAll")
	@ResponseBody
	public Map<String,Object> openDoorLimitLongAll(@RequestBody Map<String,Object> map) throws Exception{
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> failList = new ArrayList<Map<String,Object>>();
		Map<String,Object> loginMap = loginService();
		if(loginMap.get("ResultStatus") == null || !loginMap.get("ResultStatus").toString().equals("0")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "登陆失败！");
			return resultMap;
		}
		List<Map<String,Object>> list = JSONArray.fromObject(map.get("CommonDataList"));
		String Token = loginMap.get("Token").toString();
		String servicePath = loginMap.get("servicePath").toString();
		for(int i = 0;i<list.size();i++){
			//开门命令下发
			Map<String,Object> openMap = new HashMap<String,Object>();
			openMap.put("CommonNo", "100");
			openMap.put("CommonData", list.get(i).get("CommonData"));
			openMap.put("CommonAction", map.get("CommonAction"));
			openMap.put("Token", Token);
			Map<String,Object> openResult = FacePayDevice.sentToURL(servicePath+"RemoteOpenDoor", openMap, "POST");
			if(openResult.get("ResultStatus") == null || !openResult.get("ResultStatus").toString().equals("0")){
				failList.add(list.get(i));
			}
		}
		
		if(failList.size() > 0){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "开门存在异常！");
			resultMap.put("failList", failList);
		}else{
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "开门成功！");
			resultMap.put("failList", failList);
		}
		return resultMap;
	}
	
	/**
	 * 一键自控命令
	 * @throws Exception 
	 */
	@RequestMapping("/autoControlDoorAll")
	@ResponseBody
	public Map<String,Object> autoControlDoorAll(@RequestBody Map<String,Object> map) throws Exception{
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> failList = new ArrayList<Map<String,Object>>();
		Map<String,Object> loginMap = loginService();
		if(loginMap.get("ResultStatus") == null || !loginMap.get("ResultStatus").toString().equals("0")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "登陆失败！");
			return resultMap;
		}
		
		List<Map<String,Object>> list = JSONArray.fromObject(map.get("CommonDataList"));
		String Token = loginMap.get("Token").toString();
		String servicePath = loginMap.get("servicePath").toString();
		for(int i = 0;i<list.size();i++){
			//开门命令下发
			Map<String,Object> openMap = new HashMap<String,Object>();
			openMap.put("CommonNo", "100");
			openMap.put("CommonData", list.get(i).get("CommonData"));
			openMap.put("CommonAction", map.get("CommonAction"));
			openMap.put("Token", Token);
			Map<String,Object> openResult = FacePayDevice.sentToURL(servicePath+"RemoteOpenDoor", openMap, "POST");
			if(openResult.get("ResultStatus") == null || !openResult.get("ResultStatus").toString().equals("0")){
				failList.add(list.get(i));
			}
		}
		
		if(failList.size() > 0){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "一键自控存在异常！");
			resultMap.put("failList", failList);
		}else{
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "已全部恢复自控！");
			resultMap.put("failList", failList);
		}
		return resultMap;
	}
	
	public static void main(String[] args) {
		Map<String,Object> parmMap = new HashMap<String,Object>();
		parmMap.put("CommonNo", "301");
		parmMap.put("CommonData", "25");
		parmMap.put("CommonAction", 1);
		
		try {
			Map<String,Object> loginMap = new HashMap<String,Object>();
			loginMap.put("UserName", "zzsyris");
			loginMap.put("PassWord", "E10ADC3949BA59ABBE56E057F20F883E");
			Map<String,Object> loginResult = FacePayDevice.sentToURL("http://192.168.1.150:8085/UserLogin", loginMap, "POST");
			System.out.println(loginResult);
			parmMap.put("Token", loginResult.get("Token"));
			Map<String,Object> result = FacePayDevice.sentToURL("http://192.168.1.150:8085/RemoteOpenDoor", parmMap, "POST");
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 登录门区控制服务器
	 * @param map
	 * @return
	 */
	public Map<String,Object> loginService(){
		Properties properties = new Properties();
		try {
			properties = PropertiesLoaderUtils.loadAllProperties("loadParm.properties");
			String userName = (String) properties.get("userName150");
			String password = (String) properties.get("password150");
			String servicePath = (String) properties.get("servicePath150");
			Map<String,Object> loginMap = new HashMap<String,Object>();
			loginMap.put("UserName", userName);
			loginMap.put("PassWord", password);
			Map<String,Object> loginResult = FacePayDevice.sentToURL(servicePath+"UserLogin", loginMap, "POST");
			loginResult.put("servicePath", servicePath);
			return loginResult;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
