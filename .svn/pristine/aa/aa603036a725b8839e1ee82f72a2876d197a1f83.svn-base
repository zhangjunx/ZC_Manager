package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.KQ_ShiftDataMapper;
import com.xr.entity.KQ_ShiftData;
import com.xr.service.IKQ_ShiftDataService;


/**
 * 班次管理
 * @author csc
 *  业务实现层
 */
@Service
public class KQ_ShiftDataServiceImpl implements IKQ_ShiftDataService {

	 @Autowired
	 private KQ_ShiftDataMapper sdm;//引入班次管理数据操作层
	
	 /**
	  * 
	  * 插入方法 同时插入班次和班段
	  */
	@Override
	public void insertShiftAndSenction(Map<String, Object> revice) {
			 sdm.insertShiftAndSenction(revice);
	}

	/**
     * 通过登录人的工号
     * 查询班次和班段的基本信息
     */
	@Override
	public List<Map<String, Object>> queryShiftAndSection(String holderno) {
		return sdm.queryShiftAndSection(holderno);
	}
	 /**
     * 通过班次编号(shiftno)
     * 删除班次
     * @param shiftno
     */
	@Override
	public boolean deleteShiftData(Integer shiftno) {
		return sdm.deleteShiftData(shiftno);
	}
	/**
     * 通过班次编号
     * 查询班次和班段的所有信息
     * @param shiftno
     * @return
     */
	@Override
	public List<Map<String, Object>> queryShiftUnionSection(Integer shiftno) {
		return sdm.queryShiftUnionSection(shiftno);
	}
	/**
     * 通过班次的实体类来修改班次
     * @param shift
     */
	@Override
	public boolean updateShiftData(KQ_ShiftData shift) {
		return sdm.updateShiftData(shift);
	}
	@Override
	public Map<String, Object> queryNoShift(String nickname) {
		//* 通过班次昵称查询班次编号
		return sdm.queryNoShift(nickname);
	}


	
	
	
	 
}
