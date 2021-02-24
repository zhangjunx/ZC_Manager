package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ACL_MenuDataMapper;
import com.xr.entity.ACL_MenuData;
import com.xr.entity.PageInfo;
import com.xr.service.IACL_MenuDataService;
import com.xr.util.TreeToolUtils;
@Service
public class ACL_MenuDataServiceImpl implements IACL_MenuDataService {

	@Autowired
	private ACL_MenuDataMapper mdm;

	@Override
	public List<Map<String,Object>> queryMenuListService(Map m) {
		// 查询菜单列表Map m
		List<Map<String,Object>> list=mdm.queryMenuList(m);
		return list;
	}

	@Override
	public List<Map<String, Object>> queryMenuListByPageService(Map m, PageInfo pageinfo) {
		// 查询菜单列表Map m
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=mdm.queryMenuList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalpage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalpage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public int insertSelectiveService(ACL_MenuData record) {
		// 新增
		return mdm.insertSelective(record);
	}

	@Override
	public ACL_MenuData selectByPrimaryKeyService(Integer id) {
		// 查询
		return mdm.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ACL_MenuData record) {
		// 修改
		return mdm.updateByPrimaryKeySelective(record);
	}
	

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return mdm.deleteByPrimaryKey(id);
	}
	

	@Override
	public List<Map<String, Object>> getMenuTreeService(boolean res) {
		// 菜单树
		List<Map<String,Object>> list=mdm.getMenuTree();
		List<Map<String,Object>> treelist=new ArrayList<Map<String,Object>>();
		TreeToolUtils u=new TreeToolUtils();
		treelist=u.menuList(list, res);
		return treelist;
	}
	
	@Override
	public List<Map<String, Object>> getMenuPermTreeService(boolean res) {
		// 菜单功能树
		List<Map<String,Object>> list=mdm.getMenuPermTree();
		List<Map<String,Object>> treelist=new ArrayList<Map<String,Object>>();
		TreeToolUtils u=new TreeToolUtils();
		treelist=u.menuList(list, res);
		return treelist;
	}

	@Override
	public List<Map<String, Object>> getModelByMenuService(Map m) {
		// 根据菜单id查是否有子模块   删除菜单前判断
		return mdm.getModelByMenu(m);
	}

	@Override
	public Map<String, Object> getMenuService(Map<String, Object> m) {
		// 查询菜单 通过主键
		return mdm.getMenu(m);
	}

	@Override
	public Map<String, Object> getModelService(Map m) {
		// 查询模块 通过主键
		return mdm.getModel(m);
	}

	@Override
	public Map<String, Object> getPermService(Map m) {
		// 查询功能 通过主键
		return mdm.getPerm(m);
	}

	
	
	
}
