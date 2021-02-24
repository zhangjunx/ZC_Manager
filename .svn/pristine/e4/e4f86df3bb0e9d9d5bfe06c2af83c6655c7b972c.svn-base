package com.xr.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.service.FacePayRecordService;
import com.xr.util.FacePayDevice;

@RequestMapping("/facePayRecord")
@Controller
public class FacePayRecordController {

	@Autowired
	private FacePayRecordService facePayRecordService;
	
	/**
	 * 下发列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getRecordList")
	@ResponseBody
	public Map<String,Object> getRecordList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = facePayRecordService.getRecordList(map);
		if(!resultMap.get("count").equals("0")){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "查询失败，数据为空!");
		}
		return resultMap;
	} 
	
	/**
	 * 下发命令
	 * @param map
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/sentCommandToDevice")
	@ResponseBody
	public Map<String,Object> sentCommandToDevice(@RequestParam Map<String,Object> map) throws Exception{
		Map<String,Object> result = new HashMap<String,Object>();
		List<Map<String,Object>> list = facePayRecordService.getCommandList(map);//获取命令列表及参数参数
		for(int i = 0;i<list.size();i++){
			//判断网络是否通
			String path = list.get(i).get("deviceIP").toString();
			String ip = path.substring(0, path.indexOf(":8090"));
			boolean b = isConnect(ip);
			
			if(b){
				//读取设备序列号
				Map<String,Object> pm= new HashMap<String,Object>();
				String str = ip+":8090/getDeviceKey";
				Map<String,Object> testResult = FacePayDevice.sentToURL("http://"+str, pm,"POST");
				
				//获取设备密码
				Map<String,Object> deviceInfo = facePayRecordService.getDeviceInfoWithSn(testResult);
				
				if(testResult.get("result").toString().equals("1"))
				if(list.get(i).get("deviceIP").toString().contains("8090/person/create")){//人员注册
					Map<String,Object> pramMap = new HashMap<String,Object>();
					pramMap.put("pass", deviceInfo.get("password"));
					pramMap.put("person", list.get(i).get("parm"));
					Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+list.get(i).get("deviceIP").toString(), pramMap,"POST");
					System.out.println(resultMap);
				}else if(list.get(i).get("deviceIP").toString().contains("8090/face/create")){//注册图片
					Map<String,Object> jsonToMap = JSONObject.parseObject((String) list.get(i).get("parm"));
					jsonToMap.put("pass", deviceInfo.get("password"));
					Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+list.get(i).get("deviceIP").toString(), jsonToMap,"POST");
					System.out.println(resultMap);
				}else if(list.get(i).get("deviceIP").toString().contains("8090/person/delete")){//删除人员
					Map<String,Object> jsonToMap = JSONObject.parseObject((String) list.get(i).get("parm"));
					jsonToMap.put("pass", deviceInfo.get("password"));
					Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+list.get(i).get("deviceIP").toString(), jsonToMap,"POST");
					System.out.println(resultMap);
				}else if(list.get(i).get("deviceIP").toString().contains("8090/person/passtime")){
					Map<String,Object> jsonToMap = JSONObject.parseObject((String) list.get(i).get("parm"));
					jsonToMap.put("pass", deviceInfo.get("password"));
					Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+list.get(i).get("deviceIP").toString(), jsonToMap,"PUT");
					System.out.println(resultMap);
				}else if(list.get(i).get("deviceIP").toString().contains("8090/person/deletePasstime")){
					Map<String,Object> jsonToMap = JSONObject.parseObject((String) list.get(i).get("parm"));
					jsonToMap.put("pass", deviceInfo.get("password"));
					Map<String,Object> resultMap = FacePayDevice.sentToURL("http://"+list.get(i).get("deviceIP").toString(), jsonToMap,"POST");
					System.out.println(resultMap);
				}
			}else{
				result.put("flag", false);
				result.put("result", 0);
				result.put("reason", ip+"：网络不通，请检查网络连接！");
			}
		}
		return map;
	}
	
	public static void main(String[] args) throws Exception {
		Map<String,Object> pm= new HashMap<String,Object>();
		Map<String,Object> testResult = FacePayDevice.sentToURL("http://192.168.2.197:8090/getDeviceKey", pm,"POST");
		System.out.println(testResult);
	}
	/**
	 * 判断网络是否通
	 * @param ip
	 * @return
	 */
	public static boolean isConnect(String ip){
        boolean connect = false;    
        Runtime runtime = Runtime.getRuntime();    
        Process process;    
        try {    
            process = runtime.exec("ping " + ip);    
            InputStream is = process.getInputStream();     
            InputStreamReader isr = new InputStreamReader(is);     
            BufferedReader br = new BufferedReader(isr);     
            String line = null;     
            StringBuffer sb = new StringBuffer();     
            while ((line = br.readLine()) != null) {     
                sb.append(line);     
            }        
            is.close();     
            isr.close();     
            br.close();     
     
            if (null != sb && !sb.toString().equals("")) {     
                String logString = "";     
                if (sb.toString().indexOf("TTL") > 0) {     
                    // 网络畅通      
                    connect = true;    
                } else {     
                    // 网络不畅通      
                    connect = false;    
                }     
            }     
        } catch (IOException e) {    
            e.printStackTrace();    
        }     
        return connect;    
    }    
	
	//=============================================================================================================================
	
	/**
	 * 添加账户回调
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateAddAccount")
	@ResponseBody
	public Map<String,Object> updateAddAccount(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		int b = facePayRecordService.updateAddAccount(map);
		return resultMap;
	} 
	
	/**
	 * 账户禁用/启用回调
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateAddAccountStatus")
	@ResponseBody
	public Map<String,Object> updateAddAccountStatus(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		int b = facePayRecordService.updateAddAccountStatus(map);
		return resultMap;
	} 
	
	/**
	 * 账户充值与退费回调
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateAddAccountVal")
	@ResponseBody
	public Map<String,Object> updateAddAccountVal(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		int b = facePayRecordService.updateAddAccountVal(map);
		return resultMap;
	} 
	
	/**
	 * 绑定/解除设备
	 * optType 1：绑定
	 * optType 2：解除
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateAddDevice")
	@ResponseBody
	public Map<String,Object> updateAddDevice(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		int b = facePayRecordService.updateAddDevice(map);
		return resultMap;
	} 
	
	/**
	 * 身份更新回调
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateRoleInfo")
	@ResponseBody
	public Map<String,Object> updateRoleInfoRecord(@RequestParam Map<String,Object> map){
		int b = facePayRecordService.updateRoleInfoRecord(map);
		return map;
	}
}
