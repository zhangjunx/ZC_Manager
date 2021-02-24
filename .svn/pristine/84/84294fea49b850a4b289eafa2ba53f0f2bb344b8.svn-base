package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.DictionaryData;
import com.xr.entity.PageInfo;

@Service
public interface IDictionaryDataService {
	
	int deleteByPrimaryKeyService(Integer datano);//删除字典

    int insertSelectiveService(DictionaryData record);//插入字典

    DictionaryData selectByPrimaryKeyService(Integer datano);//根据主键查询字典

    int updateByPrimaryKeySelectiveService(DictionaryData record);//更新字典
    
    List<DictionaryData> queryDictListService(DictionaryData record);//查询字典列表
    List<DictionaryData> queryDictListByPageService(DictionaryData record,PageInfo pageinfo);//分页查询字典列表
    int deleteDictionaryDataBatchService(Integer[] ids);//批量删除

	Map<String, Object> getScreenFullTitle(Map<String, Object> map);

	Map<String, Object> updateScreenFullTitle(Map<String, Object> map);
   
    
}
