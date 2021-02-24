package com.xr.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xr.entity.TitleData;
@Repository
public interface TitleDataMapper {
    int deleteByPrimaryKey(String titleno);//删除数据

    int insert(TitleData record);//添加数据

    int insertSelective(TitleData record);

    TitleData selectByPrimaryKey(String titleno);//通过主键查询实体类

    int updateByPrimaryKeySelective(TitleData record);//更新数据

    int updateByPrimaryKey(TitleData record);
    List<TitleData> queryTitleDataListByPage(TitleData record);//分页查询职位列表
    
    int deleteTitleDataBatch(List<String> list);//批量删除

	int updateTitleDataBatch(List<String> list);//批量修改
	int updateTitleDataBatchs(List<TitleData> list);//批量修改 多个数据
	
}