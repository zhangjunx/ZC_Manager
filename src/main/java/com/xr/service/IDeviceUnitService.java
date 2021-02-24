package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.DeviceUnit;

@Service
public interface IDeviceUnitService {
	List<DeviceUnit> queryLPRDeviceListService();//车辆管理  权限设置时   查询车牌识别摄像机
	
    int insertSelective(DeviceUnit record);

	   /**
     * 通过SN码.来查询设备是否存在
     * 该方法用于在同步设备的时候,检查Syris云平台是否已经存在该设备
     */
    Map<String, Object> queryEquipmentBySN(String ControlSN);
}
