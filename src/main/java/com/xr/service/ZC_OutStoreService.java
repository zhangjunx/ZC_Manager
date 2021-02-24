package com.xr.service;

import java.util.Map;

public interface ZC_OutStoreService {

	Map<String, Object> outStoreService(Map<String, Object> map);

	Map<String, Object> getOutStoreList(Map<String, Object> map);

	Map<String, Object> getOutStoreGoodsList(Map<String, Object> map);

	Map<String, Object> addReOutStore(Map<String, Object> map);

	Map<String, Object> updateApprovalStatus(Map<String, Object> map);

	Map<String, Object> getOneInfoWIthRFID(Map<String, Object> map);

	Map<String, Object> printOutStoreList(Map<String, Object> map);

}
