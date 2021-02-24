package com.xr.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.xr.entity.XGRights;
import com.xr.entity.XGRoute;

/**
 * 巡更线路管理的相关操作
 * @author csc
 * 业务层
 */
public interface XGRouteService {
	/**
	 * 通过巡更新路表
	 * 添加巡更线路
	 */
	 boolean insertRoute(XGRoute route);
	/**
	 * 根据线路表的routeid
	 * 删除线路表数据的方法
	 * 用于添加失败时的处理和平常删除
	 * @param routeid
	 */
	 void deleteRoute(Integer routeid);
	/**
	 * 批量添加
	 * 巡更路线节点
	 * @return
	 */
	 boolean insertRouteNode(List<Map<String, Object>> map);
	/**
	 * 查询线路信息
	 * 通过holderno
	 * 查询登陆用户所能管理的线路和线路节点信息
	 */
	 List<Map<String, Object>> queryRouteAndNode(@Param("holderno")String holderno,@Param("routeid")Integer routeid);
	
	/**
	  * 通过线路ID
	  * 查找该线路ID绑定的所有节点ID
	  * 用于批量删除
	  * @param routeid
	  */
	  List<Integer> queryRouteNodeID(Integer routeid);
	 /**
	   * 通过巡更新路的实体类
	   * 来修改巡更线路信息
	   * @param route
	   */
	  void updateRoute(XGRoute route);
	 /**
	  * 通过线路ID查询到的所有节点ID然后进行删除节点
	  * @param list
	  */
	  boolean deleteRouteNode(List<Integer> list);
	 
    //----------------------------------------------
	 
	 /**
	  * 查询所有线路
	  * 用于用户与路线管理
	  * 给用户添加管理的线路
	  * @return
	  */
	  List<Map<String, Object>> queryAllRoute();
	 
	 /**
	  * 根据员工登录的工号查询该公司下面-
	  * 能登陆系统的用户
	  * @return
	  */
	  List<Map<String, Object>> querySignHolder(String holderno);
	 /**
	  * 通过前端传过来的id
	  * 查询该用户已经管理的线路ID
	  * @param userid
	  */
	  List<Map<String, Object>> queryRightsRouteID(String holderno);
	 /**
	  * 批量添加
	  * 给用户配置巡更路线
	  * @param list
	  */
	  boolean insertRights(XGRights rights);
	 /**
	  * 删除用户所管理的线路
	  * 用于用户线路管理
	  * @param rights
	  */
	  boolean deleteRights(XGRights rights);
}
