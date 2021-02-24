package com.xr.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xr.entity.AdminData;
@Repository
public interface AdminDataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(AdminData record);

    int insertSelective(AdminData record);

    AdminData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(AdminData record);

    int updateByPrimaryKey(AdminData record);
    
    List<AdminData> queryAdminDataByHolderNo(String holderno);//通过工号查管理员所在公司
}