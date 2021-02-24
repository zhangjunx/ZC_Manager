package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.XGClass;
import com.xr.entity.XGRecord;
import com.xr.entity.XG_Seek;

/**
 * @ClassName XG_PatrolAnalysisService
 * @Description 巡更分析所用到的业务层
 * @Author csc
 * @Date 2019年11月19日 上午11:29:05
 */
@Service
public interface XG_PatrolAnalysisService {

	/**查询系统中所有线路*/
	 List<Map<String, Object>> queryRouteAndNode();
	
	/**通过线路的编号(routeid),查询每个线路下的所有班次*/
	 XGClass[] queryClass(Integer routeid);
	 
	 /**通过线路编号(routeid),查询每个线路下的所有节点信息*/
	List<Map<String, Object>> queryDoorNo(Integer routeid); 
	
	/**通过巡更分析的实体类来查询,是否刷卡巡更*/
	Map<String, Object> queryIoDataXG(XG_Seek seek);
	
	/**通过巡更分析的实体类来查询,是否已经生成了相对的结果*/
	boolean queryRecord(XG_Seek seek);
	
	/**在巡更分析的时候,生成正常数据时,查询是否已经存在相同数据的正常记录.*/
	boolean  queryCurrentRecord(XG_Seek seek);
	
	/**用于生成巡更数据*/
	void insertXGRecord(XGRecord record);
}
