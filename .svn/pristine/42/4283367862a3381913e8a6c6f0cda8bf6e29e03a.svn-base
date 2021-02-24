package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DepartmentData;
import com.xr.entity.HolderData;
@Repository
public interface DepartmentDataMapper {
    int deleteByPrimaryKey(String departmentno);//删除部门

    int insertSelective(DepartmentData record);//添加新的部门

    DepartmentData selectByPrimaryKey(String departmentno);

    int updateByPrimaryKeySelective(DepartmentData record);//更新部门

    List<DepartmentData> queryDeptList(DepartmentData record);//查询部门信息列表
    
    List<DepartmentData> queryDeptAndUnderNoList();//查询部门和所在公司
    
    List<DepartmentData> queryDeptListByLoginPerson(DepartmentData record);//根据登录人的部门 查询其所在公司下的所有部门
    
    List<HolderData> queryHolderListByDept(String departmentno);//删除部门时 先查看部门是否有人存在
    List<DepartmentData> queryDeptListByUnder(String underno);//根据部门号查其 下级部门
    
    String queryMaxDeptNo(String underno);//查询最大部门号 有上级部门
    String queryMaxDeptNon();//查询最大部门号 没有上级部门
    
    List<Map<String, Object>> getDeptTree();//所有的部门树
	List<Map<String, Object>> getMyDeptTree(String holderno);//登录人所在公司下的部门树
	List<Map<String, Object>> getMyDeptList(String holderno);//登录人所在公司下的部门树
	List<Map<String, Object>> getHolderByDeptBatch(List<String> list);//通过部门查人员  批量查询
	
	List<Map<String, Object>> getHolderByDept(Map m);//通过部门查人员 
	
    /**
     * 通过部门编号查询部门名称
     * @param deptno
     */
    String queryDeptName(String deptno);
    
    
}