package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface ZC_GoodsMapper {

	List<Map<String, Object>> getList(Map<String, Object> map);

	int getListCount(Map<String, Object> map);

	Map<String, Object> getSumWithCode(Map<String, Object> map);

	Map<String, Object> getSumWithModel(Map<String, Object> map);

	int saveInfo(Map<String, Object> map);

	int editInfo(Map<String, Object> map);

	Map<String, Object> getOne(Map<String, Object> map);

	int delOne(Map<String, Object> map);

}
