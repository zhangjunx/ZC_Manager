package com.xr.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xr.entity.PurchaseData;
@Repository
public interface PurchaseDataMapper {
    int deleteByPrimaryKey(Integer datano);//删除数据

    int insert(PurchaseData record);//插入数据   添加采购信息

    int insertSelective(PurchaseData record);

    PurchaseData selectByPrimaryKey(Integer datano);//通过主键查询

    int updateByPrimaryKeySelective(PurchaseData record);//更新数据

    int updateByPrimaryKey(PurchaseData record);
    List<PurchaseData> queryPurchaseDataList(PurchaseData record);//查询采购列表
}