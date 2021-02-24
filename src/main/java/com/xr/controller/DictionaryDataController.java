package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.DictionaryData;
import com.xr.entity.PageInfo;
import com.xr.service.IDictionaryDataService;

@Controller
@RequestMapping("DictionaryData")
public class DictionaryDataController {

	@Autowired
	private IDictionaryDataService idds;
	
	/*修改字典*/
	@RequestMapping("/updateDictionaryData")
	@ResponseBody
	public Map<String,Object> updateDictionaryDataController(DictionaryData record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=idds.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason","更新字典成功!");
			}else{
				map.put("flag", false);
				map.put("reason","更新字典失败!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*添加字典*/
	@RequestMapping("/insertDictionaryData")
	@ResponseBody
	public Map<String,Object> insertDictionaryDataController(DictionaryData record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try {
			int i=idds.insertSelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason","添加字典成功!");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason","添加字典失败!");
			}
		} catch (Exception e) {
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	/*查询字典列表*/
	@RequestMapping("queryDictionaryDataListByPage")
	@ResponseBody
	public Map<String,Object> queryDictionaryDataListByPageController( DictionaryData record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			
			List<DictionaryData> list=idds.queryDictListByPageService(record,pageinfo);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
				map.put("page", pageinfo.getPageIndex());
				map.put("limit", pageinfo.getPageSize());
				map.put("total", pageinfo.getSumCount());
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	/*查询字典列表*/
	@RequestMapping("/queryDictDataList")
	@ResponseBody
	public Map<String,Object> queryDictDataListController(DictionaryData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<DictionaryData> list=idds.queryDictListService(record);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*批量删除字典数据*/
	@RequestMapping("/deleteDictionaryDataBatch")
	@ResponseBody
	public Map<String,Object> deleteDictionaryDataBatchController(Integer[] ids,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=idds.deleteDictionaryDataBatchService(ids);
			if(i>0){
				map.put("flag", true);
				map.put("reason","删除成功!");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason","删除失败!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 数据大屏获取标题接口
	 * @param map
	 * @return
	 */
	@RequestMapping("/getScreenFullTitle")
	@ResponseBody
	public Map<String,Object> getScreenFullTitle(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = idds.getScreenFullTitle(map);
		return resultMap;
	}
	
	/**
	 * 数据大屏修改标题接口
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateScreenFullTitle")
	@ResponseBody
	public Map<String,Object> updateScreenFullTitle(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = idds.updateScreenFullTitle(map);
		return resultMap;
	}
}
