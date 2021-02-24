package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ACL_Menu_Perm;
@Repository
public interface ACL_Menu_PermMapper {
    int deleteByPrimaryKey(String id);

    int insert(ACL_Menu_Perm record);

    int insertSelective(ACL_Menu_Perm record);

    ACL_Menu_Perm selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(ACL_Menu_Perm record);

    int updateByPrimaryKey(ACL_Menu_Perm record);
    
    List<Map<String,Object>> getMenuPermTree();//菜单功能一体树形接口
}