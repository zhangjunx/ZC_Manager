package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.xr.entity.Applet_AccountData;
import com.xr.entity.Applet_AccountPhotoData;
import com.xr.entity.Applet_RoleModel;

import net.sf.json.JSONObject;

/**
 * @author csc
 * 小程序管理模块的数据操作层
 */
@Repository
public interface Applet_ManageDao {
	
	/**
	 * 申请账户的方法
	 * @param account
	 */
	void insertAccount(Applet_AccountData account);
	/**
	 * 给申请账户赋予权限的方法
	 */
	void insertAccountModel(List<Map<String, Object>> list);
	/**
	 * 删除申请账户的方法
	 */
	void deleteAccount(Integer accountid);
	/**
	 * 删除账户关联模块的方法
	 */
	void deleteAccountModel(Integer accountid);
	/**
	 * 删除账户所设置的轮播图
	 */
	void deleteAccountPhoto(Integer accountid);
	
	/**
	 * 通过部门编号来查询是否已经申请了账户
	 * 用于判断是否已经申请过账户
	 * 一个公司只允许有一个账户
	 * @param departmentno
	 */
    Applet_AccountData queryAccount(String departmentno);	
	/**
	 * 通过accountid来查询用户申请的账号信息
	 * @return
	 */
	Map<String, Object> selectOneAccount(Integer accountid);
	
	/**
	 * 通过accountid来查询用户关联的模块信息
	 * (随从方法)-selectOneAccount
	 * @return
	 */
	List<Applet_RoleModel> selectRoleModel(Integer accountid);
	
	 /**
	  * 查询小程序所有账户
	  * @return
	  */
	List<Applet_AccountData> selectAppletAccount(JSONObject receive);
	/**
	 * 查询小程序账户的总数，用于分页
	 * @param receive
	 */
	Integer selectAppletAccountCount(JSONObject receive);
	
	/**
	 * 通过accountid来禁用或者启用,申请的账号
	 * @param accountid
	 */
	void updateAccountStatus(Applet_AccountData account);
	
	/**
	 *  修改小程序账号
	 *  用于账户管理里面的修改
	 */
	boolean updateAccount(Applet_AccountData account);
	
	/**
	 * 小程序树形结构
	 * 通过模块编号来删除模块
	 * @param modelno
	 */
	void deleteAppletModel(Integer modelno);
	
	
	/**********************************/
	
	/**
	 * 这是小程序登录时,用于查询账号的使用权限
	 * 查看小程序账户使用是否到期,是否有权限使用小程序
	 * @param account
	 */
	Applet_AccountData queryCheckHolder(String departmentno);
	
	/**
	 * 用于小程序登录成功后
	 * 查询accountid账号所拥有的相关模块
	 * @param menucode
	 * @param accountid
	 * @return
	 */
	List<Map<String, Object>> queryHaveModel(@Param("accountid")Integer accountid);
	 
	 /**
	  * 查询小程序所有账户
	  * 用于管理照片
	  * @return
	  */
	 List<Map<String, Object>> queryAccountData();
	 /**
	  * 通过accoountid查询账户下的照片
	  * @return
	  */
	 List<Applet_AccountPhotoData> queryAccountPhoto(Integer accountid);
	/**
	 * 小程序广告栏新增照片的方法
	 * 用于给账户新增照片
	 */
	 void insertAccountPhoto(Applet_AccountPhotoData accountPhoto);
	 /**
	  * 小程序广告栏修改照片的方法
	  * 用于给账户修改照片
	  */
	 void updateAccountPhoto(Applet_AccountPhotoData accountPhoto);
	 /**
	  * 通过id删除账户照片
	  * @param id
	  */
	 void deleteOneAccountPhoto(Integer id);
}
