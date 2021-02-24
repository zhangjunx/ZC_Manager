package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.DeviceUnit2Mapper;
import com.xr.dao.DoorUnit2Mapper;
import com.xr.service.DoorUnit2Service;
import com.xr.util.TreeToolUtils;

@Service
public class DoorUnit2ServiceImpl implements DoorUnit2Service {
	
	@Autowired
	private DoorUnit2Mapper doorUnitMpper;
	/**
	 * 获取门区列表
	 * queryType=1获取门区列表
	 * queryType=2获取通道列表
	 */
	@Override
	public Map<String, Object> getDoorLit(Map<String, Object> map) {
		Map<String,Object> resMap = new HashMap<String, Object>();
		if(map.get("queryType").equals("1")){
			List<Map<String,Object>> list = doorUnitMpper.getDoorLit(map);
			Integer count = doorUnitMpper.getDoorLitCount(map);
			resMap.put("result", list);
			resMap.put("count", count);
			return resMap;
		}else{
			List<Map<String,Object>> list = doorUnitMpper.getDoorChannelLit(map);
			Integer count = doorUnitMpper.getDoorChannelLitCount(map);
			resMap.put("result", list);
			resMap.put("count", count);
			return resMap;
		}
		
	}

	/**
	 * 新增/编辑门区数据
	 * SaveSource=10保存的是门区信息
	 * DoorNo 为空时，新增
	 * DoorNo 不为空，编辑
	 * 
	 * 新增/编辑通道数据
	 * SaveSource == 20 保存通道信息
	 * ID 为空时，新增
	 * ID 不为空，编辑
	 */
	@Override
	public Integer saveDoorInfo(Map<String,Object> map) {
		Integer b = saveThisDoorInfo(map);
		/*if(map.get("SaveSource").equals("10")){
			//保存门区信息
			b = saveThisDoorInfo(map);
		}else{
			//保存通道信息
			b = saveThisChannelInfo(map);
		}*/
		return b;
	}

	/**
	 * 保存通道信息
	 * ID不为空，编辑
	 * ID为空时，新增
	 * @param map
	 * @return
	 */
	private Integer saveThisChannelInfo(Map<String, Object> map) {
		Integer b=0;
		if(!map.get("ID").toString().trim().equals("")
				&& map.get("ID") != null){
			b = doorUnitMpper.editChannelInfo(map);
		}else{
			//获取门区最大ID
			//Integer maxno = doorUnitMpper.getChannelMaXIndex();
			//map.put("ID", maxno+1);
			b = doorUnitMpper.saveChannelInfo(map);
		}
		return b;
	}

	/**
	 * 保存门区信息
	 * DoorNo不为空，编辑
	 * DoorNo为空时，新增
	 * @param map
	 * @return
	 */
	private Integer saveThisDoorInfo(Map<String, Object> map) {
		Integer b=0;
		if(!map.get("DoorNo").toString().trim().equals("")
				&& map.get("DoorNo") != null){
			b = doorUnitMpper.editDoorInfo(map);
		}else{
			//获取门区最大ID
			//Integer maxno = doorUnitMpper.getDoorMaXIndex();
			//map.put("DoorNo", maxno+1);
			b = doorUnitMpper.saveDoorInfo(map);
		}
		return b;
	}

	/**
	 * 获取一条门区信息
	 * tableType=10 查询一条门区信息
	 * id为门区表的DoorNo
	 * 
	 * tableType=20 查询一条通道信息
	 * id为通道表的ID
	 */
	@Override
	public List<Map<String, Object>> getOneDoorInfo(Map<String, Object> map) {
		List<Map<String, Object>> list = doorUnitMpper.getOneDoorInfo(map);
		return list;
		/*if(map.get("tableType").equals("10")){
			//获取一条门区信息
			List<Map<String, Object>> list = doorUnitMpper.getOneDoorInfo(map);
			return list;
		}else{
			//获取一条通道信息
			List<Map<String, Object>> list = doorUnitMpper.getOneChnnelInfo(map);
			return list;
		}*/
	}

	/**
	 * 删除一条门区信息
	 * tableType=10 删除一条门区信息
	 * id为门区表的DoorNo
	 * 
	 * tableType=20 删除一条通道信息
	 * id为通道表的ID
	 */
	@Override
	public Integer delOneDoorInfo(Map<String, Object> map) {
		//删除一条门区信息
		Integer b = doorUnitMpper.delOneDoorInfo(map);
		return b;
		/*Integer b = 0;
		if(map.get("tableType").equals("10")){
			//删除一条门区信息
			b = doorUnitMpper.delOneDoorInfo(map);
			return b;
		}else{
			//删除一条通道信息
			b = doorUnitMpper.delOneChannelInfo(map);
			return b;
		}*/
	}

	@Override
	public List<Map<String, Object>> getRederTypeCombo(Map<String, Object> map) {
		List<Map<String, Object>> list = doorUnitMpper.getRederTypeCombo(map);
		return list;
	}

	@Override
	public List<Map<String, Object>> getDeviceTreeList() {
		List<Map<String,Object>> list = doorUnitMpper.getDeviceTreeList();
		List<Map<String,Object>> treeList = new ArrayList<Map<String,Object>>();
		TreeToolUtils u = new TreeToolUtils();
		treeList = u.menuList(list,true);
		return treeList;
	}

	@Override
	public List<Map<String, Object>> getAreaListCombo(Map<String, Object> map) {
		List<Map<String, Object>> list = doorUnitMpper.getAreaListCombo(map);
		List<Map<String,Object>> treeList = new ArrayList<Map<String,Object>>();
		TreeToolUtils u = new TreeToolUtils();
		treeList = u.menuList(list,true);
		return treeList;
	}

	@Override
	public Map<String, Object> getDoorWithAEFService(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String, Object>> list = doorUnitMpper.getDoorWithAEFService(map);
		if(list.size()>0){
			resultMap.put("result", list);
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
		}else{

			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据");
		
		}
		return resultMap;
	}

	/**
	 * 在门区列表中勾选属于犯人通道的门区
	 */
	@Override
	public Map<String, Object> updateDoorPrisonerCheck(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("optType") == null || map.get("optType").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "optType不能为空！");
			return resultMap;
		}
		int b = doorUnitMpper.updateDoorPrisonerCheck(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "更新失败！");
		}
		return resultMap;
	}

	/**
	 * 获取门区列表，分为勾选犯人的与未勾选犯人的
	 */
	@Override
	public Map<String, Object> getDoorPrisonerCheck(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = doorUnitMpper.getDoorPrisonerCheck(map);
		if(list.size()>0){
			resultMap.put("flag", true);
			resultMap.put("result", list);
			resultMap.put("reason", "查询成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", null);
			resultMap.put("reason", "暂无数据!");
		}
		return resultMap;
	}

	/**
	 * 设置门区操作权限
	 */
	@Override
	public Map<String, Object> setABDoorLimit(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("pageID") == null || map.get("pageID").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "pageID不能为空！");
			return resultMap;
		}
		
		if(map.get("holderNo") == null || map.get("holderNo").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "holderNo不能为空！");
			return resultMap;
		}
		if(map.get("doorID") == null || map.get("doorID").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "doorID不能为空！");
			return resultMap;
		}
		if(map.get("optType") == null || map.get("optType").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "optType不能为空！");
			return resultMap;
		}
		
		int b = 0;
		if(map.get("optType").toString().equals("1")){
			b = doorUnitMpper.setABDoorLimit(map);
		}
		if(map.get("optType").toString().equals("2")){
			b = doorUnitMpper.setDisABDoorLimit(map);
		}
		
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "更新成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "更新失败!");
		}
		return resultMap;
	}

	/**
	 * 获取门区操作权限
	 */
	@Override
	public Map<String, Object> getABDoorLimit(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("pageID") == null || map.get("pageID").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "pageID不能为空！");
			return resultMap;
		}
		
		List<Map<String,Object>> list = null;
		//获取AB门门区
		if(map.get("pageID").toString().equals("1")){
			list = doorUnitMpper.getABDoorList(map);
		}
		if(map.get("pageID").toString().equals("2")){
			list = doorUnitMpper.getPrisonDoorList(map);
		}
		
		if(list != null && list.size()>0){
			resultMap.put("flag", true);
			resultMap.put("result", list);
			resultMap.put("reason", "查询成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", null);
			resultMap.put("reason", "暂无数据!");
		}
		return resultMap;
	}

}
