package com.xr.entity;

/**
 * 线路卡信息表(XGCardInformation)
 * @author csc
 * 实体类
 */
public class XGCardInformation {

	
	private Integer nid;//主键
	
	private Integer routeid;//RouteID路线ID
	
	private String holderno;//工号
	
	private Integer cardno;//RouteNum路线编号
	
	private String cardid;//卡号
	
	
	public XGCardInformation() {
		super();
	}


	public Integer getNid() {
		return nid;
	}


	public void setNid(Integer nid) {
		this.nid = nid;
	}


	public Integer getRouteid() {
		return routeid;
	}


	public void setRouteid(Integer routeid) {
		this.routeid = routeid;
	}


	public Integer getCardno() {
		return cardno;
	}


	public void setCardno(Integer cardno) {
		this.cardno = cardno;
	}


	public String getCardid() {
		return cardid;
	}


	public void setCardid(String cardid) {
		this.cardid = cardid;
	}


	public String getHolderno() {
		return holderno;
	}


	public void setHolderno(String holderno) {
		this.holderno = holderno;
	}


}
