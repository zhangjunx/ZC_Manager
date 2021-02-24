package com.xr.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.xr.entity.DepartmentData;
import com.xr.entity.HolderData;
import com.xr.entity.PageInfo;

@Service
public interface IDepartmentDataService {
	 List<DepartmentData> queryDeptListService(DepartmentData record);//查询部门信息列表
	 List<DepartmentData> queryDeptListByPageService(DepartmentData record,PageInfo pageinfo);//查询部门信息列表;//分页 条件  查询部门信息列表
	 
	 int insertService(DepartmentData record);//添加新的部门
	 
	 int deleteByPrimaryKeyService(String departmentno);//删除部门
	 int updateByPrimaryKeySelectiveService(DepartmentData record);//更新部门
	 
	 List<DepartmentData> queryDeptAndUnderNoListService();//查询部门和所在公司
	 
	 List<DepartmentData> queryDeptListByLoginPersonService(DepartmentData record);//根据登录人的部门 查询其所在公司下的所有部门
	 
	 List<HolderData> queryHolderListByDeptService(String departmentno);//删除部门时 先查看部门是否有人存在
	 List<DepartmentData> queryDeptListByUnderService(String underno);//根据部门号查其 下级部门
	 
	 String queryMaxDeptNoService(String underno);//查询最大部门号 有上级部门
	 String queryMaxDeptNonService();//查询最大部门号 没有上级部门
	 DepartmentData selectByPrimaryKeyService(String departmentno);//新增部门时 判断是否部门号已存在
	
	 List<Map<String, Object>> getDeptTreeService();//所有的部门树
	 List<Map<String, Object>> getMyDeptTreeService(String holderno);//登录人所在公司下的部门树
	 List<Map<String, Object>> getDeptTreeCheckService();//所有的部门树 带复选框的
	 List<Map<String, Object>> getMyDeptTreeCheckService(String holderno);//登录人所在公司下的部门树 带复选框的
	 List<Map<String, Object>> getMyDeptListService(String holderno);//登录人所在公司下的部门列表  
	 
	 Map<String, Object> ajaxUploadExcel(List<DepartmentData> arrlist) throws Exception;
	 List<Map<String, Object>> getHolderByDeptBatchService(List<String> list);//通过部门查人员  批量查询
	 List<Map<String, Object>> getHolderByDeptService(Map m);//通过部门查人员
	  /**
	     * 通过部门编号查询部门名称
	     * @param deptno
	     */
	    String queryDeptName(String deptno);
}
