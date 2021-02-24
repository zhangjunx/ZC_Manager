package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.VisitorsInfo;
@Repository
public interface VisitorsInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VisitorsInfo record);

    int insertSelective(VisitorsInfo record);

    VisitorsInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VisitorsInfo record);

    int updateByPrimaryKeyWithBLOBs(VisitorsInfo record);

    int updateByPrimaryKey(VisitorsInfo record);
    List<Map<String,Object>> queryVisitorsInfoList(Map m);//访客登记记录查询列表
    List<Map<String,Object>> queryVisitorsInfoIORecordList(Map m);//访客进出记录查询列表
    
    List<Map<String,Object>> queryVisitoredHolderByName(String str);//根据姓名查被访人员信息
    
    List<Map<String,Object>> queryVisitorsInfoByIDCardNo(Map m);//根据身份证号查访客
    
    List<Map<String,Object>> queryVisitorsInfoByHolderAndUnaudited(Map m);//根据登录人工号 查待审批的访客消息
    List<Map<String,Object>> queryVisitorsInfoByHolderAndAudited(Map m);//根据登录人工号 查已审批的所有的访客信息
    List<Map<String,Object>> queryVisitorsInfoByLoginHolder(Map m);//根据登录人工号 查待自己所有的访客信息
    
    int updateVisitorsApplyStatus(VisitorsInfo record);//访客申请审批 同意或不同意
    

	Map<String, Object> queryByPrimaryKey(Integer id);//查询访客详情信息
	
	Map<String, Object> queryVisitorsByNameAndPhone(Map m);//根据访客姓名和电话查是否已有历史信息
	List<Map<String,Object>> queryVisitorsListByNameAndPhone(Map m);//根据访客姓名和电话查是否已有历史信息
	Map<String,Object> queryVisitorsInfoByOpenId(Map m);//根据openid查是否已有历史信息
	
	List<Map<String,Object>> getVDoorPerm(List<Short> list);//通过门区编号查名称  查询访客的可进门区列表
	List<Map<String,Object>> getVDoorPermTree(List<Short> list);//通过门区编号查名称  查询访客的可进门区列表 
	
	Map<String,Object> getDoorArrById(Map m);//根据id查doorarr

	Map<String, Object> getVisitorsIORecord(Map<String, Object> m);//访客进出记录 详情查看
}