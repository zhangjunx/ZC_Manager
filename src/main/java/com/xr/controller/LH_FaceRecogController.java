package com.xr.controller;

import java.io.BufferedReader;
/*import android.os.Environment;
import android.util.Base64;*/
import java.io.ByteArrayInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.xr.entity.HolderData;
import com.xr.entity.HolderPhoto;
import com.xr.service.IHolderDataService;
import com.xr.service.IHolderPhotoService;
import com.xr.service.ILH_FaceRecogParamService;
/**
 * 认证核算算法
 * @author Administrator
 *
 */
@Controller
@RequestMapping("LH_FaceRecog")
public class LH_FaceRecogController {
	private final static String URL="http://47.112.104.72:7070/FaceSearch";
	private final static String URL2="http://139.9.131.156:7070/FaceSearch";
	
	@Autowired
	private ILH_FaceRecogParamService ifps;
	
	public static void main(String[] args) throws Exception {
		//recog();
	}
	
	@RequestMapping("/holderRecog")
	@ResponseBody
	public  Map<String,Object> holderRecog(String file1,String file2) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String, Object> m=new HashMap<String, Object>();
		Map<String, Object> m1=new HashMap<String, Object>();
		List<Map<String, Object>> list=ifps.getFaceParamListService(m1);
		String url=list.get(0).get("path").toString();
		m.put("file1", file1);
		m.put("file2", file2);
		m.put("method", "Compare");
		m.put("token", "");
		String result=getNet2(url,m,"POST");
		System.out.println("result="+result);
		map=JSONObject.parseObject(result);
		return map;
	}
	
	
	@RequestMapping("/recog")
	@ResponseBody
	public Map<String,Object> recog(String file1,String file2) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String, Object> m=new HashMap<String, Object>();
		Map<String, Object> m1=new HashMap<String, Object>();
		List<Map<String, Object>> list=ifps.getFaceParamListService(m1);
		String url=list.get(0).get("path").toString();
		String[] arr1=file1.split(",");
		String[] arr2=file2.split(",");
		m.put("file1", arr1[1]);
		m.put("file2", arr2[1]);
		m.put("method", "Compare");
		m.put("token", "");
		String result=getNet2(url,m,"POST");
		System.out.println("result="+result);
		map=JSONObject.parseObject(result);
		return map;
	}
	
	 
	
	
	
	
	/**
	 * 请求连接
	 * @param urlStr
	 * @param map
	 * @param method
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public static String getNet2(String urlStr, Map<String, Object> map, String method) throws Exception {
		 JSONObject jsonObj=new JSONObject(map);
		 String params = jsonObj.toString();
	     URL url = new URL(urlStr);
		 // 打开和URL之间的连接
		 HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		 connection.setConnectTimeout(3000);
		 // 设置通用的请求属性
		 connection.setRequestMethod(method);
		 connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
		 connection.setRequestProperty("Connection", "Keep-Alive");
		 //connection.setRequestProperty("token", token);
		 connection.setUseCaches(false);
		 connection.setDoOutput(true);
		 connection.setDoInput(true);
	
		 // 得到请求的输出流对象
		 OutputStream os=connection.getOutputStream();
		 DataOutputStream out = new DataOutputStream(os);
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
		 System.out.println(jsonObject);
		 String str=jsonObject.toString();
		 //Map<String, Object> resultMap = (Map) jsonObject;
		 return str;
	}
	
	
	  
    /**
     * 将map型转为请求参数型
     * @param data
     * @return
     */
    public static String urlencode(Map<String,String> data) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry i : data.entrySet()) {
            try {
                sb.append(i.getKey()).append("=").append(URLEncoder.encode(i.getValue()+"","UTF-8")).append("&");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return sb.toString();
    }


	/**
	 * 文件转base64字符串
	 * 将文件转字节数组字符串，并对其进行base64编码处理
	 */
	public static String fileToBase64(String filePath){
		InputStream is=null;
		byte[] bytes=null;
		//读取文件字节数组
		try {
			is=new FileInputStream(filePath);
			bytes=new byte[is.available()];
			is.read(bytes);
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			try {
				is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		//对字节数组base64编码
		Base64.Encoder encoder=Base64.getEncoder();
		//返回base64 编码过的字节数组字符串
		return encoder.encodeToString(bytes);
		
	}
	
	/**
	 * base64字符串转化为文件，可以是JPEG，PNG，TXT，AVI等等
	 * @throws IOException 
	 */
	public static boolean base64ToFile(String base64FileStr,String filePath) throws IOException {
		// 数据为空
		if(base64FileStr==null){
			System.out.println("不行，oops!");
			return false;
		}
		Base64.Decoder decoder=Base64.getDecoder();
		//base64解码，对字节数组字符串进行base64解码并生成文件
		byte[] bytes=decoder.decode(base64FileStr);
		for(int i=0,len=bytes.length;i<len;i++){
			//调整异常数据
			if(bytes[i]<0){
				bytes[i]+=256;
			}
		}
		OutputStream os=null;
		InputStream is=new ByteArrayInputStream(bytes);
		try{
			//生成指定格式的文件
			os=new FileOutputStream(filePath);
			byte[] buff=new byte[1024];
			int len=0;
			while((len=is.read(buff))!=-1){
				os.write(buff, 0, len);
			}
		}catch(IOException e){
			e.printStackTrace();
		}finally {
			os.flush();
			os.close();
		}
		return true;
	}
	
	
	
	
	/**
     * 文件转base64字符串
     * @param file
     * @return
     */
    /*public static String fileToBase64(File file) {
        String base64 = null;
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            byte[] bytes = new byte[in.available()];
            int length = in.read(bytes);
            base64 = Base64.encodeToString(bytes, 0, length, Base64.DEFAULT);
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return base64;
    }*/

    /**
     * base64字符串转文件
     * @param base64
     * @return
     */
    /*public static File base64ToFile(String base64) {
        File file = null;
        String fileName = "/Petssions/record/testFile.amr";
        FileOutputStream out = null;
        try {
            // 解码，然后将字节转换为文件
            file = new File(Environment.getExternalStorageDirectory(), fileName);
            if (!file.exists())
                file.createNewFile();
            byte[] bytes = Base64.decode(base64, Base64.DEFAULT);// 将字符串转换为byte数组
            ByteArrayInputStream in = new ByteArrayInputStream(bytes);
            byte[] buffer = new byte[1024];
            out = new FileOutputStream(file);
            int bytesum = 0;
            int byteread = 0;
            while ((byteread = in.read(buffer)) != -1) {
                bytesum += byteread;
                out.write(buffer, 0, byteread); // 文件写操作
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if (out!= null) {
                    out.close();
                }
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return file;
    }*/

}
