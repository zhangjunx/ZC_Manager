package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.RC_CallTimeModelService;

@RequestMapping("/callTimesModel")
@Controller
public class RC_CallTimeModelController {
	
	@Autowired
	private RC_CallTimeModelService callTimeModelService;
	
	/**
	 * 获取时间模板列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getTimeMoldelList")
	@ResponseBody
	public Map<String,Object> getTimeMoldelList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = callTimeModelService.getTimeMoldelList(map);
		return resultMap;
	}
	
	@RequestMapping("/getTimeMoldelMemberList")
	@ResponseBody
	public Map<String,Object> getTimeMoldelMemberList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = callTimeModelService.getTimeMoldelMemberList(map);
		return resultMap;
	}
	
	/**
	 * 新增/编辑时间模板表
	 * @param map
	 * @return
	 */
	@RequestMapping("/addTimeMoldel")
	@ResponseBody
	public Map<String,Object> addTimeMoldel(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = callTimeModelService.addTimeMoldel(map);
		return resultMap;
	}
	
	/**
	 * 获取一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOneTimeMoldelInfo")
	@ResponseBody
	public Map<String,Object> getOneTimeMoldelInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = callTimeModelService.getOneTimeMoldelInfo(map);
		return resultMap;
	}
	
	/**
	 * 删除一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOneTimeMoldelInfo")
	@ResponseBody
	public Map<String,Object> delOneTimeMoldelInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = callTimeModelService.delOneTimeMoldelInfo(map);
		return resultMap;
	}
}
