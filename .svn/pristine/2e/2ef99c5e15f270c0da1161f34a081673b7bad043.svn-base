package com.xr.dao;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ACL_MenuData;

@Repository
public interface ACL_MenuDataMapper {
	
    int deleteByPrimaryKey(Integer id);

    int insert(ACL_MenuData record);

    int insertSelective(ACL_MenuData record);

    ACL_MenuData selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ACL_MenuData record);

    int updateByPrimaryKey(ACL_MenuData record);
    
    List<Map<String,Object>> queryMenuList(Map m);//查询菜单列表
    
    List<Map<String,Object>> getMenuTree();//菜单树
    List<Map<String,Object>> getMenuPermTree();//菜单功能树
    
    List<Map<String,Object>>  getModelByMenu(Map m);//根据菜单id查是否有子模块   删除菜单前判断
    
    
	Map<String, Object> getMenu(Map m);//查询菜单 通过主键
    Map<String, Object> getModel(Map m);//查询模块 通过主键
	Map<String, Object> getPerm(Map m);//查询功能 通过主键
}