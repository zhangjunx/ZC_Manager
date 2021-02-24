package com.xr.entity;

import java.util.Date;

public class LPR_CommondLog {
	
    private Integer id;

    private Short actioncode;

    private String functioncode;

    private Integer vehicleid;

    private String devicename;

    private Integer deviceno;

    private Integer channelid;

    private String commondtype;

    private String commondinfo;

    private Date sendtime;

    private Date activetime;

    private String resultinfo;

    private String resultstatus;

    private String note;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Short getActioncode() {
        return actioncode;
    }

    public void setActioncode(Short actioncode) {
        this.actioncode = actioncode;
    }

    public String getFunctioncode() {
        return functioncode;
    }

    public void setFunctioncode(String functioncode) {
        this.functioncode = functioncode == null ? null : functioncode.trim();
    }

    public Integer getVehicleid() {
        return vehicleid;
    }

    public void setVehicleid(Integer vehicleid) {
        this.vehicleid = vehicleid;
    }

    public String getDevicename() {
        return devicename;
    }

    public void setDevicename(String devicename) {
        this.devicename = devicename == null ? null : devicename.trim();
    }

    public Integer getDeviceno() {
        return deviceno;
    }

    public void setDeviceno(Integer deviceno) {
        this.deviceno = deviceno;
    }

    public Integer getChannelid() {
        return channelid;
    }

    public void setChannelid(Integer channelid) {
        this.channelid = channelid;
    }

    public String getCommondtype() {
        return commondtype;
    }

    public void setCommondtype(String commondtype) {
        this.commondtype = commondtype == null ? null : commondtype.trim();
    }

    public String getCommondinfo() {
        return commondinfo;
    }

    public void setCommondinfo(String commondinfo) {
        this.commondinfo = commondinfo == null ? null : commondinfo.trim();
    }

    public Date getSendtime() {
        return sendtime;
    }

    public void setSendtime(Date sendtime) {
        this.sendtime = sendtime;
    }

    public Date getActivetime() {
        return activetime;
    }

    public void setActivetime(Date activetime) {
        this.activetime = activetime;
    }

    public String getResultinfo() {
        return resultinfo;
    }

    public void setResultinfo(String resultinfo) {
        this.resultinfo = resultinfo == null ? null : resultinfo.trim();
    }

    public String getResultstatus() {
        return resultstatus;
    }

    public void setResultstatus(String resultstatus) {
        this.resultstatus = resultstatus == null ? null : resultstatus.trim();
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }
}