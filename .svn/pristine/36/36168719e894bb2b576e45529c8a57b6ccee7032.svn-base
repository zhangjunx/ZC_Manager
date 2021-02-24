package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ZX_ItemTypeMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.ZX_ItemType;
import com.xr.service.IZX_ItemTypeService;
@Service
public class ZX_ItemTypeServiceImpl implements IZX_ItemTypeService {

	@Autowired
	private ZX_ItemTypeMapper itm;
	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return itm.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelectiveService(ZX_ItemType record) {
		// 添加
		return itm.insertSelective(record);
	}

	@Override
	public ZX_ItemType selectByPrimaryKeyService(Integer id) {
		// 查询
		return itm.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ZX_ItemType record) {
		// 更新
		return itm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getItemTypeListService(Map m) {
		// 查询列表
		return itm.getItemTypeList(m);
	}

	@Override
	public List<Map<String, Object>> getItemTypeListService(Map m, PageInfo pageinfo) {
		// 分页查询
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=itm.getItemTypeList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalpage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalpage);
		return list;
	}

	
	

}
