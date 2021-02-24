package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.ZC_ApprovlService;

@RequestMapping("/zcApproval")
@Controller
public class ZC_ApprovlController {

	@Autowired
	private ZC_ApprovlService service;
	
	/**
	 * 获取入库审批列表
	 * @return
	 */
	@RequestMapping("/getApprovalInStoreList")
	@ResponseBody
	public Map<String,Object> getApprovalInStoreList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getApprovalInStoreList(map);
		return resultMap;
	}
	
	/**
	 * 入库单据审批
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateApprovalInStore")
	@ResponseBody
	public Map<String,Object> updateApprovalInStore(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.updateApprovalInStore(map);
		return resultMap;
	}
	
	/**
	 * 获取出库审批列表
	 * @return
	 */
	@RequestMapping("/getApprovalOutStoreList")
	@ResponseBody
	public Map<String,Object> getApprovalOutStoreList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getApprovalOutStoreList(map);
		return resultMap;
	}
	
	/**
	 * 出库单据审批
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateApprovalOutStore")
	@ResponseBody
	public Map<String,Object> updateApprovalOutStore(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.updateApprovalOutStore(map);
		return resultMap;
	}
	
	/**
	 * 获取借用审批列表
	 * @return
	 */
	@RequestMapping("/getApprovalBorrowList")
	@ResponseBody
	public Map<String,Object> getApprovalBorrowList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getApprovalBorrowList(map);
		return resultMap;
	}
	
	/**
	 * 借用单据审批
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateApprovalBorrow")
	@ResponseBody
	public Map<String,Object> updateApprovalBorrow(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.updateApprovalBorrow(map);
		return resultMap;
	}
	
	/**
	 * 获取审批单据详情
	 * @param map
	 * @return
	 */
	@RequestMapping("/getApprovalBorrowListGoods")
	@ResponseBody
	public Map<String,Object> getApprovalBorrowListGoods(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getApprovalBorrowListGoods(map);
		return resultMap;
	}
	
	/**
	 * 获取审批单据详情
	 * optType=1：设置审批人
	 * optType=2：取消审批人
	 * @param map
	 * @return
	 */
	@RequestMapping("/setApproverList")
	@ResponseBody
	public Map<String,Object> setApproverList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.setApproverList(map);
		return resultMap;
	}
	
	/**
	 * 获取审批单据详情
	 * optType=1：设置审批人
	 * optType=2：取消审批人
	 * @param map
	 * @return
	 */
	@RequestMapping("/getApproverList")
	@ResponseBody
	public Map<String,Object> getApproverList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getApproverList(map);
		return resultMap;
	}
}
