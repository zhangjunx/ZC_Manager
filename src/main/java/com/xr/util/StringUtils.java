package com.xr.util;

import java.util.Random;

/**
 * @ClassName: StringUtils
 * @Description: StringUtils工具类方法
 * @author: csc
 * @Company: 公司名
 * @date: 2020年3月20日 下午4:03:23
 */
public class StringUtils extends  org.apache.commons.lang3.StringUtils{
    /**
     * StringUtils工具类方法
     * 获取一定长度的随机字符串，范围0-9，a-z
     * @param length：指定字符串长度
     * @return 一定长度的随机字符串
     */
    public static String getRandomStringByLength(int length) {
        String base = "abcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(base.length());
            sb.append(base.charAt(number));
        }
        return sb.toString();
    }//end
    
}
