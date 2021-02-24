package com.xr.service;

import java.util.Map;

public interface ZC_InStoreGoodsWaringService {

	Map<String, Object> getScrapList(Map<String, Object> map);

	Map<String, Object> addScrapList(Map<String, Object> map);

	Map<String, Object> getRetireList(Map<String, Object> map);

	Map<String, Object> addRetireList(Map<String, Object> map);

}
