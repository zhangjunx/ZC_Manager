package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.RC_PrisonAreaService;

@RequestMapping("/prisonArea")
@Controller
public class RC_PrisonAreaController {
	
	@Autowired
	private RC_PrisonAreaService prisonAreaService;
	
	/**
	 * 获取区域列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getPrisonAreaList")
	@ResponseBody
	public Map<String,Object> getPrisonAreaList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonAreaService.getPrisonAreaList(map);
		return resultMap;
	}
	
	/**
	 * 新增/编辑区域数据
	 * fid不为空时：编辑，否则：新增
	 * @param map
	 * @return
	 */
	@RequestMapping("/addPrisonArea")
	@ResponseBody
	public Map<String,Object> addPrisonArea(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonAreaService.addPrisonArea(map);
		return resultMap;
	}
	
	/**
	 * 获取一条区域信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOnePrisonArea")
	@ResponseBody
	public Map<String,Object> getOnePrisonArea(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonAreaService.getOnePrisonArea(map);
		return resultMap;
	}
	
	/**
	 * 删除一条区域信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOnePrisonArea")
	@ResponseBody
	public Map<String,Object> delOnePrisonArea(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonAreaService.delOnePrisonArea(map);
		return resultMap;
	}
	
	/**
	 * 标签绑定
	 * optType=1：为绑卡
	 * optType=2：为换卡
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateAreaLabel")
	@ResponseBody
	public Map<String,Object> updateAreaLabel(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonAreaService.updateAreaLabel(map);
		return resultMap;
	}
	
}
