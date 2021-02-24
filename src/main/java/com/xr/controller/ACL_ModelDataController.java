package com.xr.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.ACL_ModelData;
import com.xr.entity.PageInfo;
import com.xr.service.IACL_ModelDataService;

@Controller
@RequestMapping("ACL_ModelData")
public class ACL_ModelDataController {
	@Autowired
	private IACL_ModelDataService imds;
	
	/*查询模块列表*/
	@RequestMapping("/queryModelList")
	@ResponseBody
	public Map<String,Object> queryModelList(ACL_ModelData record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("modelcode", record.getModelcode());
			m.put("modelname", record.getModelname());
			List<Map<String,Object>> list=imds.queryModelListService(m);
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
	
	/*查询模块列表*/
	@RequestMapping("/queryModelListByPage")
	@ResponseBody
	public Map<String,Object> queryModelListByPage(ACL_ModelData record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("modelcode", record.getModelcode());
			m.put("modelname", record.getModelname());
			List<Map<String,Object>> list=imds.queryModelListByPageService(m,pageinfo);
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
	public Map<String,Object> insert(ACL_ModelData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=imds.insertSelectiveService(record);
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
	public Map<String,Object> update(ACL_ModelData record){
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
			List<Map<String,Object>> list=imds.getPermByModelService(m);
			if(list.size()>0){
				map.put("flag", false);
				map.put("reason", "对不起，该模块下有子功能，不能被删除！");
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
			map.put("reason", "程序异常，请联系管理员！"+ex.getCause());
		}
		return map;
	}//end
	
	
	/*查询*/
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> query(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			ACL_ModelData record=imds.selectByPrimaryKeyService(id);
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
