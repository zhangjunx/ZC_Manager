package com.xr.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xr.entity.VisitorsCardAppSet;
@Repository
public interface VisitorsCardAppSetMapper {
    int deleteByPrimaryKey(Integer datakey);

    int insert(VisitorsCardAppSet record);

    int insertSelective(VisitorsCardAppSet record);

    VisitorsCardAppSet selectByPrimaryKey(Integer datakey);

    int updateByPrimaryKeySelective(VisitorsCardAppSet record);

    int updateByPrimaryKey(VisitorsCardAppSet record);
    int insertVisitorsCardAppSetBatch(List<VisitorsCardAppSet> list);
    
    VisitorsCardAppSet queryVisitorsCardAppSetByCardID(String cardid);//通过cardID和appsetkey查访客是否已被授权
}