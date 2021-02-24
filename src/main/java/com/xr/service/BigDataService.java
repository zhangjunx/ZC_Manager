package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.IOData;

@Service
public interface BigDataService {
	
	Map<String, Object> queryDDPCInfoSum();//设备、门、人员、车辆信息统计
	List<IOData> queryIORecordByBigDataService();//查进出记录
	Map<String, Object> queryDeviceAndHolderCountService();//统计设备和人员
	
}
