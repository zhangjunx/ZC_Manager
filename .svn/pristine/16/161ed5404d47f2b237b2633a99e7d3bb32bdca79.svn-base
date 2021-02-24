package com.xr.service.impl;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.dao.HolderDataMapper;
import com.xr.dao.HolderPhotoMapper;
import com.xr.entity.HolderData;
import com.xr.entity.HolderPhoto;
import com.xr.service.IHolderPhotoService;
import com.xr.tool.ImageSizeUtil;
@Service
public class HolderPhotoServiceImpl implements IHolderPhotoService {
	@Autowired
	private HolderPhotoMapper hpm;
	@Autowired
	private HolderDataMapper hdm;
	 
	@Override
	public Map<String,Object> queryPhotoService(String holderno) {
		// /根据员工编号 查询照片
		Map<String,Object> map=new HashMap<String,Object>();
		HolderPhoto holderphoto=hpm.queryPhoto(holderno);
		 if(holderphoto!=null && !"".equals(holderphoto)){
			 map.put("flag", true);
			 map.put("reason", "查询照片成功！");
			 map.put("result", holderphoto);
		 }else{
			 map.put("flag", false);
			 map.put("reason", "查询照片失败！");
		 }
		return map;
	}

	@Override
	public Map<String,Object> updatePhotoService(MultipartFile file,HolderPhoto holderphoto) throws IOException {
		// 根据员工编号 更新照片
		Map<String,Object> map=new HashMap<String,Object>();
		if(!file.isEmpty()){
			//byte[] photo=file.getBytes();
			byte[] photo=ImageSizeUtil.getFileBytes(file);
			holderphoto.setDataphoto(photo);
		}
		int i=hpm.updatePhoto(holderphoto);
		if(i>0){
			HolderData record=new HolderData();
			record.setHolderno(holderphoto.getHolderno());
			record.setUpdatedate(new Date());
			i=hdm.updateByPrimaryKeySelective(record);
		}
		if(i>0){
			map.put("flag", true);
			map.put("reason", "更新照片成功！");
		}else{
			map.put("flag", false);
			map.put("reason", "更新照片失败！");
		}
		return map;
	}
	
	/*@Override@Transactional
	public Map<String,Object> updateHolderInfoAndPhotoService(MultipartFile file,HolderData record) throws IOException {
		// 根据员工编号 更新照片
		Map<String,Object> map=new HashMap<String,Object>();
		int i=hdm.updateByPrimaryKeySelective(record);
		String holderno=record.getHolderno();
		HolderPhoto hp=hpm.queryPhoto(holderno);
		if(!file.isEmpty()){
			byte[] photo=file.getBytes();
			hp.setDataphoto(photo);
		}
		i=hpm.updatePhoto(hp);
		if(i>0){
			map.put("flag", true);
			map.put("reason", "更新信息成功！");
		}else{
			map.put("flag", false);
			map.put("reason", "更新信息失败！");
		}
		return map;
	}
*/
	/*@Override
	public HolderPhoto queryHolderPhotoService(String holderno) {
		// 通过工号查照片信息
		return hpm.queryHolderPhoto(holderno);
	}*/

}
