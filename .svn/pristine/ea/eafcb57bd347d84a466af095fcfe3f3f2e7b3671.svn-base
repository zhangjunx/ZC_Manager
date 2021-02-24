package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.KQ_Approver;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.entity.KQ_Theme;

/**
 * @ClassName IKQ_ApproverService
 * @Description 审批人+审批记录的业务层
 * 出差,请假,补打卡,加班,调休的审批人和审批记录
 * @Author csc
 * @Date 2019年10月18日 下午3:38:23
 */
@Service
public interface IKQ_ApproverService {
	
	 /**通过实体类,来查询人员的信息,用于出差,请假等业务,查询选择审批人员*/
	  List<Map<String, Object>> queryHolder(KQ_ShiftSeek seek);
	 
	 /**添加审批记录*/
	  void insertApprover(KQ_Approver approver);
	 
	 /**通过实体类,查询审批记录*/
	  Map<String, Object> queryApprover(KQ_Theme  theme);
	  
	  /**通过实体类,查询审批记录*/
	  Integer queryApproverCount(KQ_Theme  theme);
	  
}
