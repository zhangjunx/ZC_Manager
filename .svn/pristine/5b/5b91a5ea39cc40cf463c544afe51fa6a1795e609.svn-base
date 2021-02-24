package com.xr.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.RC_PrisonService;

@RequestMapping("/prison")
@Controller
public class RC_PrisonController {
	
	@Autowired
	private RC_PrisonService prisonService;
	
	/**
	 * 获取监区列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getPrisonList")
	@ResponseBody
	public Map<String,Object> getPrisonList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonService.getPrisonList(map);
		return resultMap;
	}
	
	/**
	 * 添加/编辑监区信息
	 * fid为空是新增，否则是编辑
	 * @param map
	 * @return
	 */
	@RequestMapping("/addPrisonInfo")
	@ResponseBody
	public Map<String,Object> addPrisonInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonService.addPrisonInfo(map);
		return resultMap;
	}

	/**
	 * 获取一条监区信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOnePrisonInfo")
	@ResponseBody
	public Map<String,Object> getOnePrisonInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonService.getOnePrisonInfo(map);
		return resultMap;
	}
	
	/**
	 * 删除一条监区信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOnePrisonInfo")
	@ResponseBody
	public Map<String,Object> delOnePrisonInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonService.delOnePrisonInfo(map);
		return resultMap;
	}
	
	/**
	 * 标签发放/更换
	 * @param map
	 * @return
	 */
	@RequestMapping("/updatePrisonLabel")
	@ResponseBody
	public Map<String,Object> updatePrisonLabel(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonService.updatePrisonLabel(map);
		return resultMap;
	}
}
