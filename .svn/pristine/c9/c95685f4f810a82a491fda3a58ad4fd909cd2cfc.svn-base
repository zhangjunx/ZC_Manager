package com.xr.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.IODataPhotoMapper;
import com.xr.entity.IODataPhoto;
import com.xr.service.IIODataPhotoService;
@Service
public class IODataPhotoServiceImpl implements IIODataPhotoService {
	@Autowired
	private IODataPhotoMapper  pm;

	@Override
	public IODataPhoto queryIOPhotoService(Integer iodataid) {
		// IODataPhoto queryIOPhotoService();//获取进出的照片
		return pm.queryIOPhoto(iodataid);
	}

	@Override
	public int insertAppletOpenPhoto(IODataPhoto record) {
		// * 小程序人脸识别开门后要放入现场照片
		return pm.insertAppletOpenPhoto(record);
	}

}
