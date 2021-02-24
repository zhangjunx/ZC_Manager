package com.xr.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.DoorWeekZone;
import com.xr.service.IDoorWeekZoneService;

@Controller
@RequestMapping("DoorWeekZone")
public class DoorWeekZoneController {
	@Autowired
	private IDoorWeekZoneService iwzs;
	
	@RequestMapping("/insert")
	@ResponseBody
	public Map<String,Object> insert(DoorWeekZone record,String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(holderno!=null && !"".equals(holderno)){
				record.setCreateperson(holderno);
				record.setUpdateperson(holderno);
			}
			record.setUpdatedate(new Date());
			int i=iwzs.insertSelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
				map.put("result", i);
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
	
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> update(DoorWeekZone record,String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(holderno!=null && !"".equals(holderno)){
				record.setUpdateperson(holderno);
			}
			record.setUpdatedate(new Date());
			int i=iwzs.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,Object> delete(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iwzs.deleteByPrimaryKeyService(id);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 

	/* 查询周期时段表*/
	@RequestMapping("/queryWeekZoneList")
	@ResponseBody
	public Map<String,Object> queryWeekZoneList(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Map<String,Object> m=new HashMap<String,Object>();
			m.put("id", id);
			List<Map<String,Object>> list=iwzs.queryWeekZoneListService(m);
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
			map.put("reason", "程序异常，请联系管理员！"+ex.getCause());
		}
		return map;
	}//end
}
