package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.xr.entity.KQ_ArrangeData;
import com.xr.entity.KQ_ShiftData;
import com.xr.entity.KQ_ShiftSeek;

import net.sf.json.JSONObject;

/**
 *  排班管理的相关操作
 * @author csc
 *  (Dao)数据处理层
 */
@Repository
public interface KQ_ArrangeDataMapper {

	/**
	 * 作用:通过部门编号来查询部门下的人员 用于排班时通过部门选择人员
	 */
	List<Map<String, Object>> queryDapartmentStaff(@Param("holderno") String holderno,
			@Param("list") List<JSONObject> list);

	/**
	 * 对于选中的人进行排班时 进行批量查询,查询是否存在排班重复
	 * 
	 * @param list
	 */
	List<Map<String, Object>> queryArrangeData(List<Map<String, Object>> list);

	/**
	 * 对选中人员进行排班 批量添加用于排班
	 * 
	 * @param list
	 */
	void insertArrangeData(List<Map<String, Object>> list);

	/**
	 * 查询班次信息中的(序号,班次名称,班次简称,颜色编号) 用于排班中心
	 * 
	 * @param holderno
	 */
	List<KQ_ShiftData> queryshiftdata(String holderno);

	/**
	 * 班次编号(shiftno) 查询班次是否在使用中
	 */
	List<Map<String, Object>> checkUseArrange(@Param("shiftno") Integer shiftno);

	/**
	 * 查询人员的班次信息 用于人员班次管理
	 * 
	 * @return
	 */
	List<Map<String, Object>> selectArrange(KQ_ShiftSeek seek);

	/**
	 * 查询是否有重复的班次
	 * 
	 * @param arrange
	 */
	List<Integer> selectOneArrange(KQ_ArrangeData arrange);

	/**
	 * 通过排班表实体类修改 用于人员的班次管理
	 * 
	 * @param arrange
	 */
	boolean updateArrange(KQ_ArrangeData arrange);

	/**
	 * 用于页面上显示成缺勤的人点击时是添加
	 * 
	 * @return
	 */
	boolean insertArrange(KQ_ArrangeData arrange);

	/**
	 * 通过(工号,年,月,日)将已经排过班的信息删除. 以便于人再次排班
	 * 
	 * @param seek
	 */
	void delArrange(KQ_ShiftSeek seek);

	/**
	 * 通过区域查询查询门区
	 * 
	 * @return
	 */
	List<Map<String, Object>> getDoorList();

	// 以下是人员常用班次分配和自动排版分析用到的方法
	/**
	   *根据参数查询所被排版人员的工号* 用于分析每人每天所上的班
	 */
	List<Map<String, Object>> selectHolderNo(KQ_ShiftSeek seek);

	/**
	  * 查询人员常用班次 用于班次分配中的查询
	 */
	List<Map<String, Object>> selectDistributionShift(KQ_ShiftSeek seek);

	/**
	    * 批量查询 作用:给员工分配常用班次时,查询该员工是否已经分配相同的常用班次
	 */
	List<Map<String, Object>> queryBatchHolderShift(List<Map<String, Object>> oftenShiftlist);

	/**
	 * 批量添加 作用:给员工分配常用班次
	 */
	void insertDistributionShift(List<Map<String, Object>> oftenShiftlist);
	
	/**
	  *人员常用班次的批量删除 
	 */
	void deleteDistributionShift(List<Map<String, Object>> oftenshiftlist);

	/**
	  * 通过工号查询员工经常上的班次编号 通过查询人员经常使用的班次中的,上班的worktime(工作时间)来排序的
	 */
	List<Map<String, Object>> selectShiftno(String holderno);

	/**
	    * 删除单个人员的常用班次
	 */
	boolean deleteOneShift(@Param("shiftno") Integer shiftno, @Param("holderno") String holderno);
}