package com.xr.service;

import java.util.Map;

public interface RC_PrisonAreaService {

	Map<String, Object> getPrisonAreaList(Map<String, Object> map);

	Map<String, Object> addPrisonArea(Map<String, Object> map);

	Map<String, Object> getOnePrisonArea(Map<String, Object> map);

	Map<String, Object> delOnePrisonArea(Map<String, Object> map);

	Map<String, Object> updateAreaLabel(Map<String, Object> map);

}
