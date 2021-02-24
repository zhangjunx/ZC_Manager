package com.xr.service;

import java.util.List;
import java.util.Map;

import com.xr.entity.DictionaryData;
import com.xr.entity.DoorUnit;
import com.xr.entity.HY_MeetingRoom;

public interface HY_MeetingRoomService {

	Map<String,Object> getRoomList(Map map);

	int saveRoomInfo(HY_MeetingRoom room);

	int delRoomInfo(String fno);

	List<Map<String, Object>> getDoorList(Map<String, Object> doormap);

	int addGoodsToDictionary(String goodsName);

	List<DictionaryData> getGoodsList(Map<String, Object> goodsmap);

	Map getOneRoomInfo(String fno);

	List<Map<String, Object>> getRoomView();

}
