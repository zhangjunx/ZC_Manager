package com.xr.service;

import java.util.Map;

public interface ZC_GoodsTypeService {

	Map<String, Object> getList(Map<String, Object> map);

	Map<String, Object> addInfo(Map<String, Object> map);

	Map<String, Object> getOneInfo(Map<String, Object> map);

	Map<String, Object> delOneInfo(Map<String, Object> map);

}
