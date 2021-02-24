package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ZX_HolderFileMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.ZX_HolderFile;
import com.xr.service.IZX_HolderFileService;
@Service
public class ZX_HolderFileServiceImpl implements IZX_HolderFileService {
	@Autowired
	private ZX_HolderFileMapper hfm;

	@Override
	public int updateByPrimaryKeySelectiveService(ZX_HolderFile record) {
		// 修改
		return hfm.updateByPrimaryKeySelective(record);
	}

	@Override
	public ZX_HolderFile selectByPrimaryKeyService(String holderno) {
		// 查询
		return hfm.selectByPrimaryKey(holderno);
	}

	@Override
	public int insertSelectiveService(ZX_HolderFile record) {
		// 新增
		return hfm.insertSelective(record);
	}

	@Override
	public int deleteByPrimaryKeyService(String holderno) {
		// 删除
		return hfm.deleteByPrimaryKey(holderno);
	}

	@Override
	public List<Map<String, Object>> getHolderFileListService(Map<String, Object> m, PageInfo pageinfo) {
		// 分页查询
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=hfm.getHolderFileList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalpage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalpage);
		pageinfo.setSumCount((int) total);
		return list;		
	}

	@Override
	public List<Map<String, Object>> getHolderFileListService(Map<String, Object> m) {
		// TODO Auto-generated method stub
		return null;
	}

}
