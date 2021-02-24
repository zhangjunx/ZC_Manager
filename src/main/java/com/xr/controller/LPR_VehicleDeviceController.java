package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.LPR_VehicleDevice;
import com.xr.service.ILPR_VehicleDeviceService;

@Controller
@RequestMapping("LPR_VehicleDevice")
public class LPR_VehicleDeviceController {

	@Autowired
	private ILPR_VehicleDeviceService vds;
	/**
	 * 插入摄像机和车辆信息
	 * @param record
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/insertVehicleDevice")
	public Map<String,Object> insertVehicleDeviceController(@RequestBody Map m){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			 int i = vds.insertVehicleDeviceService(m);
			 if(i>0){
				 	map.put("flag",true);
					map.put("reason", "添加成功！");
				}else{
					map.put("flag", false);
					map.put("reason", "添加失败！");
				}
			}catch(Exception ex){
				map.put("flag", false);
				map.put("reason", "程序异常，请联系管理员！");
			}	 
		return map;
	}//end
	
	/**根据车牌号查询车辆权限信息*/
	@ResponseBody
	@RequestMapping("/queryAuthority")
	public Map<String,Object> queryAuthorityController(String strplateid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			 LPR_VehicleDevice record = vds.queryAuthorityService(strplateid);
			 if(record!=null){
				 	map.put("flag",true);
					map.put("reason", "查询成功！");
					map.put("result", record);
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
	
	/*int insertVehicleDeviceBatchService(List<LPR_VehicleDevice> list);//批量添加
	 *  int deleteVehicleDeviceBatchService(List<Integer> list);//批量删除*/
	@ResponseBody
	@RequestMapping("/insertVehicleDeviceBatch")
	public Map<String,Object> insertVehicleDeviceBatchController(@RequestBody List<Map<String,Object>> mlist){
		Map<String,Object> map=new HashMap<String,Object>();
		List<LPR_VehicleDevice> lis=new ArrayList<LPR_VehicleDevice>();
		List<LPR_VehicleDevice> lit=new ArrayList<LPR_VehicleDevice>();
		List<Integer> ids=new ArrayList<Integer>();
		try{
			int vehicleid=Integer.parseInt((String) mlist.get(0).get("vehicleid"));
			 LPR_VehicleDevice vehicledevice=new LPR_VehicleDevice();
			 vehicledevice.setVehicleid(vehicleid);
			 List<LPR_VehicleDevice> list=vds.queryVehicleDeviceByVehicleidAndDeviceNoService(vehicledevice);
			 //批量添加过滤
			 for(int i=0;i<mlist.size();i++){
				 int deviceno=Integer.parseInt((String) mlist.get(i).get("deviceno"));
				 String devicename=(String) mlist.get(i).get("devicename");
				 LPR_VehicleDevice vr=new LPR_VehicleDevice();
				 vr.setVehicleid(vehicleid);
				 vr.setDeviceno(deviceno);
				 vr.setDevicename(devicename);
				 boolean res=false;
				 for(int j=0;j<list.size();j++){
					 int deviceno2=list.get(j).getDeviceno();
					 if(deviceno==deviceno2){
						 res=true;
					 }
				 }
				 if(!res){//表示不存在 可以添加
					 lis.add(vr);
				 }else{
					 lit.add(vr);//表示存在 不可以重复添加
				 }
			 }
			 
			 //批量删除过滤
			 for(int i=0;i<list.size();i++){//数据库有的
				 int deviceno1=list.get(i).getDeviceno();
				 boolean res=false;
				 for(int j=0;j<mlist.size();j++){//前端传来的
					 int deviceno2=Integer.parseInt((String) mlist.get(j).get("deviceno"));
					 if(deviceno1==deviceno2){
						 res=true;
					 }
				 }
				 if(!res){
					 ids.add(list.get(i).getId());//前台传过来的不存在数据库中 执行添加操作
				 }
			 }
			 int i1=0;
			 int i2=0;
			 if(lis.size()>0){
				 i1=vds.insertVehicleDeviceBatchService(lis);
			 }
			 if(ids.size()>0){
				 i2=vds.deleteVehicleDeviceBatchService(ids);
			 }
			 if(i1==0  && i2==0){
					map.put("flag", false);
					map.put("reason", "权限设置失败，不能重复添加权限！");
			    }else if(i1>0  && i2==0){
					map.put("flag", false);
					map.put("reason", "权限设置成功！");
			    }else if(i1==0  && i2>0){
					map.put("flag", false);
					map.put("reason", "权限设置成功，移除原有权限成功！");
			    }else if(i1>0  && i2>0){
					map.put("flag", false);
					map.put("reason", "权限设置成功，更新权限成功！");
			    }
			}catch(Exception ex){
				map.put("flag", false);
				map.put("reason", "程序异常，请联系管理员！");
			}	 
		return map;
	}//end
	
	/*List<LPR_VehicleDevice> queryVehicleDeviceByVehicleidAndDeviceNoService(LPR_VehicleDevice record);//权限设置时 先查询已有的权限*/
	@ResponseBody
	@RequestMapping("/queryVehicleDeviceByVehicleidAndDeviceNo")
	public Map<String,Object> queryVehicleDeviceByVehicleidAndDeviceNoController(LPR_VehicleDevice record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			 List<LPR_VehicleDevice> list=vds.queryVehicleDeviceByVehicleidAndDeviceNoService(record);
			 if(list.size()>0){
				 	map.put("flag",true);
					map.put("reason", "查询成功！");
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
	
	
	/*List<Map<String, Object>> queryLPRDeviceListByVehicleidService(Integer vehicleid)根据vehicleid 查车辆权限设备信息*/
	@ResponseBody
	@RequestMapping("/queryLPRDeviceListByVehicleid")
	public Map<String,Object> queryLPRDeviceListByVehicleidController(Integer vehicleid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String, Object>> list=vds.queryLPRDeviceListByVehicleidService(vehicleid); 
			 if(list.size()>0){
				 	map.put("flag",true);
					map.put("reason", "查询成功！");
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
}
