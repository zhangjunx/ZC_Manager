package com.xr.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.KQ_AnalysisMapper;
import com.xr.dao.KQ_DailyMapper;
import com.xr.dao.KQ_MonthDataMapper;
import com.xr.dao.KQ_ThemeMapper;
import com.xr.entity.KQ_Analysis;
import com.xr.entity.KQ_ArrangeData;
import com.xr.entity.KQ_MonthData;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.entity.KQ_Theme;
import com.xr.service.IKQ_AnalysisService;
import com.xr.service.IKQ_MonthDataService;
import com.xr.util.GetSystemDate;
import com.xr.util.ThreadLocalDateTwo;
import com.xr.util.ThreadLocalDateUtil;
import com.xr.util.TimeUtil;

/**
 * 考勤逻辑分析
 * @ClassName KQ_AnalysisMapper
 * @Description 业务实现层(ServiceImpl)
 * @Author csc
 * @Date 2019年9月16日 上午9:45:51
 * 包含考勤分析所需要的所有方法
 */
@Service
public class IKQ_AnalysisServiceImpl implements IKQ_AnalysisService {
	
	/**异常*/
	private static final String ABNORMAL="异常";
	/**休息*/
	private static final String REST="休息";
	/**空*/
	private static final String EMPTY="";
	/**请假*/
    private static final String LEAVE="请假";
    /**出差*/
	private static final String TRAVEL="出差";
	/**迟到*/
	private static final String LATE="迟到";
	/**旷工*/
	private static final String ABSENTEEISM="旷工";
	/**正常*/
	private static final String NORMAL="正常";
	/**早退*/
	private static final String LEAVEEARLY="早退";

	 @Autowired
	 private KQ_AnalysisMapper sisdao;//引入考勤分析的数据操作层
	 
	 @Autowired
	 private KQ_DailyMapper dysdao;//引入考勤日报表的数据处理层
	 
	 @Autowired	 
	 private KQ_ThemeMapper itesdao;//引入请假,出差,加班,调休,补打卡的数据处理层
	 
	 @Autowired
	 private KQ_MonthDataMapper imdsdao;//引入考勤月报的业务层
	 
	 KQ_ArrangeData arrange = new KQ_ArrangeData();//实例化排班
	 
     KQ_Analysis asis = new KQ_Analysis();//考勤分析的参数类(工号,开始时间,结束时间)
	 
	 KQ_MonthData monthdata =null;//考勤月报的实体类
	 
	 KQ_Theme theme = new KQ_Theme();//请假,出差,补打卡,加班,调休等判断的实体类
	
	// * 参数(年,月) 根据参数查询所被排版人员的工号
	@Override
	public List<Map<String, Object>> selectHolderNo(KQ_ShiftSeek seek) {
		
	 List<Map<String, Object>> jobnolist =	sisdao.selectHolderNo(seek);
		
		return jobnolist;
	}//end
	

	//  * 参数(年,月,日,工号)* 根据参数查询所被排版人员每天应该上的班次
	@Override
	public List<Map<String, Object>> selectHolderArrange(KQ_ArrangeData arrange) {
		return sisdao.selectHolderArrange(arrange);
	}//end
	 
	@Override
	public  Map<String,Object> selectIodate(KQ_Analysis asis) {
		 //* 参数(工号,开始时间,结束时间)
		  //* 根据参数查询特定时间段是否存在打卡记录.用于判断考勤
		return sisdao.selectIodate(asis);
	}//end


	 /**
	      * 考勤分析的业务处理
	 * @throws ParseException 
	  */
	@Override
	public Map<String, Object> AttendanceAnalysis(KQ_ShiftSeek seek) throws ParseException {
		
		//定义一个map返回给前端
		Map<String, Object> map =new HashMap<String, Object>();
				
	    String sysmonth = String.format("%02d", Integer.parseInt(GetSystemDate.getSysMonth()));//获取系统当前月份
		
		String yearno = seek.getYearno();// 获取年

		String monthno = seek.getMonthno();// 获取月
         //要循环的天数
		Integer days =null;
		
		//用于放入分析后的考勤状态
		Map<String, Object> revice = null;
		//放入全部的考勤分析,用于最后批量添加
		List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
		
		if(sysmonth.equals(monthno)){//如果是当月就分析系统当前日
			days=Integer.parseInt(GetSystemDate.getSysDay());
		}else{
			// 通过年月获取该年中该月有多少天
			 days = TimeUtil.getDayOfMonth(Integer.parseInt(yearno), Integer.parseInt(monthno));
		}
		List<Map<String, Object>> jobnolist =   sisdao.selectHolderNo(seek);
		//如果被排班的人员不为空
		if (jobnolist.size() != 0) {
			
			int jobnolistSize = jobnolist.size();
			for (int i = 0; i <jobnolistSize; i++)// 被排班的人做首次循环
			{  String holderno = (String) jobnolist.get(i).get("holderno");// 获取工号
			   seek.setHolderno(holderno);dysdao.deleteDaily(seek);seek.setHolderno(null);//删除以前的相同年月的考勤结果
			   for (int j = 1; j <= days; j++)// j小于等于天数
			  {     String[] array = { yearno + "-", monthno + "-", String.format("%02d", j) };// 将年月日放入数组中准备拼接
					String analyDate = StringUtils.join(array);
					// 给实体类赋值(用于传参查询)
					arrange.setHolderno(holderno);
					arrange.setYearno(yearno);
					arrange.setMonthno(monthno);
					arrange.setDay(String.format("%02d", j));
					// 先查询到用户的某月中每一天的应该上的班次和班段
					List<Map<String, Object>> shiftlist = sisdao.selectHolderArrange(arrange);
					int shiftlistSize = shiftlist.size();
					for (int k = 0; k < shiftlistSize; k++)// 循环班次和班段
					{  Integer shiftno = (Integer) shiftlist.get(k).get("shiftno");// 班次编号
						if (shiftno.equals(0) || shiftno.equals(null)) 
						{//休息
							revice = new HashMap<String, Object>();
							revice.put("classno", EMPTY);
							revice.put("sectionstatus", EMPTY);
							revice.put("iodate", EMPTY);
							revice.put("shiftno", shiftno);
							revice.put("status", REST);
							revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
							revice.put("holderno", holderno);
							result.add(revice);
						}else if(shiftno==-1 || shiftno.equals(-1)){//如果班次为-1则为异常
							revice=new HashMap<String, Object>();
							revice.put("classno", EMPTY);
							revice.put("sectionstatus", EMPTY);
							revice.put("iodate", EMPTY);
							revice.put("shiftno", -1);
							revice.put("status", ABNORMAL);
							revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
							revice.put("holderno", holderno);
				    		result.add(revice);
				    	} else {
				    		String classno = (String) shiftlist.get(k).get("classno");//获取班段几
							String sectionstatus = (String) shiftlist.get(k).get("sectionstatus");//获取上班/下班
							//获取最早打卡的状态(z是昨日,d是当日,c是次日)
							String whichearliest = (String) shiftlist.get(k).get("whichearliest");
							//获取最早打卡时间
							String workearliest = (String) shiftlist.get(k).get("workearliest");
							
							//获取签到最早时间(将年月日和打卡时间通过状态.拼接起来)
							String checkIearliest =  TimeUtil.fenxiTime(whichearliest,analyDate,workearliest);
							
							//获取工作打卡的状态(z是昨日,d是当日,c是次日)
							String whichwork = (String) shiftlist.get(k).get("whichwork");
							//获取工作时间
							String worktime = (String) shiftlist.get(k).get("worktime");
							
							//获取签到工作时间(将年月日和打卡时间通过状态.拼接起来)
							String checkInwork = TimeUtil.fenxiTime(whichwork,analyDate,worktime);
							
							//获取最晚打卡的状态(z是昨日,d是当日,c是次日)
							String whichlatest = (String) shiftlist.get(k).get("whichlatest");
							//获取最晚打卡时间
							String worklatest = (String) shiftlist.get(k).get("worklatest");

							//获取签到最晚时间(将年月日和打卡时间通过状态.拼接起来)
							String checkInlatest = TimeUtil.fenxiTime(whichlatest,analyDate,worklatest);
							
									// 放入<工号,最早打卡时间,工作打卡时间>
							asis.setHolderno(holderno);
							asis.setStarttime(checkIearliest);
							asis.setEndtime(checkInwork);
							// 查询是否在该时间段有打卡记录
							Map<String, Object> liesandwork = sisdao.selectIodate(asis);

							// 放入<工号,工作打卡时间,最晚打卡时间>
							asis.setHolderno(holderno);
							asis.setStarttime(checkInwork);
							asis.setEndtime(checkInlatest);
							// 查询该时间段是否有打卡记录
							Map<String, Object> workandlast = sisdao.selectIodate(asis);// 查询开始上班时间和结束时间的记录

							theme.setBegintime(ThreadLocalDateUtil.parse(checkInwork));// 给SQL语句中的变量赋值
							theme.setHolderno(holderno);// 给工号赋值
							theme.setAuditstatus("12");// 查询申请同意的记录
							theme.setTopictype("qj"); // qj是请假
							List<Map<String, Object>> qjlist = itesdao.selectAnalTheme(theme);// 查询班次中的上班时间是否有审批通过的请假

							theme.setTopictype("cc");// cc是出差
							List<Map<String, Object>> cclist = itesdao.selectAnalTheme(theme);// 查询班次中的上班时间是否有审批通过的出差
							// 当日中针对于<上班的分析>有(旷工,正常,迟到)
							if (sectionstatus.equals("上班")) 
							{  
								if(qjlist.size()!=0) //请假
								{   revice = new HashMap<String, Object>();
									revice.put("classno", EMPTY);
									revice.put("sectionstatus", sectionstatus);
									revice.put("iodate", EMPTY);
									revice.put("shiftno", shiftno);
									revice.put("status", LEAVE);//放入请假
									revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
									revice.put("holderno", holderno);
									result.add(revice);		
								}else if(cclist.size()!=0) //出差
								{   revice = new HashMap<String, Object>();
									revice.put("classno", EMPTY);
									revice.put("sectionstatus", sectionstatus);
									revice.put("iodate", EMPTY);
									revice.put("shiftno", shiftno);
									revice.put("status", TRAVEL);//放入出差
									revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
									revice.put("holderno", holderno);
									result.add(revice);	
								}else if((liesandwork == null) && (workandlast == null)) //两个时间都没有打卡记录旷工
								{   revice = new HashMap<String, Object>();
									revice.put("classno", EMPTY);
									revice.put("sectionstatus", sectionstatus);
									revice.put("iodate", EMPTY);
									revice.put("shiftno", shiftno);
									revice.put("status", ABSENTEEISM);//放入旷工
									revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
									revice.put("holderno", holderno);
									result.add(revice);	
								}else if((liesandwork != null) && (workandlast == null))//正常
								{   revice = new HashMap<String, Object>();
								    revice.put("classno", classno);
								    revice.put("sectionstatus", sectionstatus);
								    revice.put("iodate", liesandwork.get("small"));//上班打卡正常取最小
								    revice.put("shiftno", shiftno);
								    revice.put("status", NORMAL);//放入正常
								    revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
								    revice.put("holderno", holderno);
								    result.add(revice);	
								}else if((liesandwork == null) && (workandlast != null))//迟到
								{   revice = new HashMap<String, Object>();
								    revice.put("classno", classno);
								    revice.put("sectionstatus", sectionstatus);
								    revice.put("iodate", workandlast.get("small"));//上班打卡迟到取最小
								    revice.put("shiftno", shiftno);
								    revice.put("status", LATE);//放入正常
								    revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
								    revice.put("holderno", holderno);
								    result.add(revice);	
								}else {
									revice = new HashMap<String, Object>();
								    revice.put("classno", classno);
								    revice.put("sectionstatus", sectionstatus);
								    revice.put("iodate", liesandwork.get("small"));//上班打卡正常取最小
								    revice.put("shiftno", shiftno);
								    revice.put("status", NORMAL);//放入正常
								    revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
								    revice.put("holderno", holderno);
								    result.add(revice);}//end
							} else {//下班判断
								if(qjlist.size()!=0) //请假
								{   revice = new HashMap<String, Object>();
									revice.put("classno", EMPTY);
									revice.put("sectionstatus", sectionstatus);
									revice.put("iodate", EMPTY);
									revice.put("shiftno", shiftno);
									revice.put("status", LEAVE);//放入请假
									revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
									revice.put("holderno", holderno);
									result.add(revice);		
								}else if(cclist.size()!=0) //出差
								{   revice = new HashMap<String, Object>();
									revice.put("classno", EMPTY);
									revice.put("sectionstatus", sectionstatus);
									revice.put("iodate", EMPTY);
									revice.put("shiftno", shiftno);
									revice.put("status", TRAVEL);//放入出差
									revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
									revice.put("holderno", holderno);
									result.add(revice);	
								}else if((liesandwork == null) && (workandlast == null)) //两个时间都没有打卡记录旷工
								{   revice = new HashMap<String, Object>();
									revice.put("classno", EMPTY);
									revice.put("sectionstatus", sectionstatus);
									revice.put("iodate", EMPTY);
									revice.put("shiftno", shiftno);
									revice.put("status", ABSENTEEISM);//放入旷工
									revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
									revice.put("holderno", holderno);
									result.add(revice);	
								}else if((liesandwork != null) && (workandlast == null))//早退
								{   revice = new HashMap<String, Object>();
								    revice.put("classno", classno);
								    revice.put("sectionstatus", sectionstatus);
								    revice.put("iodate", liesandwork.get("large"));//下班打卡早退取最大
								    revice.put("shiftno", shiftno);
								    revice.put("status", LEAVEEARLY);//放入正常
								    revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
								    revice.put("holderno", holderno);
								    result.add(revice);	
								}else if((liesandwork == null) && (workandlast != null))//正常
								{   revice = new HashMap<String, Object>();
								    revice.put("classno", classno);
								    revice.put("sectionstatus", sectionstatus);
								    revice.put("iodate", workandlast.get("large"));//下班打卡正常取最大
								    revice.put("shiftno", shiftno);
								    revice.put("status", NORMAL);//放入正常
								    revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
								    revice.put("holderno", holderno);
								    result.add(revice);	
								}else {//正常
									revice = new HashMap<String, Object>();
								    revice.put("classno", classno);
								    revice.put("sectionstatus", sectionstatus);
								    revice.put("iodate", workandlast.get("large"));//下班打卡正常取最大
								    revice.put("shiftno", shiftno);
								    revice.put("status", NORMAL);//放入正常
								    revice.put("analyDate",ThreadLocalDateTwo.parse(analyDate));
								    revice.put("holderno", holderno);
								    result.add(revice);}//end
								}//end下班
				    	}//end 对shiftno 的值得判断
					}//end 循环班次和班段 
			    }//end 循环 days
			}//end jobnolist 循环读取人
			
			 //用于批量插入
		    List<Map<String, Object>> insList = new ArrayList<Map<String,Object>>();
		    
		    //一次插入的条数，也就是分批的list大小
		    int pointsDataLimit = 200;
		    int resultSize =  result.size();
	        for (int i = 0; i <resultSize;  i++) {
	            //分批次处理
	        	insList.add(result.get(i));//循环将数据填入载体list
	            if (pointsDataLimit == insList.size() || i == resultSize - 1) {  //载体list达到要求,进行批量操作
	            	dysdao.insertBatchDaily(insList); //调用批量插入
	            	insList.clear();//每次批量操作后,情况载体list,等待下次的数据填入
	            }
	        }//end for 批量插入
	           map.put("flag", true);
			   map.put("reason", "考勤分析成功");
			
		}else {
		      map.put("flag", false);
		      map.put("reason", "选择人员并没有在"+monthno+"月排版");
	   }
		return map;
	}//end AttendanceAnalysis方法

    /**
     * 统计分析的业务处理
     * @throws ParseException 
     */
	@Override
	public Map<String, Object> Reanalysis(KQ_ShiftSeek seek) throws ParseException {
		Map<String, Object> map = new HashMap<String, Object>();

		String yearno = seek.getYearno();// 获取前台传入的年

		String monthno = seek.getMonthno();// 获取前台传入的月份

		// 通过前台传过来的年和月-获取某年某月有多少天
		Integer days = TimeUtil.getDayOfMonth(Integer.parseInt(yearno), Integer.parseInt(monthno));
		// 查询某年某月被排班的人
		List<Map<String, Object>> jobnolist = sisdao.selectHolderNo(seek);

		// 用于放入分析后的结果
		List<KQ_MonthData> monthlist = new ArrayList<KQ_MonthData>();

		if (jobnolist.size() != 0) {
			int jobnolistSize = jobnolist.size();
			for (int i = 0; i < jobnolistSize; i++) {// 循环工号

				String holderno = (String) jobnolist.get(i).get("holderno");// 获取工号

				seek.setHolderno(holderno);// 更新删除用的工号
				imdsdao.deleteMonthData(seek);// 执行删除,删除以前的重复数据

				for (int j = 1; j <= days; j++) {
					String[] array = { yearno + "-", monthno + "-", String.format("%02d", j) };// 将年月日放入数组中准备拼接
					String analyDate = StringUtils.join(array);// 拼接的日期字符串(只有年月日)

					// 查询工号查询某人某日的考勤结果
					List<Map<String, Object>> result = dysdao.queryresult(holderno, analyDate);

					if (result.size() != 0) {// 如果某人某日的考勤结果不为空
						int resultSize = result.size();
						for (int k = 0; k <resultSize;  k++) {
							Integer shiftno = (int) ((short) result.get(k).get("shiftno"));// 获取班次编号
							String status = (String) result.get(k).get("status");// 获取考勤状态
							String iodate = (String) result.get(k).get("iodate");// 获取考勤状态

							if (status.equals(ABNORMAL)) {// 异常
								monthdata = new KQ_MonthData();
								monthdata.setStatus(status);
								monthdata.setIodate(iodate);
								monthdata.setHolderno(holderno);
								monthdata.setShiftno(shiftno);
								monthdata.setAnalyDate(ThreadLocalDateTwo.parse(analyDate));
								monthlist.add(monthdata);
								break;
							} else if (status.equals(LEAVE)) {// 请假
								monthdata = new KQ_MonthData();
								monthdata.setStatus(status);
								monthdata.setIodate(iodate);
								monthdata.setHolderno(holderno);
								monthdata.setShiftno(shiftno);
								monthdata.setAnalyDate(ThreadLocalDateTwo.parse(analyDate));
								monthlist.add(monthdata);
								break;
							} else if (status.equals(TRAVEL)) {// 出差
								monthdata = new KQ_MonthData();
								monthdata.setStatus(status);
								monthdata.setIodate(iodate);
								monthdata.setHolderno(holderno);
								monthdata.setShiftno(shiftno);
								monthdata.setAnalyDate(ThreadLocalDateTwo.parse(analyDate));
								monthlist.add(monthdata);
								break;
							} else if (status.equals(REST)) {// 休息
								monthdata = new KQ_MonthData();
								monthdata.setStatus(status);
								monthdata.setIodate(iodate);
								monthdata.setHolderno(holderno);
								monthdata.setShiftno(shiftno);
								monthdata.setAnalyDate(ThreadLocalDateTwo.parse(analyDate));
								monthlist.add(monthdata);
								break;
							} else if (status.equals(ABSENTEEISM)) {// 旷工
								monthdata = new KQ_MonthData();
								monthdata.setStatus(status);
								monthdata.setIodate(iodate);
								monthdata.setHolderno(holderno);
								monthdata.setShiftno(shiftno);
								monthdata.setAnalyDate(ThreadLocalDateTwo.parse(analyDate));
								monthlist.add(monthdata);
								break;
							} else if (status.equals(LATE)) {// 迟到
								monthdata = new KQ_MonthData();
								monthdata.setStatus(status);
								monthdata.setIodate(iodate);
								monthdata.setHolderno(holderno);
								monthdata.setShiftno(shiftno);
								monthdata.setAnalyDate(ThreadLocalDateTwo.parse(analyDate));
								monthlist.add(monthdata);
								break;
							} else if (status.equals(LEAVEEARLY)) {// 早退
								monthdata = new KQ_MonthData();
								monthdata.setStatus(status);
								monthdata.setIodate(iodate);
								monthdata.setHolderno(holderno);
								monthdata.setShiftno(shiftno);
								monthdata.setAnalyDate(ThreadLocalDateTwo.parse(analyDate));
								monthlist.add(monthdata);
								break;
							} else {// 正常
								if (status.equals(NORMAL) && (result.size() - 1 == k)) {
									monthdata = new KQ_MonthData();
									monthdata.setStatus(status);
									monthdata.setIodate(iodate);
									monthdata.setHolderno(holderno);
									monthdata.setShiftno(shiftno);
									monthdata.setAnalyDate(ThreadLocalDateTwo.parse(analyDate));
									monthlist.add(monthdata);
									break;
								} else {continue;}
							} // end 分析判断
						} // end 考勤结果
					} else {
						continue;
					} // end 每个人每天的考勤结果是否存在
				} // end 每天循环
			} // end 工号循环

			// 用于批量插入
			List<KQ_MonthData> insList = new ArrayList<KQ_MonthData>();

			// 一次插入的条数，也就是分批的list大小
			int pointsDataLimit = 200;
			int monthlistSize = monthlist.size();
			for (int i = 0; i < monthlistSize; i++) {
				// 分批次处理
				insList.add(monthlist.get(i));// 循环将数据填入载体list
				if (pointsDataLimit == insList.size() || i == monthlistSize - 1) { // 载体list达到要求,进行批量操作
					imdsdao.insertMonthData(insList); // 调用批量插入
					insList.clear();// 每次批量操作后,情况载体list,等待下次的数据填入
				}
			} // end for 批量插入

			map.put("flag", true);
			map.put("reason", "分析完毕");
		} else {
			map.put("flag", false);
			map.put("reason", "被选择的人在" + seek.getMonthno() + "月没有被排班");
		}
		return map;
	}//end




}
