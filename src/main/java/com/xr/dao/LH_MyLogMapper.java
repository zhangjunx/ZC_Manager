package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.LH_MyLog;
@Repository
public interface LH_MyLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LH_MyLog record);

    int insertSelective(LH_MyLog record);

    LH_MyLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(LH_MyLog record);

    int updateByPrimaryKeyWithBLOBs(LH_MyLog record);

    int updateByPrimaryKey(LH_MyLog record);
    
    List<Map<String,Object>>  getLogList(Map m);//查询日志列表
}