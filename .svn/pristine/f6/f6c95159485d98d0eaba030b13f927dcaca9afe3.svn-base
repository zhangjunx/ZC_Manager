package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ACL_ModelDataMapper;
import com.xr.entity.ACL_ModelData;
import com.xr.entity.PageInfo;
import com.xr.service.IACL_ModelDataService;
@Service
public class ACL_ModelDataServiceImpl implements IACL_ModelDataService {

	@Autowired
	private ACL_ModelDataMapper mdm;

	@Override
	public List<Map<String, Object>> queryModelListService(Map<String, Object> m) {
		// 查询列表
		return mdm.queryModelList(m);
	}

	@Override
	public List<Map<String, Object>> queryModelListByPageService(Map<String, Object> m, PageInfo pageinfo) {
		// 分页查询
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=mdm.queryModelList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}

	@Override
	public int insertSelectiveService(ACL_ModelData record) {
		// 添加
		return mdm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ACL_ModelData record) {
		// 修改
		return mdm.updateByPrimaryKeySelective(record);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return mdm.deleteByPrimaryKey(id);
	}

	@Override
	public ACL_ModelData selectByPrimaryKeyService(Integer id) {
		// 查询
		return mdm.selectByPrimaryKey(id);
	}

	@Override
	public List<Map<String, Object>> getPermByModelService(Map m) {
		// 根据菜单id查是否有子功能  删除模块前判断
		return mdm.getPermByModel(m);
	}

	 
}
