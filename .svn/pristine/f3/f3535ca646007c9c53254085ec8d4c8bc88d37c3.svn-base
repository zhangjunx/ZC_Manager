package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.CAP_TimeZoneDoorHolder;
import com.xr.entity.DoorUnit;


@Service
public interface ICAP_TimeZoneDoorHolderService {
	 int insertCAPTimeZoneDoorHolderBatchService(List<CAP_TimeZoneDoorHolder> list);//门禁权限设置时 给人元分配权限List<CAP_TimeZoneDoorHolder> List<Map<String,Object>>
	 List<Map<String,Object>> queryDoorPermSeeListService(Map m);//门禁权限查看列表
	 List<CAP_TimeZoneDoorHolder> queryDoorHolderByHolderService(String holderno);//权限设置时 提交保存先查看是否已有权限
	 CAP_TimeZoneDoorHolder queryDoorHolderByHolderAndControlService(CAP_TimeZoneDoorHolder record);//通过工号查此人门区权限
	 int updateDoorHolderBatchService(List<CAP_TimeZoneDoorHolder> list);//批量修改
	 int deleteDoorHolderBatchService(List<Integer> list);//批量删除
	 List<Map<String,Object>> queryHolderListByDoorBatchService(Map m);//门禁查看时 点权限设置时出现List<String> holdernos
	 List<CAP_TimeZoneDoorHolder> queryDoorHolderByControlService(int deviceno);//门禁查看 权限设置时 根据传的装置ID查人员
	 List<CAP_TimeZoneDoorHolder> queryDoorHolderByControlAndDoorService(CAP_TimeZoneDoorHolder record);//门禁查看 权限设置时 根据传的装置ID和门区查人员
	 
	 List<DoorUnit>  queryDoorListByHolderService(List<Short> doornolist);//根据登录人查其所管理的门区
	 
	 List<Map<String,Object>> getHolderByDeptService(Map m);// 根据部门号查人员
	 
	 String queryDeptByHolderService(String holderno);//通过工号查部门    门区权限查看时   权限设置时 用到
}
