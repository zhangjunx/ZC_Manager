package com.xr.controller;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xr.entity.HY_Meeting;
import com.xr.entity.HY_MeetingMember;
import com.xr.entity.HY_MeetingRoomOut;
import com.xr.entity.HY_RoomDate;
import com.xr.service.HY_MeetingService;

@RequestMapping("/meeting")
@Controller
public class HY_MeetingController {

	@Autowired
	private HY_MeetingService meetingService;
	
	/**
	 * 会议列表
	 * 获取会议列表
	 * quarytype=1:会议列表（还未进行），quarytype=2:会议列表（已结束）
	 * @param map
	 * @param resp
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/getMeetingList")
	@ResponseBody
	public Map<String,Object> getMeetingList(@RequestParam Map map,HttpServletResponse resp) throws Exception{
		Map<String,Object> resultMap = meetingService.getMeetingList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 新建会议
	 * @param meeting
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping("/saveMeetingInfo")
	@ResponseBody
	public Map<String,Object> saveMeetingInfo(@RequestParam Map meeting) throws ParseException{
		Map<String,Object> resultMap = new HashMap<String,Object>();
		int b = meetingService.saveMeetingInfo(meeting);
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
	 * 获取时间表头
	 */
	@RequestMapping("/getTimeTitle")
	@ResponseBody
	public Map<String,Object> getTimeTitle(){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<HY_MeetingRoomOut> list = meetingService.getTimeTitle();
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取已占用的时间段列表
	 */
	@RequestMapping("/getUsedTimeList")
	@ResponseBody
	public Map<String,Object> getUsedTimeList(@RequestParam Map<String,Object> selectedDate){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = meetingService.getUsedTimeList(selectedDate);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取参议人员
	 */
	@RequestMapping("/getJoinMeetingMember")
	@ResponseBody
	public Map<String,Object> getJoinMeetingMember(@RequestParam String meetingid,HttpServletResponse resp){
		Map<String,Object> resultMap = meetingService.getJoinMeetingMember(meetingid);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 获取会议签到/签退列表
	 * map参数：meetingid（会议id）
	 * 返回结果：quarytype=1:签到列表，quary=2：签退列表
	 */
	@RequestMapping("/getSignList")
	@ResponseBody
	public Map<String,Object> getSignList(@RequestParam Map map,HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String, Object>> list = meetingService.getSignList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 获取字典数据列表
	 */
	@RequestMapping("/getComboList")
	@ResponseBody
	public Map<String, Object> getComboList(@RequestParam String typeName){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = meetingService.getComboList(typeName);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取一条会议信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOneMeetingInfo")
	@ResponseBody
	public Map<String,Object> getOneMeetingInfo(@RequestParam Map map){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map meetingInfo = meetingService.getOneMeetingInfo(map);
		String meetingInfoStr = JSON.toJSONString(meetingInfo, SerializerFeature.DisableCircularReferenceDetect);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", meetingInfoStr);
		return resultMap;
	}
	
	/**
	 * 更新会议状态
	 */
	@RequestMapping("/updateMeetingStatus")
	@ResponseBody
	public Map<String,Object> updateMeetingStatus(@RequestParam Map map){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		meetingService.updateMeetingStatus(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", "true");
		return resultMap;
	}
	
	/**
	 * 会议取消
	 */
	@RequestMapping("/updteMeetingCancle")
	@ResponseBody
	public Map<String,Object> updteMeetingCancle(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		int b = meetingService.updteMeetingCancle(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "操作成功!");
		resultMap.put("result", "true");
		return resultMap;
	}
	
	/**
	 * 会议记录查询
	 */
	@RequestMapping("/getMeetingRecordList")
	@ResponseBody
	public Map<String,Object> getMeetingRecordList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		map.put("meetingstatus", 4);
		List<Map<String,Object>> list = meetingService.getMeetingRecordList(map);
		String str = JSON.toJSONString(list, SerializerFeature.DisableCircularReferenceDetect);
		Integer count = meetingService.getMeetingRecordListCount(map);
		resultMap.put("count", count);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", str);
		return resultMap;
	}
	
	/**
	 * 会议审批
	 */
	@RequestMapping("/getMeetingApproval")
	@ResponseBody
	public Map<String,Object> getMeetingApproval(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = meetingService.getMeetingApproval(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		return resultMap;
	}
}
