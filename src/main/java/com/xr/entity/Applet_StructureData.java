package com.xr.entity;


/**
 * 小程序结构表(Applet_StructureData)
 * @author csc
 * 实体类
 */
public class Applet_StructureData {

	 private String appletno;//结构编号
	 
	 private String appletname;//结构名称
	 
	 private String underno;//代表父级
	 
	 private String netnode;//0是菜单,1是按钮
	 
	 private String specifiedpage;//指定页面(指向哪一个页面)
	 
	 private String remark;//备注
	 
	 
	 //无参构造
    public Applet_StructureData() {
		super();
	}

	//有参构造
	public Applet_StructureData(String appletno, String appletname, String underno, String netnode,
			String specifiedpage, String remark) {
		super();
		this.appletno = appletno;
		this.appletname = appletname;
		this.underno = underno;
		this.netnode = netnode;
		this.specifiedpage = specifiedpage;
		this.remark = remark;
	}

	public String getAppletno() {
		return appletno;
	}

	public void setAppletno(String appletno) {
		this.appletno = appletno;
	}

	public String getAppletname() {
		return appletname;
	}

	public void setAppletname(String appletname) {
		this.appletname = appletname;
	}

	public String getUnderno() {
		return underno;
	}

	public void setUnderno(String underno) {
		this.underno = underno;
	}

	public String getNetnode() {
		return netnode;
	}

	public void setNetnode(String netnode) {
		this.netnode = netnode;
	}

	public String getSpecifiedpage() {
		return specifiedpage;
	}

	public void setSpecifiedpage(String specifiedpage) {
		this.specifiedpage = specifiedpage;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	 
	
}
