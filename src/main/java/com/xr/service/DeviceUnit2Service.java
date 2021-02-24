package com.xr.service;

import java.util.List;
import java.util.Map;

public interface DeviceUnit2Service {

	Map<String, Object> getDeviceList(Map<String, Object> map);

	Map<String, Object> saveDeviceInfo(Map<String, Object> map);

	List<Map<String, Object>> getDeviceTypeList(Map<String, Object> map);

	List<Map<String, Object>> getDeviceFactoryList(Map<String, Object> map);

	List<Map<String, Object>> getDeviceModelList(Map<String, Object> map);

	List<Map<String, Object>> getAreaTree();

	Map<String, Object> getOneDeviceInfo(Map<String, Object> map);

	Integer delOneDeviceInfo(Map<String, Object> map);

	List<Map<String, Object>> getDeviceFactoryList2(Map<String, Object> map);
	
	/**
	 * Excel批量导入设备的方法
	 */
	void addExcelBatchDevice(List<Map<String, Object>> list);
	/**
	 * Excel批量导入时检查数据是否有重复
	 * @param list
	 */
	List<Map<String, Object>> selectBatchDevice(List<Map<String, Object>> list);

	void updateDeviceOnline();

}
