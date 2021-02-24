package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.LH_MySign;
@Repository
public interface LH_MySignMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LH_MySign record);

    int insertSelective(LH_MySign record);

    LH_MySign selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(LH_MySign record);

    int updateByPrimaryKeyWithBLOBs(LH_MySign record);

    int updateByPrimaryKey(LH_MySign record);
    
    List<Map<String,Object>>  getSignList(Map m);//查询签到列表
}