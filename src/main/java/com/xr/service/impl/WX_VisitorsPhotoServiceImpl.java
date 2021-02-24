package com.xr.service.impl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.WX_VisitorsPhotoMapper;
import com.xr.entity.WX_VisitorsPhoto;
import com.xr.service.IWX_VisitorsPhotoService;
@Service
public class WX_VisitorsPhotoServiceImpl implements IWX_VisitorsPhotoService {

	@Autowired
	private WX_VisitorsPhotoMapper vpm;
	@Override
	public int insertSelectiveService(WX_VisitorsPhoto record) {
		// 上传照片
		return vpm.insertSelective(record);
	}
	
	 

}
