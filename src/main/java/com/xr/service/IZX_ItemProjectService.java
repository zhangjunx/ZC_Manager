package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.ZX_ItemProject;

@Service
public interface IZX_ItemProjectService {
	int deleteByPrimaryKeyService(Integer id);

    int insertSelectiveService(ZX_ItemProject record);

    ZX_ItemProject selectByPrimaryKeyService(Integer id);

    int updateByPrimaryKeySelectiveService(ZX_ItemProject record);
    
    List<Map<String,Object>> getItemProjectListService(Map m);//查询列表
    
    List<Map<String,Object>> getItemProjectListService(Map m,PageInfo pageinfo);//查询列表

}
