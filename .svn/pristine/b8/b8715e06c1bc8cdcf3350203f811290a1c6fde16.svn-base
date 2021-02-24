package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.DepartureData;
import com.xr.entity.PageInfo;

@Service
public interface IDepartureDataService {
	    int deleteByPrimaryKeyService(String holderno,String loginholderno);//删除离职资料库信息  管理员或有权限之人
	    int insertSelectiveService(DepartureData record);//员工离职 即当员工表holderdata删除用户时 执行添加操作  管理员或有权限之人
	    List<Map<String,Object>> queryDepartureListService(Map m);//查询离职资料库信息   管理员或有权限之人 List<DepartureData>
	    List<Map<String,Object>> queryDepartureListByPageService(Map m,PageInfo pageinfo);//查询离职资料库信息   管理员或有权限之人 List<DepartureData>
	    Map<String,Object> queryDepartureByHolderNoService(String holderno);// 通过主键查询实体信息 DepartureData
	    DepartureData queryDepartureByIDCodeService(String idcode);// 通过身份证号查询人是否存在
	    DepartureData queryDepartureByHolderService(String holderno);//根据工号查人是否存在 人事添加时先判断是否有人
}
