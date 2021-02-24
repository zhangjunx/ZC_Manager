package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.IOData;
import com.xr.service.BigDataService;

@Controller
@RequestMapping("BigData")
public class BigDataController {

	@Autowired
	private BigDataService bds;
	
	@RequestMapping("/queryInfoSum")
	@ResponseBody
	public Map<String,Object> queryInfoSum(){//设备、门、人员、车辆信息统计
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=bds.queryDDPCInfoSum();
		if (m.get("flag").equals(true)) {
			m.remove("flag");
			map.put("flag", true);
			map.put("result", m);
			map.put("reason", "查询成功！");
		}else {
			map.put("flag", false);
			map.put("reason", m.get("reason"));
		}
		return map;
	}//end
	
	/*查进出记录 大数据显示的*/
	@RequestMapping("/queryIORecordByBigData")
	@ResponseBody
	public Map<String,Object> queryIORecordByBigData(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<IOData> list=bds.queryIORecordByBigDataService();
			if (list.size()>0) {
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else {
				map.put("flag", false);
				map.put("reason", "暂无数据可查");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		
		return map;
	}//end
	
	/*统计设备和人员数量*/
	@RequestMapping("/queryDeviceAndHolderCount")
	@ResponseBody
	public Map<String,Object> queryDeviceAndHolderCount(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Map<String,Object> map1=bds.queryDeviceAndHolderCountService();
			if (map!=null) {
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", map1);
			}else {
				map.put("flag", false);
				map.put("reason", "暂无数据可查");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		
		return map;
	}//end
}
