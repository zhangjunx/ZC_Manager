package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.KQ_MonthData;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.entity.KQ_Summary;

/**
 * 考勤月报表
 * @author csc
 *  业务层
 */
@Service
public interface IKQ_MonthDataService {

	/**
	 * 根据实体类来添加月报
	 * @param mondata
	 */
     void insertMonthData(List<KQ_MonthData> mondata);
	  /**
	   * 通过年,月,工号,姓名封装的实体类
	   * 来查询统计这个每个人的考勤状况
	   * @return
	   */
     List<KQ_Summary> querySummary(KQ_ShiftSeek seek);
	  /**
      * 根据年,月,工号封装的实体类
      * 查询考勤总结果(查询考勤结果表)
      * @param seek
      */
	 List<Map<String, Object>> queryMonthData(KQ_ShiftSeek seek);
    /**
     * 用于分析考勤前,把原来的考勤分析首先删除
     * @param seek
     */
     void deleteMonthData(KQ_ShiftSeek seek);
	 
}
