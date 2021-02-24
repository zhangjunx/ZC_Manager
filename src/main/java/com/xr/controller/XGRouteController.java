package com.xr.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xr.entity.XGClass;
import com.xr.entity.XGRights;
import com.xr.entity.XGRoute;
import com.xr.service.XGClassService;
import com.xr.service.XGRouteService;
import com.xr.service.XG_PatrolAnalysisService;
import com.xr.util.GetSystemDate;
import com.xr.util.ThreadLocalDate;
import com.xr.util.TimeUtil;

/**
 * 1=巡更线路管理的相关操作
 * 2=用户路线管理
 * @author csc
 * 控制层
 */
@RestController
@RequestMapping("route")
public class XGRouteController {

	 @Autowired XGRouteService rservice;//引入巡更线路管理的业务层
	 
	 @Autowired XGClassService cservice;//引入巡更班次的业务层
	 
	 @Autowired XG_PatrolAnalysisService aservice;//引入巡更分析的业务层
	 
	 
	 XGRights rights =null;
	 
	 /**
	  * 通过巡更线路表实体类
	  * 添加巡更线路
	  * 批量添加
	  * 巡更路线节点
	  */
	 @RequestMapping("/insertRouteAndNode")
	 public Map<String, Object> insertRouteAndNode(@RequestBody Map receive,HttpSession session){
		  Map<String,Object> sout=new HashMap<>();//定义一个map向前端返回数据
		  
		 String holderno = (String) session.getAttribute("holderno");//获取登录人的工号
		  
		  String routename =  (String) receive.get("routename");//获取线路名称
		  Integer placeseveral = (Integer) receive.get("placeseveral");//获取线路中节点的个数
		  
		  List<Map<String, Object>> nodelist = (List<Map<String, Object>>) receive.get("list");//获取节点信息
		  
		  XGRoute xgroute = new XGRoute();//报获取到的值赋给实体类
		  xgroute.setRoutename(routename);
		  xgroute.setPlaceseveral(placeseveral);
		  boolean flaf = rservice.insertRoute(xgroute);//执行添加线路表的方法
		 
		  Integer routeid = xgroute.getRouteid();//获取线路表添加后的数据
		 
		  List<Map<String, Object>> map = new ArrayList<Map<String,Object>>();
		  
		  if(flaf){
			  for (Map<String, Object> Deposit:nodelist)
			  {
				  Deposit.put("routeid", routeid);//在节点数据中添加线路routeid
				  map.add(Deposit);//将需要添加到线路节点表中的完整数据放入一个新的集合
			  }//for循环end
			   rservice.insertRouteNode(map);
			   rights= new XGRights(holderno,routeid);
			   rservice.insertRights(rights);//改用户新增线路后直接把权限赋予给用户
			   sout.put("flag",true);
			   sout.put("reason", "数据添加成功");
		  }else{
			   rservice.deleteRoute(routeid);//执行删除线路表中数据的方法
			   sout.put("flag",false);
			   sout.put("reason", "数据添加失败");
		  }
		 return sout;
	 }//end
	 
	 /**
	  * 用于编辑用户线路
	  * 说是编辑其实就是将原来的线路节点删除.
	  * 再次进行新增
	  * @param receive
	  */
	 @RequestMapping("/updateRouteAndNode")
	 public Map<String, Object> updateRouteAndNode(@RequestBody Map receive){
		 Map<String, Object> map = new HashMap<>();//定义一个Map返回前段
		  Integer routeid =  (Integer) receive.get("routeid");//获取线路的id
		  Integer placeseveral =  Integer.parseInt((String.valueOf(receive.get("placeseveral"))));//获取线路节点的个数
		  
		  XGRoute route = new XGRoute();
		  
		  route.setPlaceseveral(placeseveral);//放入新的节点个数
		  route.setRouteid(routeid);//放入线路编号
		  
		  //查询该线路下的所有节点ID(NodeId)
		  List<Integer> nodelist = rservice.queryRouteNodeID(routeid);
		   //删除该线路下的所有节点
		   boolean flay =  rservice.deleteRouteNode(nodelist);
		    if(flay){//如果删除成功
		    	//获取前台传入成功节点信息
		    	List<Map<String, Object>> insertmap = (List<Map<String, Object>>) receive.get("list");
		    	rservice.updateRoute(route);//先执行修改线路的编号信息
		    	boolean flaytwo = rservice.insertRouteNode(insertmap);
		    	if(flaytwo){
		    		map.put("flag", true);
			    	map.put("reason", "添加成功");
		    	}else{
		    		map.put("flag", false);
			    	map.put("reason", "添加失败");
		    	}
		    	
		    }else{
		    	map.put("flag", false);
		    	map.put("reason", "修改失败!请联系管理员");
		    }
		 return map;
	 }//end
	 
	 /**
	  * 查询线路信息
	  * 通过holderno
	  * 查询登陆用户所能管理的线路和线路节点信息
	  * @return
	  */
	 @RequestMapping("/queryRouteAndNode")
	 public Map<String, Object> queryRouteAndNode(Integer routeid,HttpSession session){
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		 //获取登录人的ID
		 String holderno = (String) session.getAttribute("holderno");
		
		 List<Map<String, Object>> relist = rservice.queryRouteAndNode(holderno,routeid);
		 
		  if(relist.size()==0 || relist==null){
			    map.put("flag", false);
				map.put("reason", "暂时没有数据");
		  }else{
			   map.put("flag", true);
				map.put("reason", "数据查询成功");
				map.put("result", relist);
		  }
		 return map;
	 }//end
	 
	 
	 /**
	  * 删除线路(dbo.XG_Route)
	  * 通过用户删除线路时的线路编号(routeid)进行一系列的并行操作
	  * 删除线路下的所有节点(dbo.XG_RouteNode)
	  * 删除线路下的对应班次(dbo.XG_Class)
	  * 删除线路下对应的权限(dbo.XG_Rights)
	  * @param routeid
	  */
	 @RequestMapping("/deleteRouteNodeAndRoute")
	 public Map<String, Object> deleteRouteNodeAndRoute(Integer routeid,HttpSession session){
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		 
		String holderno = (String) session.getAttribute("holderno");//获取登录人的工号
		 
		 if(routeid.equals(null)){
			 map.put("flag", false);
			 map.put("reason", "参数传入错误");
		 }else{
			  //通过线路的ID查询线路所属的所有节点ID
			  List<Integer> ilist = rservice.queryRouteNodeID(routeid);
			  
			  //删除线路下的节点
			  boolean flay =   rservice.deleteRouteNode(ilist);
			  rservice.deleteRoute(routeid);
			  
			  //查询该线路下的所有班次
			 XGClass [] classarray = aservice.queryClass(routeid);
			 
			 for (int i = 0; i < classarray.length; i++) {
			  Integer classid =	 classarray[i].getClassid();
			  cservice.deleteClassInfor(classid);//删除线路时,删除线路对应的班次
			}
			 rights= new XGRights(holderno, routeid);
			 rservice.deleteRights(rights);//删除线路时,删除对应的权限
			 
			  map.put("flag", true);
			  map.put("reason", "线路和节点删除成功");
		 }
		 return map;
	 }//end
	 
	 
	 //---------------------------
	 /**
	  * 查询所有线路
	  * 用于用户与路线的管理
	  * @return
	  */
	 @RequestMapping("/queryAllRoute")
	 public Map<String, Object> queryAllRoute(){
		 
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		 //查询所有线路数据
		  List<Map<String, Object>> routelist =  rservice.queryAllRoute();
		 
		   if(routelist.size()==0 || routelist==null){
			      map.put("flag", false);
				  map.put("reason", "数据查询失败");
		   }else{
			      map.put("flag", true);
				  map.put("reason", "数据查询成功");
				  map.put("result", routelist);
		   }
		 return map;
	 }//end
	 
	 /**
	  *  根据员工登录的工号查询该公司下面-
	  *  能登陆系统的用户
	  */
	@RequestMapping("/querySignHolder")
	public Map<String, Object> querySignHolder(String holderno){
		
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		
		//根据工号查询该公司能登陆系统的用户
		List<Map<String, Object>> holderlist = rservice.querySignHolder(holderno);
		
		if(holderlist.size()==0){
			map.put("flag", false);
			map.put("reason", "暂时没有用户信息");
		}else{
			map.put("flag", true);
			map.put("reason", "查询成功");
			map.put("result", holderlist);
		}
		return map;
	}//end
	 
	 
	 
	 /**
	  * 通过前端传过来的id
	  * 查询该用户已经管理的线路ID
	  * @param userid
	  */
	 @RequestMapping("/queryRightsRouteID")
	 public Map<String, Object> queryRightsRouteID(String holderno,HttpSession session){

		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		 
		  List<Map<String, Object>> idlist =	 rservice.queryRightsRouteID(holderno);
		     if(idlist.size()==0||idlist==null){
			    map.put("flag", false);
			    map.put("reason", "该用户没有绑定任何线路");
		      }else{
		    	 map.put("flag", true);
				 map.put("reason", "数据查询成功");
				 map.put("result", idlist);
		      }//
		 return map;
	 }//end
	 
	 /**
	  * 批量添加
	  * 给用户配置巡更路线
	  * @param list
	  */
	 @RequestMapping("/insertRights")
	 public Map<String, Object> insertRights(XGRights rights){
		 Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		    boolean flaf =	rservice.insertRights(rights);//执行批量添加
		    if(flaf){
		    	map.put("flag", true);
		    	map.put("reason", "添加成功");
		    }else{
		    	map.put("flag", false);
		    	map.put("reason", "添加失败");
		     }
		    return map;
	 }//end
	 
	 
	 /**
	  * 删除用户所管理的线路
	  * 用于用户线路管理*/
	 @RequestMapping("/deleteRights")
	 public Map<String, Object> deleteRights(XGRights rights){
		 Map<String, Object> map =new HashMap<>();
		 boolean flay = rservice.deleteRights(rights);
		 if(flay){
			 map.put("flag", true);
		     map.put("reason", "删除成功");
		 }else{
			 map.put("flag", true);
		     map.put("reason", "删除失败"); 
		 }
		 return map;
	 }//end
	 
	 /**
	  * 查询线路时间
	  * 用于实时巡更中,页面一刷新完毕就将线路的巡更时间显示上去
	  * @return
	 * @throws ParseException 
	  */
	 @RequestMapping("/queryLineTime")
	 public Map<String, Object> queryLineTime(@RequestParam("id[]")Integer[] id) throws ParseException{
		 Map<String, Object>  map = new HashMap<>();
		 
		 List<Map<String, Object>> fangru = new ArrayList<>();//返回给前段的结果
		 if(id.length==0){
			 map.put("flag", false);
			 map.put("reason", "当前您没有管理的线路");
		 }else{
		 
		 for (int i = 0; i < id.length; i++) {//循环读取线路的ID
			 
		  int routeid =	 id[i];
			//通过线路的id来查询该线路下的所有班次
		  XGClass[] classarray =	 aservice.queryClass(routeid);
				
		  for (XGClass xgclass : classarray) {// 增强型for循环
			
			    /** 班次主键 */
				Integer classid = xgclass.getClassid();

				/** 班次名称 */
				String classname = xgclass.getClassname();

				// 巡更开始时间*/
				String startshift = xgclass.getStartingtimeofshift();

				// 巡更结束时间*/
				String classhift = xgclass.getClosingtimeofshift();

				/**巡更时间段长度(巡更时长)*/
				Integer patrolduration = xgclass.getPatrolduration();

				/**巡更时间间隔*/
				Integer patrolintervallength = xgclass.getPatrolintervallength();
               
			    //获取系统当前时间(线程安全的方式)
			    String hourMinSecond =	GetSystemDate.getTodayByFormat("HH:mm:ss");
				
			 // 判断当前时间是否在-巡更班次的开始时间和结束时间
				boolean flay = TimeUtil.isEffectiveDate(ThreadLocalDate.parse(hourMinSecond),
						ThreadLocalDate.parse(startshift), ThreadLocalDate.parse(classhift));

				if(!flay){//如果当前时间不在线路的巡更班次中直接跳过
					continue;//跳出循环
				}else{//如果当前时间在线路的大班段之中,就对大班段进行分割
					
					// 通过(巡更开始时间~巡更结束时间~巡更时长)来分隔该时间~然后计算出分割后所有巡更时间段的开始时间
					List<String> timelist = TimeUtil.getIntervalTimeList(startshift, classhift,
							(patrolduration + patrolintervallength));
					
					for (int j = 0; j < timelist.size(); j++) {//循环读取小班段的开始时间
						// 小班次的开始时间
						Date startup = ThreadLocalDate.parse(timelist.get(j).toString());
						// 小班次的结束时间
						Date endup = TimeUtil.getAddMINUTE(ThreadLocalDate.parse(timelist.get(j).toString()),
								patrolduration);
						// 判断当前时间在哪一个分隔的小班段时间中
						boolean flat = TimeUtil.isEffectiveDate(ThreadLocalDate.parse(hourMinSecond), startup, endup);
						
						  if(flat){//如果当前在某一个分割后的小班段时间中
							 //将小班段开始时间和当前年月日拼接起来
							String starttime =  TimeUtil.splitDate(GetSystemDate.getTodayByFormat("yyyy-MM-dd"),
									   ThreadLocalDate.formatDate(startup));
							//将小班段结束时间和当前年月日拼接起来
						   String endtime =	TimeUtil.splitDate(GetSystemDate.getTodayByFormat("yyyy-MM-dd"),
									   ThreadLocalDate.formatDate(endup));
						   Map<String, Object> record = new HashMap<>();
						   record.put("routeid", routeid);//线路id
						   record.put("starttime", starttime);//小班次开始时间
						   record.put("endtime", endtime);//小班次结束时间
						   fangru.add(record);//放入外层循环中
							   break;
						  }else{continue;}
						 
					}//end 结束循环所有班次的开始时间
				}//end 结束判断(当前时间是否在班次的开始时间和结束时间之中)
		  }//end 班次增强性for循环
		}// end 循环读取线路的id
		 if(fangru.size()==0){
			 map.put("flag", false);
			 map.put("reason", "当前线路没有要执行的班次");
		 }else{
			 map.put("flag", true);
			 map.put("reason", "查询成功");
			 map.put("result", fangru);
		 }
		}
		 return map;
	 }//end 方法(查询传过来的新路应该巡更的小班段)
	 
	 
}
