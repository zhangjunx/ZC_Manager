package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DepartmentData;
import com.xr.entity.WX_VisitorsInfo;
import com.xr.entity.WX_VisitorsInfoAdd;
import com.xr.entity.WX_VisitorsPhoto;
@Repository
public interface WX_VisitorsInfoAddMapper {
    
    int insert(WX_VisitorsInfoAdd record);

    int insertSelective(WX_VisitorsInfoAdd record);

    WX_VisitorsInfoAdd selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WX_VisitorsInfoAdd record);
    
    int insertVisitorsInfo(WX_VisitorsInfo record);//添加登记信息
    
    int insertVisitorsPhoto(WX_VisitorsPhoto record);//添加外来人照片
     
    Map<String,Object> queryHolderInfoByCarNo(String cardid);//根据卡号查干警信息
    
    List<DepartmentData> queryApproveDeptList();//查询所有参与审批的部门
    List<Map<String,Object>> queryHolderListByDeptNo(String departmentno);//通过部门查改部门下的人
    
    //List<Map<String,Object>> queryUnauditedRecordByLoginPeople(String rolecode);//查询所有待自己审批的记录
    //List<Map<String,Object>> queryAuditedRecordByLoginPeople(String rolecode);//查询所有自己已审批的记录

	List<Map<String, Object>> queryVisitorsRegisterRecordList(WX_VisitorsInfo record);//查询所有的访客记录
	
	int updateApplyStatusAgreeOrNoAgree(WX_VisitorsInfo record);//审批同意或不同意
	 
	int updateApplyStatusAgreeOrNoAgreeBatch(List<WX_VisitorsInfo> list);//批量审批同意或不同意  
	
	
	String queryApproverRoleCodeByName(String name);//根据审批角色名称查角色代码
	
	WX_VisitorsInfo queryVisitorsInfoByPrimary(Integer id);//根据主键查询登记信息

	String queryHolderNameByHolderno(String holderno);//根据工号查审批人员姓名
	
	String queryApproverDeptByholder(String holderno);//查询审批人所属审批部门名称
	String  queryApproverRoleCodeByholder(String holderno);//查询审批人所属审批部门编号
	
	
	List<Map<String,Object>> queryVisitorsInfoByUnaudited(String str);//登记端 查询未审批
    List<Map<String,Object>> queryVisitorsInfoByAudited(String str);//登记端 查询已审批
	
   
    List<Map<String,Object>> queryUnauditedByMy(String rolecode);//待我审批
    List<Map<String,Object>> queryAuditedByMy(String holderno);//我已审批
	
    List<Map<String, Object>> queryAuditedRecordList();//查询所有已审核访客记录
    
    List<Map<String, Object>> queryDetailInfo(Integer id);//查看详情
    
    List<Map<String,Object>> queryMyNewsInfo(String rolecode);//待我审批 消息提醒
    List<Map<String,Object>> queryMyCurrNewsInfo(Map m);//待我审批 消息提醒String rolecode,Integer maxid
    
    List<Map<String, Object>> getVisitorsStatic(Map m);//统计司机，临时外协人员
    List<Map<String, Object>> getHolderCount(Map m);//员工，固定外协人员

}