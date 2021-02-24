package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.SupplierData;

@Service
public interface ISupplierDataService {

	int deleteByPrimaryKeyService(Integer datano);//删除数据
    int insertService(SupplierData record);//添加数据
    SupplierData selectByPrimaryKeyService(Integer datano);//根据主键查询
    int updateByPrimaryKeySelectiveService(SupplierData record);//更新数据
    List<SupplierData> querySupplierDataListService(SupplierData record);//查询供应商列表
    Map<String, Object> querySupplierDataByCode(String code); //根据编码查询供应商判断该编码是否存在
}
