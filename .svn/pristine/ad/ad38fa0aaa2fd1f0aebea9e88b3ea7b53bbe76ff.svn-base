package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.KQ_ShiftSectionMapper;
import com.xr.entity.KQ_ShiftSection;
import com.xr.service.IKQ_ShiftSectionService;

/**
 * 班段详细信息
 * @author csc
 * 业务实现层
 */
@Service
public class KQ_ShiftSectionServiceImpl implements IKQ_ShiftSectionService {

	 @Autowired
	 private KQ_ShiftSectionMapper qksm;//引入班段详细信息的数据处理层(Dao)

	 /**
	     * 批量添加
	     * 用于添加班次中的班段信息
	     * @param shiftSection
	     */
	@Override
	public boolean insertShiftSection(List<KQ_ShiftSection> list) {
		return qksm.insertShiftSection(list);
	}
	 /**
     * 通过班次编号查询
     * 所属班次中班段表的sectionno
     * @param shiftno
     */
	@Override
	public List<Integer> queryShiftno(Integer shiftno) {
		return qksm.queryShiftno(shiftno);
	}
	 /**
     * 批量删除班段
     * 通过班次编号查询到的班段
     * 序号来进行批量删除
     * @param list
     */
	@Override
	public void deleteShiftSection(List<Integer> list) {
		qksm.deleteShiftSection(list);
	}

	 
	 
}
