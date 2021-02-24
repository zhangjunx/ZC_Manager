package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface FP_HolderAccountMapper {

	List<Map<String, Object>> getAccountList(Map<String, Object> map);

	int getAccountListCount(Map<String, Object> map);

	int addAccountList(Map<String, Object> map);

	int updateAccountStatus(Map<String, Object> map);

	List<Map<String, Object>> getRechargingRecordList(Map<String, Object> map);

	int getRechargingRecordListCount(Map<String, Object> map);

	int updateRecharging(Map<String, Object> map);

	int refunds(Map<String, Object> map);

	List<Map<String, Object>> getHolderList(Map<String, Object> map);

	int getHolderListCount(Map<String, Object> map);

	int updateConsumeTypeID(Map<String, Object> map);

	List<Map<String, Object>> getAccountRoleList(Map<String, Object> map);

	int getAccountRoleListCount(Map<String, Object> map);

	void addAccountRole(Map<String, Object> map);

	List<Map<String, Object>> getPerListWithPerID(Map<String, Object> map);

	List<Map<String, Object>> getDeviceListWithPer(Map<String, Object> map);

	int updateRechargingApp(Map<String, Object> map);

	int refundsApp(Map<String, Object> map);

}
