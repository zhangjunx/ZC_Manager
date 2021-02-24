package com.xr.dao;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ProductStockData;
@Repository
public interface ProductStockDataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(ProductStockData record);

    int insertSelective(ProductStockData record);

    ProductStockData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(ProductStockData record);

    int updateByPrimaryKey(ProductStockData record);

    ProductStockData queryProductStockByItemCodeAndWareCodeAndPrice(ProductStockData sd);//根据条码，仓库和价格查库存是否存在

	List<Map<String,Object>> queryProductStockDataList(Map m);//查询库存
}