package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ACL_ModelData;
@Repository
public interface ACL_ModelDataMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ACL_ModelData record);

    int insertSelective(ACL_ModelData record);

    ACL_ModelData selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ACL_ModelData record);

    int updateByPrimaryKey(ACL_ModelData record);

	List<Map<String, Object>> queryModelList(Map<String, Object> m);
	
	List<Map<String,Object>>  getPermByModel(Map m);//根据菜单id查是否有子功能  删除模块前判断
    
}