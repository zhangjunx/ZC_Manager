package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.DoorArrModule;
import com.xr.entity.PageInfo;

@Service
public interface IDoorArrModuleService {
	int insertSelectiveService(DoorArrModule record);
	
	int updateByPrimaryKeySelectiveService(DoorArrModule record);
	
	List<Map<String,Object>> getDoorArrListService(Map m);//查询门区模块列表

	List<Map<String, Object>> getHDoorArrListService(Map m);//查询员工门区模块列表

	List<Map<String, Object>> getVDoorArrListService(Map m);//查询访客门区模块列表

	List<Map<String, Object>> getDoorArrListByPageService(Map m,PageInfo pageinfo);
	
	int deleteBatchService(List<Integer> list);//批量删除

}
