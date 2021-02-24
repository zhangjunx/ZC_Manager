package com.xr.service;

import java.util.Map;

public interface ZC_ApprovlService {

	Map<String, Object> getApprovalInStoreList(Map<String, Object> map);

	Map<String, Object> getApprovalOutStoreList(Map<String, Object> map);

	Map<String, Object> getApprovalBorrowList(Map<String, Object> map);

	Map<String, Object> updateApprovalInStore(Map<String, Object> map);

	Map<String, Object> updateApprovalOutStore(Map<String, Object> map);

	Map<String, Object> updateApprovalBorrow(Map<String, Object> map);

	Map<String, Object> getApprovalBorrowListGoods(Map<String, Object> map);

	Map<String, Object> setApproverList(Map<String, Object> map);

	Map<String, Object> getApproverList(Map<String, Object> map);

}
