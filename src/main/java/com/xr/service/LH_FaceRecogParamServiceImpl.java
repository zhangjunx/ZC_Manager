package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.LH_FaceRecogParamMapper;
import com.xr.entity.LH_FaceRecogParam;
import com.xr.entity.PageInfo;

@Service
public class LH_FaceRecogParamServiceImpl implements ILH_FaceRecogParamService {
	@Autowired
	private LH_FaceRecogParamMapper fpm;

	@Override
	public int insertSelectiveService(LH_FaceRecogParam record) {
		// 新增
		return fpm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(LH_FaceRecogParam record) {
		// 修改
		return fpm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getFaceParamListService(PageInfo pageinfo, Map m) {
		//查询列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=fpm.getFaceParamList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}

	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		//删除
		return fpm.deleteByPrimaryKey(id);
	}

	@Override
	public List<Map<String, Object>> getFaceParamListService(Map m) {
		// 查询列表
		return fpm.getFaceParamList(m);
	}

 
	
	

}
