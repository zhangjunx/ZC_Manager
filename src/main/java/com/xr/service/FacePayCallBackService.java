package com.xr.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface FacePayCallBackService {

	void identifyCallBack(Map<String, Object> map) throws Exception;

}
