package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.ProductData;
/**
 * @ClassName ProductDataMapper
 * @Description 成品库基本资料表的数据操作层
 * @Author csc
 * @Date 2019年12月24日 下午8:28:15
 */
@Repository
public interface ProductDataMapper {
    int deleteByPrimaryKey(String itemcode);

    int insert(ProductData record);

    int insertSelective(ProductData record);

    ProductData selectByPrimaryKey(String itemcode);

    int updateByPrimaryKeySelective(ProductData record);

    int updateByPrimaryKey(ProductData record);

	List<Map<String,Object>> getProductList(Map m);// 查询成品信息列表
	
	int deleteBatch(List<String> list);//批量删除
	
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