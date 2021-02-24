package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ACL_PermissionsMapper;
import com.xr.entity.ACL_Permissions;
import com.xr.entity.PageInfo;
import com.xr.service.IACL_PermissionsService;
@Service
public class ACL_PermissionsServiceImpl implements IACL_PermissionsService {

	@Autowired
	private ACL_PermissionsMapper apm;
	
	
	@Override
	public List<Map<String, Object>> queryPermListService(Map<String, Object> m) {
		// 查询列表
		return apm.queryPermList(m);
	}
	@Override
	public List<Map<String, Object>> queryPermListByPageService(Map<String, Object> m, PageInfo pageinfo) {
		//分页查询
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=apm.queryPermList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}
	@Override
	public int insertSelectiveService(ACL_Permissions record) {
		// 新增
		return apm.insertSelective(record);
	}
	@Override
	public int updateByPrimaryKeySelectiveService(ACL_Permissions record) {
		// 修改
		return apm.updateByPrimaryKeySelective(record);
	}
	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return apm.deleteByPrimaryKey(id);
	}
	@Override
	public ACL_Permissions selectByPrimaryKeyService(Integer id) {
		// 查询
		return apm.selectByPrimaryKey(id);
	}
	@Override
	public int deleteBatchService(List<Integer> list) {
		// 批量删除
		return apm.deleteBatch(list);
	}


	
	
}
