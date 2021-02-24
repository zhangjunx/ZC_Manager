package com.xr.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.VisitorsInfo;
import com.xr.entity.VisitorsPhoto;
import com.xr.service.IVisitorsPhotoService;
import com.xr.tool.ImageSizeUtil;

@Controller
@RequestMapping("VisitorsPhoto")
public class VisitorsPhotoController {
	@Autowired
	private IVisitorsPhotoService ivps;
	
	/*通过外来信息主键查外来人照片*/
	@RequestMapping("/queryPhoto")
	@ResponseBody
	public Map<String,Object> queryPhoto(Integer visitorsid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			VisitorsPhoto vp=ivps.queryPhotoService(visitorsid);
			if(vp!=null){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", vp);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*添加访客 访客登记*/
	@RequestMapping("/insertVisitorsInfoAndPhoto")
	@ResponseBody
	public Map<String,Object> insertVisitorsInfoAndPhotoController(@RequestParam("photo") MultipartFile file,VisitorsInfo record){
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		try{
			VisitorsPhoto vp=new VisitorsPhoto();
			vp.setVisitorsid(record.getId());
			if(!file.isEmpty()){
				//byte[] photodata=file.getBytes();
				byte[] photodata=ImageSizeUtil.getFileBytes(file);
				vp.setPhotodata(photodata);
				i=ivps.insertSelectiveService(vp);
			}
			if(i>0){
				map.put("flag", true);
				map.put("reason", "访客登记成功！");
				map.put("result", record);
			}else{
				map.put("flag", false);
				map.put("reason", "访客登记失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end

}
