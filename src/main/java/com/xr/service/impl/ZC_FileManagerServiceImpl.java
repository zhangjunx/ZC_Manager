package com.xr.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import com.xr.dao.ZC_FileManagerMapper;
import com.xr.service.ZC_FileManagerService;
import com.xr.util.DateTools;
import com.xr.util.FilePathCreate;

@Service
public class ZC_FileManagerServiceImpl implements ZC_FileManagerService {

	@Value("${filePath}")  
	private String basePath; 
	
	@Value("${goodsFileTmpl}")  
	private String goodsFileTmpl; 
	
	/*
	 * 上传技术规范文档
	 * (non-Javadoc)
	 * @see com.xr.service.ZC_FileManagerService#uploadFile(org.springframework.web.multipart.MultipartFile[])
	 */
	@Override
	public Map<String, Object> uploadFile(MultipartFile[] files) {
		Map<String,Object> resultMap = new HashMap<>();
		List<Map<String,Object>> list = new ArrayList<>();
		String path = basePath+"\\goodsFile";
		
		if(!FilePathCreate.checkExist(path)){
			FilePathCreate.createPath(path);
		}
		try { 
			File file = new File(path); 
			String[] filelist = file.list(); 
			for(int k=0;k<files.length;k++){
				String upladName = files[k].getOriginalFilename();
				if(Arrays.asList(filelist).contains(upladName)){//文件名存在
					continue;
				}
				//上传文件
				uploadFile(files[k], path);
			}
			
		} catch (Exception e) { 
			e.printStackTrace(); 
		} 
		resultMap.put("result", 1);
		resultMap.put("flag", true);
		resultMap.put("reason", "上传成功！");
		return resultMap;
	}
	
	/*
	 * 获取文件列表
	 * (non-Javadoc)
	 * @see com.xr.service.ZC_FileManagerService#getFileList(java.util.Map)
	 */
	@Override
	public Map<String, Object> getFileList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<>();
		List<Map<String,Object>> list = new ArrayList<>();
		String path = basePath+"\\goodsFile";
		try { 
			File file = new File(path); 
			String[] filelist = file.list(); 
			for (int i = 0; i < filelist.length; i++) { 
				Map<String,Object> oneInfo = new HashMap<>();
				String tmplPath = path+"\\"+filelist[i];
				File tmplFile = new File(tmplPath);
				long lon = tmplFile.lastModified();
				String updateTime = DateTools.timeStamp2Date(lon+"", "yyyy-MM-dd HH:mm:ss");
				if(map.get("fileName") != null && !map.get("fileName").toString().equals("")){
					if(filelist[i].contains(map.get("fileName").toString())){
						oneInfo.put("path", path+"\\"+filelist[i]);
						oneInfo.put("fileName", filelist[i]);
						oneInfo.put("updateTime", updateTime);
						list.add(oneInfo);
					}
				}else{
					oneInfo.put("path", path+"\\"+filelist[i]);
					oneInfo.put("fileName", filelist[i]);
					oneInfo.put("updateTime", updateTime);
					oneInfo.put("path", path+"\\"+filelist[i]);
					list.add(oneInfo);
				}
			} 
		} catch (Exception e) { 
			e.printStackTrace(); 
		} 
		if(list.size()>0){
			resultMap.put("result", list);
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("result", list);
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}
	
	/*
	 * 删除文件
	 * (non-Javadoc)
	 * @see com.xr.service.ZC_FileManagerService#delFile(java.util.Map)
	 */
	@Override
	public Map<String, Object> delFile(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<>();
		if(map.get("fileName") == null || map.get("fileName").toString().equals("")){
			resultMap.put("result", null);
			resultMap.put("flag", false);
			resultMap.put("reason", "fileName不能为空！");
			return resultMap;
		}
		FilePathCreate.deleteFile(map.get("fileName").toString());
		resultMap.put("result", 1);
		resultMap.put("flag", true);
		resultMap.put("reason", "更新成功！");
		return resultMap;
	}
	
	public String uploadFile(MultipartFile file,String uploadPath){
		if(!file.isEmpty() && file != null){
			String fileRealName = file.getOriginalFilename();
			File savedFile = new File(uploadPath+"\\"+fileRealName);//服务器文件存取路径
			try {
				file.transferTo(savedFile);
				return uploadPath+"\\"+fileRealName;
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
				return "0";
			}
		}else{
			return "0";
		}
	}

	@Override
	public Map<String, Object> viewFileOnLine(Map<String, Object> map,HttpServletRequest request) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		String path = map.get("path").toString();
		File file = new File(path);
		if(file.length() == 0){
			resultMap.put("result", null);
			resultMap.put("flag", false);
			resultMap.put("reason", "文件不存在！");
			return resultMap;
		}
		
		String extension = path.substring(path.lastIndexOf("."));
		if(!extension.toUpperCase().equals(".DOC") 
				&& !extension.toUpperCase().equals(".DOCX")
				&& !extension.toUpperCase().equals(".PDF")){
			resultMap.put("result", null);
			resultMap.put("flag", false);
			resultMap.put("reason", "文件不支持在线预览！");
			return resultMap;
		}
		
		String absultPath=request.getSession().getServletContext().getRealPath("fixedGoodsManagement/goodsFileTmpl/");
		String tmplPath = absultPath+file.getName().replace(extension, ".pdf");
		File tmplFile = new File(tmplPath);
		if(!tmplFile.exists()){
			if(extension.toUpperCase().equals(".PDF")){
				FilePathCreate.copyNio(path, absultPath+file.getName());
			}else{
				FilePathCreate.word2PDF(path, absultPath+file.getName().replace(extension, ".pdf"));
			}
		}
		
		resultMap.put("result", goodsFileTmpl+file.getName().replace(extension, ".pdf"));
		resultMap.put("flag", true);
		resultMap.put("reason", "转换成功！");
		return resultMap;
	}

}
