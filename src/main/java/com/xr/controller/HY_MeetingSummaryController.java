package com.xr.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.alibaba.fastjson.JSON;
import com.xr.entity.HY_MeetingSummary;
import com.xr.service.HY_MeetingSummaryService;
import com.xr.util.DownloadFile;
import com.xr.util.FilePathCreate;

@Controller
@RequestMapping("/meetingsummary")
public class HY_MeetingSummaryController {
	
	@Autowired
	private HY_MeetingSummaryService meetingSummaryService;
	
	/**
	 * 获取会议纪要信息
	 */
	@RequestMapping("/getOneSummaryInfo")
	@ResponseBody
	public Map<String,Object> getOneSummaryInfo(@RequestParam Map<String,Object> map,HttpServletResponse resp){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		Map<String,Object> oneInfo = meetingSummaryService.getOneSummaryInfo(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", oneInfo);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 添加会议纪要
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	@RequestMapping("/saveOneSummaryInfo")
	@ResponseBody
	public Map<String,Object> saveOneSummaryInfo(@RequestParam(required=false) MultipartFile file,String json) throws FileNotFoundException, IOException{
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Properties properties = new Properties();
		HY_MeetingSummary meetingSummary = JSON.parseObject(json, HY_MeetingSummary.class);
		properties = PropertiesLoaderUtils.loadAllProperties("loadParm.properties");
		String basePath = (String) properties.get("filePath");
		String uploadPath = basePath+"\\meetingFile";
		boolean b = FilePathCreate.checkExist(uploadPath);
		if(!b){
			FilePathCreate.createPath(uploadPath);
		}
		
		int b1 = meetingSummaryService.saveOneSummaryInfo(file,uploadPath,meetingSummary);
		if(b1>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功！");
			resultMap.put("result", true);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败！");
			resultMap.put("result", false);
		}
		return resultMap;
	}
	
	/**
	 * 下载会议纪要信息
	 */
	@RequestMapping("/getSummaryFile")
	@ResponseBody
	public Map<String,Object> getSummaryFile(@RequestParam Map<String,Object> map,
			HttpServletResponse resp,HttpServletRequest request){
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map<String,Object> info = meetingSummaryService.getSummaryFile(map);
		if(info != null){
			String path = info.get("filepath").toString();
			DownloadFile.download(path,resp,request);
			resultMap.put("flag", true);
			resultMap.put("reason", "下载成功！");
			resultMap.put("result", true);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "下载失败！");
			resultMap.put("result", true);
		}
		return resultMap;
	}
}
