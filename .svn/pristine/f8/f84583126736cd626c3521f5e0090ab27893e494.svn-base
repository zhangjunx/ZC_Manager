package com.xr.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.KQ_Daily;
import com.xr.entity.KQ_ShiftSeek;


/**
 * 考勤日报表的相关操作
 * @author csc
 *  业务层
 */
@Service
public interface IKQ_DailyService {


	  /**
	   * 批量添加考勤分析后的结果
	   * @param list
	   */
	  void insertBatchDaily(List<Map<String, Object>> list);
	 /**
	  * 考勤(日报表也可以叫结果表)
	  * (修改方法！-用于考勤分析完毕后将结果修改一下)
	  * @param daily
	  */
	  void updateDaily(KQ_Daily daily);
	 /**
	  * 统计查询
	  * 统计每个人某月的考勤状况
	  */
	  List<Map<String, Object>> queryStatistics(KQ_ShiftSeek seek);
	 /**
      * 根据该工号查询某人某日的考勤结果
      */
      List<Map<String, Object>> queryresult(String holderno,String analyDate);
    
	 //------------------------------------------
     
     /**
      * 用于实时分析
      * 用于查询某个人某天的考勤记录
      */
      HashMap<String, Object> queryOneDaily(KQ_Daily daily);
     /**
      * 用于分析考勤前,把原来的考勤结果首先删除
      * @param seek
      */
      void deleteDaily(KQ_ShiftSeek seek);
	
}
