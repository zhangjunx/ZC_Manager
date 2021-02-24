package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import net.sf.json.JSONObject;

/**
 * 线路卡信息管理
 * @author csc
 * 数据操作层Dao
 */
public interface XGCardInformationDao {
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
	 * 通过holderno
	 * 查询用户所能管理线路的卡信息
	 * @return
	 */
	 List<Map<String, Object>> queryCardInfor(@Param("holderno")String holderno);
	
}
