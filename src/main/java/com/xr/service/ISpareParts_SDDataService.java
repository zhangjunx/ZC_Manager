package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.SparePartsData;
import com.xr.entity.SpareParts_SDData;

@Service
public interface ISpareParts_SDDataService {
	int deleteByPrimaryKeyService(Integer datano);//删除数据
    int insertService(SpareParts_SDData record);//添加数据
    SpareParts_SDData selectByPrimaryKeyService(Integer datano);//通过主键查询数据
    Map<String,Object> updateByPrimaryKeySelectiveService(Integer datano,String delreason,String holderno) throws Exception;//更新数据
    Map<String, Object> insertSparePartsSDDataBatchService(List<SpareParts_SDData> list) throws Exception;//备品备件入库订单以及对应的物品  批量插入
    Map<String, Object> outSparePartsSDDataBatchService(List<SpareParts_SDData> list) throws Exception;//出库

    
    List<SpareParts_SDData> querySparePartsSDDataListByItemCodeService(String itemcode);//根据备品件条码 查询是否有出入库情况
  
    List<Map<String,Object>> querySparePartsSDDataListService(Map m);//条件查询   备品备件出入库订单列表
    List<Map<String,Object>> querySparePartsSDDataListByPageService(Map m,PageInfo pageinfo);//根据角色下的部门 查仓库 再查仓库下的备品备件列表
    List<Map<String,Object>> querySparePartsSDStockListByPageService(SparePartsData record,PageInfo pageinfo);//动态查询库存量
    
    List<Map<String,Object>> querySparePartsSDStockByItemCodeAndWareCodeService(SpareParts_SDData record);//根据仓库和条码查库存量
	List<SpareParts_SDData> querySparePartsSDDataListByWareCodeService(SpareParts_SDData record);//根据仓库 或分区  查看出入库中是否有记录
	
}
