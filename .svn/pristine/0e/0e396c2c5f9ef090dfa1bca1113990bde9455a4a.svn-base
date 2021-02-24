package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.LPR_VehicleDeviceMapper;
import com.xr.entity.LPR_VehicleDevice;
import com.xr.service.ILPR_VehicleDeviceService;
@Service
public class LPR_VehicleDeviceServiceImpl implements ILPR_VehicleDeviceService {

	@Autowired
	private LPR_VehicleDeviceMapper vd;
	/**
	 * 插入摄像机和车辆信息
	 */
	@Override
	public int insertVehicleDeviceService(Map m) {
		// TODO Auto-generated method stub
		return vd.insertVehicleDevice(m);
	}

	/**
	 * 根据车牌号查询车辆权限信息
	 */
	@Override
	public LPR_VehicleDevice queryAuthorityService(String strplateid) {
		// TODO Auto-generated method stub
		return vd.queryAuthority(strplateid);
	}

	@Override
	public int insertVehicleDeviceBatchService(List<LPR_VehicleDevice> list) {
		// int insertVehicleDeviceBatchService(List<LPR_VehicleDevice> list);//批量添加
		return vd.insertVehicleDeviceBatch(list);
	}

	@Override
	public List<LPR_VehicleDevice> queryVehicleDeviceByVehicleidAndDeviceNoService(LPR_VehicleDevice record) {
		// List<LPR_VehicleDevice> queryVehicleDeviceByVehicleidAndDeviceNoService(LPR_VehicleDevice record);//权限设置时 先查询已有的权限
		return vd.queryVehicleDeviceByVehicleidAndDeviceNo(record);
	}

	@Override
	public int deleteVehicleDeviceBatchService(List<Integer> list) {
		// int deleteVehicleDeviceBatchService(List<Integer> list);//批量删除
		return vd.deleteVehicleDeviceBatch(list);
	}

	@Override
	public List<Map<String, Object>> queryLPRDeviceListByVehicleidService(Integer vehicleid) {
		// 根据vehicleid 查车辆权限设备信息
		return vd.queryLPRDeviceListByVehicleid(vehicleid);
	}

}
