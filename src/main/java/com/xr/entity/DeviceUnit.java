package com.xr.entity;

/**
 * @ClassName: DeviceUnit
 * @Description: 设备表是贴里
 * @author: csc
 * @Company: SYRIS
 * @date: 2020年4月9日 下午2:20:36
 * @param:
 */
public class DeviceUnit {
    private Short deviceno;//设备编号

    private String devicename;//设备名称

    private Short mapno;

    private Short deviceenabled;

    private Short deviceid;

    private String deviceserial;

    private Short devicetypeno;

    private Short deviceportno;

    private Short devicemodeno;

    private String site;

    private Short showleft;

    private Short showtop;

    private String description;

    private Short apbevenmove;

    private Short apbgroupno;

    private String controltype;

    private String controlstatus;

    private Integer maxdoornum;

    private Integer maxcardnum;

    private String safepwd1;

    private String safepwd2;

    private String safepwd3;

    private String safepwd4;

    private String maincardid1;

    private String maincardid2;

    private String maincardid3;

    private String maincardpwd1;

    private String maincardpwd2;

    private String maincardpwd3;

    private String engicardid1;

    private String engicardid2;

    private String engicardid3;

    private String engicardpwd1;

    private String engicardpwd2;

    private String engicardpwd3;

    private String opercardid1;

    private String opercardid2;

    private String opercardid3;

    private String opercardid4;

    private String opercardid5;

    private String opercardid6;

    private String opercardid7;

    private String opercardid8;

    private String opercardpwd1;

    private String opercardpwd2;

    private String opercardpwd3;

    private String opercardpwd4;

    private String opercardpwd5;

    private String opercardpwd6;

    private String opercardpwd7;

    private String opercardpwd8;

    private String controlver;

    private String di0Name;

    private String di0Action;

    private String di1Name;

    private String di1Action;

    private String di2Name;

    private String di2Action;

    private String di3Name;

    private String di3Action;

    private Integer controlbit;

    private String commstate;

    private String devicetypecode;

    private String manufacturercode;

    private String ip;

    private String port;

    private String username;

    private String password;

    private String ifelevator;

    private String enabled;

    private String areaid;

    private String updatestatue;

    private String controlsn;

    private String maxionum;

    private String netstatus;

    private String connectstatus;

    private String installlocation;

    private String devicecode;

    private String netnode;

    private Integer usestop;

    private Integer parktype;

    public Short getDeviceno() {
        return deviceno;
    }

    public void setDeviceno(Short deviceno) {
        this.deviceno = deviceno;
    }

    public String getDevicename() {
        return devicename;
    }

    public void setDevicename(String devicename) {
        this.devicename = devicename == null ? null : devicename.trim();
    }

    public Short getMapno() {
        return mapno;
    }

    public void setMapno(Short mapno) {
        this.mapno = mapno;
    }

    public Short getDeviceenabled() {
        return deviceenabled;
    }

    public void setDeviceenabled(Short deviceenabled) {
        this.deviceenabled = deviceenabled;
    }

    public Short getDeviceid() {
        return deviceid;
    }

    public void setDeviceid(Short deviceid) {
        this.deviceid = deviceid;
    }

    public String getDeviceserial() {
        return deviceserial;
    }

    public void setDeviceserial(String deviceserial) {
        this.deviceserial = deviceserial == null ? null : deviceserial.trim();
    }

    public Short getDevicetypeno() {
        return devicetypeno;
    }

    public void setDevicetypeno(Short devicetypeno) {
        this.devicetypeno = devicetypeno;
    }

    public Short getDeviceportno() {
        return deviceportno;
    }

    public void setDeviceportno(Short deviceportno) {
        this.deviceportno = deviceportno;
    }

    public Short getDevicemodeno() {
        return devicemodeno;
    }

    public void setDevicemodeno(Short devicemodeno) {
        this.devicemodeno = devicemodeno;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site == null ? null : site.trim();
    }

    public Short getShowleft() {
        return showleft;
    }

    public void setShowleft(Short showleft) {
        this.showleft = showleft;
    }

    public Short getShowtop() {
        return showtop;
    }

    public void setShowtop(Short showtop) {
        this.showtop = showtop;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Short getApbevenmove() {
        return apbevenmove;
    }

    public void setApbevenmove(Short apbevenmove) {
        this.apbevenmove = apbevenmove;
    }

    public Short getApbgroupno() {
        return apbgroupno;
    }

    public void setApbgroupno(Short apbgroupno) {
        this.apbgroupno = apbgroupno;
    }

    public String getControltype() {
        return controltype;
    }

    public void setControltype(String controltype) {
        this.controltype = controltype == null ? null : controltype.trim();
    }

    public String getControlstatus() {
        return controlstatus;
    }

    public void setControlstatus(String controlstatus) {
        this.controlstatus = controlstatus == null ? null : controlstatus.trim();
    }

    public Integer getMaxdoornum() {
        return maxdoornum;
    }

    public void setMaxdoornum(Integer maxdoornum) {
        this.maxdoornum = maxdoornum;
    }

    public Integer getMaxcardnum() {
        return maxcardnum;
    }

    public void setMaxcardnum(Integer maxcardnum) {
        this.maxcardnum = maxcardnum;
    }

    public String getSafepwd1() {
        return safepwd1;
    }

    public void setSafepwd1(String safepwd1) {
        this.safepwd1 = safepwd1 == null ? null : safepwd1.trim();
    }

    public String getSafepwd2() {
        return safepwd2;
    }

    public void setSafepwd2(String safepwd2) {
        this.safepwd2 = safepwd2 == null ? null : safepwd2.trim();
    }

    public String getSafepwd3() {
        return safepwd3;
    }

    public void setSafepwd3(String safepwd3) {
        this.safepwd3 = safepwd3 == null ? null : safepwd3.trim();
    }

    public String getSafepwd4() {
        return safepwd4;
    }

    public void setSafepwd4(String safepwd4) {
        this.safepwd4 = safepwd4 == null ? null : safepwd4.trim();
    }

    public String getMaincardid1() {
        return maincardid1;
    }

    public void setMaincardid1(String maincardid1) {
        this.maincardid1 = maincardid1 == null ? null : maincardid1.trim();
    }

    public String getMaincardid2() {
        return maincardid2;
    }

    public void setMaincardid2(String maincardid2) {
        this.maincardid2 = maincardid2 == null ? null : maincardid2.trim();
    }

    public String getMaincardid3() {
        return maincardid3;
    }

    public void setMaincardid3(String maincardid3) {
        this.maincardid3 = maincardid3 == null ? null : maincardid3.trim();
    }

    public String getMaincardpwd1() {
        return maincardpwd1;
    }

    public void setMaincardpwd1(String maincardpwd1) {
        this.maincardpwd1 = maincardpwd1 == null ? null : maincardpwd1.trim();
    }

    public String getMaincardpwd2() {
        return maincardpwd2;
    }

    public void setMaincardpwd2(String maincardpwd2) {
        this.maincardpwd2 = maincardpwd2 == null ? null : maincardpwd2.trim();
    }

    public String getMaincardpwd3() {
        return maincardpwd3;
    }

    public void setMaincardpwd3(String maincardpwd3) {
        this.maincardpwd3 = maincardpwd3 == null ? null : maincardpwd3.trim();
    }

    public String getEngicardid1() {
        return engicardid1;
    }

    public void setEngicardid1(String engicardid1) {
        this.engicardid1 = engicardid1 == null ? null : engicardid1.trim();
    }

    public String getEngicardid2() {
        return engicardid2;
    }

    public void setEngicardid2(String engicardid2) {
        this.engicardid2 = engicardid2 == null ? null : engicardid2.trim();
    }

    public String getEngicardid3() {
        return engicardid3;
    }

    public void setEngicardid3(String engicardid3) {
        this.engicardid3 = engicardid3 == null ? null : engicardid3.trim();
    }

    public String getEngicardpwd1() {
        return engicardpwd1;
    }

    public void setEngicardpwd1(String engicardpwd1) {
        this.engicardpwd1 = engicardpwd1 == null ? null : engicardpwd1.trim();
    }

    public String getEngicardpwd2() {
        return engicardpwd2;
    }

    public void setEngicardpwd2(String engicardpwd2) {
        this.engicardpwd2 = engicardpwd2 == null ? null : engicardpwd2.trim();
    }

    public String getEngicardpwd3() {
        return engicardpwd3;
    }

    public void setEngicardpwd3(String engicardpwd3) {
        this.engicardpwd3 = engicardpwd3 == null ? null : engicardpwd3.trim();
    }

    public String getOpercardid1() {
        return opercardid1;
    }

    public void setOpercardid1(String opercardid1) {
        this.opercardid1 = opercardid1 == null ? null : opercardid1.trim();
    }

    public String getOpercardid2() {
        return opercardid2;
    }

    public void setOpercardid2(String opercardid2) {
        this.opercardid2 = opercardid2 == null ? null : opercardid2.trim();
    }

    public String getOpercardid3() {
        return opercardid3;
    }

    public void setOpercardid3(String opercardid3) {
        this.opercardid3 = opercardid3 == null ? null : opercardid3.trim();
    }

    public String getOpercardid4() {
        return opercardid4;
    }

    public void setOpercardid4(String opercardid4) {
        this.opercardid4 = opercardid4 == null ? null : opercardid4.trim();
    }

    public String getOpercardid5() {
        return opercardid5;
    }

    public void setOpercardid5(String opercardid5) {
        this.opercardid5 = opercardid5 == null ? null : opercardid5.trim();
    }

    public String getOpercardid6() {
        return opercardid6;
    }

    public void setOpercardid6(String opercardid6) {
        this.opercardid6 = opercardid6 == null ? null : opercardid6.trim();
    }

    public String getOpercardid7() {
        return opercardid7;
    }

    public void setOpercardid7(String opercardid7) {
        this.opercardid7 = opercardid7 == null ? null : opercardid7.trim();
    }

    public String getOpercardid8() {
        return opercardid8;
    }

    public void setOpercardid8(String opercardid8) {
        this.opercardid8 = opercardid8 == null ? null : opercardid8.trim();
    }

    public String getOpercardpwd1() {
        return opercardpwd1;
    }

    public void setOpercardpwd1(String opercardpwd1) {
        this.opercardpwd1 = opercardpwd1 == null ? null : opercardpwd1.trim();
    }

    public String getOpercardpwd2() {
        return opercardpwd2;
    }

    public void setOpercardpwd2(String opercardpwd2) {
        this.opercardpwd2 = opercardpwd2 == null ? null : opercardpwd2.trim();
    }

    public String getOpercardpwd3() {
        return opercardpwd3;
    }

    public void setOpercardpwd3(String opercardpwd3) {
        this.opercardpwd3 = opercardpwd3 == null ? null : opercardpwd3.trim();
    }

    public String getOpercardpwd4() {
        return opercardpwd4;
    }

    public void setOpercardpwd4(String opercardpwd4) {
        this.opercardpwd4 = opercardpwd4 == null ? null : opercardpwd4.trim();
    }

    public String getOpercardpwd5() {
        return opercardpwd5;
    }

    public void setOpercardpwd5(String opercardpwd5) {
        this.opercardpwd5 = opercardpwd5 == null ? null : opercardpwd5.trim();
    }

    public String getOpercardpwd6() {
        return opercardpwd6;
    }

    public void setOpercardpwd6(String opercardpwd6) {
        this.opercardpwd6 = opercardpwd6 == null ? null : opercardpwd6.trim();
    }

    public String getOpercardpwd7() {
        return opercardpwd7;
    }

    public void setOpercardpwd7(String opercardpwd7) {
        this.opercardpwd7 = opercardpwd7 == null ? null : opercardpwd7.trim();
    }

    public String getOpercardpwd8() {
        return opercardpwd8;
    }

    public void setOpercardpwd8(String opercardpwd8) {
        this.opercardpwd8 = opercardpwd8 == null ? null : opercardpwd8.trim();
    }

    public String getControlver() {
        return controlver;
    }

    public void setControlver(String controlver) {
        this.controlver = controlver == null ? null : controlver.trim();
    }

    public String getDi0Name() {
        return di0Name;
    }

    public void setDi0Name(String di0Name) {
        this.di0Name = di0Name == null ? null : di0Name.trim();
    }

    public String getDi0Action() {
        return di0Action;
    }

    public void setDi0Action(String di0Action) {
        this.di0Action = di0Action == null ? null : di0Action.trim();
    }

    public String getDi1Name() {
        return di1Name;
    }

    public void setDi1Name(String di1Name) {
        this.di1Name = di1Name == null ? null : di1Name.trim();
    }

    public String getDi1Action() {
        return di1Action;
    }

    public void setDi1Action(String di1Action) {
        this.di1Action = di1Action == null ? null : di1Action.trim();
    }

    public String getDi2Name() {
        return di2Name;
    }

    public void setDi2Name(String di2Name) {
        this.di2Name = di2Name == null ? null : di2Name.trim();
    }

    public String getDi2Action() {
        return di2Action;
    }

    public void setDi2Action(String di2Action) {
        this.di2Action = di2Action == null ? null : di2Action.trim();
    }

    public String getDi3Name() {
        return di3Name;
    }

    public void setDi3Name(String di3Name) {
        this.di3Name = di3Name == null ? null : di3Name.trim();
    }

    public String getDi3Action() {
        return di3Action;
    }

    public void setDi3Action(String di3Action) {
        this.di3Action = di3Action == null ? null : di3Action.trim();
    }

    public Integer getControlbit() {
        return controlbit;
    }

    public void setControlbit(Integer controlbit) {
        this.controlbit = controlbit;
    }

    public String getCommstate() {
        return commstate;
    }

    public void setCommstate(String commstate) {
        this.commstate = commstate == null ? null : commstate.trim();
    }

    public String getDevicetypecode() {
        return devicetypecode;
    }

    public void setDevicetypecode(String devicetypecode) {
        this.devicetypecode = devicetypecode == null ? null : devicetypecode.trim();
    }

    public String getManufacturercode() {
        return manufacturercode;
    }

    public void setManufacturercode(String manufacturercode) {
        this.manufacturercode = manufacturercode == null ? null : manufacturercode.trim();
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip == null ? null : ip.trim();
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port == null ? null : port.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getIfelevator() {
        return ifelevator;
    }

    public void setIfelevator(String ifelevator) {
        this.ifelevator = ifelevator == null ? null : ifelevator.trim();
    }

    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled == null ? null : enabled.trim();
    }

    public String getAreaid() {
        return areaid;
    }

    public void setAreaid(String areaid) {
        this.areaid = areaid == null ? null : areaid.trim();
    }

    public String getUpdatestatue() {
        return updatestatue;
    }

    public void setUpdatestatue(String updatestatue) {
        this.updatestatue = updatestatue == null ? null : updatestatue.trim();
    }

    public String getControlsn() {
        return controlsn;
    }

    public void setControlsn(String controlsn) {
        this.controlsn = controlsn == null ? null : controlsn.trim();
    }

    public String getMaxionum() {
        return maxionum;
    }

    public void setMaxionum(String maxionum) {
        this.maxionum = maxionum == null ? null : maxionum.trim();
    }

    public String getNetstatus() {
        return netstatus;
    }

    public void setNetstatus(String netstatus) {
        this.netstatus = netstatus == null ? null : netstatus.trim();
    }

    public String getConnectstatus() {
        return connectstatus;
    }

    public void setConnectstatus(String connectstatus) {
        this.connectstatus = connectstatus == null ? null : connectstatus.trim();
    }

    public String getInstalllocation() {
        return installlocation;
    }

    public void setInstalllocation(String installlocation) {
        this.installlocation = installlocation == null ? null : installlocation.trim();
    }

    public String getDevicecode() {
        return devicecode;
    }

    public void setDevicecode(String devicecode) {
        this.devicecode = devicecode == null ? null : devicecode.trim();
    }

    public String getNetnode() {
        return netnode;
    }

    public void setNetnode(String netnode) {
        this.netnode = netnode == null ? null : netnode.trim();
    }

    public Integer getUsestop() {
        return usestop;
    }

    public void setUsestop(Integer usestop) {
        this.usestop = usestop;
    }

    public Integer getParktype() {
        return parktype;
    }

    public void setParktype(Integer parktype) {
        this.parktype = parktype;
    }
}