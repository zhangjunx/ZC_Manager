package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.PurchaseData;
import com.xr.service.IPurchaseDataService;


@Controller
@RequestMapping("PurchaseData")
public class PurchaseDataController {
	@Autowired
	private IPurchaseDataService ipds;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/queryPurchaseData")
	@ResponseBody
	public Map<String,Object> queryProductStockDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			PurchaseData purchaseData=ipds.selectByPrimaryKeyService(datano);
			if(purchaseData!=null && !"".equals(purchaseData)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", purchaseData);
			}else{
				map.put("flag", false);
				map.put("reason", "查询失败！");
				map.put("result", null);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 删除数据 管理员或有权限之人  */
	@RequestMapping("/deletePurchaseData")
	@ResponseBody
	public Map<String,Object> deletePurchaseDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ipds.deleteByPrimaryKeyService(datano);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除数据成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "删除数据失败！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			//map.put("reason", "删除数据失败！"+ex.getCause());
			map.put("reason", "删除失败，请联系管理员！");
		}
		return map;
	}//end
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/updatePurchaseData")
	@ResponseBody
	public Map<String,Object> updatePurchaseDataController(PurchaseData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ipds.updateByPrimaryKeySelectiveService(record);
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
			//map.put("reason", "修改数据失败！"+ex.getCause());
			map.put("reason", "修改失败，请联系管理员！");
		}
		return map;
	}//end
	
	/* 添加数据 管理员或有权限之人  */
	@RequestMapping("/insertPurchaseData")
	@ResponseBody
	public Map<String,Object> insertPurchaseDataController(PurchaseData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ipds.insertService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加数据成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "添加数据失败！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			//map.put("reason", "添加数据失败！"+ex.getCause());
			map.put("reason", "添加失败，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*
	 * 查询采购列表信息 条件可有可无*/
	@RequestMapping("queryPurchaseDataList")
	@ResponseBody
	public Map<String,Object> queryPurchaseDataListController(PurchaseData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<PurchaseData> list=ipds.queryPurchaseDataListService(record);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询数据列表成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "查询数据列表失败！");
				map.put("result", null);
			}
		}catch(Exception ex){
			map.put("flag", false);
			//map.put("reason", "查询数据列表失败！"+ex.getCause());
			map.put("reason", "查询失败，请联系管理员！");
		}
		return map;
	}//end
	
	

}
