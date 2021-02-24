package com.xr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ACL_Roles_DeptMapper;
import com.xr.entity.ACL_Roles_Dept;
import com.xr.service.IACL_Roles_DeptService;
@Service
public class ACL_Roles_DeptServiceImpl implements IACL_Roles_DeptService {

	@Autowired
	private ACL_Roles_DeptMapper rdm;
	
	@Override
	public int insertRoleDeptBatchService(List<ACL_Roles_Dept> list) {
		// 批量添加   给部门添加角色
		return rdm.insertRoleDeptBatch(list);
	}

	@Override
	public int deleteRoleDeptBatchService(List<Integer> list) {
		// 批量删除  给部门移除角色
		return rdm.deleteRoleDeptBatch(list);
	}

	@Override
	public List<ACL_Roles_Dept> queryACLRoleDeptListByRoleIdAndDeptNoService(ACL_Roles_Dept record) {
		// 根据角色和部门    查是否存在
		return rdm.queryACLRoleDeptListByRoleIdAndDeptNo(record);
	}

	@Override
	public List<ACL_Roles_Dept> queryACLRoleDeptListByRoleIdService(ACL_Roles_Dept record) {
		// 通过角色id查询角色部门列表
		return rdm.queryACLRoleDeptListByRoleId(record);
	}
}
