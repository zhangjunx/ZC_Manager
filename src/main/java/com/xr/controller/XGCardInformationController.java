package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xr.service.XGCardInformationService;

import net.sf.json.JSONObject;


/**
 * 卡片信息管理的相关操作
 * @author csc
 * 控制层
 */
@RestController
@RequestMapping("card")
public class XGCardInformationController {
 
	  @Autowired
	  private XGCardInformationService cservice;//引入卡片信息管理的业务层
	  
	    /**
		 * 查询登录人所能管理的路线信息
		 * 用于新增卡号
		 * @return
		 */
	  @RequestMapping("/queryUserRoute")
	  public Map<String,Object> queryUserRoute(HttpSession session){
		  Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		    //获取用户登录的ID
		  String holderno = (String) session.getAttribute("holderno");
		  List<Map<String, Object>> rlist =  cservice.queryUserRoute(holderno);
		  
		  if(rlist.size()==0 || rlist==null){
			    map.put("flag", false);
				map.put("reason", "该用户没有线路数据");
		  }else{
			    map.put("flag", true);
				map.put("reason", "线路数据查询成功");
				map.put("result", rlist);
		  }
		  return map;
	  }//end
	  
	  /**
	   * 查询卡表中的cardno和cardID，用于给路线绑卡
	   * @param resp
	   * @return
	   */
	  @RequestMapping("/queryCardData")
	  public Map<String, Object> queryCardData(){
		  Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		  
		 List<Map<String, Object>> cardlist = cservice.queryCardData();
		 
		 if(cardlist.size()==0){
			  map.put("flag", false);
			  map.put("reason", "暂时没有卡信息");
		 }else{
			 map.put("flag", true);
			  map.put("reason", "查询成功");
			  map.put("result", cardlist);
		 }
		  return map;
	  }//end
	  
	  /**
	   * 批量添加卡片相关信息
	   * @return
	   */
	  @RequestMapping("/insertCardInfor")
	  public Map<String, Object> insertCardInfor(@RequestBody List<JSONObject> list){
		  Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		   //执行添加方法
	      Integer flay =  cservice.insertCardInfor(list);
	      if(flay!=null){
	    	    map.put("flag", true);
				map.put("reason", "添加成功");
	      }else{
	    	    map.put("flag", false);
				map.put("reason", "添加失败");
	      }
		  return map;
	  }//end
	  
	  
	  /**
	   * 单个删除
	   * 根据卡片主键删除
	   */
	  @RequestMapping("/deleteCardInfor")
	  public Map<String, Object> deleteCardInfor(Integer nid){
		  Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
			 boolean flay = cservice.deleteCardInfor(nid);
			 if(flay){
				  map.put("flag", true);
				  map.put("reason", "删除成功");
			 }else{
				  map.put("flag", false);
				  map.put("reason", "删除失败");
			 }
		  return map;
	  }//end
	  
	  /**
	   * 通过holderno
	   * 查询用户所能管理线路的卡信息
	   */
	  @RequestMapping("/queryCardInfor")
	  public Map<String, Object> queryCardInfor(HttpSession session){
		  Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		  //获取登录用户的ID
		  String holderno = (String) session.getAttribute("holderno");
		  
		    List<Map<String, Object>> cardlist = cservice.queryCardInfor(holderno);
		    
			  Integer jobno=null;
			  
			  Map<String,Object> sondata= new HashMap<>();
			  
			  List<Map<String, Object>> child= new ArrayList<Map<String,Object>>();
			  
			  List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
			 for (int i = 0; i < cardlist.size(); i++) {
				Integer routeid =  (Integer) cardlist.get(i).get("routeid");
				if(!routeid.equals(jobno)){
					//获取名称
					Integer cardno = (Integer) cardlist.get(i).get("cardno");
					
					String routename = (String) cardlist.get(i).get("routename");
					
					Integer placeseveral = (Integer) cardlist.get(i).get("placeseveral");
					
					 if(cardlist!=null)
					 {
						 if(child.size()==0){
							    sondata= new HashMap<>();
								child= new ArrayList<Map<String,Object>>();
						 }else{
							    sondata.put("child",child);
								data.add(sondata);
								sondata= new HashMap<>();
								child= new ArrayList<Map<String,Object>>();}
					}
						 child.add(cardlist.get(i));
						 sondata.put("cardno", cardno);
						sondata.put("routename", routename);
						sondata.put("placeseveral", placeseveral);
					  }else{
					child.add(cardlist.get(i));
				    }
				jobno=routeid;
			}
			 if(child.size()!=0)
			 {
				 sondata.put("child",child);
				 data.add(sondata);
			 }
		    
		   if(cardlist.size()==0 || cardlist==null){
			      map.put("flag", false);
				  map.put("reason", "暂时没有数据");
		   }else{
			      map.put("flag", true);
				  map.put("reason", "查询成功");
				  map.put("result", data);
		   }
		  return map;
	  }//end
	  
	  
	  
	 
}
