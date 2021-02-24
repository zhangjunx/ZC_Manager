package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.LPR_VehicleIODataMapper;
import com.xr.entity.LPR_VehicleIOData;
import com.xr.entity.PageInfo;
import com.xr.service.ILPR_VehicleIODataService;
@Service
public class LPR_VehicleIODataServiceImpl implements ILPR_VehicleIODataService {

	@Autowired
	private LPR_VehicleIODataMapper vio;//引入车辆进出信息的dao层
 
	@Override
	public List<Map<String,Object>> queryVehicleLastIORecordService(LPR_VehicleIOData record) {
		// 查询上一条记录 根据车牌号和id
		return vio.queryVehicleLastIORecord(record);
	}
	

	@Override
	public List<Map<String, Object>> queryVehicleIORecordListService(Map m) {
		// 车辆 进出记录查询
		return vio.queryVehicleIORecordList(m);
	}

	@Override
	public List<Map<String, Object>> queryVehicleIORecordListByPageService(Map m, PageInfo pageinfo) {
		// 车辆 进出记录查询 分页查询
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=vio.queryVehicleIORecordList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():(total/pageinfo.getPageSize()+1));
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public Integer queryVehicleIOMaxIDService() {
		// 查询车辆进出记录的最大值 maxid  实时刷新时用到
		return vio.queryVehicleIOMaxID();
	}

	@Override
	public List<Map<String, Object>> queryVehicleCurrIORecordListService(Integer id) {
		// 车辆  实时进出记录查询 
		return vio.queryVehicleCurrIORecordList(id);
	}

	
}
