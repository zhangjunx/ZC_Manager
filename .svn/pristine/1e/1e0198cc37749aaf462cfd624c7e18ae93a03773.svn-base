package com.xr.service.impl;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.xr.dao.CardDataMapper;
import com.xr.dao.DoorPermHolderRecordMapper;
import com.xr.dao.VisitorsInfoMapper;
import com.xr.dao.VisitorsPhotoMapper;
import com.xr.entity.CardData;
import com.xr.entity.DoorPermHolderRecord;
import com.xr.entity.PageInfo;
import com.xr.entity.VisitorsInfo;
import com.xr.entity.VisitorsPhoto;
import com.xr.service.IVisitorsInfoService;
import com.xr.tool.ImageSizeUtil;
@Service
public class VisitorsInfoServiceImpl implements IVisitorsInfoService {
	@Autowired
	private VisitorsInfoMapper vim;
	@Autowired
	private VisitorsPhotoMapper vpm;
	@Autowired
	private CardDataMapper cdm;
	@Autowired
	private DoorPermHolderRecordMapper dpm;

	@Override
	public int insertVisitorsInfoAndPhotoService(MultipartFile file,VisitorsInfo record,String holderno) throws IOException {
		//添加访客和对应访客照片
		//record.setApplystatus("10");
		//record.setApplystatusname("待审核");
		
		record.setDeleted(false);
		UUID uuid=UUID.randomUUID();
		record.setRowguid(uuid.toString());
		record.setVisitorsdate(new Date());
		record.setFilldate(new Date());
		int i=vim.insertSelective(record);
		if(i>0){
			Integer visitorsid=record.getId();
			
			VisitorsPhoto vp=new VisitorsPhoto();
			vp.setVisitorsid(visitorsid);
			if(file!=null && !file.isEmpty()){
				byte[] visitorsphoto=ImageSizeUtil.getFileBytes(file);
				vp.setPhotodata(visitorsphoto);
			}
			i=vpm.insertSelective(vp);
			//判断访客是否发卡
			if(!"".equals(record.getCarno()) && record.getCarno()!=null){
				CardData cd=new CardData();
				cd.setCardno(cdm.queryVCardNo());
				cd.setCardid(record.getCarno());
				cd.setHolderno("V_"+visitorsid);
				cd.setEffectivedate(record.getStartdate());
				cd.setExpiredate(record.getEnddate());
				i=cdm.insertSelective(cd);
			}
			Date date=new Date();
			Date enddate=record.getEnddate();
			Date startdate=record.getStartdate();
			if(!date.before(enddate)){
				return i;
			}
			//权限下发记录表
			if(i>0 && (record.getApplystatus().equals("20") || record.getApplystatus()=="20")){
				String doorarr=record.getDoorarr();
				if(!"".equals(doorarr) && doorarr!=null){
					String[] doornos=doorarr.split(",");
					for(int k=0;k<doornos.length;k++){
						DoorPermHolderRecord dp=new DoorPermHolderRecord();
						Integer deviceno=dpm.getByDoor(Integer.valueOf(doornos[k]));
						dp.setDeviceno(deviceno);
						dp.setDoorno(Integer.valueOf(doornos[k]));
						dp.setHolderno("V_"+visitorsid);
						dp.setCardid(record.getCarno());
						dp.setUpdatedate(new Date());
						dp.setUpdateperson(holderno);
						dp.setUpdatestatus("A");
						dp.setHoldername(record.getVisitorsname());
						dp.setStartdate(startdate);
						dp.setEnddate(enddate);
						i=dpm.insertSelective(dp);
					}
				}
				
			}
		}
		return i;		
	}//end
	
	
	@Override@Transactional
	public int insertVisitorsInfoAndPhotoByWechat(MultipartFile photo,VisitorsInfo record) throws IOException{
		//添加访客和对应访客照片
		record.setApplystatus("10");
		record.setApplystatusname("待审核");
		record.setDeleted(false);
		UUID uuid=UUID.randomUUID();
		record.setRowguid(uuid.toString());
		record.setVisitorsdate(new Date());
		record.setFilldate(new Date());
		int i=vim.insertSelective(record);
		if(i>0){
			Integer visitorsid=record.getId();
			VisitorsPhoto vp=new VisitorsPhoto();
			vp.setVisitorsid(visitorsid);
			if(photo!=null && !photo.isEmpty()){
				byte[] visitorsphoto=ImageSizeUtil.getFileBytes(photo);
				vp.setPhotodata(visitorsphoto);
			}
			i=vpm.insertSelective(vp);
		}
		return i;
	}

	@Override
	public Map<String,Object> queryByPrimaryKeyService(Integer id) {
		// 通过主键查询
		return vim.queryByPrimaryKey(id);
	}//end

	@Override
	public List<Map<String, Object>> queryVisitorsInfoListService(Map m) {
		// 访客登记记录查询列表
		return vim.queryVisitorsInfoList(m);
	}//end
	
	@Override
	public List<Map<String, Object>> queryVisitorsInfoListByPageService(Map m, PageInfo pageinfo) {
		//分页查询  访客登记记录查询列表
	    PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
	    List<Map<String, Object>> list=vim.queryVisitorsInfoList(m);
	    com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
	    long total=p.getTotal();
	    int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():(total/pageinfo.getPageSize()+1));
	    pageinfo.setTotalPage(totalPage);
	    pageinfo.setSumCount((int) total);
		return list;
	}//end


	@Override
	public List<Map<String, Object>> queryVisitorsInfoIORecordListService(Map m) {
		// 访客进出记录查询列表
		return vim.queryVisitorsInfoIORecordList(m);
	}//end 
	
	@Override
	public List<Map<String, Object>> queryVisitorsInfoIORecordListByPageService(Map m, PageInfo pageinfo) {
		//分页查询  访客进出记录查询列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=vim.queryVisitorsInfoIORecordList(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():(total/pageinfo.getPageSize()+1));
	    pageinfo.setTotalPage(totalPage);
	    pageinfo.setSumCount((int) total);
		return list;
	}//end

	@Override
	public List<Map<String,Object>> queryVisitoredHolderByNameService(String str) {
		// 根据姓名查被访人员信息
		return vim.queryVisitoredHolderByName(str);
	}//end

	@Override
	public List<Map<String,Object>> queryVisitorsInfoByIDCardNoService(Map m) {
		// 根据身份证号查访客
		return vim.queryVisitorsInfoByIDCardNo(m);
	}//end

	@Override
	public List<Map<String,Object>> queryVisitorsInfoByHolderAndUnauditedService(Map m,PageInfo pageinfo) {
		// 根据登录人工号 查待审批的访客消息
		PageHelper.startPage(pageinfo.getPageIndex(),pageinfo.getPageSize());
		List<Map<String,Object>> list=vim.queryVisitorsInfoByHolderAndUnaudited(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}
	
	@Override
	public  List<Map<String,Object>> queryVisitorsInfoByHolderAndAuditedService(Map m,PageInfo pageinfo) {
		// 根据登录人工号 查已审批的所有的访客信息
		PageHelper.startPage(pageinfo.getPageIndex(),pageinfo.getPageSize());
		List<Map<String,Object>> list=vim.queryVisitorsInfoByHolderAndAudited(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}

	@Override
	public int updateVisitorsApplyStatusService(VisitorsInfo record,String holderno) {
		// 访客申请审批 同意或不同意
		//int i=vim.updateVisitorsApplyStatus(record);
		Integer id=record.getId();
		int i=vim.updateByPrimaryKeySelective(record);
		record=vim.selectByPrimaryKey(id);
		id=record.getId();
		Date enddate=record.getEnddate();
		Date startdate=record.getStartdate();
		Date date=new Date();
		if(!date.before(enddate)){
			return i;
		}
		//权限下发记录表
		if(i>0 && (record.getApplystatus().equals("20") || record.getApplystatus()=="20")){
			String doorarr=record.getDoorarr();
			if(!"".equals(doorarr) && doorarr!=null){
				String[] doornos=doorarr.split(",");
				for(int k=0;k<doornos.length;k++){
					DoorPermHolderRecord dp=new DoorPermHolderRecord();
					Integer deviceno=dpm.getByDoor(Integer.valueOf(doornos[k]));
					dp.setDeviceno(deviceno);
					dp.setDoorno(Integer.valueOf(doornos[k]));
					dp.setHolderno("V_"+id);
					dp.setCardid(record.getCarno());
					dp.setUpdatedate(new Date());
					dp.setUpdateperson(holderno);
					dp.setUpdatestatus("A");
					dp.setHoldername(record.getVisitorsname());
					dp.setStartdate(startdate);
					dp.setEnddate(enddate);
					i=dpm.insertSelective(dp);
				}
			}
			
		}
		
		return i;
	}
	

	@Override
	public List<Map<String,Object>> queryVisitorsInfoByLoginHolderService(Map m,PageInfo pageinfo) {
		//根据登录人工号 查待自己所有的访客信息
		PageHelper.startPage(pageinfo.getPageIndex(),pageinfo.getPageSize());
		List<Map<String,Object>> list=vim.queryVisitorsInfoByLoginHolder(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}


	@Override
	public Map<String, Object> queryVisitorsByNameAndPhoneService(Map m) {
		//根据访客姓名和电话查是否已有历史信息
		return vim.queryVisitorsByNameAndPhone(m);
	}


	@Override
	public List<Map<String, Object>> queryVisitorsListByNameAndPhoneService(Map m,PageInfo pageinfo) {
		//根据访客姓名和电话查是否已有历史信息
		PageHelper.startPage(pageinfo.getPageIndex(),pageinfo.getPageSize());
		List<Map<String, Object>> list=vim.queryVisitorsListByNameAndPhone(m);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}


	@Override
	public Map<String, Object> queryVisitorsInfoByOpenIdService(Map m) {
		// 根据openid查是否已有历史信息
		return vim.queryVisitorsInfoByOpenId(m);
	}


	@Override
	public List<Map<String, Object>> getVDoorPermService(List<Short> list) {
		//通过门区编号查名称  查询访客的可进门区列表
		return vim.getVDoorPerm(list);
	}


	@Override
	public Map<String, Object> getDoorArrByIdService(Map m) {
		// 根据id查doorarr
		return vim.getDoorArrById(m);
	}


	@Override
	public Map<String, Object> getVisitorsIORecordService(Map<String, Object> m) {
		//访客进出记录 详情查看
		return vim.getVisitorsIORecord(m);
	}


	 
	
	

	

}
