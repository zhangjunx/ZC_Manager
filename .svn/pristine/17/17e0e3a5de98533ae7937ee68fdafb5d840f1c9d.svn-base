package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.LH_MyLog;
import com.xr.entity.PageInfo;

@Service
public interface ILH_MyLogService {

	int deleteByPrimaryKeyService(Integer id);

	int updateByPrimaryKeySelectiveService(LH_MyLog record);

	int insertSelectiveService(LH_MyLog record);

	List<Map<String, Object>> getLogListService(Map<String, Object> m, PageInfo pageinfo);

}
