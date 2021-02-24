package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.LPR_Device;
import com.xr.entity.LPR_VehicleDevice;
import com.xr.service.ILPR_DeviceService;

@Controller
@RequestMapping("LPR_Device")
public class LPR_DeviceController {
	
	@Autowired
	private ILPR_DeviceService ds;//引入摄像机的业务层
	/**
	 * 查询摄像机信息
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryDevice")
	public Map<String,Object> queryDeviceController(){
		Map<String,Object> map = new HashMap<String,Object>();
		try{
			 //查询出的车辆信息放入到list集合
			 List<LPR_Device> list = ds.queryDeviceService();
				if(list.size()>0){
					map.put("flag", true);
					map.put("reason", "查询成功！");
					map.put("result", list);
				}else{
					map.put("flag",false);
					map.put("reason", "暂无数据可查！");
				}
			}catch(Exception ex){
				map.put("flag", false);
				map.put("reason", "程序异常，请联系管理员！");
			}
		return map;
	}//end

}
