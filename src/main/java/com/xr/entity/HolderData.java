package com.xr.entity;

import java.util.Arrays;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 员工表(HolderData)
 * @author csc
 * 实体类
 */
public class HolderData {
	 
    private String holderno;//工号
    
    private String holdername;//姓名
    
    private String showtext;
    
    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date birthday;//生日

    private String departmentno;

    private String titleno;//职务关联外键

    private String typeno;

    private Short enabled;

    private String pin;

    private Short punchcard;

    private String definable1;

    private String definable2;

    private String site;

    private String area;

    private String email;
    
    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date startdate;//入职日期

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date expireddate;//离职日期

    private String superiorno1;

    private String superiorno2;

    private String superiorno3;

    private String holderpassword;

    private Short announceflag;

    private Short loginflag;

    private Short checkmark;

    private String description;

    private Integer sequenceno;
    
    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date deposit01;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date deposit02;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date deposit03;

    private String deposit04;
    
    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date powerstartdate;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date powerenddate;

    private String powerstatus;

    private Integer periodvalidity;

    private String nationname;

    private String idcode;

    private String sexname;

    private String regorg;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date idstartdate;

    @JSONField(format="yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date idenddate;

    private String cardid;

    private String cardtypename;

    private String floorroom;

    private String telephone;

    private String fixedtelephone;

    private String mobilephone;//手机号

    private String floorname;

    private String roomname;

    private Integer datano;

    private Integer cardno;

    private String netnode;

    private String holderstatus;

    private String issupperadmin;

    private String companyname;

    private String phone;

    private String emptype;//工种

    private String maxeducation;

    private String politicface;

    private String holdercard;

    private String graduateschool;

    private String majorsubject;

    private String marrystatus;

    private String bankcard;

    private String nativeplace;

    private String warningname;

    private String createperson;

    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date createdate;

    private String updateperson;

    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date updatedate;

    private String delperson;

    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date deldate;

    private String deleted;
    
    private String holderrole;
    
    private String loginpassword;
    
    private Integer roleid;
    
    private String imgurl;
    
    private String personid;

    private byte[] photo;
    
    private String wechatno;//微信号(openid)
    
    private String cwtype;
    
    private Integer accountid;//小程序账户
    
    private String archivesno; 
	@Override
	public String toString() {
		return "HolderData [holderno=" + holderno + ", holdername=" + holdername + ", showtext=" + showtext
				+ ", birthday=" + birthday + ", departmentno=" + departmentno + ", titleno=" + titleno + ", typeno="
				+ typeno + ", enabled=" + enabled + ", pin=" + pin + ", punchcard=" + punchcard + ", definable1="
				+ definable1 + ", definable2=" + definable2 + ", site=" + site + ", area=" + area + ", email=" + email
				+ ", startdate=" + startdate + ", expireddate=" + expireddate + ", superiorno1=" + superiorno1
				+ ", superiorno2=" + superiorno2 + ", superiorno3=" + superiorno3 + ", holderpassword=" + holderpassword
				+ ", announceflag=" + announceflag + ", loginflag=" + loginflag + ", checkmark=" + checkmark
				+ ", description=" + description + ", sequenceno=" + sequenceno + ", deposit01=" + deposit01
				+ ", deposit02=" + deposit02 + ", deposit03=" + deposit03 + ", deposit04=" + deposit04
				+ ", powerstartdate=" + powerstartdate + ", powerenddate=" + powerenddate + ", powerstatus="
				+ powerstatus + ", periodvalidity=" + periodvalidity + ", nationname=" + nationname + ", idcode="
				+ idcode + ", sexname=" + sexname + ", regorg=" + regorg + ", idstartdate=" + idstartdate
				+ ", idenddate=" + idenddate + ", cardid=" + cardid + ", cardtypename=" + cardtypename + ", floorroom="
				+ floorroom + ", telephone=" + telephone + ", fixedtelephone=" + fixedtelephone + ", mobilephone="
				+ mobilephone + ", floorname=" + floorname + ", roomname=" + roomname + ", datano=" + datano
				+ ", cardno=" + cardno + ", netnode=" + netnode + ", holderstatus=" + holderstatus + ", issupperadmin="
				+ issupperadmin + ", companyname=" + companyname + ", phone=" + phone + ", emptype=" + emptype
				+ ", maxeducation=" + maxeducation + ", politicface=" + politicface + ", holdercard=" + holdercard
				+ ", graduateschool=" + graduateschool + ", majorsubject=" + majorsubject + ", marrystatus="
				+ marrystatus + ", bankcard=" + bankcard + ", nativeplace=" + nativeplace + ", warningname="
				+ warningname + ", createperson=" + createperson + ", createdate=" + createdate + ", updateperson="
				+ updateperson + ", updatedate=" + updatedate + ", delperson=" + delperson + ", deldate=" + deldate
				+ ", deleted=" + deleted + ", loginpassword=" + loginpassword + ", roleid=" + roleid + ", imgurl="
				+ imgurl + ", photo=" + Arrays.toString(photo) + ", wechatno=" + wechatno + "]";
	}

	public HolderData() {
		super();
	}

	//此构造方法用于添加Excel传入的员工信息
    public HolderData(String holderno, String holdername, String departmentno, String titleno, Date startdate,
			String idcode, String sexname, String emptype, String holdercard) {
		super();
		this.holderno = holderno;
		this.holdername = holdername;
		this.departmentno = departmentno;
		this.titleno = titleno;
		this.startdate = startdate;
		this.idcode = idcode;
		this.sexname = sexname;
		this.emptype = emptype;
		this.holdercard = holdercard;
	}

	 

	public String getHolderno() {
        return holderno;
    }

    public void setHolderno(String holderno) {
        this.holderno = holderno == null ? null : holderno.trim();
    }

    public String getHoldername() {
        return holdername;
    }

    public void setHoldername(String holdername) {
        this.holdername = holdername == null ? null : holdername.trim();
    }

    public String getShowtext() {
        return showtext;
    }

    public void setShowtext(String showtext) {
        this.showtext = showtext == null ? null : showtext.trim();
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getDepartmentno() {
        return departmentno;
    }

    public void setDepartmentno(String departmentno) {
        this.departmentno = departmentno == null ? null : departmentno.trim();
    }

    public String getTitleno() {
        return titleno;
    }

    public void setTitleno(String titleno) {
        this.titleno = titleno == null ? null : titleno.trim();
    }

    public String getTypeno() {
        return typeno;
    }

    public void setTypeno(String typeno) {
        this.typeno = typeno == null ? null : typeno.trim();
    }

    public Short getEnabled() {
        return enabled;
    }

    public void setEnabled(Short enabled) {
        this.enabled = enabled;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin == null ? null : pin.trim();
    }

    public Short getPunchcard() {
        return punchcard;
    }

    public void setPunchcard(Short punchcard) {
        this.punchcard = punchcard;
    }

    public String getDefinable1() {
        return definable1;
    }

    public void setDefinable1(String definable1) {
        this.definable1 = definable1 == null ? null : definable1.trim();
    }

    public String getDefinable2() {
        return definable2;
    }

    public void setDefinable2(String definable2) {
        this.definable2 = definable2 == null ? null : definable2.trim();
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site == null ? null : site.trim();
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area == null ? null : area.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getExpireddate() {
        return expireddate;
    }

    public void setExpireddate(Date expireddate) {
        this.expireddate = expireddate;
    }

    public String getSuperiorno1() {
        return superiorno1;
    }

    public void setSuperiorno1(String superiorno1) {
        this.superiorno1 = superiorno1 == null ? null : superiorno1.trim();
    }

    public String getSuperiorno2() {
        return superiorno2;
    }

    public void setSuperiorno2(String superiorno2) {
        this.superiorno2 = superiorno2 == null ? null : superiorno2.trim();
    }

    public String getSuperiorno3() {
        return superiorno3;
    }

    public void setSuperiorno3(String superiorno3) {
        this.superiorno3 = superiorno3 == null ? null : superiorno3.trim();
    }

    public String getHolderpassword() {
        return holderpassword;
    }

    public void setHolderpassword(String holderpassword) {
        this.holderpassword = holderpassword == null ? null : holderpassword.trim();
    }

    public Short getAnnounceflag() {
        return announceflag;
    }

    public void setAnnounceflag(Short announceflag) {
        this.announceflag = announceflag;
    }

    public Short getLoginflag() {
        return loginflag;
    }

    public void setLoginflag(Short loginflag) {
        this.loginflag = loginflag;
    }

    public Short getCheckmark() {
        return checkmark;
    }

    public void setCheckmark(Short checkmark) {
        this.checkmark = checkmark;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Integer getSequenceno() {
        return sequenceno;
    }

    public void setSequenceno(Integer sequenceno) {
        this.sequenceno = sequenceno;
    }

    public Date getDeposit01() {
        return deposit01;
    }

    public void setDeposit01(Date deposit01) {
        this.deposit01 = deposit01;
    }

    public Date getDeposit02() {
        return deposit02;
    }

    public void setDeposit02(Date deposit02) {
        this.deposit02 = deposit02;
    }

    public Date getDeposit03() {
        return deposit03;
    }

    public void setDeposit03(Date deposit03) {
        this.deposit03 = deposit03;
    }

    public String getDeposit04() {
        return deposit04;
    }

    public void setDeposit04(String deposit04) {
        this.deposit04 = deposit04 == null ? null : deposit04.trim();
    }

    public Date getPowerstartdate() {
        return powerstartdate;
    }

    public void setPowerstartdate(Date powerstartdate) {
        this.powerstartdate = powerstartdate;
    }

    public Date getPowerenddate() {
        return powerenddate;
    }

    public void setPowerenddate(Date powerenddate) {
        this.powerenddate = powerenddate;
    }

    public String getPowerstatus() {
        return powerstatus;
    }

    public void setPowerstatus(String powerstatus) {
        this.powerstatus = powerstatus == null ? null : powerstatus.trim();
    }

    public Integer getPeriodvalidity() {
        return periodvalidity;
    }

    public void setPeriodvalidity(Integer periodvalidity) {
        this.periodvalidity = periodvalidity;
    }

    public String getNationname() {
        return nationname;
    }

    public void setNationname(String nationname) {
        this.nationname = nationname == null ? null : nationname.trim();
    }

    public String getIdcode() {
        return idcode;
    }

    public void setIdcode(String idcode) {
        this.idcode = idcode == null ? null : idcode.trim();
    }

    public String getSexname() {
        return sexname;
    }

    public void setSexname(String sexname) {
        this.sexname = sexname == null ? null : sexname.trim();
    }

    public String getRegorg() {
        return regorg;
    }

    public void setRegorg(String regorg) {
        this.regorg = regorg == null ? null : regorg.trim();
    }

    public Date getIdstartdate() {
        return idstartdate;
    }

    public void setIdstartdate(Date idstartdate) {
        this.idstartdate = idstartdate;
    }

    public Date getIdenddate() {
        return idenddate;
    }

    public void setIdenddate(Date idenddate) {
        this.idenddate = idenddate;
    }

    public String getCardid() {
        return cardid;
    }

    public void setCardid(String cardid) {
        this.cardid = cardid == null ? null : cardid.trim();
    }

    public String getCardtypename() {
        return cardtypename;
    }

    public void setCardtypename(String cardtypename) {
        this.cardtypename = cardtypename == null ? null : cardtypename.trim();
    }

    public String getFloorroom() {
        return floorroom;
    }

    public void setFloorroom(String floorroom) {
        this.floorroom = floorroom == null ? null : floorroom.trim();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
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

    public Integer getDatano() {
        return datano;
    }

    public void setDatano(Integer datano) {
        this.datano = datano;
    }

    public Integer getCardno() {
        return cardno;
    }

    public void setCardno(Integer cardno) {
        this.cardno = cardno;
    }

    public String getNetnode() {
        return netnode;
    }

    public void setNetnode(String netnode) {
        this.netnode = netnode == null ? null : netnode.trim();
    }

    public String getHolderstatus() {
        return holderstatus;
    }

    public void setHolderstatus(String holderstatus) {
        this.holderstatus = holderstatus == null ? null : holderstatus.trim();
    }

    public String getIssupperadmin() {
        return issupperadmin;
    }

    public void setIssupperadmin(String issupperadmin) {
        this.issupperadmin = issupperadmin == null ? null : issupperadmin.trim();
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname == null ? null : companyname.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getEmptype() {
        return emptype;
    }

    public void setEmptype(String emptype) {
        this.emptype = emptype == null ? null : emptype.trim();
    }

    public String getMaxeducation() {
        return maxeducation;
    }

    public void setMaxeducation(String maxeducation) {
        this.maxeducation = maxeducation == null ? null : maxeducation.trim();
    }

    public String getPoliticface() {
        return politicface;
    }

    public void setPoliticface(String politicface) {
        this.politicface = politicface == null ? null : politicface.trim();
    }

    public String getHoldercard() {
        return holdercard;
    }

    public void setHoldercard(String holdercard) {
        this.holdercard = holdercard == null ? null : holdercard.trim();
    }

    public String getGraduateschool() {
        return graduateschool;
    }

    public void setGraduateschool(String graduateschool) {
        this.graduateschool = graduateschool == null ? null : graduateschool.trim();
    }

    public String getMajorsubject() {
        return majorsubject;
    }

    public void setMajorsubject(String majorsubject) {
        this.majorsubject = majorsubject == null ? null : majorsubject.trim();
    }

    public String getMarrystatus() {
        return marrystatus;
    }

    public void setMarrystatus(String marrystatus) {
        this.marrystatus = marrystatus == null ? null : marrystatus.trim();
    }

    public String getBankcard() {
        return bankcard;
    }

    public void setBankcard(String bankcard) {
        this.bankcard = bankcard == null ? null : bankcard.trim();
    }

    public String getNativeplace() {
        return nativeplace;
    }

    public void setNativeplace(String nativeplace) {
        this.nativeplace = nativeplace == null ? null : nativeplace.trim();
    }

    public String getWarningname() {
        return warningname;
    }

    public void setWarningname(String warningname) {
        this.warningname = warningname == null ? null : warningname.trim();
    }

    public String getCreateperson() {
        return createperson;
    }

    public void setCreateperson(String createperson) {
        this.createperson = createperson == null ? null : createperson.trim();
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public String getUpdateperson() {
        return updateperson;
    }

    public void setUpdateperson(String updateperson) {
        this.updateperson = updateperson == null ? null : updateperson.trim();
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public String getDelperson() {
        return delperson;
    }

    public void setDelperson(String delperson) {
        this.delperson = delperson == null ? null : delperson.trim();
    }

    public Date getDeldate() {
        return deldate;
    }

    public void setDeldate(Date deldate) {
        this.deldate = deldate;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted == null ? null : deleted.trim();
    }
    
    

    public String getHolderrole() {
		return holderrole;
	}

	public void setHolderrole(String holderrole) {
		this.holderrole = holderrole==null? null:holderrole.trim();
	}

	public String getLoginpassword() {
		return loginpassword;
	}

	public void setLoginpassword(String loginpassword) {
		this.loginpassword = loginpassword==null? null:loginpassword.trim();
	}
	
	public String getPersonid() {
		return personid;
	}

	public void setPersonid(String personid) {
		this.personid = personid==null? null:personid.trim();
	}

	public String getCwtype() {
		return cwtype;
	}

	public void setCwtype(String cwtype) {
		this.cwtype = cwtype==null? null:cwtype.trim();
	}

	public String getArchivesno() {
		return archivesno;
	}

	public void setArchivesno(String archivesno) {
		this.archivesno = archivesno==null? null:archivesno.trim();
	}

	public Integer getRoleid() {
		return roleid;
	}

	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}
	
	public String getImgurl() {
		return imgurl;
	}

	public void setImgurl(String imgurl) {
		this.imgurl = imgurl==null ? null : imgurl.trim();
	}

	public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

	public String getWechatno() {
		return wechatno;
	}

	public void setWechatno(String wechatno) {
		this.wechatno = wechatno;
	}

	public Integer getAccountid() {
		return accountid;
	}

	public void setAccountid(Integer accountid) {
		this.accountid = accountid;
	}
	
    
}