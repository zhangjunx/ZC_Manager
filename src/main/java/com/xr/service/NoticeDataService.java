package com.xr.service;

import java.util.List;
import java.util.Map;

public interface NoticeDataService {

	Map<String, Object> getMeeingNoticeList(Map<String, Object> map);

	void updateWatchSatus(Map<String, Object> map);

}
