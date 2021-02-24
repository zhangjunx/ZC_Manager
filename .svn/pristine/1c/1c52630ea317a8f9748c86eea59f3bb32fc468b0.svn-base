package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.MaterialStockData;
import com.xr.entity.PageInfo;
import com.xr.service.IMaterialStockDataService;

@Controller
@RequestMapping("MaterialStockData")
public class MaterialStockDataController {

	@Autowired
	private IMaterialStockDataService imsds;
	/*
	 * 查询原材料物品列表信息 条件可有可无*/
	@RequestMapping("/queryMaterialStockDataList")
	@ResponseBody
	public Map<String,Object> queryMaterialStockDataListController(MaterialStockData sd,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=imsds.queryMaterialStockDataListService(sd, pageinfo);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
}
