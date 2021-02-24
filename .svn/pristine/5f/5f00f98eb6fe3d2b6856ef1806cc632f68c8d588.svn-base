package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.ACL_Roles_Dept;
import com.xr.service.IACL_Roles_DeptService;

@Controller
@RequestMapping("ACL_Roles_Dept")
public class ACL_Roles_DeptController {

	@Autowired
	private IACL_Roles_DeptService irds;
	
	/*批量添加   给部门添加角色*/
	@RequestMapping("/insertRoleDeptBatch")
	@ResponseBody
	public Map<String,Object> insertRoleDeptBatchController(@RequestBody List<ACL_Roles_Dept> list){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<ACL_Roles_Dept> lit=irds.queryACLRoleDeptListByRoleIdService(list.get(0));
			List<ACL_Roles_Dept> lis=new ArrayList<ACL_Roles_Dept>();
			List<Integer> datanos=new ArrayList<Integer>();
			
			//添加操作
			for(int k=0;k<list.size();k++){
				String deptno=list.get(k).getDeptno();
				boolean res=false;
				for(int kk=0;kk<lit.size();kk++){
					String deptno2=lit.get(kk).getDeptno();
					//判断传过来的值是否与数据库里面值相等 如果等不在添加 否则添加
					if(deptno==deptno2 || deptno.equals(deptno2)){
						res=true;
						break;
					}
				} 
				if(!res){
					lis.add(list.get(k));
				}
			} 
			//删除操作
			for(int k=0;k<lit.size();k++){
				String deptno=lit.get(k).getDeptno();
				boolean res=false;
				for(int kk=0;kk<list.size();kk++){
					String deptno2=list.get(kk).getDeptno();
					//判断传过来的值是否与数据库里面值相等 如果等不在添加 否则添加
					if(deptno==deptno2 || deptno.equals(deptno2)){
						res=true;
						break;
					}
				} 
				if(!res){
					datanos.add(lit.get(k).getDatano());
				}
			} 
			int i=0;
			int i2=0;
			if(lis.size()>0){
				i=irds.insertRoleDeptBatchService(lis);
			}
			if(datanos.size()>0){
				i2=irds.deleteRoleDeptBatchService(datanos);
			} 
			map.put("flag", true);
			map.put("reason", "保存成功！");
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据角色查角色部门   */
	@RequestMapping("/queryACLRoleDeptListByRoleId")
	@ResponseBody
	public Map<String,Object> deleteRoleDeptBatchController(ACL_Roles_Dept record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<ACL_Roles_Dept> list=irds.queryACLRoleDeptListByRoleIdService(record);
			if(list.size()>0 && list!=null){
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
	
	
	
}
