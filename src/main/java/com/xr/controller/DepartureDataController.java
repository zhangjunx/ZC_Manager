package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.PageInfo;
import com.xr.service.IACL_RolesService;
import com.xr.service.IDepartureDataService;

@Controller
@RequestMapping("DepartureData")
public class DepartureDataController {

	@Autowired
	private IDepartureDataService idds;
	@Autowired
	private IACL_RolesService irs;
	/*删除离职资料库信息  管理员或有权限之人*/
	@RequestMapping("/deleteByPrimaryKey")
	@ResponseBody
	public Map<String,Object> deleteDepartureDataController(String holderno,String loginholderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=idds.deleteByPrimaryKeyService(holderno,loginholderno);
			if(i<=0){
				map.put("flag", false);
				map.put("reason", "再次入职失败！");
			}else{
				map.put("flag", true);
				map.put("reason", "再次入职成功！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}//end
		return map;
	}//end
	
	/* 添加数据   员工离职 即当员工表holderdata删除用户时 执行添加操作  管理员或有权限之人*/
	/*@RequestMapping("/insertDepartureData")
	@ResponseBody
	public Map<String,Object> insertDepartureDataController(DepartureData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String holderno=record.getHolderno();
			HolderData h=ihds.selectByPrimaryKeyService(holderno);
			int i=0;
			int i2=0;
			if(h!=null && !"".equals(h)){
				record.setTitleno(h.getTitleno());
				record.setDepartmentno(h.getDepartmentno());
				record.setCompanyname(h.getCompanyname());
				record.setCreatedate(h.getCreatedate());
				record.setCreateperson(h.getCreateperson());
				record.setUpdatedate(h.getUpdatedate());
				record.setUpdateperson(h.getUpdateperson());
				record.setDelperson((String)request.getSession().getAttribute("holderno"));
				record.setDeldate(new Date());
				record.setWarningname(h.getWarningname());
				record.setHolderstatus(h.getHolderstatus());
				record.setRoleid(h.getRoleid());
				i=idds.insertSelectiveService(record);
				i2=ihds.deleteByPrimaryKeyService(holderno);
			}else{
				map.put("flag", false);
				map.put("reason", "离职失败，该工号在人事资料中不存在！");
				return map;
			}
			if(i>0 && i2>0){
				map.put("flag", true);
				map.put("reason", "离职成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "离职失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	*/
	/*查询离职资料库信息   管理员或有权限之人*/
	@RequestMapping("/queryDepartureDataList")
	@ResponseBody
	public Map<String,Object> queryDepartureDataListController(String holderno,String holdername,String departmentno,HttpServletRequest request,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			List<String> deptnos=new ArrayList<String>();
			List<Map<String,Object>> list1=irs.queryDeptNoListByLoginPersonService(str);
			if(list1.size()>0){
				for(int i=0;i<list1.size();i++){
					deptnos.add(list1.get(i).get("deptno").toString());
				}
			}else{
				deptnos.add("000");
			}
			ma.put("list", deptnos);
			ma.put("holderno", holderno);
			ma.put("holdername", holdername);
			ma.put("departmentno", departmentno);
			List<Map<String,Object>> list=idds.queryDepartureListService(ma);
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
	
	/*查询离职资料库信息   管理员或有权限之人*/
	@RequestMapping("/queryDepartureDataListByPage")
	@ResponseBody
	public Map<String,Object> queryDepartureDataListByPageController(String holderno,String holdername,String departmentno,PageInfo pageinfo,HttpServletRequest request,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			List<String> deptnos=new ArrayList<String>();
			List<Map<String,Object>> list1=irs.queryDeptNoListByLoginPersonService(str);
			if(list1.size()>0){
				for(int i=0;i<list1.size();i++){
					deptnos.add(list1.get(i).get("deptno").toString());
				}
			}else{
				deptnos.add("000");
			}
			ma.put("list", deptnos);
			ma.put("holderno",holderno);
			ma.put("holdername",holdername);
			ma.put("departmentno",departmentno);
			map.put("pageinfo", pageinfo);
			List<Map<String,Object>> list=idds.queryDepartureListByPageService(ma, pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*通过主键查询实体信息   管理员或有权限之人*/
	@RequestMapping("/queryDepartureByHolderNo")
	@ResponseBody
	public Map<String,Object> queryDepartureDataByPrimarkKeyController(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Map<String,Object> departuredata=idds.queryDepartureByHolderNoService(holderno);
			if(departuredata!=null && !"".equals(departuredata)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", departuredata);
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
