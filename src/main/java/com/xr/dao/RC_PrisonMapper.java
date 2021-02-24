package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface RC_PrisonMapper {

	List<Map<String, Object>> getPrisonList(Map<String, Object> map);

	int getPrisonListCount(Map<String, Object> map);

	int addPrisonInfo(Map<String, Object> map);

	int editPrisonInfo(Map<String, Object> map);

	Map<String, Object> getOnePrisonInfo(Map<String, Object> map);

	int delOnePrisonInfo(Map<String, Object> map);

	int updatePrisonLabel(Map<String, Object> map);

	int changePrisonLabel(Map<String, Object> map);

	Map<String, Object> getSumWithName(Map<String, Object> map);

	int getSumWithLabelCode(Map<String, Object> map);

}
