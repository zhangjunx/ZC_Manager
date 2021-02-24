package com.xr.entity;

import java.util.Date;

public class LPR_VehiclePower {
    private Integer id;

    private String devicename;

    private Integer deviceno;

    private Integer channelid;

    private Integer vehicleid;

    private String commondinfo;

    private Date sendtime;

    private Date activetime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getVehicleid() {
        return vehicleid;
    }

    public void setVehicleid(Integer vehicleid) {
        this.vehicleid = vehicleid;
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
}