package com.xr.util;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

/**
 * @ClassName: SenseLinkConfig
 * @Description: 这是调用SenseLink平台的配置类
 * @author: csc
 * @Company: syris
 * @date: 2020年4月6日 上午9:22:32
 * @param:
 */
public class SenseLinkConfig {

	
	 /**玺瑞唯一部门的code*/
     public static final String DEPARTMETN_CODE="E10ADC3949BA59ABBE56E057F20F883E";
	
	 /**SenseLink中的公共的APP_SECRET(秘钥)*/
     public static final String APP_SECRET="7efb17b01619ddccb2b47a7dc76155d8";
	
	 /**SenseLink中的公共app_key*/
     public static final String APP_KEY="ee5650724ec25a9a";
	 
	 /**接口公共地址*/
     public static final String URL="http://222.191.249.42:5051/api";
	 
	 
	 /**拼接识别头像的路径*/
     public static final String PHOTO_PATH="http://222.191.249.42:5051/v1/image/2/";
	
     /**
	  * 该方法用于封装给SenseLink平台常用的三个参数
	  * APP_KEY : app_key
	  * sign :签证
	  * timestamp当前时间错
	  * 这三个参数在请求SenseLink中的任何接口都是必传参数
	  * @return
	  */
	 public static Map<String, String> CommonlySplicing(){
		 Map<String, String> params = new HashMap<String, String>();
		 /**获取当前时间戳*/
	      AtomicLong uniqueseed = new AtomicLong(System.currentTimeMillis());
		 long st = uniqueseed .incrementAndGet();//获取当前时间戳
		   //时间戳在前,秘钥在后
		  String sing= String.valueOf(st)+"#"+APP_SECRET;
		  String sign = EncryptionUtil.getMD5(sing, false, 32);
		  params.put("app_key", APP_KEY);
		  params.put("sign", sign);
		  params.put("timestamp", String.valueOf(st));
		return params;
	 }//end
	
	
	
	
	
	
	
	
	
	
}//end class
