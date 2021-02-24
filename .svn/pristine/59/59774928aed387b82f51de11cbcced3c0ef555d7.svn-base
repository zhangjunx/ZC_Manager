package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DepartureData;

@Repository
public interface DepartureDataMapper {

    int insertSelective(DepartureData record);//员工离职 即当员工表holderdata删除用户时 执行添加操作  管理员或有权限之人

    DepartureData selectByPrimaryKey(String holderno);

    int deleteByPrimaryKey(String holderno);//删除离职资料库信息  管理员或有权限之人
    List<Map<String,Object>> queryDepartureList(Map m);//查询离职资料库信息   管理员或有权限之人 List<DepartureData>
    
    Map<String,Object> queryDepartureByHolderNo(String holderno);// 通过主键查询实体信息 DepartureData
    DepartureData queryDepartureByIDCode(String idcode);// 通过身份证号查询人是否存在
    
    DepartureData queryDepartureByHolder(String holderno);//根据工号查人是否存在 人事添加时先判断是否有人
}