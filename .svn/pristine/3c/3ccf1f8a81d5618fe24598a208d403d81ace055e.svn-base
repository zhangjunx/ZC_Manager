package com.xr.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.HolderPhoto;
import com.xr.service.IHolderPhotoService;

@Controller
@RequestMapping("HolderPhoto")
public class HolderPhotoController {
	@Autowired
	private IHolderPhotoService ihps;	
	
	@RequestMapping("/updatePhoto")
	@ResponseBody
	public Map<String,Object> updatePhotoController(@RequestParam("avatarSlect") MultipartFile file,HttpServletResponse resp,HolderPhoto holderphoto){
		Map<String,Object> map=new HashMap<String,Object>();
		resp.setHeader("Access-Controller-Allow-Origin", "*");
		try {
			map=ihps.updatePhotoService(file,holderphoto);
		} catch (IOException e) {
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		return map;
	}
	 
	 @RequestMapping(value="/queryPhoto")
	 @ResponseBody
	 public Map<String,Object> queryPhoto1Controller(String holderno,HttpServletRequest request,HttpServletResponse resp){
		 //获取图片id 方便查询  
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			  map=ihps.queryPhotoService(holderno);
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	
	    /*更新人员信息*/
	   /* @RequestMapping("/updateHolderInfoAndPhoto")
		@ResponseBody
		public Map<String,Object> updateHolderInfoAndPhotoController(@RequestParam("avatarSlect") MultipartFile file,HttpServletResponse resp,HolderData record){
			Map<String,Object> map=new HashMap<String,Object>();
			resp.setHeader("Access-Controller-Allow-Origin", "*");
			try {
				 map=ihps.updateHolderInfoAndPhotoService(file,record);
			} catch (IOException e) {
				map.put("flag", false);
				map.put("reason", "程序异常，请联系管理员！");
			} 
			return map;
		}*/
	 
	 
}
