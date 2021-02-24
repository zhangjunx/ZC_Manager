package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.LH_FaceRecogParam;
import com.xr.entity.PageInfo;
import com.xr.service.ILH_FaceRecogParamService;
import com.xr.tool.ImageSizeUtil;

@Controller
@RequestMapping("LH_FaceRecogParam")
public class LH_FaceRecogParamController {

	@Autowired
	private ILH_FaceRecogParamService ifps;
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	 
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,Object> delete(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ifps.deleteByPrimaryKeyService(id);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 更新
	 * @param record
	 * @param request
	 * @return
	 */
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> updateLH_FaceRecogParamController(LH_FaceRecogParam record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ifps.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
				map.put("result", record);
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 添加
	 * @param record
	 * @return
	 */
	@RequestMapping("/insert")
	@ResponseBody
	public Map<String,Object> insert(LH_FaceRecogParam record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ifps.insertSelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
				map.put("result", record);
			}else{
				map.put("flag", false);
				map.put("reason", "添加失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	
	/**
	 * 分页查询
	 * @param record
	 * @param pageinfo
	 * @returngetFaceRecogParamList
	 */
	 
	@RequestMapping("/getFaceParamList")
	@ResponseBody
	public Map<String,Object> getFaceParamList(PageInfo pageinfo,LH_FaceRecogParam record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("title", record.getTitle());
			List<Map<String,Object>> list=ifps.getFaceParamListService(pageinfo,m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("page", pageinfo.getPageIndex());
				map.put("limit", pageinfo.getPageSize());
				map.put("total", pageinfo.getSumCount());
			}else{
				map.put("flag", false);
				map.put("reason", "查询成功！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	

	
	
}
