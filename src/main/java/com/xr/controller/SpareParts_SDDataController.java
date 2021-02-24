package com.xr.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.PageInfo;
import com.xr.entity.SparePartsData;
import com.xr.entity.SpareParts_SDData;
import com.xr.entity.WareHouseData;
import com.xr.service.IACL_RolesService;
import com.xr.service.ISpareParts_SDDataService;
import com.xr.service.IWareHouseDataService;

/**
 * 备品备件_出入库的相关操作
 * @author csc
 * 交互层
 */
@Controller
@RequestMapping("SpareParts_SDData")
public class SpareParts_SDDataController {

	@Autowired
	private ISpareParts_SDDataService ispds;
	@Autowired
	private IWareHouseDataService iws;
	@Autowired
	private IACL_RolesService irs;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/querySparePartsSDData")
	@ResponseBody
	public Map<String,Object> querySparePartsSDDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			SpareParts_SDData sparePartsSDData=ispds.selectByPrimaryKeyService(datano);
			if(sparePartsSDData!=null && !"".equals(sparePartsSDData)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", sparePartsSDData);
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
	
	/* 删除数据 管理员或有权限之人  */
	@RequestMapping("/deleteProductSDData")
	@ResponseBody
	public Map<String,Object> deleteSparePartsSDDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ispds.deleteByPrimaryKeyService(datano);
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
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/updateSparePartsSDData")
	@ResponseBody
	public Map<String,Object> updateSparePartsSDDataController(Integer datano,String delreason,String holderno,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ispds.updateByPrimaryKeySelectiveService(datano,delreason,holderno);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 添加数据 管理员或有权限之人  */
	@RequestMapping("/insertSparePartsSDData")
	@ResponseBody
	public Map<String,Object> insertSparePartsSDDataController(SpareParts_SDData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setCreateperson(holderno);
				record.setOperator(holderno);
			}
			int i=ispds.insertService(record);
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
	 * 查询备品备件订单列表信息 条件可有可无*/
	@RequestMapping("/querySparePartsSDDataListByPage")
	@ResponseBody
	public Map<String,Object> querySparePartsSDDataListByPageController( SpareParts_SDData record,PageInfo pageinfo,String str,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		Map<String,Object> map1=new HashMap<String,Object>();
		List<Integer> warecodes=new ArrayList<Integer>();
		try{
			List<String> deptnos=new ArrayList<String>();
			List<Map<String,Object>> list1=irs.queryDeptNoListByLoginPersonService(str);
			if(list1.size()>0){
				for(int i=0;i<list1.size();i++){
					deptnos.add(list1.get(i).get("deptno").toString());
				}
			}else{
				deptnos.add("000");
			}
			ma.put("list", deptnos);
			List<WareHouseData> lis=iws.queryWareHouseListService(ma);
			if(lis.size()==0 || lis==null){
				warecodes.add(0);
			}else{
				for(int i=0;i<lis.size();i++){
					warecodes.add(lis.get(i).getWarecode());
				}
			}
			
			map1.put("list", warecodes);
			map1.put("sdbill", record.getSdbill());
			map1.put("startdate", record.getStartdate());
			map1.put("enddate", record.getEnddate());
			map1.put("sdperson", record.getSdperson());
			map1.put("sdpersondept", record.getSdpersondept());
			map1.put("warecode", record.getWarecode());
			map1.put("itemname", record.getItemname());
			map1.put("unitname", record.getUnitname());
			map1.put("sdstatus", record.getSdstatus());
			//map1.put("areacode", record.getAreacode());
			map1.put("itemcode", record.getItemcode());
		   List<Map<String,Object>> list=ispds.querySparePartsSDDataListByPageService(map1,pageinfo);
		   if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				//map.put("pageIndex", pageinfo.getPageIndex());
				//map.put("pageSize", pageinfo.getPageSize());
				//map.put("sumCount", pageinfo.getSumCount());
				map.put("pageinfo", pageinfo);
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
	
	/*
	 * 查询备品备件订单列表信息 条件可有可无*/
	@RequestMapping("/querySparePartsSDDataList")
	@ResponseBody
	public Map<String,Object> querySparePartsSDDataListController(SpareParts_SDData record,String str,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		List<Integer> warecodes=new ArrayList<Integer>();
		try{
			List<String> deptnos=new ArrayList<String>();
			List<Map<String,Object>> list1=irs.queryDeptNoListByLoginPersonService(str);
			if(list1.size()>0){
				for(int i=0;i<list1.size();i++){
					deptnos.add(list1.get(i).get("deptno").toString());
				}
			}else{
				deptnos.add("000");
			}
			ma.put("list", deptnos);
			List<WareHouseData> lis=iws.queryWareHouseListService(ma);
			if(lis.size()==0){
				warecodes.add(0);
			}else{
				for(int i=0;i<lis.size();i++){
					warecodes.add(lis.get(i).getWarecode());
				}
			}
			map.put("list", warecodes);
			List<Map<String,Object>> list=ispds.querySparePartsSDDataListService(map);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
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
	
	/* 查询备品备件入库单号  自动生成  */
	@RequestMapping("/querySpareParts_RK_CK_OrderNoByAuto")
	@ResponseBody
	public Map<String,Object> querySpareParts_RK_CK_OrderNoByAutoController(HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		Date date=new Date();
		 SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MMdd-HHm-mss");
		 String holderno=(String) request.getSession().getAttribute("holderno");
		 String in_sdbill="SP-RK-"+holderno+"-"+sdf.format(date);
		 String out_sdbill="SP-CK-"+holderno+"-"+sdf.format(date);
		 map.put("in_sdbill", in_sdbill);
		 map.put("out_sdbill", out_sdbill);
		return map;
	}//end
	
	
	/*原材料出入库  添加订单    以及 订单对应的物品  批量插入 */
	@RequestMapping("/insertSparePartsSDDataBatch")
	@ResponseBody
	public Map<String,Object> insertSparePartsSDDataBatchController(@RequestBody ArrayList<SpareParts_SDData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ispds.insertSparePartsSDDataBatchService(list);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*原材料出库  添加订单    以及 订单对应的物品  批量插入 */
	@RequestMapping("/outSparePartsSDDataBatch")
	@ResponseBody
	public Map<String,Object> outSparePartsSDDataBatchController(@RequestBody ArrayList<SpareParts_SDData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ispds.outSparePartsSDDataBatchService(list);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "出库失败，出库数量大于库存数量了！");
		}
		return map;
	}//end
	
	/*动态查询库存量querySparePartsSDStockList*/
	@RequestMapping("/querySparePartsSDStockList")
	@ResponseBody
	public Map<String,Object> querySparePartsSDStockListController( SparePartsData record, PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map.put("pageinfo", pageinfo);
			List<Map<String,Object>> list=ispds.querySparePartsSDStockListByPageService(record,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询库存成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据仓库和条码查库存量*/
	@RequestMapping("/querySparePartsSDStockByItemCodeAndWare")
	@ResponseBody
	public Map<String,Object> querySparePartsSDStockByItemCodeAndWareController(SpareParts_SDData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> spd=ispds.querySparePartsSDStockByItemCodeAndWareCodeService(record);
			if(spd.size()>0){
				map.put("flag", true);
				map.put("reason", "查询库存成功！");
				map.put("result", spd);
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
	
}
