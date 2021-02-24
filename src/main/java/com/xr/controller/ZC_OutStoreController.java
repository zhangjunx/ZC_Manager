package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.ZC_OutStoreService;

@RequestMapping("/zcOutStore")
@Controller
public class ZC_OutStoreController {

	@Autowired
	private ZC_OutStoreService outStoreService;
	
	/**
	 * 扫描标签获取物品详细信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOneInfoWIthRFID")
	@ResponseBody
	public Map<String,Object> getOneInfoWIthRFID(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = outStoreService.getOneInfoWIthRFID(map);
		return resultMap;
	}
	
	/**
	 * 物品出库
	 * @param map
	 * @return
	 */
	@RequestMapping("/addOutStoreGoods")
	@ResponseBody
	public Map<String,Object> addOutStoreGoods(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = outStoreService.outStoreService(map);
		return resultMap;
	}
	
	/**
	 * 出库记录
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOutStoreList")
	@ResponseBody
	public Map<String,Object> getOutStoreList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = outStoreService.getOutStoreList(map);
		return resultMap;
	}
	
	/**
	 * 出库记录（物品）
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOutStoreGoodsList")
	@ResponseBody
	public Map<String,Object> getOutStoreGoodsList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = outStoreService.getOutStoreGoodsList(map);
		return resultMap;
	}
	
	/**
	 * 打印出库大局
	 * @param map
	 * @return
	 */
	@RequestMapping("/printOutStoreList")
	@ResponseBody
	public Map<String,Object> printOutStoreList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = outStoreService.printOutStoreList(map);
		return resultMap;
	}
	
	/**
	 * 物品重新出库
	 * @param map
	 * @return
	 */
	@RequestMapping("/addReOutStore")
	@ResponseBody
	public Map<String,Object> addReOutStore(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = outStoreService.addReOutStore(map);
		return resultMap;
	}
	
	/**
	 * 出库审核
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateApprovalStatus")
	@ResponseBody
	public Map<String,Object> updateApprovalStatus(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = outStoreService.updateApprovalStatus(map);
		return resultMap;
	}
}
