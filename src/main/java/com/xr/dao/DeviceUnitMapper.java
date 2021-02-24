package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DeviceUnit;
@Repository
public interface DeviceUnitMapper {
    int deleteByPrimaryKey(Short deviceno);

    int insert(DeviceUnit record);

    int insertSelective(DeviceUnit record);

    DeviceUnit selectByPrimaryKey(Short deviceno);

    int updateByPrimaryKeySelective(DeviceUnit record);

    int updateByPrimaryKey(DeviceUnit record);
    
    List<DeviceUnit> queryLPRDeviceList();//车辆管理  权限设置时   查询车牌识别摄像机
    
    Map<String, Object> queryDeviceSum();//查询设备在线、离线、总数
    
    /**
     * 通过SN码.来查询设备是否存在
     * 该方法用于在同步设备的时候,检查Syris云平台是否已经存在该设备
     */
    Map<String, Object> queryEquipmentBySN(String ControlSN);
}