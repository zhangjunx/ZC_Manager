package com.xr.util;

import java.util.Random;

/**
 * 随机数工具类
 * @author csc
 */
public class RandomUtil {

	private static final Integer RANDOM_LENGTH = 10;

	/**
	 * 得到数字验证码
	 * @return 验证码
	 */
	public static String generateCheckCode(){
        Random random = new Random();
        
        String val = "";
        //参数length，表示生成几位随机数
        for (int i = 0; i < RANDOM_LENGTH; i++) {
        	 val += String.valueOf(random.nextInt(10));
        }
        return val;
	}

	/**
     * 随机生成指定长度的验证码(包含字母数字)
     *
     * @param length 验证码长度
     * @return 生成的验证码
     */
    public static String generateNumCode() {
        String val = "";
        String charStr = "char";
        String numStr = "num";
        Random random = new Random();

        //参数length，表示生成几位随机数
        for (int i = 0; i < RANDOM_LENGTH; i++) {

            String charOrNum = random.nextInt(2) % 2 == 0 ? charStr : numStr;
            //输出字母还是数字
            if (charStr.equalsIgnoreCase(charOrNum)) {
                //输出是大写字母还是小写字母
                int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;
                val += (char) (random.nextInt(26) + temp);
            } else if (numStr.equalsIgnoreCase(charOrNum)) {
                val += String.valueOf(random.nextInt(10));
            }
        }
        return val;
    }//end
    
    
    /**
     * 生成指定长度的数字随机数
     * @param length 长度
     * @return String
     */
   public static  String getRandNumberCode (int length)    {   
       Random random = new Random();
       String result="";
       for(int i=0;i<length;i++){
           result+=random.nextInt(10);
       }
       return result;
   }//end
    
    public static void main(String[] args) {
    	System.out.println(generateCheckCode());
	}
    
}
