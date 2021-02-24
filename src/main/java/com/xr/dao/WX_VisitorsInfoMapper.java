package com.xr.dao;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.WX_VisitorsInfo;
@Repository
public interface WX_VisitorsInfoMapper {

    int insert(WX_VisitorsInfo record);

    int insertSelective(WX_VisitorsInfo record);//添加数据

    WX_VisitorsInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WX_VisitorsInfo record);
    
    List<Map<String,Object>> queryVisitorsInfoByUnaudited(Map m);//未审批   根据卡号或身份证号   登记端 干警或外协查看已提交的申请是否已审批完成
    List<Map<String,Object>> queryVisitorsInfoByAudited(Map m);//已审批   根据卡号或身份证号   登记端 干警或外协查看已提交的申请是否已审批完成
    
    List<Map<String,Object>> queryVisitorsInfoByLeadUnaudited(Map m);//未审批   领导查看未审批信息
    List<Map<String,Object>> queryVisitorsInfoByLeadAudited(String holderno);//已审批   领导查看自己已审批信息

}