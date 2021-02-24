package com.xr.controller.device;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xr.service.IDoorUnitService;
import com.xr.util.CallingInterfaceUtil;
import com.xr.util.EncryptionUtil;
import com.xr.util.SenseLinkConfig;

/**
 * 该类是用于调用SenseLink平台的接口
 * @author csc
 */
@RestController
@RequestMapping("link")
public class CSC_SenseLinkController {
	
	/**引入门区的业务层*/
	@Autowired
	private IDoorUnitService doorService;
	
	 /**
	  * 获取SenseLink平台中的设备列表
	  * 接口:/v1/device 是获取设备列表 请求方式GET
	  * 由于是调用的平台接口是分页查询.无法一次性获取全部设备
	  * +所以暂时只对接五十个
	  */
	 @RequestMapping("/selectDevice")
	 public String selectDevice(){
		//定义一个map用于给接口提供参数
		 Map<String, String> params = new HashMap<String, String>();
		 params.putAll(SenseLinkConfig.CommonlySplicing());
		 params.put("page", "1");//第一页
		 params.put("size", "50");//一页五十个
		 String deviceUrl = SenseLinkConfig.URL+"/v1/device";
		 String resultMap = CallingInterfaceUtil.sendGet(deviceUrl, params);
		return resultMap;
	 }//end
	 
	 /**
	  * 获取SenseLink平台中的组信息
	  * 接口:/v1/group 是获取组信息的接口.请求方式GET
	  * 由于是调用的平台接口是分页查询.无法一次性获取全部设备
	  * +所以暂时只对接五十个(有待后续扩展)
	  */
	 @RequestMapping("/selectGroup")
	 public String selectGroup() {
		 //定义一个map用于给接提供参数
		 Map<String, String> params = new HashMap<String, String>();
		 params.putAll(SenseLinkConfig.CommonlySplicing());
		 params.put("page", "1");//第一页
		 params.put("size", "50");//每页五十个
		 String groupUrl = SenseLinkConfig.URL+"/v1/group";
		 String resultMap = CallingInterfaceUtil.sendGet(groupUrl, params);
		 return resultMap;
	 }//end
	 
	 /**
	  * 查询添加到本平台的SenseLink设备
	  */
	 @RequestMapping("/getSenseLinkDevice")
	 public Map<String, Object> getSenseLinkDevice(){
		 Map<String, Object> map = new HashMap<String,Object>();
		 List<Map<String, Object>> linklist = doorService.getSenseLinkDevice();
		 if(linklist.size()!=0){
			 map.put("code", "200");
			 map.put("reason", "查询成功");
			 map.put("result", linklist);
		 }else{
			 map.put("code", "000");
			 map.put("reason", "暂无数据");
		 }
		 return map;
	 }//end
	 

	/**
	 * @Title: erweima
	 * @Description:Sensepass人脸机的二维码
	 * @author: csc
	 * @date: 2020年4月14日 下午5:45:35
	 */
	 @RequestMapping("/erweima")
	public static String erweima() {
		Map<String,String> map = new HashMap<String, String>();
		map.putAll(erweimaUtil());
		map.put("entry_times", "1");//使用次数
		map.put("valid_time", "50");//50秒
		map.put("user_id", "18");//用户id
		String nihao = CallingInterfaceUtil.sendGet("http://222.191.249.42:3456/api/v3/qr/content", map);
		return nihao;
	}// end
	 
		public static String ren(String name) {
			Map<String,String> map = new HashMap<String, String>();
			map.putAll(erweimaUtil());
			map.put("name", name);
			String nihao = CallingInterfaceUtil.sendGet("http://222.191.249.42:3456/api/v1/user/list", map);
			return nihao;
		}// end
	 

	  /**
		  * 该方法用于封装给SenseLink平台常用的三个参数
		  * APP_KEY : app_key
		  * sign :签证
		  * timestamp当前时间错
		  * 这三个参数在请求SenseLink中的任何接口都是必传参数
		  * @return
		  */
		 public static Map<String, String> erweimaUtil(){
			 Map<String, String> params = new HashMap<String, String>();
			 /**获取当前时间戳*/
		      AtomicLong uniqueseed = new AtomicLong(System.currentTimeMillis());
			 long st = uniqueseed .incrementAndGet();//获取当前时间戳
			   //时间戳在前,秘钥在后
			  String sing= String.valueOf(st)+"#"+"106540d13b5f69b01163f4f679900b57";
			  String sign = EncryptionUtil.getMD5(sing, false, 32);
			  params.put("app_key", "801293f27cb36e09");
			  params.put("sign", sign);
			  params.put("timestamp", String.valueOf(st));
			return params;
		 }//end

		 public static void main(String[] args) {
			 System.out.println(ren("刘市长"));
			 System.out.println(erweima());
		 }
	 
	
}//end class
