package com.xr.service;

import java.util.List;
import java.util.Map;

public interface FP_HolderAccountService {

	Map<String, Object> getAccountList(Map<String, Object> map);

	Map<String,Object> addAccountList(Map<String, Object> map);

	Map<String,Object> updateAccountStatus(Map<String, Object> map);

	Map<String, Object> getRechargingRecordList(Map<String, Object> map);

	Map<String,Object> updateRecharging(Map<String, Object> map);

	Map<String, Object> getHolderList(Map<String, Object> map);

	int updateConsumeTypeID(Map<String, Object> map);

	Map<String, Object> getAccountRoleList(Map<String, Object> map);

}
