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

import com.xr.service.DoorUnit2Service;

@RequestMapping("/doorUnit2")
@Controller
public class DoorUnit2Controller {
	
	@Autowired
	private DoorUnit2Service doorUnit2Service;
	
	/**
	 * 获取门区列表
	 */
	@RequestMapping("/getDoorLit")
	@ResponseBody
	public Map<String,Object> getDoorLit(@RequestParam Map<String,Object> map,HttpServletResponse resp){
		Map<String,Object> resultMap = doorUnit2Service.getDoorLit(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 新增/编辑门区数据
	 * DoorNo 为空时，新增
	 * DoorNo 不为空，编辑
	 */
	@RequestMapping("/saveDoorInfo")
	@ResponseBody
	public Map<String,Object> saveDoorInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Integer b = doorUnit2Service.saveDoorInfo(map);
		if(b>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功!");
			resultMap.put("result", true);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败!");
			resultMap.put("result", false);
		}
		return resultMap;
	}
	
	/**
	 * 获取一条门区信息
	 * doorNo为比哟参数
	 */
	@RequestMapping("/getOneDoorInfo")
	@ResponseBody
	public Map<String,Object> getOneDoorInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = doorUnit2Service.getOneDoorInfo(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "获取成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 删除一条门区信息
	 * doorNo为必要参数
	 */
	@RequestMapping("/delOneDoorInfo")
	@ResponseBody
	public Map<String,Object> delOneDoorInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Integer b = doorUnit2Service.delOneDoorInfo(map);
		if(b>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功!");
			resultMap.put("result", true);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败!");
			resultMap.put("result", false);
		}
		return resultMap;
	}
	
	/**
	 * 获取读卡器类型
	 */
	@RequestMapping("/getRederType")
	@ResponseBody
	public Map<String,Object> getRederTypeCombo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = doorUnit2Service.getRederTypeCombo(map);
		resultMap.put("flag", false);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取区域与设备组装的树形菜单
	 */
	@RequestMapping("/getDeviceTreeList")
	@ResponseBody
	public Map<String,Object> getDeviceTreeList(){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = doorUnit2Service.getDeviceTreeList();
		resultMap.put("flag", false);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取门区下拉列表
	 * map中包含设备DeviceNo
	 */
	@RequestMapping("/getAreaListCombo")
	@ResponseBody
	public Map<String,Object> getAreaListCombo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = doorUnit2Service.getAreaListCombo(map);
		resultMap.put("flag", false);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取门区下拉列表
	 * map中包含设备DeviceNo
	 */
	@RequestMapping("/getDoorWithAEFService")
	@ResponseBody
	public Map<String,Object> getDoorWithAEFService(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = doorUnit2Service.getDoorWithAEFService(map);
		return resultMap;
	}
	
	/**
	 * 在门区列表中勾选属于犯人通道的门区
	 * map中包含设备DeviceNo
	 */
	@RequestMapping("/updateDoorPrisonerCheck")
	@ResponseBody
	public Map<String,Object> updateDoorPrisonerCheck(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = doorUnit2Service.updateDoorPrisonerCheck(map);
		return resultMap;
	}
	
	/**
	 * 获取门区列表，分为勾选犯人的与未勾选犯人的
	 * map中包含设备DeviceNo
	 */
	@RequestMapping("/getDoorPrisonerCheck")
	@ResponseBody
	public Map<String,Object> getDoorPrisonerCheck(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = doorUnit2Service.getDoorPrisonerCheck(map);
		return resultMap;
	}
	
	/**
	 * 设置门区操作权限
	 * optType=1：添加权限
	 * optType=2：取消权限
	 * @param map
	 * @return
	 */
	@RequestMapping("/setABDoorLimit")
	@ResponseBody
	public Map<String,Object> setABDoorLimit(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = doorUnit2Service.setABDoorLimit(map);
		return resultMap;
	}
	
	/**
	 * 获取门区操作权限
	 * @param map
	 * @return
	 */
	@RequestMapping("/getABDoorLimit")
	@ResponseBody
	public Map<String,Object> getABDoorLimit(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = doorUnit2Service.getABDoorLimit(map);
		return resultMap;
	}
}
