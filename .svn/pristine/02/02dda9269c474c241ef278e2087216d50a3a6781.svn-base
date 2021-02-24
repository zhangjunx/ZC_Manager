package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.SparePartsData;
import com.xr.entity.SpareParts_SDData;
@Repository
public interface SpareParts_SDDataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(SpareParts_SDData record);

    int insertSelective(SpareParts_SDData record);

    SpareParts_SDData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(SpareParts_SDData record);

    int updateByPrimaryKey(SpareParts_SDData record);
	 
	
	int insertSparePartsSDDataBatch(List<SpareParts_SDData> list);//备品备件出入库订单以及对应的物品  批量插入

	List<Map<String,Object>> querySparePartsSDDataListByPage(Map m);//分页查询   备品备件列表
	List<SpareParts_SDData> querySparePartsSDDataListByItemCode(String itemcode);//根据备品件条码 查询是否有出入库情况
	
	List<Map<String,Object>> querySparePartsSDStockListByPage(SparePartsData record);//动态查询库存量
	
	List<Map<String,Object>> querySparePartsSDStockByItemCodeAndWareCode(SpareParts_SDData record);//根据仓库和条码查库存量
	List<SpareParts_SDData> querySparePartsSDDataListByWareCode(SpareParts_SDData record);//根据仓库 或分区  查看出入库中是否有记录
}