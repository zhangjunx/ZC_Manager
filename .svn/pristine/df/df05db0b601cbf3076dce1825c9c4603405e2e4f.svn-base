package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.DoorUnitMapper;
import com.xr.entity.DoorUnit;
import com.xr.service.IDoorUnitService;
import com.xr.util.TreeToolUtils;
@Service
public class DoorUnitServiceImpl implements IDoorUnitService {
	@Autowired
	private DoorUnitMapper dm;

	@Override
	public List<DoorUnit> queryDoorUnitListService() {
		// 查询门区列表
		return dm.queryDoorUnitList();
	}

	@Override
	public List<Map<String,Object>> queryDoorAndDeviceListService() {
		// 查询门区及所在控制器列表 门禁权限设置时用到
		return dm.queryDoorAndDeviceList();
	}
	
	@Override
	public List<Map<String,Object>> queryAreaAndDoorListService() {
		// 查询区域和对应门区及所在控制器列表 门禁权限设置时用到
		return dm.queryAreaAndDoorList();
	}
	
	

	@Override
	public List<DoorUnit> queryDoorListByControlService(Map m) {
		//查询访客能进门区列表
		return dm.queryDoorListByControl(m);
	}

	@Override
	public List<DoorUnit> queryDoorByDoorNoService(Short doorno) {
		// 根据门区号查名称
		return dm.queryDoorByDoorNo(doorno);
	}
	
	@Override
	public List<Map<String,Object>> getDoorTreeService(boolean res) {
		 //门区树
		List<Map<String,Object>> list=dm.getDoorTree();
		List<Map<String,Object>> treeList = new ArrayList<Map<String,Object>>();
		TreeToolUtils u = new TreeToolUtils();
		treeList = u.menuList(list,res);
		return treeList;
	}
	 
	/**查询考勤点(DoorUnit==门区表)用于设置门区是否用于考勤*/
	public List<Map<String, Object>> queryDoorUnit() {
		
		return dm.queryDoorUnit();
	}//end
	
	/**修改方法,修改门区是否参与考勤*/
	public boolean updateEnable(DoorUnit record) {
		return dm.updateEnable(record);
	}//end

	/**
      * 查询所有节点NodeCode等信息.
	  * 用于将开门接口在程序已运行时,就动态生成对应的Key
	  * 一个节点对应一个key.
	 */
	public List<Map<String, Object>> queryOpenNode() {
		return dm.queryOpenNode();
	}//end
    
	/**
	 * 作用:用于小程序开门
     * 通过doorNo来查询该门区属于哪一个节点(节点就是地区)
     */
	public Map<String, Object> querySingleNode(String doorNo) {
		return dm.querySingleNode(doorNo);
	}//end

	/**
     * 动态插入.csc已使用.改动前请告知本人
     * 该方法现用于SenseLink平台的对接中.用于新增设备往DoorUnit里面
     * @param record
     */
	@Override
	public int insertSelective(DoorUnit record) {
		return dm.insertSelective(record);
	}//end

	 /**通过sn查询是否有相同设备*/
	@Override
	public Map<String, Object> queryViceDoor(String sn) {
		return dm.queryViceDoor(sn);
	}//end

	
	/**
     * 联合查询SenseLink的设备信息.
     * 用于同步打卡记录
     */
	@Override
	public List<Map<String, Object>> getSenseLinkDevice() {
		return dm.getSenseLinkDevice();
	}

	/**
	  * 修改门区信息
	  * @param record
	  */
	@Override
	public int updateByPrimaryKeySelective(DoorUnit record) {
		int count = dm.updateByPrimaryKeySelective(record);
		return count;
	}

	 /**
	    * 通过doorno查询详细信息
	    * @param doorno
	    */
	@Override
	public DoorUnit selectByPrimaryKey(Short doorno) {
		return dm.selectByPrimaryKey(doorno);
	}//end

	 /**
	   * 通过doorno来删除门区
	   * @param doorno
	   */
	@Override
	public int deleteByPrimaryKey(Short doorno) {
	 int count =	dm.deleteByPrimaryKey(doorno);
		return count;
	}//end

}
