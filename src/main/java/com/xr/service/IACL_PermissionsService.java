package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.ACL_Permissions;
import com.xr.entity.PageInfo;

@Service
public interface IACL_PermissionsService {
     
	List<Map<String, Object>> queryPermListService(Map<String, Object> m);
	List<Map<String, Object>> queryPermListByPageService(Map<String, Object> m, PageInfo pageinfo);
	int insertSelectiveService(ACL_Permissions record);
	int updateByPrimaryKeySelectiveService(ACL_Permissions record);
	int deleteByPrimaryKeyService(Integer id);
	ACL_Permissions selectByPrimaryKeyService(Integer id);
	int deleteBatchService(List<Integer> list);//批量删除
}
