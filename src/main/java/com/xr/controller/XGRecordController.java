package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xr.entity.XGRecord;
import com.xr.service.XGRecordService;


/**
 * 巡更实时记录相关操作
 * @author csc
 * 控制层
 */
@RestController
@RequestMapping("record")
public class XGRecordController {
 
	 @Autowired
	 private XGRecordService rservice;//引入巡更实时记录的业务层
	 
	 
	 /**
	  * 根据不同用户得id
	  * 查询所能管理线路的刷卡记录
	  */
	 @RequestMapping("/queryXGRecord")
	 public Map<String, Object> queryXGRecord(HttpSession session){
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		 //获取登录人的id
		 String holderno =  (String) session.getAttribute("holderno");
		 //执行查询实时巡更记录的方法
		 List<Map<String, Object>> relist = rservice.queryXGRecordID(holderno);
		 
		 Integer routeid=null;
		  Map<String,Object> sondata= new HashMap<>();
		  List<Map<String, Object>> child= new ArrayList<Map<String,Object>>();
		  List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		 for (int i = 0; i < relist.size(); i++) {
			Integer routid =  (Integer) relist.get(i).get("routeid");
			if(!routid.equals(routeid)){
				//获取名称
				 if(routeid!=null)
				 {
					sondata.put("child",child);
					data.add(sondata);
					sondata= new HashMap<>();
					child= new ArrayList<Map<String,Object>>();
					//child.clear();
				 }
				 child.add(relist.get(i));
				 sondata.put("routeid", routid);
			}else{
				child.add(relist.get(i));
			}
			routeid=routid;
		}
		 if(child.size()!=0)
		 {
			 sondata.put("child",child);
			 data.add(sondata);
		 }
		 
		  if(relist.size()==0 || relist==null){
			    map.put("flag", false);
				map.put("reason", "暂时没有数据");
		  }else{
			   map.put("flag", true);
				map.put("reason", "数据查询成功");
				map.put("result", data);
		  }
		 return map;
	 }//end
	 
	 /**
	  * 根据不同用户所能管理的线路
	  * 查询以往的巡更记录
	  * @return
	  */
	 @RequestMapping("/pastrecord")
	 public Map<String, Object> queryPastRecord(XGRecord record,HttpSession session){
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		 
		 Integer pageNo = record.getPageNo();//获取当前页数
		 Integer pageSize = record.getPageSize();//获取每页显示多少条.
		 
		 if(pageNo==null || pageSize == null){
			//分页查询
		    PageHelper.startPage(1,1);
		 }else{
			//分页查询
			PageHelper.startPage(pageNo,pageSize);
		 }
		 //执行方法(查询所能管理的线路中以往的那些巡更记录)
		 List<XGRecord> pastlist = rservice.queryPastRecordInfo(record);
		 PageInfo<XGRecord> pageInfo=new PageInfo<XGRecord>(pastlist);
		 if(pastlist.size()==0 || pastlist==null){
				map.put("flag", false);
				map.put("reason", "暂时没有数据");
		 }else{
			    map.put("flag", true);
				map.put("reason", "查询成功");
				map.put("result", pageInfo);
		 }
		 return map;
	 }//end
	 
	 /**
	  * 查询所有报警的记录
	  * @param resp
	  * @return
	  */
	 @RequestMapping("/queryCaution")
	 public Map<String, Object> queryCaution(HttpSession session){
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		 
		 //获取用户登录的ID
		String holderno = (String) session.getAttribute("holderno");
		if(holderno==null){
			map.put("flag", false);
			map.put("reason", "实施巡更时请登录");
		}else{
		 
		List<Map<String, Object>> calist =  rservice.queryCaution(holderno);
		if(calist.size()==0 || calist==null){
			map.put("flag", false);
			map.put("reason", "暂时没有数据");
		}else{
			map.put("flag", true);
			map.put("reason", "查询成功");
			map.put("result", calist);
		}
		
	}
		 return map;
	 }//end
	 
	 /**
	  *通过报警记录ID
	  * 修改报警记录
	  * @param resp
	  */
	 @RequestMapping("/updateCaution")
	 public Map<String, Object> updateCaution(Integer RecordID){
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		 
		   if(RecordID==null){
			   map.put("flag", false);
			   map.put("reason", "记录ID不可为空");
		   }else{
			 boolean flay =  rservice.updateCaution(RecordID);
			 if(flay){
				 map.put("flag", true);
				 map.put("reason", "解除报警成功!修改成功");
			 }else{
				 map.put("flag", false);
				 map.put("reason", "解除报警失败");
			 }
		   }
		 return map;
	 }//end
	 
}
