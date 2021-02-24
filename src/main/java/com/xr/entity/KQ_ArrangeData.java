package com.xr.entity;

/**
 * 具体排班表
 * @author csc
 * 实体类
 */
public class KQ_ArrangeData {
	
    private Integer datano;//排班表主键

    private String holderno;//员工编号
    
    private Integer shiftno;//班次

    private String yearno;//年

    private String monthno;//月

    private String day;//日

    
    //无参构造
    public KQ_ArrangeData() {
		super();
	}

	//有参构造
    public KQ_ArrangeData(Integer datano, String holderno, String yearno, String monthno, String day, Integer shiftno) {
		super();
		this.datano = datano;
		this.holderno = holderno;
		this.yearno = yearno;
		this.monthno = monthno;
		this.day = day;
		this.shiftno = shiftno;
	}

    
    //用于考勤分析
	public KQ_ArrangeData(String holderno, String yearno, String monthno, String day) {
		super();
		this.holderno = holderno;
		this.yearno = yearno;
		this.monthno = monthno;
		this.day = day;
	}

	public Integer getDatano() {
        return datano;
    }

    public void setDatano(Integer datano) {
        this.datano = datano;
    }

    public String getHolderno() {
        return holderno;
    }

    public void setHolderno(String holderno) {
        this.holderno = holderno == null ? null : holderno.trim();
    }

    public String getYearno() {
        return yearno;
    }

    public void setYearno(String yearno) {
        this.yearno = yearno == null ? null : yearno.trim();
    }

    public String getMonthno() {
        return monthno;
    }

    public void setMonthno(String monthno) {
        this.monthno = monthno == null ? null : monthno.trim();
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day == null ? null : day.trim();
    }

    public Integer getShiftno() {
        return shiftno;
    }

    public void setShiftno(Integer shiftno) {
        this.shiftno = shiftno;
    }//end
}