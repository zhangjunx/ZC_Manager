package com.xr.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.dao.HY_MeetingSummaryMapper;
import com.xr.entity.HY_MeetingSummary;
import com.xr.service.HY_MeetingSummaryService;
import com.xr.util.DownloadFile;

@Service
public class HY_MeetingSummaryServiceImpl implements HY_MeetingSummaryService {
	
	@Autowired
	private HY_MeetingSummaryMapper meetingSummaryMapper;

	@Override
	public Map<String,Object> getOneSummaryInfo(Map<String,Object> map) {
		Map<String,Object> oneInfo = meetingSummaryMapper.getOneSummaryInfo(map);
		return oneInfo;
	}

	@Override
	public int saveOneSummaryInfo(MultipartFile file, String uploadPath, HY_MeetingSummary meetingSummary) throws IllegalStateException, IOException {
		//上传文件
		if(!file.isEmpty() && file != null){
			//获取时间戳，以时间戳作为存储名称
			long fileRealName = new Date().getTime();
			
			//获取文件后缀
			int pointIndex = file.getOriginalFilename().indexOf(".");            //点号的位置
		    String fileSuffix = file.getOriginalFilename().substring(pointIndex);       //截取文件后缀
			
			//服务器文件存取路径
			File savedFile = new File(uploadPath + "\\" + fileRealName+fileSuffix);
			file.transferTo(savedFile);
			
			meetingSummary.setFilepath(uploadPath + "\\" + fileRealName+fileSuffix);
		}
		
		//保存表单
		int b = meetingSummaryMapper.saveOneSummaryInfo(meetingSummary);
		return b;
	} 
	
	public List<Map<String,Object>> getSummaryList(){
		List<Map<String,Object>> list = meetingSummaryMapper.getSummaryList();
		return list;
		
	}

	@Override
	public Map<String,Object> getSummaryFile(Map<String, Object> map) {
		Map<String,Object> info = meetingSummaryMapper.getSummaryPath(map);
		return info;
	}
}
