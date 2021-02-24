package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.ACL_MenuData;
import com.xr.entity.PageInfo;

@Service
public interface IACL_MenuDataService {
	
	List<Map<String,Object>> queryMenuListService(Map m);//查询菜单列表

	List<Map<String, Object>> queryMenuListByPageService(Map m, PageInfo pageinfo);
	
	int insertSelectiveService(ACL_MenuData record);

    ACL_MenuData selectByPrimaryKeyService(Integer id);

    int updateByPrimaryKeySelectiveService(ACL_MenuData record);
    
    int deleteByPrimaryKeyService(Integer id);//删除
    
    List<Map<String,Object>> getMenuTreeService(boolean res);//菜单树
    List<Map<String,Object>> getMenuPermTreeService(boolean res);//菜单功能树
    
    List<Map<String,Object>>  getModelByMenuService(Map m);//根据菜单id查是否有子模块   删除菜单前判断
    
	Map<String, Object> getMenuService(Map<String, Object> m);//查询菜单 通过主键
	Map<String, Object> getModelService(Map m);//查询模块 通过主键
	Map<String, Object> getPermService(Map m);//查询功能 通过主键

}
