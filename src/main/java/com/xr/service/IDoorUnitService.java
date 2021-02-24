package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.DoorUnit;

@Service
public interface IDoorUnitService {
	
	  /**
	    * 通过doorno来删除门区
	    * @param doorno
	    */
	   int deleteByPrimaryKey(Short doorno);
	   /**
	     * 动态查询.csc已使用.改动前请告知本人
	     * 该方法现用于SenseLink平台的对接中.用于新增设备往DoorUnit里面
	     * @param record
	     */
	   int insertSelective(DoorUnit record);
	   /**
	    * 通过doorno查询详细信息
	    * @param doorno
	    */
	   DoorUnit selectByPrimaryKey(Short doorno);
	
	  List<DoorUnit>  queryDoorUnitListService();//查询门区列表
	  
	  /**
	   * 修改门区信息
	   * @param record
	   */
	  int updateByPrimaryKeySelective(DoorUnit record);
	  
	  List<Map<String,Object>> queryDoorAndDeviceListService();//查询门区及所在控制器列表 门禁权限设置时用到
	  List<Map<String,Object>> queryAreaAndDoorListService();//查询区域和对应门区及所在控制器列表 门禁权限设置时用到
	  
	  List<Map<String,Object>> getDoorTreeService(boolean res);//门区树
	  
	  List<DoorUnit> queryDoorListByControlService(Map m);//查询访客能进门区列表
	  List<DoorUnit> queryDoorByDoorNoService(Short doorno);//根据门区号查名称
	  
	  /**通过sn查询是否有相同设备*/
	    Map<String, Object> queryViceDoor(String sn);
	    
	    /**
	     * 联合查询SenseLink的设备信息.
	     * 用于同步打卡记录
	     */
	    List<Map<String, Object>> getSenseLinkDevice();
	  
	  /**查询考勤点(DoorUnit==门区表)用于设置门区是否用于考勤*/
	  List<Map<String, Object>> queryDoorUnit();
	  /**修改方法,修改门区是否参与考勤*/
	  boolean updateEnable(DoorUnit record);
	  
	   /**
	     * 查询所有节点NodeCode等信息.
	     * 用于将开门接口在程序已运行时,就动态生成对应的Key
	     * 一个节点对应一个key.
	     */
	  List<Map<String, Object>> queryOpenNode();
	    
	 /**
	   * 作用:用于小程序开门
	   * 通过doorNo来查询该门区属于哪一个节点(节点就是地区)
	   */
	  Map<String, Object> querySingleNode(String doorNo);
}
