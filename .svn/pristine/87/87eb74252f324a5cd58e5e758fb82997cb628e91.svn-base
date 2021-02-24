package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.WX_Approver;

@Service
public interface IWX_ApproverService {
	int insertSelective(WX_Approver record);//添加
	Map<String, Object> queryJurisdiction(String holderno);//查询是否有审批权限
	
	int insertApproverBatchService(Map m);//批量添加审批角色
	
	List<Map<String,Object>> queryHolderListByRoleCodeService(String  rolecode);//根据角色主键 查角色下的人员:工号，姓名，部门

	List<Map<String,Object>> queryApproverSuperListService();//查询审批领导人列表
	List<Map<String,Object>>  queryVisitorsReasonListService();//查询来访原因列表
	int deleteApproverBatchService(Map m);//移除审批人
	
	Map<String,Object> queryDeptListService();//查询审批部门
	
}
