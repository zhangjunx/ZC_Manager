package com.xr.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.PageInfo;
import com.xr.entity.ProductData;
import com.xr.entity.Product_SDData;
import com.xr.service.IProductDataService;
import com.xr.service.IProduct_SDDataService;
import com.xr.util.ExcelUtil;

/**
 * @ClassName ProductDataController
 * @Description 成品库相关处理的交互层
 * @Author csc
 * @Date 2019年12月24日 上午9:46:07
 */
@Controller
@RequestMapping("ProductData")
public class ProductDataController {

	@Autowired
	private IProductDataService ipds;
	@Autowired
	private IProduct_SDDataService ipdds;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> queryProductDataController(String itemcode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			ProductData record=ipds.selectByPrimaryKeyService(itemcode);
			if(record!=null && !"".equals(record)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", record);
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
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,Object> deleteProductDataController(String itemcode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Product_SDData> list=ipdds.queryProductSDDataListByItemCodeService(itemcode);
			if(list.size()>0 && list!=null){
				map.put("flag", false);
				map.put("reason", "删除失败，该产品在出入库中已有记录！");
				map.put("result", 0);
				return map;
			}
			int i=ipds.deleteByPrimaryKeyService(itemcode);
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
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> updateProductDataController(ProductData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setUpdateperson(holderno);
			}
			record.setUpdatedate(new Date());
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
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 添加数据 管理员或有权限之人  */
	@RequestMapping("/insert")
	@ResponseBody
	public Map<String,Object> insertProductDataController(ProductData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String itemcode=record.getItemcode();
			ProductData pd=ipds.selectByPrimaryKeyService(itemcode);
			if(pd!=null && !"".equals(pd)){
				map.put("flag", false);
				map.put("reason", "添加失败，条码重复了！");
				map.put("result", 0);
				return map;
			}
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				record.setCreateperson((String) request.getSession().getAttribute("holderno"));
			}
			record.setDeleted("1");
			int i=ipds.insertService(record);
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
	 * 查询成品物品列表信息 条件可有可无*/
	@RequestMapping("getProductList")
	@ResponseBody
	public Map<String,Object> getProductList(ProductData record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("itemcode", record.getItemcode());
			m.put("itemname", record.getItemname());
			m.put("itemtype", record.getItemtype());
			List<Map<String,Object>> list=ipds.getProductListService(m);
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*
	 * 查询成品物品列表信息 条件可有可无*/
	@RequestMapping("getProductListByPage")
	@ResponseBody
	public Map<String,Object> getProductListByPage(ProductData record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("itemcode", record.getItemcode());
			m.put("itemname", record.getItemname());
			m.put("itemtype", record.getItemtype());
			List<Map<String,Object>> list=ipds.getProductListByPageService(m,pageinfo);
			if(list!=null && list.size()>0){
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
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 
	/*批量删除*/
	@RequestMapping("/deleteBatch")
	@ResponseBody
	public Map<String,Object> deleteMaterialDataBatchController(@RequestBody List<ProductData> list){
		Map<String,Object> map=new HashMap<String,Object>();
		List<String> lis=new ArrayList<String>();
		List<String> lis1=new ArrayList<String>();
		try{
			for(int k=0;k<list.size();k++){
				String itemcode=list.get(k).getItemcode();
				List<Product_SDData> lit=ipdds.queryProductSDDataListByItemCodeService(itemcode);
				if(lit.size()>0){
					lis1.add(itemcode);
				}else{
					lis.add(itemcode);
				}
			}
			if(lis.size()==0 || lis==null){
				map.put("flag", false);
				map.put("reason", "批量删除失败，选中的产品在出入库中都已有记录！");
				map.put("result", 0);
				return map;
			}
			int i=ipds.deleteBatchService(lis);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量删除成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "批量删除失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*批量修改   物理删除   */
	/*@RequestMapping("/updateProductDataBatch")
	@ResponseBody
	public Map<String,Object> updateMaterialDataBatchController(@RequestBody List<ProductData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		List<ProductData> lis=new ArrayList<ProductData>();
		List<ProductData> lis1=new ArrayList<ProductData>();
		try{
			for(int k=0;k<list.size();k++){
				ProductData pd=list.get(k);
				pd.setUpdatedate(new Date());
				pd.setUpdateperson((String) request.getSession().getAttribute("holderno"));
				List<Product_SDData> lit=ipdds.queryProductSDDataListByItemCodeService(pd.getItemcode());
				if(lit.size()>0 && lit!=null){
					lis1.add(pd);
				}else{
					lis.add(pd);
				}
			}
			int i=ipds.updateProductDataBatchService(lis);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量修改成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "批量修改失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
*/	
	/**
	 * 读取Excel中的数据
	 * @param file
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/checkExcelData")
	public Map<String, Object> checkExcelData(@RequestParam MultipartFile file,HttpServletResponse resp) throws Exception{
		Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
	    List<String[]> list =  ExcelUtil.queryExcel(file);//获取表格中的所有数据
	    List<String[]> excel = new  ArrayList<String[]>();//让如数据
           Iterator<String[]> it = list.iterator();//使用迭代器来循环list
          while(it.hasNext()){//循环读取
        	  String[] data =  it.next();//接手每一行excel中的数据
            int i =  data.length;
        	  if((data.length == 1) ||(data.length == 2)){//判断是否有一整行空值
        		  it.remove();
        	  }else{
        		  excel.add(data);
        	  }
          }// end while
	     if(excel.size()==0){
	    	 map.put("flag", false);
	    	 map.put("reason", "暂无数据可查");
	      } else{
	    	  map.put("flag", true);
		      map.put("reason", "查询成功");
		      map.put("result", excel);
	      }
            resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
			return map;
 }//end
	
	/**
	 *  成品Excel确定导入
	 *  csc
	 */
	@ResponseBody
	@RequestMapping("/insertExcelProduct")
	public Map<String, Object> insertExcelProduct(@RequestBody Map<String, Object> revice,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<>();//定义一个Map返回给前段
		//获取前段传过来的数据
		List<Map<String, Object>> list  = (List<Map<String, Object>>) revice.get("list");
		
		//用于放入已经存在的item
		List<String> haveitemlist = new ArrayList<>();
				
		//检测备品备件的基本信息
	    for (int i = 0; i < list.size(); i++) 
	    {//通过for循环获取用户提交过来的物品编码
				  String itemcode =	(String) list.get(i).get("itemcode");
				  String item = ipds.queryRepeatItemcode(itemcode);//在数据库中查询备品备件编码是否已将存在
				     if(item==null || "".equals(item)){//如果为空证明没有被添加过
				    	 continue;
				     }else{//else 则代表已经存在，放入容器中
				    	 haveitemlist.add(itemcode);
				     }
		}// end for循环
				
		if(haveitemlist.size()==0){//如果编码没有重复的,就进行添加
					    //分段插入
					     List<Map<String, Object>> zuihou = new ArrayList<Map<String, Object>>(); 
					     for (int i = 0; i < list.size(); i++) {
								int point=100;//定义一次添加多少个
								  zuihou.add(list.get(i));
					        	 if(point==zuihou.size() || i==list.size()-1){
					        		 ipds.insertExcelProduct(zuihou);
					        		 zuihou.clear();
					        	 }
							}//end for循环
					    map.put("flag", true);
						map.put("reason", "数据导入成功");
				   }else{
					   map.put("flag", false);
					   map.put("reason", "备品备件编码不能重复");
					   map.put("result", haveitemlist);
				   }
				resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
				return map;
			}//end 方法
	
}
