package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.MaterialStockData;
@Repository
public interface MaterialStockDataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(MaterialStockData record);

    int insertSelective(MaterialStockData record);

    MaterialStockData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(MaterialStockData record);

    int updateByPrimaryKey(MaterialStockData record);

	MaterialStockData queryMaterialStockByItemCodeAndWareCodeAndPrice(MaterialStockData sd);//查库存是否存在

	List<Map<String,Object>> queryMaterialStockDataList(Map m);//查询库存列表

}