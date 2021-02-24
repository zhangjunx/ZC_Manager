package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.DepartmentData;
import com.xr.entity.PageInfo;
import com.xr.entity.WX_VisitorsInfo;
import com.xr.service.IWX_VisitorsInfoAddService;

@Controller
@RequestMapping("/WX_VisitorsInfoAdd")
public class WX_VisitorsInfoAddController {
	@Autowired
	private IWX_VisitorsInfoAddService ivas;
	
	/*通过刷卡查干警或 固定外协人员信息*/
	@RequestMapping("/queryPeopleInfoByCarNo")
	@ResponseBody
	public Map<String,Object> queryPeopleInfoByCarNoController(String str,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		String cardid=str;
		try{
			Map<String,Object> holderinfo=ivas.queryHolderInfoByCarNoService(cardid);
			//找到干警
			if(holderinfo!=null){
				map.put("flag", true);
				map.put("reason", "查询成功，该卡为干警信息卡！");
				map.put("result", holderinfo);
				map.put("type", "H");
				return map;
			}
			map.put("flag", false);
			map.put("reason", "暂无数据可查！");
			map.put("result", "该卡为无效卡！");
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*批量添加*/
	@RequestMapping("/insertPeopleAutoRegister")
	@ResponseBody
	public Map<String,Object> insertAutoRegisterInfo(@RequestParam("str1") String str1,@RequestParam("str2") String str2,@RequestParam("photo") MultipartFile[] photo,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		try{
			i=ivas.insertPeopleAutoRegisterService(str1,str2,photo);
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
	
	/*批量添加*/
	@RequestMapping("/insertVehicleAutoRegister")
	@ResponseBody
	public Map<String,Object> insertVehicleAutoRegister(@RequestParam("str1") String str1,@RequestParam("str2") String str2,@RequestParam("photo") MultipartFile[] photo,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		try{
			i=ivas.insertVehicleAutoRegisterService(str1,str2,photo);
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
	
	
	/*查询所有参与审批的部门*/
	@RequestMapping("/queryApproveDeptList")
	@ResponseBody
	public Map<String,Object> queryApproveDeptList(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<DepartmentData> list=ivas.queryApproveDeptListService();
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
	
	/*通过部门查改部门下的人*/
	@RequestMapping("/queryHolderListByDeptNo")
	@ResponseBody
	public Map<String,Object> queryHolderListByDeptNo(String departmentno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=ivas.queryHolderListByDeptNoService(departmentno);
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
	
	/*查询所有访客记录*/
	@RequestMapping("/queryVisitorsRegisterRecordList")
	@ResponseBody
	public Map<String,Object> queryVisitorsRegisterRecordList(PageInfo pageinfo,WX_VisitorsInfo record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=ivas.queryVisitorsRegisterRecordListService(pageinfo,record);
			map.put("pageinfo", pageinfo);
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
	
	/*审批不同意*/
	@RequestMapping("/updateApplyStatusNoAgree")
	@ResponseBody
	public Map<String,Object> updateApplyStatusNoAgree(Integer id,String holderno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ivas.updateApplyStatusNoAgreeService(id,holderno);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "驳回成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "驳回失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*审批同意*/
	@RequestMapping("/updateApplyStatusAgree")
	@ResponseBody
	public Map<String,Object> updateApplyStatusAgree(Integer id,String holderno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ivas.updateApplyStatusAgreeService(id,holderno);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批准成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "批准失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*批量审批同意  
	*/
	@RequestMapping("/updateApplyStatusAgreeBatch")
	@ResponseBody
	public Map<String,Object> updateApplyStatusAgreeBatch(@RequestBody Map m,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ivas.updateApplyStatusAgreeBatchService(m);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量批准成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "批量批准失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*批量审批  不同意 
	*/
	@RequestMapping("/updateApplyStatusNoAgreeBatch")
	@ResponseBody
	public Map<String,Object> updateApplyStatusNoAgreeBatch(@RequestBody Map m,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ivas.updateApplyStatusNoAgreeBatchService(m);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量驳回成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "批量驳回失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*登记端 通过卡号或身份证查信息 未审批 
	*/
	@RequestMapping("/queryVisitorsInfoByUnaudited")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoByUnaudited(String str,String strr,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ivas.queryVisitorsInfoByUnauditedService(str);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*登记端 通过卡号或身份证查信息 已审批 
	*/
	@RequestMapping("/queryVisitorsInfoByAudited")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoByAudited(String str,String strr,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ivas.queryVisitorsInfoByAuditedService(str);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*待我审批*/
	@RequestMapping("/queryUnauditedByMy")
	@ResponseBody
	public Map<String,Object> queryUnauditedByMy(String holderno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ivas.queryUnauditedByMyService(holderno);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*我已审批*/
	@RequestMapping("/queryAuditedByMy")
	@ResponseBody
	public Map<String,Object> queryAuditedByMy(String holderno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ivas.queryAuditedByMyService(holderno);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*查询所有已审核访客记录*/
	@RequestMapping("/queryAuditedRecordList")
	@ResponseBody
	public Map<String,Object> queryAuditedRecordList(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String, Object>> list=ivas.queryAuditedRecordListService();
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
	
	
	/*Map<String, Object> queryDetailInfoService(Integer id);//查看详情*/
	@RequestMapping("/queryDetailInfo")
	@ResponseBody
	public Map<String,Object> queryDetailInfo(Integer id,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ivas.queryDetailInfoService(id);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*查询 我的消息  待我审批 实时消息  */
	@RequestMapping("/queryMyCurrNewsInfo")
	@ResponseBody
	public Map<String,Object> queryMyCurrNewsInfo(String holderno,HttpServletResponse resp,HttpServletRequest request,HttpSession session){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ivas.queryMyCurrNewsInfoService(holderno, request,session);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/* 统计司机，固定外协，临时外协人员*/
	@RequestMapping("/getVisitorsStatic")
	@ResponseBody
	public Map<String,Object> getVisitorsStatic(HttpServletResponse resp,PageInfo pageinfo,String date1,String date2){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("date1", date1);
			m.put("date2", date2);
			List<Map<String, Object>> list=ivas.getVisitorsStaticService(m,pageinfo);
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		return map;
	}//end
}
