package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.RC_PrisonMapper;
import com.xr.service.RC_PrisonService;

@Service
public class RC_PrisonServiceImpl implements RC_PrisonService {
	
	@Autowired
	private RC_PrisonMapper prisonMapper;

	/**
	 * 获取监区列表
	 */
	@Override
	public Map<String, Object> getPrisonList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = prisonMapper.getPrisonList(map);
		int count = prisonMapper.getPrisonListCount(map);
		resultMap.put("result", list);
		resultMap.put("count",count);
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
	 * 添加/编辑监区信息
	 * fid为空是新增，否则是编辑
	 */
	@Override
	public Map<String, Object> addPrisonInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("status") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "监区状态参数不能为空！");
			return resultMap;
		}
		
		if(map.get("prisonName") == null || map.get("prisonName").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "监区名称不能为空！");
			return resultMap;
		}
		
		Map<String,Object> checkInfo = prisonMapper.getSumWithName(map);
		if(checkInfo != null){
			if(map.get("fid").toString().equals("")){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "监区名称已经存在！");
				return resultMap;
			}else if(!map.get("fid").toString().equals("") && !checkInfo.get("fid").toString().equals(map.get("fid").toString()) ){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "监区名称已经存在！");
				return resultMap;
			}
		}
		
		int b = 0;
		if(map.get("fid").toString().equals("")){
			b = prisonMapper.addPrisonInfo(map);
		}else{
			b = prisonMapper.editPrisonInfo(map);
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

	/**
	 * 获取一条监狱信息
	 */
	@Override
	public Map<String, Object> getOnePrisonInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		Map<String,Object> result = prisonMapper.getOnePrisonInfo(map);
		
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
	 * 删除一条信息
	 */
	@Override
	public Map<String, Object> delOnePrisonInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		int b = prisonMapper.delOnePrisonInfo(map);
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常，fid不能为空");
			return resultMap;
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

	/**
	 * 监区分配标签
	 */
	@Override
	public Map<String, Object> updatePrisonLabel(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("prisonID") == null || map.get("prisonID").toString().equals("") 
				|| map.get("labelCode")==null || map.get("labelCode").toString().equals("") 
				||map.get("optType") == null||map.get("optType").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！！");
			return resultMap;
		}
		
		int sum = prisonMapper.getSumWithLabelCode(map);
		if(sum > 0){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "标签已经在使用中！！");
			return resultMap;
		}
		
		int b = 0;
		if(map.get("optType").toString().equals("1")){//绑定标签
			b = prisonMapper.updatePrisonLabel(map);
		}else if(map.get("optType").toString().equals("2")){//更换标签
			b = prisonMapper.changePrisonLabel(map);
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
