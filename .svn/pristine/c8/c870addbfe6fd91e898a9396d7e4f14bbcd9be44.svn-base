package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.DepartmentDataMapper;
import com.xr.entity.DepartmentData;
import com.xr.entity.HolderData;
import com.xr.entity.PageInfo;
import com.xr.service.IDepartmentDataService;
import com.xr.util.TreeToolUtils;
@Service
public class DepartmentDataServiceImpl implements IDepartmentDataService {
	@Autowired
	private DepartmentDataMapper ddm;
	
	@Override
	public List<DepartmentData> queryDeptListService(DepartmentData record) {
		// 查询部门列表
		return ddm.queryDeptList(record);
	}

	@Override
	public List<DepartmentData> queryDeptListByPageService(DepartmentData record,PageInfo pageinfo) {
		// 分页查询部门列表 获取记录 
		PageHelper.startPage(pageinfo.getPageIndex(),pageinfo.getPageSize());
		List<DepartmentData> list=ddm.queryDeptList(record);
		com.github.pagehelper.PageInfo<DepartmentData> p=new com.github.pagehelper.PageInfo<DepartmentData>(list);
		long total=p.getTotal();
		int totalPage=(int)(total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int)total);
		return list;
	}

	@Override
	public int insertService(DepartmentData record) {
		// 添加新的部门
		int i=ddm.insertSelective(record);
		return i;
	}


	@Override
	public int deleteByPrimaryKeyService(String departmentno) {
		// 删除部门
		return ddm.deleteByPrimaryKey(departmentno);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(DepartmentData record) {
		// 更新部门
		return ddm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<DepartmentData> queryDeptAndUnderNoListService() {
		// 查询部门和所在公司
		return ddm.queryDeptAndUnderNoList();
	}


	@Override
	public List<DepartmentData> queryDeptListByLoginPersonService(DepartmentData record) {
		// 根据登录人的部门 查询其所在公司下的所有部门
		return ddm.queryDeptListByLoginPerson(record);
	}

	@Override
	public List<HolderData> queryHolderListByDeptService(String departmentno) {
		// 删除部门时 先查看部门是否有人存在
		return ddm.queryHolderListByDept(departmentno);
	}

	@Override
	public List<DepartmentData> queryDeptListByUnderService(String underno) {
		// 根据部门号查其 下级部门
		return ddm.queryDeptListByUnder(underno);
	}
	
	

	@Override
	public String queryMaxDeptNoService(String underno) {
		//  查询最大部门号 有上级部门
		return ddm.queryMaxDeptNo(underno);
	}

	@Override
	public String queryMaxDeptNonService() {
		//  查询最大部门号 没有上级部门
		return ddm.queryMaxDeptNon();
	}
	
	@Override
	public DepartmentData selectByPrimaryKeyService(String departmentno) {
		// 新增部门时 判断是否部门号已存在
		return ddm.selectByPrimaryKey(departmentno);
	}

	@Override
	public String queryDeptName(String deptno) {
		//通过部门编号查询部门名称
		return ddm.queryDeptName(deptno);
	}

	@Override
	public List<Map<String, Object>> getDeptTreeService() {
		//获取部门树
		List<Map<String, Object>> list=ddm.getDeptTree();
		List<Map<String, Object>> treeList=new ArrayList<Map<String,Object>>();
		TreeToolUtils u=new TreeToolUtils();
		treeList=u.menuList(list, true);
		return treeList;
	}
	
	@Override
	public List<Map<String, Object>> getMyDeptTreeService(String holderno) {
		//获取部门树
		List<Map<String, Object>> list=ddm.getMyDeptTree(holderno);
		List<Map<String, Object>> MytreeList=new ArrayList<Map<String,Object>>();
		TreeToolUtils u=new TreeToolUtils();
		MytreeList=u.menuList(list, true);
		return MytreeList;
	}

	@Override
	public List<Map<String, Object>> getDeptTreeCheckService() {
		//获取部门树
		List<Map<String, Object>> list=ddm.getDeptTree();
		return list;
	}
	
	@Override
	public List<Map<String, Object>> getMyDeptTreeCheckService(String holderno) {
		//获取部门树
		List<Map<String, Object>> list=ddm.getMyDeptTree(holderno);
		return list;
	}
	@Override
	public List<Map<String, Object>> getMyDeptListService(String holderno) {
		//登录人所在公司下的部门列表
		List<Map<String, Object>> list=ddm.getMyDeptList(holderno);
		return list;
	}

	@Override@Transactional
	public Map<String,Object>  ajaxUploadExcel(List<DepartmentData> arrlist) throws Exception{
        Map<String,Object> map=new HashMap<String,Object>();
        for(int k=0;k<arrlist.size();k++){
			String deptno=arrlist.get(k).getDepartmentno();
			DepartmentData dd=ddm.selectByPrimaryKey(deptno);
			if(dd!=null){//表示部门号存在
			   throw new RuntimeException("部门重复了");
			}
			int i=ddm.insertSelective(arrlist.get(k));
			if(i==0){
				throw new Exception("未知错误");
			}
		}
        map.put("flag", true);
		map.put("reason","导入成功!");
        return map;
    }

	@Override
	public List<Map<String, Object>> getHolderByDeptBatchService(List<String> list) {
		//通过部门查人员  批量查询
		return ddm.getHolderByDeptBatch(list);
	}

	@Override
	public List<Map<String, Object>> getHolderByDeptService(Map m) {
		// 通过部门查人员
		return ddm.getHolderByDept(m);
	}

	 
}
