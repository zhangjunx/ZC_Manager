package com.xr.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.SupplierData;
import com.xr.service.ISupplierDataService;
import com.xr.util.PinYinUtil;
import com.xr.util.ZhStringUtil;

@Controller
@RequestMapping("SupplierData")
public class SupplierDataController {

	@Autowired
	private ISupplierDataService isds;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/querySupplierData")
	@ResponseBody
	public Map<String,Object> querySupplierDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			SupplierData supplierData=isds.selectByPrimaryKeyService(datano);
			if(supplierData!=null && !"".equals(supplierData)){
				map.put("flag", true);
				map.put("reason", "删除数据成功！");
				map.put("result", supplierData);
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
	
	/* 删除数据 管理员或有权限之人  */
	@RequestMapping("/deleteSupplierData")
	@ResponseBody
	public Map<String,Object> deleteSupplierDataController(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=isds.deleteByPrimaryKeyService(datano);
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
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/updateSupplierData")
	@ResponseBody
	public Map<String,Object> updateSupplierDataController(SupplierData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if (record.getCompanyname()!=null && !record.getCompanyname().equals("")) {//供应商名称不为空
				record.setMnemoniccode(PinYinUtil.getFirstSpell(record.getCompanyname()));//将供应商名称转换为首字母字符串（助记码）
			}
			record.setUpdatedate(new Date());
			int i=isds.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 添加数据 管理员或有权限之人  */
	@RequestMapping("/insertSupplierData")
	@ResponseBody
	public Map<String,Object> insertSupplierDataController(SupplierData record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String, Object> map2 = new HashMap<>();
		try{
			String companyCode = record.getCompanycode();
			map2 = isds.querySupplierDataByCode(companyCode);//根据编码查询该供应商编码是否存在
			if (map2 != null) {
				map.put("flag", false);
				map.put("reason", "供应商编码已存在！");
			}else {
				if (record.getCompanyname()!=null && !record.getCompanyname().equals("")) {//供应商名称不为空
					record.setMnemoniccode(PinYinUtil.getFirstSpell(record.getCompanyname()));//将供应商名称转换为首字母字符串（助记码）
				}
				record.setDeleted("1");
				record.setCreatedate(new Date());
				int i=isds.insertService(record);
				if(i>0){
					map.put("flag", true);
					map.put("reason", "添加成功！");
					map.put("result", i);
				}else{
					map.put("flag", false);
					map.put("reason", "添加失败！");
				} 
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*
	 * 查询供应商列表信息 条件可有可无*/
	@RequestMapping("/querySupplierDataList")
	@ResponseBody
	public Map<String,Object> querySupplierDataListController(SupplierData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if (record.getCompanyname()!=null && !record.getCompanyname().equals("")) {//如果供应商名称不为空
				if (ZhStringUtil.vd(record.getCompanyname())) {//判断是否带有汉字
				}else if (ZhStringUtil.check(record.getCompanyname())) {//判断是否带有字母
					record.setMnemoniccode(record.getCompanyname());
					record.setCompanyname("");
				}else if (ZhStringUtil.isNumberic(record.getCompanyname())) {
					map.put("flag", false);
					map.put("reason", "暂无数据可查！");
					return map;
				}
			}
			List<SupplierData> list=isds.querySupplierDataListService(record);
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
	
}
