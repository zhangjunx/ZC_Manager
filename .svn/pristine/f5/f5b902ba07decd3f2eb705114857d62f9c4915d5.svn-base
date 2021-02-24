package com.xr.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.KQ_Analysis;
import com.xr.entity.KQ_ArrangeData;
import com.xr.entity.KQ_ShiftSeek;

/**
 * 考勤逻辑分析
 * @ClassName KQ_AnalysisMapper
 * @Description 业务接口层(Service)
 * @Author csc
 * @Date 2019年9月16日 上午9:45:51
 * 包含考勤分析所需要的所有方法
 */
@Service
public interface IKQ_AnalysisService {
	

	/**
	   * 参数(自定义实体类) 根据参数查询所被排版人员的工号
	 */
	List<Map<String, Object>> selectHolderNo(KQ_ShiftSeek seek);

	/**
	 * 参数(年,月,日,工号) 根据参数查询所被排版人员每天应该上的班次
	 */
	List<Map<String, Object>> selectHolderArrange(KQ_ArrangeData arrange);

	/**
	 * (工号,开始时间,结束时间) 根据参数查询特定时间段是否存在打卡记录.用于判断考勤
	 */
	Map<String, Object> selectIodate(KQ_Analysis asis);
	
	/**
	     * 考勤分析的业务处理
	   * 该方法在 IKQ_AnalysisService对应的Dao(Mapper)层中并不存在
	 */
	Map<String, Object> AttendanceAnalysis(KQ_ShiftSeek seek) throws ParseException;
	/**
	    *   统计分析的业务处理
	 * 该方法在IKQ_AnalysisService 对应的Dao(Mapper)层中并不存在
	 * @throws ParseException 
	 */
	Map<String, Object> Reanalysis(KQ_ShiftSeek seek) throws ParseException;
	
	
	
	

}
