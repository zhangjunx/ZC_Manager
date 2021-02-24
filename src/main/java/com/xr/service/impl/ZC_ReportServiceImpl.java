package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ZC_ReportMapper;
import com.xr.service.ZC_ReportService;

@Service
public class ZC_ReportServiceImpl implements ZC_ReportService {
	
	@Autowired
	private ZC_ReportMapper mapper;

	/**
	 * 入库统计
	 */
	@Override
	public Map<String, Object> getInStoreListReport(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = mapper.getInStoreListReport(map);
		int count = mapper.getInStoreListReportCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count > 0){
			resultMap.put("flag",true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag",false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 出库统计
	 */
	@Override
	public Map<String, Object> getOutStoreListReport(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = mapper.getOutStoreListReport(map);
		int count = mapper.getOutStoreListReportCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count > 0){
			resultMap.put("flag",true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag",false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 借出统计
	 */
	@Override
	public Map<String, Object> getBorrowedStoreListReport(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = mapper.getBorrowedStoreListReport(map);
		int count = mapper.getBorrowedStoreListReportCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count > 0){
			resultMap.put("flag",true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag",false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

}
