package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.IODataPhoto;
import com.xr.service.IIODataPhotoService;

@Controller
@RequestMapping("IODataPhoto")
public class IODataPhotoController {
	@Autowired
	private IIODataPhotoService ips;
	
	/*IODataPhoto queryIOPhotoService();//获取进出的照片*/
	@RequestMapping("/queryIOPhoto")
	@ResponseBody
	public Map<String,Object> queryIOPhotoController(Integer iodataid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			IODataPhoto iop=ips.queryIOPhotoService(iodataid);
			if(iop!=null && !"".equals(iop)){
				map.put("false", true);
				map.put("reason", "查询成功！");
				map.put("result", iop);
			}else{
				map.put("false", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("false", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	

}
