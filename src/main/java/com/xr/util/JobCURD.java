package com.xr.util;

import java.util.Map;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

public class JobCURD {
	
	public static void add(String job_name,String clazz,String cron,Map<String,Object> map){
		SchedulerFactory gSchedulerFactory = new StdSchedulerFactory(); 
        Scheduler sche = null;
		try {
			sche = gSchedulerFactory.getScheduler();
		} catch (SchedulerException e) {
			e.printStackTrace();
		} 
		try {
			QuartzManager.addJob(sche, job_name, Class.forName(clazz), cron,map);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} 
	}
	
	private void del(){
		
	}

}
