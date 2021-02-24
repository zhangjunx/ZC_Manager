package com.xr.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @ClassName ThreadLocalDateThree
 * @Description 定义时间格式
 * @Author csc
 * @Date 2019年9月18日 上午10:21:15
 */
public class ThreadLocalDateThree {

	 private ThreadLocalDateThree(){};
	 
	  
	    private static ThreadLocal<DateFormat> threadLocal = new ThreadLocal<DateFormat>(); 
	 
	    public static DateFormat getDateFormat(String fommert)   
	    {  
	        DateFormat df = threadLocal.get();  
	        if(df==null){  
	            df = new SimpleDateFormat(fommert);  
	            threadLocal.set(df);  
	        }  
	        return df;  
	    }  

	    public static String formatDate(Date date,String fommert) throws ParseException {
	        return getDateFormat(fommert).format(date);
	    }

	    public static Date parse(String strDate,String fommert) throws ParseException {
	        return getDateFormat(fommert).parse(strDate);
	    }   
	
	
}
