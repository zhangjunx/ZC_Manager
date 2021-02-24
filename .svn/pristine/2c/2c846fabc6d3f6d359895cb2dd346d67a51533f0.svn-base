package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.service.FP_ConsumeRecordService;

@RequestMapping("/consume")
@Controller
public class FP_ConsumeRecordController {
	
	@Autowired
	private FP_ConsumeRecordService consumeDataService;
	
	/**
	 * 消费记录列表
	 * thisTime 为空获取所有记录
	 * thisTime 不为空huoq实时监控记录
	 * @param map
	 * @return
	 */
	@RequestMapping("/getConsumeList")
	@ResponseBody
	public Map<String,Object> getConsumeList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = consumeDataService.getConsumeList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询数据成功！");
		return resultMap;
	}
	
	@RequestMapping("/getConsumeAppList")
	@ResponseBody
	public Map<String,Object> getConsumeAppList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = consumeDataService.getConsumeAppList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询数据成功！");
		return resultMap;
	}
	
}
