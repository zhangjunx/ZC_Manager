package com.xr.service;

import java.util.List;
import java.util.Map;

public interface UFaceOffLineWithDoorService {

	List<Map<String, Object>> getPerListWithIDs(Map<String, Object> map);

	List<Map<String, Object>> getDeviceListWithDoor(Map<String, Object> map);

	List<Map<String, Object>> getDeviceListAll();

	List<Map<String, Object>> getPerListWithDevice(Map<String, Object> map);

	int updateStatusByHand(Map<String, Object> map);

	int updateStatus(Map<String, Object> map);

	List<Map<String, Object>> getAllPerList(List<Map<String, Object>> deviceList);

}
