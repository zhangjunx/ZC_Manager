package com.xr.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 考勤日报表(KQ_Daily)
 * @author csc
 *  实体类
 */
public class KQ_Daily {
	
  
	 private Integer dailyno;//考勤日报表
	 
	 private Integer shiftno;//班次编号
	 
	 private String holderno;//员工编号
	 
	 private String holdername;//员工姓名
	 
	 private String classno;//班段号(班段一,班段二,班段三)
	 
	 private String sectionstatus;//开始或者结束
	 
	 private String status;//考勤分析后的状态
	 
	 @DateTimeFormat(pattern="yyyy-MM-dd")
	 @JSONField(format="yyyy-MM-dd")
	 private Date analydate;//考勤分析具体日期(那一天的分析)
	 
	 private String iodate;//打卡时间
	 
	 //无参构造
	 public KQ_Daily() {
		super();
	 }
	 

	//有参构造
	public KQ_Daily(Integer dailyno, Integer shiftno, String holderno, String holdername, String classno,
				String sectionstatus,  String status, Date analydate, String iodate) {
			super();
			this.dailyno = dailyno;
			this.shiftno = shiftno;
			this.holderno = holderno;
			this.holdername = holdername;
			this.classno = classno;
			this.sectionstatus = sectionstatus;
			this.status = status;
			this.analydate = analydate;
			this.iodate = iodate;
		}

	//Get和Set方法
	public Integer getDailyno() {
		return dailyno;
	}

	public void setDailyno(Integer dailyno) {
		this.dailyno = dailyno;
	}

	public Integer getShiftno() {
		return shiftno;
	}

	public void setShiftno(Integer shiftno) {
		this.shiftno = shiftno;
	}

	public String getHolderno() {
		return holderno;
	}

	public void setHolderno(String holderno) {
		this.holderno = holderno;
	}

	public String getHoldername() {
		return holdername;
	}

	public void setHoldername(String holdername) {
		this.holdername = holdername;
	}

	public String getClassno() {
		return classno;
	}

	public void setClassno(String classno) {
		this.classno = classno;
	}

	public String getSectionstatus() {
		return sectionstatus;
	}

	public void setSectionstatus(String sectionstatus) {
		this.sectionstatus = sectionstatus;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public Date getAnalydate() {
		return analydate;
	}

	public void setAnalydate(Date analydate) {
		this.analydate = analydate;
	}

	public String getIodate() {
		return iodate;
	}

	public void setIodate(String iodate) {
		this.iodate = iodate;
	}//end
	 
	
}