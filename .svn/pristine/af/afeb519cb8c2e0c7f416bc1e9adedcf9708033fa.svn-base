package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.ZX_ItemType;

@Service
public interface IZX_ItemTypeService {
	
	int deleteByPrimaryKeyService(Integer id);

    int insertSelectiveService(ZX_ItemType record);
    
    ZX_ItemType selectByPrimaryKeyService(Integer id);

    int updateByPrimaryKeySelectiveService(ZX_ItemType record);
    
    List<Map<String,Object>> getItemTypeListService(Map m);//查询列表

	List<Map<String, Object>> getItemTypeListService(Map m, PageInfo pageinfo);


}
