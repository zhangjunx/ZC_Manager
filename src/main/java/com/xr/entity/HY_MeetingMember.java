package com.xr.entity;

import java.util.Date;

public class HY_MeetingMember {
    private Integer fno;
    
    private String holderid;

    private Integer meetingid;

    private Date signindate;

    private Date signbackdate;

    private String signinstatus;

    private String signbackstatus;
    
    //-------------------------------------
    //人员姓名
    private String holdername;
    
    //人员头像
    private String holderimage;
    

    public String getSignbackstatus() {
		return signbackstatus;
	}

	public void setSignbackstatus(String signbackstatus) {
		this.signbackstatus = signbackstatus;
	}

	public String getHoldername() {
		return holdername;
	}

	public void setHoldername(String holdername) {
		this.holdername = holdername;
	}

	public String getHolderimage() {
		return holderimage;
	}

	public void setHolderimage(String holderimage) {
		this.holderimage = holderimage;
	}

	public String getHolderid() {
		return holderid;
	}

	public void setHolderid(String holderid) {
		this.holderid = holderid;
	}

	public Integer getFno() {
        return fno;
    }

    public void setFno(Integer fno) {
        this.fno = fno;
    }

    public Integer getMeetingid() {
        return meetingid;
    }

    public void setMeetingid(Integer meetingid) {
        this.meetingid = meetingid;
    }

    public Date getSignindate() {
        return signindate;
    }

    public void setSignindate(Date signindate) {
        this.signindate = signindate;
    }

    public Date getSignbackdate() {
        return signbackdate;
    }

    public void setSignbackdate(Date signbackdate) {
        this.signbackdate = signbackdate;
    }

    public String getSigninstatus() {
        return signinstatus;
    }

    public void setSigninstatus(String signinstatus) {
        this.signinstatus = signinstatus == null ? null : signinstatus.trim();
    }

}