package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.WX_ApproverMapper;
import com.xr.entity.WX_Approver;
import com.xr.service.IWX_ApproverService;
@Service
public class WX_ApproverServiceImpl implements IWX_ApproverService {

	@Autowired
	private WX_ApproverMapper am;
	

	@Override
	public int insertSelective(WX_Approver record) {
		// 添加
		return am.insertSelective(record);
	}

	@Override
	public Map<String, Object> queryJurisdiction(String holderno) {
		// 查询是否有审批权限
		return am.queryJurisdiction(holderno);
	}

	@Override
	public int insertApproverBatchService(Map m) {
		//批量添加角色人
		List<WX_Approver> list=new ArrayList<WX_Approver>();
		List<WX_Approver> list1=new ArrayList<WX_Approver>();
		List<WX_Approver> list2=new ArrayList<WX_Approver>();
		// 批量添加审批角色
		String rolecode=(String) m.get("rolecode");
		List<WX_Approver> list3=am.queryApproverListByRoleCode(rolecode);
		List<Map<String,Object>> lis=(List<Map<String, Object>>) m.get("arr");
		for(int k=0;k<lis.size();k++){
			WX_Approver a=new WX_Approver();
			String holderno=(String) lis.get(k).get("holderno");
			String holdername=(String) lis.get(k).get("holdername");
			WX_Approver approver=am.queryApproverByHolderNo(holderno);
			if(approver!=null && !"".equals(approver)){//表中已存在 不可重复添加
				list1.add(approver);
			}else{//表中不存在   执行批量添加
				a.setHolderno(holderno);
				a.setHoldername(holdername);
				a.setRolecode(rolecode);
				list.add(a);
			}
		}
		
		//将表中原有的用户取消  封装到list2中
		for(int k=0;k<list3.size();k++){
			String holderno=list3.get(k).getHolderno();
			boolean res=false;
			for(int kk=0;kk<lis.size();kk++){
				String holderno2=(String) lis.get(kk).get("holderno");
				if(holderno.equals(holderno2)){
					res=true;
				}
			} 
			if(!res){
				list2.add(list3.get(k));//数据库有 提交的没有 批量删除
			}
		}
		
		//将表中已有的用户  执行修改操作
		int i1=0;
		for(int k=0;k<list1.size();k++){
			WX_Approver approver=list1.get(k);
			if(!approver.getRolecode().equals(rolecode)){//修改原有人的审批角色
				approver.setRolecode(rolecode);
				i1=am.updateByPrimaryKeySelective(approver);
			}
		}		
		
		//删除操作
		int i2=0;
		for(int k=0;k<list2.size();k++){
			//i2=am.deleteByPrimaryKey(list2.get(k).getId());
		}
		
		//添加
		int i3=0;
		if(list.size()>0){
			i3=am.insertApproverBatch(list);
		}
		int i=0;
		if(i1==0 && i2==0 && i3==0){
			i=0;
		}else{
			i=1;
		}
		return i;
	}//end
	
	
	@Override
	public int deleteApproverBatchService(Map m) {
		//批量移除角色人
		List<WX_Approver> list=new ArrayList<WX_Approver>();
		// 批量添加审批角色
		String rolecode=(String) m.get("rolecode");
		List<Map<String,Object>> lis=(List<Map<String, Object>>) m.get("arr");
		for(int k=0;k<lis.size();k++){
			WX_Approver a=new WX_Approver();
			String holderno=(String) lis.get(k).get("holderno");
			a.setHolderno(holderno);
			a.setRolecode(rolecode);
			WX_Approver approver=am.queryApproverByRoleCodeAndHolderNo(a);
			if(approver!=null && !"".equals(approver)){//表中已存在 移除
				list.add(approver);
			}
		}
		//删除操作
		int i=0;
		for(int k=0;k<list.size();k++){
			i=am.deleteByPrimaryKey(list.get(k).getId());
		}
		
		return i;
	}


	@Override
	public List<Map<String, Object>> queryHolderListByRoleCodeService(String rolecode) {
		// 根据角色主键 查角色下的人员:工号，姓名，部门
		return am.queryHolderListByRoleCode(rolecode);
	}

	@Override
	public List<Map<String, Object>> queryApproverSuperListService() {
		// List<Map<String,Object>> queryApproverSuperList();//查询审批领导人列表
		return am.queryApproverSuperList();
	}

	@Override
	public List<Map<String, Object>> queryVisitorsReasonListService() {
		// List<Map<String,Object>>  queryVisitorsReasonList();//查询来访原因列表
		return am.queryVisitorsReasonList();
	}

	@Override
	public Map<String, Object> queryDeptListService() {
		// 查询审批部门
		Map<String, Object> map=new HashMap<String, Object>();
		List<Map<String,Object>> list=am.queryDeptList();
		if(list.size()>0){
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", list);
		}else{
			map.put("flag", false);
			map.put("reason", "查询失败，暂无数据可查！");
		}
		return map;
	}

	 

}
