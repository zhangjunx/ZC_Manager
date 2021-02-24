package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.KQ_Analysis;
import com.xr.entity.KQ_ArrangeData;
import com.xr.entity.KQ_ShiftSeek;

/**
 * 考勤逻辑分析
 * @ClassName KQ_AnalysisMapper
 * @Description 数据操作层(Dao)
 * @Author csc
 * @Date 2019年9月16日 上午9:45:51
 * 包含考勤分析所需要的所有方法
 */
@Repository
public interface KQ_AnalysisMapper {
     
	/**
	 * 参数(自定义实体类)
	 * 根据参数查询所被排版人员的工号
	 */
	  List<Map<String, Object>> selectHolderNo(KQ_ShiftSeek seek);
	 
	 /**
	  * 参数(年,月,日,工号)
	  * 根据参数查询所被排版人员每天应该上的班次
	  * 用于考勤分析
	  */
	  List<Map<String, Object>> selectHolderArrange(KQ_ArrangeData arrange);
	 /**
	  * (工号,开始时间,结束时间)
	  * 根据参数查询特定时间段是否存在打卡记录.用于判断考勤
	  */
	  Map<String,Object> selectIodate(KQ_Analysis asis);
	 


}
