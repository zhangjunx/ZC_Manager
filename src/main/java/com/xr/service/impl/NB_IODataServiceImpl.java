package com.xr.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.NB_IODataDao;
import com.xr.entity.NB_IOData;
import com.xr.service.NB_IODataService;

/**
 * 健康打卡的业务实现层
 * @author csc
 */
@Service
public class NB_IODataServiceImpl implements NB_IODataService {

	/**引入健康打卡的数据操作层*/
	@Autowired
	private NB_IODataDao nbdao;
	
	@Override
	public void insertNBIOData(NB_IOData nbiodata) {
		//* 新增健康打卡
		nbdao.insertNBIOData(nbiodata);
	}//end

	/**
	 * 通过工号查询当天,
	 *最后一次(也就是时间最大的健康记录打卡的温度)
	 */
	@Override
	public NB_IOData queryMaxHealthRecord(String holderno) {
		return nbdao.queryMaxHealthRecord(holderno);
	}//end

}
