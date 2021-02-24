package com.xr.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.xr.service.Limit_MenuService;

/**
 * 对角色进行菜单进行赋权
 * @author Administrator
 *
 */
@RequestMapping("/limit_menu")
@Controller
public class Limit_MenuController {

	@Autowired
	private Limit_MenuService service;
	
	/**
	 * 获取菜单及按钮列表
	 * @param map
	 * @param request
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
	 * 根据角色获取权限列表
	 * @param map
	 * @param request
	 * @return
	 */
	@RequestMapping("/getHasLimitList")
	@ResponseBody
	public Map<String,Object> getHasLimitList(@RequestParam Map<String,Object> map,HttpServletRequest request){
		Map<String,Object> resultMap = service.getHasLimitList(map);
		return resultMap;
	}
	
	/**
	 * 添加菜单/页面/操作按钮操作
	 * 此操作只有administrator用户有操作权限
	 * @param map
	 * @param request
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/addMenu")
	@ResponseBody
	public Map<String,Object> addMenu(@RequestParam(value="file",required=false) MultipartFile file,String str) throws IOException{
		Map<String,Object> map = JSONObject.parseObject(str);
		Map<String,Object> resultMap = service.addMenu(map,file);
		return resultMap;
	}
	
	/**
	 * 获取一条菜单信息
	 * 此操作只有administrator用户有操作权限
	 * @param map
	 * @param request
	 * @return
	 */
	@RequestMapping("/getOneMenu")
	@ResponseBody
	public Map<String,Object> getOneMenu(@RequestParam Map<String,Object> map,HttpServletRequest request){
		Map<String,Object> resultMap = service.getOneMenu(map);
		return resultMap;
	}
	
	/**
	 * 获取一条菜单信息
	 * 此操作只有administrator用户有操作权限
	 * @param map
	 * @param request
	 * @return
	 */
	@RequestMapping("/delOneMenu")
	@ResponseBody
	public Map<String,Object> delOneMenu(@RequestBody Map<String,Object> map,HttpServletRequest request){
		Map<String,Object> resultMap = service.delOneMenu(map);
		return resultMap;
	}
	
	/**
	 * 为角色分配权限
	 * optType=1:添加权限
	 * optType=2:取消权限
	 * @param map
	 * @param request
	 * @return
	 */
	@RequestMapping("/addUserLimit")
	@ResponseBody
	public Map<String,Object> addUserLimit(@RequestBody Map<String,Object> map){
		Map<String,Object> resultMap = service.addUserLimit(map);
		return resultMap;
	}
}
