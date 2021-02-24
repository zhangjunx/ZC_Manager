package com.xr.service;

import java.util.List;
import java.util.Map;

import com.xr.entity.XGRecord;


/**
 * 巡更实时记录相关操作
 * @author csc
 * 业务层
 */
public interface XGRecordService {

	
	 /**
	  * 根据参数查询巡更历史记录
	  * @param xgrec
	  */
      List<XGRecord> queryPastRecordInfo(XGRecord xgrec);
	   /**
		 * 根据不同用户得id
		 * 查询实时所能管理线路的记录
		 * @return
		 */
	  List<Map<String,Object>> queryXGRecordID(String holderno);
	 /**
	  * 通过用户的userid
	  * 查询所能管理线路的所有报警的记录
	  */
	  List<Map<String,Object>> queryCaution(String holderno);
	 /**
	  * 通过报警记录ID
	  * 修改报警记录
	  * @return
	  */
	  boolean updateCaution(Integer RecordID);
	
}
