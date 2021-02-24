package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.CAP_TimeZoneDoorHolder;
import com.xr.entity.DoorUnit;
import com.xr.entity.SY210AppSet;
import com.xr.service.ICAP_TimeZoneDoorHolderService;
import com.xr.service.ISY210AppSetService;


@Controller
@RequestMapping("CAP_TimeZoneDoorHolder")
public class CAP_TimeZoneDoorHolderController {

	@Autowired
	private ICAP_TimeZoneDoorHolderService idhs;
	@Autowired
	private ISY210AppSetService isys;
	
	/* 门禁权限设置时 给人员分配权限*/
	@RequestMapping("/insertCAPTimeZoneDoorHolderBatch")
	@ResponseBody
	public Map<String,Object>  insertCAPTimeZoneDoorHolderController(@RequestBody List<Map<String,Object>> listmap){
		Map<String,Object> map=new HashMap<String,Object>();
		List<CAP_TimeZoneDoorHolder> list=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> liss=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> litt=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<Integer> lit=new ArrayList<Integer>();
		List<Map<String,Object>> doorlist=null;
		try{
			for(int k=0;k<listmap.size();k++){
				CAP_TimeZoneDoorHolder tz=new CAP_TimeZoneDoorHolder();
				Map<String,Object> mlist=listmap.get(k);
				String holderno=(String) mlist.get("holderno");
				String holdername=(String) mlist.get("holdername");
				String departmentname=(String) mlist.get("departmentname");
				int controlid=Integer.parseInt((String) mlist.get("controlid")); 
				String controlname=(String) mlist.get("controlname");
				String doorexit="0000";//(String) mlist.get("doorexit");
				int door1status=0;//(int) mlist.get("door1status");
				int door2status=0;//(int) mlist.get("door2status");
				int door3status=0;//(int) mlist.get("door3status");
				int door4status=0;//(int) mlist.get("door4status");
				int door1id=0;//(String)mlist.get("door1id");
				int door2id=0;//Integer.parseInt((String)mlist.get("door2id"));
				int door3id=0;//Integer.parseInt((String)mlist.get("door3id"));
				int door4id=0;//Integer.parseInt((String)mlist.get("door4id"));
				int appsetno1=0;//(int) mlist.get("appsetno1");//Integer.parseInt((String) mlist.get("appsetno1"));
				char[] str=doorexit.toCharArray();
				doorlist=(List<Map<String, Object>>) mlist.get("doorarr");
				for(int j=0;j<doorlist.size();j++){
					int deviceno=Integer.parseInt((String)doorlist.get(j).get("deviceno"));
					int doorno=Integer.parseInt((String)doorlist.get(j).get("doorno"));
					int channel=Integer.parseInt((String)doorlist.get(j).get("doorchannel"));
					for(int kk=0;kk<str.length;kk++){
						if(channel==(kk+1)){
							str[kk]='1';
						}
					}
					doorexit=String.valueOf(str);
					if(channel==1){
						door1status=1;
						door1id=doorno;
					}else if(channel==2){
						door2status=1;
						door2id=doorno;
					}else if(channel==3){
						door3status=1;
						door3id=doorno;
					}else if(channel==4){
						door4status=1;
						door4id=doorno;
					}
				}
				//批量修改
				CAP_TimeZoneDoorHolder dh=new CAP_TimeZoneDoorHolder();
				dh.setHolderno(holderno);
				dh.setControlid(controlid);
				CAP_TimeZoneDoorHolder dhdata=idhs.queryDoorHolderByHolderAndControlService(dh);//权限设置时 提交保存先查看该员工是否已有权限
				//先判断 AppsetNo是否存在
				SY210AppSet sy=new SY210AppSet();
				sy.setDeviceno((short) controlid);
				sy.setEntryreader(doorexit);
				List<SY210AppSet> syapplist=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);
				if(dhdata!=null && !"".equals(dhdata)){//员工已存在
					dhdata.setHoldername(holdername);
					dhdata.setDepartmentname(departmentname);
					dhdata.setControlname(controlname);
					dhdata.setDoorexit(doorexit);
					dhdata.setDoor1status(door1status);
					dhdata.setDoor2status(door2status);
					dhdata.setDoor3status(door3status);
					dhdata.setDoor4status(door4status);
					dhdata.setDoor1id(door1id);
					dhdata.setDoor2id(door2id);
					dhdata.setDoor3id(door3id);
					dhdata.setDoor4id(door4id);
					/*//先判断 AppsetNo是否存在
					SY210AppSet sy=new SY210AppSet();
					sy.setDeviceno((short) controlid);
					sy.setDoorexit(doorexit);
					SY210AppSet syapp=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);*/
					if(syapplist.size()>0){
						Short appsetno=syapplist.get(0).getAppsetno();
						dhdata.setAppsetno1((int)appsetno);
						litt.add(dhdata);//已存在 需要批量修改
					}else{
						lit.add(dhdata.getId());//已存在 需要批量删除
					}
				}else{//员工不存在
					//批量添加
					tz.setHolderno(holderno);
					tz.setControlid(controlid);
					tz.setHoldername(holdername);
					tz.setDepartmentname(departmentname);
					tz.setControlname(controlname);
					tz.setDoorexit(doorexit);
					tz.setDoor1status(door1status);
					tz.setDoor2status(door2status);
					tz.setDoor3status(door3status);
					tz.setDoor4status(door4status);
					tz.setDoor1id(door1id);
					tz.setDoor2id(door2id);
					tz.setDoor3id(door3id);
					tz.setDoor4id(door4id);
					//先判断 AppsetNo是否存在
					/*SY210AppSet sy=new SY210AppSet();
					sy.setDeviceno((short) controlid);
					sy.setDoorexit(doorexit);
					SY210AppSet syapp=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);*/
					if(syapplist.size()>0){
						Short appsetno=syapplist.get(0).getAppsetno();
						appsetno1=appsetno;
						tz.setAppsetno1(appsetno1);
						list.add(tz);//新增的 需要批量添加
					}else{
						tz.setAppsetno1(appsetno1);
						liss.add(tz);//新增的 但是对应的AppsetNo1不存在 所以不执行添加操作
					}
				} 
			}
				
			int i1=0;
			int i2=0;
			//int i3=0;
			if(list.size()>0){
				i1=idhs.insertCAPTimeZoneDoorHolderBatchService(list);
			}
			if(litt.size()>0){
				i2=idhs.updateDoorHolderBatchService(litt);
			}
			/*if(lit.size()>0){
				i3=idhs.deleteDoorHolderBatchService(lit);
			}*/
			if(!(i1==0 && i2==0)){
				map.put("flag", true);
				map.put("reason", "保存成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "保存失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
			
		return map;
	}//end
	
	/* 门禁权限设置时 给人员分配权限*/
	@RequestMapping("/queryDoorHolderByHolder")
	@ResponseBody
	public Map<String,Object>  queryDoorHolderByHolderController(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Integer> doorlist=new ArrayList<Integer>();
	    try{
	    	List<CAP_TimeZoneDoorHolder> list=idhs.queryDoorHolderByHolderService(holderno); 
	    	for(int i=0;i<list.size();i++){
	    		int door1id=list.get(i).getDoor1id();
	    		int door2id=list.get(i).getDoor2id();
	    		int door3id=list.get(i).getDoor3id();
	    		int door4id=list.get(i).getDoor4id();
	    		if(door1id>0){
	    			doorlist.add(door1id);
	    		}
	    		if(door2id>0){
	    			doorlist.add(door2id);
	    		}
	    		if(door3id>0){
	    			doorlist.add(door3id);
	    		}
	    		if(door4id>0){
	    			doorlist.add(door4id);
	    		}
	    	}
			if(doorlist.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", doorlist);
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
	
	/*List<Map<String,Object>> queryDoorPermSeeListService();//门禁权限查看列表*/
	@RequestMapping("/queryDoorPermSeeList")
	@ResponseBody
	public Map<String,Object>  queryDoorPermSeeListController(@RequestParam Short doorno,@RequestParam String departmentname){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			ma.put("doorno", doorno);
			ma.put("departmentname", departmentname);
			List<Map<String,Object>> list=idhs.queryDoorPermSeeListService(ma);
			List<Map<String,Object>> lis=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){//以门区为主 查出所有门区相关的列表信息
				Short doorno1=(Short) list.get(i).get("DoorNo");
				Short  channel=(Short) list.get(i).get("DoorChannel");
				String entryreader=(String) list.get(i).get("EntryReader");
				char[] str=entryreader.toCharArray();
				boolean res=false;
				for(int j=0;j<str.length;j++){//以门区通道为主 查出符合条件的AppsetNo
					if(channel==(j+1) && str[j]=='1'){
						res=true;
					}
				}
				if(res){//返回的符合条件的 所有与门区相关的人员
					lis.add(list.get(i));
				}
			}
			List<Map<String,Object>> liss=new ArrayList<Map<String,Object>>();
			//去重复 以门区为主
			for(int i=0;i<lis.size();i++){
				Short doorno1=(Short) lis.get(i).get("DoorNo");
				boolean res=false;
				for(int j=i+1;j<lis.size();j++){
					Short doorno2=(Short) lis.get(j).get("DoorNo");
					if(doorno1.equals(doorno2)){
						res=true;
					}
				}
				if(!res){
					liss.add(lis.get(i));
				}
			}
			List<Map<String,Object>> litt=new ArrayList<Map<String,Object>>();
			
			//将相同门区的人封装到一起
			for(int i=0;i<liss.size();i++){
				Short doorno1=(Short) liss.get(i).get("DoorNo");
				int doorno11=doorno1;
				String doorname1=(String) liss.get(i).get("DoorName");
				Short channel1=(Short) liss.get(i).get("DoorChannel");
				int channel11=channel1;
				int controlid1=(int) liss.get(i).get("ControlID");
				String controlname1=(String) liss.get(i).get("ControlName");
				Map<String,Object> maplist=new HashMap<String,Object>();
				maplist.put("doorno", doorno11);
				maplist.put("doorname", doorname1);
				maplist.put("doorchannel", channel11);
				maplist.put("controlid", controlid1);
				maplist.put("controlname", controlname1);
				List<Map<String,Object>> lit=new ArrayList<Map<String,Object>>();
				List<Map<String,Object>> lit1=new ArrayList<Map<String,Object>>();
				for(int j=0;j<lis.size();j++){
					Short doorno2=(Short) lis.get(j).get("DoorNo");
					String holderno2=(String) lis.get(j).get("HolderNo");
					String holdername2=(String) lis.get(j).get("HolderName");
					Map<String,Object> m=new HashMap<String,Object>();
					if(doorno1.equals(doorno2)){
						m.put("holderno", holderno2);
						m.put("holdername", holdername2);
						lit.add(m);
					}
				}
				//将同一个工号的员工去重复
				Set set=new HashSet();
				set.addAll(lit);
				lit1.addAll(set);
				maplist.put("holderlist", lit1);
				litt.add(maplist);
			}
			
		    if(litt.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", litt);
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
	
	
	
	/* List<Map<String,Object>> queryHolderListByDoorBatchService(Map m);//门禁查看时 点权限设置时出现*/
	@RequestMapping("/queryHolderListByDoorBatch")
	@ResponseBody
	public Map<String,Object>  queryHolderListByDoorBatchController(@RequestBody Map m,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> maa=new HashMap<String,Object>();
		List<Map<String,Object>> liss=new ArrayList<Map<String,Object>>();
		List<String> holdernos=new ArrayList<String>();
		List<String> deptnos=new ArrayList<String>();
	    try{
	    	List<Map<String,Object>> arrlist=(List<Map<String, Object>>) m.get("arr");
	    	//String deptno="";
	    	String compno="";
	    	for(int i=0;i<arrlist.size();i++){
	    		String str=(String) arrlist.get(i).get("holderno");
	    		System.out.print(str+"\t");
	    		holdernos.add(str);
	    		String deptno=idhs.queryDeptByHolderService(str);
	    		if(deptno!=null){
	    			deptnos.add(deptno);
	    		}
	    		//compno=deptno.substring(0,3);
	    	}
	    	maa.put("list", holdernos);
	    	maa.put("compno", compno);
	    	List<Map<String,Object>> list=idhs.queryHolderListByDoorBatchService(maa);
	    	//去重复
	    	for(int j=0;j<list.size();j++){
	    		String departmentno=(String) list.get(j).get("DepartmentNo");
	    		boolean res=false;
	    		for(int k=j+1;k<list.size();k++){
	    			String departmentno2=(String) list.get(k).get("DepartmentNo");
	    			if(departmentno.equals(departmentno2)){
	    				res=true;
	    			}
	    		}
	    		if(!res){
	    			liss.add(list.get(j));
	    		}
	    	}
	    	List<Map<String,Object>> litt=new ArrayList<Map<String,Object>>();
	    	//集合holderlist
	    	for(int i=0;i<liss.size();i++){
	    		String departmentno=(String) liss.get(i).get("DepartmentNo");
	    		String departmentname=(String) liss.get(i).get("DepartmentName");
	    		Map<String,Object> maplist=new HashMap<String,Object>();
	    		maplist.put("departmentno",departmentno);
	    		maplist.put("departmentname",departmentname);
	    		boolean res=false;
	    		List<Map<String,Object>> lit=new ArrayList<Map<String,Object>>();
	    		for(int j=0;j<list.size();j++){
	    			String departmentno2=(String) list.get(j).get("DepartmentNo");
	    			String holderno=(String) list.get(j).get("HolderNo");
    				String holdername=(String) list.get(j).get("HolderName");
    				Map<String,Object> ma=new HashMap<String,Object>();
	    			if((departmentno.equals(departmentno2)) && (holderno!=null)){
	    				res=true;
	    				ma.put("holderno", holderno);
	    				ma.put("holdername", holdername);
	    				lit.add(ma);
	    			}
	    		}
	    		if(res){
	    			maplist.put("holderlist",lit);
	    		}
	    		litt.add(maplist);
	    	}
			if(litt.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", litt);
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
	
	
	/*queryHolderDataByDepartmentNo*/
	@RequestMapping("/queryHolderDataByDepartmentNo")
	@ResponseBody
	public Map<String,Object>  queryHolderDataByDepartmentNoController(@RequestBody Map m,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m1=new HashMap<String,Object>();
		List<Map<String,Object>> litt=new ArrayList<Map<String,Object>>();
	    try{
	    	String departmentno=(String) m.get("deptno");
	    	String departmentname=(String) m.get("deptname");
	    	m1.put("deptno", m.get("deptno"));
	    	List<Map<String,Object>> list=idhs.getHolderByDeptService(m1);
	    	List<Map<String,Object>> lis=(List<Map<String, Object>>) m.get("arrlist");
	    	//获取已经有的员工的工号
	    	for(int i=0;i<list.size();i++){
	    		String holderno=list.get(i).get("holderno").toString();
	    		String holdername=list.get(i).get("holdername").toString();
	    		boolean res=false;
	    		Map<String,Object> ma=new HashMap<String,Object>();
	    		for(int j=0;j<lis.size();j++){
	    			 String holderno2=(String) lis.get(j).get("holderno");
	    			 if(holderno.equals(holderno2)){
	    				 res=true;
	    			 }
	    		}
	    		if(!res){
	    			ma.put("holderno", holderno);
	    			ma.put("holdername", holdername);
	    			litt.add(ma);
	    		}
	    	}
			if(litt.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", litt);
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
	

	/*List<Map<String,Object>> queryDoorPermSeeListService();//门禁权限查看  权限设置时 以门区为主  保存数据*/
	@RequestMapping("/insertOrUpdateDoorHolderByDoorBatch1")
	@ResponseBody
	public Map<String,Object>  insertOrUpdateDoorHolderByDoorBatchController(@RequestBody List<Map<String,Object>> mlist,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		List<CAP_TimeZoneDoorHolder> liss=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> lis=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> litt=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> lit=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> lits=null;
		try{
			//前端传过来的人员
			for(int i=0;i<mlist.size();i++){
				int doorno=Integer.parseInt((String) mlist.get(0).get("doorno"));
				String doorname=(String) mlist.get(0).get("doorname");
				int channel=Integer.parseInt((String) mlist.get(0).get("doorchannel"));
				int deviceno=Integer.parseInt((String) mlist.get(0).get("controlid"));
				String devicename=(String) mlist.get(0).get("controlname");
				List<Map<String,Object>> holderlist=(List<Map<String, Object>>) mlist.get(i).get("arrlist");
				//当门区对应人员不为空时  
				for(int j=0;j<holderlist.size();j++){
					String holderno=(String) holderlist.get(j).get("holderno");
					String holdername=(String) holderlist.get(j).get("holdername");
					CAP_TimeZoneDoorHolder dh=new CAP_TimeZoneDoorHolder();
					dh.setHolderno(holderno);
					dh.setControlid(deviceno);
					CAP_TimeZoneDoorHolder tz=idhs.queryDoorHolderByHolderAndControlService(dh);
					if(tz!=null && !"".equals(tz)){//员工已存在 执行更新操作
						String doorexit=tz.getDoorexit();
						char[] c=doorexit.toCharArray();
						for(int k=0;k<c.length;k++){
							if(channel==(k+1)){
								c[k]='1';
							}
						}
						String str=String.valueOf(c);
						tz.setDoorexit(str);
						if(channel==1){
							tz.setDoor1status(1);
							tz.setDoor1id(doorno);
						}else if(channel==2){
							tz.setDoor2status(1);
							tz.setDoor2id(doorno);
						}else if(channel==3){
							tz.setDoor3status(1);
							tz.setDoor3id(doorno);
						}else if(channel==4){
							tz.setDoor4status(1);
							tz.setDoor4id(doorno);
						}
						SY210AppSet sy=new SY210AppSet();
						sy.setDeviceno((short) deviceno);
						sy.setEntryreader(str);
						List<SY210AppSet> sylist=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);
						if(sylist.size()>0){//appsetno存在 执行批量修改
							Short appsetno=sylist.get(0).getAppsetno();
							tz.setAppsetno1((int)appsetno);
							liss.add(tz);
						}else{//appsetno不存在 保持不变 不执行
							lis.add(tz);
						}
					}else{//员工不存在   执行批量添加操作
						CAP_TimeZoneDoorHolder dh2=new CAP_TimeZoneDoorHolder();
						String doorexit="0000";
						char[] cc=doorexit.toCharArray();
						for(int k=0;k<cc.length;k++){
							if(channel==(k+1)){
								cc[k]='1';
							}
						}
						if(channel==1){
							dh2.setDoor1status(1);
							dh2.setDoor1id(doorno);
							dh2.setDoor2status(0);
							dh2.setDoor2id(0);
							dh2.setDoor3status(0);
							dh2.setDoor3id(0);
							dh2.setDoor4status(0);
							dh2.setDoor4id(0);
						}else if(channel==2){
							dh2.setDoor2status(1);
							dh2.setDoor2id(doorno);
							dh2.setDoor1status(0);
							dh2.setDoor1id(0);
							dh2.setDoor3status(0);
							dh2.setDoor3id(0);
							dh2.setDoor4status(0);
							dh2.setDoor4id(0);
						}else if(channel==3){
							dh2.setDoor3status(1);
							dh2.setDoor3id(doorno);
							dh2.setDoor1status(0);
							dh2.setDoor1id(0);
							dh2.setDoor2status(0);
							dh2.setDoor2id(0);
							dh2.setDoor4status(0);
							dh2.setDoor4id(0);
						}else if(channel==4){
							dh2.setDoor4status(1);
							dh2.setDoor4id(doorno);
							dh2.setDoor1status(0);
							dh2.setDoor1id(0);
							dh2.setDoor2status(0);
							dh2.setDoor2id(0);
							dh2.setDoor3status(0);
							dh2.setDoor3id(0);
						}
						String str=String.valueOf(cc);
						dh2.setDoorexit(str);
						dh2.setHolderno(holderno);
						dh2.setHoldername(holdername);
						dh2.setControlid(deviceno);
						dh2.setControlname(devicename);
						SY210AppSet sy=new SY210AppSet();
						sy.setDeviceno((short) deviceno);
						sy.setEntryreader(str);
						List<SY210AppSet> sylist=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);
						if(sylist.size()>0){//appsetno存在 执行批量添加
							Short appsetno=sylist.get(0).getAppsetno();
							dh2.setAppsetno1((int)appsetno);
							litt.add(dh2);
						}else{//appsetno不存在 保持不变 不执行
							lit.add(dh2);
						}
					}
				}
			}
			int i1=0;
			int i2=0;
			if(liss.size()>0){//批量更新
				i1=idhs.updateDoorHolderBatchService(liss);
			}
			if(litt.size()>0){//批量添加
				i2=idhs.insertCAPTimeZoneDoorHolderBatchService(litt);
			}
		    if(i1>0 || i2>0){
				map.put("flag", true);
				map.put("reason", "保存成功！");
				map.put("result", liss);
				map.put("data", litt);
			}else{
				map.put("flag", false);
				map.put("reason", "保存失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*List<Map<String,Object>> queryDoorPermSeeListService();//门禁权限查看  权限设置时 以门区为主  保存数据*/
	@RequestMapping("/insertOrUpdateDoorHolderByDoorBatch")
	@ResponseBody
	public Map<String,Object>  insertOrUpdateDoorHolderByDoorBatchController1(@RequestBody List<Map<String,Object>> mlist,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		List<CAP_TimeZoneDoorHolder> liss=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> lis=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> litt=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> lit=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> lits=null;
		List<CAP_TimeZoneDoorHolder> litt1=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<CAP_TimeZoneDoorHolder> lit1=new ArrayList<CAP_TimeZoneDoorHolder>();
		List<String> holders=new ArrayList<String>(); 
		try{
			int controlid=Integer.parseInt((String) mlist.get(0).get("controlid"));
			int doorno=Integer.parseInt((String) mlist.get(0).get("doorno"));
			String doorname=(String) mlist.get(0).get("doorname");
			int channel=Integer.parseInt((String) mlist.get(0).get("doorchannel"));
			int deviceno=Integer.parseInt((String) mlist.get(0).get("controlid"));
			String devicename=(String) mlist.get(0).get("controlname");
			//根据部门查已分配的人 门区权限 
			lits=idhs.queryDoorHolderByControlService(controlid);
			CAP_TimeZoneDoorHolder dh1=new CAP_TimeZoneDoorHolder();
			dh1.setControlid(controlid);
			List<CAP_TimeZoneDoorHolder> list1=null;
			for(int i=0;i<lits.size();i++){
				if(channel==1){
					dh1.setDoor1id(doorno);
					dh1.setDoor1status(1);
				}else if(channel==2){
					dh1.setDoor2id(doorno);
					dh1.setDoor2status(1);
				}else if(channel==2){
					dh1.setDoor3id(doorno);
					dh1.setDoor3status(1);
				}else if(channel==4){
					dh1.setDoor4id(doorno);
					dh1.setDoor4status(1);
				}
				// 后台查询的 对这个门区有权限的
				list1=idhs.queryDoorHolderByControlAndDoorService(dh1);
			}
			for(int j=0;j<list1.size();j++){
				litt1.add(list1.get(j));//查询 数据库原有的人员 对该门区有权限的
			}
			//前端传过来的人员 执行添加或修改操作
			for(int i=0;i<mlist.size();i++){
				List<Map<String,Object>> holderlist=(List<Map<String, Object>>) mlist.get(i).get("arrlist");
				//当门区对应人员不为空时  
				for(int j=0;j<holderlist.size();j++){
					String holderno=(String) holderlist.get(j).get("holderno");
					String holdername=(String) holderlist.get(j).get("holdername");
					holders.add(holderno);//前端传的人
					CAP_TimeZoneDoorHolder dh=new CAP_TimeZoneDoorHolder();
					dh.setHolderno(holderno);
					dh.setControlid(deviceno);
					CAP_TimeZoneDoorHolder tz=idhs.queryDoorHolderByHolderAndControlService(dh);
					if(tz!=null && !"".equals(tz)){//员工已存在 执行更新操作
						String doorexit=tz.getDoorexit();
						char[] c=doorexit.toCharArray();
						for(int k=0;k<c.length;k++){
							if(channel==(k+1)){
								c[k]='1';
							}
						}
						String str=String.valueOf(c);
						tz.setDoorexit(str);
						if(channel==1){
							tz.setDoor1status(1);
							tz.setDoor1id(doorno);
						}else if(channel==2){
							tz.setDoor2status(1);
							tz.setDoor2id(doorno);
						}else if(channel==3){
							tz.setDoor3status(1);
							tz.setDoor3id(doorno);
						}else if(channel==4){
							tz.setDoor4status(1);
							tz.setDoor4id(doorno);
						}
						SY210AppSet sy=new SY210AppSet();
						sy.setDeviceno((short) deviceno);
						sy.setEntryreader(str);
						List<SY210AppSet> sylist=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);
						if(sylist.size()>0){//appsetno存在 执行批量修改
							Short appsetno=sylist.get(0).getAppsetno();
							tz.setAppsetno1((int)appsetno);
							liss.add(tz);
						}else{//appsetno不存在 保持不变 不执行
							lis.add(tz);
						}
					}else{//员工不存在   执行批量添加操作
						CAP_TimeZoneDoorHolder dh2=new CAP_TimeZoneDoorHolder();
						String doorexit="0000";
						char[] cc=doorexit.toCharArray();
						for(int k=0;k<cc.length;k++){
							if(channel==(k+1)){
								cc[k]='1';
							}
						}
						if(channel==1){
							dh2.setDoor1status(1);
							dh2.setDoor1id(doorno);
							dh2.setDoor2status(0);
							dh2.setDoor2id(0);
							dh2.setDoor3status(0);
							dh2.setDoor3id(0);
							dh2.setDoor4status(0);
							dh2.setDoor4id(0);
						}else if(channel==2){
							dh2.setDoor2status(1);
							dh2.setDoor2id(doorno);
							dh2.setDoor1status(0);
							dh2.setDoor1id(0);
							dh2.setDoor3status(0);
							dh2.setDoor3id(0);
							dh2.setDoor4status(0);
							dh2.setDoor4id(0);
						}else if(channel==3){
							dh2.setDoor3status(1);
							dh2.setDoor3id(doorno);
							dh2.setDoor1status(0);
							dh2.setDoor1id(0);
							dh2.setDoor2status(0);
							dh2.setDoor2id(0);
							dh2.setDoor4status(0);
							dh2.setDoor4id(0);
						}else if(channel==4){
							dh2.setDoor4status(1);
							dh2.setDoor4id(doorno);
							dh2.setDoor1status(0);
							dh2.setDoor1id(0);
							dh2.setDoor2status(0);
							dh2.setDoor2id(0);
							dh2.setDoor3status(0);
							dh2.setDoor3id(0);
						}
						String str=String.valueOf(cc);
						dh2.setDoorexit(str);
						dh2.setHolderno(holderno);
						dh2.setHoldername(holdername);
						dh2.setControlid(deviceno);
						dh2.setControlname(devicename);
						SY210AppSet sy=new SY210AppSet();
						sy.setDeviceno((short) deviceno);
						sy.setEntryreader(str);
						List<SY210AppSet> sylist=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);
						if(sylist.size()>0){//appsetno存在 执行批量添加
							Short appsetno=sylist.get(0).getAppsetno();
							dh2.setAppsetno1((int)appsetno);
							litt.add(dh2);
						}else{//appsetno不存在 保持不变 不执行
							lit.add(dh2);
						}
					}
				}
			}
			
			//当执行移除操作时
			for(int i=0;i<litt1.size();i++){
				String holderno1=litt1.get(i).getHolderno();
				boolean res=false;
				for(int j=0;j<holders.size();j++){
					String holderno2=holders.get(j);
					if(holderno1.equals(holderno2)){
						res=true;
					}
				}
				if(!res){
					lit1.add(litt1.get(i));//数据库原有的人 被移除了
				}
			}
			for(int i=0;i<lit1.size();i++){
				CAP_TimeZoneDoorHolder dh2=lit1.get(i);
				int deviceno2=lit1.get(i).getControlid();
				/*int door1id=lit1.get(i).getDoor1id();
				int door2id=lit1.get(i).getDoor2id();
				int door3id=lit1.get(i).getDoor3id();
				int door4id=lit1.get(i).getDoor4id(); 
				int door1status=lit1.get(i).getDoor1status();
				int door2status=lit1.get(i).getDoor2status();
				int door3status=lit1.get(i).getDoor3status();
				int door4status=lit1.get(i).getDoor4status();*/
				String doorexit=lits.get(i).getDoorexit();
				char[] ch=doorexit.toCharArray();
				for(int j=0;j<ch.length;j++){
					if(channel==(j+1)){
						ch[j]='0';
					}
				}
				doorexit=String.valueOf(ch);
				dh2.setDoorexit(doorexit);
				if(channel==1){
					dh2.setDoor1status(0);
					dh2.setDoor1id(0);
				}else if(channel==2){
					dh2.setDoor2status(0);
					dh2.setDoor2id(0);
				}else if(channel==3){
					dh2.setDoor3status(0);
					dh2.setDoor3id(0);
				}else if(channel==4){
					dh2.setDoor4status(0);
					dh2.setDoor4id(0);
				}
				//查询新的AppsetNo
				SY210AppSet sy=new SY210AppSet();
				sy.setDeviceno((short) deviceno2);
				sy.setEntryreader(doorexit);
				List<SY210AppSet> sylist=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);
				if(sylist.size()>0){//appsetno存在 执行批量修改
					Short appsetno=sylist.get(0).getAppsetno();
					dh2.setAppsetno1((int)appsetno);
					liss.add(dh2);
				}else{//appsetno不存在 保持不变 不执行
					lit.add(dh2);
				}
			}
			
			int i1=0;
			int i2=0;
			if(liss.size()>0){//批量更新
				i1=idhs.updateDoorHolderBatchService(liss);
			}
			if(litt.size()>0){//批量添加
				i2=idhs.insertCAPTimeZoneDoorHolderBatchService(litt);
			}
		    if(i1>0 || i2>0){
				map.put("flag", true);
				map.put("reason", "保存成功！");
				map.put("result", liss);
				map.put("data", litt);
			}else{
				map.put("flag", false);
				map.put("reason", "保存失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 门禁权限设置时 给人员分配权限*/
	@RequestMapping("/queryDoorListByHolder")
	@ResponseBody
	public Map<String,Object>  queryDoorListByHolder(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Short> doorlist=new ArrayList<Short>();
	    try{
	    	List<CAP_TimeZoneDoorHolder> list=idhs.queryDoorHolderByHolderService(holderno); 
	    	System.out.println(list.size());
	    	for(int i=0;i<list.size();i++){
	    		int door1id=list.get(i).getDoor1id();
	    		int door2id=list.get(i).getDoor2id();
	    		int door3id=list.get(i).getDoor3id();
	    		int door4id=list.get(i).getDoor4id();
	    		if(door1id>0){
	    			doorlist.add((short) door1id);
	    		}
	    		if(door2id>0){
	    			doorlist.add((short) door2id);
	    		}
	    		if(door3id>0){
	    			doorlist.add((short) door3id);
	    		}
	    		if(door4id>0){
	    			doorlist.add((short) door4id);
	    		}
	    	}
	    	List<DoorUnit> list1=idhs.queryDoorListByHolderService(doorlist);
			if(list1.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list1);
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
