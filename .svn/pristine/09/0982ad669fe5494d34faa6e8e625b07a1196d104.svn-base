package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.LPR_DeviceMapper;
import com.xr.entity.LPR_Device;
import com.xr.entity.LPR_VehicleDevice;
import com.xr.service.ILPR_DeviceService;
@Service
public class LPR_DeviceServiceImpl implements ILPR_DeviceService {

	@Autowired
	private LPR_DeviceMapper dm;//引入摄像机的dao层
	/**
	 * 查询摄像机的信息
	 */
	@Override
	public List<LPR_Device> queryDeviceService() {
		// TODO Auto-generated method stub
		return dm.queryDevice();
	}
	
}
