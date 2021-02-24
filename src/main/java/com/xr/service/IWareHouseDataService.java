package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.WareHouseData;

@Service
public interface IWareHouseDataService {
	
	int deleteByPrimaryKeyService(Integer warecode);//删除数据
	int insertService(WareHouseData record);//新增仓库
	WareHouseData selectByPrimaryKeyService(Integer warecode);//根据主键查询
	int updateByPrimaryKeySelectiveService(WareHouseData record);//更新数据
	int deleteWareHouseDataBatchService(List<Integer> list);//批量删除
	List<WareHouseData> queryWareHouseListByPageService(Map m,PageInfo pageinfo);//分页查询  根据角色下的部门  查询仓库列表
	List<WareHouseData> queryWareHouseListService(Map m);//查询  根据角色下的部门  查询仓库列表
	List<WareHouseData> queryWareHouseListsService();// 查询仓库列表
}
