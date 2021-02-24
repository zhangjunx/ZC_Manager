package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ZX_HolderFile;
@Repository
public interface ZX_HolderFileMapper {
    int deleteByPrimaryKey(String holderno);

    int insert(ZX_HolderFile record);

    int insertSelective(ZX_HolderFile record);

    ZX_HolderFile selectByPrimaryKey(String holderno);

    int updateByPrimaryKeySelective(ZX_HolderFile record);

    int updateByPrimaryKey(ZX_HolderFile record);

	List<Map<String, Object>> getHolderFileList(Map<String, Object> m);
}