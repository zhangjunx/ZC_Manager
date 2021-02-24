package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.LH_MySign;
import com.xr.entity.PageInfo;
import com.xr.service.ILH_MySignService;
import com.xr.tool.ImageSizeUtil;

@Controller
@RequestMapping("LH_MySign")
public class LH_MySignController {
	
	@Autowired
	private ILH_MySignService imss;
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	 
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,Object> delete(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=imss.deleteByPrimaryKeyService(id);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 更新
	 * @param record
	 * @param request
	 * @return
	 */
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> updateLH_MySignController(LH_MySign record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=imss.updateByPrimaryKeySelectiveService(record);
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 添加
	 * @param record
	 * @return
	 */
	@RequestMapping("/insert")
	@ResponseBody
	public Map<String,Object> insert(LH_MySign record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=imss.insertSelectiveService(record);
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 添加
	 * @param record
	 * @return
	 */
	@RequestMapping("/insert1")
	@ResponseBody
	public Map<String,Object> insert(LH_MySign record,MultipartFile file){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(file!=null && !file.isEmpty()){
				byte[] bytes=ImageSizeUtil.getFileBytes(file);
				record.setPhoto1(bytes);
			}
			int i=imss.insertSelectiveService(record);
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/**
	 * 分页查询
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	 
	@RequestMapping("/getSignList")
	@ResponseBody
	public Map<String,Object> getSignList(PageInfo pageinfo,LH_MySign record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=imss.getSignListService(m,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("page", pageinfo.getPageIndex());
				map.put("limit", pageinfo.getPageSize());
				map.put("total", pageinfo.getSumCount());
			}else{
				map.put("flag", false);
				map.put("reason", "查询成功！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	

}
