package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.KQ_ShiftSection;

/**
 * 班段详细信息
 * @author csc
 * 业务层
 */
@Service
public interface IKQ_ShiftSectionService {

	/**
     * 批量添加
     * 用于添加班次中的班段信息
     * @param shiftSection
     */
     boolean insertShiftSection(List<KQ_ShiftSection> list);
    /**
     * 通过班次编号查询
     * 所属班次中班段表的sectionno
     * @param shiftno
     */
     List<Integer> queryShiftno(Integer shiftno);
    /**
     * 批量删除班段
     * 通过班次编号查询到的班段
     * 序号来进行批量删除
     * @param list
     */
     void deleteShiftSection(List<Integer> list);
}
