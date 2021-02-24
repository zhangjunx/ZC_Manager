package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ZX_ItemType;
@Repository
public interface ZX_ItemTypeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ZX_ItemType record);

    int insertSelective(ZX_ItemType record);

    ZX_ItemType selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ZX_ItemType record);

    int updateByPrimaryKey(ZX_ItemType record);

	List<Map<String, Object>> getItemTypeList(Map m);
}