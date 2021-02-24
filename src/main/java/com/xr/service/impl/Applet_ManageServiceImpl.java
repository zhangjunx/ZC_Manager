package com.xr.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.Applet_ManageDao;
import com.xr.entity.Applet_AccountData;
import com.xr.entity.Applet_AccountPhotoData;
import com.xr.entity.Applet_RoleModel;
import com.xr.service.Applet_ManageService;
import com.xr.util.ThreadLocalDateUtil;
import com.xr.util.TreeToolUtils;

import net.sf.json.JSONObject;

/**
 * @author csc
 * 小程序模块的业务实现层
 */
@Service
public class Applet_ManageServiceImpl implements Applet_ManageService {
 
	@Autowired
	private Applet_ManageDao amgedao;//引入小程序模块的数据操作层
	
	@Override
	public Integer insertAccount(Map<String, Object> revice) throws ParseException  {
		Applet_AccountData account = new Applet_AccountData();
		String departmentno = (String)revice.get("departmentno");//作用的部门
		account.setHolderno((String)revice.get("holderno"));//获取工号
		account.setCorporatename((String)revice.get("corportename"));//获取公司名称
		account.setIpaddress((String)revice.get("ipaddress"));//获取ip地址
		account.setLoginaccount(((String) revice.get("loginaccount")));//获取服务器账号
		account.setLoginpassword((String)revice.get("loginpassword"));//获取服务器密码
		account.setValiditybegintime(ThreadLocalDateUtil.parse((String)revice.get("validitybegintime")));//有效期开始时间
		account.setValidityendtime(ThreadLocalDateUtil.parse((String)revice.get("validityendtime")));//有效期结束时间
		String peolenumber = (String)revice.get("peoplenumber");
		if(peolenumber!=null && !peolenumber.equals("")) {
			account.setPeoplenumber(Integer.valueOf(peolenumber));//最多使用人数	
		}
		String facecount = (String)revice.get("facecount");
		if(facecount!=null && !facecount.equals("")) {
			account.setFacecount(Long.valueOf(facecount));//刷脸次数
		}
		account.setValiditystatus("1");//状态0是启用1是禁用
		account.setRemark((String)revice.get("remark"));//备注
		account.setDepartmentno(departmentno);//部门编号
		account.setLconname((String)revice.get("lconname"));//图标名称
		String str =(String) revice.get("logophotos");
		if(str!=null && !str.equals("")) {
			account.setLogophotos(str.getBytes());//LOGO
		}
		// 申请账户的方法
		amgedao.insertAccount(account);
		Integer accountid = account.getAccountid();
		return accountid;
	}
	
	@Override
	public void insertAccountModel(List<Map<String, Object>> list) {
		//给账户赋予权限的方法
		amgedao.insertAccountModel(list);
	}

	@Override
	public Map<String, Object> selectAppletAccount(JSONObject receive) {
		// 查询小程序所有账户
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		List<Applet_AccountData> list = amgedao.selectAppletAccount(receive);
		
		Integer count = amgedao.selectAppletAccountCount(receive);
		resultMap.put("result", list);
		resultMap.put("count", count);
		return resultMap;
	}

	@Override
	public Integer selectAppletAccountCount(JSONObject receive) {
		// 查询小程序账户的人的总数，用于分页
		return amgedao.selectAppletAccountCount(receive);
	}
	
	@Override
	public void updateAccountStatus(Applet_AccountData account) {
		// 通过accountid来禁用或者启用,申请的账号
		amgedao.updateAccountStatus(account);
	}
	
	@Override
	public boolean updateAccount(Map<String, Object> revice) throws ParseException {
		// 	 *  修改小程序账号*  用于账户管理里面的修改
		Applet_AccountData account = new Applet_AccountData();
		account.setAccountid(Integer.valueOf((String)revice.get("accountid")));
		String departmentno = (String)revice.get("departmentno");//作用的部门
		//account.setHolderno((String)revice.get("holderno"));//获取工号
		account.setCorporatename((String)revice.get("corportename"));//获取公司名称
		account.setIpaddress((String)revice.get("ipaddress"));//获取ip地址
		account.setLoginaccount(((String) revice.get("loginaccount")));//获取服务器账号
		account.setLoginpassword((String)revice.get("loginpassword"));//获取服务器密码
		account.setValiditybegintime(ThreadLocalDateUtil.parse((String)revice.get("validitybegintime")));//有效期开始时间
		account.setValidityendtime(ThreadLocalDateUtil.parse((String)revice.get("validityendtime")));//有效期结束时间
		String peolenumber = (String)revice.get("peoplenumber");
		if(peolenumber!=null && !peolenumber.equals("")) {
			account.setPeoplenumber(Integer.valueOf(peolenumber));//最多使用人数	
		}
		String facecount = (String)revice.get("facecount");
		if(facecount!=null && !facecount.equals("")) {
			account.setFacecount(Long.valueOf(facecount));//刷脸次数
		}
		account.setValiditystatus((String)revice.get("validitystatus"));//状态0是启用1是禁用
		account.setRemark((String)revice.get("remark"));//备注
		account.setDepartmentno(departmentno);//部门编号
		account.setLconname((String)revice.get("lconname"));//图标名称
		String str =(String) revice.get("logophotos");
		if(str!=null && !str.equals("")) {
			account.setLogophotos(str.getBytes());//LOGO
		}
		return amgedao.updateAccount(account);
	}

	
	
	

	@Override
	public void deleteAccount(Integer accountid) {
		// 删除申请账户的方法
		amgedao.deleteAccount(accountid);
	}

	@Override
	public void deleteAccountModel(Integer accountid) {
		// T删除账户关联权限的方法
		amgedao.deleteAccountModel(accountid);
	}
	
	@Override
	public Map<String, Object> selectOneAccount(Integer accountid) {
		// 通过accountid来查询用户申请的账号信息
		return amgedao.selectOneAccount(accountid);
	}

	@Override
	public List<Applet_RoleModel> selectRoleModel(Integer accountid) {
		// 通过accountid来查询用户关联的模块信息
		return amgedao.selectRoleModel(accountid);
	}

	@Override
	public void deleteAppletModel(Integer modelno) {
		// * 小程序树形结构* 通过模块编号来删除模块
		amgedao.deleteAppletModel(modelno);
	}
	
     /**********************************/
	
	@Override
	public Applet_AccountData queryCheckHolder(String departmentno) {
		// 	 * 这是小程序登录时,用于查询账号的使用权限
		//* 查看小程序账户使用是否到期,是否有权限使用小程序
		return amgedao.queryCheckHolder(departmentno);
	}

	@Override
	public List<Map<String, Object>> queryHaveModel(Integer accountid) {
		//  * 用于小程序登录成功后
		//* 查询accountid账号所拥有的相关模块
		List<Map<String, Object>> havelist = amgedao.queryHaveModel(accountid);
		List<Map<String, Object>> treeList=new ArrayList<Map<String,Object>>();
		TreeToolUtils u=new TreeToolUtils();
		treeList=u.menuList(havelist, true);
		return treeList;
	}
	
	@Override
	public List<Map<String, Object>> queryAccountData() {
		// 	  * 查询小程序所有账户* 用于管理照片
		return amgedao.queryAccountData();
	}
	
	@Override
	public List<Applet_AccountPhotoData> queryAccountPhoto(Integer accountid) {
		// 通过accoountid查询账户下的照片
		return amgedao.queryAccountPhoto(accountid);
	}
	
	@Override
	public void insertAccountPhoto(Applet_AccountPhotoData accountPhoto) {
		//  * 小程序广告栏新增照片的方法* 用于给账户新增照片
		amgedao.insertAccountPhoto(accountPhoto);
	}

	@Override
	public void updateAccountPhoto(Applet_AccountPhotoData accountPhoto) {
		//   * 小程序广告栏修改照片的方法* 用于给账户修改照片
		amgedao.updateAccountPhoto(accountPhoto);
	}

	@Override
	public void deleteOneAccountPhoto(Integer id) {
		// T* 通过id删除账户照片
		amgedao.deleteOneAccountPhoto(id);
	}

	@Override
	public Applet_AccountData queryAccount(String departmentno) {
		//  * 通过部门编号来查询是否已经申请了账户* 用于判断是否已经申请过账户
		 //* 一个公司只允许有一个账户
		return amgedao.queryAccount(departmentno);
	}
	@Override
	public void deleteAccountPhoto(Integer accountid) {
		//	 * 删除账户所设置的轮播图
		amgedao.deleteAccount(accountid);
	}





}
