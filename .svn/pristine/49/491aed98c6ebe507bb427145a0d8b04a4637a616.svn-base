package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.DoorUnit;
import com.xr.service.IDoorUnitService;
import com.xr.service.IHolderDataService;
import com.xr.util.CallingInterfaceUtil;
import com.xr.util.EncryptionUtil;
import com.xr.util.SenseLinkConfig;
import com.xr.util.TypeConversionUtil;

@Controller
@RequestMapping("DoorUnit")
public class DoorUnitController {

	@Autowired
	private IDoorUnitService idus;
	
	@Autowired
	private IHolderDataService hservice;//引入用户管理的业务层
	
	/*查询门区列表*/
	 @RequestMapping("/queryDoorUnitList")
	 @ResponseBody
	 public Map<String,Object> queryDoorUnitListController(){
		 Map<String,Object> map=new HashMap<String,Object>();
		 List<DoorUnit> list=idus.queryDoorUnitListService();
		 try{
			 if(list.size()>0){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 map.put("result", list);
			 }else{
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
			 } 
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
	 
	/*查询门区及所在控制器列表 门禁权限设置时用到*/
	 @RequestMapping("/queryDoorAndDeviceList")
	 @ResponseBody
	 public Map<String,Object> queryDoorAndDeviceListController(){
		 Map<String,Object> map=new HashMap<String,Object>();
		 List<Map<String,Object>> list=null;
		 try{
			 list=idus.queryDoorAndDeviceListService();
			 if(list.size()>0){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 map.put("result", list);
			 }else{
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
			 } 
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
	 
	 /* 查询区域和对应门区及所在控制器列表 门禁权限设置时用到*/
	 @RequestMapping("/queryAreaAndDoorList")
	 @ResponseBody
	 public Map<String,Object> queryAreaAndDoorList(){
		 Map<String,Object> map=new HashMap<String,Object>();
		 List<Map<String,Object>> list=null;
		 try{
			 list=idus.queryAreaAndDoorListService();
			 if(list.size()>0){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 map.put("result", list);
			 }else{
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
			 } 
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
	 /*查询访客能进门区列表*/
	 @RequestMapping("/queryDoorListByControl")
	 @ResponseBody
	 public Map<String,Object> queryDoorListByControlController(@RequestBody Map m){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			 List<DoorUnit> list=idus.queryDoorListByControlService(m);
			 if(list.size()>0){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 map.put("result", list);
			 }else{
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
			 } 
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
	 /* 根据门区号查名称*/
	 @RequestMapping("/queryDoorByDoorNo")
	 @ResponseBody
	 public Map<String,Object> queryDoorByDoorNoController(Short doorno){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			 List<DoorUnit> list=idus.queryDoorByDoorNoService(doorno);
			 if(list.size()>0){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 map.put("result", list);
			 }else{
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
			 } 
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
	 
	 /**
	  * 查询已经参与考勤的考勤点
	  */
	 @ResponseBody
	 @RequestMapping("/queryDoorUnit")
	 public Map<String, Object> queryDoorUnit(HttpServletResponse resp){
		 Map<String,Object> map=new HashMap<String,Object>();
		 //查询所有门区
		List<Map<String, Object>> unitlist = idus.queryDoorUnit();
		 if(unitlist.size()==0){
			 map.put("flag", false);
			 map.put("reason", "暂无数据可查！");
		 }else{
			 map.put("flag", true);
			 map.put("reason", "查询成功!");
			 map.put("result", unitlist);
		 }
		 resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		 return map;
	 }//end
	 
	 /**
	  * 修改方法,修改门区是否参与考勤
	  */
	 @ResponseBody
	 @RequestMapping("/updateEnable")
	 public Map<String, Object> updateEnable(DoorUnit record,HttpServletResponse resp){
		 Map<String,Object> map=new HashMap<String,Object>();
		 
	        boolean flay =	idus.updateEnable(record);//执行修改
	        
	        if(flay){
	        	map.put("flag", true);
				 map.put("reason", "修改成功");
	        }else{
	        	 map.put("flag", false);
				 map.put("reason", "修改失败");
	        }
		 resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		 return map;
	 }//end
	 
	 /**
	  *  * 目前只有小程序使用该方法
      * 通过工号和登录密码来查询,用户是否可以开门
	  */
	 @ResponseBody
	 @RequestMapping("/queryLoginDoorPwd")
    public Map<String, Object> queryLoginDoorPwd(String holderno,String holderpassword,HttpServletResponse resp){
		 Map<String, Object> map = new HashMap<>();//定义一个map向前端返回数据
		 //查询用户开门密码是否输入正确
		String mima = hservice.queryLoginDoorPwd(holderno, holderpassword);
		 
		 if(mima==null || "".equals(mima)){
			 map.put("flag", false);
			 map.put("reason", "用户名或者开门密码错误");
		 }else{
			 map.put("flag", true);
			 map.put("reason", "查询成功");
		 }
		 resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		 return map;
    }//end
	 
	 /*getDoorTree*/
	 @RequestMapping("/getDoorTree")
	 @ResponseBody
	 public Map<String,Object> getDoorTree(boolean res){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			 List<Map<String,Object>> list=idus.getDoorTreeService(res);
			 if(list.size()>0){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 map.put("result", list);
			 }else{
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
			 } 
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 /**
	  * 新增门区.专门用于SenseLink平台新增的设备
	  * 作用1:直接将设备相关的信息放在DoorUnit里面
	  * 作用2:直接将组放在设备中.
	  *  接口: /v2/device/update 是修改设备的接口.请求方式POST：form-data 具体看文档
	  */
	 @ResponseBody
	 @RequestMapping("/insertSenseLinkDevice")
	 public Map<String, Object> insertDoorUnit(@RequestBody Map<String, Object> revice){
		 Map<String, Object> map = new HashMap<String, Object>();
		 
		 DoorUnit doorUnit = new DoorUnit();
		 
			//放入通道名称
			doorUnit.setDoorname((String)revice.get("doorname"));
			//放入设备相关编号
			doorUnit.setDeviceno(Short.valueOf((String)revice.get("deviceno")));
			//放入设备通道号
			doorUnit.setDoorchannel(Short.valueOf((String)revice.get("doorchannel")));
			//放入终端名称.放在注释里面
			doorUnit.setDescription((String)revice.get("description"));
			//放入员工组和访客组
			doorUnit.setEmergencygroup((String)revice.get("emergencygroup"));
			//进入的sn
		    String entryreadersn =	(String) revice.get("entryreadersn");
		    //外出的sn
		    String exitreadersn = (String) revice.get("exitreadersn");
		    String sn=null;
		    if(entryreadersn == null){
		    	sn=exitreadersn;
		    	//放入外出的sn. 方向外出
		    	doorUnit.setExitreadersn(exitreadersn);
		    }else{
		    	sn=entryreadersn;
		    	//放入进入的sn。 方向:进入
		    	doorUnit.setEntryreadersn(entryreadersn);
		    }
		    
		 Map<String, Object>  viceMap =  idus.queryViceDoor(sn);
		     if(viceMap!=null){
		    	 map.put("flag", false);
				 map.put("reason", "不可重复添加");
		     }else{
		 			 //获取设备名称
		 			 String name =   (String) revice.get("description");
		 			 //获取设备位置
		 			 String location =  (String) revice.get("location");
		 			 //获取设备id
		 			 String  id = (String) revice.get("id");
		 			 //获取员工组
		 			 String staffGroup =  (String) revice.get("staffGroup");
		 			 //获取访客组
		 			 String visitorGroup =  (String) revice.get("visitorGroup");
		 			 //用于给接口传参
		 			 Map<String, String> params = new HashMap<>();
		 			 params.put("id", id);//传入设备id
		 			 params.put("name",name);//传入设备名称
		 			 params.put("location", location);//传入位置
		 			 params.put("groupStaff", staffGroup);//传入员工组
		 			 params.put("groupVisitor", visitorGroup);//传入访客组
		 			 params.putAll(SenseLinkConfig.CommonlySplicing());//放入鉴权参数
		 			 params.put("direction", "0");//传入位置
		 			 String url =SenseLinkConfig.URL+"/v2/device/update";
		 			 //执行SenseLink平台更新设备的接口
		 			 String result = CallingInterfaceUtil.postResponseWithParamsInMap(url, params);
		 			Map<String, Object> resultMap =  TypeConversionUtil.stringToMap(result);
		 			if(resultMap.get("code").equals(200)){
		 			int i =	idus.insertSelective(doorUnit);
		 			  if(i>0){
		 				 map.put("flag", true);
						 map.put("reason", "设备信息同步成功");
		 			  }else{
		 				 map.put("flag", false);
						 map.put("reason", "设备信息同步失败");
		 			  }
		 			}else{
		 				map.put("flag", false);
						map.put("reason", "与平台对接设备中的组信息失败!");
		 			}
		     }
		 return map;
	 }//end
	 
	 
	 
	 /**
	  * 通过doorno查询门区的详细信息
	  */
	 @ResponseBody
	 @RequestMapping("/selectByPrimaryKey")
	 public Map<String, Object> selectByPrimaryKey(Short doorno){
		 Map<String, Object> map = new HashMap<String,Object>();
		 DoorUnit doorUnit =	 idus.selectByPrimaryKey(doorno);
		 if(doorUnit==null){
			 map.put("code", "000");
			 map.put("reason", "暂无数据可查");
		 }else{
			 map.put("code", "200");
			 map.put("reason", "查询成功");
			 map.put("result", doorUnit);
		 }
		 return map;
	 }//end
	 
	 
	 /**
	  * 功能:
	  * 1,修改门区信息
	  * 2,修改SenseLink平台的设备信息
	  * /v2/device/update 是修改设备的接口 请求方式POST
	  * @return
	  */
	 @ResponseBody
	 @RequestMapping("/updateByPrimaryKeySelective")
	 public Map<String, Object> updateByPrimaryKeySelective(@RequestBody Map<String, Object> revice){
		 
		 Map<String, Object> map = new HashMap<String,Object>();
		 
		//获取设备id
		 String  id = (String) revice.get("id");
		 //获取设备位置
		 String location =  (String) revice.get("location");
		//获取终端名称
		 String description =  (String)revice.get("description");
		//获取员工组
		String staffGroup =  (String) revice.get("staffGroup");
		 //获取访客组
		String visitorGroup =  (String) revice.get("visitorGroup");
		 
		 Map<String, String> params = new HashMap<String,String>();
		 
		 params.put("id", id);
		 params.put("name", description);
		 params.put("location", location);
		 params.put("description", "测试修改功能");
		 params.put("direction", "0");
		 params.put("groupStaff", staffGroup);
		 params.put("groupVisitor", visitorGroup);
		Map<String, Object> resultMap = updateDevice(params);
		
		if(resultMap.get("code").equals(200)){
		
		 DoorUnit doorUnit = new DoorUnit();
			//放入员工组和访客组
			doorUnit.setEmergencygroup((String)revice.get("emergencygroup"));
			//放入通道名称
			doorUnit.setDoorname((String)revice.get("doorname"));
			//放入通道编号
			doorUnit.setDoorno(Short.valueOf((String)revice.get("doorno")));
			//放入设备通道号
			doorUnit.setDoorchannel(Short.valueOf((String)revice.get("doorchannel")));
			//进入的sn
		    String entryreadersn =	(String) revice.get("entryreadersn");
		    //外出的sn
		    String exitreadersn = (String) revice.get("exitreadersn");
			//放入设备名称
			doorUnit.setDescription(description);
			  String sn=null;
			    if(entryreadersn == null){
			    	sn=exitreadersn;
			    	//放入外出的sn. 方向外出
			    	doorUnit.setExitreadersn(exitreadersn);
			    }else{
			    	sn=entryreadersn;
			    	//放入进入的sn。 方向:进入
			    	doorUnit.setEntryreadersn(entryreadersn);
			    }
			 int i =    idus.updateByPrimaryKeySelective(doorUnit);
			  if(i>0){
	 				 map.put("flag", "200");
					 map.put("reason", "设备信息同步成功");
	 			  }else{
	 				 map.put("code", "201");
					 map.put("reason", "设备信息同步失败");
	 			  }
		}else{
			map.put("code", "201");
			map.put("reason", "与平台同步设备信息失败!");
		}
		 return map;
	 }//end
	 
	 /**
	  * 修改设备的工具方法
	  * /v2/device/update 是修改设备的接口 请求方式POST
	  * @return
	  */
   private  Map<String, Object> updateDevice(Map<String, String> revice){
	   //定义一个map用于给接提供参数
		 Map<String, String> params = new HashMap<String, String>();
		 params.putAll(SenseLinkConfig.CommonlySplicing());
		 params.putAll(revice);
		 String UpdateUrl = SenseLinkConfig.URL+"/v2/device/update";
		 String result = CallingInterfaceUtil.sendPost(UpdateUrl, params);
		Map<String, Object> resultMap =  TypeConversionUtil.stringToMap(result);
		 return resultMap;
	   
   }//end
	 

}
