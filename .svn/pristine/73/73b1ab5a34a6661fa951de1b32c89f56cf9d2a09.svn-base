package com.xr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.AdminDataMapper;
import com.xr.entity.AdminData;
import com.xr.service.IAdminDataService;
@Service
public class AdminDataServiceImpl implements IAdminDataService {
	@Autowired
	private AdminDataMapper adm;

	@Override
	public List<AdminData> queryAdminDataByHolderNoService(String holderno) {
		// 通过工号查管理员所在公司
		return adm.queryAdminDataByHolderNo(holderno);
	}

}
