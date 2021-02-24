package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xr.service.FP_ConsumeRoleService;

import net.sf.json.JSONArray;

@RequestMapping("/consumeType")
@Controller
public class FP_ConsumeRoleController {
	
	@Autowired
	private FP_ConsumeRoleService consumeTypeDataService;
	
	/**
	 * 获取消费模式列表
	 * 以及餐次列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getConsumeTypeList")
	@ResponseBody
	public Map<String,Object> getConsumeTypeList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = consumeTypeDataService.getConsumeTypeList(map);
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
	 * 添加/更新消费模式数据
	 * 以及消费模式下的餐次列表
	 * 字段fid不为空更新，否则新增
	 * delList：删除的餐次列表
	 * update：更新餐次的列表
	 * addList：新增餐次列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/addConsumeType")
	@ResponseBody
	public Map<String,Object> addConsumeType(@RequestParam Map<String,Object> map){
		map.put("addList", JSONArray.fromObject(map.get("addList")));
		Map<String,Object> resultMap = null;
		try{
			resultMap = consumeTypeDataService.addConsumeType(map);
			if(!resultMap.get("result").equals("-1")){
				resultMap.put("flag", true);
				resultMap.put("reason", "数据更新成功！");
			}else{
				resultMap.put("flag", false);
				resultMap.put("reason", "数据更新失败！");
			} 
		}catch(Exception ex){
			System.out.println(ex);
			resultMap.put("flag", false);
			resultMap.put("reason", ex);
			resultMap.put("result", -1);
		}
		
		return resultMap;
	}
	
	/**
	 * 删除
	 * @param map
	 * @return
	 */
	@RequestMapping("/delConsumeType")
	@ResponseBody
	public Map<String,Object> delConsumeType(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		int b = consumeTypeDataService.delConsumeType(map);
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
	@RequestMapping("/getOneConsumeType")
	@ResponseBody
	public Map<String,Object> getOneConsumeType(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		Map<String,Object> oneInfo = consumeTypeDataService.getOneConsumeType(map);
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

}
