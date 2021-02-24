package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.LPR_VehicleIOData;
import com.xr.entity.PageInfo;


@Service
public interface ILPR_VehicleIODataService {
	 List<Map<String,Object>> queryVehicleLastIORecordService(LPR_VehicleIOData record);//查询上一条记录 根据车牌号和id
	 
	 List<Map<String,Object>> queryVehicleIORecordListService(Map m);//车辆 进出记录查询
	 List<Map<String,Object>> queryVehicleIORecordListByPageService(Map m,PageInfo pageinfo);//车辆 进出记录查询 分页查询
	 
	 Integer queryVehicleIOMaxIDService();//查询车辆进出记录的最大值
	 List<Map<String,Object>> queryVehicleCurrIORecordListService(Integer id);//车辆  实时进出记录查询 
}
