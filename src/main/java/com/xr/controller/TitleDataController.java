package com.xr.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.HolderData;
import com.xr.entity.PageInfo;
import com.xr.entity.TitleData;
import com.xr.service.IHolderDataService;
import com.xr.service.ITitleDataService;

@Controller
@RequestMapping("TitleData")
public class TitleDataController {

	@Autowired
	private ITitleDataService itds;
	@Autowired
	private IHolderDataService ihds;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/queryTitleData")
	@ResponseBody
	public Map<String,Object> queryTitleDataController(String titleno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			TitleData titleData=itds.selectByPrimaryKeyService(titleno);
			if(titleData!=null && !"".equals(titleData)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", titleData);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
				map.put("result", null);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 删除数据 管理员或有权限之人  */
	@RequestMapping("/deleteTitleData")
	@ResponseBody
	public Map<String,Object> deleteTitleDataController(String titleno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<HolderData> list=ihds.queryHolderByTitleNoService(titleno);
			if(list.size()>0){
				map.put("flag", false);
				map.put("reason", "删除失败，该职务已被占用！");
				return map;
			}
			int i=itds.deleteByPrimaryKeyService(titleno);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/updateTitleData")
	@ResponseBody
	public Map<String,Object> updateTitleDataController(TitleData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String holderno=(String) request.getSession().getAttribute("holderno");
			record.setUpdateperson(holderno);
			record.setUpdatedate(new Date());
			int i=itds.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改数据成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "修改数据失败！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 添加数据 管理员或有权限之人  */
	@RequestMapping("/insertTitleData")
	@ResponseBody
	public Map<String,Object> insertSparePartsDataController(TitleData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setCreateperson(holderno);
			}
			String titleno=record.getTitleno();
			TitleData t=itds.selectByPrimaryKeyService(titleno);
			if(t!=null && !"".equals(t)){
				map.put("flag", false);
				map.put("reason", "添加失败,编码重复！");
				map.put("result", 0);
				return map;
			}
			int i=itds.insertService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "添加失败！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*
	 * 查询职位列表信息 条件可有可无*/
	@RequestMapping("/queryTitleDataListByPage")
	@ResponseBody
	public Map<String,Object> queryTitleDataListByPageController(@ModelAttribute TitleData record,@ModelAttribute PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		List<TitleData> list=null;
		try{
			map.put("pageinfo", pageinfo);
			list=itds.queryTitleDataListByPageService(record,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "查询成功！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*查询职位列表信息 条件可有可无*/
	@RequestMapping("/queryTitleDataList")
	@ResponseBody
	public Map<String,Object> queryTitleDataListController(@ModelAttribute TitleData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<TitleData> list=itds.queryTitleDataListService(record);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
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
	
	
	/*批量删除*/
	@RequestMapping("/deleteTitleDataBatch")
	@ResponseBody
	public Map<String,Object> deleteTitleDataBatchController(@RequestBody List<TitleData> list){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<String> lis=new ArrayList<String>();
			for(int k=0;k<list.size();k++){
				String titleno=list.get(k).getTitleno();
				List<HolderData> lit=ihds.queryHolderByTitleNoService(titleno);
				boolean res=false;
				if(lit.size()==0){
					res=true;
				}
				if(res){
					lis.add(titleno);
				}
			}
			if(lis.size()>0){
				int i=itds.deleteTitleDataBatchService(lis);
				map.put("flag", true);
				map.put("reason", "批量删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "批量删除失败，该职务已被占用！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*批量修改*/
	@RequestMapping("/updateTitleDataBatch")
	@ResponseBody
	public Map<String,Object> updateTitleDataBatchController(@RequestBody List<TitleData> list){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<String> lis=new ArrayList<String>();
			for(int k=0;k<list.size();k++){
				lis.add(list.get(k).getTitleno());
			}
			int i=itds.updateTitleDataBatchService(lis);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量修改成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "批量修改失败！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*批量修改 多个数据*/
	@RequestMapping("/updateTitleDataBatchs")
	@ResponseBody
	public Map<String,Object> updateTitleDataBatchsController(@RequestBody List<TitleData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<TitleData> lis=new ArrayList<TitleData>();
			for(int i=0;i<list.size();i++){
				TitleData titledata=list.get(i);
				titledata.setUpdatedate(new Date());
				if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
					titledata.setUpdateperson((String)request.getSession().getAttribute("holderno"));
				}
				lis.add(titledata);
			}
			int i=itds.updateTitleDataBatchsService(lis);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量修改成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "批量修改失败！");
				map.put("result", 0);
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
}
