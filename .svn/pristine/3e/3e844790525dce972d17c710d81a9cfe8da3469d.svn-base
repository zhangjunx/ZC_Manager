package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.NoticeDataService;

@RequestMapping("/noticeData")
@Controller
public class NoticeDataController {
	
	@Autowired
	private NoticeDataService noticeDataService;
	
	/**
	 * 获取通知列表
	 */
	@RequestMapping("/getMeeingNoticeList")
	@ResponseBody
	public Map<String,Object> getMeeingNoticeList(@RequestParam Map<String,Object> map,HttpServletResponse resp){
		Map<String,Object> resultMap = noticeDataService.getMeeingNoticeList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 更新人员查看状态
	 */
	@RequestMapping("/updateWatchSatus")
	@ResponseBody
	public Map<String,Object> updateWatchSatus(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		noticeDataService.updateWatchSatus(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", true);
		return resultMap;
	}
}
