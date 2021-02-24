package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ACL_Roles;
import com.xr.entity.DepartmentData;
import com.xr.entity.HolderData;

@Repository
public interface ACL_RolesMapper {
    int deleteByPrimaryKey(Integer id);//删除角色

    ACL_Roles selectByPrimaryKey(Integer id);//通过主键查询实体类

    int updateByPrimaryKeySelective(ACL_Roles record);//更新角色

    List<ACL_Roles> queryRoleList(ACL_Roles record);//查询角色列表
    
    int insertRoleData(ACL_Roles record);//添加角色
    
    List<Map<String,Object>> queryDeptNoListByLoginPerson(String holderno);// 根据登录人的工号 查角色下的部门  holderno
    
    List<Map<String,Object>> getHolderListByRoleId(Map m);//人员角色分配  选中角色 查该角色下的人
    
    int updateRoleIDBatch(List<Map<String,Object>> list);//人员角色分配 点保存时 批量修改 当给多个用户同时添加角色时 批量修改roleid值
    int updateRoleIDBatchs(List<Map<String,Object>> list);//人员角色分配 点保存时  批量修改 当给多个用户同时添加角色时 批量修改roleid值
    
    List<DepartmentData> queryDeptListByLoginRole(List<String> deptnos);//根据登录人的角色 查角色下的部门  添加或修改仓库时 下拉选择部门
    
    List<Map<String,Object>> queryHolderByRoleID(Integer roleid);//删除角色时 查看该角色是否有人员暂用
    List<Map<String,Object>> getDeptTreeByMyRole(String holderno);//根据登录人角色获取拥有的部门数列表
}