package com.xr.dao;

import java.util.Map;

import com.xr.entity.NB_IOData;

/**
 * 内部健康打卡的数据操作层
 * @author csc
 *
 */
public interface NB_IODataDao {

	 /**
	  * 新增健康打卡
	  */
	 void insertNBIOData(NB_IOData nbiodata);
	 /**
	  * 通过工号查询当天,
	  * 最后一次(也就是时间最大的健康记录打卡的温度)
	  */
	 NB_IOData queryMaxHealthRecord(String holderno);
}
