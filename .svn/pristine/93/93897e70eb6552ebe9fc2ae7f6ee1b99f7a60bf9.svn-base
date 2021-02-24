package com.xr.controller.device;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.EncodeException;
import javax.websocket.Session;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xr.controller.WebSocketController2;

/**
 * @Description: Sense_ID人脸识别一体机的服务
 * @CopyRightInformation : Syris
 * @ApplicationName: SyrisFactory
 * @Title: CSC_SenseIDController.java
 * @Package: com.xr.controller.quartz
 * @author: csc
 * @date: 2020年4月14日 上午10:22:26
 * @version: V1.0
 */
@RestController
@RequestMapping("senseID")
public class CSC_SenseIDController {
	
	static  WebSocketController2 websocket2 = new WebSocketController2();

	/**用于存放当前认证识别一体机有多少SN(商汤设备)*/
	List<String> mapList = new ArrayList<String>();
	/**
	* @Title: heartbeat 
	* @Description: Sense_ID设备一体机的心跳请求服务
	* @author: csc
	* @date: 2020年4月14日 上午10:23:28 
	* @return Map<String,Object> 返回类型 
	 */
	@RequestMapping("/heartbeat")
	public Map<String, Object> heartbeat(@RequestParam Map<String, Object> revice){
		
		String device_id = (String) revice.get("device_id");
	   if(!mapList.contains(device_id)) {//返回true 如果集合里面不已经存在该设备(在业务系统中唯一标识设备)
		  mapList.add(device_id);//在集合中+上该设备  
		}
		Map<String, Object> map = new HashMap<String, Object>();
		 /**获取当前时间戳*/
	      AtomicLong uniqueseed = new AtomicLong(System.currentTimeMillis());
		 long st = uniqueseed .incrementAndGet();//获取当前时间戳
		map.put("code", 0);
		map.put("message", "success");
		map.put("version", revice.get("version"));
		map.put("timestamp", st);
		return map;
	}//end
	
	/**
	 * @Title: auth
	 * @Description: 获取Sense_ID(人脸识别一体机)的token
	 * @author: csc
	 * @date: 2020年4月14日 上午10:26:17
	 */
	//@RequestMapping("/auth")
	public Map<String, Object> auth(@RequestParam Map<String, Object> revice,HttpServletRequest rest){
		HttpSession  session = rest.getSession();
		String token = session.getId();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("token", revice.get("device_id")+token);
		map.put("timestamp", revice.get("timestamp"));//当前时间戳
		map.put("message", "success");
		map.put("version", revice.get("version"));
		map.put("code", "0");
		return map;
	}//end
	
	/**
	* @Title: upload_data_full 
	* @Description: 4.2.3 身份信息输出接口
	* @author: csc
	* @date: 2020年4月14日 上午11:21:52 
	* @param @return 参数 
	 * @throws IOException 
	 * @throws EncodeException 
	 */
	@RequestMapping("/upload_data_full")
	public Map<String, Object> upload_data_full(@RequestParam Map<String, Object> revice) throws IOException, EncodeException{
		
		String json = JSON.toJSONString(revice);//map转String
		JSONObject jsonObject = JSON.parseObject(json);//String转json
		System.out.println(jsonObject);
		String nihao = jsonObject.toString();
		Session session = null;
		if(revice.get("verify_result").equals("0")) {//如果识别成功,将数据发送给前段
			websocket2.onMessage(nihao, session);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("message","upload successful");
		map.put("code", "0");
		return map;
	}//end
	
	/**
	 * @Title: getEquipmentCode
	 * @Description: 获取人证识别一体机的编码
	 * @author: csc
	 * @date: 2020年4月15日 下午3:10:56
	 */
	@RequestMapping("/getEquipmentCode")
	public Map<String, Object> getEquipmentCode(){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if(mapList.size()!=0) {
			resultMap.put("code", "200");
			resultMap.put("reason", "数据查询成功");
			resultMap.put("result", mapList);
		}else {
			resultMap.put("code", "000");
			resultMap.put("reason", "暂无数据可查");
		}
		return resultMap;
	}//end
	

	
}

