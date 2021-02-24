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

import com.xr.entity.MaterialData;
import com.xr.entity.Material_SDData;
import com.xr.entity.PageInfo;
import com.xr.entity.WareHouseData;
import com.xr.service.IACL_RolesService;
import com.xr.service.IMaterial_SDDataService;
import com.xr.service.IWareHouseDataService;

@Controller
@RequestMapping("Material_SDData")
public class Material_SDDataController {

	@Autowired
	private IMaterial_SDDataService imsds;
	@Autowired
	private IWareHouseDataService iws;
	@Autowired
	private IACL_RolesService irs;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/queryMaterialSDData")
	@ResponseBody
	public Map<String,Object> queryMaterialSDDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Material_SDData materialSDData=imsds.selectByPrimaryKeyService(datano);
			if(materialSDData!=null && !"".equals(materialSDData)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", materialSDData);
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
	@RequestMapping("/deleteMaterialSDData")
	@ResponseBody
	public Map<String,Object> deleteMaterialSDDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=imsds.deleteByPrimaryKeyService(datano);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除数据成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "删除数据失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/updateMaterialSDData")
	@ResponseBody
	public Map<String,Object> updateMaterialSDDataController(Integer datano,String delreason,String holderno,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=imsds.updateByPrimaryKeySelectiveService(datano,delreason,holderno);
			 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	/* 入库  添加数据 管理员或有权限之人  */
	@RequestMapping("/insertMaterialSDData")
	@ResponseBody
	public Map<String,Object> insertMaterialSDDataController(Material_SDData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setCreateperson(holderno);
				record.setOperator(holderno);
			}
			int i=imsds.insertService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "添加失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	
	
	/*
	 * 查询原材料出入库订单对应的物品列表信息 条件可有可无*/
	@RequestMapping("queryMaterialSDDataListByPage")
	@ResponseBody
	public Map<String,Object> queryMaterialSDDataListByPageController(Material_SDData record,PageInfo pageinfo,String str,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> map1=new HashMap<String,Object>();
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
			if(lis.size()==0 || lis==null){
				warecodes.add(0);
			}else{
				for(int i=0;i<lis.size();i++){
					warecodes.add(lis.get(i).getWarecode());
				}
			}
			
			map.put("pageinfo", pageinfo);
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
			List<Map<String,Object>> list=imsds.queryMaterialSDDataListByPageService(map1,pageinfo);
			if(list.size()>0){
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
	
	/*
	 * 查询原材料出入库订单对应的物品列表信息 条件可有可无*/
	@RequestMapping("queryMaterialSDDataList")
	@ResponseBody
	public Map<String,Object> queryMaterialSDDataListListController(Material_SDData record,String str,HttpServletRequest request){
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
				map.put("flag", false);
				map.put("reason", "对不起，你所拥有的部门下仓库为空！");
				return map;
			}
			for(int i=0;i<lis.size();i++){
				warecodes.add(lis.get(i).getWarecode());
			}
			map.put("list", warecodes);
			List<Map<String,Object>> list=imsds.queryMaterialSDDataListService(map);
			if(list.size()>0){
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
	
	
	/* 查询原材料入库单号  自动生成  */
	@RequestMapping("/queryMaterial_RK_CK_OrderNoByAuto")
	@ResponseBody
	public Map<String,Object> queryMaterial_RK_CK_OrderNoByAutoController(HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		Date date=new Date();
		 SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MMdd-HHm-mss");
		 String holderno=(String) request.getSession().getAttribute("holderno");
		 String in_sdbill="M-RK-"+holderno+"-"+sdf.format(date);
		 String out_sdbill="M-CK-"+holderno+"-"+sdf.format(date);
		 map.put("in_sdbill", in_sdbill);
		 map.put("out_sdbill", out_sdbill);
		return map;
	}//end
	
	/*原材料出入库  添加订单    以及 订单对应的物品  批量插入 */
	@RequestMapping("/insertMaterialSDDataBatch")
	@ResponseBody
	public Map<String,Object> insertMaterialSDDataBatchController(@RequestBody ArrayList<Material_SDData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=imsds.insertMaterialSDDataBatchService(list);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*原材料出库  添加订单    以及 订单对应的物品  批量插入 */
	@RequestMapping("/outMaterialSDDataBatch")
	@ResponseBody
	public Map<String,Object> outMaterialSDDataBatchController(@RequestBody ArrayList<Material_SDData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Material_SDData> lis=new ArrayList<Material_SDData>();
		try{
			map=imsds.outMaterialSDDataBatchService(list);
	    }catch(Exception ex){
		   map.put("flag", false);
		   map.put("reason", "程序异常，出库数量大于库存数量了！");
	    }
		return map;
	}//end
	
	/*查询动态库存量*/
	@RequestMapping("/queryMaterialSDStockList")
	@ResponseBody
	public Map<String,Object> queryMaterialSDStockListController( MaterialData record, PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map.put("pageinfo", pageinfo);
			List<Map<String,Object>> list=imsds.queryMaterialSDStockListByPageService(record,pageinfo);
			if(list.size()>0){
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
	
	/*根据仓库和条码查库存量*/
	@RequestMapping("/queryMaterialSDStockByItemCodeAndWareCode")
	@ResponseBody
	public Map<String,Object> queryMaterialSDStockByItemCodeAndWareCodeController(Material_SDData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>>  msd=imsds.queryMaterialSDStockByItemCodeAndWareCodeService(record);
			if(msd.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", msd);
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
