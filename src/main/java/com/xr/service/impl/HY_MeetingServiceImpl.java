package com.xr.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xr.dao.HY_MeetingMapper;
import com.xr.dao.HY_MeetingRoomMapper;
import com.xr.dao.HY_MeetingSummaryMapper;
import com.xr.dao.IODataMapper;
import com.xr.entity.DictionaryData;
import com.xr.entity.HY_Meeting;
import com.xr.entity.HY_MeetingMember;
import com.xr.entity.HY_MeetingRoom;
import com.xr.entity.HY_MeetingRoomOut;
import com.xr.entity.HY_RoomDate;
import com.xr.entity.IOData;
import com.xr.service.HY_MeetingService;
import com.xr.util.JobCURD;
import com.xr.util.QuartzManager;

@Service
public class HY_MeetingServiceImpl implements HY_MeetingService {

	@Autowired
	private HY_MeetingMapper meetingMapper;
	
	@Autowired
	private HY_MeetingRoomMapper meetingRoomMapper;
	
	@Autowired
	private HY_MeetingSummaryMapper meetingSummaryMapper;
	
	/**
	 * 获取会议列表
	 * @throws Exception 
	 */
	@Override
	public Map<String, Object> getMeetingList(Map map) throws Exception {
		//比对时间，更新会议状态
		updateMeetingStatusBefore();
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		//会议列表
		List<Map<String,Object>> list = meetingMapper.getMeetingList(map);
		
		if(list == null || list.size()==0){
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据!");
			resultMap.put("result", 0);
			return resultMap;
		}
		
		//召集人
		list = setMeetingPromoterList(list,"promoter");
		
		//审批人
		list = setMeetingPromoterList(list,"Approver");
		
		//主持人
		list = setMeetingPromoterList(list,"host");
		
		//获取会议时间time
		/*Map<String,Object> timesmap = new HashMap<String,Object>();
		timesmap.put("meetingid", "");
		List<Map<String,Object>> timeList = meetingMapper.getMeetingTimeList(timesmap);
		if(timeList.size()>0){
			list = setMeetingTime(list,timeList);
		}*/
		
		Integer count = meetingMapper.getMeetingListCount(map);
		String meetingInfoStr = JSON.toJSONString(list, SerializerFeature.DisableCircularReferenceDetect);
		resultMap.put("result", meetingInfoStr);
		resultMap.put("count", count);
		return resultMap;
	}

	//添加多个人员属性
	private List<Map<String, Object>> setMeetingPromoterList(List<Map<String, Object>> list,String entry) {
		String ids="";
		for(int i=0;i<list.size();i++){
			if(i==0){
				ids = list.get(i).get(entry).toString();
			}else{
				ids = ids +","+ list.get(i).get(entry).toString();
			}
		}
		if(ids != null && !ids.equals("")){
			Map<String,Object> pram = new HashMap<String,Object>();
			pram.put("ids", ("'"+ids+"'").replaceAll(",", "','"));
			List<Map<String, Object>> holderList = meetingMapper.getHolderListWithIds(pram);
			
			for(int i=0;i<list.size();i++){
				List<Map<String,Object>> entryLit = new ArrayList<Map<String,Object>>();
				String HolderNos = list.get(i).get(entry).toString().trim();
				for(int j = 0;j<holderList.size();j++){
					String HolderNo = holderList.get(j).get("HolderNo").toString().trim();
					if((","+HolderNos+",").indexOf(","+HolderNo+",")>=0){
						entryLit.add(holderList.get(j));
					}
				}
				list.get(i).put(entry+"List", entryLit);
			}
		}
		return list;
	}

	/**
	 * 比对会议时间更新会议状态
	 * @throws Exception
	 */
	private void updateMeetingStatusBefore() throws Exception {
		//当前时间
		Long nowTime = System.currentTimeMillis();
		
		//会议列表
		Map<String,Object> mp = new HashMap<String, Object>();
		mp.put("meetingstatus", "1,2,3");
		List<Map<String,Object>> list = meetingMapper.getMeetingList(mp);
		for(int i=0;i<list.size();i++){
			String signInStartTime = list.get(i).get("signinstarttime").toString();
			String signbackEndTime = list.get(i).get("signbackendtime").toString();
			Long startTs = TimeToStamp(signInStartTime);
			Long endTs = TimeToStamp(signbackEndTime);
			//1、审核过的会议（2），满足条件更心状态为会议中
			if((list.get(i).get("meetingstatus").toString().trim()).equals("2")){
				if(nowTime >= startTs && nowTime <= endTs){
					//更新会议状态为会议中
					Map<String,Object> param = new HashMap<String, Object>();
					param.put("meetingid", list.get(i).get("fno"));
					param.put("status", 3);
					updateMeetingStatus(param);
				}
				
				//若超过会议结束时间，直接更新为会议结束状态
				if(nowTime >= endTs){
					//更新会议状态为会议中
					Map<String,Object> param = new HashMap<String, Object>();
					param.put("meetingid", list.get(i).get("fno"));
					param.put("status", 4);
					updateMeetingStatus(param);
				}
			}
			//2、未审核的数据（1），满足条件更新会议状态为过期
			if((list.get(i).get("meetingstatus").toString().trim()).equals("1")){
				if(nowTime >= startTs){
					Map<String,Object> param = new HashMap<String, Object>();
					param.put("meetingid", list.get(i).get("fno"));
					param.put("status", 5);
					updateMeetingStatus(param);
				}
			}
			//3、状态为会议中（3），满足条件更新会议状态为会议结束
			if((list.get(i).get("meetingstatus").toString().trim()).equals("3")){
				if(nowTime >= endTs){
					Map<String,Object> param = new HashMap<String, Object>();
					param.put("meetingid", list.get(i).get("fno"));
					param.put("status", 4);
					updateMeetingStatus(param);
				}
			}
		}
	}
	
	/**
	 * yyyy-MM-dd HH:mm:ss格式的字符串转换为时间戳
	 * @param thistime
	 * @return
	 * @throws Exception
	 */
	public long TimeToStamp(String thistime) throws Exception {
		final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String mydate = thistime;
		final Date datetime = sdf.parse(mydate);//将你的日期转换为时间戳
		final long time = datetime.getTime();
		return time;
		
	}

	/**
	 * 组装会议的起始时间与结束时间
	 * 返回类型hh:mm~hh:mm
	 * @param list
	 * @param timeList
	 * @return
	 */
	private List<Map<String, Object>> setMeetingTime(List<Map<String, Object>> list,List<Map<String,Object>> timeList) {
		for(int i=0;i<list.size();i++){
			String meetingno = list.get(i).get("fno").toString();
			String timename="";
			for(int j=0;j<timeList.size();j++){
				if(timeList.get(j).get("meetingid").equals(meetingno)){
					timename = timename + "," + timeList.get(j).get("value");
				}
			}
			if(timename != null && !timename.equals("")){
				timename=timename.substring(1);
			}
			String [] strArr= timename.split(",");
			list.get(i).put("meetingtime", strArr[0]+"~"+strArr[strArr.length-1]);
		}
		return list;
	}

	/**
	 * 保存会议信息
	 * @throws ParseException 
	 */
	@Override
	public int saveMeetingInfo(Map meeting) throws ParseException {
		int b = 0;
		if(meeting.get("fno") == null || meeting.get("fno").equals("")){
			//新建会议
			b = meetingMapper.saveMeetingInfo(meeting);
			
			//根据会议主题获取新建会议的fno
			HY_Meeting m2 = meetingMapper.getThisMeetingId(meeting);
			String meetingno = m2.getFno().toString();
			
			//内部会议室
			if(meeting.get("roomtype").equals("1")){
				saveMeetingTime(meeting,meetingno);
			}
			
			//外部会议室
			if(meeting.get("roomtype").equals("2")){
				saveOutRoomInfo(meeting,meetingno);
			}
			
			//保存参议人员信息
			saveMeetingHolderInfo(meeting,meetingno);
			
			//将参议人员添加到通知表
			saveNoticeInfo(meeting,meetingno);
			
			//添加定时任务一
			/*setJob1(meeting,meetingno);
			setJob2(meeting,meetingno);*/
		}else{
			//编辑会议
			b = meetingMapper.editMeetingInfo(meeting);
			String meetingno = meeting.get("fno").toString();
			
			//内部会议室
			if(meeting.get("roomtype").equals("1")){
				saveMeetingTime(meeting,meetingno);
			}
			
			//外部会议室
			if(meeting.get("roomtype").equals("2")){
				saveOutRoomInfo(meeting,meetingno);
			}
			
			//保存参议人员信息
			saveMeetingHolderInfo(meeting,meetingno);
			
			//将参议人员添加到通知表
			saveNoticeInfo(meeting,meetingno);
			
			//添加定时任务一
			/*setJob1(meeting,meetingno);
			setJob2(meeting,meetingno);*/
		}
		
		
		
		//会议建立成功后，添加动态任务
		//任务一：当前时间在起始时间与结束时间之间，添加任务更新会议状态为 “会议中”
		//任务二：当前时间超出会议结束时间，添加任务更新会议状态为：“会议结束”
		//任务三：当前时间超出会议结束时间，但仍未审核的，更新状态为：“会议过期”
		//任务四：根据新建会议的通知时间，添加任务想参议人员发一条消息。
		return b;
	}
	
	/**
	 * 将参议人员添加到通知表
	 * @param meeting 
	 * @throws ParseException 
	 */
	private void saveNoticeInfo(Map meeting,String meetingno) throws ParseException {
		//整合通知时间
		Date noticeTime;
		//提醒时间
		long remind = Long.valueOf(meeting.get("remind").toString()).longValue();
		//签到时间
		String signInTime = meeting.get("signinstarttime").toString();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		Date date = sdf.parse(signInTime); 
		noticeTime = new Date(date.getTime() - remind*60*1000);
		
		Map<String,Object> noticeMap = new HashMap<String,Object>();
		noticeMap.put("noticetitle", "");
		noticeMap.put("noticecontent", meeting.get("remindcontext"));
		noticeMap.put("noticetype", "meetingNotice");
		noticeMap.put("noticetime", noticeTime);
		noticeMap.put("meetingid", meetingno);
		noticeMap.put("holderids", ("'"+meeting.get("person")+"'").replaceAll(",", "','"));
		meetingMapper.saveNoticeInfo(noticeMap);
	}

	/**
	 * 任务一：会议开始更新会议状态
	 * 停用
	 * @param meeting
	 * @param meetingno
	 */
	/*private void setJob1(Map meeting, String meetingno) {
		//本次会议的签到起始时间
		String thisStartTime = (String) meeting.get("signinstarttime");
		String[] a_ymd = (thisStartTime.split(" "))[0].split("-");
		String[] a_his = (thisStartTime.split(" "))[1].split(":");

		//年月日
		String a_y = a_ymd[0];
		String a_m = a_ymd[1];
		String a_d = a_ymd[2];
		
		//时分秒
		String a_h = a_his[0];
		String a_i = a_his[1];
		String a_s = a_his[2];
		
		//[秒] [分] [小时] [日] [月] [周] [年] 
		String jobCorn1 = a_s+" "+a_i+" "+a_h+" "+a_d+" "+a_m+" ? "+a_y;
		String jobanme1=meetingno+"meetingstatusjob1";
		String jobclass="com.xr.service.impl.HY_MeetingJobServiceImpl";
		Map<String,Object> mapParam1 = new HashMap<String, Object>();
		mapParam1.put("meetingid", meetingno);
		
		JobCURD.add(jobanme1,jobclass,jobCorn1,mapParam1);
	}*/
	
	/**
	 * 任务二：会议结束更新会议状态
	 * 停用
	 * @param meeting
	 * @param meetingno
	 */
	/*private void setJob2(Map meeting, String meetingno) {
		//本次会议的签到结束时间
		String thisEndTime = (String) meeting.get("signbackendtime");
		String[] z_ymd = (thisEndTime.split(" "))[0].split("-");
		String[] z_his = (thisEndTime.split(" "))[1].split(":");
		
		//年月日
		String z_y = z_ymd[0];
		String z_m = z_ymd[1];
		String z_d = z_ymd[2];
		
		//时分秒
		String z_h = z_his[0];
		String z_i = z_his[1];
		String z_s = z_his[2];
		
		//[秒] [分] [小时] [日] [月] [周] [年] 
		String jobCorn2 = z_s+" "+z_i+" "+z_h+" "+z_d+" "+z_m+" ? "+z_y;
		Long time2 = System.currentTimeMillis();
		String jobanme2=time2+"meetingstatusjob2";
		String jobclass="com.xr.service.impl.HY_MeetingJobServiceImpl";
		Map<String,Object> mapParam2 = new HashMap<String, Object>();
		mapParam2.put("meetingid", meetingno);
		
		JobCURD.add(jobanme2,jobclass,jobCorn2,mapParam2);
	}*/
	
	/**
	 * 保存会议人员信息
	 * @param meeting
	 * @param meetingno
	 */
	private void saveMeetingHolderInfo(Map meeting, String meetingno) {
		Map<String,Object> holderids = new HashMap<String,Object>();
		holderids.put("holderids", meeting.get("person").toString().split(","));
		holderids.put("meetingid", meetingno);
		meetingMapper.saveMeetingHolderInfo(holderids);
	}

	/**
	 * 保存外部会议室信息
	 * @param meeting
	 * @param meetingno
	 */
	private void saveOutRoomInfo(Map meeting, String meetingno) {
		Map<String,Object> outRoomMap = new HashMap<String,Object>();
		outRoomMap.put("meetingid", meetingno);
		outRoomMap.put("meetinglocation", meeting.get("meetinglocation"));
		outRoomMap.put("outroominid", meeting.get("outroomin").toString().split(","));
		outRoomMap.put("outroombackid", meeting.get("outroomback").toString().split(","));
		meetingMapper.saveOutRoomInfo(outRoomMap);
	}

	/**
	 * 保存内部会议室信息
	 * @param meeting
	 * @param meetingno
	 */
	private void saveMeetingTime(Map meeting,String meetingno) {
		Map<String,Object> timeMap = new HashMap<String,Object>();
		timeMap.put("roomid", meeting.get("roomid"));
		timeMap.put("meetingid", meetingno);
		timeMap.put("meetingdate", meeting.get("meetingdate"));
		String[] srt = meeting.get("roomtime").toString().split(",");
		timeMap.put("roomtime", meeting.get("roomtime").toString().split(","));
		meetingMapper.saveMeetingTime(timeMap);
	}

	/**
	 * 获取会议室时间表头
	 */
	@Override
	public List<HY_MeetingRoomOut> getTimeTitle() {
		List<HY_MeetingRoomOut> list = meetingMapper.getTimeTitle();
		return list;
	}

	/**
	 * 获取会议室被占用时间段列表
	 */
	@Override
	public List<Map<String,Object>> getUsedTimeList(Map<String,Object> selectedDate) {
		List<Map<String,Object>> list = meetingMapper.getUsedTimeList(selectedDate);
		return list;
	}

	/**
	 * 获取参议人员列表
	 */
	@Override
	public Map<String, Object> getJoinMeetingMember(String meetingid) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> parmMap = new HashMap<String,Object>();
		parmMap.put("meetingid", meetingid);
		List<HY_MeetingMember> list= meetingMapper.getJoinMeetingMember(parmMap);
		resultMap.put("result", list);
		return resultMap;
	}

	/**
	 * 获取签到/签退人员列表。querytype=1：签到，2：签退
	 */
	@Override
	public List<Map<String,Object>> getSignList(Map map) {
		//获取列表数据之前更新签到人员的状态
		updatePersonSignStatus(map);
		List<Map<String,Object>> list = meetingMapper.getSignList(map);
		return list;
	}
	
	/**
	 * 更新签到人员的状态
	 * @param map
	 */
	private void updatePersonSignStatus(Map map) {
		//签到的数据
		List<Map<String,Object>> signInList = new ArrayList<Map<String,Object>>();
		signInList = getSignInMap(map);
		meetingMapper.upMeetingPersonIStatus(signInList);
		
		//签退的数据
		List<Map<String,Object>> signBackList = new ArrayList<Map<String,Object>>();
		signBackList = getSignBackMap(map);
		meetingMapper.upMeetingPersonBStatus(signBackList);
	}
	
	/**
	 * 获取签到人员列表
	 * @param IOPersonList
	 * @param map
	 * @return
	 */
	private List<Map<String, Object>> getSignInMap(Map map) {
		//签到的数据
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String,Object>> IOPersonList = getMeetingSignList(map,"1_1,1_3");
		for(int i=0;i<IOPersonList.size();i++){
			//1、正常签到
			if(IOPersonList.get(i).get("signtype").toString().trim().equals("1_1")){
				Map<String,Object> signInMap = new HashMap<String,Object>();
				signInMap.put("holderid", IOPersonList.get(i).get("HolderNo").toString());
				signInMap.put("signindate", IOPersonList.get(i).get("IODate").toString());
				signInMap.put("status", "1");
				signInMap.put("meetingid", map.get("meetingid"));
				list.add(signInMap);
			}
			
			//2、迟到
			if(IOPersonList.get(i).get("signtype").toString().trim().equals("1_3")){
				Map<String,Object> signInMap = new HashMap<String,Object>();
				signInMap.put("holderid", IOPersonList.get(i).get("HolderNo").toString());
				signInMap.put("signindate", IOPersonList.get(i).get("IODate").toString());
				signInMap.put("status", "3");
				signInMap.put("meetingid", map.get("meetingid"));
				list.add(signInMap);
			}
		}
		return list;
	}

	/**
	 * 获取签退人员列表
	 * @param IOPersonList
	 * @param map
	 * @return
	 */
	private List<Map<String, Object>> getSignBackMap(Map map) {
		//签退的数据
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String,Object>> IOPersonList = getMeetingSignList(map,"2_1,2_3");
		for(int i=0;i<IOPersonList.size();i++){
			//签退
			if(IOPersonList.get(i).get("signtype").toString().trim().equals("2_1")){
				Map<String,Object> signBackMap = new HashMap<String,Object>();
				signBackMap.put("holderid", IOPersonList.get(i).get("HolderNo").toString());
				signBackMap.put("signbackdate", IOPersonList.get(i).get("IODate").toString());
				signBackMap.put("status", "1");
				signBackMap.put("meetingid", map.get("meetingid"));
				list.add(signBackMap);
			}
			
			//早退
			if(IOPersonList.get(i).get("signtype").toString().trim().equals("2_3")){
				Map<String,Object> signBackMap = new HashMap<String,Object>();
				signBackMap.put("holderid", IOPersonList.get(i).get("HolderNo").toString());
				signBackMap.put("signbackdate", IOPersonList.get(i).get("IODate").toString());
				signBackMap.put("status", "3");
				signBackMap.put("meetingid", map.get("meetingid"));
				list.add(signBackMap);
			}
		}
		return list;
	}

	/**
	 * 获取会议签到/签退列表
	 * 返回数据：
	 * signtype="1_1,1_3"签到
	 * signtype="2_1,2_3"签退
	 * @param map
	 * @return
	 */
	private List<Map<String, Object>> getMeetingSignList(Map map,String signtype) {
		//获取会议信息
		Map<String,Object> mm = new HashMap<String,Object>();
		mm.put("meetingno", map.get("meetingid"));
		Map<String,Object> meetinginfo = meetingMapper.getOneMeetingInfo(mm);
		
		//获取人员id字符串
		List<HY_MeetingMember> personList= meetingMapper.getJoinMeetingMember(map);
		String personIds = "";
		for(int i=0;i<personList.size();i++){
			if(i==0){
				personIds = personList.get(i).getHolderid();
			}else{
				personIds = personIds+","+personList.get(i).getHolderid();
			}
		}
		
		//获取签到（起始）/签退（起始）/会议（起始）时间
		String signInSStamp = meetinginfo.get("signinstarttime").toString();
		String signInEStamp = meetinginfo.get("signinendtime").toString();
		String signBackSStamp = meetinginfo.get("signbackstarttime").toString();
		String signBackEStamp = meetinginfo.get("signbackendtime").toString();
		String startdate = meetinginfo.get("startdate").toString();
		String enddate = meetinginfo.get("enddate").toString();
		
		//获取签到、签退门区id
		String signInDoorIds = null,signBackDoorIds = null;
		if(map.get("roomtype").toString().trim().equals("1")){
			Map room = meetingRoomMapper.getOneRoomInfo(meetinginfo.get("roomid").toString());
			signInDoorIds = room.get("signinplace").toString();
			signBackDoorIds = room.get("signbackplace").toString();
		}
		if(map.get("roomtype").toString().trim().equals("2")){
			List<Map<String,Object>> outroom = meetingRoomMapper.getOneOutRoomInfo(map.get("meetingid").toString());
			if(outroom != null){
				for(int i=0;i<outroom.size();i++){
					if(outroom.get(i).get("checktype").toString().trim().equals("1")){
						if(signInDoorIds == null || signInDoorIds.equals("")){
							signInDoorIds = (String) outroom.get(i).get("signplace");
						}else{
							signInDoorIds = signInDoorIds +","+ outroom.get(i).get("signplace");
						}
					}else if(outroom.get(i).get("checktype").toString().trim().equals("2")){
						if(signBackDoorIds == null || signBackDoorIds.equals("")){
							signBackDoorIds = (String) outroom.get(i).get("signplace");
						}else{
							signBackDoorIds = signBackDoorIds +","+ outroom.get(i).get("signplace");
						}
					}
				}
			}
			System.out.println(outroom);
		}
		
		//获取IOData表中打卡的人员（参数：签到起始时间，签到结束时间，人员id，门区）
		Map<String,Object> IOMapParm1 = new HashMap<String,Object>();
		IOMapParm1.put("signInDoorIds", signInDoorIds);
		IOMapParm1.put("signInSStamp", signInSStamp);
		IOMapParm1.put("signInEStamp", signInEStamp);

		IOMapParm1.put("signBackDoorIds", signBackDoorIds);
		IOMapParm1.put("signBackSStamp", signBackSStamp);
		IOMapParm1.put("signBackEStamp", signBackEStamp);
		IOMapParm1.put("startdate", startdate);
		IOMapParm1.put("enddate", enddate);
		IOMapParm1.put("personIds", ("'"+personIds+"'").replaceAll(",", "','"));
		IOMapParm1.put("signtype", ("'"+signtype+"'").replaceAll(",", "','"));
		List<Map<String, Object>> IOPersonList = meetingMapper.queryIORecordList(IOMapParm1);
		return IOPersonList;
	}

	/**
	 * 获取会议类型下拉框
	 */
	@Override
	public List<Map<String,Object>> getComboList(String typeName) {
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		list=meetingMapper.getComboList(typeName);
		return list;
	}

	/**
	 * 获取一条会议信息
	 */
	@Override
	public Map getOneMeetingInfo(Map map) {
		Map meetinginfo = meetingMapper.getOneMeetingInfo(map);
		
		//会议室选择的时间
		Map<String,Object> mapParm = new HashMap<String,Object>();
		mapParm.put("meetingno", meetinginfo.get("fno"));
		String meetingDate = meetinginfo.get("startdate").toString();
		meetingDate = meetingDate.substring(0, meetingDate.indexOf(" "));
		mapParm.put("selectedDate", meetingDate);
		List<Map<String,Object>> timelist = meetingMapper.getUsedTimeList(mapParm);
		
		meetinginfo.put("selectedtime", timelist);
		
		//会议签到/签退点
		if(meetinginfo.get("roomtype").equals("2")){
			List<Map<String,Object>> outRoomList = meetingMapper.getOutRoomList();
			//签到点
			List<Map<String,Object>> signinSelected = new ArrayList<Map<String,Object>>();
			for(int i=0;i<outRoomList.size();i++){
				if((outRoomList.get(i).get("checktype").toString()).equals("1")
						&& (outRoomList.get(i).get("meetingid").toString()).equals(meetinginfo.get("fno").toString())){
					signinSelected.add(outRoomList.get(i));
				}
			}
			
			//签退点
			List<Map<String,Object>> signbckSelected = new ArrayList<Map<String,Object>>();
			for(int i=0;i<outRoomList.size();i++){
				if(outRoomList.get(i).get("checktype").toString().equals("2") 
						&& outRoomList.get(i).get("meetingid").toString().equals(meetinginfo.get("fno").toString())){
					signbckSelected.add(outRoomList.get(i));
				}
			}
			meetinginfo.put("signinSelected", signinSelected);
			meetinginfo.put("signbckSelected", signbckSelected);
		}
		
		//参议人员
		Map<String,Object> parmMap = new HashMap<String,Object>();
		parmMap.put("meetingid", meetinginfo.get("fno").toString());
		List<HY_MeetingMember> person = meetingMapper.getJoinMeetingMember(parmMap);
		
		meetinginfo.put("person", person);
		
		//召集人
		if(meetinginfo.get("promoter") != null){
			Map<String,Object> promoterMap = new HashMap<String,Object>();
			promoterMap.put("HolderNos", ("'"+meetinginfo.get("promoter").toString()+"'").replaceAll(",", "','"));
			List<Map<String,Object>> Listpromoter = meetingMapper.getPersonList(promoterMap);
			meetinginfo.put("promoterList", Listpromoter);
		}
		
		//主持人
		if(meetinginfo.get("host") != null){
			Map<String,Object> hostMap = new HashMap<String,Object>();
			hostMap.put("HolderNos", ("'"+meetinginfo.get("host").toString()+"'").replaceAll(",", "','"));
			List<Map<String,Object>> listhost = meetingMapper.getPersonList(hostMap);
			System.out.println();
			meetinginfo.put("hostList", listhost);
		}
		
		//审批人
		if(meetinginfo.get("Approver") != null){
			Map<String,Object> ApproverMap = new HashMap<String,Object>();
			ApproverMap.put("HolderNos", ("'"+meetinginfo.get("Approver").toString()+"'").replaceAll(",", "','"));
			List<Map<String,Object>> ListApprover = meetingMapper.getPersonList(ApproverMap);
			meetinginfo.put("ApproverList", ListApprover);
		}
		return meetinginfo;
	}

	/**
	 * 更新会议状态
	 */
	@Override
	public void updateMeetingStatus(Map map) {
		meetingMapper.updateMeetingStatus(map);
	}

	/**
	 * 获取会议记录列表
	 */
	@Override
	public List<Map<String, Object>> getMeetingRecordList(Map<String, Object> map) {
		List<Map<String, Object>> list = meetingMapper.getMeetingList(map);
		//会议内容,会议纪要名称
		list = addAummmaryToList(list);
		
		//应到人数、实到人数
		list = addPersonNum(list);
		
		//召集人
		list = setMeetingPromoterList(list,"promoter");
		
		//主持人
		list = setMeetingPromoterList(list,"host");
		
		//审批人
		list = setMeetingPromoterList(list,"Approver");
		
		//获取会议时间time
		/*Map<String,Object> timesmap = new HashMap<String,Object>();
		timesmap.put("meetingid", "");
		List<Map<String,Object>> timeList = meetingMapper.getMeetingTimeList(timesmap);
		if(timeList.size()>0){
			list = setMeetingTime(list,timeList);
		}*/
		
		return list;
	}

	private List<Map<String, Object>> addPersonNum(List<Map<String, Object>> list) {
		//获取参议人员
		Map<String,Object> parmMap = new HashMap<String,Object>();
		List<HY_MeetingMember> attendlist= meetingMapper.getJoinMeetingMember(parmMap);
		for(int i=0;i<list.size();i++){
			Integer attendP = 0,unAttendP=0;
			String meetingid = list.get(i).get("fno").toString().trim();
			for(int j=0;j<attendlist.size();j++){
				if(attendlist.get(j).getMeetingid().toString().trim().equals(meetingid)){
					if(attendlist.get(j).getSigninstatus().toString().trim().equals("0")){
						unAttendP++;
					}else{
						attendP++;
					}
				}
			}
			list.get(i).put("attendP", attendP);
			list.get(i).put("unAttendP", unAttendP);
		}
		return list;
	}

	private List<Map<String, Object>> addAummmaryToList(List<Map<String, Object>> list) {
		List<Map<String, Object>> summaryList = meetingSummaryMapper.getSummaryList();
		for(int i=0;i<list.size();i++){
			String meetingid = list.get(i).get("fno").toString().trim();
			for(int j=0;j<summaryList.size();j++){
				if(summaryList.get(j).get("meetingid").toString().trim().equals(meetingid)){
					list.get(i).put("summaryinfo", summaryList.get(j));
				}
			}
		}
		return list;
	}

	@Override
	public Map<String, Object> getMeetingApproval(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String, Object>> list = meetingMapper.getMeetingList(map);
		int count = meetingMapper.getMeetingListCount(map);
		//召集人
		list = setMeetingPromoterList(list,"promoter");
		
		//主持人
		list = setMeetingPromoterList(list,"host");
		
		//审批人
		list = setMeetingPromoterList(list,"Approver");
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	@Override
	public int updteMeetingCancle(Map<String, Object> map) {
		int b = meetingMapper.updteMeetingCancle(map);
		return b;
	}

	@Override
	public Integer getMeetingRecordListCount(Map<String, Object> map) {
		Integer count = meetingMapper.getMeetingListCount(map);
		return count;
	}
}
