package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.CAP_TimeZoneDoorHolderMapper;
import com.xr.entity.CAP_TimeZoneDoorHolder;
import com.xr.entity.DoorUnit;
import com.xr.service.ICAP_TimeZoneDoorHolderService;
@Service
public class CAP_TimeZoneDoorHolderServiceImpl implements ICAP_TimeZoneDoorHolderService {
	@Autowired
	private CAP_TimeZoneDoorHolderMapper dhm;

	@Override
	public int insertCAPTimeZoneDoorHolderBatchService(List<CAP_TimeZoneDoorHolder> list) {
		// 门禁权限设置时 给人元分配权限
		return dhm.insertCAPTimeZoneDoorHolderBatch(list);
	}

	@Override
	public List<Map<String, Object>> queryDoorPermSeeListService(Map m) {
		//  门禁权限查看列表
		return dhm.queryDoorPermSeeList(m);
	}

	@Override
	public List<CAP_TimeZoneDoorHolder> queryDoorHolderByHolderService(String holderno) {
		// 权限设置时 提交保存先查看是否已有权限
		return dhm.queryDoorHolderByHolder(holderno);
	}
	
	@Override
	public CAP_TimeZoneDoorHolder queryDoorHolderByHolderAndControlService(CAP_TimeZoneDoorHolder record) {
		// 通过工号查此人门区权限
		return dhm.queryDoorHolderByHolderAndControl(record);
	}

	@Override
	public int updateDoorHolderBatchService(List<CAP_TimeZoneDoorHolder> list) {
		//  批量修改
		return dhm.updateDoorHolderBatch(list);
	}

	@Override
	public int deleteDoorHolderBatchService(List<Integer> list) {
		//批量删除
		return dhm.deleteDoorHolderBatch(list);
	}

	@Override
	public List<Map<String, Object>> queryHolderListByDoorBatchService(Map m) {
		// 门禁查看时 点权限设置时出现List<String> holdernos
		return dhm.queryHolderListByDoorBatch(m);
	}

	@Override
	public List<CAP_TimeZoneDoorHolder> queryDoorHolderByControlService(int controlid) {
		//  门禁查看 权限设置时 根据传的装置ID查人员
		return dhm.queryDoorHolderByControl(controlid);
	}

	@Override
	public List<CAP_TimeZoneDoorHolder> queryDoorHolderByControlAndDoorService(CAP_TimeZoneDoorHolder record) {
		// 门禁查看 权限设置时 根据传的装置ID和门区查人员
		return dhm.queryDoorHolderByControlAndDoor(record);
	}

	@Override
	public List<DoorUnit> queryDoorListByHolderService(List<Short> doornolist) {
		// 根据登录人查其所管理的门区
		return dhm.queryDoorListByHolder(doornolist);
	}

	@Override
	public List<Map<String, Object>> getHolderByDeptService(Map m) {
		// 根据部门号查人员
		return dhm.getHolderByDept(m);
	}

	@Override
	public String queryDeptByHolderService(String holderno) {
		// 通过工号查部门    门区权限查看时   权限设置时 用到
		return dhm.queryDeptByHolder(holderno);
	}

	

}
