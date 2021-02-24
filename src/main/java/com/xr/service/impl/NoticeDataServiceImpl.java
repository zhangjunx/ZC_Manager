package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.NoticeDataMapper;
import com.xr.service.NoticeDataService;

@Service
public class NoticeDataServiceImpl implements NoticeDataService {

	@Autowired
	private NoticeDataMapper noticeDataMapper;
	
	@Override
	public Map<String, Object> getMeeingNoticeList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		//获取当前时间
		List<Map<String, Object>> list = noticeDataMapper.getMeeingNoticeList(map);
		int count = noticeDataMapper.getMeeingNoticeListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	@Override
	public void updateWatchSatus(Map<String, Object> map) {
		noticeDataMapper.updateWatchSatus(map);
	}

}
