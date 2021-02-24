package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.WX_Approver;
import com.xr.service.IWX_ApproverService;

@Controller
@RequestMapping("WX_Approver")
public class WX_ApproverController {
	
	@Autowired
	private IWX_ApproverService ias;
	 
	
	/*查询列表*/
	@RequestMapping("/insertApprover")
	@ResponseBody
	public Map<String,Object> insertApprover(WX_Approver record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ias.insertSelective(record);
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
	
	/*批量添加审批角色*/
	@RequestMapping("/insertApproverBatch")
	@ResponseBody
	public Map<String,Object> insertApproverBatch(@RequestBody Map m,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ias.insertApproverBatchService(m);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "保存成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "保存失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*批量移除审批角色*/
	@RequestMapping("/deleteApproverBatch")
	@ResponseBody
	public Map<String,Object> deleteApproverBatch(@RequestBody Map m,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ias.deleteApproverBatchService(m);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "移除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "移除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据角色主键 查角色下的人员:工号，姓名，部门*/
	@RequestMapping("/queryHolderListByRoleCode")
	@ResponseBody
	public Map<String,Object> queryHolderListByRoleNo(String rolecode,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>>  list=ias.queryHolderListByRoleCodeService(rolecode);
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
	
	/*List<Map<String,Object>> queryApproverSuperList();//查询审批领导人列表
	*/
	@RequestMapping("/queryApproverSuperList")
	@ResponseBody
	public Map<String,Object> queryApproverSuperList(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>>  list=ias.queryApproverSuperListService();
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
	
	/*List<Map<String,Object>>  queryVisitorsReasonList();//查询来访原因列表
	*/
	@RequestMapping("/queryVisitorsReasonList")
	@ResponseBody
	public Map<String,Object> queryVisitorsReasonList(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>>  list=ias.queryVisitorsReasonListService();
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
	
	/*查询审批部门*/
	@RequestMapping("/queryDeptList")
	@ResponseBody
	public Map<String,Object> queryDeptList(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ias.queryDeptListService();
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
}
