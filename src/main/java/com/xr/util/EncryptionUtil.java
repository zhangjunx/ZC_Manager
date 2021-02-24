package com.xr.util;

import java.security.MessageDigest;

import org.mindrot.jbcrypt.BCrypt;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * @ClassName: EncryptionUtil
 * @Description: 一些加密的方法
 * @author: csc
 * @Company: 公司名
 * @date: 2020年3月18日 上午10:48:57
 */
public class EncryptionUtil {
	

	 //私有化构造方法
	 private EncryptionUtil(){}
	 
	   /**
	     * MD5
	     * 通用加密方法
	     * @param str     需要加密的字符串
	     * @param isUpper 字母大小写(false为小写，true为大写)
	     * @param bit     加密的位数（16,32,64）
	     */
	    public static String getMD5(String str, boolean isUpper, Integer bit) {
	        String md5 = null;
	        try {
	            // 创建加密对象
	            MessageDigest md = MessageDigest.getInstance("md5");
	            if (bit == 64) {
	                BASE64Encoder bw = new BASE64Encoder();
	                md5 = bw.encode(md.digest(str.getBytes("utf-8")));
	            } else {
	                // 计算MD5函数
	                md.update(str.getBytes());
	                byte b[] = md.digest();
	                int i;
	                StringBuilder sb = new StringBuilder();
	                for (byte aB : b) {
	                    i = aB;
	                    if (i < 0) {
	                        i += 256;
	                    }
	                    if (i < 16) {
	                        sb.append("0");
	                    }
	                    sb.append(Integer.toHexString(i));
	                }
	                md5 = sb.toString();
	                if (bit == 16) {
	                    //截取32位md5为16位
	                    md5 = md5.substring(8, 24);
	                    if (isUpper) {
	                        md5 = md5.toUpperCase();
	                    }
	                    return md5;
	                }
	            }
	            //转换成大写
	            if (isUpper) {
	                md5 = md5.toUpperCase();
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return md5;
	    }//end
	    
	    /** 
	     * BASE64加密 
	     * @param key 
	     * @return 
	     * @throws Exception 
	     */  
	    public static String encryptBASE64(String key) throws Exception {  
	        return (new BASE64Encoder()).encodeBuffer(key.getBytes());  
	    }  
	    /** 
	     * BASE64解密 
	     *  
	     * @param key 
	     * @return 
	     * @throws Exception 
	     */  
	    public static String decryptBASE64(String key) throws Exception {  
	        return new String((new BASE64Decoder()).decodeBuffer(key));  
	    }  
	    

	    /***
	     * SHA加密 生成40位SHA码
	     * @inStr 待加密字符串
	     * @return 返回40位SHA码
	     */
	    public static String shaEncode(String inStr) throws Exception {
	        MessageDigest sha = null;
	        try {
	            sha = MessageDigest.getInstance("SHA");
	        } catch (Exception e) {
	            e.printStackTrace();
	            return "";
	        }
	        byte[] byteArray = inStr.getBytes("UTF-8");
	        byte[] md5Bytes = sha.digest(byteArray);
	        StringBuffer hexValue = new StringBuffer();
	        for (int i = 0; i < md5Bytes.length; i++) {
	            int val = ((int) md5Bytes[i]) & 0xff;
	            if (val < 16) {
	                hexValue.append("0");
	            }
	            hexValue.append(Integer.toHexString(val));
	        }
	        return hexValue.toString();
	    }//end

	 
	    public static void main(String[] args) {
	    	
	    	String password = "123456";
	    	System.out.println(getMD5(password, true, 32));
//	    	String password = "123456";
//	    	/**
//	    	 * 生成随机的盐
//	    	 */
//	    	System.out.println("生成随机的盐："+BCrypt.gensalt());
//
//	    	/**
//	    	 * 对密码password 进行加密
//	    	 * 
//	    	 * @param password： 密码
//	    	 * @param salt	  ： 盐值
//	    	 */
//	    	String hashPw = BCrypt.hashpw(password,BCrypt.gensalt());
//	    	System.out.println(hashPw);
//	    	/*-------------------------------------------------
//	    	hashPw ：$2a$10$4lLL/Vd6cUSqj4AmpnkG/.n54CkuhqixAhuF2VFEqNtMVKHeI1wxG
//	    	hashPw ：$2a$10$ktGWb2K5Dk6U7SSD0mgYx.HwwQeVvuM.EvMuu3K8oLTgInqZy323u
//	    	-------------------------------------------------*/
//
//	    	/**
//	    	 * 对密码password 进行解密
//	    	 * 
//	    	 * @param hashPw   : 是加密后的密码
//	    	 * @param password : 是用户输入的密码
//	    	 * @return 		   : true:说明密码匹配成功，false：说明两个密码不一样
//	    	 */
//	    	Boolean checkPw  = BCrypt.checkpw(password, hashPw);
//	    	System.out.println(checkPw);
		}
	 
	
}
