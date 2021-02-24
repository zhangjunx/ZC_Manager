package com.xr.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.HolderData;
import com.xr.entity.PageInfo;

/**
 * @ClassName IHolderDataService
 * (HolderData)用户业务层
 * @Author csc
 * @Date 2019年12月27日 下午2:59:02
 */
@Service
public interface IHolderDataService {
	List<Map<String,Object>> queryHolderDataListByPageService(Map m,PageInfo pageinfo);//分页查询  用户列表信息 超级管理员  List<HolderData>
	List<Map<String,Object>> queryHolderDataListService(Map m);//查询  用户列表信息 超级管理员 
	HolderData queryLoginCheckService(HolderData holderdata);//登录验证
	 
	int updatePWDService(HolderData record);//修改个人密码
	int updateKMPWDService(HolderData record);//修改开门密码
	Map<String, Object> updateMyPWDService(Map m);//修改个人密码和开门密码
	  
	Map<String,Object> updateKMPWDByWeChatService(HolderData record);//修改开门密码
	
	Map<String, Object> insertSelectiveService(MultipartFile file1,MultipartFile file2,String str,String str2,String holderno) throws IllegalStateException, IOException;//添加用户
	Map<String, Object> updateHolderService(MultipartFile file1, MultipartFile file2, String str, String str1) throws IOException;
	HolderData selectByPrimaryKeyService(String holderno);//通过主键查询实体类
    
    Map<String,Object> queryHolderInfoByHolderService(String holderno);//通过主键查询实体类信息 HolderData
    
    
    Map<String,Object> queryByHolderCardService(String holdercard);//通过卡号查询实体类信息 
    
    
    int updateWarningNameService(HolderData record);//是否预警提示
    int updateHolderStatusService(HolderData record);//是否授予权限
    
    int updateHolderDataBatchsService(List<HolderData> list);//批量删除  物理删除 即批量修改
    
     
    HolderData queryHolderByHolderService(String holderno);//添加新员工时 通过工号查员工是否存在    用到
    List<HolderData> queryHolderByIDCodeService(String idcode);// 添加时人员时  判断身份证号是否存在
    List<HolderData> queryHolderByHolderCardService(String holdercard);// 添加时人员时  判断卡号是否存在
    List<HolderData> queryHolderByTitleNoService(String titleno);//删除职务时 先判断该职务是否被占用
    List<Map<String,Object>> queryRetireListByPageService(Map m,PageInfo pageinfo);//查询退休人员 所有退休人员
    List<Map<String,Object>> queryRetireListService(Map m);//查询退休人员 所有退休人员
    
    String getNextHolderService();//获取下一个holderno
    
    /** 通过工号查询部门名称*/
    HashMap<String, Object> queryDepartmentNameByHolderno(String holderno);
    /**查询工号 查看读取Excel的工号中是否在数据库中已存在*/
   public String queryExcelHoderNo(String holderno);
   
   /**查询身份证号 查看读取Excel的身份证号是否在数据库中有重复的数据*/
   public String queryExcelIdCode(String idcode);
   
   /**查询卡号是否在数据库中已存在 * 读取Excel的卡号是否在数据库中已被使用 * @param Cardlist*/
   public String queryExcelCardNo(String holdercard);
   
   /**查询部门所属的编号* @param departmentno* @return*/
   public  String queryExcelDeptno(String departmentname,String holderno);

   /**添加Excel中的数据 * @param 实体类(HolderData)* @return*/
   public  void insertBatchHolderData(List<Map<String, Object>> list);
   /**
    * 目前只有小程序使用该方法
    * 通过工号和登录密码来查询,用户是否可以开门
    */
   String queryLoginDoorPwd(String holderno,String holderpassword);
   /**
    *  目前只有小程序使用该方法
    *  通过微信号查询用户的相关信息.
    *  查询用户是否可以快速登录小程序
    * @param wechatno
    */
   HolderData queryWechatNoLogin(String wechatno);
   /**
    * 该方法用与小程序工号或者密码登录时
    * 给该员工绑定微信的openid
    * 修改方法
    */
   void updateHolderWechatNo(HolderData record);
   
   /**
  	 *  获取所有员工,用于与SenseLink平台对接员工.
  	 */
  	List<Map<String, Object>> getAllStaff();
 
}
