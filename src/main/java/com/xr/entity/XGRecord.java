package com.xr.entity;

import java.util.Date;


import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 巡更实时记录表(XGRecord)
 * @author csc
 * 实体类
 */
public class XGRecord {
	
	/**
	 * @DatetimeFormat是将String转换成Date，一般前台给后台传值时用
	 * @JSONField将Date转换成String 一般后台传值给前台时
	 */

	private Integer recordid;//记录编号
	
	private Integer classid;//班次编号
	
	private Integer routeid;//线路编号
	
	private Integer doorno;//门区编号
	
	private Integer cardno;//卡编号
	
	private String classname;//班次名称
	
	private String routename;//线路名称
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")  //FastJson包使用注解
	private Date cardswipetime;//刷卡时间

	private String cardswipedesc;//刷卡描述
	
	private String datatype;//数据类型
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")  //FastJson包使用注解
	private Date patrolstartingtime;//规定巡更开始时间
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")  //FastJson包使用注解
	private Date patrolendingtime;//规定巡更结束时间
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")  //FastJson包使用注解
	private Date recordgenerationtime;//记录生成时间
	
	private String recorddescription;//记录描述
	
	
    //-------	
	private String doorname;//门区名称(该表中并没有这个字段)
	
	private String holdername;//员工姓名(该表中并没有这个字段)
	
	private String yearno;//年(该表中并没有这个字段)
	
	private String monthno;//月(该表中并没有这个字段)
	
	private Integer pageSize;//每页显示多少条(该表中并没有这个字段)
	
	private Integer PageNo;//第几页(该表中并没有这个字段)

	
	//get和set方法
	public Integer getRecordid() {
		return recordid;
	}

	public void setRecordid(Integer recordid) {
		this.recordid = recordid;
	}

	public Integer getClassid() {
		return classid;
	}

	public void setClassid(Integer classid) {
		this.classid = classid;
	}

	public Integer getRouteid() {
		return routeid;
	}

	public void setRouteid(Integer routeid) {
		this.routeid = routeid;
	}
	
	public Integer getDoorno() {
		return doorno;
	}

	public void setDoorno(Integer doorno) {
		this.doorno = doorno;
	}
	
	public Integer getCardno() {
		return cardno;
	}

	public void setCardno(Integer cardno) {
		this.cardno = cardno;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getRoutename() {
		return routename;
	}

	public void setRoutename(String routename) {
		this.routename = routename;
	}


	public Date getCardswipetime() {
		return cardswipetime;
	}

	public void setCardswipetime(Date cardswipetime) {
		this.cardswipetime = cardswipetime;
	}

	public String getCardswipedesc() {
		return cardswipedesc;
	}

	public void setCardswipedesc(String cardswipedesc) {
		this.cardswipedesc = cardswipedesc;
	}

	public String getDatatype() {
		return datatype;
	}

	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}


	public Date getPatrolstartingtime() {
		return patrolstartingtime;
	}

	public void setPatrolstartingtime(Date patrolstartingtime) {
		this.patrolstartingtime = patrolstartingtime;
	}

	public Date getPatrolendingtime() {
		return patrolendingtime;
	}

	public void setPatrolendingtime(Date patrolendingtime) {
		this.patrolendingtime = patrolendingtime;
	}

	public Date getRecordgenerationtime() {
		return recordgenerationtime;
	}

	public void setRecordgenerationtime(Date recordgenerationtime) {
		this.recordgenerationtime = recordgenerationtime;
	}

	public String getRecorddescription() {
		return recorddescription;
	}

	public void setRecorddescription(String recorddescription) {
		this.recorddescription = recorddescription;
	}

	public String getYearno() {
		return yearno;
	}

	public void setYearno(String yearno) {
		this.yearno = yearno;
	}

	public String getDoorname() {
		return doorname;
	}

	public void setDoorname(String doorname) {
		this.doorname = doorname;
	}

	public String getHoldername() {
		return holdername;
	}

	public void setHoldername(String holdername) {
		this.holdername = holdername;
	}

	public String getMonthno() {
		return monthno;
	}

	public void setMonthno(String monthno) {
		this.monthno = monthno;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageNo() {
		return PageNo;
	}

	public void setPageNo(Integer pageNo) {
		PageNo = pageNo;
	}//end

	 
}
