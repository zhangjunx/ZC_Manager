package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.FacePayCallBackService;

@RequestMapping("/facePayCallBack")
@Controller
public class FacePayCallBackController {
	
	@Autowired
	private FacePayCallBackService facePayCallBackService;
	
	/**
	 * 设备识别回调
	 * @param map
	 * @param response
	 * @param request
	 * @return
	 */
	@RequestMapping("/identifyCallBack")
	@ResponseBody
	public Map<String,Object> identifyCallBack(@RequestParam Map<String,Object> map,HttpServletResponse response,HttpServletRequest request){
		/*Map<String,Object> resultMap = facePayService.identifyCallBack(map);*/
		Map<String,Object> resultMap = new HashMap<String, Object>();
		try {
			facePayCallBackService.identifyCallBack(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		resultMap.put("result", 1);
		resultMap.put("success", true);
		return resultMap;     
	}
	
	/**
	 * 设备心跳回调
	 * @param map
	 * @param response
	 * @param request
	 * @return
	 */
	public Map<String,Object> deviceHeartBeat(@RequestParam Map<String,Object> map,HttpServletResponse response,HttpServletRequest request){
		/*Map<String,Object> resultMap = facePayService.identifyCallBack(map);*/
		Map<String,Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", "0");
		resultMap.put("success", false);
		return resultMap;     
	}
}
