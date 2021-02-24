package com.xr.service.impl;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.dao.FacePayRecordMapper;
import com.xr.service.FacePayRecordService;

@Service
public class FacePayRecordServiceImpl implements FacePayRecordService {

	@Autowired
	private FacePayRecordMapper facePayRecordMapper;
	
	/**
	 * 根据SN号获取设备信息
	 */
	@Override
	public Map<String, Object> getDeviceInfoWithSn(Map<String, Object> testResult) {
		Map<String, Object> deviceInfo = facePayRecordMapper.getDeviceInfoWithSn(testResult);
		return deviceInfo;
	}
	
	/**
	 * 下发列表
	 */
	@Override
	public Map<String, Object> getRecordList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = facePayRecordMapper.getRecordList(map);
		int count = facePayRecordMapper.getRecordListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}
	
	/**
	 * 获取命令列表
	 */
	@Override
	public List<Map<String, Object>> getCommandList(Map<String, Object> map) {
		List<Map<String, Object>> list = facePayRecordMapper.getCommandList(map);
		return list;
	}
	
	/**
	 * 添加账户回调
	 */
	@Override
	public int updateAddAccount(Map<String, Object> map) {
		Map<String,Object> parmMap = new HashMap<String, Object>();
		JSONArray jsonArray = JSONArray.parseArray((String) map.get("data"));//设备列表
		int b = 0;
		if(jsonArray.size()>0) {
			List<Map<String,Object>> personList = (List<Map<String, Object>>) ((JSONObject) jsonArray.get(0)).get("person");//人员列表
			//人员对象转换字符串放入list
			String personListStr = "";
			List<String> personList2 = new ArrayList<String>();
			for(int i=0;i<personList.size();i++){
				if(personListStr.equals("")){
					personListStr = personList.get(i).get("holderNo").toString();
				}else{
					personListStr = personListStr + "," + personList.get(i).get("holderNo").toString();
				}
				String oneInfo = JSON.toJSONString(personList.get(i));
				personList2.add(oneInfo);
			}
			
			//获取人员头像信息
			List<Map<String,Object>> photoList = facePayRecordMapper.getPhotoList(personList);
			//头像对象参数转换字符串放入list
			List<String> photoList2 = new ArrayList<String>();
			for(int m=0;m<photoList.size();m++){
				byte[] byt = (byte[]) photoList.get(m).get("imgBase64");
				photoList.get(m).put("imgBase64", Base64.getEncoder().encodeToString(byt));
				
				String oneInfo = JSON.toJSONString(photoList.get(m));
				photoList2.add(oneInfo);
			}
			
			Map<String,Object> passTimeMap1 = new HashMap<String,Object>();
			passTimeMap1.put("passtime", "00:00:01,00:00:02");
			passTimeMap1.put("personId", personListStr);
			String strPassTime = JSON.toJSONString(passTimeMap1);
			
			parmMap.put("deviceList", jsonArray);//设备列表
			parmMap.put("personList", personList2);//人员列表
			parmMap.put("photoList", photoList2);//图片列表
			parmMap.put("passTime", strPassTime.toString());
			b = facePayRecordMapper.updateAddAccount(parmMap);
		}
		
		return b;
	}
	
	/**
	 * 账户禁用/启用
	 * optType=1：启用
	 * optType=12：禁用
	 */
	@Override
	public int updateAddAccountStatus(Map<String, Object> map) {
		JSONArray jsonArray = JSONArray.parseArray((String) map.get("data"));//设备列表
		Map<String,Object> person = (Map<String, Object>) ((JSONObject) jsonArray.get(0)).get("person");//人员ID
		Map<String,Object> parmMap = new HashMap<String, Object>();
		int b = 0;
		parmMap.put("deviceList", jsonArray);
		parmMap.put("person", JSON.toJSONString(person));
		//启用/禁用账户操作
		if(map.get("optType").equals("1")){
			
			//获取人员头像信息
			List<Map<String,Object>> personList = new ArrayList<Map<String,Object>>();
			personList.add(person);
			
			//头像对象参数转换字符串放入list
			List<Map<String,Object>> photoList = facePayRecordMapper.getPhotoList(personList);

			byte[] byt = (byte[]) photoList.get(0).get("imgBase64");
			photoList.get(0).put("imgBase64", Base64.getEncoder().encodeToString(byt));
			String onePhotoInfo = JSON.toJSONString(photoList.get(0));
			
			parmMap.put("photo", onePhotoInfo);
			b = facePayRecordMapper.updateAddAccountStatus1(parmMap);
		}else{
			b = facePayRecordMapper.updateAddAccountStatus2(parmMap);
		}
		return b;
	}
	
	/**
	 * 充值/退费回调
	 */
	@Override
	public int updateAddAccountVal(Map<String, Object> map) {
		List<Map<String,Object>> deviceList = new ArrayList<Map<String,Object>>();
		JSONArray jsonArray = JSONArray.parseArray((String) map.get("data"));//设备列表
		
		if(jsonArray.size()>0){
			String personId = (String) ((JSONObject) jsonArray.get(0)).get("personId");//人员ID
			for(int i=0;i<jsonArray.size();i++){
				String passtime = (String) ((JSONObject) jsonArray.get(i)).get("passtime");//人员时间权限
				if(passtime != null && !passtime.equals("")){
					Map<String,Object> parmMap = new HashMap<String,Object>();
					Map<String,Object> oneInfo = new HashMap<>();
					
					oneInfo.put("personId", personId);
					oneInfo.put("passtime", passtime);
					parmMap.put("deviceSn", ((JSONObject) jsonArray.get(i)).get("deviceSn"));
					parmMap.put("IP", ((JSONObject) jsonArray.get(i)).get("IP"));
					parmMap.put("person", JSON.toJSONString(oneInfo));
					deviceList.add(parmMap);
				}else{
					return 0;
				}
				
			}
		}else{
			return 0;
		}
		
		
		int b=0;
		Map<String,Object> parmMap = new HashMap<String,Object>();
		parmMap.put("deviceList", deviceList);
		if(map.get("optType").toString().equals("1")){
			b = facePayRecordMapper.updateAddAccountVal1(parmMap);
		}else{
			b = facePayRecordMapper.updateAddAccountVal2(parmMap);
		}
		return 0;
	}
	
	/**
	 * 绑定/解除设备
	 * optType 1：绑定
	 * optType 2：解除
	 */
	@Override
	public int updateAddDevice(Map<String, Object> map) {
		Map<String,Object> jsonToMap = JSONObject.parseObject(map.get("data").toString());
		int b = 0;
		if(jsonToMap != null){
			List<Map<String,Object>> personList = (List<Map<String, Object>>) jsonToMap.get("person");//人员列表
			if(personList.size()>0){
				List<String> personList2 = new ArrayList<String>();
				for(int i=0;i<personList.size();i++){
					String oneInfo = JSON.toJSONString(personList.get(i));
					personList2.add(oneInfo);
				}
				jsonToMap.put("personList", personList2);
				if(map.get("optType").toString().equals("1")){
					//获取人员头像信息
					List<Map<String,Object>> photoList = facePayRecordMapper.getPhotoList(personList);
					//头像对象参数转换字符串放入list
					List<String> photoList2 = new ArrayList<String>();
					for(int m=0;m<photoList.size();m++){
						byte[] byt = (byte[]) photoList.get(m).get("imgBase64");
						photoList.get(m).put("imgBase64", Base64.getEncoder().encodeToString(byt));
						
						String oneInfo = JSON.toJSONString(photoList.get(m));
						photoList2.add(oneInfo);
					}
					jsonToMap.put("photoList", photoList2);
					b = facePayRecordMapper.updateAddDevice1(jsonToMap);
				}else{
					b = facePayRecordMapper.updateAddDevice2(jsonToMap);
				}
			}
			
		}
		return b;
	}
	
	/**
	 * 更新身份
	 */
	@Override
	public int updateRoleInfoRecord(Map<String, Object> map) {
		JSONArray jsonArray = JSONArray.parseArray((String) map.get("data"));//设备列表
		int b = 0;
		List<Map<String,Object>> deviceList = new ArrayList<Map<String,Object>>();
		if(jsonArray.size()>0){
			for(int i=0;i<jsonArray.size();i++){
				Map<String,Object> jsonToMap = JSONObject.parseObject(jsonArray.getString(i));
				
				Map<String,Object> timeMap = new HashMap<String,Object>();
				timeMap.put("personId", jsonToMap.get("personId"));
				timeMap.put("passtime", jsonToMap.get("passtime"));
				String oneInfo = JSON.toJSONString(timeMap);
				jsonToMap.put("timesInfo", oneInfo);
				deviceList.add(jsonToMap);
			}
			map.put("data", deviceList);
			b = facePayRecordMapper.updateRoleInfoRecord(map);//添加记录
		}
		
		return b;
	}

}
