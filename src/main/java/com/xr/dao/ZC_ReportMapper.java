package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface ZC_ReportMapper {

	List<Map<String, Object>> getInStoreListReport(Map<String, Object> map);

	int getBorrowedStoreListReportCount(Map<String, Object> map);

	List<Map<String, Object>> getBorrowedStoreListReport(Map<String, Object> map);

	int getOutStoreListReportCount(Map<String, Object> map);

	List<Map<String, Object>> getOutStoreListReport(Map<String, Object> map);

	int getInStoreListReportCount(Map<String, Object> map);

}
