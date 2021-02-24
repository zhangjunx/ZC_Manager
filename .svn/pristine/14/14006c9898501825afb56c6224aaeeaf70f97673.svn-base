package com.xr.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.WX_VisitorsInfoMapper;
import com.xr.entity.WX_VisitorsInfo;
import com.xr.service.IWX_VisitorsInfoService;
@Service
public class WX_VisitorsInfoServiceImpl implements IWX_VisitorsInfoService {
	@Autowired
	private WX_VisitorsInfoMapper vm;

	@Override
	public int insertSelectiveService(WX_VisitorsInfo record) {
		// 添加数据
		return vm.insertSelective(record);
	}


	 

}
