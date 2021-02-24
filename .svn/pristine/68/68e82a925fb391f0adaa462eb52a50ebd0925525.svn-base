package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.ZC_BorrowService;

@RequestMapping("/zcBorrow")
@Controller
public class ZC_BorrowController {
	
	@Autowired
	private ZC_BorrowService borrowService;
	
	/**
	 * 获取借用单据列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getBorrowedBillList")
	@ResponseBody
	public Map<String,Object> getBorrowedBillList(@RequestParam  Map<String,Object> map){
		Map<String,Object> resultMap = borrowService.getBorrowedBillList(map);
		return resultMap;
	}
	
	/**
	 * 获取借出物品列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getBorrowedList")
	@ResponseBody
	public Map<String,Object> getBorrowedList(@RequestParam  Map<String,Object> map){
		Map<String,Object> resultMap = borrowService.getBorrowedList(map);
		return resultMap;
	}
	
	/**
	 * 物品借出
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateBorrowInfo")
	@ResponseBody
	public Map<String,Object> updateBorrowInfo(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = borrowService.updateBorrowInfo(map);
		return resultMap;
	}
	
	/**
	 * 物品归还(正常)
	 * @param map
	 * @return
	 */
	@RequestMapping("/updatereturnInfo")
	@ResponseBody
	public Map<String,Object> updatereturnInfo(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = borrowService.updatereturnInfo(map);
		return resultMap;
	}
	
	/**
	 * 物品归还(非正常)
	 * @param map
	 * @return
	 */
	@RequestMapping("/updatereturnInfo2")
	@ResponseBody
	public Map<String,Object> updatereturnInfo2(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = borrowService.updatereturnInfo2(map);
		return resultMap;
	}
}
