package com.xr.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.Limit_MenuPublicService;

/**
 * 超级管理员模块权限控制
 * @author Administrator
 *
 */
@RequestMapping("/menuPublic")
@Controller
public class Limit_MenuPublicController {
	
	@Autowired
	public Limit_MenuPublicService service;
	
	/**
	 * 获取模块列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(@RequestParam Map<String,Object> map,HttpServletRequest request){
		HttpSession session = request.getSession();
		map.put("thisHolderNo", session.getAttribute("holderno"));
		Map<String,Object> resultMap = service.getList(map);
		return resultMap;
	}
	
	/**
	 * 添加/取消模块权限
	 * limitStatus=1:添加权限
	 * limitStatus=0:取消权限
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateMenuPublicLimit")
	@ResponseBody
	public Map<String,Object> updateMenuPublicLimit(@RequestParam Map<String,Object> map,HttpServletRequest request){
		HttpSession session = request.getSession();
		map.put("thisHolderNo", session.getAttribute("holderno"));
		Map<String,Object> resultMap = service.updateMenuPublicLimit(map);
		return resultMap;
	}
	
	/**
	 * 登录获取权限列表
	 * limitStatus=1:添加权限
	 * limitStatus=0:取消权限
	 * @param map
	 * @return
	 */
	@RequestMapping("/getUserLimitList")
	@ResponseBody
	public Map<String,Object> getUserLimitList(@RequestParam Map<String,Object> map,HttpServletRequest request){
		HttpSession session = request.getSession();
		map.put("thisHolderNo", session.getAttribute("holderno"));
		Map<String,Object> resultMap = service.getUserLimitList(map);
		return resultMap;
	}
	
	/**
	 * 打开页面初始化权限列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOperateList")
	@ResponseBody
	public Map<String,Object> getOperateList(@RequestParam Map<String,Object> map,HttpServletRequest request){
		HttpSession session = request.getSession();
		map.put("thisHolderNo", session.getAttribute("holderno"));
		Map<String,Object> resultMap = service.getOperateList(map);
		return resultMap;
	}

}
