package com.xr.service;

import org.springframework.stereotype.Service;

import com.xr.entity.IODataPhoto;

/**
 * @ClassName IIODataPhotoService
 * 进出记录表相对应的照片表
 * @Author csc
 * @Date 2019年12月27日 下午6:52:51
 */
@Service
public interface IIODataPhotoService {
	
	IODataPhoto queryIOPhotoService(Integer iodataid);//获取进出的照片

	/**
     * 小程序人脸识别开门后要放入现场照片
     * @param record
     */
    int insertAppletOpenPhoto(IODataPhoto record);
}
