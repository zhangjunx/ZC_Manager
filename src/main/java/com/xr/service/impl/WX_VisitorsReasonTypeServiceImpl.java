package com.xr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.WX_VisitorsReasonTypeMapper;
import com.xr.entity.WX_VisitorsReasonType;
import com.xr.service.IWX_VisitorsReasonTypeService;
@Service
public class WX_VisitorsReasonTypeServiceImpl implements IWX_VisitorsReasonTypeService {

	@Autowired
	private WX_VisitorsReasonTypeMapper rtm;
	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		// 删除
		return rtm.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelectiveService(WX_VisitorsReasonType record) {
		// 新增
		return rtm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(WX_VisitorsReasonType record) {
		// 修改
		return rtm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<WX_VisitorsReasonType> queryVisitorsReasonTypeListService() {
		//查询
		return rtm.queryVisitorsReasonTypeList();
	}

	@Override
	public Integer queryMaxIdService() {
		// 获取最大id值 +1
		return rtm.queryMaxId();
	}

}
