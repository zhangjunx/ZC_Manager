package com.xr.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xr.entity.SY210AppSet;
@Repository
public interface SY210AppSetMapper {
    int deleteByPrimaryKey(Integer appsetkey);

    int insert(SY210AppSet record);

    int insertSelective(SY210AppSet record);

    SY210AppSet selectByPrimaryKey(Integer appsetkey);

    int updateByPrimaryKeySelective(SY210AppSet record);

    int updateByPrimaryKey(SY210AppSet record);
    
    List<SY210AppSet> querySY210AppSetByDeviceNoAndEntryReader(SY210AppSet record);//门区权限设置时  给人员赋予权限 通过选中的门区查询AppSetNo
    List<SY210AppSet> querySY210AppSetNoList();//门区权限查看时  查询门区不为空的AppsetNo列表
}