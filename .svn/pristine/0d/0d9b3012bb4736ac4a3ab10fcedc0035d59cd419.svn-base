package com.xr.controller;

import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.DisallowConcurrentExecution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.xr.service.FacePayRecordService;
import com.xr.service.UFaceOffLineWithDoorService;
import com.xr.util.FacePayDevice;

import net.sf.json.JSONObject;

/**
 * 宇泛人脸机门禁--接口数据同步
 * @author Administrator
 *
 */
@RequestMapping("/ufaceOffLine")
@DisallowConcurrentExecution
@Controller
public class UFaceOffLineWithDoorController {
	
	@Autowired
	private UFaceOffLineWithDoorService uFaceOffLineWithDoorService;
	
	@Autowired
	private FacePayRecordService facePayRecordService;
	
	/**
	 * 设备添加人员
	 * id为空，实时下发
	 * id不为空，手动下发
	 */
	@RequestMapping("/addUserLimit")
	@ResponseBody
	public void addUserLimit(@RequestParam Map<String,Object> map){
		List<Map<String,Object>> perList = uFaceOffLineWithDoorService.getPerListWithIDs(map);//人员列表
		List<Map<String,Object>> deviceList = uFaceOffLineWithDoorService.getDeviceListWithDoor(map);//根据门区获取设备IP
		String disConnectDevice = "-1";
		a:for(int i=0;i<deviceList.size();i++){
			//添加人员信息
			for(int j=0;j<perList.size();j++){
				Map<String,Object> parmMap = new HashMap<String,Object>();
				parmMap.put("deviceIP", deviceList.get(i).get("ip")+":8090/person/create");
				parmMap.put("ip", deviceList.get(i).get("ip"));
				parmMap.put("person", perList.get(j));
				try {
					Map<String,Object> resultMap1 = sentCommandToDevice(parmMap);
					if(!resultMap1.get("result").toString().equals("1")){
						return;
					}
				} catch (Exception e) {
					System.out.println("设备连接超时！");
					disConnectDevice = disConnectDevice + "," + deviceList.get(i).get("deviceNo");
					map.put("disConnectDevice", disConnectDevice);
					continue a;
				}
			}
			
			//添加人员头像信息
			for(int j=0;j<perList.size();j++){
				try {
					perList.get(j).put("deviceIP", deviceList.get(i).get("ip")+":8090/face/create");
					perList.get(j).put("ip", deviceList.get(i).get("ip"));
					Map<String,Object> resultMap2 = sentCommandToDevice(perList.get(j));
					if(!resultMap2.get("result").toString().equals("1")){
						return;
					}
					
				} catch (Exception e) {
					System.out.println("设备连接超时！");
					continue;
				}
			}
			
			//删除人员时间权限
			try {
				Map<String,Object> timeParm = new HashMap<String,Object>();
				timeParm.put("personId", map.get("personArr").toString().replaceAll("'", ""));
				timeParm.put("deviceIP", deviceList.get(i).get("ip")+":8090/person/deletePasstime");
				timeParm.put("ip", deviceList.get(i).get("ip"));
				Map<String,Object> resultMap3 = sentCommandToDevice(timeParm);
				if(!resultMap3.get("result").toString().equals("1")){
					return;
				}
			} catch (Exception e) {
				System.out.println("设备连接超时！");
				continue;
			}
			
			//为人员设置新的时间权限
			try {
				Map<String,Object> timeParm = new HashMap<String,Object>();
				timeParm.put("personId", map.get("personArr").toString().replaceAll("'", ""));
				timeParm.put("passtime", map.get("timeList").toString().replaceAll("'", ""));
				timeParm.put("deviceIP", deviceList.get(i).get("ip")+":8090/person/passtime");
				timeParm.put("ip", deviceList.get(i).get("ip"));
				Map<String,Object> resultMap4 = sentCommandToDevice(timeParm);
				if(!resultMap4.get("result").toString().equals("1")){
					return;
				}
			} catch (Exception e) {
				System.out.println("设备连接超时！");
				continue;
			}
		}
		
		if(map.get("id") != null && !map.get("id").toString().equals("")){
			int b = uFaceOffLineWithDoorService.updateStatusByHand(map);
		}else{
			int b = uFaceOffLineWithDoorService.updateStatus(map);
		}
	}
	
	/**
	 * 删除设备人员
	 * @param map
	 * @return
	 */
	@RequestMapping("/delUserLimit")
	@ResponseBody
	public Map<String,Object> delUserLimit(@RequestParam Map<String,Object> map){
		List<Map<String,Object>> perList = uFaceOffLineWithDoorService.getPerListWithIDs(map);//人员列表
		List<Map<String,Object>> deviceList = uFaceOffLineWithDoorService.getDeviceListWithDoor(map);//根据门区获取设备IP
		
		for(int i=0;i<deviceList.size();i++){
			try {
				Map<String,Object> parmMap = new HashMap<String,Object>();
				parmMap.put("id", map.get("personArr").toString().replaceAll("'", ""));
				parmMap.put("deviceIP", deviceList.get(i).get("ip")+":8090/person/delete");
				parmMap.put("ip", deviceList.get(i).get("ip"));
				Map<String,Object> resultMap = sentCommandToDevice(parmMap);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//同步人员信息
		//List<>//根据人员ID获取人员信息
		return map;
	}
	
	/**
	 * 定时更新设备的时间权限
	 * 每天凌晨12点执行
	 * 根据当天的星期获取对应的时间列表更新到对应的设备
	 * @param map
	 * @return
	 */
	public void updateTimeWithJob(){
		Date date=new Date();
		SimpleDateFormat dateFm = new SimpleDateFormat("EEEE");
		String week = dateFm.format(date);//获取当前星期几
		List<Map<String,Object>> deviceList = uFaceOffLineWithDoorService.getDeviceListAll();//1、获取宇泛设备列表，查询设备型号为SY-FA605MN并且有相关门区的设备
		for(int i=0;i<deviceList.size();i++){
			String ip = deviceList.get(i).get("ip").toString();
			Map<String,Object> pm= new HashMap<String,Object>();
			try {
				Map<String,Object> testResult = FacePayDevice.sentToURL("http://"+ip+":8090/getDeviceKey", pm,"POST");
				if(!testResult.get("result").toString().equals("1")){
					continue;
				}
				List<Map<String,Object>> perList = uFaceOffLineWithDoorService.getPerListWithDevice(deviceList.get(i));//根据设备获取人员及时间权限列表
				for(int j=0;j<perList.size();j++){
					String passtime = "";
					String personId = perList.get(j).get("HolderNo").toString();
					String weekZone1 = perList.get(j).get("WeekZone1").toString();
					String weekZone2 = perList.get(j).get("WeekZone2").toString();
					String weekZone3 = perList.get(j).get("WeekZone3").toString();
					String weekZone4 = perList.get(j).get("WeekZone4").toString();
					String weekZone5 = perList.get(j).get("WeekZone5").toString();
					String weekZone6 = perList.get(j).get("WeekZone6").toString();
					String weekZone7 = perList.get(j).get("WeekZone7").toString();
					if(week.equals("星期一")){
						passtime = weekZone1;
					}else if(week.equals("星期二")){
						passtime = weekZone2;
					}else if(week.equals("星期三")){
						passtime = weekZone3;
					}else if(week.equals("星期四")){
						passtime = weekZone4;
					}else if(week.equals("星期五")){
						passtime = weekZone5;
					}else if(week.equals("星期六")){
						passtime = weekZone6;
					}else if(week.equals("星期七")){
						passtime = weekZone7;
					}
					passtime=(passtime+":00").replaceAll("-", ":00,").replaceAll(";",":00,");
					Map<String,Object> parmMap = new HashMap<String,Object>();
					parmMap.put("personId", personId);
					parmMap.put("passtime", passtime);
					parmMap.put("pass", deviceList.get(i).get("passWord"));
					
					Map<String,Object> resultMap1 = FacePayDevice.sentToURL("http://"+ip+":8090/person/deletePasstime", parmMap,"POST");//删除时间权限
					Map<String,Object> resultMap2 = FacePayDevice.sentToURL("http://"+ip+":8090/person/passtime", parmMap,"POST");//添加时间权限
				}
			} catch (Exception e) {
				continue;
			}
		}
	}
	
	/**
	 * 定时任务，90秒执行一次
	 * 同步人员权限
	 * @param map
	 * @return
	 */
	@RequestMapping("/addLimitWithQuartz")
	@ResponseBody
	public void addLimitWithQuartz(@RequestParam Map<String,Object> map){
		List<Map<String,Object>> deviceList = uFaceOffLineWithDoorService.getDeviceListAll();//获取所有宇泛设备列表
		List<Map<String,Object>> personList = uFaceOffLineWithDoorService.getAllPerList(deviceList);//获取当天权限操作记录表
		for(int i=0;i<personList.size();i++){
			if( personList.get(i).get("ip") == null ||  personList.get(i).get("ip").equals("") ){
				return;
			}
			
			if(personList.get(i).get("UpdateStatus") == null || personList.get(i).get("UpdateStatus").toString().equals("")){
				return;
			}
			
			String ip = personList.get(i).get("ip").toString();//设备IP
			
			//新增权限
			if(personList.get(i).get("UpdateStatus").toString().equals("A")){
				try {
					//添加人员信息
					Map<String,Object> parmMap1 = new HashMap<String,Object>();
					parmMap1.put("ip", ip);
					parmMap1.put("deviceIP", ip+":8090/person/create");
					Map<String,Object> oneInfo1 = new HashMap<String,Object>();
					oneInfo1.put("id", personList.get(i).get("HolderNo"));
					oneInfo1.put("name", personList.get(i).get("HolderName"));
					oneInfo1.put("idcardNum", personList.get(i).get("idcardNum"));
					oneInfo1.put("iDNumber", personList.get(i).get("iDNumber"));
					oneInfo1.put("facePermission", personList.get(i).get("2"));
					oneInfo1.put("idCardPermission", personList.get(i).get("2"));
					oneInfo1.put("faceAndCardPermission", personList.get(i).get("2"));
					oneInfo1.put("iDPermission", personList.get(i).get("2"));
					parmMap1.put("person", oneInfo1);
					Map<String,Object> result1 = sentCommandToDevice(parmMap1);
					
					//添加人员图片
					Map<String,Object> parmMap2 = new HashMap<String,Object>();
					parmMap2.put("ip", ip);
					parmMap2.put("deviceIP", ip+":8090/face/create");
					Map<String,Object> result2 = sentCommandToDevice(parmMap2);
					
					//添加时间权限
					Map<String,Object> parmMap3 = new HashMap<String,Object>();
					parmMap3.put("ip", ip);
					parmMap3.put("deviceIP", ip+":8090/person/passtime");
					Map<String,Object> result3 = sentCommandToDevice(parmMap3);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
			//更新权限
			if(personList.get(i).get("UpdateStatus").toString().equals("U")){
				try {
					//删除时间权限
					Map<String,Object> parmMap4 = new HashMap<String,Object>();
					parmMap4.put("ip", ip);
					parmMap4.put("deviceIP", ip+":8090/person/deletePasstime");
					Map<String,Object> result4 = sentCommandToDevice(parmMap4);
					
					//添加时间权限
					Map<String,Object> parmMap3 = new HashMap<String,Object>();
					parmMap3.put("ip", ip);
					parmMap3.put("deviceIP", ip+":8090/person/passtime");
					Map<String,Object> result3 = sentCommandToDevice(parmMap3);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
			//删除权限
			if(personList.get(i).get("UpdateStatus").toString().equals("D")){
				try {
					//删除人员
					Map<String,Object> parmMap5 = new HashMap<String,Object>();
					parmMap5.put("ip", ip);
					parmMap5.put("deviceIP", ip+":8090/person/delete");
					Map<String,Object> result5 = sentCommandToDevice(parmMap5);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 下发命令
	 * @param map
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/sentCommandToDevice")
	@ResponseBody
	public Map<String,Object> sentCommandToDevice(@RequestParam Map<String,Object> map) throws Exception{
		if(!InetAddress.getByName(map.get("ip").toString()).isReachable(1000)){
			//InetAddress.getByName(map.get("ip").toString()).isReachable(1000)
			return null;
		}
		
		//读取设备序列号
		Map<String,Object> pm= new HashMap<String,Object>();
		String str = map.get("ip")+":8090/getDeviceKey";
		Map<String,Object> testResult = FacePayDevice.sentToURL("http://"+str, pm,"POST");
		
		//获取设备密码
		Map<String,Object> deviceInfo = facePayRecordService.getDeviceInfoWithSn(testResult);
		
		if(!testResult.get("result").toString().equals("1")){
			return null;
		}
		if(map.get("deviceIP").toString().contains("8090/person/create")){//人员注册
			Map<String,Object> pramMap = new HashMap<String,Object>();
			pramMap.put("pass", deviceInfo.get("password"));
			pramMap.put("person", map.get("person"));
			Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("deviceIP").toString(), pramMap,"POST");
			return resultMap;
		}else if(map.get("deviceIP").toString().contains("8090/face/create")){//注册图片
			map.put("pass", deviceInfo.get("password"));
			Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("deviceIP").toString(), map,"POST");
			return resultMap;
		}else if(map.get("deviceIP").toString().contains("8090/person/delete")){//删除人员
			map.put("pass", deviceInfo.get("password"));
			Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("deviceIP").toString(), map,"POST");
			return resultMap;
		}else if(map.get("deviceIP").toString().contains("8090/person/passtime")){//时间权限
			map.put("pass", deviceInfo.get("password"));
			Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("deviceIP").toString(), map,"PUT");
			return resultMap;
		}else if(map.get("deviceIP").toString().contains("8090/person/deletePasstime")){//删除时间权限
			map.put("pass", deviceInfo.get("password"));
			Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+map.get("deviceIP").toString(), map,"POST");
			return resultMap;
		}
		return deviceInfo;
	}
}
