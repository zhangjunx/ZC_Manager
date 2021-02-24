package com.xr.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.SpareParts_StockData;


/**
 * 备品备件_库存的相关操作
 * @author csc
 * 业务层
 */
@Service
public interface ISpareParts_StockDataService {
	
    Map<String,Object> querySparePartsStockDataListService(SpareParts_StockData sd,PageInfo pageinfo);//查询库存列表
    //以上方法非CSC所写

}
