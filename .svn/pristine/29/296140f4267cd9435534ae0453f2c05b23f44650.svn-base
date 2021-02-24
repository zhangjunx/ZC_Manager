package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.xr.dao.FP_ConsumeRoleMapper;
import com.xr.dao.FP_HolderAccountMapper;
import com.xr.service.FP_HolderAccountService;

@Service
public class FP_HolderAccountServiceImpl implements FP_HolderAccountService {

	@Autowired
	private FP_HolderAccountMapper holderAccountDataMapper;
	
	@Autowired
	private FP_ConsumeRoleMapper consumeTypeDataMapper;
	
	/**
	 * 获取账户列表
	 */
	@Override
	public Map<String, Object> getAccountList(Map<String, Object> map) {
		Map<String,Object> resultMapp = new HashMap<String, Object>();
		List<Map<String,Object>> list = holderAccountDataMapper.getAccountList(map);
		int count = holderAccountDataMapper.getAccountListCount(map);
		resultMapp.put("result", list);
		resultMapp.put("count", count);
		return resultMapp;
	}

	/**
	 * 批量添加账户
	 */
	@Override
	public Map<String,Object> addAccountList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();//返回结果
		//添加账户信息
		int b = holderAccountDataMapper.addAccountList(map);
		//为账户分配身份
		if(b>=0){
			//一下为同步设备数据做准备
			List<Map<String,Object>> list1 = (List<Map<String, Object>>) map.get("list");//账户列表
			for(int i=0;i<list1.size();i++){
				list1.get(i).put("id", list1.get(i).get("holderNo"));
			}
			List<Map<String,Object>> list2 = consumeTypeDataMapper.getDeviceListWithRole(map);//根据身份获取设备列表
			for(int i=0;i<list2.size();i++){
				list2.get(i).put("person", list1);
			}
			resultMap.put("resultList", JSON.toJSON(list2).toString());
		}
		resultMap.put("result", b);
		return resultMap;
	}

	/**
	 * 停用/启用账户
	 */
	@Override
	public Map<String,Object> updateAccountStatus(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();//返回结果
		int b = holderAccountDataMapper.updateAccountStatus(map);
		if(b>=0){
			//一下为同步设备数据做准备
			List<Map<String,Object>> list2 = holderAccountDataMapper.getDeviceListWithPer(map);
			Map<String,Object> oneInfo = new HashMap<String,Object>();
			oneInfo.put("id", map.get("holderNo"));
			oneInfo.put("name", map.get("name"));
			oneInfo.put("idcardNum", map.get("idcardNum"));
			oneInfo.put("iDNumber", map.get("iDNumber"));
			for(int i=0;i<list2.size();i++){
				list2.get(i).put("person", oneInfo);
			}
			resultMap.put("resultList", JSON.toJSON(list2).toString());
		}
		resultMap.put("result", b);
		return resultMap;
	}

	/**
	 * 获取充值记录列表
	 */
	@Override
	public Map<String, Object> getRechargingRecordList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<>();
		List<Map<String,Object>> list = holderAccountDataMapper.getRechargingRecordList(map);
		int count = holderAccountDataMapper.getRechargingRecordListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	/**
	 * 账户充值/退费
	 * optType=1:充值
	 * optType=2:退费
	 * rechargingType=1：平台充值
	 * rechargingType=2：小程序充值
	 */
	@Override
	public Map<String,Object> updateRecharging(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		int b = 0;
		if(map.get("rechargingType").toString().equals("2")){
			if(map.get("optType").toString().equals("1")){
				b = holderAccountDataMapper.updateRechargingApp(map);
			}
			if(map.get("optType").toString().equals("2")){
				b = holderAccountDataMapper.refundsApp(map);
			}
		}else{
			if(map.get("optType").toString().equals("1")){
				b = holderAccountDataMapper.updateRecharging(map);
			}
			if(map.get("optType").toString().equals("2")){
				b = holderAccountDataMapper.refunds(map);
			}
		}
		
		//为同步设备数据做准备
		List<Map<String,Object>> deviceList = consumeTypeDataMapper.getDeviceListWithRole(map);//根据身份获取设备列表
		//根据身份获取时间列表
		map.put("consumeTypeID", map.get("consumeRoleID"));
		List<Map<String,Object>> timeList = consumeTypeDataMapper.getTimesListWithRole(map);
		for(int i=0;i<deviceList.size();i++){
			String passtime="";
			for(int j=0;j<timeList.size();j++){
				if(timeList.get(j).get("restaurantID").toString().equals(deviceList.get(i).get("restaurantID").toString())){
					if(passtime.equals("")){
						passtime = timeList.get(j).get("startTime")+":00"+","+timeList.get(j).get("endTime")+":00";
					}else{
						passtime = passtime+","+timeList.get(j).get("startTime")+":00"+","+timeList.get(j).get("endTime")+":00";
					}
				}
			}
			deviceList.get(i).put("personId", map.get("holderNo"));
			deviceList.get(i).put("passtime", passtime);
		}
		
		resultMap.put("resultList", JSON.toJSON(deviceList).toString());
		resultMap.put("result", b);
		return resultMap;
	}

	/**
	 * 获取账户表中不存在的员工信息
	 */
	@Override
	public Map<String, Object> getHolderList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = holderAccountDataMapper.getHolderList(map);
		int count = holderAccountDataMapper.getHolderListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	/**
	 * 为人员分配消费模式
	 */
	@Override
	public int updateConsumeTypeID(Map<String, Object> map) {
		int b = holderAccountDataMapper.updateConsumeTypeID(map);
		return b;
	}

	/**
	 * 查询身份下的账户列表
	 * 返回结果：
	 * resultType=1：已经被该身份绑定的账户
	 * resultType=2：未被该身份绑定的账户
	 */
	@Override
	public Map<String, Object> getAccountRoleList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = holderAccountDataMapper.getAccountRoleList(map);
		int count = holderAccountDataMapper.getAccountRoleListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}
	
}
