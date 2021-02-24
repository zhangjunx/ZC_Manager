package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.XGCardInformationDao;
import com.xr.service.XGCardInformationService;

import net.sf.json.JSONObject;

/**
 * 卡信息管理
 * @author csc
 * 业务实现层
 */
@Service
public class XGCardInformationServiceImpl implements XGCardInformationService {

	 @Autowired
	 private XGCardInformationDao carddao;//引入卡信息业务数据处理层Dao
	   /**
		 * 查询登录人所能管理的路线信息
		 * 用于新增卡号
		 * @return
		 */
		@Override
		public List<Map<String, Object>> queryUserRoute(String holderno) {
			return carddao.queryUserRoute(holderno);
		}
		/**
		  * 查询卡表中的cardno和cardID，用于给路线绑卡.
          * 已经被别的线路绑定的卡号,不在查询
		 * @return
		 */
		@Override
		public List<Map<String, Object>> queryCardData() {
			return carddao.queryCardData();
		}
  
	 /**
	  * 单个删除
	  * 根据卡片主键删除
	  */
	@Override
	public boolean deleteCardInfor(Integer cardid) {
		return carddao.deleteCardInfor(cardid);
	}
	/**
	 * 批量添加卡片相关信息
	 * @param list
	 * @return
	 */
	@Override
	public Integer insertCardInfor(List<JSONObject> list) {
		return  carddao.insertCardInfor(list);
	}
	/**
	 * 通过userid
	 * 查询用户所能管理线路的卡信息
	 * @param userid
	 * @return
	 */
	@Override
	public List<Map<String, Object>> queryCardInfor(String holderno) {
		return carddao.queryCardInfor(holderno);
	}

	 
	 
}
