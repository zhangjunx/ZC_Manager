package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


import com.xr.entity.KQ_ShiftSection;

/**
 * 班段信息的相关处理
 * @author csc
 * Dao数据处理层
 */
@Repository
public interface KQ_ShiftSectionMapper {
    
	/**
	 * 批量添加 用于添加班次中的班段信息
	 * 
	 * @param shiftSection
	 */
	public boolean insertShiftSection(List<KQ_ShiftSection> list);

	/**
	 * 通过班次编号查询 所属班次中班段表的sectionno
	 * 
	 * @param shiftno
	 */
	public List<Integer> queryShiftno(Integer shiftno);

	/**
	 * 批量删除班段 通过班次编号查询到的班段 序号来进行批量删除
	 * 
	 * @param list
	 */
	public void deleteShiftSection(List<Integer> list);

}