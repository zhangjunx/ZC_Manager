package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ZC_InStoreGoodsWaringMapper;
import com.xr.service.ZC_InStoreGoodsWaringService;

@Service
public class ZC_InStoreGoodsWaringServiceImpl implements ZC_InStoreGoodsWaringService {
	
	@Autowired
	private ZC_InStoreGoodsWaringMapper waringMapper;

	/**
	 * 获取报废列表
	 */
	@Override
	public Map<String, Object> getScrapList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = waringMapper.getScrapList(map);
		int count = waringMapper.getScrapListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count > 0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 添加报废物品
	 */
	@Override
	public Map<String, Object> addScrapList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		int b = waringMapper.addScrapList(map);
		int b2 = waringMapper.deleteOneFromStoreGoods(map);//删除库存中的物品
		if(b>=0){
			resultMap.put("result", 1);
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功！");
		}else{
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败！");
		}
		return resultMap;
	}

	/**
	 * 获取退役物品列表
	 */
	@Override
	public Map<String, Object> getRetireList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = waringMapper.getRetireList(map);
		int count = waringMapper.getRetireListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count > 0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 添加退役物品
	 */
	@Override
	public Map<String, Object> addRetireList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		int b = waringMapper.addRetireList(map);
		int b2 = waringMapper.deleteOneFromStoreGoods(map);//删除库存中的物品
		if(b>=0){
			resultMap.put("result", 1);
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功！");
		}else{
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败！");
		}
		return resultMap;
	}

}
