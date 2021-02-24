package com.xr.entity;

public class SY210AppSet {
    private Integer appsetkey;

    private Short deviceno;

    private Short appsetno;

    private String entryreader;

    private String exitreader;

    private String doorexit;

    private String doorpintimezone;

    private String holderpintimezone;

    private String holidaytimezone;

    private String holidayexit;

    private String weektimezone;

    private String weekexit;

    private String description;

    private String preholidaytimezone;

    private String preholidayexit;

    private String nextholidaytimezone;

    private String nextholidayexit;

    private String netnode;

    public Integer getAppsetkey() {
        return appsetkey;
    }

    public void setAppsetkey(Integer appsetkey) {
        this.appsetkey = appsetkey;
    }

    public Short getDeviceno() {
        return deviceno;
    }

    public void setDeviceno(Short deviceno) {
        this.deviceno = deviceno;
    }

    public Short getAppsetno() {
        return appsetno;
    }

    public void setAppsetno(Short appsetno) {
        this.appsetno = appsetno;
    }

    public String getEntryreader() {
        return entryreader;
    }

    public void setEntryreader(String entryreader) {
        this.entryreader = entryreader == null ? null : entryreader.trim();
    }

    public String getExitreader() {
        return exitreader;
    }

    public void setExitreader(String exitreader) {
        this.exitreader = exitreader == null ? null : exitreader.trim();
    }

    public String getDoorexit() {
        return doorexit;
    }

    public void setDoorexit(String doorexit) {
        this.doorexit = doorexit == null ? null : doorexit.trim();
    }

    public String getDoorpintimezone() {
        return doorpintimezone;
    }

    public void setDoorpintimezone(String doorpintimezone) {
        this.doorpintimezone = doorpintimezone == null ? null : doorpintimezone.trim();
    }

    public String getHolderpintimezone() {
        return holderpintimezone;
    }

    public void setHolderpintimezone(String holderpintimezone) {
        this.holderpintimezone = holderpintimezone == null ? null : holderpintimezone.trim();
    }

    public String getHolidaytimezone() {
        return holidaytimezone;
    }

    public void setHolidaytimezone(String holidaytimezone) {
        this.holidaytimezone = holidaytimezone == null ? null : holidaytimezone.trim();
    }

    public String getHolidayexit() {
        return holidayexit;
    }

    public void setHolidayexit(String holidayexit) {
        this.holidayexit = holidayexit == null ? null : holidayexit.trim();
    }

    public String getWeektimezone() {
        return weektimezone;
    }

    public void setWeektimezone(String weektimezone) {
        this.weektimezone = weektimezone == null ? null : weektimezone.trim();
    }

    public String getWeekexit() {
        return weekexit;
    }

    public void setWeekexit(String weekexit) {
        this.weekexit = weekexit == null ? null : weekexit.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getPreholidaytimezone() {
        return preholidaytimezone;
    }

    public void setPreholidaytimezone(String preholidaytimezone) {
        this.preholidaytimezone = preholidaytimezone == null ? null : preholidaytimezone.trim();
    }

    public String getPreholidayexit() {
        return preholidayexit;
    }

    public void setPreholidayexit(String preholidayexit) {
        this.preholidayexit = preholidayexit == null ? null : preholidayexit.trim();
    }

    public String getNextholidaytimezone() {
        return nextholidaytimezone;
    }

    public void setNextholidaytimezone(String nextholidaytimezone) {
        this.nextholidaytimezone = nextholidaytimezone == null ? null : nextholidaytimezone.trim();
    }

    public String getNextholidayexit() {
        return nextholidayexit;
    }

    public void setNextholidayexit(String nextholidayexit) {
        this.nextholidayexit = nextholidayexit == null ? null : nextholidayexit.trim();
    }

    public String getNetnode() {
        return netnode;
    }

    public void setNetnode(String netnode) {
        this.netnode = netnode == null ? null : netnode.trim();
    }
}