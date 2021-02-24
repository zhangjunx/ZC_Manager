package com.xr.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.HY_MeetingJobMapper;
import com.xr.dao.HY_MeetingMapper;

@Service
public class HY_MeetingJobServiceImpl implements Job {
	
	@Autowired
	private HY_MeetingMapper meetingMapper;

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		System.out.println("=====================================jobstart");
		System.out.println(((Map)context.getJobDetail().getJobDataMap().get("mapParam")).get("meetingid"));
		System.out.println("=====================================jobsend");
		String meetingid = (String) ((Map)context.getJobDetail().getJobDataMap().get("mapParam")).get("meetingid");
		if(context.getJobDetail().toString().indexOf("meetingstatusjob1")>0){
			Map<String,Object> paramMap = new HashMap<String,Object>();
			paramMap.put("meetingid", meetingid);
			paramMap.put("status", 3);
			meetingMapper.updateMeetingStatus(paramMap);
		}
		if(context.getJobDetail().toString().indexOf("meetingstatusjob2")>0){
			Map<String,Object> paramMap = new HashMap<String,Object>();
			paramMap.put("meetingid", meetingid);
			paramMap.put("status", 4);
			meetingMapper.updateMeetingStatus(paramMap);
		}
	}
}
