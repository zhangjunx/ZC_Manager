package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.MaterialData;

/**
 * @ClassName MaterialDataMapper
 * @Description  原材料基本信息的数据操作层
 * @Author csc
 * @Date 2019年12月24日 下午7:19:37
 */
@Repository
public interface MaterialDataMapper {
    int deleteByPrimaryKey(String itemcode);//删除数据

    int insert(MaterialData record);//插入数据

    int insertSelective(MaterialData record);

    MaterialData selectByPrimaryKey(String itemcode);//通过主键查询

    int updateByPrimaryKeySelective(MaterialData record);//更新数据

    int updateByPrimaryKey(MaterialData record);
    List<Map<String,Object>> getMaterialList(Map m);//查询原材料列表
    int deleteBatch(List<String> list);//批量删除
    
    /**
     * 通过原材料的编码查询编码是否存在
     * 用于Excel导入时的验证
     */
    String queryRepeatItemcode(String itemcode);
    /**
     * Excel导入原材料基本信息时的批量添加
     * @param list
     */
    void insertExcelMaterial(List<Map<String, Object>> list);
}