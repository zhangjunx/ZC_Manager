package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.DepartureRecord;
import com.xr.entity.PageInfo;
import com.xr.service.IDepartureRecordService;

@Controller
@RequestMapping("DepartureRecord")
public class DepartureRecordController {
	@Autowired
	private IDepartureRecordService idrs;
	 
	/* 添加数据*/
	@RequestMapping("insert")
	@ResponseBody
	public Map<String,Object> insertController(@RequestBody Map m){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=idrs.insertSelectiveService(m);//添加离职记录表
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
	
	/**
	 * 删除一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOneHolder")
	@ResponseBody
	public Map<String,Object> delOneHolder(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = idrs.delOneHolder(map);
		return resultMap;
	}
	
	/*根据工号查离职记录信息*/
	@RequestMapping("/queryDepartureRecordByHolderNo")
	@ResponseBody
	public Map<String,Object> queryDepartureRecordByHolderNoController(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			DepartureRecord dr=idrs.queryDepartureRecordByHolderNoService(holderno);
			if(dr!=null && !"".equals(dr)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", dr);
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
	@RequestMapping("/queryDepartureRecordList")
	@ResponseBody
	public Map<String,Object> queryDepartureDataListController(String holderno,String holdername,String departmentno,HttpServletRequest request,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			/*List<String> deptnos=new ArrayList<String>();
			List<Map<String,Object>> list1=idrs.queryDeptNoListByLoginPersonService(str);
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
			ma.put("departmentno", departmentno);*/
			List<Map<String,Object>> list=idrs.queryDepartureRecordListService(ma);
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
	@RequestMapping("/queryDepartureRecordListByPage")
	@ResponseBody
	public Map<String,Object> queryDepartureDataListByPageController(String holderno,String holdername,String departmentno,PageInfo pageinfo,HttpServletRequest request,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			/*List<String> deptnos=new ArrayList<String>();
			List<Map<String,Object>> list1=idrs.queryDeptNoListByLoginPersonService(str);
			if(list1.size()>0){
				for(int i=0;i<list1.size();i++){
					deptnos.add(list1.get(i).get("deptno").toString());
				}
			}else{
				deptnos.add("000");
			}
			ma.put("list", deptnos);*/
			ma.put("holderno",holderno);
			ma.put("holdername",holdername);
			ma.put("departmentno",departmentno);
			map.put("pageinfo", pageinfo);
			List<Map<String,Object>> list=idrs.queryDepartureRecordListByPageService(ma, pageinfo);
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

}
