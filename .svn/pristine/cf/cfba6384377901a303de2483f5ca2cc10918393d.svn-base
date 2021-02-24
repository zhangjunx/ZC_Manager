package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.BigDataMapper;
import com.xr.dao.DeviceUnitMapper;
import com.xr.dao.IODataMapper;
import com.xr.entity.IOData;
import com.xr.service.BigDataService;
import com.xr.service.HY_MeetingRoomService;

@Service
public class BigDataServiceImpl implements BigDataService {
	@Autowired
	private BigDataMapper bdm;
	@Autowired
	private IODataMapper iom;

	@Autowired
	private DeviceUnitMapper dum;
	
	@Autowired
	private HY_MeetingRoomService meetingRoomService;
	
	@Override
	public Map<String, Object> queryDDPCInfoSum() {//设备、门、人员、车辆信息统计
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Map<String,Object> deviceMap = dum.queryDeviceSum();//查询设备在线、离线、总数
			if (deviceMap.size() > 0) {//把设备统计结果放入集合
				map.put("Device", deviceMap);
			}else {
				map.put("Device", null);
			}//设备统计结束
			Map<String,Object> doorMap = new HashMap<String,Object>();//开始统计门区
			Map<String,Object> dmap = new HashMap<String,Object>();
			dmap.put("doorno", "");
			List<Map<String,Object>> listDoor = meetingRoomService.getDoorList(dmap);//获取门区信息
			if (listDoor.size() > 0) {
				int k = 0, g = 0;
				for (Map<String, Object> map2 : listDoor) {//根据门区状态，对开门和关门进行统计
					if (map2.get("IOSTatus") != null && "1".equals(map2.get("IOSTatus").toString())) {
						g+=1;
					}else if (map2.get("IOSTatus") != null && "2".equals(map2.get("IOSTatus").toString())) {
						k+=1;
					}
				}
				doorMap.put("doorSum", listDoor.size());//将统计好的门区放入一个map集合
				doorMap.put("closeDoor", g);
				doorMap.put("openDoor", k);
			}else {
				deviceMap = null;
			}
			map.put("door", doorMap);//将门区集合放入map中
			map.put("flag", true);
		}catch(Exception e){
			map.put("flag", false);
			map.put("reason", "查询失败，请联系管理员！");
		}
		return map;
	}

	@Override
	public List<IOData> queryIORecordByBigDataService() {
		//查进出记录 大数据显示的
		return iom.queryIORecordByBigData();
	}

	@Override
	public Map<String, Object> queryDeviceAndHolderCountService() {
		// 统计设备和人员总数
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> map1=bdm.getDeviceCount();
		Map<String,Object> map2=bdm.getDoorCount();
		Map<String,Object> map3=bdm.getHolderCount();
		Map<String,Object> map4=bdm.getVehicleCount();
		/*if(map1!=null){
			map.put("deviceCount", map1.get("count"));
		}*/
		
		return map;
	}

}
