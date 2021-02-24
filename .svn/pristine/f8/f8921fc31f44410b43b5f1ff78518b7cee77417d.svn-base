package com.xr.service.impl;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.xr.dao.VisitorsInfoMapper;
import com.xr.dao.VisitorsPhotoMapper;
import com.xr.entity.VisitorsInfo;
import com.xr.entity.VisitorsPhoto;
import com.xr.service.IVisitorsPhotoService;
@Service
public class VisitorsPhotoServiceImpl implements IVisitorsPhotoService {

	@Autowired
	private VisitorsPhotoMapper vpm;
	@Autowired
	private VisitorsInfoMapper vm;
	@Override
	public VisitorsPhoto queryPhotoService(Integer visitorsid) {
		// 通过外来信息主键查外来人照片
		return vpm.queryPhoto(visitorsid);
	}
	
	@Transactional
	public int insertVisitorsInfoAndPhotoService(@RequestParam("photo") MultipartFile file,VisitorsInfo record) throws IOException {
		// 通过外来信息主键查外来人照片
		record.setApplystatus("10");
		record.setApplystatusname("待审核");
		record.setDeleted(false);
		UUID uuid=UUID.randomUUID();
		record.setRowguid(uuid.toString());
		record.setVisitorsdate(new Date());
		int i=vm.insertSelective(record);
		if(i>0){
			VisitorsPhoto vp=new VisitorsPhoto();
			vp.setVisitorsid(record.getId());
			if(!file.isEmpty()){
				vp.setPhotodata(file.getBytes());
				i=vpm.insertSelective(vp);
			}
		}
		return i;
	}//end

	@Override
	public int insertSelectiveService(VisitorsPhoto record) {
		//添加外来人照片
		return vpm.insertSelective(record);
	}

	@Override
	public Map<String, Object> getPhotoService(Map m) {
		// 根据登记的记录id visitorsid查照片
		return vpm.getPhoto(m);
	}
	

}
