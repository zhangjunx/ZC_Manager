package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.dao.RC_PrisonAppDeviceMapper;
import com.xr.service.RC_PrisonAppDeviceService;

@Service
public class RC_PrisonAppDeviceServiceImpl implements RC_PrisonAppDeviceService {
	
	@Autowired
	private RC_PrisonAppDeviceMapper prisonAppDeviceMapper;
	
	/**
	 * 获取APP设备列表
	 */
	@Override
	public Map<String, Object> getAppDeviceList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = prisonAppDeviceMapper.getAppDeviceList(map);
		int count = prisonAppDeviceMapper.getAppDeviceListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count>0){
			resultMap.put("flag", true);
			resultMap.put("reson","查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reson","暂无数据！");
		}
		
		return resultMap;
	}

	/**
	 * APP设备信息注册
	 */
	@Override
	public Map<String, Object> addAppDevice(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> checkInfo = prisonAppDeviceMapper.getSumWithSn(map);
		if(checkInfo != null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "SN号为："+map.get("deviceAppSn")+"的设备已经存在！");
			return resultMap;
		}
		
		int b = prisonAppDeviceMapper.addAppDevice(map);
		
		if(b>=0){
			resultMap.put("result", b);
			resultMap.put("flag", true);
			resultMap.put("reason", "设备注册成功！");
		}else{
			resultMap.put("result", b);
			resultMap.put("flag", false);
			resultMap.put("reason", "设备注册失败！");
		}
		
		return resultMap;
	}

	/**
	 * 获取一条信息
	 */
	@Override
	public Map<String, Object> getOneAppDevice(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		Map<String,Object> result = prisonAppDeviceMapper.getOneAppDevice(map);
		if(result != null){
			resultMap.put("result", result);
			resultMap.put("flag", true);
			resultMap.put("reason", "数据查询成功！");
		}else{
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "数据不存在！");
		}
		return resultMap;
	}

	/**
	 * 删除一个设备信息
	 */
	@Override
	public Map<String, Object> delOneAppDevice(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		if(map.get("fid") == null){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常，fid不能为null");
			return resultMap;
		}
		
		int b = prisonAppDeviceMapper.delOneAppDevice(map);
		
		if(b>=0){
			resultMap.put("result", b);
			resultMap.put("flag", true);
			resultMap.put("reason", "数据删除成功！");
		}else{
			resultMap.put("result", b);
			resultMap.put("flag", false);
			resultMap.put("reason", "数据删除失败！");
		}
		
		return resultMap;
	}
	
	/**
	 * 设备审核
	 */
	@Override
	public Map<String, Object> updateAppDeviceStatus(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("status") == null || map.get("status").toString().equals("")
				|| map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		int b = prisonAppDeviceMapper.updateAppDeviceStatus(map);
		
		if(b>=0){
			resultMap.put("result", 1);
			resultMap.put("flag", true);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("result", 1);
			resultMap.put("flag", false);
			resultMap.put("reason", "数据更新失败！");
		}
		return resultMap;
	}
	
	/**
	 * app绑定/解除用户
	 * optType=1：添加
	 * optType=2：删除
	 */
	@Override
	public Map<String, Object> addAppUserRelation(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("optType") == null || map.get("optType").toString().equals("")
				|| map.get("deviceAppID") == null || map.get("deviceAppID").toString().equals("")
				|| map.get("holderNo") == null || map.get("holderNo").toString().equals("")){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		int b = 0;
		if(map.get("optType").toString().equals("1")){
			b = prisonAppDeviceMapper.addAppUserRelation(map);
		}else if(map.get("optType").toString().equals("2")){
			b = prisonAppDeviceMapper.delAppUserRelation(map);
		}
		
		if(b>=0){
			resultMap.put("result", 1);
			resultMap.put("flag", true);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("result", 1);
			resultMap.put("flag", false);
			resultMap.put("reason", "数据更新失败！");
		}
		return resultMap;
	}

	/**
	 * 获取设备已经选择的用户列表
	 * 返回结果：
	 * resultType=1：已选的用户
	 * resultType=2：未选的用户
	 */
	@Override
	public Map<String, Object> getHolderList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = prisonAppDeviceMapper.getHolderList(map);
		if(list.size()>0){
			resultMap.put("result", list);
			resultMap.put("flag", true);
		}else{
			resultMap.put("result", 0);
			resultMap.put("flag", false);
		}
		return resultMap;
	}

	/**
	 * 登录验证
	 */
	@Override
	public Map<String, Object> checkLogin(Map<String, Object> map) {
		Map<String,Object> resultMp = prisonAppDeviceMapper.getUserInfo(map);
		return resultMp;
	}
	
	/**
	 * 同步监区数据
	 * map参数：设备中已存在的监区ID以及更新时间
	 * 返回结果：
	 * addList：新增的监区信息
	 * delList：删除的监区信息
	 * updateList：更新的监区信息
	 */
	@Override
	public Map<String, Object> downLoadPrison(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> addList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> updateList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> delList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list = prisonAppDeviceMapper.getPrisonListWithUpdateTime(map);
		for(int i=0;i<list.size();i++){
			if(list.get(i).get("resultType").toString().equals("1")){
				addList.add(list.get(i));
				continue;
			}else if(list.get(i).get("resultType").toString().equals("2")){
				updateList.add(list.get(i));
				continue;
			}else if(list.get(i).get("resultType").toString().equals("3")){
				delList.add(list.get(i));
				continue;
			}
		}
		if(list != null && list.size() > 0){
			resultMap.put("addList", addList);
			resultMap.put("updateList", updateList);
			resultMap.put("delList", delList);
			resultMap.put("flag", true);
		}else{
			resultMap.put("result", 0);
			resultMap.put("flag", false);
		}
		return resultMap;
	}

	/**
	 * 下载区域信息
	 * map参数：设备中已存在的区域ID以及更新时间
	 * 返回结果：
	 * addList：新增的区域信息
	 * delList：删除的区域信息
	 * updateList：更新的区域信息
	 */
	@Override
	public Map<String, Object> downLoadPrisonArea(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> addList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> updateList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> delList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list = prisonAppDeviceMapper.getPrisonAreaListWithUpdateTime(map);
		for(int i=0;i<list.size();i++){
			if(list.get(i).get("resultType").toString().equals("1")){
				addList.add(list.get(i));
				continue;
			}else if(list.get(i).get("resultType").toString().equals("2")){
				updateList.add(list.get(i));
				continue;
			}else if(list.get(i).get("resultType").toString().equals("3")){
				delList.add(list.get(i));
				continue;
			}
		}
		if(list != null && list.size() > 0){
			resultMap.put("addList", addList);
			resultMap.put("updateList", updateList);
			resultMap.put("delList", delList);
			resultMap.put("flag", true);
		}else{
			resultMap.put("result", 0);
			resultMap.put("flag", false);
		}
		return resultMap;
	}

	/**
	 * 下载犯人信息
	 * map参数：
	 * updateDate：设备同步人员的最新时间，第一次同步updateDate为空
	 * 返回结果：
	 * addList：新增的犯人信息
	 * delList：删除的犯人信息
	 * updateList：更新的犯人信息
	 */
	@Override
	public Map<String, Object> downLoadPrisoner(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> addList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> updateList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> delList = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list = prisonAppDeviceMapper.getPrisonerListWithUpdateTime(map);
		for(int i=0;i<list.size();i++){
			if(list.get(i).get("resultType").toString().equals("1")){
				addList.add(list.get(i));
				continue;
			}else if(list.get(i).get("resultType").toString().equals("2")){
				updateList.add(list.get(i));
				continue;
			}else if(list.get(i).get("resultType").toString().equals("3")){
				delList.add(list.get(i));
				continue;
			}
		}
		if(list != null && list.size() > 0){
			resultMap.put("addList", addList);
			resultMap.put("updateList", updateList);
			resultMap.put("delList", delList);
			resultMap.put("flag", true);
		}else{
			resultMap.put("result", 0);
			resultMap.put("flag", false);
		}
		return resultMap;
	}

	/**
	 * 下载犯人头像
	 * map参数：犯人ID
	 */
	@Override
	public Map<String, Object> downLoadPrisonerPic(Map<String, Object> map) {
		Map<String,Object> resultMap = prisonAppDeviceMapper.downLoadPrisonerPic(map);
		return resultMap;
	}
}
