package com.xr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.xr.entity.AdminData;

@Service
public interface IAdminDataService {
	List<AdminData> queryAdminDataByHolderNoService(String holderno);//通过工号查管理员所在公司

}
