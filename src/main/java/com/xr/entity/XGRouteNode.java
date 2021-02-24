package com.xr.entity;

/**
 * 巡更线路节点表(XGRouteNode)
 * @author csc
 *  实体类
 */
public class XGRouteNode {

	 private Integer nodeid;//NodeId节点主键
	 private Integer routeid;//RouteId路线编号
	 private Integer doorno;//门区主键
	 private String doorname;//DoorName门区名称
	 private Integer deviceno; //控制器编号
	 private String direction;//方向0是进,1是出
	 private Short nodeorder;//节点循序
	 
	public XGRouteNode() {
		super();
	}

	public Integer getNodeid() {
		return nodeid;
	}
	
	public void setNodeid(Integer nodeid) {
		this.nodeid = nodeid;
	}
	
	public Integer getRouteid() {
		return routeid;
	}
	
	public void setRouteid(Integer routeid) {
		this.routeid = routeid;
	}
	
	public Integer getDoorno() {
		return doorno;
	}
	
	public void setDoorno(Integer doorno) {
		this.doorno = doorno;
	}
	
	public String getDoorname() {
		return doorname;
	}
	
	public void setDoorname(String doorname) {
		this.doorname = doorname;
	}
	
	public Integer getDeviceno() {
		return deviceno;
	}
	
	public void setDeviceno(Integer deviceno) {
		this.deviceno = deviceno;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public Short getNodeorder() {
		return nodeorder;
	}

	public void setNodeorder(Short nodeorder) {
		this.nodeorder = nodeorder;
	}
	 
	
}
