package com.xr.dao;

import java.util.List;
import java.util.Map;

import com.xr.entity.HY_Meeting;
import com.xr.entity.HY_MeetingMember;
import com.xr.entity.HY_MeetingRoom;
import com.xr.entity.HY_MeetingRoomOut;
import com.xr.entity.HY_RoomDate;
import com.xr.entity.IOData;

public interface HY_MeetingMapper {

	List<Map<String, Object>> getMeetingList(Map map);

	Integer getMeetingListCount(Map map);

	int saveMeetingInfo(Map meeting);

	int editMeetingInfo(Map meeting);

	void saveOutRoomInfo(Map outRoomMap);

	HY_Meeting getThisMeetingId(Map meeting);

	void saveMeetingHolderInfo(Map map);

	List<Map<String, Object>> getOutRoomList();

	List<HY_MeetingRoomOut> getTimeTitle();

	List<Map<String, Object>> getUsedTimeList(Map<String, Object> selectedDate);

	void saveMeetingTime(Map<String, Object> timeMap);

	List<HY_MeetingMember> getJoinMeetingMember(Map<String, Object> parmMap);

	List<Map<String, Object>> getSignList(Map map);

	List<Map<String, Object>> queryIORecordList(Map<String, Object> iOMap);

	List<Map<String, Object>> getMeetingTimeList(Map<String, Object> timesmap);

	List<Map<String, Object>> getComboList(String typeName);

	Map getOneMeetingInfo(Map map);

	List<Map<String, Object>> getPersonList(Map<String, Object> approverMap);

	void addMeetingStatusJob(Map<String, Object> jobMap);

	void updateMeetingStatus(Map map);

	void upMeetingPersonIStatus(List<Map<String, Object>> list);

	void upMeetingPersonBStatus(List<Map<String, Object>> list);

	List<Map<String, Object>> getMeetingRecordList(Map<String, Object> map);

	int updteMeetingCancle(Map<String, Object> map);

	void saveNoticeInfo(Map<String, Object> noticeMap);

	List<Map<String, Object>> getHolderListWithIds(Map<String, Object> pram);

}