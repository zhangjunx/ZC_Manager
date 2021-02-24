package com.xr.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

public interface ZC_FileManagerService {

	Map<String, Object> uploadFile(MultipartFile[] files);

	Map<String, Object> getFileList(Map<String, Object> map);

	Map<String, Object> delFile(Map<String, Object> map);

	Map<String, Object> viewFileOnLine(Map<String, Object> map, HttpServletRequest request) throws Exception;

}
