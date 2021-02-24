package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.XGRecordDao;
import com.xr.entity.XGRecord;
import com.xr.service.XGRecordService;


/**
 * 巡更实时记录相关操作
 * @author csc
 *  业务实现层
 */
@Service
public class XGRecordServiceImpl implements XGRecordService{

	    @Autowired
	    private XGRecordDao rdao;//引入巡更实时记录的数据处理层Dao
	    
		
          /**
           * 王老师
           */
		@Override
		public List<Map<String, Object>> queryXGRecordID(String holderno) {
			return rdao.queryXGRecordID(holderno);
		}

		 /**
		 * 根据不同用户得id
		 * 查询所能管理线路的记录
		 */
		@Override
		public List<XGRecord> queryPastRecordInfo(XGRecord xgrec) {
			return rdao.queryPastRecordInfo(xgrec);
		}
		 /**
		  * 通过用户的userid
		  * 查询所能管理线路的所有报警的记录
		  */
		@Override
		public List<Map<String, Object>> queryCaution(String holderno) {
			return rdao.queryCaution(holderno);
		}
		/**
		  * 通过报警记录ID
		  * 修改报警记录
		  * @return
		  */
		@Override
		public boolean updateCaution(Integer RecordID) {
			return rdao.updateCaution(RecordID);
		}
	    
	    
	 
}
