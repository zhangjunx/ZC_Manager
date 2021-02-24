package com.xr.dao;

import com.xr.entity.LPR_Customer;

public interface LPR_CustomerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LPR_Customer record);

    int insertSelective(LPR_Customer record);

    LPR_Customer selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(LPR_Customer record);

    int updateByPrimaryKey(LPR_Customer record);
}