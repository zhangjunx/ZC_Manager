package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ACL_Roles_Permissions;
@Repository
public interface ACL_Roles_PermissionsMapper {
    
    List<Map<String,Object>> queryPermTreeListByRoleId(Integer roleId);//根据角色查询权限列表
    
    int insertRolePermBatch(List<ACL_Roles_Permissions> list);//批量添加
    int deleteRolePermBatch(List<Integer> list);//批量删除  给角色移除已有的权限
    List<ACL_Roles_Permissions> queryRolePermBatch(List<Integer> list);//批量查询
    List<ACL_Roles_Permissions> queryACLRolePermListByRoleIdAndPermId(ACL_Roles_Permissions record);//批量添加前 先根据roleid和permid查看是否已添加 
   
    List<Map<String,Object>> getHolderMenuPermTree(Map m);// 根据登录人查询其拥有的权限 
   
    List<ACL_Roles_Permissions> queryACLRolePermListByRoleId(Integer roleid);//根据角色id查看   拥有的权限是否存在
}