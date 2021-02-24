package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.ProductData;
import com.xr.entity.ProductStockData;
import com.xr.entity.Product_SDData;

@Service
public interface IProduct_SDDataService {
	int deleteByPrimaryKeyService(Integer datano);//删除数据
    int insertService(Product_SDData record);//添加数据
    Product_SDData selectByPrimaryKeyService(Integer datano);//通过id查询实体类数据
    Map<String, Object> updateByPrimaryKeySelectiveService(Integer datano,String delreason,String holderno) throws Exception;//更新数据
    List<Map<String,Object>> queryProductSDDataListService(Map m);//查询成品出入库订单列表
    List<Map<String,Object>> queryProductSDDataListByPageService(Map m,PageInfo pageinfo);// 查询成品出入库订单列表
    
    Map<String,Object> insertProductSDDataBatchService(List<Product_SDData> list) throws Exception;//成品入库订单以及对应的物品  批量插入
    Map<String,Object> outProductSDDataBatchService(List<Product_SDData> list) throws Exception;//成品出库订单以及对应的物品  批量插入
	List<Product_SDData> queryProductSDDataListByItemCodeService(String itemcode);//根据物品条码查看出入库中是否有记录
	List<Map<String,Object>> queryProductSDStockListByPageService(ProductData record,PageInfo pageinfo);//查询动态库存量
	List<Map<String,Object>> queryProductSDStockByItemCodeAndWareCodeService(ProductStockData record);//根据仓库和条码查库存量
	List<Product_SDData> queryProductSDDataListByWareCodeService(Product_SDData record);// 根据仓库或分区   查看出入库中是否有记录   执行删除仓库或分区时先查询记录是否存在

	List<Map<String,Object>> queryHolderListByDeptnoService(String departmentno);//根据部门查人员
}
