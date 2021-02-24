package com.xr.service;

import java.util.List;
import java.util.Map;

public interface FP_RestaurantService {

	int addRestaurant(Map<String, Object> map);

	Map<String, Object> getRestaurantList(Map<String, Object> map);

	int delRestaurant(Map<String, Object> map);

	Map<String, Object> getOneRestaurant(Map<String, Object> map);

	Map<String, Object> apportionDevices(Map<String, Object> map);

	List<Map<String, Object>> getDeviceList(Map<String, Object> map);

}
