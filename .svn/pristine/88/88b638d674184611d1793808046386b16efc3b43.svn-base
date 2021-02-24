package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DoorPermHolder;
@Repository
public interface DoorPermHolderMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DoorPermHolder record);

    int insertSelective(DoorPermHolder record);

    DoorPermHolder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DoorPermHolder record);

    int updateByPrimaryKey(DoorPermHolder record);
    
    List<Map<String,Object>> getAreaDeviceDoorTree();//获取区域设备门区树

	List<Map<String, Object>> queryHolderByDoor(Map m);//通过门区查人
	
	int insertBatch(List<Map<String,Object>> list);//批量新增
	int updateBatch(List<Map<String,Object>> list);//批量修改
	int deleteBatch(List<Object> list);//批量删除
	
	String getName(Map m);//根据工号查人员姓名
	
	Map<String, Object> queryExist(Map m);//根据工号  门区号 （ 如果有卡的话）卡号查该员工是否已分配权限
	List<Map<String, Object>> queryExistDoor(Map m);//根据工号和卡号 （如果有卡的话）  查询员工的已有门区权限
	
	List<Map<String, Object>> queryDoorListByHolder(Map m);//根据登录人工号查所拥有的门区权限
	List<Map<String, Object>> getDoorTreeByHolder(Map m);//根据登录人工号查所拥有的门区权限 按树形分类
	List<Map<String, Object>> getDoorByWechat(Map m);//根据登录人角色查所拥有的门区
	List<Map<String, Object>> getDoorAreaByWechat(Map m);//根据登录人角色查所拥有的门区区域
	
	
	List<Map<String, Object>> queryCardByHolder(Map m);//根据工号 查人作用于该门区的卡
	
	List<Map<String, Object>> getByHolderDoor(Map m);//根据工号和门区 查记录id  门禁查看时 双击 移除人员 
}