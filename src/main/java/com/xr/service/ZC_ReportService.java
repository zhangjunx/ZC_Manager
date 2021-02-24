package com.xr.service;

import java.util.Map;

public interface ZC_ReportService {

	Map<String, Object> getInStoreListReport(Map<String, Object> map);

	Map<String, Object> getOutStoreListReport(Map<String, Object> map);

	Map<String, Object> getBorrowedStoreListReport(Map<String, Object> map);

}
