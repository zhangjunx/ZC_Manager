package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface ZC_CheckMapper {

	int insertCheckRecord(Map<String, Object> map);

	int insertCheckRecordGoods(Map<String, Object> map);

	int insertCheckRecordGoodsStore(Map<String, Object> map);

	int deleteCheckRecord(Map<String, Object> map);

	Map<String, Object> getCheckInfo(Map<String, Object> map);

	List<Map<String, Object>> getCheckStoreGoodsList(Map<String, Object> map);

	List<Map<String, Object>> getCheckGoodsList(Map<String, Object> map);

}
