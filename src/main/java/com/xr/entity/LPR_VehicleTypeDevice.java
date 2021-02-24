package com.xr.entity;

public class LPR_VehicleTypeDevice {
    private Integer id;

    private String vehicletype;

    private Integer deviceid;

    private Integer usestop;

    private String note;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVehicletype() {
        return vehicletype;
    }

    public void setVehicletype(String vehicletype) {
        this.vehicletype = vehicletype == null ? null : vehicletype.trim();
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