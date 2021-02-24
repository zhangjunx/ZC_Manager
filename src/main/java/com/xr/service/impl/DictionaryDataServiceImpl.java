package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.DictionaryDataMapper;
import com.xr.entity.DictionaryData;
import com.xr.entity.PageInfo;
import com.xr.service.IDictionaryDataService;
@Service
public class DictionaryDataServiceImpl implements IDictionaryDataService {

	@Autowired
	private DictionaryDataMapper ddm;

	@Override
	public int deleteByPrimaryKeyService(Integer datano) {
		// 删除字典
		return ddm.deleteByPrimaryKey(datano);
	}

	@Override
	public int insertSelectiveService(DictionaryData record) {
		// 添加字典
		return ddm.insertSelective(record);
	}

	@Override
	public DictionaryData selectByPrimaryKeyService(Integer datano) {
		// 根据主键查询字典
		return ddm.selectByPrimaryKey(datano);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(DictionaryData record) {
		//更新字典
		return ddm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<DictionaryData> queryDictListService(DictionaryData record) {
		// 查询列表
		return ddm.queryDictListByPage(record);
	}
	
	
	@Override
	public List<DictionaryData> queryDictListByPageService(DictionaryData record,PageInfo pageinfo) {
		//分页获取记录   查询字典列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<DictionaryData> list=ddm.queryDictListByPage(record);
		com.github.pagehelper.PageInfo<DictionaryData> p=new com.github.pagehelper.PageInfo<DictionaryData>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():(total/pageinfo.getPageSize()+1));
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public int deleteDictionaryDataBatchService(Integer[] ids) {
		// 批量删除
		return ddm.deleteDictionaryDataBatch(ids);
	}

	/**
	 * 数据大屏获取标题接口
	 */
	@Override
	public Map<String, Object> getScreenFullTitle(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("typeName") == null || map.get("typeName").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("reason", "typeName不能为空！");
			resultMap.put("result", null);
			return resultMap;
		}
		Map<String,Object> oneInfo = ddm.getScreenFullTitle(map);
		if(oneInfo != null){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
			resultMap.put("result", oneInfo);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
			resultMap.put("result", null);
		}
		return resultMap;
	}

	/**
	 * 数据大屏修改标题接口
	 */
	@Override
	public Map<String, Object> updateScreenFullTitle(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("typeName") == null || map.get("typeName").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("reason", "typeName不能为空！");
			resultMap.put("result", null);
			return resultMap;
		}
		if(map.get("value") == null || map.get("value").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("reason", "value不能为空！");
			resultMap.put("result", null);
			return resultMap;
		}
		int b = 0;
		b = ddm.updateScreenFullTitle(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功！");
			resultMap.put("result", b);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败！");
			resultMap.put("result", b);
		}
		return resultMap;
	}

	
 
	
	
}
