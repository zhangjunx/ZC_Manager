package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xr.entity.KQ_ShiftSeek;
import com.xr.service.IKQ_AnalysisService;
import com.xr.service.IKQ_DailyService;
import com.xr.service.IKQ_MonthDataService;

/**
 *  考勤日报的相关操作
 * @author csc
 *  交互层
 */
@RestController
@RequestMapping("daily")
public class KQ_DailyController {

	 @Autowired
	 private IKQ_DailyService dys;//引入考勤日报的业务层
	 
	 @Autowired
	 private IKQ_AnalysisService sis;//引入考勤分析的业务层
	 
	 @Autowired
	 private IKQ_MonthDataService imds;//引入考勤月报的业务层
	 
	 /**
	  * 统计查询统计每个人每月的考勤状况
	  */
	 @RequestMapping("/queryStatistics")
	 public Map<String, Object> queryStatistics(KQ_ShiftSeek seek){
			Map<String, Object> map = new HashMap<>();//定义一个Map返回给前端
			
			//查询考勤结果表中的信息(用到了STUFF)
			List<Map<String, Object>> statis= dys.queryStatistics(seek);
		
			if(statis.size()==0){
				map.put("flag", false);
			    map.put("reason", "暂时没有数据!");
			}else{
				//查询对考勤结果表进行二次分析后的MonthData表
				List<Map<String, Object>> monthlist = imds.queryMonthData(seek);
				 
				 if(monthlist.size()==0){
						map.put("flag", false);
					    map.put("reason", "最终考勤结果还未进行分析!请耐心等待");
				 }else{
					    map.put("flag", true);
					    map.put("reason", "数据查询成功");
					    map.put("result", statis);
					    map.put("monthlist", monthlist);
				 }
			}
			return map;
	 }//end
	 
	 
}
