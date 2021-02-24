package com.xr.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 线路巡更班次表(XGClass)
 * @author 
 * 实体类
 */
public class XGClass {
	

	 private  Integer  classid;//ClassId班次编号
	 
	 private  Integer  routeid;//RouteId路线编号
	 
	 private  String   classname;//ClassName班次名称
	 
	 private  String  startingtimeofshift;//StartingTimeOfShift班次开始时间
	 
	 private  String  closingtimeofshift;//ClosingTimeOfShift班次结束时间
	 
	 private  Integer patrolduration;//PatrolDuration巡更时间段长度
	 
	 private  Integer patrolintervallength;//PatrolIntervalLength巡更间隔时间段长度
	 
	 private  Integer classerrorrange;//ClassErrorRange允许时间误差	
	 
	 @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	 @JSONField(format="yyyy-MM-dd HH:mm:ss")
	 private Date addtime;//班次生成时间
	
	 private String holderno;//员工工号
	 
	 private String routename;//班次表中并没有这个字段,因为分页才加上的
	 
	 //无参构造
	 public XGClass() {
		super();
	 }
	 //重写toString方法,便于查看对象中属性的值信息
	@Override
	public String toString() {
		return "XGClass [classid=" + classid + ", routeid=" + routeid + ", classname=" + classname
				+ ", startingtimeofshift=" + startingtimeofshift + ", closingtimeofshift=" + closingtimeofshift
				+ ", patrolduration=" + patrolduration + ", patrolintervallength=" + patrolintervallength
				+ ", classerrorrange=" + classerrorrange + ", addtime=" + addtime + ", holderno=" + holderno + "]";
	}


	//GET和SET方法
	 public Integer getRouteid() {
		return routeid;
	}
	public void setRouteid(Integer routeid) {
		this.routeid = routeid;
	}
	public Integer getClassid() {
		return classid;
	}
	public void setClassid(Integer classid) {
		this.classid = classid;
	}
	public String getClassname() {
		return classname;
	}
	public void setClassname(String classname) {
		this.classname = classname;
	}
	public Integer getClasserrorrange() {
		return classerrorrange;
	}
	public void setClasserrorrange(Integer classerrorrange) {
		this.classerrorrange = classerrorrange;
	}
	public String getStartingtimeofshift() {
		return startingtimeofshift;
	}
	public void setStartingtimeofshift(String startingtimeofshift) {
		this.startingtimeofshift = startingtimeofshift;
	}
	public String getClosingtimeofshift() {
		return closingtimeofshift;
	}
	public void setClosingtimeofshift(String closingtimeofshift) {
		this.closingtimeofshift = closingtimeofshift;
	}
	public Integer getPatrolduration() {
		return patrolduration;
	}
	public void setPatrolduration(Integer patrolduration) {
		this.patrolduration = patrolduration;
	}
	public Integer getPatrolintervallength() {
		return patrolintervallength;
	}
	public void setPatrolintervallength(Integer patrolintervallength) {
		this.patrolintervallength = patrolintervallength;
	}
	public Date getAddtime() {
		return addtime;
	}
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}
	public String getHolderno() {
		return holderno;
	}
	public void setHolderno(String holderno) {
		this.holderno = holderno;
	}
	
	//因为分页所以加上这个
	public String getRoutename() {
		return routename;
	}
	public void setRoutename(String routename) {
		this.routename = routename;
	}//end
	
	 
}
