package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.DoorPermHolderRecord;
import com.xr.entity.PageInfo;
import com.xr.service.IDoorPermHolderRecordService;

@Controller
@RequestMapping("DoorPermHolderRecord")
public class DoorPermHolderRecordController {
	@Autowired
	private IDoorPermHolderRecordService idrs;
	
	/*查询*/
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> query(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			DoorPermHolderRecord record=idrs.selectByPrimaryKeyService(id);
			if(record!=null){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", record);
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
	
	/*查询权限下发记录列表*/
	@RequestMapping("/queryPermRecordList")
	@ResponseBody
	public Map<String,Object> queryPermRecordList(DoorPermHolderRecord record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("doorno", record.getDoorno());
			m.put("holderno", record.getHolderno());
			m.put("status", record.getStatus());
			List<Map<String, Object>> list=idrs.queryPermRecordListService(m,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("page", pageinfo.getPageIndex());
				map.put("limit", pageinfo.getPageSize());
				map.put("total", pageinfo.getSumCount());
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
	@RequestMapping("/deleteRecordBatch")
	@ResponseBody
	public Map<String,Object> deleteRecordBatch(@RequestBody List<Integer> arrlist){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=idrs.deleteRecordBatchService(arrlist);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！"+ex.getCause());
		}
		return map;
	}//end

}
