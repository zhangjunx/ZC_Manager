package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.WareHouseDataMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.WareHouseData;
import com.xr.service.IWareHouseDataService;
@Service
public class WareHouseDataServiceImpl implements IWareHouseDataService {

	@Autowired
	private WareHouseDataMapper whdm;

	 
	@Override
	public int deleteByPrimaryKeyService(Integer warecode) {
		// 删除数据
		return whdm.deleteByPrimaryKey(warecode);
	}

	@Override
	public int insertService(WareHouseData record) {
		// 插入数据
		return whdm.insertSelective(record);
	}

	@Override
	public WareHouseData selectByPrimaryKeyService(Integer warecode) {
		// 通过主键查询实体类
		return whdm.selectByPrimaryKey(warecode);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(WareHouseData record) {
		// 更新数据
		return whdm.updateByPrimaryKeySelective(record);
	}

	@Override
	public int deleteWareHouseDataBatchService(List<Integer> list) {
		// 批量删除
		return whdm.deleteWareHouseDataBatch(list);
	}

	@Override
	public List<WareHouseData> queryWareHouseListByPageService(Map m,PageInfo pageinfo) {
		// //分页查询   根据角色下的部门  查询仓库列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<WareHouseData> list=whdm.queryWareHouseList(m);
		com.github.pagehelper.PageInfo<WareHouseData> p=new com.github.pagehelper.PageInfo<WareHouseData>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public List<WareHouseData> queryWareHouseListsService() {
		//查询仓库列表
		return whdm.queryWareHouseLists();
	}

	@Override
	public List<WareHouseData> queryWareHouseListService(Map m) {
		// 根据角色下的部门  查询仓库列表
		return whdm.queryWareHouseList(m);
	}

	 
 
	
}
