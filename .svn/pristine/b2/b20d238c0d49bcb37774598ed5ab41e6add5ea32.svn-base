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

import com.xr.entity.MaterialData;
import com.xr.entity.Material_SDData;
import com.xr.entity.PageInfo;
import com.xr.service.IMaterialDataService;
import com.xr.service.IMaterial_SDDataService;
import com.xr.util.ExcelUtil;

/**
 * @ClassName MaterialDataController
 * @Description 原材料的交互层
 * @Author csc
 * @Date 2019年12月23日 下午9:12:03
 */
@Controller
@RequestMapping("MaterialData")
public class MaterialDataController {

	@Autowired
	private IMaterialDataService imds;
	@Autowired
	private IMaterial_SDDataService imdds;
	/* 查询数据 通过主键查询一条数据  管理员或有权限之人  */
	@RequestMapping("/query")
	@ResponseBody
	public Map<String,Object> queryMaterialDataController(String itemcode){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			MaterialData materialData=imds.selectByPrimaryKeyService(itemcode);
			if(materialData!=null && !"".equals(materialData)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", materialData);
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
	@RequestMapping("/delete")
	@ResponseBody
	public Map<String,Object> deleteMaterialDataController(String itemcode,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Material_SDData> list=imdds.queryMaterialSDDataListByItemCodeService(itemcode);
			if(list.size()>0 && list!=null){
				map.put("flag", false);
				map.put("reason", "删除失败，该条码已有出入库记录了！");
				map.put("result", 0);
				return map;
			}
			int i=imds.deleteByPrimaryKeyService(itemcode);
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
			map.put("reason", "删除失败，请联系管理员！");
		}
		return map;
	}//end
	/* 修改数据 管理员或有权限之人  */
	@RequestMapping("/update")
	@ResponseBody
	public Map<String,Object> updateMaterialDataController(MaterialData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setUpdateperson(holderno);
			}
			record.setUpdatedate(new Date());
			int i=imds.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "更新成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "更新失败！");
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
	public Map<String,Object> insertMaterialDataController(MaterialData record,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String itemcode=record.getItemcode();
			MaterialData msd=imds.selectByPrimaryKeyService(itemcode);
			if(!"".equals(msd) && msd!=null){
				map.put("flag", false);
				map.put("reason", "添加失败,条码重复了！");
				map.put("result", 0);
				return map;
			}
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				String holderno=(String) request.getSession().getAttribute("holderno");
				record.setCreateperson(holderno);
			}
			record.setDeleted("1");
			int i=imds.insertService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
				map.put("result", i);
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
	 * 查询原材料物品列表信息 条件可有可无*/
	@RequestMapping("getMaterialList")
	@ResponseBody
	public Map<String,Object> getMaterialList(MaterialData record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("itemcode", record.getItemcode());
			m.put("itemname", record.getItemname());
			m.put("itemtype", record.getItemtype());
			List<Map<String,Object>> list=imds.getMaterialListService(m);
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
	 * 查询原材料物品列表信息 条件可有可无*/
	@RequestMapping("/getMaterialListByPage")
	@ResponseBody
	public Map<String,Object> getMaterialListByPage(MaterialData record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("itemcode", record.getItemcode());
			m.put("itemname", record.getItemname());
			m.put("itemtype", record.getItemtype());
			List<Map<String,Object>> list=imds.getMaterialListByPageService(m,pageinfo);
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
	
	/*批量删除*/
	@RequestMapping("/deleteBatch")
	@ResponseBody
	public Map<String,Object> deleteBatch(@RequestBody List<MaterialData> list){
		Map<String,Object> map=new HashMap<String,Object>();
		List<String> lis=new ArrayList<String>();
		List<String> lis1=new ArrayList<String>();
		try{
			for(int k=0;k<list.size();k++){
				String itemcode=list.get(k).getItemcode();
				List<Material_SDData> lit=imdds.queryMaterialSDDataListByItemCodeService(itemcode);
				if(lit.size()>0 && lit!=null){
					lis1.add(itemcode);
				}else{
					lis.add(itemcode);
				}
			}
			if(lis.size()==0 || lis==null){
				map.put("flag", false);
				map.put("reason", "批量删除失败，选中的材料在出入库中都已有记录！");
				map.put("result", 0);
				return map;
			}
			int i=imds.deleteBatchService(lis);
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
	
	
	/*批量修改   逻辑删除  */
	/*@RequestMapping("/updateMaterialDataBatch")
	@ResponseBody
	public Map<String,Object> updateMaterialDataBatchController(@RequestBody List<MaterialData> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		List<MaterialData> lis=new ArrayList<MaterialData>();
		List<MaterialData> lis1=new ArrayList<MaterialData>();
		try{
			for(int k=0;k<list.size();k++){
				MaterialData md=list.get(k);
				md.setUpdatedate(new Date());
				md.setUpdateperson((String)request.getSession().getAttribute("holderno"));
				List<Material_SDData> lit=imdds.queryMaterialSDDataListByItemCodeService(md.getItemcode());
				if(lit.size()>0 && lit!=null){
					lis1.add(md);
				}else{
					lis.add(md);
				}
			}
			int i=imds.updateMaterialDataBatchService(lis);
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
	 *  原材料Excel确定导入
	 *  csc
	 */
	@ResponseBody
	@RequestMapping("/insertExcelMaterial")
	public Map<String, Object> insertExcelMaterial(@RequestBody Map<String, Object> revice,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<>();//定义一个Map返回给前段
		 //获取前段传过来的值
		 List<Map<String, Object>> list =  (List<Map<String, Object>>) revice.get("list");
		
		   //用于放入已经存在的item
			List<String> haveitemlist = new ArrayList<>();
			
		  //检测原材料的物品编码
		  for (int i = 0; i < list.size(); i++) {//for循环读取数据中的原材料编码
			 String itemcode =  (String) list.get(i).get("itemcode");
			  //查询是原材料编码是否重复
			 String item =  imds.queryRepeatItemcode(itemcode);
			 if(item==null || "".equals(item)){//如果等于空证明没有被添加过
				 continue;
			   }else{//否则就是已经存在,放入容器
				   haveitemlist.add(itemcode);
			   }
		   }//end for循环
		  
		  if(haveitemlist.size()==0){//如果编码没有重复的,就进行添加
			    //分段插入
			     List<Map<String, Object>> zuihou = new ArrayList<Map<String, Object>>(); 
			     for (int i = 0; i < list.size(); i++) {
						int point=100;//定义一次添加多少个
						  zuihou.add(list.get(i));
			        	 if(point==zuihou.size() || i==list.size()-1){
			        		 imds.insertExcelMaterial(zuihou);
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
