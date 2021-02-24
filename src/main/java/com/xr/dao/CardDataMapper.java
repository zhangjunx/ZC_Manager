package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.CardData;

/**
 * @ClassName CardDataMapper
 * @Description 卡表的数据操作层 
 * @Author csc
 * @Date 2019年12月26日 下午2:14:34
 */
@Repository
public interface CardDataMapper {
    int deleteByPrimaryKey(Integer cardno);

    int insert(CardData record);

    int insertSelective(CardData record);

    CardData selectByPrimaryKey(Integer cardno);

    int updateByPrimaryKeySelective(CardData record);

    int updateByPrimaryKey(CardData record);
    Integer queryCardNo();//获取卡号 
    Integer queryVCardNo();//获取卡号
    List<Map<String, Object>> queryCardList(String holderno);//查询员工拥有的卡
    List<Map<String, Object>> getCardTree(List<String> list);//根据部门查询人员卡片树
    Map<String, Object> queryByCardID(Map m);//查询卡内码是否重复
    
    int deleteBatch(List<Integer> list);//批量删除
    /**
     * 通过工号查询用户的卡内码和卡编号
     * @param holderno
     * 用于小程序开门
     */
    List<Map<String, Object>> querySmallProgram(String holderno);
    
    List<Map<String, Object>> getHolderCardTree(Map m);//通过部门查该部门下的人员与其拥有的卡的列表树

}