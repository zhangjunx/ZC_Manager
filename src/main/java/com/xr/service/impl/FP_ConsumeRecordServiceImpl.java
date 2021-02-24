package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.dao.FP_ConsumeRecordMapper;
import com.xr.dao.FP_ConsumeRoleMapper;
import com.xr.dao.FP_RestaurantMapper;
import com.xr.service.FP_ConsumeRecordService;

@Service
public class FP_ConsumeRecordServiceImpl implements FP_ConsumeRecordService {

	@Autowired
	private FP_ConsumeRecordMapper consumeDataMapper;
	
	/**
	 * 消费记录列表
	 * thisTime 为空获取所有记录
	 * thisTime 不为空huoq实时监控记录
	 */
	@Override
	public Map<String, Object> getConsumeList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = consumeDataMapper.getConsumeList(map);
		int count = consumeDataMapper.getConsumeListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}
	
	@Override
	public Map<String, Object> getConsumeAppList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = consumeDataMapper.getConsumeAppList(map);
		int count = consumeDataMapper.getConsumeAppListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	/**
	 * 获取要同步的人员信息
	 */
	@Override
	public List<Map<String, Object>> getHolderList(Map<String, Object> map) {
		//获取用户列表
		List<Map<String, Object>> list = consumeDataMapper.getHolderList(map);
		
		//获取用户，消费模式，餐厅关联数据列表
		Map<String,Object> parm = new HashMap<String,Object>();
		List<Map<String, Object>> list2 = consumeDataMapper.getRelationList(parm);
		
		list = setEntryList(list,list2);
		return list;
	}

	private List<Map<String, Object>> setEntryList(List<Map<String, Object>> list, List<Map<String, Object>> list2) {
		// TODO Auto-generated method stub
		for(int i=0;i<list.size();i++){
			String accountID = list.get(i).get("accountID").toString();
			//餐次属性
			List<Map<String,Object>> timesList = new ArrayList<Map<String,Object>>();
			//设备属性
			String deviceNo = "";
			for(int j=0;j<list2.size();j++){
				if(list2.get(j).get("holderAccountID").toString().equals(accountID)){
					Map<String,Object> entryMap = new HashMap<String,Object>();
					entryMap.put("mealTimesName", list2.get(j).get("mealTimesName"));
					entryMap.put("startTime", list2.get(j).get("startTime"));
					entryMap.put("endTime", list2.get(j).get("endTime"));
					entryMap.put("amount", list2.get(j).get("amount"));
					timesList.add(entryMap);
				}
				if(list2.get(j).get("deviceNo") != null && !list2.get(j).get("deviceNo").equals("")){
					if(deviceNo != null && !deviceNo.equals("")){
						deviceNo = list2.get(j).get("deviceNo").toString();
					}else{
						deviceNo = deviceNo+","+list2.get(j).get("deviceNo").toString();
					}
				}
			}
			list.get(i).put("timesList", timesList);
			list.get(i).put("deviceNo", deviceNo);
		}
		return list;
	}

}
