package com.xr.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.ProductStockData;


@Service
public interface IProductStockDataService {

    Map<String,Object> queryProductStockDataListService(ProductStockData sd,PageInfo pageinfo);//查询库存
}
