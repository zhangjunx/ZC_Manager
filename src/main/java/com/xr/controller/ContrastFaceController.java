package com.xr.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.xr.util.CallingInterfaceUtil;

 /**
  * @ClassName ContrastFaceController
  * @Description 人脸识别
  * @Author csc
  * @Date 2019年12月23日 下午9:32:12
  */
@RestController
@RequestMapping("/contrast")
public class ContrastFaceController {
	/**
	 * 平台所用的人脸识别
	 */
	 @RequestMapping("/ContrastFace")
	 public JSONObject ContrastFace(@RequestParam(value="photo",required=false) MultipartFile[] photo,HttpServletRequest request) throws Exception{
		 Map<String, Object> params = new HashMap<String, Object>();
		 String fileName=null;
		 String filePath = null;
		 List<String> list=new ArrayList<String>();
		 int t=1;
		 for (MultipartFile photo1:photo) {
				 if(!photo1.isEmpty()){	 
					//获取文件要保存的绝对路径
		             filePath=request.getServletContext().getRealPath("/");
		             //D:\tools\apache-tomcat-8.5.39\webapps\SyrisFactory\
		             //C:\JDK\tomcat\webapps
		             File file=new File(filePath+"personVehicleRegistration/baseImg");
		             if(!file.exists()){
		                 file.mkdirs();
		             }
		             //获取上传的文件名加后缀 旧文件名 oldFileName
		             fileName=photo1.getOriginalFilename();
		             //文件名后缀名
		             String fileSuffix=fileName.substring(fileName.lastIndexOf("."), fileName.length());
		             //新的文件名newFileName
		             fileName=new Date().getTime()+"_"+new Random().nextInt(1000)+fileSuffix;
		             File newFile=new File(file+"/"+fileName);
		             String imgUrl="personVehicleRegistration/baseImg/"+fileName;
		             try {
		                 //将文件上传到服务器
		                 photo1.transferTo(newFile);
		                 params.put("P"+t, fileName);
		                 list.add(imgUrl);
		                 t++;
		                  } catch (IOException e) {
		                      e.printStackTrace();
		              }
		      }//end 结束判断照片是否为空
		}//end for循环读取图片
		 JSONObject json = (JSONObject) JSONObject.toJSON(params);
		 //String url="http://192.168.1.191:8081/Face";
		 
		 //String url="http://32.72.120.114:8081/Face";
		 String url="http://47.112.104.72:8081/Face";
		 JSONObject a=CallingInterfaceUtil.httpInterfaceForJson(url,"POST",json);
		 //String code=a.getString("ResultStatus");
		 a.put("idimgurl",list.get(0));
		 a.put("dataimgurl",list.get(1));
		 System.out.println(a);
		 return a;
	 }//end 方法ContrastFace C:\JDK\apache-tomcat-8.5.39\webapps\SyrisFactory\personVehicleRegistration\baseImg
	 
	 /**
	  * 小程序专用接口
	  * @param photo
	  * @param request
	  * @throws IOException
	  */
	 @RequestMapping("/AppleContrastFace")
	 public JSONObject AcceptData(@RequestBody Map<String, Object> photo,HttpServletRequest request) throws IOException{
			Map<String, Object> params = new HashMap<String, Object>();
	 		  List<String>  list =    (List<String>) photo.get("photo");
	 		   String fileName=null;
			   String filePath = null;
	 		    int t=1;
	 		    for (int i = 0; i < list.size(); i++) {
			             //新的文件名newFileName
			             fileName=new Date().getTime()+"_"+new Random().nextInt(100000);
			             String url="C:/JDK/apache-tomcat-8.5.39/webapps/SyrisFactory/personVehicleRegistration"
			             		+ "/baseImg/"+fileName+".jpg";
			             str2File(list.get(i),url);
			             params.put("P"+t, fileName+".jpg");
			             t++;
				}
	 		   JSONObject json = (JSONObject) JSONObject.toJSON(params);
	 			 //String url="http://192.168.1.191:8081/Face";
	 			 String url="http://47.112.104.72:8081/Face";
	 			 JSONObject a=CallingInterfaceUtil.httpInterfaceForJson(url,"POST",json);
			return a;
		}//end
	 
	 
	 /**
	  * @param fileStr  要写入的图片
	  * @param filePath 图片存放路径
	  */
	 public static boolean str2File(String fileStr,String filePath){
			//
			if (fileStr == null) //文件数据为空
				return false;
		 
			try {
				//Base64解码
				byte[] b = Base64.decodeBase64(fileStr);
				for(int i=0;i<b.length;++i){
					if(b[i]<0){//调整异常数据
						b[i]+=256;
					}
				}
				//生成文件，并保存在服务器硬盘上
				OutputStream out = new FileOutputStream(filePath);    
				out.write(b);
				out.flush();
				out.close();
				return true;
			} catch (Exception e)  {
				e.printStackTrace();
				return false;
			}
		}//end 方法
	 
	 
	
}
