package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ZX_HolderTransferMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.ZX_HolderTransfer;
import com.xr.service.IZX_HolderTransferService;
@Service
public class ZX_HolderTransferServiceImpl implements IZX_HolderTransferService {

	@Autowired
	private ZX_HolderTransferMapper htm;

	@Override
	public ZX_HolderTransfer selectByPrimaryKeyService(Integer id) {
		// 查询
		return htm.selectByPrimaryKey(id);
	}

	@Override
	public int insertSelectiveService(ZX_HolderTransfer record) {
		// 新增
		return htm.insertSelective(record);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return htm.deleteByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ZX_HolderTransfer record) {
		// 修改
		return htm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getHolderTransferListService(Map<String, Object> m) {
		// 查询列表
		return htm.getHolderTransferList(m);
	}

	@Override
	public List<Map<String, Object>> getHolderTransferListService(Map<String, Object> m, PageInfo pageinfo) {
		// 分页查询
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=htm.getHolderTransferList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalpage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalpage);
		pageinfo.setSumCount((int) total);
		return list;
	}
}
