package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.WareHouseData;
@Repository
public interface WareHouseDataMapper {
    int deleteByPrimaryKey(Integer warecode);//删除数据

    int insert(WareHouseData record);//新增仓库

    int insertSelective(WareHouseData record);

    WareHouseData selectByPrimaryKey(Integer warecode);//根据主键查询

    int updateByPrimaryKeySelective(WareHouseData record);//更新数据

    int updateByPrimaryKey(WareHouseData record);
    List<WareHouseData> queryWareHouseList(Map m);//分页查询   根据角色下的部门  查询仓库列表
    List<WareHouseData> queryWareHouseLists();// 查询仓库列表
    int deleteWareHouseDataBatch(List<Integer> list);//批量删除
}