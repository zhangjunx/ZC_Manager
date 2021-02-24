package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.KQ_ShiftData;

/**
 * 班次基本信息管理
 * @author csc
 * service(业务层)
 */
@Service
public interface IKQ_ShiftDataService {
	
	/**
	 * 插入方法 同时插入班次和班段
	 */
	void insertShiftAndSenction(Map<String, Object> revice);

    /**
     * 通过登录人的工号
     * 查询班次和班段的基本信息
     */
     List<Map<String, Object>> queryShiftAndSection(String holderno);
    /**
     * 通过班次编号(shiftno)
     * 删除班次
     * @param shiftno
     */
     boolean deleteShiftData(Integer shiftno);
    /**
     * 通过班次编号
     * 查询班次和班段的所有信息
     * @param shiftno
     * @return
     */
     List<Map<String, Object>> queryShiftUnionSection(Integer shiftno);
    /**
     * 通过班次的实体类来修改班次
     * @param shift
     */
     boolean updateShiftData(KQ_ShiftData shift);
     /**
      * 通过班次昵称查询班次编号
      * @param nickname
      */
     Map<String, Object> queryNoShift(String nickname);
}
