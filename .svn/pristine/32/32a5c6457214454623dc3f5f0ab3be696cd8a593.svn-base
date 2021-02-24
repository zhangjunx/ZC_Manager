package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.FP_RestaurantService;

@RequestMapping("/restaurant")
@Controller
public class FP_RestaurantController {
	
	@Autowired
	private FP_RestaurantService restaurantDataService;
	
	/**
	 * 获取餐厅列表
	 */
	@RequestMapping("/getRestaurantList")
	@ResponseBody
	public Map<String,Object> getRestaurantList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = restaurantDataService.getRestaurantList(map);
		if(resultMap != null){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询数据成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "查询数据为空！");
		}
		return resultMap;
	}
	
	/**
	 * 添加/更新餐厅数据
	 * 字段fid不为空更新，否则新增
	 */
	@RequestMapping("/addRestaurant")
	@ResponseBody
	public Map<String,Object> addRestaurant(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		try{
			int b = restaurantDataService.addRestaurant(map);
			if(b>=0){
				resultMap.put("flag", true);
				resultMap.put("reason", "数据更新成功！");
				resultMap.put("result", 1);
			}else{
				resultMap.put("flag", false);
				resultMap.put("reason", "数据更新失败！");
				resultMap.put("result", 0);
			} 
		}catch(Exception ex){
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败，请联系管理员！");
			resultMap.put("result", -1);
		}
		
		return resultMap;
	}
	
	/**
	 * 删除
	 * @param map
	 * @return
	 */
	@RequestMapping("/delRestaurant")
	@ResponseBody
	public Map<String,Object> delRestaurant(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		int b = restaurantDataService.delRestaurant(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据删除成功！");
			resultMap.put("result", 1);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "数据删除失败！");
			resultMap.put("result", 0);
		} 
		return resultMap;
	}
	
	/**
	 * 获取一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOneRestaurant")
	@ResponseBody
	public Map<String,Object> getOneRestaurant(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		Map<String,Object> oneInfo = restaurantDataService.getOneRestaurant(map);
		if(oneInfo != null){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询数据成功！");
			resultMap.put("result", oneInfo);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "查询数据为空！");
			resultMap.put("result", null);
		}
		return resultMap;
	}
	
	/**
	 * 为餐厅分配设备
	 * optType=1为新增设备
	 * optType=2为取消设备
	 * restaurantID:餐厅ID
	 * deviceNo:设备ID
	 */
	@RequestMapping("/apportionDevices")
	@ResponseBody
	public Map<String,Object> apportionDevices(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = restaurantDataService.apportionDevices(map);
		if(!resultMap.get("result").equals("-1")){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "数据更新为空！");
		}
		return resultMap;
	}
	
	/**
	 * 获取设备列表
	 * 返回结果：
	 * resultType=1：可以选择的设备
	 * resultType=2：已选择的设备
	 * resultType=3：被其他设备占用的设备
	 * 
	 * 参数：餐厅restaurantID必填参数
	 * @param map
	 * @return
	 */
	@RequestMapping("/getDeviceList")
	@ResponseBody
	public Map<String,Object> getDeviceList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		List<Map<String,Object>> list = restaurantDataService.getDeviceList(map);
		if(list.size()>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询数据成功！");
			resultMap.put("result", list);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "查询数据为空！");
			resultMap.put("result", 0);
		}
		return resultMap;
	}
}
