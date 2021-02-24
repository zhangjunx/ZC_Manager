package com.xr.dao;

import java.util.List;
import java.util.Map;

import com.xr.entity.XGRecord;
/**
 * 巡更实时记录相关操作
 * @author csc
 * 数据处理层
 */
public interface XGRecordDao {

	   /**
		 * 根据不同用户得id
		 * 查询所能管理线路的实时打卡记录
		 * @return
		 */
	 public List<Map<String,Object>> queryXGRecordID(String holderno);
	 
	 /**
	  * 根据参数查询巡更历史记录
	  * @param xgrec
	  * @return
	  */
	 public List<XGRecord> queryPastRecordInfo(XGRecord xgrec);
	 
	 /**
	  * 通过用户的userid
	  * 查询所能管理线路的所有报警的记录
	  */
	 public List<Map<String,Object>> queryCaution(String holderno);
	 /**
	  * 通过报警记录ID
	  * 修改报警记录
	  * @return
	  */
	 public boolean updateCaution(Integer RecordID);
}
