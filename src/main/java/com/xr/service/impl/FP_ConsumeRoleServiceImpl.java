package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.xr.dao.FP_ConsumeRoleMapper;
import com.xr.service.FP_ConsumeRoleService;

import net.sf.json.JSONArray;

@Service
public class FP_ConsumeRoleServiceImpl implements FP_ConsumeRoleService {
	
	@Autowired
	private FP_ConsumeRoleMapper consumeTypeDataMapper;

	/**
	 * 获取消费模式列表
	 * @param map
	 * @return
	 */
	@Override
	public Map<String, Object> getConsumeTypeList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		//消费模式列表
		List<Map<String, Object>> list = consumeTypeDataMapper.getConsumeTypeList(map);
		int count = consumeTypeDataMapper.getConsumeTypeListCount(map);
		
		//获取餐次列表
		Map<String,Object> timesParm = new HashMap<String,Object>();
		List<Map<String,Object>> timesList = consumeTypeDataMapper.getConsumeTimesList(timesParm);
		list = addListEntry(list,"fid",timesList,"consumeTypeID","timesList");
		
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	private List<Map<String, Object>> addListEntry(List<Map<String, Object>> list, String string,
			List<Map<String, Object>> timesList, String string2,String string3) {
		for(int i=0;i<list.size();i++){
			String fid=list.get(i).get(string).toString();
			List<Map<String,Object>> list2 = new ArrayList<Map<String,Object>>();
			for(int j=0;j<timesList.size();j++){
				if(fid.equals(timesList.get(j).get(string2).toString())){
					list2.add(timesList.get(j));
				}
			}
			list.get(i).put(string3, list2);
		}
		return list;
	}

	/**
	 * 添加/更新消费模式数据
	 * 以及消费模式下的餐次列表
	 * 字段fid不为空更新，否则新增
	 * delList：删除的餐次列表
	 * update：更新餐次的列表
	 * addList：新增餐次列表
	 * @param map
	 * @return
	 */
	@Override
	public Map<String, Object> addConsumeType(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		int b = 0;
		//删除列表为空
		if(map.get("delList") != null && !map.get("delList").equals("")){
			map.put("delList", JSONArray.fromObject(map.get("delList")));
		}
		//添加列表为空
		if(map.get("addList") != null && !map.get("addList").equals("")){
			map.put("addList", JSONArray.fromObject(map.get("addList")));
		}
		//更新列表为空
		if(map.get("updateList") != null && !map.get("updateList").equals("")){
			map.put("updateList", JSONArray.fromObject(map.get("updateList")));
		}
		//判断是新增还是编辑
		if(map.get("consumeTypeID") != null && !map.get("consumeTypeID").equals("")){
			b = consumeTypeDataMapper.editConsumeType(map);
			
			//为设备同步数据做准备
			map.put("consumeRoleID", map.get("consumeTypeID"));
			List<Map<String,Object>> list1 = getPerListWithRole(map);//根据身份获取人员列表
			List<Map<String,Object>> list2 = getDeviceListWithRole(map);//根据身份获取设备列表
			List<Map<String,Object>> list3 = getTimesListWithRole(map);//根据身份获取时间列表
			
			String personId = "";//人员ID以逗号分割
			for(int k=0;k<list1.size();k++){
				if(personId.equals("")){
					personId = list1.get(k).get("id").toString();
				}else{
					personId = personId + "," + list1.get(k).get("id").toString();
				}
			}
			
			System.out.println("身份ID："+map.get("consumeTypeID"));
			
			for(int i=0;i<list2.size();i++){
				String passtime = "";//时间权限
				System.out.println("======================================1111111111111");
				System.out.println(list2.get(i));
				if(list3 != null)
				for(int j=0;j<list3.size();j++){
					if(list2.get(i).get("restaurantID").toString().equals(list3.get(j).get("restaurantID").toString())
							&& list3.get(j).get("consumeTypeID").toString().equals(map.get("consumeTypeID"))){
						System.out.println("======================================2222222222222");
						System.out.println(list3.get(j));
						if(passtime.equals("")){
							passtime = list3.get(j).get("startTime")+":00," + list3.get(j).get("endTime")+":00";
						}else{
							passtime = passtime+","+list3.get(j).get("startTime")+":00," + list3.get(j).get("endTime")+":00";
						}
					}
				}
				list2.get(i).put("passtime", passtime);
				list2.get(i).put("personId", personId);
			}
			resultMap.put("resultList", JSON.toJSON(list2).toString());
		}else{
			b = consumeTypeDataMapper.addConsumeType(map);
		}
		resultMap.put("result", b);
		return resultMap;
	}

	@Override
	public int delConsumeType(Map<String, Object> map) {
		int b = consumeTypeDataMapper.delConsumeType(map);
		return b;
	}

	/**
	 * 获取一条信息
	 */
	@Override
	public Map<String, Object> getOneConsumeType(Map<String, Object> map) {
		Map<String, Object> oneInfo = consumeTypeDataMapper.getOneConsumeType(map);
		//获取餐次列表
		Map<String,Object> timesParm = new HashMap<String,Object>();
		timesParm.put("consumeTypeID", map.get("fid"));
		List<Map<String,Object>> timesList = consumeTypeDataMapper.getConsumeTimesList(timesParm);
		oneInfo.put("timesList", timesList);
		return oneInfo;
	}
	
	//===============================================================================================================
	/**
	 * consumeRoleID
	 * 根据消费模式获取人员列表
	 */
	public List<Map<String, Object>> getPerListWithRole(Map<String, Object> map) {
		List<Map<String,Object>> list = consumeTypeDataMapper.getPerListWithRole(map);
		return list;
	}
	
	/**
	 * consumeRoleID
	 * 根据消费模式获取设备列表
	 */
	public List<Map<String, Object>> getDeviceListWithRole(Map<String, Object> map) {
		List<Map<String,Object>> list = consumeTypeDataMapper.getDeviceListWithRole(map);
		return list;
	}
	
	/**
	 * consumeRoleID
	 * 根据身份获取时间列表
	 */
	private List<Map<String, Object>> getTimesListWithRole(Map<String, Object> map) {
		List<Map<String,Object>> list = consumeTypeDataMapper.getTimesListWithRole(map);
		return list;
	}

}
