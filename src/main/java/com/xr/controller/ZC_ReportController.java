package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.ZC_ReportService;

@RequestMapping("/zcReport")
@Controller
public class ZC_ReportController {
	
	@Autowired
	private ZC_ReportService service;

	/**
	 * 物品入库统计
	 * @param map
	 * @return
	 */
	@RequestMapping("/getInStoreListReport")
	@ResponseBody
	public Map<String,Object> getInStoreListReport(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getInStoreListReport(map);
		return resultMap;
	}
	
	/**
	 * 物品入库统计
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOutStoreListReport")
	@ResponseBody
	public Map<String,Object> getOutStoreListReport(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getOutStoreListReport(map);
		return resultMap;
	}
	
	/**
	 * 物品入库统计
	 * @param map
	 * @return
	 */
	@RequestMapping("/getBorrowedStoreListReport")
	@ResponseBody
	public Map<String,Object> getBorrowedStoreListReport(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getBorrowedStoreListReport(map);
		return resultMap;
	}
}
