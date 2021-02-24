package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.SparePartsDataMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.SparePartsData;
import com.xr.service.ISparePartsDataService;

/**
 * @ClassName SparePartsDataServiceImpl
 * @Description 备品备件基本资料的业务实现层
 * @Author csc
 * @Date 2019年12月24日 下午6:24:06
 */
@Service
public class SparePartsDataServiceImpl implements ISparePartsDataService {

	@Autowired
	private SparePartsDataMapper spdm;

	@Override
	public int deleteByPrimaryKeyService(String itemcode) {
		// 删除数据
		return spdm.deleteByPrimaryKey(itemcode);
	}

	@Override
	public int insertService(SparePartsData record) {
		// 插入数据
		return spdm.insert(record);
	}

	@Override
	public SparePartsData selectByPrimaryKeyService(String itemcode) {
		// 通过主键查询数据类
		return spdm.selectByPrimaryKey(itemcode);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(SparePartsData record) {
		// 更新数据
		return spdm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String,Object>> getSparepartsListByPageService(Map m,PageInfo pf) {
		//分页 查询备品备件基本资料列表
		PageHelper.startPage(pf.getPageIndex(), pf.getPageSize());
		List<Map<String,Object>> list=spdm.getSparepartsList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pf.getPageSize()==0?total/pf.getPageSize():total/pf.getPageSize()+1);
		pf.setTotalPage(totalPage);
		pf.setSumCount((int) total);
		return list;
	}
	
	@Override
	public List<Map<String,Object>> getSparepartsListService(Map m) {
		// 查询备品备件基本资料列表
		return spdm.getSparepartsList(m);
	}

	/*@Override
	public int updateSparePartsDataBatchService(List<SparePartsData> list) {
		// 批量修改
		return spdm.updateSparePartsDataBatch(list);
	}*/

	@Override
	public int deleteBatchService(List<String> list) {
		// 批量删除
		return spdm.deleteBatch(list);
	}

	@Override
	public String queryRepeatItemcode(String itemcode) {
		// * 通过备品备件的编码查询编码是否存在* 用于Excel导入时的验证
		return spdm.queryRepeatItemcode(itemcode);
	}

	@Override
	public void insertExcelSpareParts(List<Map<String, Object>> list) {
		// Excel导入备品备件时的批量添加
		 spdm.insertExcelSpareParts(list);
	}

	
}
