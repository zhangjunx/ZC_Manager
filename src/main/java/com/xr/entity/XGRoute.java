package com.xr.entity;

/**
 * 巡更线路表(XGRoute)
 * @author csc
 *  实体类
 */
public class XGRoute {

	private Integer routeid;//RouteID巡更路线主键
	
	private String routename;//RouteName巡更路线名称
	
	private Integer placeseveral;//PlaceSeveral刷卡地点个数

	//无参构造
	public XGRoute() {
		super();
	}
	
	public XGRoute(String routename, Integer placeseveral) {
		super();
		this.routename = routename;
		this.placeseveral = placeseveral;
	}

	//GET和SET方法
	public Integer getRouteid() {
		return routeid;
	}

	public void setRouteid(Integer routeid) {
		this.routeid = routeid;
	}

	public String getRoutename() {
		return routename;
	}

	public void setRoutename(String routename) {
		this.routename = routename;
	}

	public Integer getPlaceseveral() {
		return placeseveral;
	}

	public void setPlaceseveral(Integer placeseveral) {
		this.placeseveral = placeseveral;
	}//end

}
