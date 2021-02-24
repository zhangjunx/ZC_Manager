package com.xr.controller;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.LPR_Vehicle;
import com.xr.entity.PageInfo;
import com.xr.service.ILPR_VehicleService;
import com.xr.util.ExcelUtil;

/**
 * @ClassName LPR_VehicleController
 * @Description 车辆信息的控制层
 * @Author csc
 * @Date 2019年12月10日 下午2:10:05
 */
@RestController
@RequestMapping("LPR_Vehicle")
public class LPR_VehicleController {

	@Autowired
	private ILPR_VehicleService ivs;//引人车辆信息业务层

	 //分页查询车辆信息
	@RequestMapping("/queryVehicleByWheresByPage")
	public Map<String,Object> queryVehicleByWheresByPageController(@ModelAttribute LPR_Vehicle record,@ModelAttribute PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
			map.put("pageinfo", pageinfo);
			// 查询出的车辆信息放入到list集合
			List<LPR_Vehicle> list = ivs.queryVehicleByWheresByPageService(record, pageinfo);
			if (list.size() > 0) {
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			} else {
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		return map;
	}//end
	
	
	//根据条件查询车辆信息
	@RequestMapping("/queryVehicleByWheres")
	public Map<String,Object> queryVehicleByWheresController(LPR_Vehicle record){
		Map<String,Object> map=new HashMap<String,Object>();
			 //查询出的车辆信息放入到list集合
			 List<LPR_Vehicle> list = ivs.queryVehicleByWheresService(record);
				if(list.size()>0){
					map.put("flag", true);
					map.put("reason", "查询成功！");
					map.put("result", list);
				}else{
					map.put("flag",false);
					map.put("reason", "暂无数据可查！");
				}
		return map;
	}//end
	
	/**
	 * 根据条件查询个别 的信息
	 * 模糊查询
	 * 根据条件查询相关员工的信息
	 * 查询(姓名,工号,部门编号,部门名称)
	 */
	@RequestMapping("/queryVehicleBy")
	public Map<String,Object> queryVehicleByController(String can){
		Map<String,Object> map=new HashMap<String,Object>();
			 //查询出的车辆信息放入到list集合
			 List<Map<String,Object>> vehicle = ivs.queryVehicleByWhereService(can);
			 if(vehicle==null || vehicle.size()==0){
				 	map.put("flag",false);
					map.put("reason", "暂无数据可查！");
				}else{
					map.put("flag", true);
					map.put("reason", "查询成功！");
					map.put("result", vehicle);
				}
		return map;
	}//end
	
     //插入车辆信息
	@RequestMapping("/insertVehicle")
	public Map<String,Object> insertVehicleController(@RequestParam("carPhoto") MultipartFile file,LPR_Vehicle record) throws IOException{
		Map<String,Object> map = new HashMap<String,Object>();//定义一个Map向前端返回数据
			if(!file.isEmpty()){
				byte[] vihiclephoto=file.getBytes();
				record.setVehiclephoto(vihiclephoto);
			}
		    String strPlateID = record.getStrplateid();//获取传入的车牌号
		    String strCode =  record.getStrcode();//获取传入的车卡内码
		    String strLicense = ivs.queryVehicleCheck(strPlateID, null);//通过车牌号查询车牌号是否重复
		    
		    String strInternal=null;
		    if(strCode!=null && !strCode.equals("")){
		       strInternal = ivs.queryVehicleCheck(null, strCode);//通过卡内码查询车牌号是否重复
		    }
		   if(strLicense==null && strInternal==null){//如果为空,则没有添加过
			   int i = ivs.insertSelectiveService(record);
			   if(i>0){
					map.put("flag", true);
					map.put("reason", "添加成功！");
				}else{
					map.put("flag", false);
					map.put("reason", "添加失败！");
				} 
		   }else{//已添加过
			   map.put("flag", false);
			   map.put("reason", "车牌号或者卡内码重复");
		   }
		return map;
	}//end
	
	/**
	 * 根据主键批量删除车辆信息
	 * @param id
	 * @return
	 */
	@RequestMapping("/deleteVehicles")
	public Map<String,Object> deleteVehiclesController(Integer[] ids){
		Map<String,Object> map = new HashMap<String,Object>();
			int i = ivs.deleteByPrimaryKeysService(ids);
			if(i>0){
				map.put("flag", true) ;
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败，暂无此信息！");
			} 
		return map;
	}//end
	/**
	 * 根据主键删除单条车辆信息
	 * @param id
	 * @return
	 */
	@RequestMapping("/deleteVehicle")
	public Map<String,Object> deleteVehicleController(Integer id){
		Map<String,Object> map = new HashMap<String,Object>();
			int i = ivs.deleteByPrimaryKeyService(id);
			if(i>0){
				map.put("flag", true);
				map.put("reason","删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			} 
		return map;
	}//end 
	/**
	 * 根据id修改车辆信息
	 * @param id
	 * @throws IOException 
	 */
	@RequestMapping("/updateVehicle")
	public Map<String,Object> updateVehicleController(@RequestParam("carPhoto") MultipartFile file,LPR_Vehicle record) throws IOException{
		Map<String,Object> map = new HashMap<String,Object>();
			if(!file.isEmpty()){
				byte[] vehiclephoto=file.getBytes();
				record.setVehiclephoto(vehiclephoto);
			}
			int i=ivs.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功!");
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败！");
			} 
		return map;
	}//end
	
	/**
	 * 修改车辆进出状态
	 * @param id
	 */
	@RequestMapping("/updateVehicleStatus")
	public Map<String,Object> updateVehicleIOStatusController(LPR_Vehicle record){
		Map<String,Object> map = new HashMap<String,Object>();
			int i=ivs.updateVehicleStatusService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功!");
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败！");
			} 
		return map;
	}//end
	
	/**
	 * 根据id查询车辆信息
	 * @param id
	 */
	@RequestMapping("/selectVehicleById")
	public Map<String,Object> queryVehicleByIdController(Integer id){
		Map<String,Object> map = new HashMap<String,Object>();
			LPR_Vehicle i = ivs.queryByPrimaryKeyService(id);	
			if(i==null){
				map.put("flag", false);
				map.put("reason","暂无数据可查！");
			}else{
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", i);
			}
		return map;
	}//end
	
	/**根据id,查询车辆照片*/
	@RequestMapping(value="/queryVehiclePhoto",method=RequestMethod.GET)
	public Map<String,Object> queryVehiclePhotoController(Integer id,HttpServletResponse response){
		Map<String,Object> map = new HashMap<String,Object>();
			LPR_Vehicle vehicle = ivs.queryVehiclePhotoService(id);	
			byte[] byteAry=vehicle.getVehiclephoto();
			if(vehicle!=null && !"".equals(vehicle)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", vehicle);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查！");
			}
		return map;
	}//end
	
	/**
	 * 读取excel表格中的数据并返回给前段
	 * @return
	 * @throws IOException 
	 * @throws ParseException 
	 */
	@RequestMapping("/queryVehicleExcel")
	public Map<String, Object> queryVehicleExcel(@RequestParam MultipartFile file,HttpServletResponse resp) throws IOException, ParseException{
		Map<String , Object> map = new HashMap<>();//定义一个Map返回给前段
		 List<String[]> list =  ExcelUtil.queryExcel(file);//获取表格中的所有数据
		 List<String[]> excel = new  ArrayList<String[]>();//让如数据
         Iterator<String[]> it = list.iterator();//使用迭代器来循环list
        while(it.hasNext()){//循环读取
      	  String[] data =  it.next();//接收每一行excel中的数据
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
	 * 添加excel表格中的数据
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/insertVehicleExcel")
	public Map<String, Object> insertVehicleExcel(@RequestBody Map<String, Object> record){
		Map<String, Object> map = new HashMap<>();//定义一个Map向前段返回数据
		
	
	/*List<Map<String, Object>> deptlist =	(List<Map<String, Object>>) record.get("deptList");//获取所有部门名称*/	
	List<Map<String, Object>> strcodeList =	(List<Map<String, Object>>) record.get("strcodeList");//获取所有卡内码
	List<Map<String, Object>> holdernoList =	(List<Map<String, Object>>) record.get("holdernoList");//获取所有工号
	List<Map<String, Object>> strplateidList =	(List<Map<String, Object>>) record.get("strplateidList");//获取所有车牌号
	List<Map<String,Object>> arr =	(List<Map<String, Object>>) record.get("arr");
	
	      //如果notholdernolist.size()==0那么证明工号没有问题
	     List<String> notholdernolist = new ArrayList<>();//放入通过工号没有查询到部门编号的工号
	     List<String> havedeptnolist = new ArrayList<>();//放入查询到的部门编号
 	        for (int i = 0; i < holdernoList.size(); i++) {
	         String holderno =	(String) holdernoList.get(i).get("holderno");//获取工号
	          String deptno = ivs.querydeptno(holderno);//通过工号查询用户的部门编号
	          if(deptno==null || deptno.equals(null)){
	        	  notholdernolist.add(deptno);//将通过工号没有查询到部门编号的工号放入notholdernolist
	          }else{havedeptnolist.add(deptno);}
			}//end 通过工号查询部门编号
	
 	        List<String> havaLicense = new ArrayList<>();//放入数据库中已存在的车牌号
 	        for (int j = 0; j < strplateidList.size(); j++) {//循环读取所有车牌号
 	        String  strPlateID =	(String) strplateidList.get(j).get("strplateid");//获取车牌
 	        String strPlate =  ivs.queryVehicleCheck(strPlateID, null);//检查车牌号是否重复
	 	        if(strPlate!=null){
	 	        	havaLicense.add(strPlateID);//放入数据库中已存在的车牌号
	 	        }else{continue;}
			}//end 结束对车牌号的判断
 	     
 	        List<String> haveVehicleInternal = new ArrayList<>();//用来存放数据库已经存在的车内码
 	       for (int n = 0; n < strcodeList.size(); n++) {//循环读取车内码
 	    	  String strCode =  (String) strcodeList.get(n).get("strcode");//获取车内码
 	    	   if(strCode==null){//如果车内码传过来的是空
 	    		   continue;//跳出循环
 	    	   }else{
 	    		String VehicleInternal  =  ivs.queryVehicleCheck(null, strCode);//查询车内码是否重复
 	    		 if(VehicleInternal!=null){//如果数据库中已存在该车内码.
 	    			haveVehicleInternal.add(strCode);//将存在的车内码放入到外层的集合中
 	    		 }else{continue;};
 	    	   }
		   }//end 结束对车内码的判断
 	       List<Map<String, Object>> insList = new ArrayList<>();
 	       if((notholdernolist.size()==0) && (havaLicense.size()==0) && (haveVehicleInternal.size()==0)){
 	    	     for (int i = 0; i < arr.size(); i++) {
					 arr.get(i).put("useunitno", havedeptnolist.get(i));
				 }
 	    	     
 	    	    //一次插入的条数，也就是分批的list大小
  			    int pointsDataLimit = 200;
  	            for (int i = 0; i < arr.size(); i++) {
  	                //分批次处理
  	            	insList.add(arr.get(i));//循环将数据填入载体list
  	                if (pointsDataLimit == insList.size() || i == arr.size() - 1) {  //载体list达到要求,进行批量操作
  	                	ivs.insertBatchVehicle(insList); //调用批量插入
  	                	insList.clear();//每次批量操作后,情况载体list,等待下次的数据填入
  	                }
  	            }//end for 批量插入
  	            
  	            map.put("flag", true);
  	            map.put("reason", "批量导入成功");
 	       }else{
 	    	   map.put("flag", false);
 	    	   map.put("reason", "导入失败!数据有错");
 	    	   map.put("notholdernolist", notholdernolist);//有问题的工号,没有查询到部门编号
 	    	   map.put("havaLicense", havaLicense);//数据库中已存在的车牌,不允许重复添加
 	    	   map.put("haveVehicleInternal", haveVehicleInternal);//数据库中已经存在的车内码
 	       }
		return map;
	}//end  方法
	 
}
