package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.WareHouse_AreaData;

@Service
public interface IWareHouse_AreaDataService {
	 
	
	List<Map<String,Object>> queryWareHouseAreaListService(Map m);//查询 仓库区域列表
	List<Map<String,Object>>  queryWareHouseAreaListByPageService(Map m,PageInfo pageinfo);//分页查询仓库区域列表
    int deleteByPrimaryKeyService(Integer areacode);//删除数据
    int insertService(WareHouse_AreaData record);//新增数据 新增仓库区域
    WareHouse_AreaData selectByPrimaryKeyService(Integer areacode);//根据主键查询
    int updateByPrimaryKeySelectiveService(WareHouse_AreaData record);//更新数据
    List<WareHouse_AreaData> queryAreaCodeListByWareCodeService(Integer warecode);//通过查询仓库查询仓库区域列表
    int deleteAreaHouseBatchService(List<Integer> list);//批量删除
}
