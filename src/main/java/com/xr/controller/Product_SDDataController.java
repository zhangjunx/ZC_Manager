package com.xr.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.PageInfo;
import com.xr.entity.ProductData;
import com.xr.entity.ProductStockData;
import com.xr.entity.Product_SDData;
import com.xr.entity.WareHouseData;
import com.xr.service.IACL_RolesService;
import com.xr.service.IProduct_SDDataService;
import com.xr.service.IWareHouseDataService;

@Controller
@RequestMapping("Product_SDData")
public class Product_SDDataController {

	@Autowired
	private IProduct_SDDataService ipsdds;
	@Autowired
	private IWareHouseDataService iws;
	@Autowired
	private IACL_RolesService irs;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/queryProductSDData")
	@ResponseBody
	public Map<String,Object> queryProductSDDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Product_SDData productSDData=ipsdds.selectByPrimaryKeyService(datano);
			if(productSDData!=null && !"".equals(productSDData)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", productSDData);
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
	@RequestMapping("/deleteProductSDData")
	@ResponseBody
	public Map<String,Object> deleteProductSDDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ipsdds.deleteByPrimaryKeyService(datano);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/updateProductSDData")
	@ResponseBody
	public Map<String,Object> updateProductSDDataController(Integer datano,String delreason,String holderno,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ipsdds.updateByPrimaryKeySelectiveService(datano,delreason,holderno);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 添加数据 管理员或有权限之人  */
	@RequestMapping("/insertProductSDData")
	@ResponseBody
	public Map<String,Object> insertProductSDDataController(Product_SDData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setOperator(holderno);
				record.setCreateperson(holderno);
			}
			int i=ipsdds.insertService(record);
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
	 * 查询成品订单列表信息 条件可有可无*/
	@RequestMapping("queryProductSDDataListByPage")
	@ResponseBody
	public Map<String,Object> queryProductSDDataListByPageController(Product_SDData record,PageInfo pageinfo,String str,HttpServletRequest request,HttpSession session){
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
			if(lis.size()==0){
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
			map1.put("itemcode", record.getItemcode());
			map1.put("itemname", record.getItemname());
			map1.put("unitname", record.getUnitname());
			map1.put("sdstatus", record.getSdstatus());
			//map1.put("areacode", record.getAreacode());
			List<Map<String,Object>> list=ipsdds.queryProductSDDataListByPageService(map1,pageinfo);
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
	 * 查询成品订单列表信息 条件可有可无*/
	@RequestMapping("queryProductSDDataList")
	@ResponseBody
	public Map<String,Object> queryProductSDDataListController(Product_SDData record,HttpServletRequest request,HttpSession session){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		List<WareHouseData> lis=null;
		List<String> deptnos=null;
		List<Integer> warecodes=new ArrayList<Integer>();
		try{
			deptnos=(List<String>) request.getSession().getAttribute("deptnos");
			if(deptnos==null || deptnos.size()==0){
				map.put("flag", false);
				map.put("reason", "对不起，你所拥有的角色尚未分配部门！");
				return map;
			}
			map.put("list", deptnos);
			lis=iws.queryWareHouseListService(map);
			if(lis.size()==0){
				map.put("flag", false);
				map.put("reason", "对不起，你所拥有的部门尚未分配仓库！");
				return map;
			}
			for(int i=0;i<lis.size();i++){
				warecodes.add(lis.get(i).getWarecode());
			}
			map.put("list", warecodes);
			List<Map<String,Object>> list=ipsdds.queryProductSDDataListService(map);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
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
	
	/* 查询成品出入库单号  自动生成  */
	@RequestMapping("/queryProduct_RK_CK_OrderNoByAuto")
	@ResponseBody
	public Map<String,Object> queryProduct_RK_CK_OrderNoByAutoController(HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		 Date date=new Date();
		 SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd-HHmmss");
		 String holderno=(String) request.getSession().getAttribute("holderno");
		 String in_sdbill="P-RK-"+holderno+"-"+sdf.format(date);
		 String out_sdbill="P-CK-"+holderno+"-"+sdf.format(date);
		 map.put("in_sdbill", in_sdbill);
		 map.put("out_sdbill", out_sdbill);
		return map;
	}//end
	
	/*原材料出入库  添加订单    以及 订单对应的物品  批量插入 */
	@RequestMapping("/insertProductSDDataBatch")
	@ResponseBody
	public Map<String,Object> insertProductSDDataBatch(@RequestBody ArrayList<Product_SDData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ipsdds.insertProductSDDataBatchService(list);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*原材料出入库  添加订单    以及 订单对应的物品  批量插入 */
	@RequestMapping("/outProductSDDataBatch")
	@ResponseBody
	public Map<String,Object> outProductSDDataBatchController(@RequestBody ArrayList<Product_SDData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=ipsdds.outProductSDDataBatchService(list);
		}catch(Exception e){
			System.out.println(e);
			map.put("flag", false);
			map.put("reason", "出库失败，出库数量大于库存数量了！");
		}
		return map;
	}//end
	
	/*查询动态库存量*/
	@RequestMapping("/queryProductSDStockList")
	@ResponseBody
	public Map<String,Object> queryProductSDStockListController( ProductData record, PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map.put("pageinfo", pageinfo);
			List<Map<String,Object>> list=ipsdds.queryProductSDStockListByPageService(record,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
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
	@RequestMapping("/queryProductSDStockByItemCodeAndWareCode")
	@ResponseBody
	public Map<String,Object> queryProductSDStockByItemCodeAndWareCodeController(ProductStockData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> spd=ipsdds.queryProductSDStockByItemCodeAndWareCodeService(record);
			if(spd.size()>0){
				map.put("flag", true);
				map.put("reason", "查询库存成功！");
				map.put("result", spd);
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
	
	/*出入库时 下拉选择部门   查人员*/
	@RequestMapping("/queryHolderListByDeptno")
	@ResponseBody
	public Map<String,Object> queryHolderListByDeptno(String departmentno,HttpServletResponse resp){
		//resp.setHeader("", value);
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=ipsdds.queryHolderListByDeptnoService(departmentno);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
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
}
