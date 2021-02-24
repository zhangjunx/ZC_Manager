package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.WareHouse_AreaDataMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.WareHouse_AreaData;
import com.xr.service.IWareHouse_AreaDataService;
@Service
public class WareHouse_AreaDataServiceImpl implements IWareHouse_AreaDataService {

	@Autowired
	private WareHouse_AreaDataMapper adm;
	
	@Override
	public List<Map<String,Object>> queryWareHouseAreaListService(Map m) {
		// 查询仓库区域列表
		return adm.queryWareHouseAreaList(m);
	}

	@Override
	public  List<Map<String,Object>> queryWareHouseAreaListByPageService(Map m,PageInfo pageinfo) {
		// 分页查询仓库区域列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		 List<Map<String,Object>> list=adm.queryWareHouseAreaList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}

	@Override
	public int deleteByPrimaryKeyService(Integer areacode) {
		// 删除数据
		return adm.deleteByPrimaryKey(areacode);
	}

	@Override
	public int insertService(WareHouse_AreaData record) {
		//插入数据
		return adm.insertSelective(record);
	}

	@Override
	public WareHouse_AreaData selectByPrimaryKeyService(Integer areacode) {
		// 通过主键查询数据
		return adm.selectByPrimaryKey(areacode);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(WareHouse_AreaData record) {
		// 更新数据
		return adm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<WareHouse_AreaData> queryAreaCodeListByWareCodeService(Integer warecode) {
		// 通过查询仓库查询仓库区域列表
		return adm.queryAreaCodeListByWareCode(warecode);
	}

	@Override
	public int deleteAreaHouseBatchService(List<Integer> list) {
		// 批量删除
		return adm.deleteAreaHouseBatch(list);
	}

	

}
