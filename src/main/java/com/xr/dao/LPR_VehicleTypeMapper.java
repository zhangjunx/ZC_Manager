package com.xr.dao;

import org.springframework.stereotype.Repository;

import com.xr.entity.LPR_VehicleType;
@Repository
public interface LPR_VehicleTypeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LPR_VehicleType record);

    int insertSelective(LPR_VehicleType record);

    LPR_VehicleType selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(LPR_VehicleType record);

    int updateByPrimaryKey(LPR_VehicleType record);
}