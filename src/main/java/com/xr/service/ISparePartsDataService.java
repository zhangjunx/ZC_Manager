package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.SparePartsData;

/**
 * @ClassName ISparePartsDataService
 * @Description 备品备件基本资料表的业务层
 * @Author csc
 * @Date 2019年12月24日 下午6:23:26
 */
@Service
public interface ISparePartsDataService {
	int deleteByPrimaryKeyService(String itemcode);//删除数据
    int insertService(SparePartsData record);//插入数据
    SparePartsData selectByPrimaryKeyService(String itemcode);//通过主键查询
    int updateByPrimaryKeySelectiveService(SparePartsData record);//更新数据
    List<Map<String,Object>> getSparepartsListService(Map m);//查询备品备件资料列表
    List<Map<String,Object>> getSparepartsListByPageService(Map m,PageInfo pf);//分页查询   备品备件资料列表
    
    int deleteBatchService(List<String> list);//批量删除
    
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
