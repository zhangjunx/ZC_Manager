package com.xr.service;

import java.util.Map;

public interface ZC_InStoreService {

	Map<String, Object> updateStoreGoods(Map<String, Object> map);

	Map<String, Object> printIntBill(Map<String, Object> map);

	Map<String, Object> getInStoreGoodsRecord(Map<String, Object> map);

	Map<String, Object> getStoreCount(Map<String, Object> map);

	Map<String, Object> getStoreGoods(Map<String, Object> map);

	Map<String, Object> getInStoreRecord(Map<String, Object> map);

	Map<String, Object> updateReStoreGoods(Map<String, Object> map);

	Map<String, Object> updateGoodsParm(Map<String, Object> map);

	Map<String, Object> checkLabelRepeat(Map<String, Object> map);

	Map<String, Object> getSkillBaseFileList(Map<String, Object> map);

}
