package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.RC_CallTimeModelMapper;
import com.xr.service.RC_CallTimeModelService;

@Service
public class RC_CallTimeModelServiceImpl implements RC_CallTimeModelService {
	
	@Autowired
	private RC_CallTimeModelMapper callTimeModelMapper;

	/**
	 * 获取时间模板列表
	 */
	@Override
	public Map<String, Object> getTimeMoldelList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = callTimeModelMapper.getTimeMoldelList(map);
		int count = callTimeModelMapper.getTimeMoldelListCount(map);
		
		List<Map<String,Object>> listMember = callTimeModelMapper.getTimeMoldelMemberList(map);
		if(list.size()>0 && listMember.size()>0){
			for(int i=0;i<list.size();i++){
				List<Map<String,Object>> timeArr = new ArrayList<Map<String,Object>>();
				String fid=list.get(i).get("fid").toString();
				for(int j=0;j<listMember.size();j++){
					if(fid.equals(listMember.get(j).get("timeModelID").toString())){
						timeArr.add(listMember.get(j));
					}
				}
				list.get(i).put("timeList", timeArr);
			}
		}
		
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count > 0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}
	
	@Override
	public Map<String, Object> getTimeMoldelMemberList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = callTimeModelMapper.getTimeMoldelMemberList(map);
		resultMap.put("result", list);
		if(list.size() > 0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 新建/编辑时间模板信息
	 */
	@Override
	public Map<String, Object> addTimeMoldel(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		if(map == null){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		if(map.get("modelName") == null || map.get("modelName").toString().equals("")){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "模板名称不能为空！");
			return resultMap;
		}
		
		Map<String,Object> checkInfo = callTimeModelMapper.getSumWithName(map);
		if(checkInfo != null){
			if(map.get("fid").toString().equals("")){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "模板名称为："+map.get("modelName")+"的模板已经存在！");
				return resultMap;
			}else if(!map.get("fid").toString().equals("") && !checkInfo.get("fid").toString().equals(map.get("fid").toString()) ){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "模板名称为："+map.get("modelName")+"的模板已经存在！");
				return resultMap;
			}
		}
		
		List<Map<String,Object>> addList = (List<Map<String, Object>>) map.get("addList");
		List<Map<String,Object>> updateList = (List<Map<String, Object>>) map.get("updateList");
		List<Map<String,Object>> delList = (List<Map<String, Object>>) map.get("delList");

		int b=0;
		if(map.get("fid") == null || map.get("fid").toString().equals("")){//新增
			b = callTimeModelMapper.addTimeMoldel(map);
		}else{//编辑
			b = callTimeModelMapper.editTimeMoldel(map);
		}
		
		if(b>=0){
			resultMap.put("result", b);
			resultMap.put("flag", true);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("result", b);
			resultMap.put("flag", false);
			resultMap.put("reason", "数据更新失败！");
		}
		
		return resultMap;
	}

	/**
	 * 获取一条信息
	 */
	@Override
	public Map<String, Object> getOneTimeMoldelInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		Map<String,Object> result = callTimeModelMapper.getOneTimeMoldelInfo(map);
		map.put("timeModelID", map.get("fid"));
		List<Map<String,Object>> listMember = callTimeModelMapper.getTimeMoldelMemberList(map);
		result.put("timeList", listMember);
		if(result != null){
			resultMap.put("result", result);
			resultMap.put("flag", true);
			resultMap.put("reason", "数据查询成功！");
		}
		return resultMap;
	}
	
	/**
	 * 删除一条信息
	 */
	@Override
	public Map<String, Object> delOneTimeMoldelInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		int b = callTimeModelMapper.delOneTimeMoldelInfo(map);
		
		if(b>=0){
			resultMap.put("result", b);
			resultMap.put("flag", true);
			resultMap.put("reason", "数据删除成功！");
		}else{
			resultMap.put("result", b);
			resultMap.put("flag", false);
			resultMap.put("reason", "数据删除失败！");
		}
		
		return resultMap;
	}

}
