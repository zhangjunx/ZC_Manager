package com.xr.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.HY_MeetingMapper;
import com.xr.dao.HY_MeetingRoomMapper;
import com.xr.entity.DictionaryData;
import com.xr.entity.DoorUnit;
import com.xr.entity.HY_MeetingRoom;
import com.xr.service.HY_MeetingRoomService;

@Service
public class HY_MeetingRoomServiceImpl implements HY_MeetingRoomService {
	
	@Autowired
	private HY_MeetingRoomMapper meetingRoomMapper;
	
	@Autowired
	private HY_MeetingMapper meetingMapper;
	
	/**
	 * 获取会议室列表
	 */
	@Override
	public Map<String,Object> getRoomList(Map map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		//获取物品列表
		Map<String,Object> goodsmap = new HashMap<String,Object>();
		goodsmap.put("goodsno", "");
		List<DictionaryData> goodsList = meetingRoomMapper.getGoodsList(goodsmap);
		
		//获取门禁列表
		Map<String,Object> doormap = new HashMap<String,Object>();
		doormap.put("doorno", "");
		List<Map<String,Object>> doorList = meetingRoomMapper.getDoorList(doormap);
		
		List<HY_MeetingRoom> list = meetingRoomMapper.getRoomList(map);
		
		//使用物品
		for(int i=0;i<list.size();i++){
			if(list.get(i).getUsergoods() == null || list.get(i).getUsergoods().equals("")){
				continue;
			}
			String[] goodsIdArray = list.get(i).getUsergoods().split(",");
			String goodsName="";
			for(int j=0;j<goodsList.size();j++){
				String thisId = goodsList.get(j).getName();
				boolean b = Arrays.asList(goodsIdArray).contains(thisId);
				if(b){
					if(j==0){
						goodsName = goodsList.get(j).getValue();
					}else{
						goodsName = goodsName +","+ goodsList.get(j).getValue();
					}
				}
			}
			list.get(i).setUsergoodsname(goodsName);
		}
		
		//会议签到点
		for(int i=0;i<list.size();i++){
			if(list.get(i).getSigninplace() != null && !list.get(i).getSigninplace().equals("")){
				String[] doorIdArray = list.get(i).getSigninplace().split(",");
				String doorName="";
				for(int j=0;j<doorList.size();j++){
					String thisId = doorList.get(j).get("DoorNo").toString();
					boolean b = Arrays.asList(doorIdArray).contains(thisId);
					if(b){
						if(j==0){
							doorName = (String) doorList.get(j).get("DoorName");
						}else{
							doorName = doorName +","+ doorList.get(j).get("DoorName");
						}
					}
				}
				list.get(i).setSigninplacename(doorName);
			}
		}
		
		//会议签退点
		for(int i=0;i<list.size();i++){
			if(list.get(i).getSignbackplace() != null && !list.get(i).getSignbackplace().equals("")){
				String[] doorIdArray = list.get(i).getSignbackplace().split(",");
				String doorName="";
				for(int j=0;j<doorList.size();j++){
					String thisId = doorList.get(j).get("DoorNo").toString();
					boolean b = Arrays.asList(doorIdArray).contains(thisId);
					if(b){
						if(j==0){
							doorName = (String) doorList.get(j).get("DoorName");
						}else{
							doorName = doorName +","+ doorList.get(j).get("DoorName");
						}
					}
				}
				list.get(i).setSignbackplacename(doorName);
			}
		}
		
		//数据总量
		Integer count = meetingRoomMapper.getRoomListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	@Override
	public int saveRoomInfo(HY_MeetingRoom room) {
		int b = 0;
		if(room.getFno() == null || room.getFno().equals("")){
			b = meetingRoomMapper.saveRoomInfo(room);
		}else{
			b = meetingRoomMapper.editRoomInfo(room);
		}
		return b;
	}

	@Override
	public int delRoomInfo(String fno) {
		int b = meetingRoomMapper.delRoomInfo(fno);
		return b;
	}

	@Override
	public List<Map<String,Object>> getDoorList(Map<String,Object> doorno) {
		List<Map<String,Object>> list = meetingRoomMapper.getDoorList(doorno);
		return list;
	}

	@Override
	public int addGoodsToDictionary(String goodsName) {
		List<Map> list = new ArrayList<Map>();
		//获取字典数据类型为goods的name最大值
		Integer index = meetingRoomMapper.getMaxIndex();
		String[] goods = goodsName.split(",");
		for(int i=0;i<goods.length;i++){
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("goodsName", goods[i]);
			map.put("index", index+i+1);
			list.add(map);
		}
		
		int b = meetingRoomMapper.addGoodsToDictionary(list);
		return b;
	}

	@Override
	public List<DictionaryData> getGoodsList(Map<String,Object> goodsno) {
		List<DictionaryData> list = meetingRoomMapper.getGoodsList(goodsno);
		return list;
	}

	@Override
	public Map getOneRoomInfo(String fno) {
		Map room = meetingRoomMapper.getOneRoomInfo(fno);
		String usergoods = (String) room.get("usergoods");
		String signbackplace = (String) room.get("signbackplace");
		String signinplace = (String) room.get("signinplace");
		if(usergoods != null && !usergoods.equals("")){
			Map<String,Object> goodsmap = new HashMap<String,Object>();
			goodsmap.put("goodsno", usergoods);
			List<DictionaryData> goodslist = meetingRoomMapper.getGoodsList(goodsmap);
			room.put("goodslist", goodslist);
		}
		
		if(signbackplace != null && !signbackplace.equals("") && signbackplace.indexOf("undefined")==-1){
			Map<String,Object> doormap = new HashMap<String,Object>();
			doormap.put("doorno", signbackplace);
			List<Map<String,Object>> doorlist = meetingRoomMapper.getDoorList(doormap);
			room.put("signbacklist", doorlist);
		}
		
		if(signinplace != null && !signinplace.equals("")){
			Map<String,Object> doormap = new HashMap<String,Object>();
			doormap.put("doorno", signinplace);
			List<Map<String,Object>> doorlist = meetingRoomMapper.getDoorList(doormap);
			room.put("signinlist", doorlist);
		}
		return room;
	}

	/**
	 * 查看会议室列表
	 */
	@Override
	public List<Map<String, Object>> getRoomView() {
		//会议室列表
		List<Map<String, Object>> list = meetingRoomMapper.getRoomView();
		
		//会议列表
		List<Map<String, Object>> meetingList = meetingRoomMapper.getMeetingList();
		
		for(int i=0;i<list.size();i++){
			String roomno = list.get(i).get("fno").toString().trim();
			List<Map<String, Object>> meetingEntry = new ArrayList<Map<String, Object>>();
			for(int j=0;j<meetingList.size();j++){
				if(roomno.equals(meetingList.get(j).get("roomid").toString().trim())){
					meetingEntry.add(meetingList.get(j));
				}
			}
			list.get(i).put("meetinglist", meetingEntry);
		}
		return list;
	}
	
}
