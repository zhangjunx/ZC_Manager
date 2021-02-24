package com.xr.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.xr.entity.IOData;
import com.xr.entity.PageInfo;
import com.xr.service.IIODataService;

/**
 *  考勤记录的相关操作
 * @author csc
 * 交互层(前后端交互)
 */
@Controller
@RequestMapping("IOData")
public class IODataController {

	 @Autowired
	 private IIODataService iods;//引入考勤记录的业务层
	 /**
	  *分页查询刷卡记录*/
	 
	  /**@RequestMapping("/queryIORecordList")
	 @ResponseBody
	 public Map<String,Object> queryIORecordListController(IOData record, PageInfo pageinfo,String st,String dat,HttpServletRequest request){
		 Map<String,Object> map=new HashMap<String,Object>();
		 List<Map<String,Object>> litt=new ArrayList<Map<String,Object>>();
		 try{
			 Map<String,Object> m=new HashMap<String,Object>();
			 map.put("pageinfo", pageinfo);
			 m.put("doorno", record.getDoorno());
			 m.put("holderno", record.getHolderno());
			 m.put("deptno", record.getDeptno());
			 m.put("begintime", record.getBegintime());
			 m.put("endtime", record.getEndtime());
			 m.put("begindate", record.getBegindate());
			 m.put("enddate", record.getEnddate());
			 m.put("iostatus", record.getIostatus());
			 m.put("iodate", record.getIodate());
			 m.put("dat", dat);//两笔记录被选中
			 m.put("st", st);//有效进出记录被选中
			 if(!dat.equals("")){
				 //
				 
			 }
			 List<Map<String,Object>> list=iods.queryIORecordListByPageService(m,pageinfo);
			 if(list.size()==0 || list==null){
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
			 }else{
				 map.put("flag", true);
				 map.put("reason", "查询成功");
				 map.put("result", list);
				 map.put("pageinfo", pageinfo);
			 }
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
*/	 
	 
	 /**
	  * 分页查询刷卡记录
	  
	  * @return
	  */
	 @RequestMapping("/queryIORecordList")
	 @ResponseBody
	 public Map<String,Object> queryIORecordListController(IOData record, PageInfo pageinfo,String st,String dat,HttpServletRequest request){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			 Map<String,Object> m=new HashMap<String,Object>();
			 map.put("pageinfo", pageinfo);
			 m.put("doorno", record.getDoorno());
			 m.put("holderno", record.getHolderno());
			 m.put("deptno", record.getDeptno());
			 m.put("begintime", record.getBegintime());
			 m.put("endtime", record.getEndtime());
			 m.put("begindate", record.getBegindate());
			 m.put("enddate", record.getEnddate());
			 m.put("iostatus", record.getIostatus());
			 m.put("iodate", record.getIodate());
			 m.put("dat", dat);//两笔记录被选中
			 m.put("st", st);//有效进出记录被选中
			 
			 List<Map<String,Object>> list=iods.queryIORecordListByPageService(m,pageinfo);
			 List<Map<String,Object>> litt=new ArrayList<Map<String,Object>>();
			 if(!dat.equals("")){
				  litt.add(list.get(0));
				  litt.add(list.get(list.size()-1));
				  list=litt;
			 }
			 if(list.size()==0 || list==null){
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
			 }else{
				 map.put("flag", true);
				 map.put("reason", "查询成功");
				 map.put("result", list);
				 map.put("pageinfo", pageinfo);
			 }
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
	 
	 /*根据部门分组 查询部门下人员 再查人员最后进出位置*/
	 @RequestMapping("/queryIOLastAreaList")
	 @ResponseBody
	 public Map<String,Object> queryIOLastAreaListController(HttpServletRequest request,String str){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			 map=iods.queryIOLastAreaListService(request,str);
		 }catch(Exception ex){
			 map.put("flag", false);
			 System.out.println(ex);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
	 /*实时定位时 点击某个人查看其最后位置 信息  Integer datano*/
	 @RequestMapping("/queryIOLastAreaByDataNo")
	 @ResponseBody
	 public Map<String,Object> queryIOLastAreaByDataNoController(Integer datano){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			 IOData iodata=iods.queryIOLastAreaByDataNoService(datano);
			 if(iodata!=null && !"".equals(iodata)){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 map.put("result", iodata);
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
	 
	 /*根据工号查个人进出记录  小程序*/
	 @RequestMapping("/queryIORecordByHolder")
	 @ResponseBody
	 public Map<String,Object> queryIORecordByHolderController(HttpServletRequest request,@RequestBody Map<String,Object> parameter){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{//parameter 中 dd 0表示今天  1表示本周 2表示本月
			Integer pageNo = (Integer) parameter.get("pageNo");//获取当前是第几页
			Integer pageSize = (Integer) parameter.get("pageSize");//获取当前是多少条
			 if(pageNo==null || pageSize == null){
					//分页查询
				    PageHelper.startPage(1,10);
				 }else{
					//分页查询
					PageHelper.startPage(pageNo,pageSize);
				 }
			 List<IOData> iodata=iods.queryIORecordByHolderService(parameter);
			 com.github.pagehelper.PageInfo<IOData> pageInfo=new com.github.pagehelper.PageInfo<IOData>(iodata);
			 if(iodata.size()>0){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 map.put("result", pageInfo);
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
	 
	 /*进出实时监控时 点击刷新清屏后获取的数据 Integer maxdatano*/
	 @RequestMapping("/queryIOCurrRecordListByMaxDataNo")
	 @ResponseBody
	 public Map<String,Object> queryIOCurrRecordListByMaxDataNoController(HttpServletRequest request,HttpSession session){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			 map=iods.queryIOCurrRecordListByMaxDataNoService(request,session);
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
	 /*Integer queryMaxDataNoService();//查询datano最大值*/
	 @RequestMapping("/queryMaxDataNo")
	 @ResponseBody
	 public Map<String,Object> queryMaxDataNoController(HttpServletRequest request,HttpSession session){
		 Map<String,Object> map=new HashMap<String,Object>();
		 try{
			 //获取maxdatano最大值
			 Integer maxdatano=iods.queryMaxDataNoService();
			 if(!"".equals(maxdatano) && maxdatano!=null){
				 map.put("flag", true);
				 map.put("reason", "查询成功!");
				 session.setAttribute("maxdatano", maxdatano);
			 }else{
				 map.put("flag", false);
				 map.put("reason", "暂无数据可查！");
				 session.setAttribute("maxdatano", 0);
			 }  
		 }catch(Exception ex){
			 map.put("flag", false);
			 map.put("reason", "程序异常，请联系管理员！");
		 }
		 return map;
	 }//end
	 
}
