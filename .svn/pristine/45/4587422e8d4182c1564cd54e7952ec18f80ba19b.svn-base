package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.WX_Approver;
@Repository
public interface WX_ApproverMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(WX_Approver record);

    int insertSelective(WX_Approver record);

    WX_Approver selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WX_Approver record);

    int updateByPrimaryKey(WX_Approver record);
	
	Map<String, Object> queryJurisdiction(String holderno);//查询是否有审批权限
	int insertApproverBatch(List<WX_Approver> list);//批量添加审批角色
	
	WX_Approver queryApproverByHolderNo(String holderno);//根据工号   查是否已存在
	
	List<WX_Approver>  queryApproverListByRoleCode(String rolecode);//根据角色编号 查人是否存在
	List<Map<String,Object>> queryHolderListByRoleCode(String rolecode);//根据角色主键 查角色下的人员:工号，姓名，部门
	
	List<Map<String,Object>> queryApproverSuperList();//查询审批领导人列表
	List<Map<String,Object>>  queryVisitorsReasonList();//查询来访原因列表
	
	WX_Approver queryApproverByRoleCodeAndHolderNo(WX_Approver record);//根据工号和角色号查人是否存在
	
	List<Map<String,Object>> queryDeptList();//查询审批部门
	
}