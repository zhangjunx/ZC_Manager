package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface ZC_InStoreMapper {

	List<Map<String, Object>> checkLabelRepeat(List<Map<String, Object>> goodsList);

	int saveInStoreInfo(Map<String, Object> map);

	int saveInStoreGoodsInfo(Map<String, Object> map);

	int saveInStoreGoodsRecordInfo(Map<String, Object> map);

	List<Map<String, Object>> printIntBill(Map<String, Object> map);

	List<Map<String, Object>> getInStoreGoodsRecord(Map<String, Object> map);

	List<Map<String, Object>> getStoreCount(Map<String, Object> map);

	List<Map<String, Object>> getStoreGoods(Map<String, Object> map);

	List<Map<String, Object>> getInStoreRecord(Map<String, Object> map);

	int getInStoreRecordCount(Map<String, Object> map);

	int getInStoreGoodsRecordCount(Map<String, Object> map);

	int getStoreCountCount(Map<String, Object> map);

	int getStoreGoodsCount(Map<String, Object> map);

	int updateGoodsParm(Map<String, Object> map);

}
