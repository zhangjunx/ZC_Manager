package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.MaterialData;
import com.xr.entity.Material_SDData;
import com.xr.entity.PageInfo;

@Service
public interface IMaterial_SDDataService {
	int deleteByPrimaryKeyService(Integer datano);//删除数据
    int insertService(Material_SDData record);//插入数据
    Material_SDData selectByPrimaryKeyService(Integer datano);//通过主键查询数据
    Map<String, Object> updateByPrimaryKeySelectiveService(Integer datano,String delreason,String holderno) throws Exception;//更新数据
    List<Map<String,Object>> queryMaterialSDDataListService(Map m);//分页查询原材料列表
    List<Map<String,Object>> queryMaterialSDDataListByPageService(Map m,PageInfo pageinfo);//分页查询原材料列表
    Map<String, Object> insertMaterialSDDataBatchService(List<Material_SDData> list) throws Exception;//批量添加订单以及对应的原材料   批量添加
	List<Material_SDData> queryMaterialSDDataListByItemCodeService(String itemcode);//根据物品条码查询是否有出入库记录
	List<Map<String,Object>> queryMaterialSDStockListByPageService(MaterialData record,PageInfo pageinfo);//分页查询动态库存量
	List<Map<String,Object>>  queryMaterialSDStockByItemCodeAndWareCodeService(Material_SDData record);//根据仓库和条码查库存量
	List<Material_SDData> queryMaterialSDDataListByWareCodeService(Material_SDData record);// 根据仓库或分区  查询是否有出入库记录 删除仓库或分区时先执行查询记录操作
	Map<String, Object> outMaterialSDDataBatchService(List<Material_SDData> list) throws Exception;//原材料出库

}
