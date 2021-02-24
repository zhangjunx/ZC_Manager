package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.ACL_Permissions;
import com.xr.entity.PageInfo;
import com.xr.service.IACL_PermissionsService;

@Controller
@RequestMapping("ACL_Permissions")
public class ACL_PermissionsController {
	@Autowired
	private IACL_PermissionsService iaps;
	 
	  /*查询权限树*/
	/*@RequestMapping("/queryPermTreeList")
	@ResponseBody
	public Map<String,Object> queryPermTreeListController(){
		 Map<String,Object> map=new HashMap<String,Object>();
		 List<Map<String,Object>> litt=new ArrayList<Map<String,Object>>();
		try{
			//查询所有的权限
			List<ACL_MenuData> list=iaps.queryMenuListService();
			//封装数据
			List<Map<String,Object>> lit=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m=new HashMap<String,Object>();
				Integer menuno=list.get(i).getId();
				String menuname=list.get(i).getMenuname();
				m.put("id", menuno);
				m.put("title", menuname);
				//根据菜单编号  查菜单下的功能
				List<ACL_ModelData> list1=iaps.queryModelListByMenuNoService(menuno);
				List<Map<String,Object>> lit1=new ArrayList<Map<String,Object>>();
				for(int j=0;j<list1.size();j++){
					Map<String,Object> m2=new HashMap<String,Object>();
					Integer modelno=list1.get(j).getId();
					String modelname=list1.get(j).getModelname();
					m2.put("id", modelno);
					m2.put("title", modelname);
					//根据功能编号 查功能下的功能
					List<ACL_Permissions> list2=iaps.queryPermListByModelNoServicce(modelno);
					List<Map<String,Object>> lit2=new ArrayList<Map<String,Object>>();
					for(int k=0;k<list2.size();k++){
						Map<String,Object> m3=new HashMap<String,Object>();
						Integer id=list2.get(k).getId();
						String name=list2.get(k).getName();
						m3.put("id", id);
						m3.put("title", name);
						lit2.add(m3);
					}
					m2.put("children", lit2);
					lit1.add(m2);
				}
				m.put("children", lit1);
                lit.add(m);
			}
			if(lit.size()>0){
				map.put("flag", false);
				map.put("reason", "查询成功！");
				map.put("result", lit);
			}else{
				map.put("flag", false);
				map.put("reason", "查询失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			//mappp.put("reason", "查询失败！"+ex.getCause());
			map.put("reason", "查询失败，请联系管理员！");
		}
		 
		return map;
	}//end
	*/
	
	
	/*查询功能列表*/
	@RequestMapping("/queryPermList")
	@ResponseBody
	public Map<String,Object> queryPermList(ACL_Permissions record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("code", record.getCode());
			m.put("name", record.getName());
			List<Map<String,Object>> list=iaps.queryPermListService(m);
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
	
	/*查询功能列表*/
	@RequestMapping("/queryPermListByPage")
	@ResponseBody
	public Map<String,Object> queryPermListByPage(ACL_Permissions record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("code", record.getCode());
			m.put("name", record.getName());
			List<Map<String,Object>> list=iaps.queryPermListByPageService(m,pageinfo);
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
	}//end
	
	/*新增*/
	@RequestMapping("/insert")
	@ResponseBody
	public Map<String,Object> insert(ACL_Permissions record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iaps.insertSelectiveService(record);
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
	
	
	/*修改*/
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> update(ACL_Permissions record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iaps.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "更新成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "更新失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*删除*/
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,Object> delete(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iaps.deleteByPrimaryKeyService(id);
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
	
	/*删除*/
	@RequestMapping("/deleteBatch")
	@ResponseBody
	public Map<String,Object> deleteBatch(@RequestBody List<Integer> arrlist){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iaps.deleteBatchService(arrlist);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量删除成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "批量删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*查询*/
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> query(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			ACL_Permissions record=iaps.selectByPrimaryKeyService(id);
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
	}//end
	
	
}
