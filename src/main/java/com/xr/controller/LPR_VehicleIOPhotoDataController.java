package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.LPR_VehicleIOPhotoData;
import com.xr.service.ILPR_VehicleIOPhotoDataService;
@Controller
@RequestMapping("LPR_VehicleIOPhotoData")
public class LPR_VehicleIOPhotoDataController {

	@Autowired
	private  ILPR_VehicleIOPhotoDataService viop;//引入查询车辆现场照片业务层
	
	@RequestMapping("/queryVehicleIOPhoto")
	@ResponseBody
	public Map<String,Object> queryIOPhotoController(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			LPR_VehicleIOPhotoData viophoto=viop.queryVehicleIOPhotoService(id);
			if(viophoto!=null && !"".equals(viophoto)){
				map.put("false", true);
				map.put("reason", "查询成功！");
				map.put("result", viophoto);
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
