package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.WX_VisitorsPhoto;
import com.xr.service.IWX_VisitorsPhotoService;

@Controller
@RequestMapping("WX_VisitorsPhoto")
public class WX_VisitorsPhotoController {
	@Autowired
	private IWX_VisitorsPhotoService ivps;

	/*添加照片*/
	@RequestMapping("insertVisitorsPhoto")
	@ResponseBody
	public Map<String,Object> insertPhotoController(WX_VisitorsPhoto record,HttpServletResponse resp){
		resp.setHeader("Access-Controller-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ivps.insertSelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "添加失败！");
			}
			
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}

}
