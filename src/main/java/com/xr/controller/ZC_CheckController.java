package com.xr.controller;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.xr.service.ZC_CheckService;

@RequestMapping("/zcCheck")
@Controller
public class ZC_CheckController {
	
	@Autowired
	private ZC_CheckService checkService;
	
	/**
	 * excel表格导入
	 * @param map
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping("/insertCheckRecord")
	@ResponseBody
	public Map<String,Object> insertCheckRecord(@RequestParam(required=false) MultipartFile file,String str) throws ParseException{
		Map<String,Object> map = JSONObject.parseObject(str);
		Map<String,Object> resultMap = checkService.insertCheckRecord(map,file);
		return resultMap;
	}
	
	/**
	 * 物品盘点比对统计
	 * 返回异常结果
	 * map参数：
	 * 盘点日期：checkDate
	 * 盘点仓库：checkStore
	 * @param map
	 * @param file
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("/getCheckResult")
	@ResponseBody
	public Map<String,Object> getCheckResult(@RequestParam Map<String,Object> map) {
		Map<String,Object> resultMap = checkService.getCheckResult(map);
		return resultMap;
	}
}
