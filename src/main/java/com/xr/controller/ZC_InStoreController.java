package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.ZC_InStoreService;

@RequestMapping("/zcInStore")
@Controller
public class ZC_InStoreController {
	
	@Autowired
	private ZC_InStoreService inStoreService;
	
	/**
	 * 物品入库前标签验证
	 * @param map
	 * @return
	 */
	@RequestMapping("/checkLabelRepeat")
	@ResponseBody
	public Map<String,Object> checkLabelRepeat(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.checkLabelRepeat(map);
		return resultMap;
	}
	
	/**
	 * 获取技术规范文档列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getSkillBaseFileList")
	@ResponseBody
	public Map<String,Object> getSkillBaseFileList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.getSkillBaseFileList(map);
		return resultMap;
	}
	
	/**
	 * 物品入库
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateStoreGoods")
	@ResponseBody
	public Map<String,Object> updateStoreGoods(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.updateStoreGoods(map);
		return resultMap;
	}
	
	/**
	 * 打印入库单据
	 * @param map
	 * @return
	 */
	@RequestMapping("/printIntBill")
	@ResponseBody
	public Map<String,Object> printIntBill(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.printIntBill(map);
		return resultMap;
	}
	
	/**
	 * 入库记录查询
	 * @param map
	 * @return
	 */
	@RequestMapping("/getInStoreRecord")
	@ResponseBody
	public Map<String,Object> getInStoreRecord(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.getInStoreRecord(map);
		return resultMap;
	}
	
	/**
	 * 入库物品记录查询
	 * @param map
	 * @return
	 */
	@RequestMapping("/getInStoreGoodsRecord")
	@ResponseBody
	public Map<String,Object> getInStoreGoodsRecord(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.getInStoreGoodsRecord(map);
		return resultMap;
	}
	
	/**
	 * 物品重入库
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateReStoreGoods")
	@ResponseBody
	public Map<String,Object> updateReStoreGoods(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.updateReStoreGoods(map);
		return resultMap;
	}
	
	//=====================================================以下库存管理===========================================================
	/**
	 * 查询库存数据统计
	 * @param map
	 * @return
	 */
	@RequestMapping("/getStoreCount")
	@ResponseBody
	public Map<String,Object> getStoreCount(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.getStoreCount(map);
		return resultMap;
	}
	
	/**
	 * 查询库存数据详细
	 * @param map
	 * @return
	 */
	@RequestMapping("/getStoreGoods")
	@ResponseBody
	public Map<String,Object> getStoreGoods(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.getStoreGoods(map);
		return resultMap;
	}
	
	/**
	 * 修改物品信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateGoodsParm")
	@ResponseBody
	public Map<String,Object> updateGoodsParm(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = inStoreService.updateGoodsParm(map);
		return resultMap;
	}
}
