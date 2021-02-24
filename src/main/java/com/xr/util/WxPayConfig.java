package com.xr.util;

/**
 * @ClassName: WxPayConfig
 * @Description: 微信小程序支付的配置类
 * @author: csc
 * @Company: 公司名
 * @date: 2020年3月20日 下午4:22:08
 */
public class WxPayConfig {

	 //小程序appid
    public static final String appid = "wx4265c4de696637a5";
    //微信支付的商户id
    public static final String mch_id = "1580636251";
    //微信支付的商户密钥
    public static final String key = "410102zz65370812syris13383830065";
    //支付成功后的服务器回调url
    public static final String notify_url = "https://www.p7k.top/SyrisFactory/other/callback";
    //签名方式
    public static final String SIGNTYPE = "MD5";
    //交易类型
    public static final String TRADETYPE = "JSAPI";
    //微信统一下单接口地址
    public static final String pay_url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    
}
