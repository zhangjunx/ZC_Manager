package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ProductData;
import com.xr.entity.ProductStockData;
import com.xr.entity.Product_SDData;
@Repository
public interface Product_SDDataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(Product_SDData record);

    int insertSelective(Product_SDData record);

    Product_SDData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(Product_SDData record);

    int updateByPrimaryKey(Product_SDData record);

    List<Map<String,Object>> queryProductSDDataListByPage(Map m);// 分页查询  成品出入库订单列表
	
	int insertProductSDDataBatch(List<Product_SDData> list);//成品出入库订单以及对应的物品  批量插入

	List<Product_SDData> queryProductSDDataListByItemCode(String itemcode);//根据物品条码查看出入库中是否有记录
	
	List<Map<String,Object>> queryProductSDStockListByPage(ProductData record);//查询动态库存量
	List<Map<String,Object>> queryProductSDStockByItemCodeAndWareCode(ProductStockData record);//根据仓库和条码查库存量
	List<Product_SDData> queryProductSDDataListByWareCode(Product_SDData record);// 根据仓库或分区   查看出入库中是否有记录   执行删除仓库或分区时先查询记录是否存在

	List<Map<String,Object>> queryHolderListByDeptno(String departmentno);//根据部门查人员
}