package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.ProductData;

/**
 * @ClassName IProductDataService
 * @Description 成品库基本资料表的业务层
 * @Author csc
 * @Date 2019年12月24日 下午8:31:20
 */
@Service
public interface IProductDataService {
	int deleteByPrimaryKeyService(String productcode);//删除数据
    int insertService(ProductData record);//插入数据
    ProductData selectByPrimaryKeyService(String productcode);//通过主键查询实体类
    int updateByPrimaryKeySelectiveService(ProductData record);//更新数据
    List<Map<String,Object>> getProductListByPageService(Map m,PageInfo pageinfo);//查询成品信息列表
    List<Map<String,Object>> getProductListService(Map m);//查询成品信息列表
    int deleteBatchService(List<String> list);//批量删除
	

	/**
     * 通过成品库的编码,查询编码是否存在
     * 用于Excel导入时的验证
     */
    String queryRepeatItemcode(String itemcode);
    /**
     * Excel导入成品库基本信息时的批量添加
     * @param list
     */
    void insertExcelProduct(List<Map<String, Object>> list);
}
