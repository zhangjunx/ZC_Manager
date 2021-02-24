package com.xr.util;

import java.beans.PropertyDescriptor;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.beanutils.PropertyUtilsBean;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * @ClassName TypeConversion
 * @Description 类型转换工具
 * @Author csc
 * @Date 2019年月6日 下午1:58:53
 */
public class TypeConversionUtil {
 
	/**
	 * Map<String,Object>转换成实体类的方法
	 * @param map
	 * @param clazz
	 */
	public static <T> T map2Object(Map<String, Object> map, Class<T> clazz) {
        
         
        if (map == null) {
            return null;
        }
        T obj = null;
        try {
            // 使用newInstance来创建对象
            obj = clazz.newInstance();
            // 获取类中的所有字段
            Field[] fields = obj.getClass().getDeclaredFields();
            for (Field field : fields) {
                int mod = field.getModifiers();
                // 判断是拥有某个修饰符
                if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
                    continue;
                }
                // 当字段使用private修饰时，需要加上
                field.setAccessible(true);
                // 获取参数类型名字
                String filedTypeName = field.getType().getName();
                // 判断是否为时间类型，使用equalsIgnoreCase比较字符串，不区分大小写
                // 给obj的属性赋值
                if (filedTypeName.equalsIgnoreCase("java.util.date")) {
                    String datetimestamp = (String) map.get(field.getName());
                    if (datetimestamp.equalsIgnoreCase("null")) {
                        field.set(obj, null);
                    } else {
                        field.set(obj, ThreadLocalDateUtil.parse(datetimestamp));
                    }
                } else {
                    field.set(obj, map.get(field.getName()));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return obj;
    }//end 方法
	
	 /**
	  * java实体类转换成Map类型
	  * @param obj
	  * @return
	  */
	public static Map<String, Object> beanToMap(Object obj) { 
        Map<String, Object> params = new HashMap<String, Object>(0); 
        try { 
            PropertyUtilsBean propertyUtilsBean = new PropertyUtilsBean(); 
            PropertyDescriptor[] descriptors = propertyUtilsBean.getPropertyDescriptors(obj); 
            for (int i = 0; i < descriptors.length; i++) { 
                String name = descriptors[i].getName(); 
                if (!"class".equals(name)) { 
                    params.put(name, propertyUtilsBean.getNestedProperty(obj, name)); 
                } 
            } 
        } catch (Exception e) { 
            e.printStackTrace(); 
        } 
        return params; 
}//end
	
	
	/**
	 * String类型得json用来解析返回Map
	 * @param json
	 */
	public static Map<String, Object> stringToMap(String json) {
		JSONObject obj = new JSONObject().parseObject(json);
		Map<String, Object> mapjson = new HashMap<>();
 
		for (String str : obj.keySet()) {
			mapjson.put(str, obj.get(str));
		}
		return mapjson;
	}//end
	
	/**
    *
    * Map转String
    * @param map
    * @return
    */
   public static String getMapToString(Map<String,Object> map){
       Set<String> keySet = map.keySet();
       //将set集合转换为数组
       String[] keyArray = keySet.toArray(new String[keySet.size()]);
       //给数组排序(升序)
       Arrays.sort(keyArray);
       //因为String拼接效率会很低的，所以转用StringBuilder
       StringBuilder sb = new StringBuilder();
       for (int i = 0; i < keyArray.length; i++) {
           // 参数值为空，则不参与签名 这个方法trim()是去空格
           if ((String.valueOf(map.get(keyArray[i]))).trim().length() > 0) {
               sb.append(keyArray[i]).append(":").append(String.valueOf(map.get(keyArray[i])).trim());
           }
           if(i != keyArray.length-1){
               sb.append(",");
           }
       }
       return sb.toString();
   }//end
	
   /**
    * base64转化成File
    * @param base64
    * @param fileName
    */
   public static File base64ToFile(String base64, String fileName) {
       File file = null;
       //创建文件目录
       String filePath="D:\\image";
       File  dir=new File(filePath);
       if (!dir.exists() && !dir.isDirectory()) {
               dir.mkdirs();
       }
       BufferedOutputStream bos = null;
       java.io.FileOutputStream fos = null;
       try {
           byte[] bytes = Base64.getDecoder().decode(base64);
           file=new File(filePath+"\\"+fileName);
           fos = new java.io.FileOutputStream(file);
           bos = new BufferedOutputStream(fos);
           bos.write(bytes);
       } catch (Exception e) {
           e.printStackTrace();
       } finally {
           if (bos != null) {
               try {
                   bos.close();
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
           if (fos != null) {
               try {
                   fos.close();
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
       }
	return dir;
   }//end
   
   /**
          * 将File类型的文件转化成地址
    * @param filePath
    * @throws IOException
    */
   public static byte[] InputStream2ByteArray(String filePath) throws IOException {
	  
	    InputStream in = new FileInputStream(filePath);
	    byte[] data = toByteArray(in);
	    in.close();
	    return data;
	}
	 
  private static byte[] toByteArray(InputStream in) throws IOException {
	    ByteArrayOutputStream out = new ByteArrayOutputStream();
	    byte[] buffer = new byte[1024 * 4];
	    int n = 0;
	    while ((n = in.read(buffer)) != -1) {
	        out.write(buffer, 0, n);
	    }
	    return out.toByteArray();
	}//end
   
   
   /**
           * 将Byte数组转换成文件
    * @param bytes
    * @param filePath
    * @param fileName
    */
   public static File getFileByBytes(byte[] bytes, String filePath, String fileName) {
       BufferedOutputStream bos = null;
       FileOutputStream fos = null;
       File file = null;
       try {
           File dir = new File(filePath);
           if (!dir.exists()) {// 判断文件目录是否存在
               dir.mkdirs();
           }
           file = new File(filePath + fileName);
           fos = new FileOutputStream(file);
           bos = new BufferedOutputStream(fos);
           bos.write(bytes);
       } catch (Exception e) {
           e.printStackTrace();
       } finally {
           if (bos != null) {
               try {
                   bos.close();
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
           if (fos != null) {
               try {
                   fos.close();
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
       }
	return file;
   }//end
   
   private static int BUFFER_SIZE = 10240; // 缓冲区大小(缓冲区越大下载的越快,但是要根据自己的服务器配置) 
   /** 
    * 将HTTP资源另存为文件 
    *  
    * @param destUrl 
    *            String 
    * @param fileName 
    *            String 
    * @throws Exception 
    */  
   public static  void saveToFile(String destUrl, String fileName) throws IOException {  
       FileOutputStream fos = null;  
       BufferedInputStream bis = null;  
       HttpURLConnection httpUrl = null;  
       URL url = null;  
       byte[] buf = new byte[BUFFER_SIZE];  
       int size = 0;  
 
       // 建立链接  
       url = new URL(destUrl);  
       httpUrl = (HttpURLConnection) url.openConnection();  
       // 连接指定的资源  
       httpUrl.connect();  
       // 获取网络输入流  
       bis = new BufferedInputStream(httpUrl.getInputStream());  
       // 建立文件  
       fos = new FileOutputStream(fileName);  
       // 保存文件  
       while ((size = bis.read(buf)) != -1)  
           fos.write(buf, 0, size);  
 
       fos.close();  
       bis.close();  
       httpUrl.disconnect();  
   }//end
   
   /**
    * String转化成List<Map<String, Object>>
    * @param json
    */
   public static List<Map<String, Object>> stringToListMap(String json){
       List<Object> list =JSON.parseArray(json);
        
       List< Map<String,Object>> listw = new ArrayList<Map<String,Object>>();
       for (Object object : list){
       Map<String,Object> ageMap = new HashMap<String,Object>();
       Map <String,Object> ret = (Map<String, Object>) object;//取出list里面的值转为map
       /*for (Entry<String, Object> entry : ret.entrySet()) { 
           ageMap.put(entry.getKey());
           System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue()); 
           listw.add(ageMap);  //添加到list集合  成为 list<map<String,Object>> 集合
       }  */
       listw.add(ret);
       }
       return listw;
   }//end
	 
}
