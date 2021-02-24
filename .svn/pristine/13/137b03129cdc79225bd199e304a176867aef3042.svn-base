package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;


@Service
public interface IDoorPermHolderService {
	
	 int deleteByPrimaryKeyService(Integer id);
	
	List<Map<String,Object>> getAreaDeviceDoorTreeService();//获取区域设备门区树

	List<Map<String, Object>> queryHolderByDoorService(Map m);//通过门区查人

	int insertBatchService(List<Map<String,Object>> list);//批量新增
	int updateBatchService(List<Map<String,Object>> list);//批量新增
	int deleteBatchService(List<Object> list);//批量删除
	
	String getNameService(Map m);//根据工号查人员姓名
	
	Map<String, Object> queryExistService(Map m);//根据工号  门区号 （ 如果有卡的话）卡号查该员工是否已分配权限
	
	List<Map<String, Object>> queryExistDoorService(Map m);//根据工号和卡号 （如果有卡的话）  查询员工的已有门区权限
	List<Map<String, Object>> queryDoorListByHolderService(Map m);//根据登录人工号查所拥有的门区权限
	List<Map<String, Object>> getDoorTreeByHolderService(Map m);//根据登录人工号查所拥有的门区权限 按树形分类
	
	List<Map<String, Object>> getDoorByWechatService(Map m);//根据登录人角色查所拥有的门区
	List<Map<String, Object>> getDoorAreaByWechatService(Map m);//根据登录人角色查所拥有的门区区域
	
	
	List<Map<String, Object>> queryCardByHolderService(Map m);//根据工号 查人作用于该门区的卡
	
	List<Map<String, Object>> getByHolderDoorService(Map m);//根据工号和门区 查记录id  门禁查看时 双击 移除人员 
	
}
