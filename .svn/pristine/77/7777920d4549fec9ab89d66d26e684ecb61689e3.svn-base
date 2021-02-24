package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.xr.entity.PageInfo;
import com.xr.entity.ZX_HolderFile;
import com.xr.service.IZX_HolderFileService;

@Controller
@RequestMapping("ZX_HolderFile")
public class ZX_HolderFileController {

	@Autowired
	private IZX_HolderFileService ihfs;
	
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> query(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			ZX_HolderFile record=ihfs.selectByPrimaryKeyService(holderno);
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
	public Map<String,Object> insert(ZX_HolderFile record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ihfs.insertSelectiveService(record);
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
	public Map<String,Object> delete(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ihfs.deleteByPrimaryKeyService(holderno);
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
	public Map<String,Object> update(ZX_HolderFile record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ihfs.updateByPrimaryKeySelectiveService(record);
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
	
	@RequestMapping("/getHolderFileList")
	@ResponseBody
	public Map<String,Object> getHolderFileList(String holderno,String holdername,String idcode){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			m.put("holdername", holdername);
			m.put("idcode", idcode);
			List<Map<String,Object>> list=ihfs.getHolderFileListService(m);
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
	
	@RequestMapping("/getHolderFileListByPage")
	@ResponseBody
	public Map<String,Object> getHolderFileListByPage(String holderno,String holdername,String idcode,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			m.put("holdername", holdername);
			m.put("idcode", idcode);
			List<Map<String,Object>> list=ihfs.getHolderFileListService(m,pageinfo);
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
