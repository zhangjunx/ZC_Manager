package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface FP_RestaurantMapper {

	int addRestaurant(Map<String, Object> map);

	int editRestaurant(Map<String, Object> map);

	List<Map<String, Object>> getRestaurantList(Map<String, Object> map);

	int delRestaurant(Map<String, Object> map);

	Map<String, Object> getOneRestaurant(Map<String, Object> map);

	int apportionDevices(Map<String, Object> map);

	int unApportionDevices(Map<String, Object> map);

	List<Map<String, Object>> getDeviceList(Map<String, Object> map);

	int getRestaurantListCount(Map<String, Object> map);

	Map<String, Object> getDeviceInfoWithID(Map<String, Object> map);

	List<Map<String, Object>> getPerListWithDeviceID(Map<String, Object> deviceInfo);

}
