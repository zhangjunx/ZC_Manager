package com.xr.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.imageio.ImageIO;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.ImageIcon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.apache.ibatis.annotations.Param;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.util.encoders.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.geom.RoundRectangle2D;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.AlgorithmParameters;
import java.security.Security;
import java.text.ParseException;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.xr.entity.Applet_AccountData;
import com.xr.entity.HolderData;
import com.xr.entity.HolderPhoto;
import com.xr.service.Applet_ManageService;
import com.xr.service.IHolderDataService;
import com.xr.service.IHolderPhotoService;
import com.xr.service.IVisitorsPhotoService;
import com.xr.util.CallingInterfaceUtil;
import com.xr.util.IpUtils;
import com.xr.util.PayUtil;
import com.xr.util.StringUtils;
import com.xr.util.WxPayConfig;

/**
 * @ClassName AppleLoginController
 * 小程序专用业务交互层
 * @Author csc
 * @Date 2019年12月27日 下午3:26:45
 */
@RestController
@RequestMapping("other")
public class AppletOtherLoginController {

	
	@Autowired
	private IHolderDataService ihds;//引入用户业务层
	
	@Autowired
	private IHolderPhotoService ihps;//引入员工照片业务层
	
	@Autowired
	private IVisitorsPhotoService ivps;
	
	@Autowired
	private Applet_ManageService amservice;//引入小程序模块的业务层
	
	/**
	 * 微信号快速登录
	 * 根据微信号查询用户的信息
	 * 判断是否可以登录小程序
	 * @param wechatno
	 * @throws ParseException 
	 */
	@RequestMapping("/queryWechatNoLogin")
	public Map<String, Object> queryWechatNoLogin(String wechatno,HttpServletResponse resp) throws ParseException{
		Map<String, Object> map = new HashMap<String, Object>();//定义一个map,用于返回数据给前段
		  //根据微信号查询用户信息
		HolderData holderdata =  ihds.queryWechatNoLogin(wechatno);
		if(holderdata==null){//如果等于null
			 map.put("flag", false);
			 map.put("reason", "没有该用户信息或没有绑定微信号");
		}else{
			String departmentno =   holderdata.getDepartmentno();
  		    if(departmentno==null){
  		    	map.put("flag", false);
  			    map.put("reason", "您没有被分配使用账户!");
  		    }else{
  		    	//首先查询底层部门是否有账号
  		       Applet_AccountData accountdata =  amservice.queryCheckHolder(departmentno);
  		       
  		        //在查询顶级部门是否有账号
  		       Applet_AccountData account =  amservice.queryCheckHolder(departmentno.subSequence(0, 3).toString());
  		       if(accountdata==null && account==null){
  		    	 map.put("flag", false);
   			     map.put("reason", "您的账户不可用或者使用权限已到期!");
  		       }else if(accountdata != null && account !=null)//顶级和底层部门都不为空
  		       {     //放入底层部门的accountid
  		    	    holderdata.setAccountid(accountdata.getAccountid());
  		    	    map.put("flag", true);
  				    map.put("reason", "登录成功");
  				    map.put("result", holderdata);
  		       }else if(accountdata !=null && account == null){//底层部门不为空
  		    	    //放入底层部门的accountid
 		    	    holderdata.setAccountid(accountdata.getAccountid());
 		    	    map.put("flag", true);
 				    map.put("reason", "登录成功");
 				    map.put("result", holderdata);
  		       }else {//顶级部门不为空
  		    	    //放入顶级部门的accountid
		    	    holderdata.setAccountid(account.getAccountid());
		    	    map.put("flag", true);
				    map.put("reason", "登录成功");
				    map.put("result", holderdata);
  		       }
  		    }
		}
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	  /**
	   * 小程序用户和密码登录
	   * @param receive
	   */
    @RequestMapping("/AccountPwdLogin")
	  public Map<String, Object> AccountPwdLogin(@RequestBody HolderData record,HttpServletResponse resp){
  	    Map<String, Object> map = new HashMap<>();//定义一个map返回给前段
  	     //账户和密码登录
  	   HolderData data = ihds.queryLoginCheckService(record);
			
  	   if(data==null)//濡傛灉涓虹┖
  	   {   map.put("flag", false);
		   map.put("reason", "用户名或者密码错误!");
  	   }else
  	   {      
  		 String departmentno =   data.getDepartmentno();
  		    if(departmentno==null){
  		    	map.put("flag", false);
  			    map.put("reason", "您没有被分配使用账户!");
  		    }else{
  		       //首先查询底层部门是否有账号
   		       Applet_AccountData accountdata =  amservice.queryCheckHolder(departmentno);
   		       
   		        //在查询顶级部门是否有账号
   		       Applet_AccountData account =  amservice.queryCheckHolder(departmentno.subSequence(0, 3).toString());
   		       if(accountdata==null && account==null){
   		    	 map.put("flag", false);
    			     map.put("reason", "您的账户不可用或者使用权限已到期!");
   		       }else if(accountdata != null && account !=null)//顶级和底层部门都不为空
   		       {     //放入底层部门的accountid
   		    	    data.setAccountid(accountdata.getAccountid());
   		    	    map.put("flag", true);
   				    map.put("reason", "登录成功");
   				    map.put("result", data);
   		       }else if(accountdata !=null && account == null){//底层部门不为空
   		    	    //放入底层部门的accountid
   		    	    data.setAccountid(accountdata.getAccountid());
  		    	    map.put("flag", true);
  				    map.put("reason", "登录成功");
  				    map.put("result", data);
   		       }else {//顶级部门不为空,底层部门为空
   		    	    //放入底层部门的accountid
   		    	    data.setAccountid(account.getAccountid());
 		    	    map.put("flag", true);
 				    map.put("reason", "登录成功");
 				    map.put("result", data);
   		       }
  		    }
  	   }
  	  resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
  	  return map;
	  }//end
      
      
	
      //修改用户的openid
      @RequestMapping("/updateHolderWechatNo")
      public Map<String, Object> updateHolderWechatNo(@RequestBody HolderData record,HttpServletResponse resp){
    	  Map<String, Object> map = new HashMap<>();//定义一个map返回给前端
    	    String holderno = record.getHolderno();
    	  
    	  if(holderno==null || "".equals(holderno)){
    		  map.put("flag", false);
       	     map.put("reason", "工号不能为空");
    	  }else{
    		  String wechatno = record.getWechatno();
    		  //根据微信号查询用户信息
    		  HolderData holderdata =  ihds.queryWechatNoLogin(wechatno);
    		    
    		  if(holderdata==null){
    			   ihds.updateHolderWechatNo(record);
    	    	   map.put("flag", true);
    	    	   map.put("reason", "绑定成功");
    		  }else{
    			   map.put("flag", false);
    	    	   map.put("reason", "该微信号已被用户绑定!");
    		  }
    	  }
    	  resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
    	  return map;
      }//end
      
      /**
       * 小程序获取用户的openid
       * @param Receive
       */
	@RequestMapping("/getopenId")
	public Map<String, Object> getopenId(@RequestParam("code") String code, HttpServletResponse resp) {
		Map<String, Object> map = new HashMap<>();
		if (code != null) {
			try {
				String appId = "wx4265c4de696637a5";// 小程序的appID
				String appSecret = "90eee88a7b9f4d6269180f26414e3f6f";// 和小程序的秘钥
				String strURL = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + appSecret
						+ "&js_code=" + code + "&grant_type=authorization_code";
				URL url = new URL(strURL);// 创建连接
				HttpURLConnection connection = (HttpURLConnection) url.openConnection();
				connection.setDoOutput(true);
				connection.setDoInput(true);
				connection.setUseCaches(false);
				connection.setInstanceFollowRedirects(true);
				connection.setRequestMethod("POST"); // 设置请求方式
				connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式
				connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式
				// 开始发送请求
				connection.connect();
				OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), "UTF-8"); // utf-8编码
				out.flush();
				out.close();
				int ResponseCode = connection.getResponseCode();
				InputStream is = null;
					if (ResponseCode == 200) {
						is = connection.getInputStream();
					} else {
						is = connection.getErrorStream();
					}
					int length = (int) connection.getContentLength();// 获取长度
					if (length != -1) {
						byte[] data = new byte[length];
						byte[] temp = new byte[512];
						int readLen = 0;
						int destPos = 0;
						while ((readLen = is.read(temp)) > 0) {
							System.arraycopy(temp, 0, data, destPos, readLen);
							destPos += readLen;
						}
					String result = new String(data, "UTF-8"); // utf-8编码
					Map<String, Object> resultMap = com.alibaba.fastjson.JSONObject.parseObject(result);
					map.put("flag", true);
					map.put("reason", "获取成功");
					// 【这里是你获取到openId的逻辑判断】session_key
					map.put("openid", (String) resultMap.get("openid"));
					map.put("session_key", (String) resultMap.get("session_key"));
				}
			} catch (IOException e) {
				// LOG.error("Exception occur when send http post request!", e);
			}
		} else {
			map.put("flag", false);
			map.put("reason", "code不能为空");
		}
		resp.setHeader("Access-Control-Allow-Origin", "*");// 解决跨域问题
		return map;
	}// end
      
      /**
       * 小程序获取用户手机号
       */
      @RequestMapping("/mini_getPhone")
      public String mini_getPhone(HttpServletRequest request,@Param("encryptedData")String encryptedData,@Param("iv")String iv,@Param("session_key")String session_key)
      {
          //
          JSONObject obj=getPhoneNumber(session_key,encryptedData,iv);//解密电话号码
          //System.out.println(obj);
          String sphone=obj.get("phoneNumber").toString();
          return sphone;
      }//end
      
      
      
      //解析电话号码
      public JSONObject getPhoneNumber(String session_key, String encryptedData, String iv) {
              byte[] dataByte = Base64.decode(encryptedData);
             
              byte[] keyByte = Base64.decode(session_key);
    
              byte[] ivByte = Base64.decode(iv);
              try {
                  int base = 16;
                  if (keyByte.length % base != 0) {
                      int groups = keyByte.length / base + (keyByte.length % base != 0 ? 1 : 0);
                      byte[] temp = new byte[groups * base];
                      Arrays.fill(temp, (byte) 0);
                      System.arraycopy(keyByte, 0, temp, 0, keyByte.length);
                      keyByte = temp;
                  }
                  // 初始化
                  Security.addProvider(new BouncyCastleProvider());
                  Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
                  SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
                  AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
                  parameters.init(new IvParameterSpec(ivByte));
                  cipher.init(Cipher.DECRYPT_MODE, spec, parameters);
                  byte[] resultByte = cipher.doFinal(dataByte);
                  if (null != resultByte && resultByte.length > 0) {
                      String result = new String(resultByte, "UTF-8");
                      return JSONObject.parseObject(result);
                  }
              } catch (Exception e) {
                  e.printStackTrace();
              }
          return null;
   
      }//end
      
   /**
    * 二维码图片组合logo图片
    * @param contents 二维码携带信息
    * @return
    */
    @RequestMapping("/encodeWithLogo")
  	public Map<String, Object> encodeWithLogo(String contents,  String holderno, HttpServletRequest request, HttpServletResponse resp) {
  		Map<String, Object> map = new HashMap<String, Object>();//定义一个map,用于返回数据给前段
  		//生成条形码时的一些配置
          Map<EncodeHintType, Object> hints = new HashMap<>();
          // 指定纠错等级,纠错级别（L 7%、M 15%、Q 25%、H 30%）
          hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
          // 内容所使用字符集编码
          hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
          BitMatrix bitMatrix;
  		try {
			bitMatrix = new MultiFormatWriter().encode(contents, BarcodeFormat.QR_CODE, 600, 600, hints);
            //MatrixToImageWriter.writeToStream(bitMatrix, "png", out);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            BufferedImage image = toBufferedImage(bitMatrix);
			ImageIO.write(image, "png", out);
            byte[] bytes = out.toByteArray();
            //Image image2 = Toolkit.getDefaultToolkit().createImage(bytes);
            Image image2 = new ImageIcon(bytes).getImage();//将图片转换格式并写入内存
            int width2 = image2.getWidth(null);
            int height2 = image2.getHeight(null);
            BufferedImage bufferImage = new BufferedImage(width2, height2, BufferedImage.TYPE_INT_RGB) ;
            Graphics2D g2 = bufferImage.createGraphics();
            g2.drawImage(image2, 0, 0, width2, height2, null) ;
            int matrixWidth = bufferImage.getWidth();
            int matrixHeigh = bufferImage.getHeight();
            //读取Logo图片
            if(holderno==null || "".equals(holderno)){
			   holderno=(String) request.getSession().getAttribute("holderno");
	  	    }
            Map<String,Object> map2=new HashMap<String,Object>();
		    //HolderPhoto holderphoto=(HolderPhoto) ihps.queryPhotoService(holderno);//根据员工账号查询图片
            map2 = ihps.queryPhotoService(holderno);
            HolderPhoto holderphoto = (HolderPhoto) map2.get("result");//实现类返回数据中取出HolderPhoto对象
		    if (map2.get("flag").equals(true)) {
		    	byte[] imageData = holderphoto.getDataphoto();//获取dataphoto
		    	BufferedImage logo;
				logo = ImageIO.read(new ByteArrayInputStream(imageData));			
	            //开始绘制图片
	            g2.drawImage(logo,matrixWidth/5*2,matrixHeigh/5*2, matrixWidth/5, matrixHeigh/5, null);//绘制
	            BasicStroke stroke = new BasicStroke(10,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND);
	            g2.setStroke(stroke);// 设置笔画对象
	            //指定弧度的圆角矩形
	            RoundRectangle2D.Float round = new RoundRectangle2D.Float(matrixWidth/5*2, matrixHeigh/5*2, matrixWidth/5, matrixHeigh/5,20,20);
	            g2.setColor(Color.white);
	            g2.draw(round);// 绘制圆弧矩形
	            //设置logo 有一道灰色边框
	            BasicStroke stroke2 = new BasicStroke(1,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND);
	            g2.setStroke(stroke2);// 设置笔画对象
	            RoundRectangle2D.Float round2 = new RoundRectangle2D.Float(matrixWidth/5*2+2, matrixHeigh/5*2+2, matrixWidth/5-4, matrixHeigh/5-4,20,20);
	            g2.setColor(new Color(128,128,128));
	            g2.draw(round2);// 绘制圆弧矩形
	            g2.dispose();
	            bufferImage.flush() ;
	            ByteArrayOutputStream out2 = new ByteArrayOutputStream();
				ImageIO.write(bufferImage, "png", out2);
	            byte[] IdPhoto = out2.toByteArray();
	            map.put("flag", true);
	  			map.put("reason", "转换成功！");
	  			map.put("result", IdPhoto);
			}else {
				map.put("flag", false);
	  			map.put("reason", "转换失败，没有您的头像！");
			}  
          } catch (Exception e) {
            e.printStackTrace();
          	map.put("flag", false);
  			map.put("reason", "转换失败，请联系管理员！");
          }
  		return map;
  	}//end
    
    /**
     * 二维码图片组合logo图片
     * @param contents 二维码携带信息
     * @return
     */
     @RequestMapping("/encodeWithLogoV")
   	public Map<String, Object> encodeWithLogoV(String contents,  String holderno, HttpServletRequest request, HttpServletResponse resp) {
   		Map<String, Object> map = new HashMap<String, Object>();//定义一个map,用于返回数据给前段
   		//生成条形码时的一些配置
           Map<EncodeHintType, Object> hints = new HashMap<>();
           // 指定纠错等级,纠错级别（L 7%、M 15%、Q 25%、H 30%）
           hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
           // 内容所使用字符集编码
           hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
           BitMatrix bitMatrix;
   		try {
 			bitMatrix = new MultiFormatWriter().encode(contents, BarcodeFormat.QR_CODE, 600, 600, hints);
             //MatrixToImageWriter.writeToStream(bitMatrix, "png", out);
             ByteArrayOutputStream out = new ByteArrayOutputStream();
             BufferedImage image = toBufferedImage(bitMatrix);
 			ImageIO.write(image, "png", out);
             byte[] bytes = out.toByteArray();
             //Image image2 = Toolkit.getDefaultToolkit().createImage(bytes);
             Image image2 = new ImageIcon(bytes).getImage();//将图片转换格式并写入内存
             int width2 = image2.getWidth(null);
             int height2 = image2.getHeight(null);
             BufferedImage bufferImage = new BufferedImage(width2, height2, BufferedImage.TYPE_INT_RGB) ;
             Graphics2D g2 = bufferImage.createGraphics();
             g2.drawImage(image2, 0, 0, width2, height2, null) ;
             int matrixWidth = bufferImage.getWidth();
             int matrixHeigh = bufferImage.getHeight();
             //读取Logo图片
             if(holderno==null || "".equals(holderno)){
            	  map.put("flag", false);
  	  			  map.put("reason", "对不起，你传入的访客登记id为空，没法生成二维码！");
  	  			  return map;
 	  	     }
             Map<String,Object> m=new HashMap<String,Object>();
 		     m.put("visitorsid", holderno);
             Map<String,Object> m2= ivps.getPhotoService(m);//根据员工账号查询图片
 		    if (m2!=null && !"".equals(m2)) {
 		    	byte[] imageData = (byte[]) m2.get("photodata");//获取dataphoto
 		    	BufferedImage logo;
 				logo = ImageIO.read(new ByteArrayInputStream(imageData));			
 	            //开始绘制图片
 	            g2.drawImage(logo,matrixWidth/5*2,matrixHeigh/5*2, matrixWidth/5, matrixHeigh/5, null);//绘制
 	            BasicStroke stroke = new BasicStroke(10,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND);
 	            g2.setStroke(stroke);// 设置笔画对象
 	            //指定弧度的圆角矩形
 	            RoundRectangle2D.Float round = new RoundRectangle2D.Float(matrixWidth/5*2, matrixHeigh/5*2, matrixWidth/5, matrixHeigh/5,20,20);
 	            g2.setColor(Color.white);
 	            g2.draw(round);// 绘制圆弧矩形
 	            //设置logo 有一道灰色边框
 	            BasicStroke stroke2 = new BasicStroke(1,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND);
 	            g2.setStroke(stroke2);// 设置笔画对象
 	            RoundRectangle2D.Float round2 = new RoundRectangle2D.Float(matrixWidth/5*2+2, matrixHeigh/5*2+2, matrixWidth/5-4, matrixHeigh/5-4,20,20);
 	            g2.setColor(new Color(128,128,128));
 	            g2.draw(round2);// 绘制圆弧矩形
 	            g2.dispose();
 	            bufferImage.flush() ;
 	            ByteArrayOutputStream out2 = new ByteArrayOutputStream();
 				ImageIO.write(bufferImage, "png", out2);
 	            byte[] IdPhoto = out2.toByteArray();
 	            map.put("flag", true);
 	  			map.put("reason", "转换成功！");
 	  			map.put("result", IdPhoto);
 			}else {
 				map.put("flag", false);
 	  			map.put("reason", "转换失败，没有您的头像！");
 			}  
           } catch (Exception e) {
             e.printStackTrace();
           	map.put("flag", false);
   			map.put("reason", "转换失败，请联系管理员！");
           }
   		return map;
   	}//end
      
    //将BufferedImage转换为Image
  	private static BufferedImage toBufferedImage(BitMatrix matrix) {
  	        int width = matrix.getWidth();
  	        int height = matrix.getHeight();
  	        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
  	        for (int x = 0; x < width; x++) {
  	          for (int y = 0; y < height; y++) {
  	            image.setRGB(x, y, matrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
  	          }
  	        }
  	        
  	        return image;
  	 }//end
  	
  	
  	
  	 private Logger logger = LoggerFactory.getLogger(getClass());
  	/**
     * @Description: 发起微信支付
     * @param openid
     * @param request
     * @author: csc
  	 * @throws Exception 
  	 * @date: 2019年9月26日
     */
    @RequestMapping("wxPay")
    public void wxPay(HttpServletRequest request,HttpServletResponse resp) throws Exception{
    	try{
                //生成的随机字符串
                String nonce_str = StringUtils.getRandomStringByLength(30);
                //商品名称
                String body = request.getParameter("title");
                //获取本机的ip地址
                String spbill_create_ip = IpUtils.getIpAddr(request);
                
              //支付金额，单位：分，这边需要转成字符串类型，否则后面的签名会失败
                String money =  request.getParameter("price");
     
                String openid =  request.getParameter("openid");
               
                String orderNo = PayUtil.buildRandom(12)+"";
     
                Map<String, String> packageParams = new HashMap<String, String>();
                packageParams.put("appid", WxPayConfig.appid);
                packageParams.put("body", body);
                packageParams.put("mch_id", WxPayConfig.mch_id);
                packageParams.put("nonce_str", nonce_str);
                packageParams.put("notify_url", WxPayConfig.notify_url);
                packageParams.put("openid", openid);
                packageParams.put("spbill_create_ip", spbill_create_ip);
                packageParams.put("total_fee", money);//支付金额，这边需要转成字符串类型，否则后面的签名会失败
                packageParams.put("out_trade_no", orderNo);//商户订单号
                packageParams.put("trade_type", WxPayConfig.TRADETYPE);
               
     
                // 除去数组中的空值和签名参数
                packageParams = PayUtil.paraFilter(packageParams);
                String prestr = PayUtil.createLinkString(packageParams); // 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
     
                //MD5运算生成签名，这里是第一次签名，用于调用统一下单接口
                String mysign = PayUtil.sign(prestr, WxPayConfig.key, "utf-8").toUpperCase();
                logger.info("=======================第一次签名：" + mysign + "=====================");
                 
                //拼接统一下单接口使用的xml数据，要将上一步生成的签名一起拼接进去
                String xml = "<xml>" + "<appid>" + WxPayConfig.appid + "</appid>"
                        + "<body><![CDATA[" + body + "]]></body>"
                        + "<mch_id>" + WxPayConfig.mch_id + "</mch_id>"
                        + "<nonce_str>" + nonce_str + "</nonce_str>"
                        + "<notify_url>" + WxPayConfig.notify_url + "</notify_url>"
                        + "<openid>" + openid + "</openid>"
                        + "<out_trade_no>" + orderNo + "</out_trade_no>"
                        + "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>"
                        + "<total_fee>" + money + "</total_fee>"
                        + "<trade_type>" + WxPayConfig.TRADETYPE + "</trade_type>"
                        + "<sign>" + mysign + "</sign>"
                        + "</xml>";
     
                //调用统一下单接口，并接受返回的结果
                String result = CallingInterfaceUtil.httpsRequest(WxPayConfig.pay_url, "POST", xml);
     
                System.out.println("调试模式_统一下单接口 返回XML数据：" + result);
     
                // 将解析结果存储在HashMap中
                Map map = PayUtil.doXMLParse(result);
     
                String return_code = (String) map.get("return_code");//返回状态码
     
                //返回给移动端需要的参数
                Map<String, Object> response = new HashMap<String, Object>();
                if(return_code == "SUCCESS" || return_code.equals(return_code)){
                    // 业务结果
                    String prepay_id = (String) map.get("prepay_id");//返回的预付单信息
                    response.put("nonceStr", nonce_str);
                    response.put("package", "prepay_id=" + prepay_id);
                    Long timeStamp = System.currentTimeMillis() / 1000;
                    response.put("timeStamp", timeStamp + "");//这边要将返回的时间戳转化成字符串，不然小程序端调用wx.requestPayment方法会报签名错误
     
                    String stringSignTemp = "appId=" + WxPayConfig.appid + "&nonceStr=" + nonce_str + "&package=prepay_id=" + prepay_id+ "&signType=" + WxPayConfig.SIGNTYPE + "&timeStamp=" + timeStamp;
                    //再次签名，这个签名用于小程序端调用wx.requesetPayment方法
                    String paySign = PayUtil.sign(stringSignTemp, WxPayConfig.key, "utf-8").toUpperCase();
                    logger.info("=======================第二次签名：" + paySign + "=====================");
     
                    response.put("paySign", paySign);
                    //更新订单信息
                    //业务逻辑代码
                }
                response.put("appid", WxPayConfig.appid);
                Gson gson = new Gson();
                String json = gson.toJson(response);
                PrintWriter pw = resp.getWriter();
                System.out.println(json);
                pw.write(json);
                pw.close();
            }catch(Exception e){
                e.printStackTrace();
            }
    }//end
    
    /**
     * 微信小程序支付成功回调函数
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/callback")
    public void wxNotify(HttpServletRequest request,HttpServletResponse response) throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader((ServletInputStream)request.getInputStream()));
        String line = null;
        StringBuilder sb = new StringBuilder();
        while((line = br.readLine()) != null){
            sb.append(line);
        }
        br.close();
        //sb为微信返回的xml
        String notityXml = sb.toString();
        String resXml = "";
        System.out.println("接收到的报文：" + notityXml);
 
        Map map = PayUtil.doXMLParse(notityXml);
 
        String returnCode = (String) map.get("return_code");
        if("SUCCESS".equals(returnCode)){
            //验证签名是否正确
            Map<String, String> validParams = PayUtil.paraFilter(map);  //回调验签时需要去除sign和空值参数
            String validStr = PayUtil.createLinkString(validParams);//把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
            String sign = PayUtil.sign(validStr, WxPayConfig.key, "utf-8").toUpperCase();//拼装生成服务器端验证的签名
            // 因为微信回调会有八次之多,所以当第一次回调成功了,那么我们就不再执行逻辑了
           
            //根据微信官网的介绍，此处不仅对回调的参数进行验签，还需要对返回的金额与系统订单的金额进行比对等
            if(sign.equals(map.get("sign"))){
                /**此处添加自己的业务逻辑代码start**/
                  // bla bla bla....
                /**此处添加自己的业务逻辑代码end**/
                //通知微信服务器已经支付成功
                resXml = "<xml>" + "<return_code><![CDATA[SUCCESS]]></return_code>"
                        + "<return_msg><![CDATA[OK]]></return_msg>" + "</xml> ";
            } else {
                System.out.println("微信支付回调失败!签名不一致");
            }
        }else{
            resXml = "<xml>" + "<return_code><![CDATA[FAIL]]></return_code>"
                    + "<return_msg><![CDATA[报文为空]]></return_msg>" + "</xml> ";
        }
        System.out.println(resXml);
        System.out.println("微信支付回调数据结束");
 
        BufferedOutputStream out = new BufferedOutputStream(
                response.getOutputStream());
        out.write(resXml.getBytes());
        out.flush();
        out.close();
    }//end

  	
	
}
