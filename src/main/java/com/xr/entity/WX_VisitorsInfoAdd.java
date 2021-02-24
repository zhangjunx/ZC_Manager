package com.xr.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

public class WX_VisitorsInfoAdd {
    private Integer id;

    private Integer visitorsinfoid;

    private String rectype;

    private String rectypetext;

    private String visitorsname;

    private String visitorssex;

    private String visitorssextext;

    private String visitorstype;

    private String visitorsdepartmentsname;

    private String visitorsaddress;

    private String idcardno;

    private String orgname;

    private String phone;

    private String carno;

    private String issuingunit;

    private String effectdate;

    private String faildate;

    private String acscardno;

    private String nationality;

    private String visitorsstatus;

    private String visitorsstatusname;

    private Integer registerid;

    private String birthday;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date visitorsdate;

    private String visitorsstatus1;

    private Integer visitorsnumber;

    private String visitorsreason;

    private String visitorsreasontext;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date reckonleavedate;

    private String realleavedate;

    private String note;

    private String receiverpeopleid;

    private String carinfo;

    private String deposit;

    private String goodsinfo;

    private String receiversname;

    private String departments;

    private String departmentsname;

    private String receiversposition;

    private String receiversphone;

    private String isend;

    private String cardid;

    private String credentialno;

    private String workspaces;

    private String domicile;

    private String divisions;

    private String workpost;

    private String workrank;

    private String dringmodels;

    private String sendstatus;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date startdate;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date enddate;

    private String fixedtelephone;

    private String mobilephone;

    private String floorname;

    private String roomname;

    private String cardnum;
    
    private String idimgurl;

    private String dataimgurl;

    private byte[] visitorsphoto;
    

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getVisitorsinfoid() {
        return visitorsinfoid;
    }

    public void setVisitorsinfoid(Integer visitorsinfoid) {
        this.visitorsinfoid = visitorsinfoid;
    }

    public String getRectype() {
        return rectype;
    }

    public void setRectype(String rectype) {
        this.rectype = rectype == null ? null : rectype.trim();
    }

    public String getRectypetext() {
        return rectypetext;
    }

    public void setRectypetext(String rectypetext) {
        this.rectypetext = rectypetext == null ? null : rectypetext.trim();
    }

    public String getVisitorsname() {
        return visitorsname;
    }

    public void setVisitorsname(String visitorsname) {
        this.visitorsname = visitorsname == null ? null : visitorsname.trim();
    }

    public String getVisitorssex() {
        return visitorssex;
    }

    public void setVisitorssex(String visitorssex) {
        this.visitorssex = visitorssex == null ? null : visitorssex.trim();
    }

    public String getVisitorssextext() {
        return visitorssextext;
    }

    public void setVisitorssextext(String visitorssextext) {
        this.visitorssextext = visitorssextext == null ? null : visitorssextext.trim();
    }

    public String getVisitorstype() {
        return visitorstype;
    }

    public void setVisitorstype(String visitorstype) {
        this.visitorstype = visitorstype == null ? null : visitorstype.trim();
    }

    public String getVisitorsdepartmentsname() {
        return visitorsdepartmentsname;
    }

    public void setVisitorsdepartmentsname(String visitorsdepartmentsname) {
        this.visitorsdepartmentsname = visitorsdepartmentsname == null ? null : visitorsdepartmentsname.trim();
    }

    public String getVisitorsaddress() {
        return visitorsaddress;
    }

    public void setVisitorsaddress(String visitorsaddress) {
        this.visitorsaddress = visitorsaddress == null ? null : visitorsaddress.trim();
    }

    public String getIdcardno() {
        return idcardno;
    }

    public void setIdcardno(String idcardno) {
        this.idcardno = idcardno == null ? null : idcardno.trim();
    }

    public String getOrgname() {
        return orgname;
    }

    public void setOrgname(String orgname) {
        this.orgname = orgname == null ? null : orgname.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getCarno() {
        return carno;
    }

    public void setCarno(String carno) {
        this.carno = carno == null ? null : carno.trim();
    }

    public String getIssuingunit() {
        return issuingunit;
    }

    public void setIssuingunit(String issuingunit) {
        this.issuingunit = issuingunit == null ? null : issuingunit.trim();
    }

    public String getEffectdate() {
        return effectdate;
    }

    public void setEffectdate(String effectdate) {
        this.effectdate = effectdate == null ? null : effectdate.trim();
    }

    public String getFaildate() {
        return faildate;
    }

    public void setFaildate(String faildate) {
        this.faildate = faildate == null ? null : faildate.trim();
    }

    public String getAcscardno() {
        return acscardno;
    }

    public void setAcscardno(String acscardno) {
        this.acscardno = acscardno == null ? null : acscardno.trim();
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality == null ? null : nationality.trim();
    }

    public String getVisitorsstatus() {
        return visitorsstatus;
    }

    public void setVisitorsstatus(String visitorsstatus) {
        this.visitorsstatus = visitorsstatus == null ? null : visitorsstatus.trim();
    }

    public String getVisitorsstatusname() {
        return visitorsstatusname;
    }

    public void setVisitorsstatusname(String visitorsstatusname) {
        this.visitorsstatusname = visitorsstatusname == null ? null : visitorsstatusname.trim();
    }

    public Integer getRegisterid() {
        return registerid;
    }

    public void setRegisterid(Integer registerid) {
        this.registerid = registerid;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday == null ? null : birthday.trim();
    }

    public Date getVisitorsdate() {
        return visitorsdate;
    }

    public void setVisitorsdate(Date visitorsdate) {
        this.visitorsdate = visitorsdate;
    }

    public String getVisitorsstatus1() {
        return visitorsstatus1;
    }

    public void setVisitorsstatus1(String visitorsstatus1) {
        this.visitorsstatus1 = visitorsstatus1 == null ? null : visitorsstatus1.trim();
    }

    public Integer getVisitorsnumber() {
        return visitorsnumber;
    }

    public void setVisitorsnumber(Integer visitorsnumber) {
        this.visitorsnumber = visitorsnumber;
    }

    public String getVisitorsreason() {
        return visitorsreason;
    }

    public void setVisitorsreason(String visitorsreason) {
        this.visitorsreason = visitorsreason == null ? null : visitorsreason.trim();
    }

    public String getVisitorsreasontext() {
        return visitorsreasontext;
    }

    public void setVisitorsreasontext(String visitorsreasontext) {
        this.visitorsreasontext = visitorsreasontext == null ? null : visitorsreasontext.trim();
    }

    public Date getReckonleavedate() {
        return reckonleavedate;
    }

    public void setReckonleavedate(Date reckonleavedate) {
        this.reckonleavedate = reckonleavedate;
    }

    public String getRealleavedate() {
        return realleavedate;
    }

    public void setRealleavedate(String realleavedate) {
        this.realleavedate = realleavedate == null ? null : realleavedate.trim();
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }


    public String getReceiverpeopleid() {
		return receiverpeopleid;
	}

	public void setReceiverpeopleid(String receiverpeopleid) {
		this.receiverpeopleid = receiverpeopleid==null?null:receiverpeopleid.trim();
	}

	public String getCarinfo() {
        return carinfo;
    }

    public void setCarinfo(String carinfo) {
        this.carinfo = carinfo == null ? null : carinfo.trim();
    }

    public String getDeposit() {
        return deposit;
    }

    public void setDeposit(String deposit) {
        this.deposit = deposit == null ? null : deposit.trim();
    }

    public String getGoodsinfo() {
        return goodsinfo;
    }

    public void setGoodsinfo(String goodsinfo) {
        this.goodsinfo = goodsinfo == null ? null : goodsinfo.trim();
    }

    public String getReceiversname() {
        return receiversname;
    }

    public void setReceiversname(String receiversname) {
        this.receiversname = receiversname == null ? null : receiversname.trim();
    }

    public String getDepartments() {
        return departments;
    }

    public void setDepartments(String departments) {
        this.departments = departments == null ? null : departments.trim();
    }

    public String getDepartmentsname() {
        return departmentsname;
    }

    public void setDepartmentsname(String departmentsname) {
        this.departmentsname = departmentsname == null ? null : departmentsname.trim();
    }

    public String getReceiversposition() {
        return receiversposition;
    }

    public void setReceiversposition(String receiversposition) {
        this.receiversposition = receiversposition == null ? null : receiversposition.trim();
    }

    public String getReceiversphone() {
        return receiversphone;
    }

    public void setReceiversphone(String receiversphone) {
        this.receiversphone = receiversphone == null ? null : receiversphone.trim();
    }

    public String getIsend() {
        return isend;
    }

    public void setIsend(String isend) {
        this.isend = isend == null ? null : isend.trim();
    }

    public String getCardid() {
        return cardid;
    }

    public void setCardid(String cardid) {
        this.cardid = cardid == null ? null : cardid.trim();
    }

    public String getCredentialno() {
        return credentialno;
    }

    public void setCredentialno(String credentialno) {
        this.credentialno = credentialno == null ? null : credentialno.trim();
    }

    public String getWorkspaces() {
        return workspaces;
    }

    public void setWorkspaces(String workspaces) {
        this.workspaces = workspaces == null ? null : workspaces.trim();
    }

    public String getDomicile() {
        return domicile;
    }

    public void setDomicile(String domicile) {
        this.domicile = domicile == null ? null : domicile.trim();
    }

    public String getDivisions() {
        return divisions;
    }

    public void setDivisions(String divisions) {
        this.divisions = divisions == null ? null : divisions.trim();
    }

    public String getWorkpost() {
        return workpost;
    }

    public void setWorkpost(String workpost) {
        this.workpost = workpost == null ? null : workpost.trim();
    }

    public String getWorkrank() {
        return workrank;
    }

    public void setWorkrank(String workrank) {
        this.workrank = workrank == null ? null : workrank.trim();
    }

    public String getDringmodels() {
        return dringmodels;
    }

    public void setDringmodels(String dringmodels) {
        this.dringmodels = dringmodels == null ? null : dringmodels.trim();
    }

    public String getSendstatus() {
        return sendstatus;
    }

    public void setSendstatus(String sendstatus) {
        this.sendstatus = sendstatus == null ? null : sendstatus.trim();
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

    public String getFixedtelephone() {
        return fixedtelephone;
    }

    public void setFixedtelephone(String fixedtelephone) {
        this.fixedtelephone = fixedtelephone == null ? null : fixedtelephone.trim();
    }

    public String getMobilephone() {
        return mobilephone;
    }

    public void setMobilephone(String mobilephone) {
        this.mobilephone = mobilephone == null ? null : mobilephone.trim();
    }

    public String getFloorname() {
        return floorname;
    }

    public void setFloorname(String floorname) {
        this.floorname = floorname == null ? null : floorname.trim();
    }

    public String getRoomname() {
        return roomname;
    }

    public void setRoomname(String roomname) {
        this.roomname = roomname == null ? null : roomname.trim();
    }

    public String getCardnum() {
        return cardnum;
    }

    public void setCardnum(String cardnum) {
        this.cardnum = cardnum == null ? null : cardnum.trim();
    }
    
    public String getIdimgurl() {
		return idimgurl;
	}

	public void setIdimgurl(String idimgurl) {
		this.idimgurl = idimgurl== null ? null : idimgurl.trim();
	}

	public String getDataimgurl() {
		return dataimgurl;
	}

	public void setDataimgurl(String dataimgurl) {
		this.dataimgurl = dataimgurl== null ? null : dataimgurl.trim();
	}

	public byte[] getVisitorsphoto() {
        return visitorsphoto;
    }

    public void setVisitorsphoto(byte[] visitorsphoto) {
        this.visitorsphoto = visitorsphoto;
    }
}