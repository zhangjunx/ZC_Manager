package com.xr.dao;

import org.springframework.stereotype.Repository;

import com.xr.entity.LPR_VehicleTypeDevice;
@Repository
public interface LPR_VehicleTypeDeviceMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LPR_VehicleTypeDevice record);

    int insertSelective(LPR_VehicleTypeDevice record);

    LPR_VehicleTypeDevice selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(LPR_VehicleTypeDevice record);

    int updateByPrimaryKey(LPR_VehicleTypeDevice record);
}