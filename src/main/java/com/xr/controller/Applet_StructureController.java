package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xr.service.Applet_StructureService;

/**
 * 交互层
 * @author csc
 *小程序结构表又称小程序菜单
 */
@RestController
@RequestMapping("struct")
public class Applet_StructureController {
        
	 /**引入小程序结构表业务层*/
	 @Autowired
	 private Applet_StructureService appletService;
	 
	 /**
	  * 树形结构查询小程序模块
	  */
	 @RequestMapping("/getAppletMenu")
	 public Map<String, Object> getAppletMenu(HttpServletResponse resp,Boolean res){
			resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
			Map<String,Object> map=new HashMap<String,Object>();
				List<Map<String, Object>>  list=appletService.getAppletMenu(res);
				if(list.size()>0){
					map.put("flag", true);
					map.put("reason","查询成功!");
					map.put("result", list);
				}else{
					map.put("flag", false);
					map.put("reason","查询失败!");
				}
		 return map;
	 }//end
	
	
}
