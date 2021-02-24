package com.xr.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xr.entity.WX_VisitorsReasonType;
@Repository
public interface WX_VisitorsReasonTypeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(WX_VisitorsReasonType record);

    int insertSelective(WX_VisitorsReasonType record);

    WX_VisitorsReasonType selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WX_VisitorsReasonType record);

    int updateByPrimaryKey(WX_VisitorsReasonType record);
    
    List<WX_VisitorsReasonType> queryVisitorsReasonTypeList();//查询来访事由代码
    
    Integer queryMaxId();//获取最大id值 +1
}