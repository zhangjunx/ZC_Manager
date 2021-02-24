package com.xr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.xr.entity.PurchaseData;

@Service
public interface IPurchaseDataService {
	  List<PurchaseData> queryPurchaseDataListService(PurchaseData record);//查询采购列表
	  int deleteByPrimaryKeyService(Integer datano);//删除数据
	    int insertService(PurchaseData record);//插入数据
	    PurchaseData selectByPrimaryKeyService(Integer datano);//通过主键查询
	    int updateByPrimaryKeySelectiveService(PurchaseData record);//更新数据

}
