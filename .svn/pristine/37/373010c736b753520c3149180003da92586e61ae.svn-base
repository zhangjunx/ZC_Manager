package com.xr.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 考勤月报表(KQ_MonthData)
 * @author csc
 *  实体类
 */
public class KQ_MonthData {
	
    private Integer recordno;//主键
    
    private Integer shiftno;//班次编号

    private String holderno;//员工编号

	@DateTimeFormat(pattern="yyyy-MM-dd")
    @JSONField(format="yyyy-MM-dd")
    private Date analyDate;//日期

    private String status;//状态

    private String iodate;//打卡时间
    
    
    //无参构造
    public KQ_MonthData() {
		super();
	}

	//有参构造
	public KQ_MonthData(Integer recordno, Integer shiftno, String holderno, Date analyDate, String status,
			String iodate) {
		super();
		this.recordno = recordno;
		this.shiftno = shiftno;
		this.holderno = holderno;
		this.analyDate = analyDate;
		this.status = status;
		this.iodate = iodate;
	}

    
	public Integer getRecordno() {
		return recordno;
	}

	public void setRecordno(Integer recordno) {
		this.recordno = recordno;
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

	public Date getAnalyDate() {
		return analyDate;
	}

	public void setAnalyDate(Date analyDate) {
		this.analyDate = analyDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIodate() {
		return iodate;
	}

	public void setIodate(String iodate) {
		this.iodate = iodate;
	}
    


}