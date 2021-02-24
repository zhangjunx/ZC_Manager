package com.xr.controller;

import java.util.ArrayList;
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

import com.xr.entity.Material_SDData;
import com.xr.entity.PageInfo;
import com.xr.entity.Product_SDData;
import com.xr.entity.SpareParts_SDData;
import com.xr.entity.WareHouseData;
import com.xr.service.IACL_RolesService;
import com.xr.service.IMaterial_SDDataService;
import com.xr.service.IProduct_SDDataService;
import com.xr.service.ISpareParts_SDDataService;
import com.xr.service.IWareHouseDataService;

@Controller
@RequestMapping("WareHouseData")
public class WareHouseDataController {
	@Autowired
	private IWareHouseDataService iwhds;
	@Autowired
	private ISpareParts_SDDataService isps;
	@Autowired
	private IMaterial_SDDataService ims;
	@Autowired
	private IProduct_SDDataService ips;
	@Autowired
	private IACL_RolesService irs;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/queryWareHouseData")
	@ResponseBody
	public Map<String,Object> queryWareHouseDataController(Integer areacode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			WareHouseData wareHouseData=iwhds.selectByPrimaryKeyService(areacode);
			if(wareHouseData!=null && !"".equals(wareHouseData)){
				map.put("flag", true);
				map.put("reason", "删除数据成功！");
				map.put("result", wareHouseData);
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
	
	
	
	/* 新增仓库 管理员或有权限之人  */
	@RequestMapping("/insertWareHouseData")
	@ResponseBody
	public Map<String,Object> insertWareHouseController(WareHouseData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iwhds.insertService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "新增仓库成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "新增仓库失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/updateWareHouseData")
	@ResponseBody
	public Map<String,Object> updateWareHouseDataController(WareHouseData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=iwhds.updateByPrimaryKeySelectiveService(record);
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
	
	/* 删除数据 管理员或有权限之人  */
	@RequestMapping("/deleteWareHouseData")
	@ResponseBody
	public Map<String,Object> deleteWareHouseDataController(Integer warecode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			SpareParts_SDData spd=new SpareParts_SDData();
			spd.setWarecode(warecode);
			List<SpareParts_SDData> list=isps.querySparePartsSDDataListByWareCodeService(spd);
			Material_SDData md=new Material_SDData();
			md.setWarecode(warecode);
			List<Material_SDData> lis=ims.queryMaterialSDDataListByWareCodeService(md);
			Product_SDData psd=new Product_SDData();
			psd.setWarecode(warecode);
			List<Product_SDData> lit=ips.queryProductSDDataListByWareCodeService(psd);
			if(list.size()>0 || lis.size()>0 || lit.size()>0){
				map.put("flag", false);
				map.put("reason", "删除失败，该仓库在出入库中已有记录！");
			}else{
				int i=iwhds.deleteByPrimaryKeyService(warecode);
				map.put("flag", true);
				map.put("reason", "删除数据成功！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 批量删除*/
	@RequestMapping("/deleteWareHouseDataBatch")
	@ResponseBody
	public Map<String,Object> deleteWareHouseDataBatchController(@RequestBody List<WareHouseData> list){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Integer> lis=new ArrayList<Integer>();
		try{
			for(int k=0;k<list.size();k++){
				Integer warecode=list.get(k).getWarecode();
				SpareParts_SDData spd=new SpareParts_SDData();
				spd.setWarecode(warecode);
				List<SpareParts_SDData> lit1=isps.querySparePartsSDDataListByWareCodeService(spd);
				Material_SDData md=new Material_SDData();
				md.setWarecode(warecode);
				List<Material_SDData> lit2=ims.queryMaterialSDDataListByWareCodeService(md);
				Product_SDData psd=new Product_SDData();
				psd.setWarecode(warecode);
				List<Product_SDData> lit3=ips.queryProductSDDataListByWareCodeService(psd);
				boolean res=false;
				if(lit1.size()>0 || lit2.size()>0 || lit3.size()>0){
					res=false;
				}else{
					res=true;
				}
				if(res){
					lis.add(warecode);
				}
			}
			if(lis.size()>0){
				int i=iwhds.deleteWareHouseDataBatchService(lis);
				map.put("flag", true);
				map.put("reason", "批量删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "批量删除失败，该仓库在出入库中已有记录！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*分页查询  查询仓库列表   根据角色下的部门*/
	@RequestMapping("/queryWareHouseListByPage")
	@ResponseBody
	public Map<String,Object> queryRoleListListByPageController(WareHouseData record,PageInfo pageinfo,HttpServletRequest request,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
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
			map.put("pageinfo", pageinfo);
			map.put("list", deptnos);
			map.put("warename", record.getWarename());
			map.put("deptname", record.getDeptname());
			map.put("waretype", record.getWaretype());
			List<WareHouseData> list=iwhds.queryWareHouseListByPageService(map,pageinfo);
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
	
/*List<WareHouseData> queryWareHouseListService(Map m);//查询  根据角色下的部门  查询仓库列表*/
	@RequestMapping("/queryWareHouseList")
	@ResponseBody
	public Map<String,Object> queryRoleListListController(WareHouseData record,HttpServletRequest request,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
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
			ma.put("warename", record.getWarename());
			ma.put("deptname", record.getDeptname());
			ma.put("waretype", record.getWaretype());
			List<WareHouseData> list=iwhds.queryWareHouseListService(ma);
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
	
	/*查询仓库列表  */
	@RequestMapping("/queryWareHouseLists")
	@ResponseBody
	public Map<String,Object> queryWareHouseListsController(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<WareHouseData> list=iwhds.queryWareHouseListsService();
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
}
