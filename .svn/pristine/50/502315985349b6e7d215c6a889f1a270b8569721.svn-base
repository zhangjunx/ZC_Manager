package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.Limit_MenuMapper;
import com.xr.dao.Limit_MenuPublicMapper;
import com.xr.service.Limit_MenuPublicService;

@Service
public class Limit_MenuPublicServiceImpl implements Limit_MenuPublicService {
	
	@Autowired
	private Limit_MenuPublicMapper mapper;
	
	@Autowired
	private Limit_MenuMapper menuMapper;

	/**
	 * 获取模块列表
	 * @param map
	 * @return
	 */
	@Override
	public Map<String, Object> getList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		/*if(!map.get("thisHolderNo").toString().equals("administrator")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "你没有查看权限！");
			return resultMap;
		}*/
		
		List<Map<String,Object>> list = mapper.getList(map);
		int count = mapper.getListCount(map);
		resultMap.put("count", count);
		resultMap.put("result", list);
		if(count>=0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据!");
		}
		return resultMap;
	}

	/**
	 * 添加/取消模块权限
	 * limitStatus=1:添加权限
	 * limitStatus=2:取消权限
	 * @param map
	 * @return
	 */
	@Override
	public Map<String, Object> updateMenuPublicLimit(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		/*if(!map.get("thisHolderNo").toString().equals("administrator")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "你没有操作权限！");
			return resultMap;
		}*/
		if(map.get("limitStatus") == null || map.get("limitStatus").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "limitStatus不能为空！");
			return resultMap;
		}
		
		if(map.get("ID") == null || map.get("ID").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "ID不能为空！");
			return resultMap;
		}
		int b = mapper.updateMenuPublicLimit(map);
		
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", 1);
			resultMap.put("reason", "更新成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "更新失败！");
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> getUserLimitList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = null;
		if(map.get("thisHolderNo") == null || map.get("thisHolderNo").toString().equals("administrator")
				|| map.get("thisHolderNo").toString().equals("Administrator")){
			list = mapper.getUserLimitListWithAdministrator(map);
		}else{
			List<Map<String,Object>> btnList = mapper.getBtnListWithHolder(map);
			String btnStr = "'-1'";
			if(btnList != null && btnList.size()>0){
				for(int i=0;i<btnList.size();i++){
					btnStr = btnStr + ",'" + btnList.get(i).get("id").toString()+"'";
				}
			}
			map.put("btnStr", btnStr);
			list = mapper.getUserLimitList(map);
		}
		
		resultMap.put("flag", true);
		resultMap.put("result", list);
		resultMap.put("reason", "查询成功！");
		return resultMap;
	}

	@Override
	public Map<String, Object> getOperateList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("modelCode") == null || map.get("modelCode").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "modelCode不能为空！");
			return resultMap;
		}
		List<Map<String,Object>> list = mapper.getOperateList(map);
		resultMap.put("flag", true);
		resultMap.put("result", list);
		resultMap.put("reason", "查询成功！");
		return resultMap;
	}

}
