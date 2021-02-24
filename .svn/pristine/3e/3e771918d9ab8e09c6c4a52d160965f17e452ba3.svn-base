package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.LPR_VehicleIOData;

@Repository
public interface LPR_VehicleIODataMapper {

	List<Map<String,Object>> queryVehicleLastIORecord(LPR_VehicleIOData record);//查询上一条记录 根据车牌号和id
    
    List<Map<String,Object>> queryVehicleIORecordList(Map m);//车辆 进出记录查询
    
    Integer queryVehicleIOMaxID();//查询车辆进出记录的最大值
    List<Map<String,Object>> queryVehicleCurrIORecordList(Integer id);//车辆  实时进出记录查询 
}