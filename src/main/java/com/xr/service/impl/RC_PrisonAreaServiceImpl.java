package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.RC_PrisonAreaMapper;
import com.xr.service.RC_PrisonAreaService;

@Service
public class RC_PrisonAreaServiceImpl implements RC_PrisonAreaService {
	
	@Autowired
	private RC_PrisonAreaMapper prisonAreaMapper;	

	/**
	 * 获取区域列表
	 */
	@Override
	public Map<String, Object> getPrisonAreaList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = prisonAreaMapper.getPrisonAreaList(map);
		int count = prisonAreaMapper.getPrisonAreaListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功。");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 新增/编辑区域数据
	 * fid不为空时：编辑，否则：新增
	 */
	@Override
	public Map<String, Object> addPrisonArea(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		//参数验证
		if(map.get("status") == null || map.get("status").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "区域状态参数不能为空！");
			return resultMap;
		}
		
		if(map.get("fid") == null){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常，fid不能为null");
			return resultMap;
		}
		
		if(map.get("areaName") == null || map.get("areaName").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "区域名称不能为空！");
			return resultMap;
		}
		
		Map<String,Object> checkInfo = prisonAreaMapper.getSumWithName(map);
		if(checkInfo != null){
			if(map.get("fid").toString().equals("")){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "区域名称已经存在！");
				return resultMap;
			}else if(!map.get("fid").toString().equals("") && !checkInfo.get("fid").toString().equals(map.get("fid").toString()) ){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "区域名称已经存在！");
				return resultMap;
			}
		}
		
		int b=0;
		if(map.get("fid") == null || map.get("fid").toString().equals("")){//新增
			b = prisonAreaMapper.addPrisonArea(map);
		}else{//编辑
			b = prisonAreaMapper.editPrisonArea(map);
		}
		
		if(b>=0){
			resultMap.put("result", b);
			resultMap.put("flag", true);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("result", b);
			resultMap.put("flag", false);
			resultMap.put("reason", "数据更新失败！");
		}
		
		return resultMap;
	}

	/**
	 * 获取一条区域信息
	 */
	@Override
	public Map<String, Object> getOnePrisonArea(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		Map<String,Object> result = prisonAreaMapper.getOnePrisonArea(map);
		if(result != null){
			resultMap.put("flag", true);
			resultMap.put("result", result);
			resultMap.put("reason", "数据查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "数据不存在！");
		}
		return resultMap;
	}

	/**
	 * 删除一条区域信息
	 */
	@Override
	public Map<String, Object> delOnePrisonArea(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常，fid不能为空");
			return resultMap;
		}
		
		int b = prisonAreaMapper.delOnePrisonArea(map);
		
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
	 * 绑定/更换标签
	 * optType=1：为绑卡
	 * optType=2：为换卡
	 */
	@Override
	public Map<String, Object> updateAreaLabel(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("prisonAreaID") == null || map.get("prisonAreaID").toString().equals("") 
				|| map.get("labelCode") == null || map.get("labelCode").toString().equals("") 
				|| map.get("optType") == null || map.get("optType").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！！");
			return resultMap;
		}
		
		int sum = prisonAreaMapper.getSumWithLabelCode(map);
		if(sum > 0){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "标签已经在使用中！！");
			return resultMap;
		}
		
		int b = 0;
		if(map.get("optType").toString().equals("1")){//绑定标签
			b = prisonAreaMapper.updateAreaLabel(map);
		}else if(map.get("optType").toString().equals("2")){//更换标签
			b = prisonAreaMapper.changeAreaLabel(map);
		}
		
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新失败！");
		}
		return resultMap;
	}

}
