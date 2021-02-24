package com.xr.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.xr.dao.DepartureDataMapper;
import com.xr.dao.HolderDataMapper;
import com.xr.entity.DepartureData;
import com.xr.entity.HolderData;
import com.xr.entity.PageInfo;
import com.xr.service.IDepartureDataService;
@Service
@Transactional
public class DepartureDataServiceImpl implements IDepartureDataService {

	@Autowired
	private DepartureDataMapper ddm;
	@Autowired
	private HolderDataMapper hdm;
	 
	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public int deleteByPrimaryKeyService(String holderno,String loginholderno) {
		// 删除离职资料库信息  管理员或有权限之人
		
		DepartureData dd=ddm.selectByPrimaryKey(holderno);
		HolderData hd=new HolderData();
		hd.setStartdate(new Date());
		hd.setHolderno(dd.getHolderno());
		hd.setHoldername(dd.getHoldername());
		hd.setDepartmentno(dd.getDepartmentno());
		hd.setTitleno(dd.getTitleno());
		hd.setHoldercard(dd.getHoldercard());
		hd.setRoleid(dd.getRoleid());
		hd.setIdcode(dd.getIdcode());
		hd.setEmptype(dd.getEmptype());
		hd.setSuperiorno2(dd.getSuperiorno2());
		hd.setSexname(dd.getSexname());
		hd.setNationname(dd.getNationname());
		hd.setNativeplace(dd.getNativeplace());
		hd.setBankcard(dd.getBankcard());
		hd.setBirthday(dd.getBirthday());
		hd.setMaxeducation(dd.getMaxeducation());
		hd.setMajorsubject(dd.getMajorsubject());
		hd.setMarrystatus(dd.getMarrystatus());
		hd.setEmail(dd.getEmail());
		hd.setPhone(dd.getPhone());
		hd.setHolderstatus(dd.getHolderstatus());
		hd.setWarningname(dd.getWarningname());
		hd.setLoginpassword(dd.getLoginpassword());
		hd.setImgurl(dd.getImgurl());
		hd.setCreateperson(loginholderno);
		int i=hdm.insertSelective(hd);
		if(i==1){
			i=ddm.deleteByPrimaryKey(holderno);
		}
		return i;
	}
	
	@Override
	public List<Map<String, Object>> queryDepartureListService(Map m) {
		// 查询离职列表
		return ddm.queryDepartureList(m);
	}

	
	@Override
	public List<Map<String,Object>> queryDepartureListByPageService(Map m,PageInfo pageinfo){
		//分页查询离职资料库信息   管理员或有权限之人 List<DepartureData>
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=ddm.queryDepartureList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}
 
	@Override
	public int insertSelectiveService(DepartureData record) {
		// 员工离职 即当员工表holderdata删除用户时 执行添加操作  管理员或有权限之人
		return ddm.insertSelective(record);
	}

	@Override
	public Map<String,Object> queryDepartureByHolderNoService(String holderno) {
		//   通过主键查询实体信息 DepartureData
		return ddm.queryDepartureByHolderNo(holderno);
	}

	@Override
	public DepartureData queryDepartureByIDCodeService(String idcode) {
		// 通过身份证号查询人是否存在
		return ddm.queryDepartureByIDCode(idcode);
	}

	@Override
	public DepartureData queryDepartureByHolderService(String holderno) {
		//  根据工号查人是否存在 人事添加时先判断是否有人
		return ddm.queryDepartureByHolder(holderno);
	}

	

	 
}
