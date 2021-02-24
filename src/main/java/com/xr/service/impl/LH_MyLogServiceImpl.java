package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.LH_MyLogMapper;
import com.xr.entity.LH_MyLog;
import com.xr.entity.PageInfo;
import com.xr.service.ILH_MyLogService;
@Service
public class LH_MyLogServiceImpl implements ILH_MyLogService {
	@Autowired
	private LH_MyLogMapper ml;

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return ml.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelectiveService(LH_MyLog record) {
		// 添加
		return ml.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(LH_MyLog record) {
		// 修改
		return ml.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getLogListService(Map m,PageInfo pageinfo) {
		// 查询签到列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=ml.getLogList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}

}
