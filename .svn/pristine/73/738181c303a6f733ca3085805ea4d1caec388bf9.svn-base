package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.UFaceOffLineWithDoorMapper;
import com.xr.service.UFaceOffLineWithDoorService;

@Service
public class UFaceOffLineWithDoorServiceImpl implements UFaceOffLineWithDoorService{
	
	@Autowired
	private UFaceOffLineWithDoorMapper uFaceOffLineWithDoorMapper;

	@Override
	public List<Map<String, Object>> getPerListWithIDs(Map<String, Object> map) {
		//{personArr='000123','0010','0014', doorArr='1','9','20'}
		List<Map<String, Object>> perList = uFaceOffLineWithDoorMapper.getPerListWithIDs(map);//
		return perList;
	}

	@Override
	public List<Map<String, Object>> getDeviceListWithDoor(Map<String, Object> map) {
		List<Map<String,Object>> list = uFaceOffLineWithDoorMapper.getDeviceListWithDoor(map);
		return list;
	}

	@Override
	public List<Map<String, Object>> getDeviceListAll() {
		List<Map<String,Object>> list = uFaceOffLineWithDoorMapper.getDeviceListAll();
		return list;
	}

	@Override
	public List<Map<String, Object>> getPerListWithDevice(Map<String, Object> map) {
		List<Map<String, Object>> list = uFaceOffLineWithDoorMapper.getPerListWithDevice(map);
		return list;
	}

	@Override
	public int updateStatusByHand(Map<String, Object> map) {
		int b = uFaceOffLineWithDoorMapper.updateStatusByHand(map);
		return b;
	}

	@Override
	public int updateStatus(Map<String, Object> map) {
		int b = uFaceOffLineWithDoorMapper.updateStatus(map);
		return b;
	}

	@Override
	public List<Map<String, Object>> getAllPerList(List<Map<String, Object>> deviceList) {
		List<Map<String, Object>> list = uFaceOffLineWithDoorMapper.getPerListWithDevice(deviceList);
		return list;
	}

}
