package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.PageInfo;
import com.xr.entity.ProductStockData;
import com.xr.service.IProductStockDataService;

@Controller
@RequestMapping("ProductStockData")
public class ProductStockDataController {

	@Autowired
	private IProductStockDataService ipsds;
	
	/*
	 * 查询原材料物品列表信息 条件可有可无*/
	@RequestMapping("/queryProductStockDataList")
	@ResponseBody
	public Map<String,Object> queryProductStockDataListController(ProductStockData sd,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ipsds.queryProductStockDataListService(sd,pageinfo);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
}
