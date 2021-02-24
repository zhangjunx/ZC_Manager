package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ZX_ItemProjectMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.ZX_ItemProject;
import com.xr.service.IZX_ItemProjectService;
@Service
public class ZX_ItemProjectServiceImpl implements IZX_ItemProjectService {

	@Autowired
	private ZX_ItemProjectMapper ipm;

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return ipm.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelectiveService(ZX_ItemProject record) {
		// 添加
		return ipm.insertSelective(record);
	}

	@Override
	public ZX_ItemProject selectByPrimaryKeyService(Integer id) {
		//查询
		return ipm.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ZX_ItemProject record) {
		// 更新
		return ipm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getItemProjectListService(Map m) {
		// 查询列表
		return ipm.getItemProjectList(m);
	}

	@Override
	public List<Map<String, Object>> getItemProjectListService(Map m, PageInfo pageinfo) {
		// 分页查询
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=ipm.getItemProjectList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalpage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalpage);
		pageinfo.setSumCount((int) total);
		return list;
	}
	
	
	
	
}
