package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ACL_RolesMapper;
import com.xr.entity.ACL_Roles;
import com.xr.entity.DepartmentData;
import com.xr.entity.HolderData;
import com.xr.service.IACL_RolesService;
import com.xr.util.TreeToolUtils;
@Service
public class ACL_RolesServiceImpl implements IACL_RolesService {

	@Autowired
	private ACL_RolesMapper arm;

	@Override
	public List<ACL_Roles> queryRoleListService(ACL_Roles record) {
		// 分页查询
		return arm.queryRoleList(record);
	}

	/*@Override
	public List<ACL_Roles> queryRoleListByPageService(ACL_Roles record,PageInfo pageinfo) {
		// 查询角色列表
		
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<ACL_Roles> list=arm.queryRoleListByPage(record);
		com.github.pagehelper.PageInfo<ACL_Roles> p=new com.github.pagehelper.PageInfo<ACL_Roles>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}*/

	@Override
	public int insertRoleDataService(ACL_Roles record) {
		// 添加角色
		return arm.insertRoleData(record);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除角色
		return arm.deleteByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ACL_Roles record) {
		// 修改角色
		return arm.updateByPrimaryKeySelective(record);
	}

	@Override
	public ACL_Roles selectByPrimaryKeyService(Integer id) {
		// 通过主键查询实体类
		return arm.selectByPrimaryKey(id);
	}

	@Override
	public List<Map<String, Object>> queryDeptNoListByLoginPersonService(String holderno) {
		// 根据登录人的工号 查角色下的部门 holderno
		return arm.queryDeptNoListByLoginPerson(holderno);
	}

	@Override
	public List<Map<String,Object>> getHolderListByRoleIdService(Map m) {
		//  人员角色分配  选中角色 查该角色下的人
		return arm.getHolderListByRoleId(m);
	}

	@Override
	public int updateRoleIDBatchService(List<Map<String,Object>> list) {
		// 人员角色分配 点保存时 批量修改 当给多个用户同时添加角色时 批量修改roleid值
		return arm.updateRoleIDBatch(list);
	}

	@Override
	public int updateRoleIDBatchsService(List<Map<String,Object>> list) {
	    //人员角色分配 点保存时  批量修改 当给多个用户同时添加角色时 批量修改roleid值
		return arm.updateRoleIDBatchs(list);
	}

	@Override
	public List<DepartmentData> queryDeptListByLoginRoleService(List<String> deptnos) {
		// 根据登录人的角色 查角色下的部门  添加或修改仓库时 下拉选择部门
		List<DepartmentData> list=arm.queryDeptListByLoginRole(deptnos);
		return list;
	}

	@Override
	public List<Map<String, Object>> queryHolderByRoleIDService(Integer roleid) {
		// 删除角色时 查看该角色是否有人员暂用
		return arm.queryHolderByRoleID(roleid);
	}

	@Override
	public List<Map<String, Object>> getDeptTreeByMyRoleService(String holderno) {
		//根据登录人角色获取拥有的部门数列表
		List<Map<String,Object>> list=arm.getDeptTreeByMyRole(holderno);
		List<Map<String, Object>> treeList=new ArrayList<Map<String,Object>>();
		TreeToolUtils u=new TreeToolUtils();
		treeList=u.menuList(list, true);
		return treeList;
	}

	
}
