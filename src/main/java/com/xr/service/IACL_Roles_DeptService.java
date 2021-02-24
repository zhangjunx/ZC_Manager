package com.xr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.xr.entity.ACL_Roles_Dept;

@Service
public interface IACL_Roles_DeptService {

    int insertRoleDeptBatchService(List<ACL_Roles_Dept> list);//批量添加   给部门添加角色
    int deleteRoleDeptBatchService(List<Integer> list);//批量删除  给部门移除角色
    List<ACL_Roles_Dept> queryACLRoleDeptListByRoleIdAndDeptNoService(ACL_Roles_Dept record);//根据角色和部门    查是否存在
    List<ACL_Roles_Dept> queryACLRoleDeptListByRoleIdService(ACL_Roles_Dept record);//通过角色id查询角色部门列表
}
