package com.xr.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.MultipartFilter;

import com.xr.service.ZC_FileManagerService;

/**
 * 技术规范文档管理
 * @author Administrator
 *
 */
@RequestMapping("/zcFileManager")
@Controller
public class ZC_FileManagerController {
	
	@Autowired
	private ZC_FileManagerService service;
	
	/**
	 * 上传技术规范文档
	 * @param files
	 * @return
	 */
	@RequestMapping("/uploadFile")
	@ResponseBody
	public Map<String,Object> uploadFile(@RequestParam MultipartFile []files){
		Map<String,Object> resultMap = service.uploadFile(files);
		return resultMap;
	}
	
	/**
	 * 获取文件列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getFileList")
	@ResponseBody
	public Map<String,Object> getFileList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.getFileList(map);
		return resultMap;
	}
	
	/**
	 * 删除文件
	 * @param map
	 * @return
	 */
	@RequestMapping("/delFile")
	@ResponseBody
	public Map<String,Object> delFile(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = service.delFile(map);
		return resultMap;
	}
	
	/**
	 * 下载文件
	 * @param map
	 * @return
	 */
	@RequestMapping("/downLoadFile")
	@ResponseBody
	public void downLoadFile(@RequestParam Map<String, Object> map, HttpServletResponse response) {
		String path = map.get("path").toString();
		File file = new File(path);
		if(file.length() == 0){
			return;
		}
		
		InputStream in = null;
		try {
			response.reset();
			response.setContentType("application/octet-stream; charset=UTF-8");
			response.setHeader("Content-Disposition", "attachment; filename="+new String(file.getName().getBytes("utf-8"),"ISO8859-1"));
			
			in = new FileInputStream(file);
			OutputStream os = response.getOutputStream();
			byte[] buffer = new byte[1024];
			int len;
			while ((len = in.read(buffer)) > 0) {
				os.write(buffer, 0, len);
			}
			os.flush();
			in.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 文件在线预览
	 * @param map
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/viewFileOnLine")
	@ResponseBody
	public Map<String,Object> viewFileOnLine(@RequestParam Map<String, Object> map,HttpServletRequest request) throws Exception {
		Map<String,Object> resultMap = service.viewFileOnLine(map,request);
		return resultMap;
	}
}
