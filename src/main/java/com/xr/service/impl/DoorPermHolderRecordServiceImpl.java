package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.DoorPermHolderRecordMapper;
import com.xr.entity.DoorPermHolderRecord;
import com.xr.entity.PageInfo;
import com.xr.service.IDoorPermHolderRecordService;

@Service
public class DoorPermHolderRecordServiceImpl implements IDoorPermHolderRecordService {
	
	@Autowired
	private DoorPermHolderRecordMapper drm;

	@Override
	public int insertRecordBatchService(List<Map<String, Object>> list) {
		// 批量新增
		return drm.insertRecordBatch(list);
	}

	@Override
	public int deleteRecordBatchService(List<Integer> list) {
		// 批量删除
		return drm.deleteRecordBatch(list);
	}

	@Override
	public List<Map<String, Object>> queryPermRecordListService(Map m,PageInfo pageinfo) {
		// 查询列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=drm.queryPermRecordList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public int insertSelectiveService(DoorPermHolderRecord record) {
		// 新增
		return drm.insertSelective(record);
	}

	/**
	 * 查询当天未下发的添加,删除的权限数据
	 * 与SenseLink平台中的员工组进行对接.
	 */
	@Override
	public List<Map<String, Object>> getPermRecord() {
		return drm.getPermRecord();
	}//end

	/**
	 * 批量修改
	 * 通过DoorPermHolderRecord表的ID主键来进行修改
	 */
	@Override
	public void updatePremRecordStatus(List<String> list) {
		drm.updatePremRecordStatus(list);
	}

	@Override
	public DoorPermHolderRecord selectByPrimaryKeyService(Integer id) {
		// 查询信息
		return drm.selectByPrimaryKey(id);
	}
	
	

}
