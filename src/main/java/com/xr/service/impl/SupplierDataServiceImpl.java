package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.SupplierDataMapper;
import com.xr.entity.SupplierData;
import com.xr.service.ISupplierDataService;
@Service
public class SupplierDataServiceImpl implements ISupplierDataService {

	@Autowired
	private SupplierDataMapper sdm;

	@Override
	public int deleteByPrimaryKeyService(Integer datano) {
		// 删除数据
		return sdm.deleteByPrimaryKey(datano);
	}

	@Override
	public int insertService(SupplierData record) {
		// 插入数据
		return sdm.insert(record);
	}

	@Override
	public SupplierData selectByPrimaryKeyService(Integer datano) {
		// 根据主键查询实体类
		return sdm.selectByPrimaryKey(datano);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(SupplierData record) {
		// 更新数据
		return sdm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<SupplierData> querySupplierDataListService(SupplierData record) {
		// 查询供应商列表
		return sdm.querySupplierDataList(record);
	}

	@Override
	public Map<String, Object> querySupplierDataByCode(String code) {
		// TODO Auto-generated method stub
		return sdm.querySupplierDataByCode(code);
	}
	
}
