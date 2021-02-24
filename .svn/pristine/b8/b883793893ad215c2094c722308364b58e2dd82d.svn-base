package com.xr.dao;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;

public interface AEFServiceMapper {

	List<Map<String, Object>> getGroupList(Map<String, Object> param);

	List<Map<String, Object>> getHolderList(Map<String, Object> param);

	List<Map<String, Object>> groupUser(Map<String, Object> param);

	Integer saveImagePath(Map<String, Object> paramMap);

	Map<String, Object> getImagePath(Map<String, Object> paraMap);

	int imageUplod(Map<String, Object> mapParm);

	int getMaxPhotoID(Map<String, Object> mapParm);

	int saveRecord(Map<String, Object> parmMap);

	int updateImage(Map<String, Object> parmMap);

	Map<String, Object> getOneDeviceInfo(Map<String, Object> deviceParm);

	Map<String, Object> getOneCardInfo(Map<String, Object> cardParm);

	List<Map<String, Object>> getGroupListVistors(Map<String, Object> param);

	List<Map<String, Object>> getHolderListVistors(Map<String, Object> param);

	List<Map<String, Object>> groupUserVistors(Map<String, Object> param);

	List<Map<String, Object>> getGroupListVistorsWX(Map<String, Object> param);

	Map<String, Object> getImagePathVisitorsWX(Map<String, Object> paraMap);

	Map<String, Object> getImagePathVisitors(Map<String, Object> paraMap);

	List<Map<String, Object>> groupUserVistorsWX(Map<String, Object> param);

	List<Map<String, Object>> getHolderListVistorsWX(Map<String, Object> param);

	Map<String, Object> getDoorWithAEFService(JSONObject jsonObject);

	int updateWXVisitorsStatus(Map<String, Object> parmMap);

	Map<String, Object> getThisRecordWithID(JSONObject jsonObject);

	Map<String, Object> getOneVisitorInfoWithID(Map<String, Object> jsonObject);

	int updateLimitCount(Map<String, Object> countMap);

}
