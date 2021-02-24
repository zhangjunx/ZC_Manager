package com.xr.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.HolderPhoto;

@Service
public interface IHolderPhotoService {
	Map<String,Object> queryPhotoService(String holderno);//根据员工编号 查询照片

	Map<String,Object> updatePhotoService(MultipartFile file,HolderPhoto holderphoto) throws IOException;//通过员工编号  更新照片  holderno

	//HolderPhoto queryHolderPhotoService(String holderno);//通过工号查照片信息

	//Map<String,Object> updateHolderInfoAndPhotoService(MultipartFile file, HolderData record) throws IOException;//更新员工信息

}
