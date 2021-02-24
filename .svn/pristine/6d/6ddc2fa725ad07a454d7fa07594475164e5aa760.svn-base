package com.xr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.PurchaseDataMapper;
import com.xr.entity.PurchaseData;
import com.xr.service.IPurchaseDataService;
@Service
public class PurchaseDataServiceImpl implements IPurchaseDataService {

	@Autowired
	private PurchaseDataMapper pdm;

	@Override
	public List<PurchaseData> queryPurchaseDataListService(PurchaseData record) {
		// 查询采购列表
		return pdm.queryPurchaseDataList(record);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer datano) {
		// 删除数据
		return pdm.deleteByPrimaryKey(datano);
	}

	@Override
	public int insertService(PurchaseData record) {
		// 插入数据新增采购
		return pdm.insertSelective(record);
	}

	@Override
	public PurchaseData selectByPrimaryKeyService(Integer datano) {
		//通过主键查询数据
		return pdm.selectByPrimaryKey(datano);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(PurchaseData record) {
		//更新数据
		return pdm.updateByPrimaryKeySelective(record);
	}
	
}
