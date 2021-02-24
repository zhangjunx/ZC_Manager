package com.xr.service;

import java.util.Map;

public interface RC_PrisonCallRecordService {

	Map<String, Object> insertCallRecord(Map<String, Object> map);

	Map<String, Object> getDistribution(Map<String, Object> map);

	Map<String, Object> getTrajectory(Map<String, Object> map);

}
