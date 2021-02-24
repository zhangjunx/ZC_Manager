package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.LH_MySign;
import com.xr.entity.PageInfo;

@Service
public interface ILH_MySignService {
	int deleteByPrimaryKeyService(Integer id);

    int insertSelectiveService(LH_MySign record);

    int updateByPrimaryKeySelectiveService(LH_MySign record);
    
    List<Map<String,Object>>  getSignListService(Map m, PageInfo pageinfo);//查询签到列表

}
