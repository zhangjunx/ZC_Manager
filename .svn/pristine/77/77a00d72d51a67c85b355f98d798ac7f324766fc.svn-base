package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.DoorPermHolderMapper;
import com.xr.service.IDoorPermHolderService;
import com.xr.util.TreeToolUtils;
@Service
public class DoorPermHolderServiceImpl implements IDoorPermHolderService {
	@Autowired
	private DoorPermHolderMapper dpm;

	@Override
	public List<Map<String, Object>> getAreaDeviceDoorTreeService() {
		// 获取区域设备门区树
		List<Map<String,Object>> list=dpm.getAreaDeviceDoorTree();
		List<Map<String,Object>> treelist=new ArrayList<Map<String,Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treelist=tree.menuList(list, true);
		return treelist;
	}
	
	@Override
	public List<Map<String, Object>> getDoorTreeByHolderService(Map m) {
		// 根据登录人工号查所拥有的门区权限 按树形分类
		List<Map<String,Object>> list=dpm.getDoorTreeByHolder(m);
		List<Map<String,Object>> treelist=new ArrayList<Map<String,Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treelist=tree.menuList(list, true);
		return treelist;
	}

	@Override
	public List<Map<String, Object>> queryHolderByDoorService(Map m) {
		// 通过门区查人
		return dpm.queryHolderByDoor(m);
	}

	@Override
	public int insertBatchService(List<Map<String, Object>> list) {
		// 批量新增
		return dpm.insertBatch(list);
	}

	@Override
	public int updateBatchService(List<Map<String, Object>> list) {
		// 批量修改
		return dpm.updateBatch(list);
	}
	
	@Override
	public int deleteBatchService(List<Object> list) {
		// 批量删除
		return dpm.deleteBatch(list);
	}
	
	@Override
	public Map<String, Object> queryExistService(Map m) {
		// 根据工号  门区号 （ 如果有卡的话）卡号查该员工是否已分配权限
		return dpm.queryExist(m);
	}

	@Override
	public List<Map<String, Object>> queryExistDoorService(Map m) {
		// 根据工号和卡号 （如果有卡的话）  查询员工的已有门区权限
		return dpm.queryExistDoor(m);
	}

	

	@Override
	public List<Map<String, Object>> queryDoorListByHolderService(Map m) {
		// 根据登录人工号查所拥有的门区权限
		return dpm.queryDoorListByHolder(m);
	}

	@Override
	public List<Map<String, Object>> queryCardByHolderService(Map m) {
		// 根据工号 查人作用于该门区的卡
		return dpm.queryCardByHolder(m);
	}

	@Override
	public List<Map<String, Object>> getDoorByWechatService(Map m) {
		//根据登录人角色查所拥有的门区
		 
		return dpm.getDoorByWechat(m);
	}

	@Override
	public List<Map<String, Object>> getDoorAreaByWechatService(Map m) {
		// 根据登录人角色查所拥有的门区区域
		
		return dpm.getDoorAreaByWechat(m);
	}

	@Override
	public List<Map<String, Object>> getByHolderDoorService(Map m) {
		// 根据工号和门区 查记录id  门禁查看时 双击 移除人员 
		return dpm.getByHolderDoor(m);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 单个删除
		return dpm.deleteByPrimaryKey(id);
	}

	@Override
	public String getNameService(Map m) {
		// 根据工号查人员姓名
		return dpm.getName(m);
	}


	

}
