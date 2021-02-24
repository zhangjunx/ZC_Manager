package com.xr.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 *  分别获取系统当前的(年),(月),(日)
 *  获取系统的当前时间
 *  yyyy-M-d
 * @author csc
 */
public class GetSystemDate {
	
    
    private  static final LocalDate localDate = LocalDate.now();
    
    
    /**
	   * 根据你想要的格式:线程安全的
	   * 获取系统当前时间.
	   * @param timeFormat
	   */
	  public static String getTodayByFormat(String timeFormat){
	        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(timeFormat));
	  }//end

	  
	/**
	 * 单独获取系统当前的年
	 * @return
	 */
	public static String getSysYear() {
		String year = String.valueOf(localDate.getYear());
		return year;
	}//end
	/**
	 * 单独获取系统当前的月份并返回
	 * @return
	 */
	public static String getSysMonth(){
		String Month = String.valueOf(localDate.getMonthValue());
		return Month;
	}//end
	/**
	 * 单独获取系统当前的日并返回出来
	 * LocalDate中getDayOfYear是获取当天是一年中的第几天
	 * LocalDate中getDayOfMonth是获取当前月时间的天
	 * @return
	 */
	  public static String getSysDay(){
		  //获取系统当前日期中的日并返回出来
		String Day = String.valueOf(localDate.getDayOfMonth());
		return Day;
	}//end
	  
	  
	  public static void main(String[] args) {
		 System.out.println(getTodayByFormat("yyyy-MM-dd HH:mm:ss"));
	}

}
