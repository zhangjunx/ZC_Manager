package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.KQ_DailyMapper;
import com.xr.entity.KQ_Daily;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.service.IKQ_DailyService;

/**
 * 考勤日报表
 * @author csc
 * 业务层
 */
@Service
public class KQ_DailyServiceImpl implements IKQ_DailyService{

	 @Autowired
	 private KQ_DailyMapper qdym;//引入考勤日报的数据处理层

	
	//批量添加分析后的考勤结果
	@Override
	public void insertBatchDaily(List<Map<String, Object>> list) {
        qdym.insertBatchDaily(list);
	}
	
	@Override
	public void updateDaily(KQ_Daily daily) {
		//  * 考勤(日报表也可以叫结果表)* (修改方法！-用于考勤分析完毕后将结果修改一下)
		qdym.updateDaily(daily);
	}
	
	 /** 统计查询*/
	@Override
	public List<Map<String, Object>> queryStatistics(KQ_ShiftSeek seek) {
		return qdym.queryStatistics(seek);
	}//end
	
	@Override
	public List<Map<String, Object>> queryresult(String holderno, String analyDate) {
		// 根据该工号查询某人某日的考勤结果
		return qdym.queryresult(holderno, analyDate);
	}//end

	@Override
	public HashMap<String, Object> queryOneDaily(KQ_Daily daily) {
		//   * 用于实时分析* 用于查询某个人某天的考勤记录
		return qdym.queryOneDaily(daily);
	}//end

	@Override
	public void deleteDaily(KQ_ShiftSeek seek) {
		// * 用于分析考勤前,把原来的考勤结果首先删除
	    qdym.deleteDaily(seek);
	}//end

	 
}
