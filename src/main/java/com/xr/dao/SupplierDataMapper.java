package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.SupplierData;
@Repository
public interface SupplierDataMapper {
    int deleteByPrimaryKey(Integer datano);//删除数据

    int insert(SupplierData record);//添加数据

    int insertSelective(SupplierData record);

    SupplierData selectByPrimaryKey(Integer datano);//根据主键查询

    int updateByPrimaryKeySelective(SupplierData record);//更新数据

    int updateByPrimaryKey(SupplierData record);
    List<SupplierData> querySupplierDataList(SupplierData record);//查询供应商列表
    
    List<String> selectCompanyNameList(Map<String, String> map);//根据供应商名称或字母模糊查询供应商名称列表
    Map<String, Object> querySupplierDataByCode(String code); //根据编码查询供应商判断该编码是否存在
    
}