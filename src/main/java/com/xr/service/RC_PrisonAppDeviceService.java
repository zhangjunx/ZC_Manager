package com.xr.service;

import java.util.HashMap;
import java.util.Map;

public interface RC_PrisonAppDeviceService {

	Map<String, Object> getAppDeviceList(Map<String, Object> map);

	Map<String, Object> addAppDevice(Map<String, Object> map);

	Map<String, Object> getOneAppDevice(Map<String, Object> map);

	Map<String, Object> delOneAppDevice(Map<String, Object> map);

	Map<String, Object> checkLogin(Map<String, Object> map);

	Map<String, Object> downLoadPrisoner(Map<String, Object> map);

	Map<String, Object> downLoadPrisonerPic(Map<String, Object> map);

	Map<String, Object> downLoadPrison(Map<String, Object> map);

	Map<String, Object> downLoadPrisonArea(Map<String, Object> map);

	Map<String, Object> addAppUserRelation(Map<String, Object> map);

	Map<String, Object> getHolderList(Map<String, Object> map);

	Map<String, Object> updateAppDeviceStatus(Map<String, Object> map);

}
