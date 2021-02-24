package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DepartureRecord;
@Repository
public interface DepartureRecordMapper {
    
    int insertSelective(DepartureRecord record);//添加数据

    DepartureRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DepartureRecord record);
    
    DepartureRecord queryDepartureRecordByHolderNo(String holderno);//根据工号查离职记录信息

	List<Map<String, Object>> queryDepartureRecordList(Map<String, Object> m);

}