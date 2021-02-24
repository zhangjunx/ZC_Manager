package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.VisitorsCardAppSetMapper;
import com.xr.entity.VisitorsCardAppSet;
import com.xr.service.IVisitorsCardAppSetService;
@Service
public class VisitorsCardAppSetServiceImpl implements IVisitorsCardAppSetService {
	@Autowired
	private VisitorsCardAppSetMapper vam;

	 
	@Override
	public int insertVisitorsCardAppSetBatchService(List<VisitorsCardAppSet> list) {
		// int insertVisitorsCardAppSetBatchService(Map m); //批量添加
		return vam.insertVisitorsCardAppSetBatch(list);
	}


	@Override
	public VisitorsCardAppSet queryVisitorsCardAppSetByCardIDService(String cardid){
		//  VisitorsCardAppSet queryVisitorsCardAppSetByAppSetKeyAndCardIDService(VisitorsCardAppSet record);//通过cardID和appsetkey查访客是否已被授权
		return vam.queryVisitorsCardAppSetByCardID(cardid);
	}
	

}
