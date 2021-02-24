package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.SpareParts_StockData;
@Repository
public interface SpareParts_StockDataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(SpareParts_StockData record);

    int insertSelective(SpareParts_StockData record);

    SpareParts_StockData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(SpareParts_StockData record);

    int updateByPrimaryKey(SpareParts_StockData record);

	SpareParts_StockData querySparePartsStockByItemCodeAndWareCodeAndPrice(SpareParts_StockData sd);

	List<Map<String,Object>> querySparePartsStockDataList(Map m);//查询库存列表

}