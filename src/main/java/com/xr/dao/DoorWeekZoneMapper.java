package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DoorWeekZone;
@Repository
public interface DoorWeekZoneMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DoorWeekZone record);

    int insertSelective(DoorWeekZone record);

    DoorWeekZone selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DoorWeekZone record);

    int updateByPrimaryKey(DoorWeekZone record);
    
    List<Map<String,Object>> queryWeekZoneList(Map m);//查询周期时段表
}