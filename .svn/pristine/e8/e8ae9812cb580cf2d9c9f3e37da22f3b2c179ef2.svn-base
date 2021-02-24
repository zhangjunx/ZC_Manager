package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.entity.KQ_Summary;
import com.xr.service.IKQ_MonthDataService;
import com.xr.util.TimeUtil;
import com.xr.util.TypeConversionUtil;

/**
 * 考勤月报的相关处理
 * @ClassName KQ_MonthDataController
 * @Description 交互层
 * @Author csc
 * @Date 2019年8月1日 下午6:42:01
 */
@RestController
@RequestMapping("KQ_MonthData")
public class KQ_MonthDataController {
	
	@Autowired
	private IKQ_MonthDataService imds;//引入考勤月报的业务层
	
	/**
	 * 通过年,月,工号,姓名封装的实体类()* 来查询统计每个人的考勤状况
	 * @param seek
	 */
	@RequestMapping("/querySummary")
	public Map<String, Object> queryStatistics(KQ_ShiftSeek seek){
		//定义一个map像前端返回数据
		Map<String, Object> map = new HashMap<>();
		
		String yearno = seek.getYearno();//获取年
		 String monthno = seek.getMonthno();//获取月
		
		 //通过年月来获取改月有多少天
		  Integer days = TimeUtil.getDayOfMonth(Integer.parseInt(yearno), Integer.parseInt(monthno));

		 List<KQ_Summary> statis= imds.querySummary(seek);
         
		 PageInfo<KQ_Summary> pageInfo=new PageInfo<KQ_Summary>(statis);//分页后的数据
		 
		  String jobno=null;
		  
		  Map<String,Object> sondata= new HashMap<>();
		  
		  List<Map<String, Object>> child= new ArrayList<Map<String,Object>>();
		  List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		 for (int i = 0; i < statis.size(); i++) {
			String holderno =  (String) statis.get(i).getHolderno();
			if(!holderno.equals(jobno)){
				//获取名称
				String holdername = (String) statis.get(i).getHoldername();
				
				String departmentname = (String) statis.get(i).getDepartmentname();
				
				 if(statis!=null)
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
					 child.add(TypeConversionUtil.beanToMap(statis.get(i)));
					 sondata.put("departmentname", departmentname);
					 sondata.put("holdername", holdername);
					 sondata.put("holderno", holderno);
				   }else{
				     child.add(TypeConversionUtil.beanToMap(statis.get(i)));
			    }
			jobno=holderno;
		}
		 if(child.size()!=0)
		 {
			 sondata.put("child",child);
			 data.add(sondata);
		 }
		   if(statis.size()==0 || statis==null){
		    	map.put("flag", false);
				map.put("reason", "暂时没有数据");
		    }else{
		    	map.put("flag", true);
				map.put("reason", "数据查询成功");
				map.put("result", data);
				map.put("days", days);
				map.put("pageInfo", pageInfo);
		    }
		return map;
	}//end
	
	/**
	 * 小程序专用查询用户考勤状态的正常,迟到,旷工,请假,出差等各个情况的详情
	 * @param seek
	 * @return
	 */
	@RequestMapping("/queryMonthData")
	public Map<String, Object> queryMonthData(KQ_ShiftSeek seek,HttpServletResponse resp){
		//定义一个map像前端返回数据
	  Map<String, Object> map = new HashMap<>();
	  //查询每个状况的详情
	 List<Map<String, Object>> monthlist = imds.queryMonthData(seek);
	 
	  if(monthlist.size()==0){
		  map.put("flag", false);
		  map.put("reason", "暂时没有数据");
	  }else{
		    map.put("flag", true);
			map.put("reason", "数据查询成功");
			map.put("result", monthlist);
	  }
	  resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
	  return map;
	}//end
	

}
