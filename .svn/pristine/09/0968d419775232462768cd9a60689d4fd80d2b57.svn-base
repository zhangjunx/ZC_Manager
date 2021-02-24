package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.service.DeviceUnit2Service;
import com.xr.util.ExcelUtil;

@RequestMapping("/deviceUnit2")
@Controller
public class DeviceUnit2Controller {
	
	@Autowired
	private DeviceUnit2Service deviceUnitService;
	
	/**
	 * 获取设备列表信息
	 * map:查询参数
	 */
	@RequestMapping("/getDeviceList")
	@ResponseBody
	public Map<String,Object> getDeviceList(@RequestParam Map<String,Object> map,HttpServletResponse resp){
		Map<String,Object> resultMap = deviceUnitService.getDeviceList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 新增设备
	 */
	@RequestMapping("/saveDeviceInfo")
	@ResponseBody
	public Map<String,Object> saveDeviceInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = deviceUnitService.saveDeviceInfo(map);
		return resultMap;
	}
	
	/**
	 * 获取一条设备信息
	 * deviceNo:必要参数
	 */
	@RequestMapping("/getOneDeviceInfo")
	@ResponseBody
	public Map<String,Object> getOneDeviceInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();;
		Map<String,Object> info = deviceUnitService.getOneDeviceInfo(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", info);
		return resultMap;
	}
	
	/**
	 * 删除设备
	 * deviceNo:必要参数
	 */
	@RequestMapping("/delOneDeviceInfo")
	@ResponseBody
	public Map<String,Object> delOneDeviceInfo(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();;
		Integer b = deviceUnitService.delOneDeviceInfo(map);
		if(b>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新成功!");
			resultMap.put("result", true);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新失败!");
			resultMap.put("result", false);
		}
		
		return resultMap;
	}
	
	/**
	 * 获取设备类型下拉框
	 */
	@RequestMapping("/getDeviceTypeList")
	@ResponseBody
	public Map<String,Object> getDeviceTypeList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = deviceUnitService.getDeviceTypeList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取设备厂家下拉框
	 */
	@RequestMapping("/getDeviceFactoryList")
	@ResponseBody
	public Map<String,Object> getDeviceFactoryList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = deviceUnitService.getDeviceFactoryList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取设备厂家下拉框(不予设备类型有关联)
	 */
	@RequestMapping("/getDeviceFactoryList2")
	@ResponseBody
	public Map<String,Object> getDeviceFactoryList2(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = deviceUnitService.getDeviceFactoryList2(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取设备型号下拉框
	 * map参数：DataNo为必须参数(厂家)
	 */
	@RequestMapping("/getDeviceModelList")
	@ResponseBody
	public Map<String,Object> getDeviceModelList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = deviceUnitService.getDeviceModelList(map);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * 获取区域下拉树数据
	 */
	@RequestMapping("/getAreaTree")
	@ResponseBody
	public Map<String,Object> getAreaTree(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = deviceUnitService.getAreaTree();
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功!");
		resultMap.put("result", list);
		return resultMap;
	}
	
	/**
	 * Excel批量导入设备的方法
	 * @param revice
	 */
	@ResponseBody
	@RequestMapping("/addExcelBatchDevice")
	public Map<String, Object> addExcelBatchDevice(@RequestBody Map<String, Object> revice){
		Map<String, Object> map = new HashMap<String,Object>();
		
	   List<Map<String, Object>> devicelist = 	(List<Map<String, Object>>) revice.get("list");
	   
	  List<Map<String, Object>> resultMaplist =  deviceUnitService.selectBatchDevice(devicelist);
	 
	  if(resultMaplist.size()>0){
		  map.put("code", "2001");
		  map.put("reason", "数据重复");
		  map.put("result", resultMaplist);
	  }else{
		   deviceUnitService.addExcelBatchDevice(devicelist);
		  map.put("code", "200");
		  map.put("reason", "插入成功");
	  }
		return map;
	}//end
	
	/**
	 * 读取Excel中的数据
	 * @param file
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/checkExcelData")
	public Map<String, Object> checkExcelData(@RequestParam MultipartFile file,HttpServletResponse resp) throws Exception{
		Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
	    List<String[]> list =  ExcelUtil.readExcel(file);//获取表格中的所有数据
	    List<String[]> excel = new  ArrayList<String[]>();//让如数据
           Iterator<String[]> it = list.iterator();//使用迭代器来循环list
          while(it.hasNext()){//循环读取
        	  String[] data =  it.next();//接手每一行excel中的数据
            int i =  data.length;
        	  if((data.length == 1) ||(data.length == 2)){//判断是否有一整行空值
        		  it.remove();
        	  }else{
        		  excel.add(data);
        	  }
          }// end while
	     if(excel.size()==0){
	    	 map.put("flag", false);
	    	 map.put("reason", "暂无数据可查");
	      } else{
	    	  map.put("flag", true);
		      map.put("reason", "查询成功");
		      map.put("result", excel);
	      }
            resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
			return map;
 }//end
	
	/**
	 * 定时执行方法
	 * 更新设备在线状态
	 */
	public void updateDeviceOnline(){
		deviceUnitService.updateDeviceOnline();
	}
}
