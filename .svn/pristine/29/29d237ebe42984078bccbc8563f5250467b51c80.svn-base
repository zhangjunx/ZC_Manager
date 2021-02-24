package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ACL_Roles_PermissionsMapper;
import com.xr.entity.ACL_Roles_Permissions;
import com.xr.service.IACL_Roles_PermissionsService;
@Service
public class ACL_Roles_PermissionsServiceImpl implements IACL_Roles_PermissionsService {

	@Autowired
	private ACL_Roles_PermissionsMapper apm;

	@Override
	public List<Map<String,Object>> queryPermTreeListByRoleIdService(Integer roleId) {
		//角色权限分配时  选中角色 查看角色下的功能  
		return apm.queryPermTreeListByRoleId(roleId);
	}

	@Override
	public List<ACL_Roles_Permissions> queryACLRolePermListByRoleIdAndPermIdService(ACL_Roles_Permissions record) {
		// 批量添加前 先根据roleid和permid查看是否已添加 
		return apm.queryACLRolePermListByRoleIdAndPermId(record);
	}

	@Override
	public int insertRolePermBatchService(List<ACL_Roles_Permissions> list) {
		// 批量添加  给角色分配权限
		return apm.insertRolePermBatch(list);
	}
	
	@Override
	public int deleteRolePermBatchService(List<Integer> list) {
		// 批量删除  给角色移除已有的权限
		return apm.deleteRolePermBatch(list);
	}
	@Override
	public List<ACL_Roles_Permissions> queryRolePermBatchService(List<Integer> list) {
		// 批量查询
		return apm.queryRolePermBatch(list);
	}

	@Override
	public List<Map<String,Object>>  getHolderMenuPermTree(Map m) {
		// 根据登录人查询其拥有的权限 
		return apm. getHolderMenuPermTree(m);
	}

	@Override
	public List<ACL_Roles_Permissions> queryACLRolePermListByRoleIdService(Integer roleid) {
		// 根据角色id查看   拥有的权限是否存在
		return apm.queryACLRolePermListByRoleId(roleid);
	}


}
