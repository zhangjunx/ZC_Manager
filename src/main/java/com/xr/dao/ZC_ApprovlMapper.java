package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface ZC_ApprovlMapper {

	List<Map<String, Object>> getApprovalInStoreList(Map<String, Object> map);

	int getApprovalInStoreListCount(Map<String, Object> map);

	List<Map<String, Object>> getApprovalOutStoreList(Map<String, Object> map);

	int getApprovalOutStoreListCount(Map<String, Object> map);

	List<Map<String, Object>> getApprovalBorrowList(Map<String, Object> map);

	int getApprovalBorrowListCount(Map<String, Object> map);

	int updateApprovalInStore(Map<String, Object> map);

	int updateApprovalBorrow(Map<String, Object> map);

	int updateApprovalOutStore(Map<String, Object> map);

	List<Map<String, Object>> getApprovalBorrowListGoods(Map<String, Object> map);

	int getApprovalBorrowListGoodsCount(Map<String, Object> map);

	int setApproverList(Map<String, Object> map);

	int setDisApproverList(Map<String, Object> map);

	List<Map<String, Object>> getApproverList(Map<String, Object> map);

}
