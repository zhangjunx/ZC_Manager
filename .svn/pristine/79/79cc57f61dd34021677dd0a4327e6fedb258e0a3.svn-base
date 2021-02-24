package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;

import com.xr.entity.DictionaryData;
import com.xr.entity.DoorUnit;
import com.xr.entity.HY_MeetingRoom;

public interface HY_MeetingRoomMapper {

	List<HY_MeetingRoom> getRoomList(Map map);

	Integer getRoomListCount(Map map);

	int saveRoomInfo(HY_MeetingRoom room);

	int editRoomInfo(HY_MeetingRoom room);

	int delRoomInfo(String fno);

	List<Map<String, Object>> getDoorList(Map<String, Object> doormap);

	int addGoodsToDictionary(List<Map> list);

	Integer getMaxIndex();

	Map getOneRoomInfo(String fno);

	List<DictionaryData> getGoodsList(@RequestParam Map<String, Object> goodsmap);

	List<Map<String, Object>> getRoomView();

	List<Map<String, Object>> getMeetingList();

	List<Map<String, Object>> getOneOutRoomInfo(String meetingid);

}