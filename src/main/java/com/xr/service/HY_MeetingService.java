package com.xr.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.xr.entity.HY_Meeting;
import com.xr.entity.HY_MeetingMember;
import com.xr.entity.HY_MeetingRoomOut;
import com.xr.entity.HY_RoomDate;

public interface HY_MeetingService {

	Map<String, Object> getMeetingList(Map map) throws Exception;

	int saveMeetingInfo(Map meeting) throws ParseException;

	List<HY_MeetingRoomOut> getTimeTitle();

	List<Map<String, Object>> getUsedTimeList(Map<String, Object> selectedDate);

	Map<String, Object> getJoinMeetingMember(String meetingid);

	List<Map<String, Object>> getSignList(Map map);

	List<Map<String,Object>> getComboList(String typeName);

	Map getOneMeetingInfo(Map map);

	void updateMeetingStatus(Map map);

	List<Map<String, Object>> getMeetingRecordList(Map<String, Object> map);

	Map<String, Object> getMeetingApproval(Map<String, Object> map);

	int updteMeetingCancle(Map<String, Object> map);

	Integer getMeetingRecordListCount(Map<String, Object> map);

}
