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
import com.xr.entity.SparePartsData;
import com.xr.entity.SpareParts_SDData;
import com.xr.service.ISparePartsDataService;
import com.xr.service.ISpareParts_SDDataService;
import com.xr.util.ExcelUtil;

/**
 * 备品备件基本资料相关处理
 * @author csc
 *  交互层
 */
@Controller
@RequestMapping("SparePartsData")
public class SparePartsDataController {

	@Autowired
	private ISparePartsDataService ispds;
	@Autowired
	private ISpareParts_SDDataService isdds;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> query(String itemcode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			SparePartsData sparePartsData=ispds.selectByPrimaryKeyService(itemcode);
			if(sparePartsData!=null && !"".equals(sparePartsData)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", sparePartsData);
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
	public Map<String,Object> delete(String itemcode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<SpareParts_SDData> lis=isdds.querySparePartsSDDataListByItemCodeService(itemcode);
			if(lis!=null && lis.size()>0){
				map.put("flag", false);
				map.put("reason", "删除失败，出入库中已有记录了！");
				return map;
			}
			int i=ispds.deleteByPrimaryKeyService(itemcode);
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
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> update(SparePartsData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setUpdatedate(new Date());
				record.setUpdateperson(holderno);
			}
			int i=ispds.updateByPrimaryKeySelectiveService(record);
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
	
	/* 添加数据 管理员或有权限之人  */
	@RequestMapping("/insert")
	@ResponseBody
	public Map<String,Object> insert(SparePartsData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String itemcode=record.getItemcode();
			SparePartsData spd=ispds.selectByPrimaryKeyService(itemcode);
			if(spd!=null && !"".equals(spd)){
				map.put("flag", false);
				map.put("reason", "添加失败，条码重复了！");
				return map;
			}
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setCreateperson(holderno);
			}
			record.setDeleted("1");
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
	 * 查询备品备件物品列表信息 条件可有可无*/
	@RequestMapping("/getSparepartsList")
	@ResponseBody
	public Map<String,Object> getSparepartsList(SparePartsData record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("itemcode", record.getItemcode());
			m.put("itemname", record.getItemname());
			m.put("itemtype", record.getItemtype());
			List<Map<String,Object>> list=ispds.getSparepartsListService(m);
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
	
	/*
	 * 查询备品备件物品列表信息 条件可有可无*/
	@RequestMapping("/getSparepartsListByPage")
	@ResponseBody
	public Map<String,Object> getSparepartsListByPage(SparePartsData record, PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("itemcode", record.getItemcode());
			m.put("itemname", record.getItemname());
			m.put("itemtype", record.getItemtype());
			List<Map<String,Object>> list=ispds.getSparepartsListByPageService(m,pageinfo);
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
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*批量修改*/
	@RequestMapping("/deleteBatch")
	@ResponseBody
	public Map<String,Object> deleteBatch(@RequestBody List<SparePartsData> list){
		Map<String,Object> map=new HashMap<String,Object>();
		List<String> lis=new ArrayList<String>();
		List<String> lis1=new ArrayList<String>();
		try{
			for(int k=0;k<list.size();k++){
				String itemcode=list.get(k).getItemcode();
				List<SpareParts_SDData> spd=isdds.querySparePartsSDDataListByItemCodeService(itemcode);
				if(spd==null || spd.size()==0){
					lis.add(itemcode);
				}else{
					lis1.add(itemcode);
				} 
			}
			if(lis.size()==0 || lis==null){
				map.put("flag", false);
				map.put("reason", "批量删除失败，选中的备品件在出入库中都已有记录！");
				map.put("result", 0);
				return map;
			}
			int i=ispds.deleteBatchService(lis);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量删除成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "批量删除失败！");
				map.put("result", 0);
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 读取Excel中的数据
	 * csc
	 * @param file
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
	 *  备品备件Excel导入
	 *  csc
	 */
	@ResponseBody
	@RequestMapping("/insertExcelSpareParts")
	public Map<String, Object> insertExcelSpareParts(@RequestBody Map revice,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<>();//定义一个Map返回给前段
		 //获取到前段所传过来的值.
		List<Map<String, Object>> list =     (List<Map<String, Object>>) revice.get("list");
		
		//用于放入已经存在的item
		List<String> haveitemlist = new ArrayList<>();
		
		//检测备品备件的基本信息
		for (int i = 0; i < list.size(); i++) {//通过for循环获取用户提交过来的物品编码
		  String itemcode =	(String) list.get(i).get("itemcode");
		  String item = ispds.queryRepeatItemcode(itemcode);//在数据库中查询备品备件编码是否已将存在
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
			        		 ispds.insertExcelSpareParts(zuihou);
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
	}//end
	
	
	
	
	
}
