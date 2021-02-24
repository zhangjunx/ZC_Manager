package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DictionaryData;
@Repository
public interface DictionaryDataMapper {
    int deleteByPrimaryKey(Integer datano);//删除字典

    int insert(DictionaryData record);

    int insertSelective(DictionaryData record);//插入字典

    DictionaryData selectByPrimaryKey(Integer datano);//根据主键查询字典

    int updateByPrimaryKeySelective(DictionaryData record);//更新字典

    int updateByPrimaryKey(DictionaryData record);
    
    List<DictionaryData> queryDictListByPage(DictionaryData record);//查询字典列表
   // List<DictionaryData> queryDictListByPage(PageInfo pf);//分页查询 字典列表
    
    int deleteDictionaryDataBatch(Integer[] ids);//批量删除

	Map<String, Object> getScreenFullTitle(Map<String, Object> map);

	int updateScreenFullTitle(Map<String, Object> map);
    
   
    
}