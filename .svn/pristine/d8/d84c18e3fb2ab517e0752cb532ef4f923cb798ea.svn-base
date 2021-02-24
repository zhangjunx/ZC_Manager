package com.xr.service;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;

public interface AEFServiceService {

	List<Map<String, Object>> getGroupList(String s);

	List<Map<String, Object>> getHolderList(JSONObject jsonObject) throws ParseException;

	List<Map<String, Object>> groupUser(JSONObject jsonObject) throws ParseException;

	Integer saveImagePath(JSONObject jsonObject) throws IOException;

	Map<String, Object> getImagePath(JSONObject jsonObject);

	String imageUplod(JSONObject jsonObject, MultipartFile file) throws IOException;

	int saveRecord(JSONObject jsonObject,HttpServletResponse resp) throws IOException;

	Map<String, Object> getOneDeviceInfo(Map<String, Object> deviceParm) throws ParseException;

	List<Map<String, Object>> getGroupListVistors(String s);

	List<Map<String, Object>> getHolderListVistors(JSONObject jsonObject) throws ParseException;

	List<Map<String, Object>> groupUserVistors(JSONObject jsonObject) throws ParseException;

	List<Map<String, Object>> getGroupListVistorsWX(String s);

	List<Map<String, Object>> getHolderListVistorsWX(JSONObject jsonObject) throws ParseException;

	List<Map<String, Object>> groupUserVistorsWX(JSONObject jsonObject) throws ParseException;

	Map<String, Object> getImagePathVisitors(JSONObject jsonObject);

	Map<String, Object> getImagePathVisitorsWX(JSONObject jsonObject);

	Map<String, Object> getDoorWithAEFService(JSONObject jsonObject);

	void updateWXVisitorsStatus(Map<String, Object> parmMap);

	Map<String, Object> getOneVisitorInfoWithID(Map<String, Object> parmMap);

	void updateLimitCount(Map<String, Object> countMap);

}
