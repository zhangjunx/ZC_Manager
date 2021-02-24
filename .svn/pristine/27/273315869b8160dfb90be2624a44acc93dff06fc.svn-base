package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.PageInfo;
import com.xr.entity.ZX_ItemType;
import com.xr.service.IZX_ItemTypeService;

@Controller
@RequestMapping("ZX_ItemType")
public class ZX_ItemTypeController {
	@Autowired
	private IZX_ItemTypeService its;
	
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> query(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			ZX_ItemType record=its.selectByPrimaryKeyService(id);
			if(record!=null){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", record);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}
	
	@RequestMapping("/insert")
	@ResponseBody
	public Map<String,Object> insert(ZX_ItemType record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=its.insertSelectiveService(record);
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
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,Object> delete(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=its.deleteByPrimaryKeyService(id);
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
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> update(ZX_ItemType record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=its.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "更新成功！");
				map.put("result", record);
			}else{
				map.put("flag", false);
				map.put("reason", "更新失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}
	
	@RequestMapping("/getItemTypeList")
	@ResponseBody
	public Map<String,Object> getItemTypeList(Integer id,String name){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", id);
			m.put("name", name);
			List<Map<String,Object>> list=its.getItemTypeListService(m);
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
	}
	@RequestMapping("/getItemTypeListByPage")
	@ResponseBody
	public Map<String,Object> getItemTypeListByPage(Integer id,String name,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", id);
			m.put("name", name);
			List<Map<String,Object>> list=its.getItemTypeListService(m,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("page", pageinfo.getPageIndex());
				map.put("limit", pageinfo.getPageSize());
				map.put("total", pageinfo.getSumCount());
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}
	
	
	

}
