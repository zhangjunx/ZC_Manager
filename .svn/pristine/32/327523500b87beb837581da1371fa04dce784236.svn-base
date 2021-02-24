package com.xr.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.DoorArrModule;
import com.xr.entity.PageInfo;
import com.xr.service.IDoorArrModuleService;

@Controller
@RequestMapping("DoorArrModule")
public class DoorArrModuleController {
	
	@Autowired
	private IDoorArrModuleService idas;
	
	/*查询门区模块列表*/
	@RequestMapping("/getDoorArrList")
	@ResponseBody
	public Map<String,Object> getDoorArrList(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", id);
			List<Map<String,Object>> list=idas.getDoorArrListService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("reason", list);
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
	
	/*查询门区模块列表*/
	@RequestMapping("/getDoorArrListByPage")
	@ResponseBody
	public Map<String,Object> getDoorArrListByPage(DoorArrModule record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("name", record.getName());
			m.put("type", record.getType());
			List<Map<String,Object>> list=idas.getDoorArrListByPageService(m,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("total", pageinfo.getSumCount());
				map.put("limit", pageinfo.getPageSize());
				map.put("page", pageinfo.getPageIndex());
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
	
	/*查询门区模块列表*/
	@RequestMapping("/getVDoorArrList")
	@ResponseBody
	public Map<String,Object> getVDoorArrList(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", id);
			List<Map<String,Object>> list=idas.getVDoorArrListService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("reason", list);
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
	
	/*查询门区模块列表*/
	@RequestMapping("/getHDoorArrList")
	@ResponseBody
	public Map<String,Object> getHDoorArrList(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", id);
			List<Map<String,Object>> list=idas.getHDoorArrListService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("reason", list);
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
	
	/*查询门区模块列表*/
	@RequestMapping("/insert")
	@ResponseBody
	public Map<String,Object> insert(DoorArrModule record,String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(holderno!=null && !"".equals(holderno)){
				record.setUpdateperson(holderno);
			}
			record.setUpdatedate(new Date());
			int i=idas.insertSelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
				map.put("result", record);
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
	
	/*查询门区模块列表*/
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> update(DoorArrModule record,String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(holderno!=null && !"".equals(holderno)){
				record.setUpdateperson(holderno);
			}
			record.setUpdatedate(new Date());
			int i=idas.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
				map.put("result", record);
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
	
	/*批量删除*/
	@RequestMapping("/deleteBatch")
	@ResponseBody
	public Map<String,Object> deleteBatch(@RequestBody List<Integer> list){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=idas.deleteBatchService(list);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
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

}
