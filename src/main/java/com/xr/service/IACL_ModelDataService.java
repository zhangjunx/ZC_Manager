package com.xr.service;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.ACL_ModelData;
import com.xr.entity.PageInfo;


@Service
public interface IACL_ModelDataService {

	List<Map<String, Object>> queryModelListService(Map<String, Object> m);

	List<Map<String, Object>> queryModelListByPageService(Map<String, Object> m, PageInfo pageinfo);

	int insertSelectiveService(ACL_ModelData record);

	int updateByPrimaryKeySelectiveService(ACL_ModelData record);

	int deleteByPrimaryKeyService(Integer id);

	ACL_ModelData selectByPrimaryKeyService(Integer id);
	
	List<Map<String,Object>>  getPermByModelService(Map m);//根据菜单id查是否有子功能  删除模块前判断
	
	 
}
