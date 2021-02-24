package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface FacePayCallBackMapper {

	Map<String, Object> getRestaurantInfo(Map<String, Object> map);

	Map<String, Object> getTimeInfo(Map<String, Object> map);

	Map<String, Object> getRoleInfo(Map<String, Object> map);

	int saveRecord(Map<String, Object> recordMap);

	void saveRecordPhoto(Map<String, Object> photoParm);

	int updateAccountBalance(Map<String, Object> map);

	Map<String, Object> getAccountInfo(Map<String, Object> map);
	
}
