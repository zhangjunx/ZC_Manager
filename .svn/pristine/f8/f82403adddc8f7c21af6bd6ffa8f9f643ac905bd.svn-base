package com.xr.controller;

import java.text.ParseException;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xr.entity.KQ_ShiftSeek;
import com.xr.service.IKQ_AnalysisService;


/**
 * 考勤分析的控制层
 * @ClassName KQ_AnalysisController
 * @Description 
 * @Author csc
 * @Date 2019年9月16日 上午11:00:51
 */
@RestController
@RequestMapping("analy")
public class KQ_AnalysisController {
	
	 
	@Autowired
	private  IKQ_AnalysisService sis;//引入业务处理层
	
	
	/**
	 * 考勤数据分析 通过前端传过来的人,工号和时间 生成每个人每个班段的状态
	 */
	@RequestMapping("/AttendanceAnalysis")
	public Map<String, Object> AttendanceAnalysis(KQ_ShiftSeek seek) throws ParseException {
		
     	Map<String, Object> resultMap =	sis.AttendanceAnalysis(seek);
	
		return resultMap;
	}// end 此方法结束

	/**
	 * 对于考勤结果表(dbo.KQ_Daily)进行再次分析 对每个人每个班段的考勤记录进行汇总处理,
	 * 挑出考勤人员的每天的代表性考勤状态 (如 班段一 开始 考勤正常 班段一 结束 早退)状态就是早退
	 * @throws ParseException
	 */
	@RequestMapping("/Reanalysis")
	public Map<String, Object> Reanalysis(KQ_ShiftSeek seek) throws ParseException {

		Map<String, Object> resultMap =sis.Reanalysis(seek);
		
		return resultMap;
	}// end 方法
	 
	
}
