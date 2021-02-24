package com.xr.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @ClassName ThreadLocalDateUtil
 * @Description 定义时间格式
 * @Author csc
 * @Date 2019年9月18日 上午10:21:15
 */
public class ThreadLocalDateUtil {

	private ThreadLocalDateUtil(){}
	
	  private static final String date_format = "yyyy-MM-dd HH:mm:ss";//定义时间格式
	  
	    private static ThreadLocal<DateFormat> threadLocal = new ThreadLocal<DateFormat>(); 
	 
	    public static DateFormat getDateFormat()   
	    {  
	        DateFormat df = threadLocal.get();  
	        if(df==null){  
	            df = new SimpleDateFormat(date_format);  
	            threadLocal.set(df);  
	        }  
	        return df;  
	    }  

	    public static String formatDate(Date date) throws ParseException {
	        return getDateFormat().format(date);
	    }

	    public static Date parse(String strDate) throws ParseException {
	        return getDateFormat().parse(strDate);
	    }   
	
}
