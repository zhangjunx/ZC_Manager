package com.xr.entity;

public class LPR_UserDevice {
    private Integer id;

    private String userdataid;

    private Integer deviceid;

    private Integer usestop;

    private String note;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserdataid() {
        return userdataid;
    }

    public void setUserdataid(String userdataid) {
        this.userdataid = userdataid == null ? null : userdataid.trim();
    }

    public Integer getDeviceid() {
        return deviceid;
    }

    public void setDeviceid(Integer deviceid) {
        this.deviceid = deviceid;
    }

    public Integer getUsestop() {
        return usestop;
    }

    public void setUsestop(Integer usestop) {
        this.usestop = usestop;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }
}