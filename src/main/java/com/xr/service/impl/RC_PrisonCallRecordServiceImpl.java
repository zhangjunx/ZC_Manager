package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.xr.controller.WebSocketController;
import com.xr.dao.RC_PrisonCallRecordMapper;
import com.xr.service.RC_PrisonCallRecordService;

@Service
public class RC_PrisonCallRecordServiceImpl implements RC_PrisonCallRecordService {
	
	@Autowired
	private RC_PrisonCallRecordMapper callRecordMapper;

	/**
	 * 上传点名记录及推送值前端
	 */
	@Override
	public Map<String, Object> insertCallRecord(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("prisonerID") == null || map.get("prisonerID").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("reason", "犯人ID不能为空！");
			resultMap.put("result", 0);
			return resultMap;
		}
		
		if(map.get("areaID") == null || map.get("areaID").toString().equals("")
				|| map.get("areaName") == null || map.get("areaName").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("reason", "区域ID或区域名称不能为空！");
			resultMap.put("result", 0);
			return resultMap;
		}
		
		if(map.get("caller") == null || map.get("caller").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("reason", "点名用户不能为空！");
			resultMap.put("result", 0);
			return resultMap;
		}
		
		if(map.get("callResult") == null || map.get("callResult").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("reason", "点名结果不能为空！");
			resultMap.put("result", 0);
			return resultMap;
		}
		
		//1、上传点名记录
		Map<String,Object> oneInfo = callRecordMapper.getOnePrisoner(map);//根据犯人ID获取犯人信息
		if(oneInfo == null){
			resultMap.put("flag", false);
			resultMap.put("reason", "人员信息系统不存在！");
			resultMap.put("result", 0);
			return resultMap;
		}
		
		map.put("prisonerName", oneInfo.get("prisonerName"));
		map.put("prisonID", oneInfo.get("prisonID"));
		map.put("prisonName", oneInfo.get("prisonName"));
		map.put("labelID", oneInfo.get("labelID"));
		map.put("labelCode", oneInfo.get("labelCode"));
		map.put("photoID", oneInfo.get("photoID"));
		map.put("photoPath", oneInfo.get("photoPath"));
		int b = callRecordMapper.saveAppCallRecord(map);
		
		//2、推送至页面
		pushToPage(b);
		resultMap.put("flag", true);
		resultMap.put("reason", "上传成功");
		resultMap.put("result", "1");
		return resultMap;
	}

	/**
	 * 推送至页面
	 * @param b
	 */
	private void pushToPage(int b) {
		Map<String,Object> parmMap = new HashMap<String,Object>();
		parmMap.put("recordID", b);
		Map<String,Object> result1 = callRecordMapper.getAppCallRecord(parmMap);

		WebSocketController wk = new WebSocketController();
		Session session = null;
		
		String oneRecord = JSON.toJSONString(result1);
		wk.onMessage(oneRecord, session);
	}

	/**
	 * 获取人数在区域/监区分布信息
	 * optType=1：获取区域信息
	 * optType=2：获取监区信息
	 */
	@Override
	public Map<String, Object> getDistribution(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("optType") == null || map.get("optType").toString().equals("")){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数optType不能为空！");
			return resultMap;
		}
		
		if(map.get("optType").toString().equals("1")){
			//获取区域及及区域下的人数
			List<Map<String,Object>> areaList = callRecordMapper.getAreaList(map);
			if(areaList.size()>0){
				resultMap.put("result", areaList);
				resultMap.put("flag", true);
				resultMap.put("reason", "查询成功！");
				return resultMap;
			}else{
				resultMap.put("result", 0);
				resultMap.put("flag", false);
				resultMap.put("reason", "查询结果为空！");
				return resultMap;
			}
		}else if(map.get("optType").toString().equals("2")){
			List<Map<String,Object>> prisonList = callRecordMapper.getPrisonList(map);//获取监区及监区的总人数
			List<Map<String,Object>> list = callRecordMapper.getPrisonRecordList(map);//统计监区点名人数
			
			for(int i=0;i<prisonList.size();i++){
				String prisonID = prisonList.get(i).get("prisonID").toString();
				String totalSum = prisonList.get(i).get("totalSum").toString();
				for(int j=0;j<list.size();j++){
					if(list.get(j).get("prisonID").toString().equals(prisonID)){
						prisonList.get(i).put("callSum", list.get(j).get("sum"));
						prisonList.get(i).put("disCallSum", Integer.parseInt(totalSum) - Integer.parseInt(list.get(j).get("sum").toString()));
						break;
					}
				}
			}
			if(prisonList.size()>0){
				resultMap.put("result", prisonList);
				resultMap.put("flag", true);
				resultMap.put("reason", "查询成功！");
				return resultMap;
			}else{
				resultMap.put("result", 0);
				resultMap.put("flag", false);
				resultMap.put("reason", "查询结果为空！");
				return resultMap;
			}
		}
		resultMap.put("result", 0);
		resultMap.put("flag", false);
		resultMap.put("reason", "程序异常，请联系管理员！");
		return resultMap;
	}

	/**
	 * 轨迹查询
	 */
	@Override
	public Map<String, Object> getTrajectory(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = callRecordMapper.getTrajectory(map);
		List<Map<String,Object>> timeList = callRecordMapper.getTimeList(map);
		//int count = callRecordMapper.getTrajectoryCount(map);
		resultMap.put("result", list);
		//resultMap.put("count", count);
		if(list.size()>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功。");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

}
