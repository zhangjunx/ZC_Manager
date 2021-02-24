package com.xr.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;
@Repository
public interface BigDataMapper {
	Map<String,Object> getDeviceCount();//统计设备总数和设备    1在线数，离线数-1  0其它
	Map<String,Object> getDoorCount();//统计门区开门 关门状态
	
	Map<String,Object> getHolderCount();// 统计干警人数  外协人数   会见人数
	Map<String,Object> getVehicleCount();//统计车辆总数    内部车辆 和外来车辆  
}
