package com.xr.service;

import org.springframework.stereotype.Service;

import com.xr.entity.WX_VisitorsPhoto;


@Service
public interface IWX_VisitorsPhotoService {
	int insertSelectiveService(WX_VisitorsPhoto record);

}
