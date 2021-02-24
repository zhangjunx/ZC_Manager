package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.DoorArrModuleMapper;
import com.xr.entity.DoorArrModule;
import com.xr.entity.PageInfo;
import com.xr.service.IDoorArrModuleService;
@Service
public class DoorArrServiceImpl implements IDoorArrModuleService {
	@Autowired
	private DoorArrModuleMapper dam;

	@Override
	public List<Map<String, Object>> getDoorArrListService(Map m) {
		// 查询门区模块列表
		return dam.getDoorArrList(m);
	}

	@Override
	public int insertSelectiveService(DoorArrModule record) {
		// 添加
		return dam.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(DoorArrModule record) {
		// 修改
		return dam.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getHDoorArrListService(Map m) {
		// 查询员工门区模块列表
		
		return dam.getHDoorArrList(m);
	}

	@Override
	public List<Map<String, Object>> getVDoorArrListService(Map m) {
		// 查询访客门区模块列表
		return dam.getVDoorArrList(m);
	}

	@Override
	public List<Map<String, Object>> getDoorArrListByPageService(Map m,PageInfo pageinfo) {
		// 查询通行门区模板
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=dam.getDoorArrList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}

	@Override
	public int deleteBatchService(List<Integer> list) {
		// 批量删除
		return dam.deleteBatch(list);
	}

}
