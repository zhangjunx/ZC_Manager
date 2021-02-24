package com.xr.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.text.StrBuilder;

/**
 *  时间工具类
 * @author csc
 * 功能:(计算时间,获取时间)
 */
public class TimeUtil {
	
	
	static final int GONGSHI=1000*60*60;//Hour转毫秒时间公式

	/**
	 * @param startDate 开始date
	 * @param endDate   结束date
	 * @return 计算时间间隔的毫秒数
	 */
	public static String dateBetween(Date startDate, Date endDate) {
		java.util.Calendar calStart = java.util.Calendar.getInstance();
		java.util.Calendar calEnd = java.util.Calendar.getInstance();
		
		calStart.setTime(startDate);
		calEnd.setTime(endDate);
		long diffMill = calEnd.getTime().getTime() - calStart.getTime().getTime();
		System.out.println("间隔的毫秒数："+diffMill);
		return formatTime(diffMill);
	}//End
	 /**
     * 毫秒转化时分秒毫秒 
     */  
    public static String formatTime(Long ms) {  
        Integer ss = 1000;  
        Integer mi = ss * 60;  
        Integer hh = mi * 60;  
        Integer dd = hh * 24;  
      
        Long day = ms / dd;  
        Long hour = (ms - day * dd) / hh;  
        Long minute = (ms - day * dd - hour * hh) / mi;  
        Long second = (ms - day * dd - hour * hh - minute * mi) / ss;  
        Long milliSecond = ms - day * dd - hour * hh - minute * mi - second * ss;  
          
        StringBuffer sb = new StringBuffer();  
        if(day > 0) {  
            sb.append(day+"天");  
        }  
        if(hour > 0) {  
            sb.append(hour+"小时");  
        }  
        if(minute > 0) {  
            sb.append(minute+"分");  
        }  
        if(second > 0) {  
            sb.append(second+"秒");  
        }  
        if(milliSecond > 0) {  
            sb.append(milliSecond+"毫秒");  
        }  
        return sb.toString();  
    }//End
    /**
	 * 把毫秒数转换成时分秒
	 * @param millis
	 * @return
	 */
	public static String millisToStringShort(long millis) {
		StrBuilder strBuilder = new StrBuilder();
		long temp = millis;
		long hper = 60 * 60 * 1000;
		long mper = 60 * 1000;
		long sper = 1000;
		if (temp / hper > 0) {
			strBuilder.append(temp / hper).append("小时");
		}
		temp = temp % hper;
 
		if (temp / mper > 0) {
			strBuilder.append(temp / mper).append("分钟");
		}
		temp = temp % mper;
		if (temp / sper > 0) {
			strBuilder.append(temp / sper).append("秒");
		}
		return strBuilder.toString();
	}//End
	/**
	 * 把String的类型的小时数转化为long类型的毫秒数
	 * @param args
	 * @return
	 */
	public static long StringToLong(String args){
	    double zz =	Double.parseDouble(args);
		long zhuan = (long) (zz*GONGSHI);
		return zhuan;
	}//End

    
    /** 
     * 将时间字符串转换为Date类型 HH:mm
     * @param dateStr 
     * @return Date 
     */  
    public static Date stringToDate(String dateStr) {  
        Date date = null;  
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");  
        try {  
            date = sdf.parse(dateStr);  
        } catch (ParseException e) {  
            e.printStackTrace();  
        }  
        return date;  
    }//END
	/**
     * 判断当前时间是否在[startTime, endTime]区间，注意时间格式要一致
     * @param nowTime 当前时间
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    public static boolean isEffectiveDate(Date nowTime, Date startTime, Date endTime) {
        if (nowTime.getTime() == startTime.getTime()
                || nowTime.getTime() == endTime.getTime()) {
            return true;
        }
        Calendar date = Calendar.getInstance();
        date.setTime(nowTime);

        Calendar begin = Calendar.getInstance();
        begin.setTime(startTime);

        Calendar end = Calendar.getInstance();
        end.setTime(endTime);

        if (date.after(begin) && date.before(end)) {
            return true;
        } else {
            return false;
        }
    }//End
	/** 
	 * 时间比较（如果myDate>compareDate返回1，<返回-1，相等返回0） 
	 * @param myDate 时间 
	 * @param compareDate 要比较的时间 
	 * @return int 
	 */
    public static int dateCompare(Date myDate, Date compareDate) {
		Calendar myCal = Calendar.getInstance();
		Calendar compareCal = Calendar.getInstance();
		myCal.setTime(myDate);
		compareCal.setTime(compareDate);
		return myCal.compareTo(compareCal);
	}//end
    
    /**
     * 计算两个时间相差多少
     * @param endDate
     * @param nowDate
     * @return
     */
    public static Integer getDatePoor(Date endDate, Date nowDate) {
        
        long nd = 1000 * 24 * 60 * 60;
        long nh = 1000 * 60 * 60;
        long nm = 1000 * 60;
        // long ns = 1000;
        // 获得两个时间的毫秒时间差异
        long diff = endDate.getTime() - nowDate.getTime();
        // 计算差多少天
        long day = diff / nd;
        // 计算差多少小时
        long hour = diff % nd / nh;
        // 计算差多少分钟
        long min = diff % nd % nh / nm;
        // 计算差多少秒//输出结果
        // long sec = diff % nd % nh % nm / ns;
        return (int) min;
    }//end
   
    /**
     * 获取系统当前月份
     * @throws ParseException
     */
    public static String getSysMonth()  {
        SimpleDateFormat format = new SimpleDateFormat("yyyyMM");
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date); // 设置为当前时间
        calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH)); // 设置为上一个月
        date = calendar.getTime();
        String accDate = format.format(date);
        return accDate;
    }//end
     
    /**
	 * 获取某年某月有多少天
	 * @param year
	 * @param month
	 */
	public static int getDayOfMonth(int year,int month){
		Calendar c = Calendar.getInstance();
		c.set(year, month, 0); //输入类型为int类型
		return c.get(Calendar.DAY_OF_MONTH);
	}//end
     
	/**
	 * 把年月日和具体时间拼接在一起
	 * 通过格式化
	 * @throws ParseException 
	 */
	public static String splitDate(String date,String time) throws ParseException{
		 Date startTime = ThreadLocalDateUtil.parse(ThreadLocalDateTwo.formatDate(ThreadLocalDateTwo.parse(date))+" "+time);
		return ThreadLocalDateUtil.formatDate(startTime);
	}//end
     
	/**
	 * 给日期多+一天
	 * @param date
	 */
	public static Date getNextDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, +1);//+1今天的时间加一天
		date = calendar.getTime();
		return date;
	}//end
	
	/**
	 * 给日期多减一天
	 * @param date
	 */
	public static Date getUpperDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, -1);//+1今天的时间加一天
		date = calendar.getTime();
		return date;
	}//end
	
	/**
	 * 给当前时间添加几分钟
	 * @param date
	 */
	public static Date getAddMINUTE(Date date,int can) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MINUTE, +can);//给当前的时间加几分钟
		date = calendar.getTime();
		return date;
	}//end
	
	/**
	 * 给当前时间减几分钟
	 * @param date
	 */
	public static Date getCutMINUTE(Date date,int can) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MINUTE, -can);//给当前的时间减几分钟
		date = calendar.getTime();
		return date;
	}//end
	
	/**
     * 获取固定间隔时刻集合
     * @param start 开始时间
     * @param end 结束时间
     * @param interval 时间间隔(单位：分钟)
     * @return 分隔好的时间
	 * @throws ParseException 
     */
    public static List<String> getIntervalTimeList(String start,String end,int interval) throws ParseException{
        Date startDate = ThreadLocalDate.parse(start);
        Date endDate = ThreadLocalDate.parse(end);
        List<String> list = new ArrayList<>();
        while(startDate.getTime()<=endDate.getTime()){
           list.add(ThreadLocalDate.formatDate(startDate));
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            calendar.add(Calendar.MINUTE,interval);
            if(calendar.getTime().getTime()>endDate.getTime()){
                if(!startDate.equals(endDate)){
                   list.add(ThreadLocalDate.formatDate(endDate));
                }
                startDate = calendar.getTime();
            }else{
                startDate = calendar.getTime();
            }
        }
        return list;
    }//end
    
    /** 
     * 时间戳转换成日期格式字符串 
     * @param seconds 精确到秒的字符串 
     * @throws ParseException 
     * @throws NumberFormatException 
     */  
    public static String timeStamp2Date(String seconds) throws NumberFormatException, ParseException {  
        if(seconds == null || seconds.isEmpty() || seconds.equals("null")){  
            return "";  
        }  
        return ThreadLocalDateUtil.formatDate(new Date(Long.valueOf(seconds+"000")));  
    }  
    
    /** 
     * 时分秒
     * 时间戳转换成日期格式字符串 
     * @param seconds 精确到秒的字符串 
     * @throws ParseException 
     * @throws NumberFormatException 
     */  
    public static String timeStamp1Date(String seconds) throws NumberFormatException, ParseException {  
        if(seconds == null || seconds.isEmpty() || seconds.equals("null")){  
            return "";  
        }  
        return ThreadLocalDate.formatDate(new Date(Long.valueOf(seconds+"000")));  
    }  
    
    /**
     * 考勤用到自定义工具类
     * 通过staus状态(z是昨天,d是当天,c是次日)来拼接时间
     * date是(yyyy-MM-dd)
     * time是(HH:mm:ss)
     * @throws ParseException 
     */
    public static String fenxiTime(String Staus,String date , String time) throws ParseException {
    	Date parameter = null;
    	if(Staus.equals("z")) {//如果状态是昨天
    		//将拼接后的时间减去一天
    		parameter =	getUpperDay(ThreadLocalDateUtil.parse(TimeUtil.splitDate(date, time)));
    	}else  if(Staus.equals("c")){
    		//将拼接后的时间减去一天
    		parameter =	getNextDay(ThreadLocalDateUtil.parse(TimeUtil.splitDate(date, time)));
    	}else {
    		//不做任何处理
    		parameter = ThreadLocalDateUtil.parse(TimeUtil.splitDate(date, time));
    	}
    	return ThreadLocalDateUtil.formatDate(parameter);
    }//end
     

}
