package com.xr.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 内部健康打卡记录表
 * @author csc
 * NB_IOData
 */
public class NB_IOData {
	
	/**
	 * @DatetimeFormat是将String转换成Date，一般前台给后台传值时用
	 * @JSONField将Date转换成String 一般后台传值给前台时
	 */

	 private Integer ID;//主键
	 
	 private String holderno;//工号
	 
	 @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	 @JSONField(format = "yyyy-MM-dd HH:mm:ss") 
	 private Date nbdate;//健康打卡时间
	 
	 private String temperature;//温度
	 
	 private String idcardno;//身份证号
	 
	 private String nbaddress;//地址
	 
	 private String nbstatus;//进出状态
	 
	 private String longitudes;//经度
	 
	 private String latitudes;//纬度
	 
	 private String remark;//备注

	public Integer getID() {
		return ID;
	}

	public void setID(Integer iD) {
		ID = iD;
	}

	public String getHolderno() {
		return holderno;
	}

	public void setHolderno(String holderno) {
		this.holderno = holderno;
	}

	public Date getNbdate() {
		return nbdate;
	}

	public void setNbdate(Date nbdate) {
		this.nbdate = nbdate;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getIdcardno() {
		return idcardno;
	}

	public void setIdcardno(String idcardno) {
		this.idcardno = idcardno;
	}


	public String getNbaddress() {
		return nbaddress;
	}

	public void setNbaddress(String nbaddress) {
		this.nbaddress = nbaddress;
	}

	public String getNbstatus() {
		return nbstatus;
	}

	public void setNbstatus(String nbstatus) {
		this.nbstatus = nbstatus;
	}

	public String getLongitudes() {
		return longitudes;
	}

	public void setLongitudes(String longitudes) {
		this.longitudes = longitudes;
	}

	public String getLatitudes() {
		return latitudes;
	}

	public void setLatitudes(String latitudes) {
		this.latitudes = latitudes;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	 
	
}
