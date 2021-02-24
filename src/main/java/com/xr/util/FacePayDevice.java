package com.xr.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.xr.service.FP_ConsumeRecordService;

@Service
public class FacePayDevice implements InitializingBean {
	
	 @Autowired
	 private FP_ConsumeRecordService consumeRecordService;
	 /**
	  * 请求接口
	  * @param requestUrl
	  * @param map
	  * @return
	  * @throws Exception
	  */
	 public static Map<String,Object> sentToURL(String requestUrl, Map<String,Object> map,String method) throws Exception {
		 JSONObject jsonObj=new JSONObject(map);
		 String params = jsonObj.toString();
	     URL url = new URL(requestUrl);
		 // 打开和URL之间的连接
		 HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		 connection.setConnectTimeout(1000);
		 // 设置通用的请求属性
		 connection.setRequestMethod(method);
		 connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
		 connection.setRequestProperty("Connection", "Keep-Alive");
		 connection.setUseCaches(false);
		 connection.setDoOutput(true);
		 connection.setDoInput(true);
	
		 // 得到请求的输出流对象
		 DataOutputStream out = new DataOutputStream(connection.getOutputStream());
		 out.write(params.getBytes("UTF-8"));
		 out.flush();
		 out.close();
	
		 // 建立实际的连接
		 connection.connect();
		 // 获取所有响应头字段
		 Map<String, List<String>> headers = connection.getHeaderFields();
		 // 遍历所有的响应头字段
		 for (String key : headers.keySet()) {
			 System.out.println(key + "--->" + headers.get(key));
		 }
		 // 定义 BufferedReader输入流来读取URL的响应
		 BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
		 String result = "";
		 String getLine;
		 while ((getLine = in.readLine()) != null) {
			 result += getLine;
		 }
		 in.close();
		 JSONObject jsonObject = JSONObject.parseObject(result);
		 Map<String, Object> resultMap = (Map) jsonObject;
		 return resultMap;
	 }
	 
	 public static void main(String[] args) throws Exception {
		/* Map<String,Object> map = new HashMap<String,Object>();
		 List<Map<String,Object>> parmMap = getPersonList(map);
		 
		 Map<String,Object> parmMap2 = new HashMap<String,Object>();
		 parmMap2.put("person", parmMap);
		 parmMap2.put("pass", 12345);
		 String url="http://192.168.1.197:8090/person/create";
		 Map<String,Object> resultMap = sentToURL(url,parmMap2);
		 System.out.println(resultMap);*/
	 }
	 
	 /**
	  * 获取人员信息列表（包含人员有效时间）
	  * @param map
	  * @return
	  */
	 public List<Map<String,Object>> getPersonList(Map<String,Object> map){
		 /*Map<String,Object> resultMap = new HashMap<String,Object>();
		 resultMap.put("id", "0014");
		 resultMap.put("idcardNum", "");
		 resultMap.put("name", "wing");
		 resultMap.put("IDNumber", "411403199203267215");
		 resultMap.put("facePermission", "1");
		 resultMap.put("idCardPermission", "2");
		 resultMap.put("faceAndCardPermission", "2");
		 resultMap.put("IDPermission", "2");*/
		 
		 List<Map<String,Object>> list = consumeRecordService.getHolderList(map);
		 return list;
	 }
	 
	 public void startJob() throws Exception{
		 Calendar now = Calendar.getInstance();
		 int hh = now.get(Calendar.HOUR_OF_DAY);
		 int mm = now.get(Calendar.MINUTE);
		 String result = hh+":"+mm;
		 while(true){
			 System.out.println(result);
			 Thread.sleep(10000);    //延时2秒
			 if(result.equals("18:36")){
				 Map<String,Object> map = new HashMap<String,Object>();
				 List<Map<String,Object>> personList = getPersonList(map);
				 for(int i = 0;i<personList.size();i++){
					 Map<String,Object> parmMap2 = new HashMap<String,Object>();
					 Map<String,Object> oneInfo = new HashMap<String,Object>();
					 oneInfo.put("id", personList.get(i).get("holderNo"));
					 oneInfo.put("idcardNum", "");
					 oneInfo.put("name", personList.get(i).get("holderName"));
					 oneInfo.put("IDNumber", personList.get(i).get("idCard"));
					 oneInfo.put("facePermission", "1");
					 oneInfo.put("idCardPermission", "2");
					 oneInfo.put("faceAndCardPermission", "2");
					 oneInfo.put("IDPermission", "2");
					 
					 parmMap2.put("person", oneInfo);
					 parmMap2.put("pass", 12345);
					 String url="http://192.168.1.197:8090/person/create";
					 Map<String,Object> resultMap = sentToURL(url,parmMap2,"POST");
					 System.out.println(resultMap);
				 }
				 
			 }
		 }
	 }

	@Override
	public void afterPropertiesSet() throws Exception {
		startJob();
	}
}
