package com.xr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.xr.entity.WX_VisitorsReasonType;

@Service
public interface IWX_VisitorsReasonTypeService {

	int deleteByPrimaryKeyService(Integer id);

    int insertSelectiveService(WX_VisitorsReasonType record);

    int updateByPrimaryKeySelectiveService(WX_VisitorsReasonType record);

    List<WX_VisitorsReasonType> queryVisitorsReasonTypeListService();//查询来访事由代码
    
    Integer queryMaxIdService();//获取最大id值 +1
}
