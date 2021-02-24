package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.ACL_Roles;
import com.xr.entity.DepartmentData;
import com.xr.entity.HolderData;
import com.xr.entity.PageInfo;

@Service
public interface IACL_RolesService {
	List<ACL_Roles> queryRoleListService(ACL_Roles record);//查询角色列表
	//List<ACL_Roles> queryRoleListByPageService(ACL_Roles record,PageInfo pageinfo);//分页查询角色列表
	
    int insertRoleDataService(ACL_Roles record);//添加角色
    int deleteByPrimaryKeyService(Integer id);//删除角色
    int updateByPrimaryKeySelectiveService(ACL_Roles record);//更新角色
    ACL_Roles selectByPrimaryKeyService(Integer id);//通过主键查询实体类
    List<Map<String,Object>> queryDeptNoListByLoginPersonService(String holderno);// 根据登录人的工号 查角色下的部门 holderno
    
    List<Map<String,Object>> getHolderListByRoleIdService(Map m);//人员角色分配  选中角色 查该角色下的人
    
    int updateRoleIDBatchService(List<Map<String,Object>> list);//人员角色分配 点保存时 批量修改 当给多个用户同时添加角色时 批量修改roleid值
    int updateRoleIDBatchsService(List<Map<String,Object>> list);//人员角色分配 点保存时  批量修改 当给多个用户同时添加角色时 批量修改roleid值
    
    List<DepartmentData> queryDeptListByLoginRoleService(List<String> deptnos);//根据登录人的角色 查角色下的部门  添加或修改仓库时 下拉选择部门
    
    List<Map<String,Object>> queryHolderByRoleIDService(Integer roleid);//删除角色时 查看该角色是否有人员暂用
    List<Map<String,Object>> getDeptTreeByMyRoleService(String holderno);//根据登录人角色获取拥有的部门数列表
    
}
