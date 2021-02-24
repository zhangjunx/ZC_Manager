package com.xr.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.KQ_Theme;

/**
 * @ClassName IKQ_ThemeService
 * @Description 业务层
 * 出差,请假,补打卡,加班,调休申请
 * @Author csc
 * @Date 2019年10月18日 下午3:26:43
 */
@Service
public interface IKQ_ThemeService {

	/**通过主题表,添加出差，添加成功后返回(主键的值)*/
	 boolean insertEvection(KQ_Theme theme);
	
	/**通过主题表,添加请假,添加成功后返回(主键的值)*/
	 boolean insertLeave(KQ_Theme theme);
	
	/**通过主题表,添加补打卡*/
	 boolean insertPunchCard(KQ_Theme theme);
	
	/**通过主题表,添加加班申请*/
	 boolean insertWorkOverTime(KQ_Theme theme);
	
	/**通过主题表,添加调休申请*/
	 boolean insertRest(KQ_Theme theme);
	
	//以上是(出差,请假,调休,补打卡,加班等各种申请)的添加方法
	
	/**通过实体类来查询所有的申请详情*/
	 Map<String, Object> queryAllApplyFor(KQ_Theme theme);
	 /**
	  * 查询所有申请的总数用于分页
	  */
	 Integer queryAllApplyForCount(KQ_Theme theme);
	
	/**通过主键查询用户的申请详情*/
	 HashMap<String, Object> queryOneApply(Integer themeno);
	
	/**通过实体类传入的参数来检验申请*/
	 List<Map<String, Object>> queryCheckApply(KQ_Theme theme);
	
	/**通过主键修改用户的申请*/
	 boolean updateTheme(KQ_Theme theme);
	
	/**通过主题的编号来删除记录*/
	 boolean delTheme(Integer themeno);
	/**
	 * 通过前段传入的工号
	 * 查询用户的审批信息
	 */
	 Map<String, Object> queryApprovalMsg(KQ_Theme theme);
	 /**
	  * 查询待我审批的总数,用于分页
	  */
	Integer queryApprovalMsgCount(KQ_Theme theme);
	 
	/**
	 * 通过参数查询是否有(出差,请假)
	 * 用于考勤分析
	 */
	List<Map<String, Object>> selectAnalTheme(KQ_Theme theme);
	
}
