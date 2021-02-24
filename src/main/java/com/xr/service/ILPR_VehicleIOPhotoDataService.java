package com.xr.service;

import org.springframework.stereotype.Service;

import com.xr.entity.LPR_VehicleIOPhotoData;

@Service
public interface ILPR_VehicleIOPhotoDataService {

	LPR_VehicleIOPhotoData queryVehicleIOPhotoService(Integer id);//查询车辆现场照片
}
