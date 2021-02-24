package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.CardDataMapper;
import com.xr.entity.CardData;
import com.xr.service.ICardDataService;
import com.xr.util.TreeToolUtils;
/**
 * @ClassName CardDataServiceImpl
 * @Description 卡表的业务实现层
 * @Author csc
 * @Date 2019年12月26日 下午2:26:08
 */
@Service
public class CardDataServiceImpl implements ICardDataService {
	@Autowired
	private CardDataMapper cdm;

	@Override
	public List<Map<String, Object>> querySmallProgram(String holderno) {
		// 通过工号查询用户的卡内码和卡编号,用于小程序开门
		List<Map<String,Object>> smallist = cdm.querySmallProgram(holderno);
		  for (int i = 0; i < smallist.size(); i++) 
		  {
			    String zhuanhua =  String.valueOf(smallist.get(i).get("cardid"));
			    //将十六进制转化成十进制
			    long cardid = Long.parseLong(zhuanhua, 16);  
		        smallist.get(i).put("cardid", cardid);
		   }
		return smallist;
	}//end 方法

	@Override
	public List<Map<String, Object>> queryCardListService(String holderno) {
		// 查询员工拥有的卡
		return cdm.queryCardList(holderno);
	}

	@Override
	public int updateByPrimaryKeySelective(CardData record) {
		// 修改数据
		return cdm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String, Object>> getCardTreeService(List<String> list) {
		// 根据部门查询人员卡片树
		List<Map<String, Object>> arrlist=cdm.getCardTree(list);
		List<Map<String, Object>> treeList=new ArrayList<Map<String, Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treeList=tree.menuList(arrlist, true);
		return treeList;
	}

	@Override
	public int insertSelectiveService(CardData record) {
		// 新增发卡人员
		return cdm.insertSelective(record);
	}

	@Override
	public Integer queryCardNoService() {
		// 获取卡号
		return cdm.queryCardNo();
	}

	@Override
	public Map<String, Object> queryByCardIDService(Map m) {
		// 查询卡内码是否重复
		return cdm.queryByCardID(m);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer cardno) {
		// 删除单个
		return cdm.deleteByPrimaryKey(cardno);
	}

	@Override
	public int deleteBatchService(List<Integer> list) {
		// 批量删除
		return cdm.deleteBatch(list);
	}

	@Override
	public List<Map<String, Object>> getHolderCardTreeService(Map m) {
		//  通过部门查该部门下的人员与其拥有的卡的列表树
		List<Map<String, Object>> list=cdm.getHolderCardTree(m);
		List<Map<String, Object>> treeList=new ArrayList<Map<String, Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treeList=tree.menuList(list, true);
		return treeList;
	}

	 

}
