package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.ACL_MenuData;
import com.xr.entity.PageInfo;
import com.xr.service.IACL_MenuDataService;

 
@Controller
@RequestMapping("ACL_MenuData")
public class ACL_MenuDataController {
	@Autowired
	private IACL_MenuDataService imds;
	
	/*查询菜单列表*/
	@RequestMapping("/queryMenuList")
	@ResponseBody
	public Map<String,Object> queryMenuList(ACL_MenuData record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("menucode", record.getMenucode());
			m.put("menuname", record.getMenuname());
			List<Map<String,Object>> list=imds.queryMenuListService(m);
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
	
	/*查询菜单列表*/
	@RequestMapping("/queryMenuListByPage")
	@ResponseBody
	public Map<String,Object> queryMenuListByPage(ACL_MenuData record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("menucode", record.getMenucode());
			m.put("menuname", record.getMenuname());
			List<Map<String,Object>> list=imds.queryMenuListByPageService(m,pageinfo);
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
	public Map<String,Object> insert(ACL_MenuData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=imds.insertSelectiveService(record);
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
	
	
	/*修改*/
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> update(ACL_MenuData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=imds.updateByPrimaryKeySelectiveService(record);
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
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", id);
			List<Map<String,Object>> list=imds.getModelByMenuService(m);
			if(list.size()>0){
				map.put("flag", false);
				map.put("reason", "对不起，该菜单下有子模块，不能被删除！");
				return map;
			}
			int i=imds.deleteByPrimaryKeyService(id);
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
	
	
	/*查询*/
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> query(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			ACL_MenuData record=imds.selectByPrimaryKeyService(id);
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
	
	
	/*查询菜单列表*/
	@RequestMapping("/getMenuTree")
	@ResponseBody
	public Map<String,Object> getMenuTree(boolean res){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=imds.getMenuTreeService(res);
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
	
	/* 菜单功能树*/
	@RequestMapping("/getMenuPermTree")
	@ResponseBody
	public Map<String,Object> getMenuPermTree(boolean res){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=imds.getMenuPermTreeService(res);
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
	
	
	
	/*查询菜单 通过主键*/
	@RequestMapping("/getMenu")
	@ResponseBody
	public Map<String,Object> getMenu(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id",id);
			Map<String,Object> record=imds.getMenuService(m);
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
	
	/*查询功能 通过主键*/
	@RequestMapping("/getModel")
	@ResponseBody
	public Map<String,Object> getModel(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id",id);
			Map<String,Object> record=imds.getModelService(m);
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
	
	/*查询功能 通过主键*/
	@RequestMapping("/getPerm")
	@ResponseBody
	public Map<String,Object> getPerm(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id",id);
			Map<String,Object> record=imds.getPermService(m);
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
