package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.XG_PatrolAnalysisDao;
import com.xr.entity.XGClass;
import com.xr.entity.XGRecord;
import com.xr.entity.XG_Seek;
import com.xr.service.XG_PatrolAnalysisService;

/**
 * @ClassName XG_PatrolAnalysisServiceImpl
 * @Description 巡更分析实现层(业务处理层)
 * @Author csc
 * @Date 2019年11月19日 上午11:30:25
 */
@Service
public class XG_PatrolAnalysisServiceImpl implements XG_PatrolAnalysisService {

	@Autowired
	private XG_PatrolAnalysisDao adao;//引入巡更分析
	
	@Override
	public List<Map<String, Object>> queryRouteAndNode() {
		//**查询系统中所有线路
		return adao.queryRouteAndNode();
	}//end

	@Override
	public XGClass[] queryClass(Integer routeid) {
		//通过线路的编号(routeid),查询每个线路下的所有班次，返回一个实体类数组
		return adao.queryClass(routeid);
	}//end 

	@Override
	public List<Map<String, Object>> queryDoorNo(Integer routeid) {
		// 通过线路编号(routeid),查询每个线路下的所有节点信息
		return adao.queryDoorNo(routeid);
	}

	@Override
	public Map<String, Object> queryIoDataXG(XG_Seek seek) {
		// T通过巡更分析的实体类来查询,是否刷卡巡更
		return adao.queryIoDataXG(seek);
	}

	@Override
	public void insertXGRecord(XGRecord record) {
		// 用于生成巡更数据
		adao.insertXGRecord(record);
	}

	@Override
	public boolean queryRecord(XG_Seek seek) {
		// 通过巡更分析的实体类来查询,是否已经生成了相对的结果(用于以前的班次)
		return adao.queryRecord(seek);
	}

	@Override
	public boolean queryCurrentRecord(XG_Seek seek) {
		/**在巡更分析的时候,生成正常数据时,查询是否已经存在相同数据的正常记录.*/
		return adao.queryCurrentRecord(seek);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
