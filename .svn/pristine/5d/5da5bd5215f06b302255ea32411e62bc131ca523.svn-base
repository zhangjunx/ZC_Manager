package com.xr.entity;

/**
 *  班次基本信息表
 * @author csc
 *  实体类
 */
public class KQ_ShiftData {
    private Integer shiftno;//主键

    private String holderno;//员工编号(用于存储是谁)
    
    private String departmentno;//部门编号

    private String shiftname;//班次名称

    private String nickname;//班次简称

    private String remark;//备注

    private String codeno;//班次颜色
    
    
    //无参构造
     public KQ_ShiftData() {
		super();
	}
   
     
     public KQ_ShiftData(String holderno, String departmentno, String shiftname, String nickname, String remark,
 			String codeno) {
 		super();
 		this.holderno = holderno;
 		this.departmentno = departmentno;
 		this.shiftname = shiftname;
 		this.nickname = nickname;
 		this.remark = remark;
 		this.codeno = codeno;
 	}

     /**
      * 用于修改
      */
 	public KQ_ShiftData(Integer shiftno, String shiftname, String nickname, String remark, String codeno) {
		super();
		this.shiftno = shiftno;
		this.shiftname = shiftname;
		this.nickname = nickname;
		this.remark = remark;
		this.codeno = codeno;
	}

 	//GET和SET方法
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
        this.holderno = holderno == null ? null : holderno.trim();
    }

    public String getShiftname() {
        return shiftname;
    }

    public void setShiftname(String shiftname) {
        this.shiftname = shiftname == null ? null : shiftname.trim();
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname == null ? null : nickname.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getCodeno() {
        return codeno;
    }

    public void setCodeno(String codeno) {
        this.codeno = codeno == null ? null : codeno.trim();
    }

	public String getDepartmentno() {
		return departmentno;
	}

	public void setDepartmentno(String departmentno) {
		this.departmentno = departmentno;
	}
    
}