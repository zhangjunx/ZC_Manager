package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.VisitorsCardAppSet;

@Service
public interface IVisitorsCardAppSetService {
	 int insertVisitorsCardAppSetBatchService(List<VisitorsCardAppSet> list); //批量添加
	 VisitorsCardAppSet queryVisitorsCardAppSetByCardIDService(String cardid);//通过cardID和appsetkey查访客是否已被授权

}
