package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.ACL_Roles_Permissions;
import com.xr.service.IACL_Roles_PermissionsService;

@Controller
@RequestMapping("ACL_Roles_Permissions")
public class ACL_Roles_PermissionsController {

	@Autowired
	private IACL_Roles_PermissionsService irps;
	
	/*
	 * 批量添加  给角色分配权限*/
	@RequestMapping("/insertRolePermBatch")
	@ResponseBody
	public Map<String,Object> insertRolePermBatchController(@RequestBody List<ACL_Roles_Permissions> list){
		Map<String,Object> map=new HashMap<String,Object>();
		try{ 
		List<ACL_Roles_Permissions> lis=new ArrayList<ACL_Roles_Permissions>();
		List<ACL_Roles_Permissions> lit=irps.queryACLRolePermListByRoleIdService(list.get(0).getRoleId());//根据角色id 查询此角色有哪些功能
		List<Integer> ids=new ArrayList<Integer>();
		//批量添加
		for(int k=0;k<list.size();k++){
			Integer permId1=list.get(k).getPermissionId();
			boolean res=false;
			//判断传过来的值是否存在 数据库中
			for(int kk=0;kk<lit.size();kk++){
				Integer permId2=lit.get(kk).getPermissionId();
				if(permId1==permId2 || permId1.equals(permId2)){
					res=true;
					break;
				}
			}
			if(!res){
				lis.add(list.get(k));
				//i=irps.insertRolePermBatchService(lis);
			}
		}
		//删除
		for(int k=0;k<lit.size();k++){//5tiao
			Integer permId1=lit.get(k).getPermissionId();
			boolean res=false;
			//查看传来的数据  与数据库原有的  少了哪条  然后删除
			for(int kk=0;kk<list.size();kk++){//4条
				Integer permId2=list.get(kk).getPermissionId();
				if(permId1==permId2 || permId1.equals(permId2)){
					res=true;
					break;
				}
			}
			if(!res){
				ids.add(lit.get(k).getId());
				//i2=irps.deleteRolePermBatchService(ids);
			}
		}
		int i=0;
		int i2=0;
		if(lis.size()>0){
			i=irps.insertRolePermBatchService(lis);
		}
		if(ids.size()>0){
			i2=irps.deleteRolePermBatchService(ids);
		}
		if(i>0 || i2>0){
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
	
	/*根据登录人    查询其拥有的权限 */
	@RequestMapping("/getHolderMenuPermTree")
	@ResponseBody
	public Map<String,Object> queryACLRolePermListByLoginPersonController(String holderno,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			List<Map<String,Object>> list=irps. getHolderMenuPermTree(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询数据成功！");
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
	
	/*角色权限分配时  选中角色 查看角色下的功能 */
	@RequestMapping("/queryPermTreeListByRoleId")
	@ResponseBody
	public Map<String,Object> queryPermTreeListByRoleIdController(Integer roleId){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=irps.queryPermTreeListByRoleIdService(roleId);
			if(list==null || list.size()==0){
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}else{
				map.put("flag", true);
				map.put("reason", "查询子功能成功！");
				map.put("result", list);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		
		return map;
	}//end
	
	
	
	
}
