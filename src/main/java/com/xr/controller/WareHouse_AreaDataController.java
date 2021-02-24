package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.Material_SDData;
import com.xr.entity.PageInfo;
import com.xr.entity.Product_SDData;
import com.xr.entity.SpareParts_SDData;
import com.xr.entity.WareHouseData;
import com.xr.entity.WareHouse_AreaData;
import com.xr.service.IACL_RolesService;
import com.xr.service.IMaterial_SDDataService;
import com.xr.service.IProduct_SDDataService;
import com.xr.service.ISpareParts_SDDataService;
import com.xr.service.IWareHouseDataService;
import com.xr.service.IWareHouse_AreaDataService;

@Controller
@RequestMapping("WareHouse_AreaData")
public class WareHouse_AreaDataController {
	@Autowired
	private IWareHouse_AreaDataService iwhas;
	@Autowired
	private ISpareParts_SDDataService isps;
	@Autowired
	private IMaterial_SDDataService ims;
	@Autowired
	private IProduct_SDDataService ips;
	@Autowired
	private IWareHouseDataService iws;
	@Autowired
	private IACL_RolesService irs;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/queryWareHouseArea")
	@ResponseBody
	public Map<String,Object> queryWareHouseAreaController(Integer areacode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			WareHouse_AreaData wareHouseArea=iwhas.selectByPrimaryKeyService(areacode);
			if(wareHouseArea!=null && !"".equals(wareHouseArea)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", wareHouseArea);
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
	
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/updateWareHouseAreaData")
	@ResponseBody
	public Map<String,Object> updateWareHouseAreaController(WareHouse_AreaData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iwhas.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 新增仓库区域 管理员或有权限之人  */
	@RequestMapping("/insertWareHouseArea")
	@ResponseBody
	public Map<String,Object> insertWareHouseAreaController(WareHouse_AreaData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iwhas.insertService(record);
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
	
	/*查询仓库区域列表   管理员或有权限之人*/
	@RequestMapping("/queryWareHouseAreaListByPage")
	@ResponseBody
	public Map<String,Object> queryWareHouseAreaListByPageController(WareHouse_AreaData record, PageInfo pageinfo,WareHouseData w,HttpServletRequest request,String str){
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
			map.put("pageinfo", pageinfo);
			map.put("areaname", record.getAreaname());
			map.put("warename", w.getWarename());
			List<Map<String,Object>> list=iwhas.queryWareHouseAreaListByPageService(map,pageinfo);
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
	

	/*查询仓库区域列表   管理员或有权限之人*/
	@RequestMapping("/queryWareHouseAreaList")
	@ResponseBody
	public Map<String,Object> queryWareHouseAreaListController(WareHouse_AreaData record,WareHouseData w,HttpServletRequest request,String str){
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
			List<Map<String,Object>> list=iwhas.queryWareHouseAreaListService(map);
			if(list.size()==0){
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}else{
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*通过查询仓库查询仓库区域列表   管理员或有权限之人*/
	@RequestMapping("/queryAreaCodeListByWareCode")
	@ResponseBody
	public Map<String,Object> queryAreaCodeListByWareCodeController(Integer warecode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<WareHouse_AreaData> list=iwhas.queryAreaCodeListByWareCodeService(warecode);
			if(list==null || list.size()==0){
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
				map.put("result", null);
			}else{
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	

	/* 删除数据 管理员或有权限之人  */
	@RequestMapping("/deleteWareHouseArea")
	@ResponseBody
	public Map<String,Object> deleteWareHouseAreaController(Integer areacode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			SpareParts_SDData spd=new SpareParts_SDData();
			spd.setAreacode(areacode);
			List<SpareParts_SDData> list=isps.querySparePartsSDDataListByWareCodeService(spd);
			Material_SDData md=new Material_SDData();
			md.setAreacode(areacode);
			List<Material_SDData> lis=ims.queryMaterialSDDataListByWareCodeService(md);
			Product_SDData psd=new Product_SDData();
			psd.setAreacode(areacode);
			List<Product_SDData> lit=ips.queryProductSDDataListByWareCodeService(psd);
			if(list.size()>0 || lis.size()>0 || lit.size()>0){
				map.put("flag", false);
				map.put("reason", "删除失败，该仓库在出入库中已有记录！");
			}else{
				int i=iwhas.deleteByPrimaryKeyService(areacode);
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 批量删除*/
	@RequestMapping("/deleteAreaHouseBatch")
	@ResponseBody
	public Map<String,Object> deleteAreaHouseBatchController(@RequestBody List<WareHouse_AreaData> list){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Integer> lis=new ArrayList<Integer>();
		try{
			for(int k=0;k<list.size();k++){
				Integer areacode=list.get(k).getAreacode();
				SpareParts_SDData spd=new SpareParts_SDData();
				spd.setAreacode(areacode);
				List<SpareParts_SDData> lit1=isps.querySparePartsSDDataListByWareCodeService(spd);
				Material_SDData md=new Material_SDData();
				md.setAreacode(areacode);
				List<Material_SDData> lit2=ims.queryMaterialSDDataListByWareCodeService(md);
				Product_SDData psd=new Product_SDData();
				psd.setAreacode(areacode);
				List<Product_SDData> lit3=ips.queryProductSDDataListByWareCodeService(psd);
				boolean res=false;
				if(lit1.size()>0 || lit2.size()>0 || lit3.size()>0){
					res=false;
				}else{
					res=true;
				}
				if(res){
					lis.add(areacode);
				}
			}
			if(lis.size()>0){
				int i=iwhas.deleteAreaHouseBatchService(lis);
				map.put("flag", true);
				map.put("reason", "批量删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "批量删除失败，该分区在出入库中已有记录！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
}
