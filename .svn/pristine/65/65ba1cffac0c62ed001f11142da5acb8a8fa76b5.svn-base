package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.XGRouteDao;
import com.xr.entity.XGRights;
import com.xr.entity.XGRoute;
import com.xr.service.XGRouteService;

/**
 * 巡更线路管理的相关操作
 * @author csc
 * 业务实现层
 */
@Service
public class XGRouteServiceImpl implements XGRouteService {

	 @Autowired
	 private XGRouteDao rdao;//引入巡更线路管理的数据操作层Dao
	 
	 /**
	   * 通过巡更新路表
	   * 添加巡更线路
	   */
	
	 @Override
	public boolean insertRoute(XGRoute route) {
		return rdao.insertRoute(route);
	}//end
	/**
	 * 根据线路表的routeid
	 * 删除线路表数据的方法
	 * 用于添加失败时的处理和平常删除
	 * @param routeid
	 */
	@Override
	public void deleteRoute(Integer routeid) {
		rdao.deleteRoute(routeid);
	}//end
	/**
	 * 批量添加
	 * 巡更路线节点
	 * @return
	 */
	@Override
	public boolean insertRouteNode(List<Map<String, Object>> map) {
		return rdao.insertRouteNode(map);
	}//end
	/**
	 * 查询线路信息
	 * 通过userid
	 * 查询登陆用户所能管理的线路和线路节点信息
	 */
	@Override
	public List<Map<String, Object>> queryRouteAndNode(String holderno,Integer routeid) {
		//查询结果
	     List<Map<String, Object>> renolist =	rdao.queryRouteAndNode(holderno,routeid);
		Integer duibi=null;
		  Map<String,Object> sondata= new HashMap<>();
		  List<Map<String, Object>> child= new ArrayList<Map<String,Object>>();
		  List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		 for (int i = 0; i < renolist.size(); i++) {
			Integer dietuor =  (Integer) renolist.get(i).get("routeid");
			String routename = (String) renolist.get(i).get("routename");
			if(!dietuor.equals(duibi)){
				//获取名称
				 if(duibi!=null)
				 {
					sondata.put("child",child);
					data.add(sondata);
					sondata= new HashMap<>();
					child= new ArrayList<Map<String,Object>>();
					//child.clear();
				 }
				 child.add(renolist.get(i));
				 sondata.put("routeid", dietuor);
				 sondata.put("routename", routename);
			}else{
				child.add(renolist.get(i));
			}
			duibi=dietuor;
		}
		 if(child.size()!=0)
		 {
			 sondata.put("child",child);
			 data.add(sondata);
		 }
		return data;
	}//end
	
	 /**
	  * 通过线路ID
	  * 查找该线路ID绑定的所有节点ID
	  * 用于批量删除
	  * @param routeid
	  */
	@Override
	public List<Integer> queryRouteNodeID(Integer routeid) {
		return rdao.queryRouteNodeID(routeid);
	}
	@Override
	public void updateRoute(XGRoute route) {
		 rdao.updateRoute(route);
	}

	 /**
	  * 通过线路ID查询到的所有节点ID然后进行删除节点
	  * @param list
	  */
	@Override
	public boolean deleteRouteNode(List<Integer> list) {
		return rdao.deleteRouteNode(list);
	}//end
	
	
	//--------------------------------
	
	 /**
	  * 查询所有线路
	  * 用于用户与路线管理
	  * 给用户添加管理的线路
	  * @return
	  */
	@Override
	public List<Map<String, Object>> queryAllRoute() {
		return rdao.queryAllRoute();
	}
	 /**
	  * 根据员工登录的工号查询该公司下面-
	  * 能登陆系统的用户
	  * @return
	  */
	@Override
	public List<Map<String, Object>> querySignHolder(String holderno) {
		return rdao.querySignHolder(holderno);
	}//end
	
	 /**
	  * 通过前端传过来的id
	  * 查询该用户已经管理的线路ID
	  * @param userid
	  */
	@Override
	public List<Map<String, Object>> queryRightsRouteID(String holderno) {
		return rdao.queryRightsRouteID(holderno);
	}//end
	/**
	  * 批量添加
	  * 给用户配置巡更路线
	  * @param list
	  */
	@Override
	public boolean insertRights(XGRights rights) {
		return rdao.insertRights(rights);
	}//end
	
	 /**
	  * 删除用户所管理的线路
	  * 用于用户线路管理
	  * @param rights
	  */
	@Override
	public boolean deleteRights(XGRights rights) {
	   return	rdao.deleteRights(rights);
	}
	 
	 
	
	
	
}
