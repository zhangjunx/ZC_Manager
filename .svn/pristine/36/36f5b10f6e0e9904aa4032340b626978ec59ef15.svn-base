package com.xr.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;

public interface RC_PrisonerService {

	Map<String, Object> getPrisonerList(Map<String, Object> map);

	Map<String,Object> insertPerWithImport(JSONArray jsonArray);

	Map<String,Object> updatePrisonerList(Map<String, Object> map, MultipartFile file) throws IllegalStateException, IOException;

	Map<String, Object> delOnePrison(Map<String, Object> map);

	Map<String, Object> updatePerLabel(Map<String, Object> map);

	Map<String, Object> getOnePrison(Map<String, Object> map);

}
