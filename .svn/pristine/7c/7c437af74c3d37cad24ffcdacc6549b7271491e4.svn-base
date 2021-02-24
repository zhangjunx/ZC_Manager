package com.xr.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DownloadFile {
	public static void download(String filePath,HttpServletResponse response,HttpServletRequest request){
		BufferedInputStream bis = null;
	    BufferedOutputStream bos = null;
	    try {
	      //获取文件名
	      String fileName = filePath.substring(filePath.lastIndexOf("\\")+1);
	      response.setCharacterEncoding("utf-8");
	      response.setContentType("application/octet-stream");
	      //response.setContentType("application/force-download");
	      //处理下载弹出框名字的编码问题
	      response.setHeader("Content-Disposition", "attachment;fileName="
	          + new String( fileName.getBytes("gb2312"), "ISO8859-1" ));
	      //利用输入输出流对文件进行下载
	      InputStream inputStream = new FileInputStream(filePath);
	      //设置文件大小
	      response.setHeader("Content-Length", String.valueOf(inputStream.available()));
	 
	      bis = new BufferedInputStream(inputStream);//构造读取流
	      bos = new BufferedOutputStream(response.getOutputStream());//构造输出流
	      byte[] buff = new byte[1024];
	      int bytesRead;
	      //每次读取缓存大小的流，写到输出流
	      while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
	        bos.write(buff, 0, bytesRead);
	        bos.flush();
	      }
	      response.flushBuffer();//将所有的读取的流返回给客户端
	 
	    } catch (FileNotFoundException e) {
	      e.printStackTrace();
	    } catch (IOException e) {
	      e.printStackTrace();
	    }finally{
	      try{
	        if(null != bis){
	          bis.close();
	        }
	        if(null != bos){
	          bos.close();
	        }
	      }catch(IOException e){
	        System.out.println("下载文件失败,"+"文件路径:"+filePath+e);
	      }
	    }
	}
}
