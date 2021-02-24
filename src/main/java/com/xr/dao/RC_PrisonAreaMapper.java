package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface RC_PrisonAreaMapper {

	List<Map<String, Object>> getPrisonAreaList(Map<String, Object> map);

	int getPrisonAreaListCount(Map<String, Object> map);

	int addPrisonArea(Map<String, Object> map);

	int editPrisonArea(Map<String, Object> map);

	Map<String, Object> getOnePrisonArea(Map<String, Object> map);

	int delOnePrisonArea(Map<String, Object> map);

	int updateAreaLabel(Map<String, Object> map);

	int changeAreaLabel(Map<String, Object> map);

	Map<String, Object> getSumWithName(Map<String, Object> map);

	int getSumWithLabelCode(Map<String, Object> map);

}
