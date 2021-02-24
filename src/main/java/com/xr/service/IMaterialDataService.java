package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.MaterialData;
import com.xr.entity.PageInfo;

/**
 * @ClassName IMaterialDataService
 * @Description 原材料基本信息表的业务层
 * @Author csc
 * @Date 2019年12月24日 下午7:33:27
 */
@Service
public interface IMaterialDataService {
	int deleteByPrimaryKeyService(String itemcode);//删除数据
    int insertService(MaterialData record);//插入数据
    MaterialData selectByPrimaryKeyService(String itemcode);//通过主键查询
    int updateByPrimaryKeySelectiveService(MaterialData record);//更新数据
    List<Map<String,Object>> getMaterialListService(Map m);//查询原材料列表
    List<Map<String,Object>> getMaterialListByPageService(Map m,PageInfo pageinfo);//查询原材料列表
    int deleteBatchService(List<String> list);//批量删除
    
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
