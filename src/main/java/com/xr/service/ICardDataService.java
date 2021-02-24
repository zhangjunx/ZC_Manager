package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.CardData;

/**
 * @ClassName ICardDataService
 * @Description  卡表的业务层
 * @Author csc
 * @Date 2019年12月26日 下午2:25:48
 */
@Service
public interface ICardDataService {

	/**
     * 通过工号查询用户的卡内码和卡编号
     * @param holderno
     * 用于小程序开门
     */
    List<Map<String, Object>> querySmallProgram(String holderno);
    
    List<Map<String, Object>> queryCardListService(String holderno);//查询员工拥有的卡
    
    int updateByPrimaryKeySelective(CardData record);//修改
    
    List<Map<String, Object>> getCardTreeService(List<String> list);//根据部门查询人员卡片树

	int insertSelectiveService(CardData record);//新增
	Integer queryCardNoService();//获取卡号 
	Map<String, Object> queryByCardIDService(Map m);//查询卡内码是否重复

	int deleteByPrimaryKeyService(Integer cardno);
	int deleteBatchService(List<Integer> list);//批量删除
	
	 List<Map<String, Object>> getHolderCardTreeService(Map m);//通过部门查该部门下的人员与其拥有的卡的列表树
    
}
