package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.MaterialData;
import com.xr.entity.Material_SDData;
@Repository
public interface Material_SDDataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(Material_SDData record);

    int insertSelective(Material_SDData record);

    Material_SDData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(Material_SDData record);

    int updateByPrimaryKey(Material_SDData record);

	List<Map<String,Object>> queryMaterialSDDataListByPage(Map m);//分页查询原材料列表
	
	int insertMaterialSDDataBatch(List<Material_SDData> list);//批量添加订单以及对应的原材料   批量添加

	List<Material_SDData> queryMaterialSDDataListByItemCode(String itemcode);//根据物品条码查询是否有出入库记录
	List<Map<String,Object>> queryMaterialSDStockListByPage(MaterialData record);//查询动态库存量
	
	List<Map<String,Object>> queryMaterialSDStockByItemCodeAndWareCode(Material_SDData record);//根据仓库和条码查库存量
	List<Material_SDData> queryMaterialSDDataListByWareCode(Material_SDData record);// 根据仓库或分区  查询是否有出入库记录 删除仓库或分区时先执行查询记录操作

}