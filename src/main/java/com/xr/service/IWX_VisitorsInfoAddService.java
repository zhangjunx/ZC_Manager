package com.xr.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.DepartmentData;
import com.xr.entity.PageInfo;
import com.xr.entity.WX_VisitorsInfo;

@Service
public interface IWX_VisitorsInfoAddService {
	 
    Map<String,Object> queryHolderInfoByCarNoService(String cardid);//根据卡号查干警信息
	
	public int insertPeopleAutoRegisterService(String str1,String str2,MultipartFile[] photo) throws IOException; //添加人员自助登记信息
	public int insertVehicleAutoRegisterService(String str1,String str2,MultipartFile[] photo) throws IOException; //添加车辆自助登记信息
	
	List<DepartmentData> queryApproveDeptListService();//查询所有参与审批的部门
	List<Map<String,Object>> queryHolderListByDeptNoService(String departmentno);//通过部门查改部门下的人
	
	//List<Map<String,Object>> queryUnauditedRecordByLoginPeopleService(String rolecode);//查询所有待自己审批的记录
	//List<Map<String,Object>> queryAuditedRecordByLoginPeopleService(String rolecode);//查询所有自己已审批的记录
	List<Map<String, Object>> queryVisitorsRegisterRecordListService(PageInfo pageinfo,WX_VisitorsInfo record);//查询所有的访客记录
	
	List<Map<String, Object>> queryAuditedRecordListService();//查询所有已审核访客记录
	
	int updateApplyStatusNoAgreeService(Integer id,String holderno);//审批不同意
	int updateApplyStatusAgreeService(Integer id,String holderno);//审批同意
	
	int updateApplyStatusNoAgreeBatchService(Map m);//批量审批  不同意 
	int updateApplyStatusAgreeBatchService(Map m);//批量审批   同意 
	Map<String, Object> queryVisitorsInfoByUnauditedService(String str);//登记端 查待审批信息
	Map<String, Object> queryVisitorsInfoByAuditedService(String str);//登记端 查已审批信息
	
	Map<String, Object> queryUnauditedByMyService(String holderno);//待我审批
	Map<String, Object> queryAuditedByMyService(String holderno);//我已审批
	
	Map<String, Object> queryDetailInfoService(Integer id);//查看详情
	
	Map<String,Object> queryMyCurrNewsInfoService(String holderno,HttpServletRequest request,HttpSession session);//待我审批 消息提醒

    List<Map<String, Object>> getVisitorsStaticService(Map m,PageInfo pageinfo);//统计司机，固定外协，临时外协人员
    //List<Map<String, Object>> getHolderCount(Map m);//统计员工，固定外协人员
}
