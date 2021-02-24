package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.LH_FaceRecogParam;
@Repository
public interface LH_FaceRecogParamMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LH_FaceRecogParam record);

    int insertSelective(LH_FaceRecogParam record);

    LH_FaceRecogParam selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(LH_FaceRecogParam record);

    int updateByPrimaryKey(LH_FaceRecogParam record);
    
    List<Map<String,Object>> getFaceParamList(Map m);//查询列表
}