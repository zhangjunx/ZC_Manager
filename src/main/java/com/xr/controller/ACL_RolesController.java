package com.xr.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.ACL_Roles;
import com.xr.entity.DepartmentData;
import com.xr.service.IACL_RolesService;

@Controller
@RequestMapping("ACL_Roles")
public class ACL_RolesController {

	@Autowired
	private IACL_RolesService irs;
	
	/*通过主键查询实体类数据 角色*/
	@RequestMapping("/queryRoleData")
	@ResponseBody
	public Map<String,Object> queryRoleDataController(Integer id,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			ACL_Roles roleData=irs.selectByPrimaryKeyService(id);
			if(roleData!=null && !"".equals(roleData)){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", roleData);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}
	
	
	/*更新角色*/
	@RequestMapping("/updateRoleData")
	@ResponseBody
	public Map<String,Object> updateRoleDataController(ACL_Roles record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=irs.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason","更新角色成功!");
			}else{
				map.put("flag", false);
				map.put("reason","更新角色失败!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "更新失败，请联系管理员！");
		}
		return map;
	}
	
	/* 添加角色 管理员或有权限之人  */
	@RequestMapping("/insertRoleData")
	@ResponseBody
	public Map<String,Object> insertRoleDataDataController(ACL_Roles record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=irs.insertRoleDataService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加角色成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "添加角色失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "添加失败，请联系管理员！");
		}
		return map;
	}//end
	
	/*查询角色列表   管理员或有权限之人*/
	/*@RequestMapping("/queryRoleListByPage")
	@ResponseBody
	public Map<String,Object> queryRoleListListByPageController(ACL_Roles record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			//map.put("r", record);
			map.put("pageinfo", pageinfo);
			List<ACL_Roles> list=irs.queryRoleListByPageService(record,pageinfo);
			if(list==null || list.size()==0){
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}else{
				map.put("flag", true);
				map.put("reason", "查询列表成功！");
				map.put("result", list);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		
		return map;
	}//end
*/	
	/*查询角色列表   管理员或有权限之人*/
	@RequestMapping("/queryRoleList")
	@ResponseBody
	public Map<String,Object> queryRoleListListController(ACL_Roles record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<ACL_Roles> list=irs.queryRoleListService(record);
			if(list==null || list.size()==0){
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}else{
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*删除 角色*/
	@RequestMapping("/deleteRoleData")
	@ResponseBody
	public Map<String,Object> deleteRoleDataController(Integer id,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Integer roleid=id; 
			List<Map<String,Object>> list=irs.queryHolderByRoleIDService(roleid);
			if(list.size()>0){
				map.put("flag", false);
				map.put("reason","删除失败，该角色已被占用!");
				return map;
			}
			int i=irs.deleteByPrimaryKeyService(id);
			if(i>0){
				map.put("flag", true);
				map.put("reason","删除成功!");
			}else{
				map.put("flag", false);
				map.put("reason","删除失败!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "删除失败，请联系管理员！");
		}
		return map;
	}//end
	
	/*人员角色分配  选中角色 查该角色下的人getHolderListByRoleId*/
	@RequestMapping("/getHolderListByRoleId")
	@ResponseBody
	public Map<String,Object> getHolderListByRoleId(Integer roleid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("roleid", roleid);
			List<Map<String,Object>> list=irs.getHolderListByRoleIdService(m);
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
	
	 
	
	/*
	 * 批量修改 当给多个用户同时添加角色时 批量修改RoleID值
	*/
	@RequestMapping("/updateRoleIDBatch")
	@ResponseBody
	public Map<String,Object> updateRoleIDBatch(@RequestBody List<Map<String,Object>> list,String str,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("roleid", list.get(0).get("roleid").toString());
			List<Map<String,Object>> litt=irs.getHolderListByRoleIdService(m);
			List<Map<String,Object>> lis=new ArrayList<Map<String,Object>>();
			//添加操作 给人员添加角色 如果角色为空
			for(int k=0;k<list.size();k++){
				String holderno=list.get(k).get("holderno").toString();
				boolean res=false;
				for(int kk=0;kk<litt.size();kk++){
					String holderno1=litt.get(kk).get("holderno").toString();
					if(holderno.equals(holderno1)){
						res=true;
						break;
					}
				}
				if(!res){
					Map<String,Object> m1=list.get(k);
					m1.put("updatedate", new Date());
					m1.put("updateperson", str);
					lis.add(m1);
				}
			}
			int i= irs.updateRoleIDBatchService(lis);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "保存成功！");
			}else{
				map.put("flag", true);
				map.put("reason", "保存失败！");
			}
			
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "保存失败，请联系管理员！");
		}
		return map;
	}//end
	
	

	/*
	 * 批量移除   移除用户的RoleID值 设置为空
	*/
	@RequestMapping("/removeBatch")
	@ResponseBody
	public Map<String,Object> removeBatch(@RequestBody List<Map<String,Object>> list,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("roleid", list.get(0).get("roleid").toString());
			List<Map<String,Object>> litt=irs.getHolderListByRoleIdService(m);
			List<Map<String,Object>> lis=new ArrayList<Map<String,Object>>();
			//添加操作 给人员添加角色
			for(int k=0;k<list.size();k++){
				String holderno=list.get(k).get("holderno").toString();
				boolean res=false;
				for(int kk=0;kk<litt.size();kk++){
					String holderno2=litt.get(kk).get("holderno").toString();
					if(holderno.equals(holderno2)){
						res=true;
						break;
					}
				}
				if(res){
					Map<String,Object> m1=list.get(k);
					m1.put("updatedate", new Date());
					m1.put("updateperson", str);
					m1.put("holderno", holderno);
					lis.add(m1);
				}
			}
			
			int i= irs.updateRoleIDBatchsService(lis);//移除人员角色
			if(i>0){
				map.put("flag", true);
				map.put("reason", "移除成功！");
			}else{
				map.put("flag", true);
				map.put("reason", "移除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 根据登录人的工号 查角色下的部门 */
	/*@RequestMapping("/queryDeptNoListByLoginPerson")
	@ResponseBody
	public Map<String,Object> queryDeptNoListByLoginPersonController(HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<String> deptnos=new ArrayList<String>();//部门列表
		try{
			String holderno=(String) request.getSession().getAttribute("holderno");
			List<Map<String,Object>> list=irs.queryDeptNoListByLoginPersonService(holderno);
			for(int i=0;i<list.size();i++){
				String deptno=(String) list.get(i).get("DeptNo");
				deptnos.add(deptno);
			}
	        System.out.print("len=="+deptnos.size());
			if(deptnos.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", deptnos);
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
*/	
	
	/* 根据登录人的角色 查角色下的部门  添加或修改仓库时 下拉选择部门*/
	@RequestMapping("/queryDeptListByLoginRole")
	@ResponseBody
	public Map<String,Object> queryDeptListByLoginRoleController(HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		List<String> deptnos=new ArrayList<String>();
		try{
			String holderno=(String) request.getSession().getAttribute("holderno");
			List<Map<String,Object>> litt=irs.queryDeptNoListByLoginPersonService(holderno);
			for(int i=0;i<litt.size();i++){
				String deptno=(String) litt.get(i).get("DeptNo");
				deptnos.add(deptno);
			}
			if(deptnos.size()==0 || deptnos==null){
				map.put("flag", false);
				map.put("reason", "对不起，你分配的角色下尚未分配部门，所以无权添加！");
				return map;
			}
			List<DepartmentData> list=irs.queryDeptListByLoginRoleService(deptnos);
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
	
	/*查询所有公司的部门树*/
	@RequestMapping("/getDeptTreeByMyRole")
	@ResponseBody
	public Map<String,Object> getDeptTreeByMyRole(HttpServletResponse resp,String holderno){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String, Object>>  list=irs.getDeptTreeByMyRoleService(holderno);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
}
