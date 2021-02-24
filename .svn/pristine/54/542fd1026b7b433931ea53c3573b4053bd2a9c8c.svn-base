package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.LPR_VehicleDevice;
@Service
public interface ILPR_VehicleDeviceService {

	int insertVehicleDeviceService(Map m);//插入摄像机和车辆信息
	
	LPR_VehicleDevice queryAuthorityService(String strplateid);//根据车牌号查询车辆权限信息
	 int insertVehicleDeviceBatchService(List<LPR_VehicleDevice> list);//批量添加
	 int deleteVehicleDeviceBatchService(List<Integer> list);//批量删除
	 List<LPR_VehicleDevice> queryVehicleDeviceByVehicleidAndDeviceNoService(LPR_VehicleDevice record);//权限设置时 先查询已有的权限
	 
	 List<Map<String,Object>> queryLPRDeviceListByVehicleidService(Integer vehicleid);//根据vehicleid 查车辆权限设备信息
}
