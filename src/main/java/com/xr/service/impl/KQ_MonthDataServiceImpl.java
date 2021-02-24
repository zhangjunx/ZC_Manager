package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.KQ_MonthDataMapper;
import com.xr.entity.KQ_MonthData;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.entity.KQ_Summary;
import com.xr.service.IKQ_MonthDataService;
/**
 * @ClassName KQ_MonthDataServiceImpl
 * @Description 考勤月报表的业务处理层
 * @Author csc
 * @Date 2019年9月24日 上午10:27:25
 */
@Service
public class KQ_MonthDataServiceImpl implements IKQ_MonthDataService {

	@Autowired
	private KQ_MonthDataMapper imdm;//引入考勤月报的数据处理层

	@Override
	public void insertMonthData(List<KQ_MonthData> mondata) {
		//根据实体类来添加月报
		imdm.insertMonthData(mondata);
	}//end

	@Override
	public List<KQ_Summary> querySummary(KQ_ShiftSeek seek) {
		//* 通过年,月,工号,姓名封装的实体类* 来查询统计这个每个人的考勤状况
		return imdm.querySummary(seek);
	}//end

	@Override
	public List<Map<String, Object>> queryMonthData(KQ_ShiftSeek seek) {
		// * 根据年,月,工号封装的实体类
		return imdm.queryMonthData(seek);
	}//end

	@Override
	public void deleteMonthData(KQ_ShiftSeek seek) {
		// * 用于分析考勤前,把原来的考勤分析首先删除
		imdm.deleteMonthData(seek);
	}
	
}
