package com.xr.service;

import java.util.List;
import java.util.Map;

public interface DoorUnit2Service {

	Map<String, Object> getDoorLit(Map<String, Object> map);

	Integer saveDoorInfo(Map<String,Object> map);

	List<Map<String, Object>> getOneDoorInfo(Map<String, Object> map);

	Integer delOneDoorInfo(Map<String, Object> map);

	List<Map<String, Object>> getRederTypeCombo(Map<String, Object> map);

	List<Map<String, Object>> getDeviceTreeList();

	List<Map<String, Object>> getAreaListCombo(Map<String, Object> map);

	Map<String, Object> getDoorWithAEFService(Map<String, Object> map);

	Map<String, Object> updateDoorPrisonerCheck(Map<String, Object> map);

	Map<String, Object> getDoorPrisonerCheck(Map<String, Object> map);

	Map<String, Object> setABDoorLimit(Map<String, Object> map);

	Map<String, Object> getABDoorLimit(Map<String, Object> map);

}
