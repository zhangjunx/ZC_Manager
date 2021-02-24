package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.LPR_VehicleDevice;
@Repository
public interface LPR_VehicleDeviceMapper {

	int insertVehicleDevice(Map m);//插入摄像机和车辆信息

    LPR_VehicleDevice queryAuthority(String strplateid);//根据车牌号查询车辆权限信息
    
    int insertVehicleDeviceBatch(List<LPR_VehicleDevice> list);//批量添加
    int deleteVehicleDeviceBatch(List<Integer> list);//批量删除
    
    List<LPR_VehicleDevice> queryVehicleDeviceByVehicleidAndDeviceNo(LPR_VehicleDevice record);//权限设置时 先查询已有的权限
    List<Map<String,Object>> queryLPRDeviceListByVehicleid(Integer vehicleid);//根据vehicleid 查车辆权限设备信息
}