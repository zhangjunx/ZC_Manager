package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xr.entity.DictionaryData;
import com.xr.entity.DoorUnit;
import com.xr.entity.HY_MeetingRoom;
import com.xr.service.HY_MeetingRoomService;
/**
 * 会议室管理
 * @author Administrator
 */
@RequestMapping("/meetingRoom")
@Controller
public class HY_MeetingRoomController {
	
	@Autowired
	private HY_MeetingRoomService meetingRoomService;
	
	/**
	 * 获取会议室列表
	 */
	@RequestMapping("/getRoomList")
	@ResponseBody
	public Map<String,Object> getRoomList(@RequestParam Map map,HttpServletResponse resp){
		Map<String,Object> resultMap = meetingRoomService.getRoomList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 新增/修改会议室
	 */
	@RequestMapping("/saveRoomInfo")
	@ResponseBody
	public Map<String,Object> saveRoomInfo(@RequestBody HY_MeetingRoom room){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		int b = meetingRoomService.saveRoomInfo(room);
		if(b > 0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功！");
			resultMap.put("result", true);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败！");
			resultMap.put("result", false);
		}
		return resultMap;
	}
	
	/**
	 * 获取一条要修改的数据
	 */
	@RequestMapping("/getOneRoomInfo")
	@ResponseBody
	public Map<String,Object> getOneRoomInfo(@RequestParam String fno,HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map rooom = meetingRoomService.getOneRoomInfo(fno);
		String rooomInfoStr = JSON.toJSONString(rooom, SerializerFeature.DisableCircularReferenceDetect);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", rooomInfoStr);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 删除会议室
	 */
	@RequestMapping("/delRoomInfo")
	@ResponseBody
	public Map<String,Object> delRoomInfo(@RequestParam String fno){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		int b = meetingRoomService.delRoomInfo(fno);
		if(b > 0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功！");
			resultMap.put("result", true);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败！");
			resultMap.put("result", false);
		}
		return resultMap;
	}
	
	/**
	 * 获取门禁列表
	 */
	@RequestMapping("/getDoorList")
	@ResponseBody
	public Map<String,Object> getDoorList(HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map<String,Object> doormap = new HashMap<String,Object>();
		doormap.put("doorno", "");
		List<Map<String,Object>> list = meetingRoomService.getDoorList(doormap);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 添加物品字典数据
	 */
	@RequestMapping("/addGoodsToDictionary")
	@ResponseBody
	public Map<String,Object> addGoodsToDictionary(@RequestParam String goodsName){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		int b = meetingRoomService.addGoodsToDictionary(goodsName);
		if(b > 0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功！");
			resultMap.put("result", true);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败！");
			resultMap.put("result", false);
		}
		return resultMap;
	}
	
	/**
	 * 获取物品列表
	 */
	@RequestMapping("/getGoodsList")
	@ResponseBody
	public Map<String,Object> getGoodsList(HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map<String,Object> goodsmap = new HashMap<String,Object>();
		goodsmap.put("goodsno", "");
		List<DictionaryData> list = meetingRoomService.getGoodsList(goodsmap);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 查看会议室
	 */
	@RequestMapping("/getRoomView")
	@ResponseBody
	public Map<String,Object> getRoomView(HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = meetingRoomService.getRoomView();
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
}
