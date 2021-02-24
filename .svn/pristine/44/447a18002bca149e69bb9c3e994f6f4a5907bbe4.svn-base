package com.xr.entity;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * @ClassName KQ_Theme
 * @Description  主题表 的实体类
 * 把出差,请假,补打卡,加班,调休融为一体的表
 * @Author csc
 * @Date 2019年10月18日 上午10:21:36
 */

public class KQ_Theme {
	
	/**
	 * @DatetimeFormat是将String转换成Date，一般前台给后台传值时用
	 * @JsonFormat将Date转换成String 一般后台传值给前台时
	 */

	 private Integer themeno;//主题编号
	 
	 private String holderno;//工号
	 
	 private String departmentno;//部门编号
	 
	 private String topictype;//qj代表请假,cc代表出差,bk代表补卡,jb代表加班,tx代表调休
	 
	 private String place;//出差地点或者门区位置
	 
	 private String causetype;//出差事由或者请假类型或者补打卡类型
	 
	 private String detailedplace;//详细地址或者请假事由或者加班事由
	 
	 @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	 @JSONField(format = "yyyy-MM-dd HH:mm:ss")  //FastJson包使用注解
	 private Date applytime;//申请人的操作时间
	 
	 @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	 @JSONField(format = "yyyy-MM-dd HH:mm:ss")  //FastJson包使用注解
	 private Date begintime;//开始时间
	 
	 @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	 @JSONField(format = "yyyy-MM-dd HH:mm:ss")  //FastJson包使用注解
	 private Date endtime;//结束时间
	 
	 @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	 @JSONField(format = "yyyy-MM-dd HH:mm:ss")  //FastJson包使用注解
	 private Date punchtime;//补打卡的申请时间或者是加班时间
	 
	 private String firstapproval;//一级审批人
	 
	 private String secondapproval;//二级审批人
	 
	 private String thirdapproval;//三级审批人
	 
	 private String auditstatus;//审批状态10是未审批,11是审批中,12是同意,13驳回
	 
	 private String operationstatus;//操作状态0是未操作,1是一级审批,2是二级审批,三是三级审批
	 
	 private String remark;//备注
	 
	 private Integer deviceno;//门区控制器编号
	 
	 private String doorname;//门区名称(小程序用,表中并没有这个字段)
	 
	 private String holdername;//员工姓名(小程序和网站用,申请表中并没有这个字段)
	 
	 private String deptname;//部门名称(小程序和网站用,申请表中并没有这个字段)
	 
	 private String curpage;//用于分页
	 
	 private String pagesize;//每页显示条数

	 //get和set方法
	public Integer getThemeno() {
		return themeno;
	}

	public void setThemeno(Integer themeno) {
		this.themeno = themeno;
	}

	public String getHolderno() {
		return holderno;
	}

	public void setHolderno(String holderno) {
		this.holderno = holderno;
	}

	public String getDepartmentno() {
		return departmentno;
	}

	public void setDepartmentno(String departmentno) {
		this.departmentno = departmentno;
	}

	public String getTopictype() {
		return topictype;
	}

	public void setTopictype(String topictype) {
		this.topictype = topictype;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getCausetype() {
		return causetype;
	}

	public void setCausetype(String causetype) {
		this.causetype = causetype;
	}

	public String getDetailedplace() {
		return detailedplace;
	}

	public void setDetailedplace(String detailedplace) {
		this.detailedplace = detailedplace;
	}

	public Date getApplytime() {
		return applytime;
	}

	public void setApplytime(Date applytime) {
		this.applytime = applytime;
	}

	public Date getBegintime() {
		return begintime;
	}

	public void setBegintime(Date begintime) {
		this.begintime = begintime;
	}

	public Date getEndtime() {
		return endtime;
	}

	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}

	public Date getPunchtime() {
		return punchtime;
	}

	public void setPunchtime(Date punchtime) {
		this.punchtime = punchtime;
	}

	public String getFirstapproval() {
		return firstapproval;
	}

	public void setFirstapproval(String firstapproval) {
		this.firstapproval = firstapproval;
	}

	public String getSecondapproval() {
		return secondapproval;
	}

	public void setSecondapproval(String secondapproval) {
		this.secondapproval = secondapproval;
	}

	public String getThirdapproval() {
		return thirdapproval;
	}

	public void setThirdapproval(String thirdapproval) {
		this.thirdapproval = thirdapproval;
	}

	public String getAuditstatus() {
		return auditstatus;
	}

	public void setAuditstatus(String auditstatus) {
		this.auditstatus = auditstatus;
	}

	public String getOperationstatus() {
		return operationstatus;
	}

	public void setOperationstatus(String operationstatus) {
		this.operationstatus = operationstatus;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getDeptname() {
		return deptname;
	}

	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}

	public Integer getDeviceno() {
		return deviceno;
	}

	public void setDeviceno(Integer deviceno) {
		this.deviceno = deviceno;
	}

	public String getCurpage() {
		return curpage;
	}

	public void setCurpage(String curpage) {
		this.curpage = curpage;
	}

	public String getPagesize() {
		return pagesize;
	}

	public void setPagesize(String pagesize) {
		this.pagesize = pagesize;
	}

    
	 
}
