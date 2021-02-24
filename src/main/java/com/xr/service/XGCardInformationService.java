package com.xr.service;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

/**
 * 卡信息管理
 * @author csc
 * 业务层
 */
public interface XGCardInformationService {
	/**
	 * 查询登录人所能管理的路线信息
	 * 用于新增卡号
	 * @return
	 */
	 List<Map<String,Object>> queryUserRoute(String holderno);
	
	/**
	 * 查询卡表中的cardno和cardID，用于给路线绑卡.
     * 已经被别的线路绑定的卡号,不在查询
	 * @return
	 */
	 List<Map<String, Object>> queryCardData();
	/**
	 * 单个删除
	 * 根据卡片主键删除
	 * @param cardid
	 */
	 boolean deleteCardInfor(Integer cardid);
	/**
	 * 批量添加卡片相关信息
	 * @param list
	 * @return
	 */
	 Integer insertCardInfor(List<JSONObject> list);
	/**
	 * 通过userid
	 * 查询用户所能管理线路的卡信息
	 * @param userid
	 * @return
	 */
	 List<Map<String, Object>> queryCardInfor(String holderno);
}
