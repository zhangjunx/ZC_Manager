package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ZX_ItemProject;
@Repository
public interface ZX_ItemProjectMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ZX_ItemProject record);

    int insertSelective(ZX_ItemProject record);

    ZX_ItemProject selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ZX_ItemProject record);

    int updateByPrimaryKey(ZX_ItemProject record);

	List<Map<String, Object>> getItemProjectList(Map m);
}