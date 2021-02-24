package com.xr.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.HY_MeetingSummary;

public interface HY_MeetingSummaryService {

	Map<String, Object> getOneSummaryInfo(Map<String, Object> map);

	int saveOneSummaryInfo(MultipartFile file, String uploadPath, HY_MeetingSummary meetingSummary) throws IllegalStateException, IOException;

	Map<String, Object> getSummaryFile(Map<String, Object> map);

}
