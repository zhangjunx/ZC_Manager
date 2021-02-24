package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.DoorControlPrisonerMapper;
import com.xr.service.DoorControlPrisonerService;

@Service
public class DoorControlPrisonerServiceImpl implements DoorControlPrisonerService {
	
	@Autowired
	private DoorControlPrisonerMapper mapper;

	/**
	 * 获取登录人员的管理的监区门区列表
	 */
	@Override
	public Map<String, Object> getPrisonerDoor(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = mapper.getPrisonerDoor(map);
		if(list.size()>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
			resultMap.put("result", list);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
			resultMap.put("result", 0);
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> getInitPrisonerDoor(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = mapper.getInitPrisonerDoor(map);
		if(list.size()>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
			resultMap.put("result", list);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
			resultMap.put("result", 0);
		}
		return resultMap;
	}

}
