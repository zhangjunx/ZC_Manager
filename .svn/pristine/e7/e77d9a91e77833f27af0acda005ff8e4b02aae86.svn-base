package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.WareHouse_AreaData;
@Repository
public interface WareHouse_AreaDataMapper {
    int deleteByPrimaryKey(Integer areacode);//删除数据

    int insert(WareHouse_AreaData record);//新增数据 新增仓库区域

    int insertSelective(WareHouse_AreaData record);

    WareHouse_AreaData selectByPrimaryKey(Integer areacode);//根据主键查询

    int updateByPrimaryKeySelective(WareHouse_AreaData record);//更新数据

    int updateByPrimaryKey(WareHouse_AreaData record);
    List<Map<String,Object>> queryWareHouseAreaList(Map m);//查询 仓库区域列表
    List<WareHouse_AreaData> queryAreaCodeListByWareCode(Integer warecode);//通过查询仓库查询仓库区域列表
    int deleteAreaHouseBatch(List<Integer> list);//批量删除
}