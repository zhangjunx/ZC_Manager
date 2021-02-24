package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.SY210AppSet;
import com.xr.service.ISY210AppSetService;

@Controller
@RequestMapping("SY210AppSet")
public class SY210AppSetController {
	@Autowired
	private ISY210AppSetService iss;
	
	@RequestMapping("/querySY210AppSetByDeviceNoAndEntryReader")
	@ResponseBody
	public Map<String,Object> querySY210AppSetByDeviceNoAndEntryReaderController(SY210AppSet record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<SY210AppSet> sylist=iss.querySY210AppSetByDeviceNoAndEntryReaderService(record);
			if(sylist.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", sylist);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* List<SY210AppSet> querySY210AppSetNoListService();//门区权限查看时  查询门区不为空的AppsetNo列表*/
	@RequestMapping("/querySY210AppSetNoList")
	@ResponseBody
	public Map<String,Object> querySY210AppSetNoListController(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<SY210AppSet> list=iss.querySY210AppSetNoListService();
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	

}
