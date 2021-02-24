package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.LH_MySignMapper;
import com.xr.entity.LH_MySign;
import com.xr.entity.PageInfo;
import com.xr.service.ILH_MySignService;
@Service
public class LH_MySignServiceImpl implements ILH_MySignService {
	@Autowired
	private LH_MySignMapper ms;

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return ms.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelectiveService(LH_MySign record) {
		// 添加
		return ms.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(LH_MySign record) {
		// 修改
		return ms.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getSignListService(Map m,PageInfo pageinfo) {
		// 查询签到列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=ms.getSignList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}

}
