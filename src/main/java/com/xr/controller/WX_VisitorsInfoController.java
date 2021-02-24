package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.WX_VisitorsInfo;
import com.xr.service.IWX_VisitorsInfoService;

@Controller
@RequestMapping("WX_VisitorsInfo")
public class WX_VisitorsInfoController {
	@Autowired
	private IWX_VisitorsInfoService ivs;
	 
	
	/*自助登记 添加数据*/
	@RequestMapping("insertVisitorsInfo")
	@ResponseBody
	public Map<String,Object> insertController(WX_VisitorsInfo record,HttpServletResponse resp){
		resp.setHeader("Access-Controller-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ivs.insertSelectiveService(record);
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
	}//end
	
	
	
	
}
