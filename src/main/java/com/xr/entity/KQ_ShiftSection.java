package com.xr.entity;

import java.io.Serializable;

/**
 * 班段详情表
 * @ClassName KQ_ShiftSection
 * @Description 实体类
 * @Author csc
 * @Date 2019年8月1日 下午6:38:37
 */
public class KQ_ShiftSection{
	

	private Integer sectionno;//编号主键

    private Short shiftno;//班次的主键(用于关联班次)

    private String classno;//班段几
    
    private String sectionstatus;//开始或者结束(上班或者下班)
    
    private String whichearliest;//最早打卡时间用于哪一日(z是昨日,d是当日,c是次日)

    private String workearliest;//最早打卡时间
    
    private String whichwork;//工作时间用于哪一日(z是昨日,d是当日,c是次日)

    private String worktime;//工作时间
    
    private String whichlatest;//结束时间用于哪一日 (z是昨日,d是当日,c是次日)

    private String worklatest;//结束时间
    
    private Integer nodeorder;//班段顺序

	public Integer getSectionno() {
		return sectionno;
	}

	public void setSectionno(Integer sectionno) {
		this.sectionno = sectionno;
	}

	public Short getShiftno() {
		return shiftno;
	}

	public void setShiftno(Short shiftno) {
		this.shiftno = shiftno;
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

	public String getWhichearliest() {
		return whichearliest;
	}

	public void setWhichearliest(String whichearliest) {
		this.whichearliest = whichearliest;
	}

	public String getWorkearliest() {
		return workearliest;
	}

	public void setWorkearliest(String workearliest) {
		this.workearliest = workearliest;
	}

	public String getWhichwork() {
		return whichwork;
	}

	public void setWhichwork(String whichwork) {
		this.whichwork = whichwork;
	}

	public String getWorktime() {
		return worktime;
	}

	public void setWorktime(String worktime) {
		this.worktime = worktime;
	}

	public String getWhichlatest() {
		return whichlatest;
	}

	public void setWhichlatest(String whichlatest) {
		this.whichlatest = whichlatest;
	}

	public String getWorklatest() {
		return worklatest;
	}

	public void setWorklatest(String worklatest) {
		this.worklatest = worklatest;
	}

	public Integer getNodeorder() {
		return nodeorder;
	}

	public void setNodeorder(Integer nodeorder) {
		this.nodeorder = nodeorder;
	}

    
	
    
}