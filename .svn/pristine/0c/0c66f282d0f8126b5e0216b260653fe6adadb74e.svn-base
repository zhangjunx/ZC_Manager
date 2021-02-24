package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.RC_PrisonCallRecordService;

@RequestMapping("/prisonCallRecord")
@Controller
public class RC_PrisonCallRecordController {
	
	@Autowired
	private RC_PrisonCallRecordService callRecordService;
	
	/**
	 * 记录上传及推送
	 * @param map
	 * @return
	 */
	@RequestMapping("/insertCallRecord")
	@ResponseBody
	public Map<String,Object> insertCallRecord(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = callRecordService.insertCallRecord(map);
		return resultMap;
	}
	
	/**
	 * 区域人员分布统计
	 * @param map
	 * @return
	 */
	@RequestMapping("/getDistribution")
	@ResponseBody
	public Map<String,Object> getDistribution(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = callRecordService.getDistribution(map);
		return resultMap;
	}
	
	/**
	 * 轨迹查询
	 * @param map
	 * @return
	 */
	@RequestMapping("/getTrajectory")
	@ResponseBody
	public Map<String,Object> getTrajectory(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = callRecordService.getTrajectory(map);
		return resultMap;
	}
}
