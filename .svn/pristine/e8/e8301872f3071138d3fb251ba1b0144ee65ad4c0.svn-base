package com.xr.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.TitleDataMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.TitleData;
import com.xr.service.ITitleDataService;
@Service
public class TitleDataServiceImpl implements ITitleDataService {

	@Autowired
	private TitleDataMapper tdm;

	@Override
	public int deleteByPrimaryKeyService(String titleno) {
		// 删除数据
		return tdm.deleteByPrimaryKey(titleno);
	}

	@Override
	public int insertService(TitleData record) {
		// 插入数据
		return tdm.insertSelective(record);
	}

	@Override
	public TitleData selectByPrimaryKeyService(String titleno) {
		//查询数据 通过实体类
		return tdm.selectByPrimaryKey(titleno);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(TitleData record) {
		//更新数据
		return tdm.updateByPrimaryKeySelective(record);
	}
	
	@Override
	public List<TitleData> queryTitleDataListService(TitleData record) {
		// 分页查询
		return tdm.queryTitleDataListByPage(record);
	}

	@Override
	public List<TitleData> queryTitleDataListByPageService(TitleData record,PageInfo pageinfo) {
		// 查询职位列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<TitleData> list=tdm.queryTitleDataListByPage(record);
		com.github.pagehelper.PageInfo<TitleData> p=new com.github.pagehelper.PageInfo<TitleData>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public int deleteTitleDataBatchService(List<String> list) {
		// 批量删除
		return tdm.deleteTitleDataBatch(list);
	}

	@Override
	public int updateTitleDataBatchService(List<String> list) {
		//  批量修改
		return tdm.updateTitleDataBatch(list);
	}

	@Override
	public int updateTitleDataBatchsService(List<TitleData> list) {
		// 批量修改 多个数据
		return tdm.updateTitleDataBatchs(list);
	}

	
	
}
