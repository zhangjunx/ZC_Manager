package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.DoorWeekZoneMapper;
import com.xr.entity.DoorWeekZone;
import com.xr.service.IDoorWeekZoneService;
@Service
public class DoorWeekZoneServiceImpl implements IDoorWeekZoneService {
	@Autowired
	private DoorWeekZoneMapper wzdm;

	@Override
	public List<Map<String, Object>> queryWeekZoneListService(Map m) {
		//查询周期时段表
		return wzdm.queryWeekZoneList(m);
	}

	@Override
	public int insertSelectiveService(DoorWeekZone record) {
		// 新增
		return wzdm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(DoorWeekZone record) {
		// 修改
		return wzdm.updateByPrimaryKeySelective(record);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return wzdm.deleteByPrimaryKey(id);
	}
	

}
