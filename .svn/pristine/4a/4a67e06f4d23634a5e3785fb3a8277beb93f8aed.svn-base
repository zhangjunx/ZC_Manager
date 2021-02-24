package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.ZC_GoodsTypeService;

@RequestMapping("/zcGoodsType")
@Controller
public class ZC_GoodsTypeController {

	@Autowired
	private ZC_GoodsTypeService goodsTypeService;
	
	/**
	 * 获取物品类别树形列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = goodsTypeService.getList(map);
		return resultMap;
	}
	
	/**
	 * 添加/编辑
	 * @param map
	 * @return
	 */
	@RequestMapping("/addInfo")
	@ResponseBody
	public Map<String,Object> addInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = goodsTypeService.addInfo(map);
		return resultMap;
	}
	
	/**
	 * 获取一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOneInfo")
	@ResponseBody
	public Map<String,Object> getOneInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = goodsTypeService.getOneInfo(map);
		return resultMap;
	}
	
	/**
	 * 删除一条信息
	 * 只能删除其下没有物品的数据
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOneInfo")
	@ResponseBody
	public Map<String,Object> delOneInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = goodsTypeService.delOneInfo(map);
		return resultMap;
	}
}
