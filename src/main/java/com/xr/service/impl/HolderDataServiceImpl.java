package com.xr.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.xr.dao.CardDataMapper;
import com.xr.dao.DepartureDataMapper;
import com.xr.dao.HolderDataMapper;
import com.xr.dao.HolderPhotoMapper;
import com.xr.entity.CardData;
import com.xr.entity.DepartureData;
import com.xr.entity.HolderData;
import com.xr.entity.HolderPhoto;
import com.xr.entity.PageInfo;
import com.xr.service.IHolderDataService;
import com.xr.tool.ImageSizeUtil;

import net.coobird.thumbnailator.Thumbnails;

/**
 * @ClassName HolderDataServiceImpl
 * (HolderData)用户查询的业务实现层
 * @Author csc
 * @Date 2019年12月27日 下午2:59:52
 */
@Service
public class HolderDataServiceImpl implements IHolderDataService {

	@Autowired
	private HolderDataMapper hdm;
	@Autowired
	private DepartureDataMapper ddm;
	@Autowired
	private HolderPhotoMapper hpm;
	@Autowired
	private CardDataMapper cdm;


	@Override
	public HolderData queryLoginCheckService(HolderData holderdata) {
		// 登录验证
		HolderData holderData=hdm.queryLoginCheck(holderdata);
		return holderData;
	}
 
	@Override
	public int updatePWDService(HolderData record) {
		// 修改个人密码
		return hdm.updatePWD(record);
	}
	
	@Override
	public int updateKMPWDService(HolderData record) {
		// 修改开门密码
		return hdm.updateKMPWD(record);
	}
	
	
	@Override
	public  Map<String,Object> updateMyPWDService(Map m) {
		// 修改个人密码和开门密码
		Map<String,Object> map=new HashMap<String,Object>();
		String holderno=m.get("holderno").toString();
		String str=m.get("str").toString();
		List<Map<String,Object>> arrlist=(List<Map<String, Object>>) m.get("arrlist");
		HolderData hd=hdm.selectByPrimaryKey(holderno);
		int i=0;
		int i1=0;
		int i2=0;
		String strr=null;
		if(str.equals("dl")){//登录密码
			String oldpassword=arrlist.get(0).get("oldpassword").toString();
			String newpassword=arrlist.get(0).get("newpassword").toString();
			if(!oldpassword.equals(hd.getLoginpassword())){
				map.put("flag", false);
				map.put("reason", "对不起，原有登录密码输入有误！");
				return map;
			}
			hd.setLoginpassword(newpassword);
			i=hdm.updatePWD(hd);
		}else if(str.equals("km")){//修改开门密码
			String oldpassword=arrlist.get(0).get("oldpassword").toString();
			String newpassword=arrlist.get(0).get("newpassword").toString();
			if(!oldpassword.equals(hd.getHolderpassword())){
				map.put("flag", false);
				map.put("reason", "对不起，原有开门密码输入有误！");
				return map;
			}
			hd.setHolderpassword(newpassword);
			i=hdm.updateKMPWD(hd);
		}else if(str.equals("dlAndkm")){//同时修改开门密码和登录密码
			for(int k=0;k<arrlist.size();k++){
				String oldpassword=arrlist.get(k).get("oldpassword").toString();
				String newpassword=arrlist.get(k).get("newpassword").toString();
				String str1=arrlist.get(k).get("str1").toString();
				if(str1.equals("dl") && (oldpassword.equals(hd.getLoginpassword()))){//登录密码
					hd.setLoginpassword(newpassword);
					i1=hdm.updatePWD(hd);
				}else if(str1.equals("km") && (oldpassword.equals(hd.getHolderpassword()))){//开门密码
					hd.setHolderpassword(newpassword);
					i2=hdm.updateKMPWD(hd);
				}else{
					//map.put("str", str1);
					strr=str1;
				}
			}
		}
		if(i1==0 && i2==0 && i==0){
			map.put("flag", false);
			map.put("reason", "对不起，登录密码和开门密码都失败了！");
			map.put("str", "dlAndkm");
		}else if(i>0 || (i1>0 && i2>0)){//两个被选中的都修改成功或者只被选中的一个修改成功
			map.put("flag", true);
			map.put("reason", "修改成功！");
		}else{
			map.put("flag", true);
			map.put("reason", "修改成功，但是"+strr+"修改失败！");
		} 
		return map;
	}
	
	@Override
	public Map<String,Object> updateKMPWDByWeChatService(HolderData record) {
		// 修改开门密码 微信小程序
		Map<String,Object> map=new HashMap<String,Object>();
		HolderData hd=hdm.selectByPrimaryKey(record.getHolderno());
		hd.setHolderpassword(record.getHolderpassword());
		int i=hdm.updateKMPWD(hd);
		if(i>0){
			map.put("flag", true);
			map.put("reason", "修改开门密码成功！");
		}else{
			map.put("flag", false);
			map.put("reason", "修改开门密码失败！");
		} 
		return map;
	}
	 
	 

	@Override@Transactional
	public Map<String,Object> insertSelectiveService(MultipartFile file1,MultipartFile file2,String str,String str2,String holderno) throws IOException {
		Map<String,Object> map=new HashMap<String,Object>();
		// 插入数据
		HolderData hdata=JSON.parseObject(str, HolderData.class);
		CardData cardata=JSON.parseObject(str2, CardData.class);
		/*//判断工号是否重复
		HolderData hd=hdm.queryHolderByHolder(hdata.getHolderno());
		DepartureData departure=ddm.queryDepartureByHolder(hdata.getHolderno());
		if(hd!=null || departure!=null){
			map.put("flag", false);
			map.put("reason", "添加失败，工号重复了!");
			return map;
		}*/
		/*//卡号是否重复
		List<HolderData> lit=hdm.queryHolderByHolderCard(hdata.getHoldercard());
		if(lit.size()>0){
			map.put("flag", false);
			map.put("reason", "添加失败，该卡号已存在了!");
			return map;
    	}
		//身份证号是否重复 HolderData表
		List<HolderData> lis=hdm.queryHolderByIDCode(hdata.getIdcode());
	    if(lis.size()>0){
			map.put("flag", false);
			map.put("reason", "添加失败，该身份证号已存在了!");
			return map;
		}*/
	   /* //判断用户是否已离职 被开除 
		DepartureData d=ddm.queryDepartureByIDCode(hdata.getIdcode());
		if(d!=null && !"".equals(d)){
			map.put("flag", false);
			map.put("reason", "添加失败，该身份证号的用户已离职!");
			return map;
		}*/
		/*HolderPhoto hp=new HolderPhoto();
		if(file1!=null){
			if(!file1.isEmpty()){
				byte[] idphoto = file1.getBytes();
				hp.setIdphoto(idphoto);
			}
		}
		
		if(file2!=null){
			if(!file2.isEmpty()){
				byte[] dataphoto = file2.getBytes();
				hp.setDataphoto(dataphoto);
			}
		}
		hdata.setCreateperson(holderno);
		hdata.setUpdatedate(new Date());
		hdata.setUpdateperson(holderno);
		int i=hdm.insertSelective(hdata);
		if(i>0){
			hp.setHolderno(hdata.getHolderno());
			i=hpm.insertSelective(hp); 
			if(i>0){
				if(cardata.getCardid()!=null && !"".equals(cardata.getCardid())){
					Integer cardno=cdm.queryCardNo();
					cardata.setCardno(cardno);
					i=cdm.insertSelective(cardata);
				}
			}
		}*/
		hdata.setCreateperson(holderno);
		hdata.setUpdatedate(new Date());
		hdata.setUpdateperson(holderno);
		int i=hdm.insertSelective(hdata);
		if(i>0){
			map.put("flag", true);
			map.put("reason", "添加成功!");
		}else{
			map.put("flag", false);
			map.put("reason", "添加失败!");
		}
		return map;
	}
	
	
	@Override@Transactional
	public Map<String,Object> updateHolderService(MultipartFile file1,MultipartFile file2,String str,String str1) throws IOException {
		Map<String,Object> map=new HashMap<String,Object>();
		// 插入数据
		HolderData record=JSON.parseObject(str, HolderData.class);
		/*//卡号是否重复
		List<HolderData> lit=hdm.queryHolderByHolderCard(record.getHoldercard());
		//HolderPhoto hp=hpm.queryPhoto(record.getHolderno()); 
		HolderPhoto hp=new HolderPhoto();
		hp.setHolderno(record.getHolderno());
		if(file1!=null){
			if(!file1.isEmpty()){
				//byte[] idphoto = file1.getBytes();
				byte[] idphoto=ImageSizeUtil.getFileBytes(file1);
				hp.setIdphoto(idphoto);
			}
		}
		
		if(file2!=null){
			if(!file2.isEmpty()){
				//byte[] dataphoto = file2.getBytes();
				byte[] dataphoto=ImageSizeUtil.getFileBytes(file2);
				hp.setDataphoto(dataphoto);
			}
		}
		record.setUpdatedate(new Date());
		record.setUpdateperson(str1);
		int i=hdm.updateByPrimaryKeySelective(record);
		if(i>0){
			i=hpm.updatePhoto(hp);
		}*/
		record.setUpdatedate(new Date());
		record.setUpdateperson(str1);
		int i=hdm.updateByPrimaryKeySelective(record);
		if(i>0){
			map.put("flag", true);
			map.put("reason", "修改成功!");
		}else{
			map.put("flag", false);
			map.put("reason", "修改失败!");
		}
		return map;
	}

	@Override
	public HolderData selectByPrimaryKeyService(String holderno) {
		// 通过主键查询实体类信息
		HolderData holderData=hdm.selectByPrimaryKey(holderno);
		return holderData;
	}

	 
	
	 /**
     * 工号
     * 查看读取Excel的数据中是否在数据库中有重复的数据
     * @return
     */
	@Override
	public String queryExcelHoderNo(String holderno) {
		return hdm.queryExcelHoderNo(holderno);
	}
	/**
	  * 查询身份证号
	  * 查看读取Excel的数据中是否在数据库中有重复的数据
	  * @return
	  */
	@Override
	public String queryExcelIdCode(String idcode) {
		return hdm.queryExcelIdCode(idcode);
	}
	/**
	 *  批量查询
	 *  查询卡号是否在数据库中已存在 
	 *  读取Excel的卡号是否在数据库中已被使用
	 */
	@Override
	public String queryExcelCardNo(String holdercard) {
		return hdm.queryExcelCardNo(holdercard);
	}
	 /**
	   * 查询部门所属的编号
	   * @param departmentno
	   * @return
	   */
	  @Override
	  public String queryExcelDeptno(String departmentname,String holderno) {
		return hdm.queryExcelDeptno(departmentname,holderno);
	}
	  /**
	   * 添加Excel中的数据
	   * @param 实体类
	   * @return
	   */
	@Override
	public void insertBatchHolderData(List<Map<String, Object>> list) {
		 hdm.insertBatchHolderData(list);
	}

	@Override
	public int updateWarningNameService(HolderData record) {
		// 是否预警提示
		return hdm.updateWarningName(record);
	}

	@Override
	public int updateHolderStatusService(HolderData record) {
		// 是否授予权限
		return hdm.updateHolderStatus(record);
	}

	@Override
	public List<Map<String, Object>> queryRetireListService(Map m) {
		// 查询退休人员 所有退休人员
		List<Map<String, Object>> litt=new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> list=hdm.queryRetireList(m);
		for(int i=0;i<list.size();i++){
			String sexname=(String) list.get(i).get("sexname");
			String diff=(String) list.get(i).get("diff");
			Integer age=Integer.parseInt(diff);
			boolean res=false;
			//判断是否满足女52岁  男57岁 时 预警提示
			if((sexname.equals("女") && age>=52) || (sexname.equals("男") && age>=57)){
				res=true;
			}
			if(res){
				litt.add(list.get(i));
			}
		}
		return litt;
	}//end
	
	@Override
	public List<Map<String, Object>> queryRetireListByPageService(Map m,PageInfo pageinfo) {
		// 分页查询退休人员 所有退休人员
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> litt=new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> list=hdm.queryRetireList(m);
		for(int i=0;i<list.size();i++){
			String sexname=(String) list.get(i).get("sexname");
			String diff=(String) list.get(i).get("diff");
			int age=Integer.parseInt(diff);
			boolean res=false;
			//判断是否满足女52岁  男57岁 时 预警提示
			if((sexname.equals("女") && age>=52) || (sexname.equals("男") && age>=57)){
				res=true;
			}
			if(res){
				litt.add(list.get(i));
			}
		}
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(litt);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return litt;
	}//end
	
	@Override
	public int updateHolderDataBatchsService(List<HolderData> list) {
		// 批量删除  物理删除 即批量修改
		return hdm.updateHolderDataBatchs(list);
	}

	@Override
	public  List<Map<String,Object>> queryHolderDataListByPageService(Map m,PageInfo pageinfo) {
		// 分页查询  用户列表信息 超级管理员  List<HolderData>
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		 List<Map<String,Object>> list=hdm.queryHolderDataList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}
	
	@Override
	public List<Map<String,Object>> queryHolderDataListService(Map m) {
		// 查询用户列表信息 超级管理员
		return hdm.queryHolderDataList(m);
	}

	

	@Override
	public Map<String,Object> queryByHolderCardService(String holdercard) {
		// 通过卡号查询实体类信息
		return hdm.queryByHolderCard(holdercard);
	}

	@Override
	public HolderData queryHolderByHolderService(String holderno) {
		// 添加新员工时 通过工号查员工是否存在    用到
		return hdm.queryHolderByHolder(holderno);
	}
	
	@Override
	public List<HolderData> queryHolderByIDCodeService(String idcode) {
		//  添加时人员时  判断身份证号是否存在
		return hdm.queryHolderByIDCode(idcode);
	}
	
	@Override
	public List<HolderData> queryHolderByHolderCardService(String holdercard) {
		//  添加时人员时  判断卡号是否存在
		return hdm.queryHolderByHolderCard(holdercard);
	}
	
	@Override
	public List<HolderData> queryHolderByTitleNoService(String titleno) {
		// 删除职务时 先判断该职务是否被占用
		return hdm.queryHolderByTitleNo(titleno);
	}

	@Override
	public Map<String, Object> queryHolderInfoByHolderService(String holderno) {
		// 通过主键查询实体类信息 HolderData
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String, Object> record=hdm.queryHolderInfoByHolder(holderno);
		if(record!=null && !"".equals(record)){
			map.put("flag", true);
			map.put("reason", "查询信息成功！");
			map.put("result", record);
		}else{
			map.put("flag", false);
			map.put("reason", "查询信息失败！");
		} 
		return map;
	}
	@Override
	public String queryLoginDoorPwd(String holderno, String holderpassword) {
		// * 目前只有小程序使用该方法* 通过工号和登录密码来查询,用户是否可以开门
		return hdm.queryLoginDoorPwd(holderno, holderpassword);
	}//end

	  /**  目前只有小程序使用该方法
	    *  通过微信号查询用户的相关信息.
	    *  查询用户是否可以快速登录小程序
	    * @param wechatno
	    **/
	@Override
	public HolderData queryWechatNoLogin(String wechatno) {
		return hdm.queryWechatNoLogin(wechatno);
	}//end

	@Override
	public void updateHolderWechatNo(HolderData record) {
		/*该方法用与小程序工号或者密码登录时* 给该员工绑定微信的openid*修改方法*/
		hdm.updateHolderWechatNo(record);
	}

	@Override
	public List<Map<String, Object>> getAllStaff() {
		//  获取所有员工,用于与SenseLink平台对接员工.
		return hdm.getAllStaff();
	}
    /** 通过工号查询部门名称*/
	@Override
	public HashMap<String, Object> queryDepartmentNameByHolderno(String holderno) {
		
		return hdm.queryDepartmentNameByHolderno(holderno);
	}//end

	@Override
	public String getNextHolderService() {
		// 获取holderno 下一个
		return hdm.getNextHolder();
	}

	

	

	

	

	
}
