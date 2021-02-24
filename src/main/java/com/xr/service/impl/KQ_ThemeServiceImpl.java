package com.xr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.KQ_ThemeMapper;
import com.xr.entity.Applet_AccountData;
import com.xr.entity.KQ_Theme;
import com.xr.service.IKQ_ThemeService;

/**
 * @ClassName KQ_ThemeServiceImpl
 * @Description 主题操作的业务实现层
 * 出差,请假,补打卡,加班,调休融为一体业务层实现层
 * @Author csc
 * @Date 2019年10月18日 下午3:28:45
 */
@Service
public class KQ_ThemeServiceImpl implements IKQ_ThemeService{

	@Autowired
	private KQ_ThemeMapper themedao;//引入主题表的数据操作层

	@Override
	public boolean insertEvection(KQ_Theme theme) {
		// 添加出差申请的方法 
		return themedao.insertEvection(theme);
	}//end

	@Override
	public boolean insertLeave(KQ_Theme theme) {
		// 添加请假申请的方法
		return themedao.insertLeave(theme);
	}//end
	
	@Override
	public boolean insertPunchCard(KQ_Theme theme) {
		//添加补打卡申请的方法
		return themedao.insertPunchCard(theme);
	}
	
	@Override
	public boolean insertWorkOverTime(KQ_Theme theme) {
		// 添加加班申请的方法
		return themedao.insertWorkOverTime(theme);
	}
	
	@Override
	public boolean insertRest(KQ_Theme theme) {
		// 添加调休申请的方法
		return themedao.insertRest(theme);
	}//end
	
	//以上是(出差,请假,调休,补打卡,加班等各种申请)的添加方法
	
	
	@Override
	public Map<String, Object> queryAllApplyFor(KQ_Theme theme) {
		// 通过实体类来查询所有的申请详情
       Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> list = themedao.queryAllApplyFor(theme);
		Integer count = themedao.queryAllApplyForCount(theme);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}//end
	
	@Override
	public Integer queryAllApplyForCount(KQ_Theme theme) {
		// * 查询所有申请的总数用于分页
		return themedao.queryAllApplyForCount(theme);
	}
	
	@Override
	public HashMap<String, Object> queryOneApply(Integer themeno) {
		// 通过主键查询用户的申请详情
		return themedao.queryOneApply(themeno);
	}

	@Override
	public List<Map<String, Object>> queryCheckApply(KQ_Theme theme) {
		// 通过实体类传入的参数来检验申请
		return themedao.queryCheckApply(theme);
	}//end

	@Override
	public boolean updateTheme(KQ_Theme theme) {
		// 通过主键修改用户的申请
		return themedao.updateTheme(theme);
	}//end
	
	/**通过主题的编号来删除记录*/
	@Override
	public boolean delTheme(Integer themeno) {
		return themedao.delTheme(themeno);
	}//end 

	@Override
	public Map<String, Object> queryApprovalMsg(KQ_Theme theme) {
	  Map<String,Object> resultMap = new HashMap<String, Object>();
	   //通过条件查询待我审批的记录
	    List<Map<String, Object>> list = themedao.queryApprovalMsg(theme);
		//查询待我审批的记录,共有多少条信息
		Integer count = themedao.queryApprovalMsgCount(theme);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	@Override
	public Integer queryApprovalMsgCount(KQ_Theme theme) {
		// * 查询待我审批的总数,用于分页
		return themedao.queryApprovalMsgCount(theme);
	}

	/**
	 * 通过参数查询是否有(出差,请假)
	 * 用于考勤分析
	 */
	@Override
	public List<Map<String, Object>> selectAnalTheme(KQ_Theme theme) {
		return themedao.selectAnalTheme(theme);
	}//end


	
	
	
	
	
}
