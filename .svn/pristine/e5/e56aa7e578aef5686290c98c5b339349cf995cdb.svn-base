package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.KQ_ApproverMapper;
import com.xr.entity.KQ_Approver;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.entity.KQ_Theme;
import com.xr.service.IKQ_ApproverService;

/**
 * @ClassName KQ_ApproverServiceImpl
 * @Description  业务实现类
 * 出差,请假,补打卡,加班,调休的审批人和审批记录
 * @Author csc
 * @Date 2019年10月18日 下午3:41:37
 */
@Service
public class KQ_ApproverServiceImpl implements IKQ_ApproverService{

	    @Autowired
	    private KQ_ApproverMapper approverDao;//引如审批的数据操作层

		@Override
		public List<Map<String, Object>> queryHolder(KQ_ShiftSeek seek) {
			//**批量添加,给出差,请假,补卡,加班,调休等申请添加审批的人 */
			return approverDao.queryHolder(seek);
		}//end

		@Override
		public void insertApprover(KQ_Approver approver) {
			// 添加审批记录
			 approverDao.insertApprover(approver);
		}

		@Override
		public Map<String, Object> queryApprover(KQ_Theme  theme) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			// 通过工号,查询审批记录
			List<Map<String, Object>> list = approverDao.queryApprover(theme);
			//通过相同参数查询审批记录的总条数
		    Integer count =	approverDao.queryApproverCount(theme);
		    resultMap.put("result", list);
			resultMap.put("count", count);
			return resultMap;
		}

		@Override
		public Integer queryApproverCount(KQ_Theme theme) {
			 /**通过实体类,查询审批记录*/
			return approverDao.queryApproverCount(theme);
		}
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	       
	
	
}
