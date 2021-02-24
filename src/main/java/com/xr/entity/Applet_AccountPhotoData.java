package com.xr.entity;

/**
 * 小程序账户轮播图表
 * @author csc
 */
public class Applet_AccountPhotoData {

	   private Integer id;//主键
	   
	   private Integer accountid;//账户id
	   
	   private byte[] appletphoto;//照片

	   
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getAccountid() {
		return accountid;
	}

	public void setAccountid(Integer accountid) {
		this.accountid = accountid;
	}

	public byte[] getAppletphoto() {
		return appletphoto;
	}

	public void setAppletphoto(byte[] appletphoto) {
		this.appletphoto = appletphoto;
	}
	   
	  
}
