package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.Session;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

@RequestMapping("/doorStatus")
@Controller
public class DoorStatusDataController {

	/**
	 * 接收门区状态数据
	 * @param map
	 * @param resp
	 * @return
	 */
	@RequestMapping("/DoorStatus")
	@ResponseBody
	public Map<String,Object> DoorStatus(@RequestParam Map<String,Object> map,HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		pushInfoToPage(map);
		resultMap.put("flag", true);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 接收开门记录数据
	 * @param map
	 * @param resp
	 * @return
	 */
	@RequestMapping("/IORecord")
	@ResponseBody
	public Map<String,Object> IORecord(@RequestParam Map<String,Object> map,HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		pushInfoToPage(map);
		resultMap.put("flag", true);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 数据推送
	 * @param map
	 * @param b
	 */
	private void pushInfoToPage(Map<String, Object> map) {
		WebSocketController wk = new WebSocketController();
		Session session = null;
		Set<String> list = map.keySet();
		wk.onMessage(list.toArray()[0].toString(), session);
	}
}
