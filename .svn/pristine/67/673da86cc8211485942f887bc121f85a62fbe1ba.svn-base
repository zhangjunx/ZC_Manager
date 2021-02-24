package com.xr.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.WX_VisitorsReasonType;
import com.xr.service.IWX_VisitorsReasonTypeService;

@Controller
@RequestMapping("WX_VisitorsReasonType")
public class WX_VisitorsReasonTypeController {

	@Autowired
	private IWX_VisitorsReasonTypeService irts;
	
	@RequestMapping("/insertVisitorsReasonType")
	@ResponseBody
	public Map<String,Object> insert(WX_VisitorsReasonType record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=irts.insertSelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
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
	
	@RequestMapping("/updateVisitorsReasonType")
	@ResponseBody
	public Map<String,Object> updateVisitorsReasonType(WX_VisitorsReasonType record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=irts.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
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
	
	@RequestMapping("/deleteVisitorsReasonType")
	@ResponseBody
	public Map<String,Object> deleteVisitorsReasonType(Integer id,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=irts.deleteByPrimaryKeyService(id);
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
	
	@RequestMapping("/queryVisitorsReasonTypeList")
	@ResponseBody
	public Map<String,Object> queryVisitorsReasonTypeList(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<WX_VisitorsReasonType> list=irts.queryVisitorsReasonTypeListService();
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "查询失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*int queryMaxIdService();//获取最大id值 +1*/
	@RequestMapping("/queryMaxId")
	@ResponseBody
	public Map<String,Object> queryMaxId(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Integer  id=irts.queryMaxIdService();
			map.put("flag", true);
			map.put("reason", "查询成功！");
			if(id==null || id.equals("")){
				map.put("result", 1);
			}else{
				map.put("result",id);
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
}
