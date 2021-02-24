package com.xr.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.VisitorsPhoto;
@Repository
public interface VisitorsPhotoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VisitorsPhoto record);

    int insertSelective(VisitorsPhoto record);

    VisitorsPhoto selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VisitorsPhoto record);

    int updateByPrimaryKeyWithBLOBs(VisitorsPhoto record);

    int updateByPrimaryKey(VisitorsPhoto record);
    
    VisitorsPhoto queryPhoto(Integer visitorsid);//通过外来信息主键查外来人照片
    
    Map<String,Object> getPhoto(Map m);//根据登记的记录id visitorsid查照片
}