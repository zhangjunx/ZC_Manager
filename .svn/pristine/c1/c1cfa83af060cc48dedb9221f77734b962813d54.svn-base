package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.xr.dao.FP_RestaurantMapper;
import com.xr.service.FP_RestaurantService;

@Service
public class FP_RestaurantServiceImpl implements FP_RestaurantService {

	@Autowired
	private FP_RestaurantMapper restaurantDataMapper;
	/**
	 * 添加/更新餐厅数据
	 * 字段fid不为空更新，否则新增
	 */
	@Override
	public int addRestaurant(Map<String, Object> map) {
		int b=0;
		//新增
		if(map.get("fid").equals("") || map.get("fid") == null){
			b = restaurantDataMapper.addRestaurant(map);
		}else{
			b = restaurantDataMapper.editRestaurant(map);
		}
		
		return b;
	}
	
	/**
	 * 获取餐厅列表
	 */
	@Override
	public Map<String, Object> getRestaurantList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String, Object>> list = restaurantDataMapper.getRestaurantList(map);
		int count = restaurantDataMapper.getRestaurantListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	/**
	 * 删除一条数据
	 */
	@Override
	public int delRestaurant(Map<String, Object> map) {
		int b = restaurantDataMapper.delRestaurant(map);
		return b;
	}

	/**
	 * 获取一条信息
	 */
	@Override
	public Map<String, Object> getOneRestaurant(Map<String, Object> map) {
		Map<String, Object> oneInfo = restaurantDataMapper.getOneRestaurant(map);
		return oneInfo;
	}

	/**
	 * 为餐厅分配设备
	 * optType=1为新增设备
	 * optType=2为取消设备
	 * restaurantID:餐厅ID
	 * deviceNo:设备ID
	 */
	@Override
	public Map<String, Object> apportionDevices(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashedMap<String,Object>();
		int b = 0;
		if(map.get("optType").equals("1")){
			b = restaurantDataMapper.apportionDevices(map);
		}else if(map.get("optType").equals("2")){
			b = restaurantDataMapper.unApportionDevices(map);
		}
		
		//根据设备ID获取设备信息
		Map<String,Object> deviceInfo = restaurantDataMapper.getDeviceInfoWithID(map);
		//根据设备获取人员信息
		List<Map<String,Object>> perList = restaurantDataMapper.getPerListWithDeviceID(deviceInfo);
		deviceInfo.put("person", perList);
		
		resultMap.put("resultList", JSON.toJSONString(deviceInfo));
		resultMap.put("result", b);
		return resultMap;
	}

	/**
	 * 
	 * 获取设备列表
	 * 返回结果：
	 * resultType=1：可以选择的设备
	 * resultType=2：已选择的设备
	 * resultType=3：被其他设备占用的设备
	 * 参数：餐厅restaurantID必填参数
	 */
	@Override
	public List<Map<String, Object>> getDeviceList(Map<String, Object> map) {
		//获取设备列表
		List<Map<String, Object>> list = restaurantDataMapper.getDeviceList(map);
		return list;
	}

}
