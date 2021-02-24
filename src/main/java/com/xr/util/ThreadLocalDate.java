package com.xr.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @ClassName ThreadLocalDate
 * @Description 格式化日期工具类
 * @Author csc
 * @Date 2019年11月20日 下午2:54:57
 */
public class ThreadLocalDate {

	//构造器私有化
		private ThreadLocalDate(){}

		 private static final String date_format = "HH:mm:ss";//定义时间格式
		  
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

		     /**
		      * @param date_format 日期格式
		      * @param date 需要转化的日期参数
		      * @return
		      * @throws ParseException
		      */
		    public static String formatDate(Date date) throws ParseException {
		        return getDateFormat().format(date);
		    }
             /**
              * @param date_format  日期格式
              * @param strDate 需要转化的日期参数
              * @return
              * @throws ParseException
              */
		    public static Date parse(String strDate) throws ParseException {
		        return getDateFormat().parse(strDate);
		    }   
	
}
