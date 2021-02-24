package com.xr.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xr.entity.ACL_Roles_Dept;
@Repository
public interface ACL_Roles_DeptMapper {
    int deleteByPrimaryKey(Integer datano);//删除角色部门关联

    int insert(ACL_Roles_Dept record);

    int insertSelective(ACL_Roles_Dept record);//添加角色部门关联数据

    ACL_Roles_Dept selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(ACL_Roles_Dept record);//更新角色部门关联

    int updateByPrimaryKey(ACL_Roles_Dept record);
    
    int insertRoleDeptBatch(List<ACL_Roles_Dept> list);//批量添加   给部门添加角色
    int deleteRoleDeptBatch(List<Integer> list);//批量删除  给部门移除角色
    List<ACL_Roles_Dept> queryACLRoleDeptListByRoleIdAndDeptNo(ACL_Roles_Dept record);//根据角色和部门    查是否存在
    
    List<ACL_Roles_Dept> queryACLRoleDeptListByRoleId(ACL_Roles_Dept record);//通过角色id查询角色部门列表
}