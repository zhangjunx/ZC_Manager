package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.ZC_SupplierService;

@RequestMapping("/zcSupplier")
@Controller
public class ZC_SupplierController {
	
	@Autowired
	private ZC_SupplierService supplierService;
	
	/**
	 * 获取列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = supplierService.getList(map);
		return resultMap;
	}
	
	/**
	 * 添加、编辑
	 * @param map
	 * @return
	 */
	@RequestMapping("/saveInfo")
	@ResponseBody
	public Map<String,Object> saveInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = supplierService.saveInfo(map);
		return resultMap;
	}
	
	/**
	 * 获取一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOne")
	@ResponseBody
	public Map<String,Object> getOne(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = supplierService.getOne(map);
		return resultMap;
	}
	
	/**
	 * 删除一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOne")
	@ResponseBody
	public Map<String,Object> delOne(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = supplierService.delOne(map);
		return resultMap;
	}
}
