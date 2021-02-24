package com.xr.controller;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.PageInfo;
import com.xr.entity.SpareParts_StockData;
import com.xr.service.ISpareParts_StockDataService;

/**
 *  备品备件_库存的相关操作
 * @author csc
 *  交互层
 */
@Controller
@RequestMapping("SpareParts_StockData")
public class SpareParts_StockDataController {

	@Autowired
	private ISpareParts_StockDataService ispsds;
	
	/*
	 * 查询原材料物品列表信息 条件可有可无*/
	@RequestMapping("/querySparePartsStockDataList")
	@ResponseBody
	public Map<String,Object> querySparePartsStockDataListController(SpareParts_StockData sd,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ispsds.querySparePartsStockDataListService(sd,pageinfo);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
}
