package com.xr.service.impl;

import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.DeviceUnit2Mapper;
import com.xr.service.DeviceUnit2Service;
import com.xr.util.TreeToolUtils;

@Service
public class DeviceUnit2ServiceImpl implements DeviceUnit2Service {
	
	@Autowired
	private DeviceUnit2Mapper deviceUnitMapper;
	
	/**
	 * 获取设备列表
	 */
	@Override
	public Map<String, Object> getDeviceList(Map<String, Object> map) {
		Map<String,Object> resMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = deviceUnitMapper.getDeviceList(map);
		Integer count = deviceUnitMapper.getDeviceListCount(map);
		resMap.put("result", list);
		resMap.put("count", count);
		return resMap;
	}
	
	/**
	 * 添加/编辑设备信息
	 * id为空：添加
	 * id不为空：编辑
	 */
	@Override
	public Map<String,Object> saveDeviceInfo(Map<String, Object> map) {
		//参数验证
		Map<String,Object> resultMap = checkAddParm(map);
		if(resultMap.get("result") != null && !resultMap.get("result").toString().equals("")){
			return resultMap;
		}
		
		String ManufacturerCode = deviceUnitMapper.getFactureRealID(map);//根据前台传来的设备厂家与设备型号的中间表ID获取设备厂家ID
		map.put("ManufacturerCode", ManufacturerCode);//修改参数中设备厂家的id
		
		if(map.get("DeviceNO") != null && !map.get("DeviceNO").toString().equals("")){//编辑
			int b = deviceUnitMapper.editDeviceInfo(map);
			
			//人脸机设备时，添加参数
			if(map.get("DeviceTypeCode").equals("20")){
				deviceUnitMapper.editDeviceParm(map);
			}
		}else{//新增
			Integer maxIndex = deviceUnitMapper.getMaxIndex();//获取设备中id最大值
			map.put("DeviceNo", maxIndex+1);
			int b = deviceUnitMapper.saveDeviceInfo(map);
			
			//人脸机设备时，添加参数
			if(map.get("DeviceTypeCode").equals("20")){
				deviceUnitMapper.saveDeviceParm(map);
			}
		}
		resultMap.put("flag", true);
		resultMap.put("reason", "设备更新成功");
		resultMap.put("result", 1);
		return resultMap;
	}

	/**
	 * 设备新增参数验证
	 * @param map
	 * @return
	 */
	private Map<String, Object> checkAddParm(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("ControlSN") == null || map.get("ControlSN").toString().equals("")){//限制设备SN号不能为空
			resultMap.put("flag", false);
			resultMap.put("reason", "设备SN号不可为空");
			resultMap.put("result", 0);
			return resultMap;
		}
		
		//获取设备列表
		Map<String,Object> parmMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = deviceUnitMapper.getDeviceList(parmMap);
		
		//SN唯一
		if(list != null){
			int count = 0;
			for(int i=0;i<list.size();i++){
				String deviceSN = list.get(i).get("ControlSN").toString();
				if(deviceSN.equals(map.get("ControlSN").toString())){
					count++;
				}
			}
			
			if(map.get("DeviceNO") != null && !map.get("DeviceNO").toString().equals("")){//编辑
				if(count>1){
					resultMap.put("flag", false);
					resultMap.put("reason", "设备SN号已经存在");
					resultMap.put("result", 0);
					return resultMap;
				}
			}else{
				if(count>0){
					resultMap.put("flag", false);
					resultMap.put("reason", "设备SN号已经存在");
					resultMap.put("result", 0);
					return resultMap;
				}
			}
		}
		return resultMap;
	}

	/**
	 * 获取门禁类型下拉框
	 */
	@Override
	public List<Map<String,Object>> getDeviceTypeList(Map<String, Object> map) {
		List<Map<String,Object>> list = deviceUnitMapper.getDeviceTypeList(map);
		return list;
	}

	/**
	 * 获取设备厂家下拉框
	 */
	@Override
	public List<Map<String, Object>> getDeviceFactoryList(Map<String, Object> map) {
		List<Map<String,Object>> list = deviceUnitMapper.getDeviceFactoryList(map);
		return list;
	}

	/**
	 * 获取设备厂家下拉框（不与设备类型关联）
	 */
	@Override
	public List<Map<String, Object>> getDeviceFactoryList2(Map<String, Object> map) {
		List<Map<String,Object>> list = deviceUnitMapper.getDeviceFactoryList2(map);
		return list;
	}

	/**
	 * 获取设备型号下拉框
	 * map参数：DataNo为必须参数(厂家)
	 */
	@Override
	public List<Map<String, Object>> getDeviceModelList(Map<String, Object> map) {
		List<Map<String,Object>> list = deviceUnitMapper.getDeviceModelList(map);
		return list;
	}

	/**
	 * 获取下拉树
	 */
	@Override
	public List<Map<String, Object>> getAreaTree() {
		List<Map<String,Object>> list = deviceUnitMapper.getareaTree();
		List<Map<String,Object>> treeList = new ArrayList<Map<String,Object>>();
		TreeToolUtils u = new TreeToolUtils();
		treeList = u.menuList(list,true);
		return treeList;
	}

	/**
	 * 获取一条设备信息
	 * deviceNo:必要参数
	 */
	@Override
	public Map<String, Object> getOneDeviceInfo(Map<String, Object> map) {
		Map<String,Object> info = deviceUnitMapper.getOneDeviceInfo(map);
		//根据DeviceTypeCode，ManufacturerCode获取DataNo属性值
		String DataNo = deviceUnitMapper.getDataValue(info);
		info.put("DataNo", DataNo);
		return info;
	}

	/**
	 * 删除设备
	 * deviceNo:必要参数
	 */
	@Override
	public Integer delOneDeviceInfo(Map<String, Object> map) {
		Integer b = deviceUnitMapper.delOneDeviceInfo(map);
		return b;
	}

	/**
	 * Excel批量导入设备的方法
	 */
	@Override
	public void addExcelBatchDevice(List<Map<String, Object>> list) {
		 deviceUnitMapper.addExcelBatchDevice(list);
	}//end

	/**
	 * Excel批量导入时检查数据是否有重复
	 * @param list
	 */
	@Override
	public List<Map<String, Object>> selectBatchDevice(List<Map<String, Object>> list) {
		return deviceUnitMapper.selectBatchDevice(list);
	}

	@Override
	public void updateDeviceOnline() {
		List<Map<String, Object>> list = deviceUnitMapper.getAllList();
		URL url;
		for(int i=0;i<list.size();i++){
			try {
				if(list.get(i).get("IP") == null || list.get(i).get("IP").toString().equals("")){
					Map<String,Object> parmMap = new HashMap<String,Object>();
					parmMap.put("deviceNo", list.get(i).get("DeviceNo"));
					parmMap.put("status", -1);
					deviceUnitMapper.updateDeviceOnline(parmMap);
					continue;
				}
				String IP = list.get(i).get("IP").toString();
				url = new URL(IP);
				if(!InetAddress.getByName(IP).isReachable(1000)){
					Map<String,Object> parmMap = new HashMap<String,Object>();
					parmMap.put("deviceNo", list.get(i).get("DeviceNo"));
					parmMap.put("status", -1);
					deviceUnitMapper.updateDeviceOnline(parmMap);
					continue;
				}
				// 打开和URL之间的连接
				HttpURLConnection connection = (HttpURLConnection) url.openConnection();
				connection.setConnectTimeout(1000);
				Map<String,Object> parmMap = new HashMap<String,Object>();
				parmMap.put("deviceNo", list.get(i).get("DeviceNo"));
				parmMap.put("status", 1);
				deviceUnitMapper.updateDeviceOnline(parmMap);
				continue;
			} catch (Exception e) {
				Map<String,Object> parmMap = new HashMap<String,Object>();
				parmMap.put("deviceNo", list.get(i).get("DeviceNo"));
				parmMap.put("status", -1);
				deviceUnitMapper.updateDeviceOnline(parmMap);
				continue;
			}
		}
	}

}
