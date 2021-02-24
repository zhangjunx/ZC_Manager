package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ZC_ApprovlMapper;
import com.xr.service.ZC_ApprovlService;

@Service
public class ZC_ApprovlServiceImpl implements ZC_ApprovlService {
	
	@Autowired
	private ZC_ApprovlMapper mapper;

	/**
	 * 获取入库单据审批列表
	 */
	@Override
	public Map<String, Object> getApprovalInStoreList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = mapper.getApprovalInStoreList(map);
		int count = mapper.getApprovalInStoreListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据获取成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 获取出库审批单据列表
	 */
	@Override
	public Map<String, Object> getApprovalOutStoreList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = mapper.getApprovalOutStoreList(map);
		int count = mapper.getApprovalOutStoreListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据获取成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 获取借用审批单据列表
	 */
	@Override
	public Map<String, Object> getApprovalBorrowList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = mapper.getApprovalBorrowList(map);
		int count = mapper.getApprovalBorrowListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据获取成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 入库审批
	 */
	@Override
	public Map<String, Object> updateApprovalInStore(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("bill") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "单据号不能为空！");
			return resultMap;
		}
		
		int b = mapper.updateApprovalInStore(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "审核完成！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "程序异常！");
		}
		return resultMap;
	}

	/**
	 * 出库审批
	 */
	@Override
	public Map<String, Object> updateApprovalOutStore(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("bill") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "单据号不能为空！");
			return resultMap;
		}
		
		int b = mapper.updateApprovalOutStore(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "审核完成！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "程序异常！");
		}
		return resultMap;
	}

	/**
	 * 借用审批
	 */
	@Override
	public Map<String, Object> updateApprovalBorrow(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("bill") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "单据号不能为空！");
			return resultMap;
		}
		
		int b = mapper.updateApprovalBorrow(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "审核完成！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "程序异常！");
		}
		return resultMap;
	}

	/**
	 * 获取审批单据详情
	 */
	@Override
	public Map<String, Object> getApprovalBorrowListGoods(Map<String, Object> map) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (map.get("borrowID") == null) {
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "borrowID不能为空！");
			return resultMap;
		}

		List<Map<String, Object>> list = mapper.getApprovalBorrowListGoods(map);
		int count = mapper.getApprovalBorrowListGoodsCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if (count >= 0) {
			resultMap.put("flag", true);
			resultMap.put("reason", "获取成功！");
		} else {
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 设置审批人权限
	 */
	@Override
	public Map<String, Object> setApproverList(Map<String, Object> map) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if(map.get("optType") == null || map.get("optType").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "optType不能为空！");
			return resultMap;
		}
		int b = 0;
		if(map.get("optType").toString().equals("1")){
			b = mapper.setApproverList(map);
		}else{
			b = mapper.setDisApproverList(map);
		}
		if (b >= 0) {
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功！");
		} else {
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败！");
		}
		return resultMap;
	}

	/**
	 * 获取资产的审批人列表
	 */
	@Override
	public Map<String, Object> getApproverList(Map<String, Object> map) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = mapper.getApproverList(map);
		
		if (list.size() >= 0) {
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
			resultMap.put("result", list);
		} else {
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
			resultMap.put("result", null);
		}
		return resultMap;
	}

}
