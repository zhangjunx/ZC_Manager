package com.xr.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.LPR_VehicleIOPhotoDataMapper;
import com.xr.entity.LPR_VehicleIOPhotoData;
import com.xr.service.ILPR_VehicleIOPhotoDataService;
@Service
public class LPR_VehicleIOPhotoDataImpl implements ILPR_VehicleIOPhotoDataService {

	@Autowired
	private LPR_VehicleIOPhotoDataMapper viom;//引入查询车辆现场照dao层
	@Override
	public LPR_VehicleIOPhotoData queryVehicleIOPhotoService(Integer id) {
		// 查询车辆现场照片
		return viom.queryVehicleIOPhoto(id);
	}

}
