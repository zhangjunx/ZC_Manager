package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface Limit_MenuPublicMapper {

	List<Map<String, Object>> getList(Map<String, Object> map);

	int getListCount(Map<String, Object> map);

	int updateMenuPublicLimit(Map<String, Object> map);

	List<Map<String, Object>> getUserLimitList(Map<String, Object> map);

	List<Map<String, Object>> getBtnListWithHolder(Map<String, Object> map);

	List<Map<String, Object>> getOperateList(Map<String, Object> map);

	List<Map<String, Object>> getUserLimitListWithAdministrator(Map<String, Object> map);

}
