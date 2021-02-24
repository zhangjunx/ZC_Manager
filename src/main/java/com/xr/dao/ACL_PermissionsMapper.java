package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ACL_Permissions;
@Repository
public interface ACL_PermissionsMapper {
    int deleteByPrimaryKey(Integer id);
    int insertSelective(ACL_Permissions record);
    ACL_Permissions selectByPrimaryKey(Integer id);
    int updateByPrimaryKeySelective(ACL_Permissions record);

	List<Map<String, Object>> queryPermList(Map<String, Object> m);
	int deleteBatch(List<Integer> list);//批量删除
	
	
}