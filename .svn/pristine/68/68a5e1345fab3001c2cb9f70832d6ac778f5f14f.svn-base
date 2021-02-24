package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DoorArrModule;
@Repository
public interface DoorArrModuleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DoorArrModule record);

    int insertSelective(DoorArrModule record);

    DoorArrModule selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DoorArrModule record);

    int updateByPrimaryKey(DoorArrModule record);
    
    
    List<Map<String,Object>> getDoorArrList(Map m);//查询门区模块列表

	List<Map<String, Object>> getHDoorArrList(Map m);//查询员工门区模块列表

	List<Map<String, Object>> getVDoorArrList(Map m);//查询访客门区模块列表
	
	int deleteBatch(List<Integer> list);//批量删除
}