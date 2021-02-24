package com.xr.entity;

/**
 * @ClassName DoorUnit
 * @Description 门区表对应的实体类
 * @Author csc
 * @Date 2019年12月24日 上午9:51:05
 */
public class DoorUnit {
	
    private Short doorno;//门区编号

    private String doorname;//门区名称

    private Short mapno;

    private Short deviceno;//设备号

    private Short doorchannel;//通道号

    private String emergencygroup;

    private Short activate;

    private String entryarea;

    private String exitarea;

    private Short onimage;

    private Short offimage;

    private Short showleft;

    private Short showtop;

    private Short attendanceselect;

    private String description;//注释  (csc用于放入SenseLink设备的名称)

    private String entryreadertype;

    private Short entryreaderch;

    private String entryreadersn;//进入SN

    private String exitreadertype;

    private Short exitreaderch;

    private String exitreadersn;//外出SN

    private String areaid;//属于哪个地区
    
    private String enable;//考勤专用的状态. 10不启用.20代表启用
    
    private String maccode;//MAC码小程序用
    
    private String macname;//Mac名称(蓝牙名称)
    
    private String bluetoothpassword;//蓝牙密码
    
    private String devicename;//设备名称

    public Short getDoorno() {
        return doorno;
    }

    public void setDoorno(Short doorno) {
        this.doorno = doorno;
    }

    public String getDoorname() {
        return doorname;
    }

    public void setDoorname(String doorname) {
        this.doorname = doorname == null ? null : doorname.trim();
    }

    public Short getMapno() {
        return mapno;
    }

    public void setMapno(Short mapno) {
        this.mapno = mapno;
    }

    public Short getDeviceno() {
        return deviceno;
    }

    public void setDeviceno(Short deviceno) {
        this.deviceno = deviceno;
    }

    public Short getDoorchannel() {
        return doorchannel;
    }

    public void setDoorchannel(Short doorchannel) {
        this.doorchannel = doorchannel;
    }

    public String getEmergencygroup() {
        return emergencygroup;
    }

    public void setEmergencygroup(String emergencygroup) {
        this.emergencygroup = emergencygroup == null ? null : emergencygroup.trim();
    }

    public Short getActivate() {
        return activate;
    }

    public void setActivate(Short activate) {
        this.activate = activate;
    }

    public String getEntryarea() {
        return entryarea;
    }

    public void setEntryarea(String entryarea) {
        this.entryarea = entryarea == null ? null : entryarea.trim();
    }

    public String getExitarea() {
        return exitarea;
    }

    public void setExitarea(String exitarea) {
        this.exitarea = exitarea == null ? null : exitarea.trim();
    }

    public Short getOnimage() {
        return onimage;
    }

    public void setOnimage(Short onimage) {
        this.onimage = onimage;
    }

    public Short getOffimage() {
        return offimage;
    }

    public void setOffimage(Short offimage) {
        this.offimage = offimage;
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

    public Short getAttendanceselect() {
        return attendanceselect;
    }

    public void setAttendanceselect(Short attendanceselect) {
        this.attendanceselect = attendanceselect;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getEntryreadertype() {
        return entryreadertype;
    }

    public void setEntryreadertype(String entryreadertype) {
        this.entryreadertype = entryreadertype == null ? null : entryreadertype.trim();
    }

    public Short getEntryreaderch() {
        return entryreaderch;
    }

    public void setEntryreaderch(Short entryreaderch) {
        this.entryreaderch = entryreaderch;
    }

    public String getEntryreadersn() {
        return entryreadersn;
    }

    public void setEntryreadersn(String entryreadersn) {
        this.entryreadersn = entryreadersn == null ? null : entryreadersn.trim();
    }

    public String getExitreadertype() {
        return exitreadertype;
    }

    public void setExitreadertype(String exitreadertype) {
        this.exitreadertype = exitreadertype == null ? null : exitreadertype.trim();
    }

    public Short getExitreaderch() {
        return exitreaderch;
    }

    public void setExitreaderch(Short exitreaderch) {
        this.exitreaderch = exitreaderch;
    }

    public String getExitreadersn() {
        return exitreadersn;
    }

    public void setExitreadersn(String exitreadersn) {
        this.exitreadersn = exitreadersn == null ? null : exitreadersn.trim();
    }

    public String getAreaid() {
        return areaid;
    }

    public void setAreaid(String areaid) {
        this.areaid = areaid == null ? null : areaid.trim();
    }

	public String getEnable() {
		return enable;
	}

	public void setEnable(String enable) {
		this.enable = enable;
	}

	public String getMaccode() {
		return maccode;
	}

	public void setMaccode(String maccode) {
		this.maccode = maccode;
	}

	public String getMacname() {
		return macname;
	}

	public void setMacname(String macname) {
		this.macname = macname;
	}

	public String getBluetoothpassword() {
		return bluetoothpassword;
	}

	public void setBluetoothpassword(String bluetoothpassword) {
		this.bluetoothpassword = bluetoothpassword;
	}//end

	public String getDevicename() {
		return devicename;
	}

	public void setDevicename(String devicename) {
		this.devicename = devicename;
	}
    
    
    
}