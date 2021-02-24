package com.xr.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.SortedMap;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.codec.digest.DigestUtils;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * @ClassName: PayUtil
 * @Description: 微信字符的工具类
 * @author: csc
 * @Company: 公司名
 * @date: 2020年3月20日 下午5:15:15
 * @param:
 */
public class PayUtil {
	
	 /**
     * 签名字符串
     * @param text          需要签名的字符串
     * @param key           密钥
     * @param input_charset 编码格式
     * @return 签名结果
     */
    public static String sign(String text, String key, String input_charset) {
        text = text + "&key=" + key;
        return DigestUtils.md5Hex(getContentBytes(text, input_charset));
    }
    /**
     * @param content
     * @param charset
     * @return
     * @throws java.security.SignatureException
     * @throws UnsupportedEncodingException
     */
    public static byte[] getContentBytes(String content, String charset) {
        if (charset == null || "".equals(charset)) {
            return content.getBytes();
        }
        try {
            return content.getBytes(charset);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("MD5签名过程中出现错误,指定的编码集不对,您目前指定的编码集是:" + charset);
        }
    }

	    /** 
	     * @author 
	     * @Description：将请求参数转换为xml格式的string 
	     * @param packageParams 
	     *            请求参数 
	     * @return 
	     */  
	    public static String getRequestXml(Map<String, String> packageParams) {  
	        StringBuffer sb = new StringBuffer();  
	        sb.append("<xml>");  
	        Set es = packageParams.entrySet();  
	        Iterator it = es.iterator();  
	        while (it.hasNext()) {  
	            Map.Entry entry = (Map.Entry) it.next();  
	            String k = entry.getKey().toString();  
	            String v = entry.getValue().toString();   
	            if ("attach".equalsIgnoreCase(k) || "body".equalsIgnoreCase(k) || "sign".equalsIgnoreCase(k)) {  
	                sb.append("<" + k + ">" + "<![CDATA[" + v + "]]></" + k + ">");  
	            } else {  
	                sb.append("<" + k + ">" + v + "</" + k + ">");  
	            }  
	        }  
	        sb.append("</xml>");  
	        return sb.toString();  
	    }  

	    /** 
	     * 取出一个指定长度大小的随机正整数. 
	     *  
	     * @param length 
	     *            int 设定所取出随机数的长度。length小于11 
	     * @return int 返回生成的随机数。 
	     */  
	    public static int buildRandom(int length) {  
	        int num = 1;  
	        double random = Math.random();  
	        if (random < 0.1) {  
	            random = random + 0.1;  
	        }  
	        for (int i = 0; i < length; i++) {  
	            num = num * 10;  
	        }  
	        return (int) ((random * num));  
	    }  

	    /** 
	     * 获取当前时间 yyyyMMddHHmmss 
	     *  
	     * @return String 
	     */  
	    public static String getCurrTime() {  
	        Date now = new Date();  
	        SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");  
	        String s = outFormat.format(now);  
	        return s;  
	    }  //end
	    
	    
	    private final static int CONNECT_TIMEOUT = 5000; // in milliseconds  
        private final static String DEFAULT_ENCODING = "UTF-8";  


        public static String postData(String urlStr, String data, String contentType){  
            BufferedReader reader = null;  
            try {  
                URL url = new URL(urlStr);  
                URLConnection conn = url.openConnection();  
                conn.setDoOutput(true);  
                conn.setConnectTimeout(CONNECT_TIMEOUT);  
                conn.setReadTimeout(CONNECT_TIMEOUT);  
                if(contentType != null)  
                    conn.setRequestProperty("content-type", contentType);  
                OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream(), DEFAULT_ENCODING);  
                if(data == null)  
                    data = "";  
                writer.write(data);   
                writer.flush();  
                writer.close();    

                reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), DEFAULT_ENCODING));  
                StringBuilder sb = new StringBuilder();  
                String line = null;  
                while ((line = reader.readLine()) != null) {  
                    sb.append(line);  
                    sb.append("\r\n");  
                }  
                return sb.toString();  
            } catch (IOException e) {  
                //logger.error("Error connecting to " + urlStr + ": " + e.getMessage());  
            } finally {  
                try {  
                    if (reader != null)  
                        reader.close();  
                } catch (IOException e) {  
                }  
            }  
            return null;  
        }

        public static Map doXMLParse(String strxml) throws JDOMException, IOException {  
            strxml = strxml.replaceFirst("encoding=\".*\"", "encoding=\"UTF-8\"");  

            if(null == strxml || "".equals(strxml)) {  
                return null;  
            }  

            Map m = new HashMap();  

            InputStream in = new ByteArrayInputStream(strxml.getBytes("UTF-8"));  
            SAXBuilder builder = new SAXBuilder();  
            Document doc = builder.build(in);  
            Element root = doc.getRootElement();  
            List list = root.getChildren();  
            Iterator it = list.iterator();  
            while(it.hasNext()) {  
                Element e = (Element) it.next();  
                String k = e.getName();  
                String v = "";  
                List children = e.getChildren();  
                if(children.isEmpty()) {  
                    v = e.getTextNormalize();  
                } else {  
                    v = PayUtil.getChildrenText(children);  
                }  

                m.put(k, v);  
            }  

            //关闭流  
            in.close();  

            return m;  
        }  

        /** 
         * 获取子结点的xml 
         * @param children 
         * @return String 
         */  
        public static String getChildrenText(List children) {  
            StringBuffer sb = new StringBuffer();  
            if(!children.isEmpty()) {  
                Iterator it = children.iterator();  
                while(it.hasNext()) {  
                    Element e = (Element) it.next();  
                    String name = e.getName();  
                    String value = e.getTextNormalize();  
                    List list = e.getChildren();  
                    sb.append("<" + name + ">");  
                    if(!list.isEmpty()) {  
                        sb.append(PayUtil.getChildrenText(list));  
                    }  
                    sb.append(value);  
                    sb.append("</" + name + ">");  
                }  
            }  

            return sb.toString();  
        }  //end
        
        /**  
             * 除去数组中的空值和签名参数  
             * @param sArray 签名参数组  
             * @return 去掉空值与签名参数后的新签名参数组  
             */
       public static Map<String, String> paraFilter(Map<String, String> sArray) {
        	Map<String, String> result = new HashMap<String, String>();
        	if (sArray == null || sArray.size() <= 0) {
        		return result;
        	}
        	for (String key : sArray.keySet()) {
        		String value = sArray.get(key);
        		if (value == null || value.equals("") || key.equalsIgnoreCase("sign") 
        				||key.equalsIgnoreCase("sign_type")){
        			continue;
        		}
        		result.put(key, value);
        	}
        	return result;
        }
        
        /**  
	         * 把数组所有元素排序，并按照“参数=参数值”的模式用“&”字符拼接成字符串  
	         * @param params 需要排序并参与字符拼接的参数组  
	         * @return 拼接后字符串  
	         */
	     public static String createLinkString(Map<String, String> params) {
	     List<String> keys = new ArrayList<String>(params.keySet());
	     Collections.sort(keys);
	     String prestr = "";
	       for (int i = 0; i < keys.size(); i++) {
	     String key = keys.get(i);
	       String value = params.get(key);
	          if (i == keys.size() - 1) {// 拼接时，不包括最后一个&字符   
	         prestr = prestr + key + "=" + value;
	           } else {
	        prestr = prestr + key + "=" + value + "&";
	                  }
	    }
	     return prestr;
	     }

	    
	    
}
	

