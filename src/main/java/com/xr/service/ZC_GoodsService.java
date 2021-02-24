package com.xr.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface ZC_GoodsService {

	Map<String, Object> getList(Map<String, Object> map);

	Map<String, Object> addInfo(Map<String, Object> map, MultipartFile file) throws IOException;

	Map<String, Object> getOne(Map<String, Object> map);

	Map<String, Object> delOne(Map<String, Object> map);

}
