package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.SparePartsData;

/**
 * 备品备件_基本资料
 * @author csc
 *  数据操作层
 */
@Repository
public interface SparePartsDataMapper {
    int deleteByPrimaryKey(String itemcode);//删除数据

    int insert(SparePartsData record);//插入数据

    int insertService(SparePartsData record);

    SparePartsData selectByPrimaryKey(String itemcode);//通过主键查询

    int updateByPrimaryKeySelective(SparePartsData record);//更新数据

    int updateByPrimaryKey(SparePartsData record);
    
    List<Map<String,Object>> getSparepartsList(Map m);//查询备品备件资料列表
    int deleteBatch(List<String> list);//批量删除
    
    /**
     * 通过备品备件的编码查询编码是否存在
     * 用于Excel导入时的验证
     */
    String queryRepeatItemcode(String itemcode);
    /**
     * Excel导入备品备件时的批量添加
     * @param list
     */
    void insertExcelSpareParts(List<Map<String, Object>> list);
    
}