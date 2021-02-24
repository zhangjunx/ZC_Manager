package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.LH_FaceRecogParam;
import com.xr.entity.PageInfo;

@Service
public interface ILH_FaceRecogParamService {
	
	 int insertSelectiveService(LH_FaceRecogParam record);

	 int updateByPrimaryKeySelectiveService(LH_FaceRecogParam record);
	 
	 List<Map<String,Object>> getFaceParamListService(PageInfo pageinfo,Map m);//查询列表
	 List<Map<String,Object>> getFaceParamListService(Map m);//查询列表

	 int deleteByPrimaryKeyService(Integer id);


}
