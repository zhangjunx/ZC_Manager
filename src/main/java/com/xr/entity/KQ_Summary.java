package com.xr.entity;

import java.util.Map;

/**
 * @ClassName KQ_Summary
 * @Description 考勤月报中,统计专用的实体类
 * @Author csc
 * @Date 2019年12月6日 上午9:50:54
 */
public class KQ_Summary{

	
	 private String holderno;//工号
	 
	 private String holdername;//员工姓名
	 
	 private String status;//考勤状态
	 
	 private String departmentno;//部门编号
	 
	 private String departmentname;//部门名称
	 
	 private Integer frequency;//次数统计

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDepartmentno() {
		return departmentno;
	}

	public void setDepartmentno(String departmentno) {
		this.departmentno = departmentno;
	}

	public String getDepartmentname() {
		return departmentname;
	}

	public void setDepartmentname(String departmentname) {
		this.departmentname = departmentname;
	}

	public Integer getFrequency() {
		return frequency;
	}

	public void setFrequency(Integer frequency) {
		this.frequency = frequency;
	}// end 
	 
	 
	
}
