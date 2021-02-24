package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.CAP_TimeZoneDoorHolder;
import com.xr.entity.DoorUnit;
@Repository
public interface CAP_TimeZoneDoorHolderMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CAP_TimeZoneDoorHolder record);

    int insertSelective(CAP_TimeZoneDoorHolder record);

    CAP_TimeZoneDoorHolder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CAP_TimeZoneDoorHolder record);

    int updateByPrimaryKey(CAP_TimeZoneDoorHolder record);
    int insertCAPTimeZoneDoorHolderBatch(List<CAP_TimeZoneDoorHolder> list);//门禁权限设置时 给人元分配权限List<CAP_TimeZoneDoorHolder> List<Map<String,Object>>
    List<Map<String,Object>> queryDoorPermSeeList(Map m);//门禁权限查看列表
    List<CAP_TimeZoneDoorHolder> queryDoorHolderByHolder(String holderno);//权限设置时 提交保存先查看是否已有权限
    CAP_TimeZoneDoorHolder queryDoorHolderByHolderAndControl(CAP_TimeZoneDoorHolder record);//通过工号查此人门区权限
    int updateDoorHolderBatch(List<CAP_TimeZoneDoorHolder> list);//批量修改
    int deleteDoorHolderBatch(List<Integer> list);//批量删除
    
    List<Map<String,Object>> queryHolderListByDoorBatch(Map m);//门禁查看时 点权限设置时出现List<String> holdernos
    
    List<CAP_TimeZoneDoorHolder> queryDoorHolderByControl(int controlid);//门禁查看 权限设置时 根据传的装置ID查人员
    List<CAP_TimeZoneDoorHolder> queryDoorHolderByControlAndDoor(CAP_TimeZoneDoorHolder record);//门禁查看 权限设置时 根据传的装置ID和门区查人员
    
    List<DoorUnit>  queryDoorListByHolder(List<Short> doornolist);//根据登录人查其所管理的门区
    
    List<Map<String,Object>> getHolderByDept(Map m);// 根据部门号查人员
    
    String queryDeptByHolder(String holderno);//通过工号查部门    门区权限查看时   权限设置时 用到
}