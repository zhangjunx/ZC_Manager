package com.xr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.TitleData;

@Service
public interface ITitleDataService {
	int deleteByPrimaryKeyService(String titleno);//删除数据
    int insertService(TitleData record);//添加数据
    TitleData selectByPrimaryKeyService(String titleno);//通过主键查询实体类
    int updateByPrimaryKeySelectiveService(TitleData record);//更新数据
    List<TitleData> queryTitleDataListByPageService(TitleData record,PageInfo pageinfo);//分页查询职位列表
    List<TitleData> queryTitleDataListService(TitleData record);//查询职位列表
    
    
    int deleteTitleDataBatchService(List<String> list);//批量删除
	int updateTitleDataBatchService(List<String> list);//批量修改
	int updateTitleDataBatchsService(List<TitleData> list);//批量修改 多个数据
}
