package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.SpareParts_StockDataMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.SpareParts_StockData;
import com.xr.service.ISpareParts_StockDataService;

/**
 * 备品备件_库存相关操作
 * @author csc
 * 业务实现层
 */
@Service
public class SpareParts_StockDataServiceImpl implements ISpareParts_StockDataService {

	@Autowired
	private SpareParts_StockDataMapper sdm;

	@Override
	public Map<String, Object> querySparePartsStockDataListService(SpareParts_StockData sd,PageInfo pageinfo) {
		//查询备品备件库存列表
		Map<String,Object> map=new HashMap<String,Object>();
		String itemcode=sd.getItemcode();
		String warename=sd.getWarename();
		Integer pageIndex=pageinfo.getPageIndex();
		Integer pageSize=pageinfo.getPageSize();
		Map<String,Object> map1=new HashMap<String,Object>();
		PageHelper.startPage(pageIndex, pageSize);
		map1.put("warename", warename);
		map1.put("itemcode", itemcode);
		List<Map<String,Object>> list=sdm.querySparePartsStockDataList(map1);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageSize==0?total/pageSize:total/pageSize+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		if(list!=null && list.size()>0){
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", list);
			map.put("pageinfo", pageinfo);
			map.put("pageIndex", pageIndex);
			map.put("pageSize", pageSize);
			map.put("sumCount", total);
		}else{
			map.put("flag", false);
			map.put("reason", "查询失败，暂无数据可查！");
		}  
		return map;
	}
	
	
	
	
	
	
}
