package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.DoorPermHolderRecord;
@Repository
public interface DoorPermHolderRecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DoorPermHolderRecord record);

    int insertSelective(DoorPermHolderRecord record);

    DoorPermHolderRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DoorPermHolderRecord record);

    int updateByPrimaryKey(DoorPermHolderRecord record);
    
    int insertRecordBatch(List<Map<String,Object>> list);//批量添加
	int deleteRecordBatch(List<Integer> list);//批量删除
	
	Integer getByDoor(Integer doorno);//根据门区查设备编号
	
	List<Map<String,Object>> queryPermRecordList(Map m);
	/**
	 * 查询当天下发的添加和删除的记录.
	 * 与SenseLink进行对接.员工组中的人员下发
	 * @return
	 */
	List<Map<String, Object>> getPermRecord();
	/**
	 * 批量修改
	 * 通过DoorPermHolderRecord表的ID主键来进行修改
	 */
	void updatePremRecordStatus(List<String> list);
}