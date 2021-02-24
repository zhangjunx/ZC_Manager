package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.DeviceUnit;
import com.xr.service.IDeviceUnitService;

@Controller
@RequestMapping("DeviceUnit")
public class DeviceUnitController {
	@Autowired
	private IDeviceUnitService idus;
	
	/*List<DeviceUnit> queryLPRDeviceListService();//车辆管理  权限设置时   查询车牌识别摄像机*/
	@RequestMapping("/queryLPRDeviceList")
	@ResponseBody
	public Map<String,Object> queryLPRDeviceListController(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<DeviceUnit> list=idus.queryLPRDeviceListService();
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
