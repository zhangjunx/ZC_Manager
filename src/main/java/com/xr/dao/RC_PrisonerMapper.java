package com.xr.dao;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;

public interface RC_PrisonerMapper {

	List<Map<String, Object>> getPrisonerList(Map<String, Object> map);

	int getPrisonerListCount(Map<String, Object> map);

	int insertPerWithImport(Map<String, Object> parmMap);

	int updatePrisonerList(Map<String, Object> map);

	List<Map<String, Object>> getPrisoneList(Map<String, Object> parmMap);

	int addPrisonerList(Map<String, Object> map);

	int delOnePrison(Map<String, Object> map);

	int updatePerLabel(Map<String, Object> map);

	int changePerLabel(Map<String, Object> map);

	Map<String, Object> getOnePrison(Map<String, Object> map);

	void savePrisonImg(Map<String, Object> parmMap);

	Map<String, Object> getSumWithIDCard(Map<String, Object> map);

	int getSumWithIDCardList(Map<String, Object> parmMap);

	int getSumWithLabelCode(Map<String, Object> map);

}
