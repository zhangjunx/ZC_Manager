package com.xr.entity;

import java.util.Date;

public class HY_Meeting {
    private Integer fno;

    private String mettingtitle;

    private String mettingtype;

    private Date startdate;

    private Date enddate;

    private String promoter;

    private String promoterphone;

    private String roomid;

    private String roomtype;

    private String host;

    private String ifcheck;

    private String remind;

    private String remindcontext;

    private String approver;

    private String creator;

    private Date creatdate;

    private String editor;

    private Date editdate;

    private String remark;
    
    private Date signinstarttime;
    
    private Date signinendtime;
    
    private Date signbackstarttime;
    
    private Date signbackendtime;
    
    private String meetingstatus;
    
    private String outroomname;
    
    //-------------------------------------
    //外部会议室签到点（门禁），多个以“，”隔开
    private String outroomin;
    //外部会议室签退点（门禁）
    private String outroomback;
    //参议人员，多个以“，”隔开
    private String holderids;
    //外部会议地点
    private String outroomplace;
    
    //选择会议室时，会议的日期
    private String meetingdate;
    
    //选择会议室时，会议的时间段，以“，”分开
    private String meetingtime;
    
	public String getOutroomname() {
		return outroomname;
	}

	public void setOutroomname(String outroomname) {
		this.outroomname = outroomname;
	}

	public String getMeetingdate() {
		return meetingdate;
	}

	public void setMeetingdate(String meetingdate) {
		this.meetingdate = meetingdate;
	}

	public String getMeetingtime() {
		return meetingtime;
	}

	public void setMeetingtime(String meetingtime) {
		this.meetingtime = meetingtime;
	}

	public String getOutroomplace() {
		return outroomplace;
	}

	public void setOutroomplace(String outroomplace) {
		this.outroomplace = outroomplace;
	}

	public String getHolderids() {
		return holderids;
	}

	public void setHolderids(String holderids) {
		this.holderids = holderids;
	}

	public String getOutroomin() {
		return outroomin;
	}

	public void setOutroomin(String outroomin) {
		this.outroomin = outroomin;
	}

	public String getOutroomback() {
		return outroomback;
	}

	public void setOutroomback(String outroomback) {
		this.outroomback = outroomback;
	}
	
	//------------------------------------
	

	public Integer getFno() {
        return fno;
    }

    public String getMeetingstatus() {
		return meetingstatus;
	}

	public void setMeetingstatus(String meetingstatus) {
		this.meetingstatus = meetingstatus;
	}

	public Date getSigninstarttime() {
		return signinstarttime;
	}

	public void setSigninstarttime(Date signinstarttime) {
		this.signinstarttime = signinstarttime;
	}

	public Date getSigninendtime() {
		return signinendtime;
	}

	public void setSigninendtime(Date signinendtime) {
		this.signinendtime = signinendtime;
	}

	public Date getSignbackstarttime() {
		return signbackstarttime;
	}

	public void setSignbackstarttime(Date signbackstarttime) {
		this.signbackstarttime = signbackstarttime;
	}

	public Date getSignbackendtime() {
		return signbackendtime;
	}

	public void setSignbackendtime(Date signbackendtime) {
		this.signbackendtime = signbackendtime;
	}

	public void setFno(Integer fno) {
        this.fno = fno;
    }

    public String getMettingtitle() {
        return mettingtitle;
    }

    public void setMettingtitle(String mettingtitle) {
        this.mettingtitle = mettingtitle == null ? null : mettingtitle.trim();
    }

    public String getMettingtype() {
        return mettingtype;
    }

    public void setMettingtype(String mettingtype) {
        this.mettingtype = mettingtype == null ? null : mettingtype.trim();
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public String getPromoter() {
        return promoter;
    }

    public void setPromoter(String promoter) {
        this.promoter = promoter == null ? null : promoter.trim();
    }

    public String getPromoterphone() {
        return promoterphone;
    }

    public void setPromoterphone(String promoterphone) {
        this.promoterphone = promoterphone == null ? null : promoterphone.trim();
    }

    public String getRoomid() {
        return roomid;
    }

    public void setRoomid(String roomid) {
        this.roomid = roomid == null ? null : roomid.trim();
    }

    public String getRoomtype() {
        return roomtype;
    }

    public void setRoomtype(String roomtype) {
        this.roomtype = roomtype == null ? null : roomtype.trim();
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host == null ? null : host.trim();
    }

    public String getIfcheck() {
        return ifcheck;
    }

    public void setIfcheck(String ifcheck) {
        this.ifcheck = ifcheck == null ? null : ifcheck.trim();
    }

    public String getRemind() {
        return remind;
    }

    public void setRemind(String remind) {
        this.remind = remind == null ? null : remind.trim();
    }

    public String getRemindcontext() {
        return remindcontext;
    }

    public void setRemindcontext(String remindcontext) {
        this.remindcontext = remindcontext == null ? null : remindcontext.trim();
    }

    public String getApprover() {
        return approver;
    }

    public void setApprover(String approver) {
        this.approver = approver == null ? null : approver.trim();
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator == null ? null : creator.trim();
    }

    public Date getCreatdate() {
        return creatdate;
    }

    public void setCreatdate(Date creatdate) {
        this.creatdate = creatdate;
    }

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor == null ? null : editor.trim();
    }

    public Date getEditdate() {
        return editdate;
    }

    public void setEditdate(Date editdate) {
        this.editdate = editdate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}