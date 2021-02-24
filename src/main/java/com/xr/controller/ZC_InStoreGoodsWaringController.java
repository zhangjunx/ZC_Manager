package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.ZC_InStoreGoodsWaringService;

@RequestMapping("/zcGoodsWaring")
@Controller
public class ZC_InStoreGoodsWaringController {
	
	@Autowired
	private ZC_InStoreGoodsWaringService waringService;
	
	/**
	 * 获取报废列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getScrapList")
	@ResponseBody
	public Map<String,Object> getScrapList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = waringService.getScrapList(map);
		return resultMap;
	}
	
	/**
	 * 添加报废物品
	 * @param map
	 * @return
	 */
	@RequestMapping("/addScrapList")
	@ResponseBody
	public Map<String,Object> addScrapList(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = waringService.addScrapList(map);
		return resultMap;
	}
	
	/**
	 * 获取退役物品列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getRetireList")
	@ResponseBody
	public Map<String,Object> getRetireList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = waringService.getRetireList(map);
		return resultMap;
	}
	
	/**
	 * 添加退役物品
	 * @param map
	 * @return
	 */
	@RequestMapping("/addRetireList")
	@ResponseBody
	public Map<String,Object> addRetireList(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = waringService.addRetireList(map);
		return resultMap;
	}
}
