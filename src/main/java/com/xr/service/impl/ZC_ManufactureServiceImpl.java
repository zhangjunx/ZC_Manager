package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ZC_ManufactureMapper;
import com.xr.service.ZC_ManufactureService;

@Service
public class ZC_ManufactureServiceImpl implements ZC_ManufactureService {
	
	@Autowired
	private ZC_ManufactureMapper manufactureMapper;

	/**
	 * 列表
	 */
	@Override
	public Map<String, Object> getList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = manufactureMapper.getList(map);
		int count = manufactureMapper.getListCount(map);
		if(count>0){
			resultMap.put("count", count);
			resultMap.put("result", list);
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 添加/编辑
	 */
	@Override
	public Map<String, Object> saveInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		//参数验证
		Map<String,Object> checkInfo = manufactureMapper.getSumWithName(map);//生产厂家名称验证
		//Map<String,Object> checkInfo2 = manufactureMapper.getSumWithName2(map);//供应厂商名称验证
		if(checkInfo != null){
			if(map.get("fid").toString().equals("")){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "生产厂家名称已经存在！");
				return resultMap;
			}else if(!map.get("fid").toString().equals("") && !checkInfo.get("fid").toString().equals(map.get("fid").toString()) ){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "生产厂家名称已经存在！");
				return resultMap;
			}
		}
		
		/*if(checkInfo2 != null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "供应厂家名称已经存在！");
			return resultMap;
		}*/
		
		int b=0;
		if(map.get("fid") == null || map.get("fid").toString().equals("")){//新增
			b = manufactureMapper.saveInfo(map);
		}else{//编辑
			b = manufactureMapper.editInfo(map);
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
		//int b = mapper.saveInfo(map);
		return resultMap;
	}

	@Override
	public Map<String, Object> getOne(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		Map<String,Object> result = manufactureMapper.getOne(map);
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

	@Override
	public Map<String, Object> delOne(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常，fid不能为空");
			return resultMap;
		}
		
		int b = manufactureMapper.delOne(map);
		
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

}
