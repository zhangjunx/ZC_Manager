package com.xr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.SY210AppSetMapper;
import com.xr.entity.SY210AppSet;
import com.xr.service.ISY210AppSetService;
@Service
public class SY210AppSetServiceImpl implements ISY210AppSetService {
	@Autowired
	private SY210AppSetMapper sym;

	@Override
	public List<SY210AppSet> querySY210AppSetByDeviceNoAndEntryReaderService(SY210AppSet record) {
		// SY210AppSet querySY210AppSetByDeviceNoAndEntryReaderService(SY210AppSet record);//门区权限设置时  给人员赋予权限 通过选中的门区查询AppSetNo
		return sym.querySY210AppSetByDeviceNoAndEntryReader(record);
	}

	@Override
	public List<SY210AppSet> querySY210AppSetNoListService() {
		// List<SY210AppSet> querySY210AppSetNoListService();//门区权限查看时  查询门区不为空的AppsetNo列表
		return sym.querySY210AppSetNoList();
	}

}
