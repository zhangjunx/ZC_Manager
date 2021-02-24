package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.DoorPermHolderRecord;
import com.xr.entity.PageInfo;

@Service
public interface IDoorPermHolderRecordService {
	int insertSelectiveService(DoorPermHolderRecord record);//
	
	DoorPermHolderRecord selectByPrimaryKeyService(Integer id);
	
	 int insertRecordBatchService(List<Map<String,Object>> list);//批量添加
	 int deleteRecordBatchService(List<Integer> arrlist);//批量删除
	 
	 List<Map<String,Object>> queryPermRecordListService(Map m,PageInfo pageinfo);
	 
	   /**
		 * 查询当天未下发的添加,删除的权限数据
		 * 与SenseLink平台中的员工组进行对接.
		 */
	 List<Map<String, Object>> getPermRecord();
		/**
		 * 批量修改
		 * 通过DoorPermHolderRecord表的ID主键来进行修改
		 */
	 void updatePremRecordStatus(List<String> list);
}
