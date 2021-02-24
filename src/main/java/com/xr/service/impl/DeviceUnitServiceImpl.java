package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.DeviceUnitMapper;
import com.xr.entity.DeviceUnit;
import com.xr.service.IDeviceUnitService;
@Service
public class DeviceUnitServiceImpl implements IDeviceUnitService {
	@Autowired
	private DeviceUnitMapper dm;

	@Override
	public List<DeviceUnit> queryLPRDeviceListService() {
		// List<DeviceUnit> queryLPRDeviceListService();//车辆管理  权限设置时   查询车牌识别摄像机
		return dm.queryLPRDeviceList();
	}
	
	@Override
	public int insertSelective(DeviceUnit record) {
		// TODO Auto-generated method stub
		return dm.insertSelective(record);
	}

	@Override
	public Map<String, Object> queryEquipmentBySN(String ControlSN) {
		// * 通过SN码.来查询设备是否存在 * 该方法用于在同步设备的时候,检查Syris云平台是否已经存在该设备
		return dm.queryEquipmentBySN(ControlSN);
	}

	

}
