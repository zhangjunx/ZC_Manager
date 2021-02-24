package com.xr.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.entity.DoorPermHolder;
import com.xr.entity.DoorWeekZone;
import com.xr.service.IDoorPermHolderRecordService;
import com.xr.service.IDoorPermHolderService;

@Controller
@RequestMapping("DoorPermHolder")
public class DoorPermHolderController {
	@Autowired
	private IDoorPermHolderService idps;
	@Autowired
	private IDoorPermHolderRecordService idrs;
	
	/*查询*/
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> query(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=0;
			if(i>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", i);
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
	
	
	
	/*批量删除*/
	@RequestMapping("/deleteBatch")
	@ResponseBody
	public Map<String,Object> insert(@RequestBody List<Map<String,Object>> listmap,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> lis=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list1=new ArrayList<Map<String,Object>>();
		List<Object> ids=new ArrayList<Object>();
		try{
			int pointsDataLimit=100;
			for(int i=0;i<listmap.size();i++){
				Map<String,Object> m=new HashMap<String,Object>();
				m.put("holderno", listmap.get(i).get("holderno"));
				String holdername=idps.getNameService(m);
				m.put("doorno", listmap.get(i).get("doorno"));
				m.put("cardid", listmap.get(i).get("cardid"));
				Map<String,Object> lis1=idps.queryExistService(m);
				m.put("holdername", holdername);
				if(lis1!=null){
					ids.add(lis1.get("id"));//已存在了
					Map<String,Object> mlist=(Map<String, Object>) listmap.get(0).get("list"); 
					if(mlist!=null && !"".equals(mlist)){
						m.put("weekzone1", mlist.get("weekzone1"));
						m.put("weekzone2", mlist.get("weekzone2"));
						m.put("weekzone3", mlist.get("weekzone3"));
						m.put("weekzone4", mlist.get("weekzone4"));
						m.put("weekzone5", mlist.get("weekzone5"));
						m.put("weekzone6", mlist.get("weekzone6"));
						m.put("weekzone7", mlist.get("weekzone7"));
					}
					m.put("deviceno", listmap.get(i).get("deviceno"));
					m.put("updatedate", new Date());
					m.put("updateperson", str);
					m.put("status", "0");
					m.put("updatestatus", "D");
					list1.add(m);
					int i1=0;
					if((list1.size()==pointsDataLimit && ids.size()==pointsDataLimit) || i==listmap.size()-1){
						try{
							i1=idps.deleteBatchService(ids);
							if(i1>0){
								i1=idrs.insertRecordBatchService(list1);
							}
							ids.clear();
							list1.clear();
						}catch(Exception e){
							throw new Exception("未知错误，删除失败！");
						}
						if(i1>0){
							map.put("flag", true);
							map.put("reason", "移除成功！");
							map.put("result", list1);
						}else{
							map.put("flag", false);
							map.put("reason", "移除失败！");
							map.put("result", list1);
						}
					}
				}else{//不存在
					lis.add(listmap.get(i));//数据库不存在这条数据
				}
			}
			
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*批量新增*/
	@RequestMapping("/insertBatch")
	@ResponseBody
	public Map<String,Object> insertBatch(@RequestBody List<Map<String,Object>> listmap,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list1=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> lis=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> lis2=new ArrayList<Map<String,Object>>();
		try{
			long starttime=System.currentTimeMillis();
			for(int i=0;i<listmap.size();i++){
				Map<String,Object> m=new HashMap<String,Object>();
				m.put("holderno", listmap.get(i).get("holderno"));
				String holdername=idps.getNameService(m);
				m.put("doorno", listmap.get(i).get("doorno"));
				m.put("cardid", listmap.get(i).get("cardid"));
			    Map<String,Object> lit=idps.queryExistService(m);
			    m.put("holdername", holdername);
				m.put("deviceno", listmap.get(i).get("deviceno"));
				m.put("updatedate", new Date());
				m.put("updateperson", str);//更新人
				Map<String,Object> mlist=(Map<String, Object>) listmap.get(0).get("list");
				if(lit!=null){//已存在了  执行修改操作
					lit.put("weekzone1", mlist.get("weekzone1"));
					lit.put("weekzone2", mlist.get("weekzone2"));
					lit.put("weekzone3", mlist.get("weekzone3"));
					lit.put("weekzone4", mlist.get("weekzone4"));
					lit.put("weekzone5", mlist.get("weekzone5"));
					lit.put("weekzone6", mlist.get("weekzone6"));
					lit.put("weekzone7", mlist.get("weekzone7"));
					lit.put("updatedate", new Date());
					lit.put("updateperson", str);//更新人
					lit.put(lit.get("holdername").toString(), holdername);//人员姓名
					lis.add(lit);//权限表批量修改
					Map<String,Object> m2=new HashMap<String,Object>();
					m2.putAll(lit);
					m2.remove("id");
					m2.put("updatestatus", "U");//操作为添加
					m2.put("status", "0");//状态为未下发
					m2.put("holdername", holdername);//人员姓名
					lis2.add(m2);
					
				}else{//不存在
					m.put("weekzone1", mlist.get("weekzone1"));
					m.put("weekzone2", mlist.get("weekzone2"));
					m.put("weekzone3", mlist.get("weekzone3"));
					m.put("weekzone4", mlist.get("weekzone4"));
					m.put("weekzone5", mlist.get("weekzone5"));
					m.put("weekzone6", mlist.get("weekzone6"));
					m.put("weekzone7", mlist.get("weekzone7"));
					list.add(m);//权限表的添加操作
					Map<String,Object> m3=new HashMap<String,Object>();
					m3.putAll(m);
					m3.put("updatestatus", "A");//操作为添加
					m3.put("status", "0");//状态为未下发
					list1.add(m3);//权限记录表的添加操作
				}
			}
			
			List<Map<String,Object>> litt=new ArrayList<Map<String,Object>>();
			List<Map<String,Object>> litt1=new ArrayList<Map<String,Object>>();
			//批量添加 批量添加
			int i1=0;
			int i2=0;
			int sum=100;
			for(int i=0;i<list.size();i++){
				litt.add(list.get(i));
				litt1.add(list1.get(i));
				if((litt1.size()==sum && litt.size()==sum) || i==list.size()-1){
					try{
						i1=idps.insertBatchService(litt);
						if(i1>0){
							i1=idrs.insertRecordBatchService(litt1);
						}
						litt.clear();
						litt1.clear();
					}catch(Exception e){
						System.out.println(e);
						throw new Exception("批量添加，未知异常！");
					}
				}
			}
			
			
			//批量删除  批量添加
			for(int i=0;i<lis.size();i++){
				litt.add(lis.get(i));
				litt1.add(lis2.get(i));
				if((litt1.size()==sum && litt.size()==sum) || i==lis.size()-1){
					try{
						i2=idps.updateBatchService(litt);
						if(i2>0){
							i2=idrs.insertRecordBatchService(litt1);
						}
						litt.clear();
						litt1.clear();
					}catch(Exception e){
						System.out.println(e);
						throw new Exception("批量删除，未知异常！");
					}
				}
			}
			if(i1>0 || i2>0){
				map.put("flag", true);
				map.put("reason", "保存成功！");
				map.put("result", lis);
			}else{
				map.put("flag", false);
				map.put("reason", "保存失败！");
				map.put("result", lis);
			}
			long endtime=System.currentTimeMillis();
			System.out.println("用时time："+(endtime-starttime));
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*批量新增*/
	@RequestMapping("/insertBatch1")
	@ResponseBody
	public Map<String,Object> insertBatch1(String obj1,String obj2,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		DoorWeekZone zone=JSONObject.parseObject(obj2, DoorWeekZone.class);
		JSONArray arr=JSONArray.parseArray(obj1);
		try{
			long starttime=System.currentTimeMillis();
			for(int i=0;i<arr.size();i++){
				Map<String,Object> m=new HashMap<String,Object>();
				JSONObject obj=arr.getJSONObject(i);
				String holderno=obj.getString("holderno");
				Integer doorno=obj.getInteger("doorno");
				String cardid=obj.getString("cardid");
				Integer deviceno=obj.getInteger("deviceno");
				m.put("holderno", holderno);
				m.put("doorno", doorno);
				if(cardid!=null && !"".equals(cardid)){
					//如果卡号不为空
					m.put("cardid", cardid);
					
				}else{
					//如果卡号为空
				}
				
			}
			int i=0;
			if(i>0){
				map.put("flag", true);
				map.put("reason", "保存成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "保存失败！");
				map.put("result", list);
			}
			long endtime=System.currentTimeMillis();
			System.out.println("用时time："+(endtime-starttime));
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	
	/*获取区域设备门区树*/
	@RequestMapping("/getAreaDeviceDoorTree")
	@ResponseBody
	public Map<String,Object> getAreaDeviceDoorTree(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=idps.getAreaDeviceDoorTreeService();
			if(list.size()>0){
				map.put("flag", true);
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
	
	/*通过门区查人*/
	@RequestMapping("/queryHolderByDoor")
	@ResponseBody
	public Map<String,Object> queryHolderByDoor(Integer doorno){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> list1=new ArrayList<Map<String,Object>>();
		try{
			Map<String,Object> ma=new HashMap<String,Object>();
			ma.put("doorno", doorno);
			List<Map<String,Object>> list=idps.queryHolderByDoorService(ma);
			//将查出来的信息按部门分类
			for(int i=0;i<list.size();i++){
				boolean res=false;
				for(int j=i+1;j<list.size();j++){
					if(list.get(j).get("departmentno").equals(list.get(i).get("departmentno"))){
						res=true;
					}
				}
				if(!res){
					list1.add(list.get(i));
				} 
			}
			List<Map<String,Object>> list3=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list1.size();i++){
				Map<String,Object> m=new HashMap<String,Object>();
				String deptno=list1.get(i).get("departmentno").toString();
				String deptname=list1.get(i).get("departmentname").toString();
				m.put("deptno", deptno);
				m.put("deptname", deptname);
				List<Map<String,Object>> list2=new ArrayList<Map<String,Object>>();
				for(int j=0;j<list.size();j++){
					if(list.get(j).get("departmentno").equals(list1.get(i).get("departmentno"))){
						list2.add(list.get(j));
						m.put("arrlist", list2);
					}
				}
				list3.add(m);
			}
			
			if(list3.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list3);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据工号和卡号 （如果有卡的话）  查询员工的已有门区权限*/
	@RequestMapping("/queryExistDoor")
	@ResponseBody
	public Map<String,Object> queryExistDoor(String holderno,String cardid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			m.put("cardid", cardid);
			List<Map<String,Object>> list=idps.queryExistDoorService(m);
			if(list.size()>0){
				map.put("flag", true);
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

	/*根据登录人工号查所拥有的门区权限*/
	@RequestMapping("/queryDoorListByHolder")
	@ResponseBody
	public Map<String,Object> queryDoorListByHolder(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			List<Map<String,Object>> list=idps.queryDoorListByHolderService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据登录人工号查所拥有的门区权限 按区域分类  树形结构*/
	@RequestMapping("/getDoorTreeByHolder")
	@ResponseBody
	public Map<String,Object> getDoorTreeByHolder(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			List<Map<String,Object>> list=idps.getDoorTreeByHolderService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据工号 查人作用于该门区的卡*/
	@RequestMapping("/queryCardByHolder")
	@ResponseBody
	public Map<String,Object> queryCardByHolder(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			List<Map<String,Object>> list=idps.queryCardByHolderService(m);
			if(list.size()>0){
				map.put("flag", true);
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
	
	
	/*根据登录人角色查所拥有的门区区域*/
	@RequestMapping("/getDoorAreaByWechat")
	@ResponseBody
	public Map<String,Object> getDoorAreaByWechat(String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			List<Map<String,Object>> list=idps.getDoorAreaByWechatService(m);
			if(list.size()>0){
				map.put("flag", true);
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
	
	/*根据登录人角色查所拥有的门区*/
	@RequestMapping("/getDoorByWechat")
	@ResponseBody
	public Map<String,Object> getDoorByWechat(String holderno,String areaid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			m.put("areaid", areaid);
			List<Map<String,Object>> list=idps.getDoorByWechatService(m);
			if(list.size()>0){
				map.put("flag", true);
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
	
	/*批量删除*/
	@RequestMapping("/deleteSee")
	@ResponseBody
	public Map<String,Object> deleteSee(String holderno,String doorno,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Object> ids=new ArrayList<Object>();
		List<Map<String,Object>> list2=new ArrayList<Map<String,Object>>();
		try{
			m.put("doorno", doorno);
			m.put("holderno", holderno);
			List<Map<String, Object>> list=idps.getByHolderDoorService(m);//根据工号和门区 查记录id  门禁查看时 双击 移除人员
			for(int i=0;i<list.size();i++){
				ids.add(list.get(i).get("id"));
				Map<String,Object> m2=new HashMap<String,Object>();
				m2=list.get(i);
				m2.remove("id");
				m2.put("updatedate", new Date());
				m2.put("updateperson", str);
				m2.put("updatestatus","D");
				m2.put("status", "0");
				list2.add(m2);
			}
			int i=0;
			try{
				i=idps.deleteBatchService(ids);
				if(i>0){
					i=idrs.insertRecordBatchService(list2);
				}
			}catch(Exception e){
				throw new Exception("空指针移除！");
			} 
			if(i>0){
				map.put("flag", true);
				map.put("reason", "移除成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "移除失败！");
				map.put("result", list);
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
}
