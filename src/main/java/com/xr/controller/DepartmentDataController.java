package com.xr.controller;

import java.util.ArrayList;
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

import com.xr.entity.DepartmentData;
import com.xr.entity.HolderData;
import com.xr.entity.PageInfo;
import com.xr.service.IDepartmentDataService;
import com.xr.util.ExcelUtil;

@Controller
@RequestMapping("DepartmentData")
public class DepartmentDataController {
	@Autowired
	private IDepartmentDataService idds;
	/*删除 部门*/
	@RequestMapping("/deleteDeptData")
	@ResponseBody
	public Map<String,Object> deleteDeptDataController(String departmentno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String underno=departmentno;
			List<DepartmentData> list=idds.queryDeptListByUnderService(underno);
			if(list.size()>0){
				map.put("flag", false);
				map.put("reason","删除失败，该部门下有其它子部门!");
				return map;
			}
			List<HolderData> litt=idds.queryHolderListByDeptService(departmentno);
			if(litt.size()>0){
				map.put("flag", false);
				map.put("reason","删除失败，该部门下已有员工存在!");
				return map;
			}
			int i=idds.deleteByPrimaryKeyService(departmentno);
			if(i>0){
				map.put("flag", true);
				map.put("reason","删除部门成功!");
			}else{
				map.put("flag", false);
				map.put("reason","删除部门失败!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		
		return map;
	}//end
	
	/*更新部门*/
	@RequestMapping("/updateDeptData")
	@ResponseBody
	public Map<String,Object> updateDeptDataController(DepartmentData record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=idds.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason","更新部门成功!");
			}else{
				map.put("flag", false);
				map.put("reason","更新部门失败!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		
		return map;
	}//end
	
	/*添加新的部门*/
	@RequestMapping("/insertDeptData")
	@ResponseBody
	public Map<String,Object> insertDeptDataController(DepartmentData record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try {
			String departmentno=record.getDepartmentno();
			DepartmentData dd=idds.selectByPrimaryKeyService(departmentno);
			if(dd!=null && !"".equals(dd)){
				map.put("flag", false);
				map.put("reason","添加失败，该部门编号已存在!");
				return map;
			}
			int i=idds.insertService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason","添加部门成功!");
			}else{
				map.put("flag", false);
				map.put("reason","添加部门失败!");
			}
		} catch (Exception ex) {
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*添加新的部门*/
	@RequestMapping("/insertDept")
	@ResponseBody
	public Map<String,Object> insertDept(DepartmentData record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try {
			String underno=record.getDepartmentno();
			String deptno=queryMaxDeptNo(underno,resp).get("result").toString(); 
			record.setUnderno(underno);
			record.setDepartmentno(deptno);
			int i=idds.insertService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason","添加成功!");
			}else{
				map.put("flag", false);
				map.put("reason","添加失败!");
			}
		} catch (Exception ex) {
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	
	/*查询所有部门信息*/
	@RequestMapping("/queryDeptListByPage")
	@ResponseBody
	public Map<String,Object> queryDeptListByPageController(DepartmentData record,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map.put("pageinfo", pageinfo);
			List<DepartmentData> list=idds.queryDeptListByPageService(record, pageinfo);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		
		return map;
	}//end
	

	/*查询所有部门信息*/
	@RequestMapping("/queryDeptList")
	@ResponseBody
	public Map<String,Object> queryDeptListController(DepartmentData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<DepartmentData> list=idds.queryDeptListService(record);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 
	/*//查询部门和所在公司 包括编号 名称 */
	@RequestMapping("/queryDeptAndUnderNoList")
	@ResponseBody
	public Map<String,Object> queryDeptAndUnderNoListController(DepartmentData record,HttpServletResponse resp){
		resp.setHeader("Access-Controller-Allow-Origin", "*");//解决跨域
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<DepartmentData> list=idds.queryDeptAndUnderNoListService();
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	
	
/*	根据登录人的部门 查询其所在公司下的所有部门
	@RequestMapping("/queryDeptListByLoginPerson")
	@ResponseBody
	public Map<String,Object> queryDeptListByLoginPersonController(DepartmentData record,HttpServletResponse resp,HttpServletRequest request){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			if(request.getSession().getAttribute("holderno")!=null && !"".equals(request.getSession().getAttribute("holderno"))){
				//HolderData holderdata=(HolderData) request.getSession().getAttribute("holderData");
				HolderData h=ihds.selectByPrimaryKeyService((String)request.getSession().getAttribute("holderno"));
				String departmentno=h.getDepartmentno();
				String underno=departmentno.substring(0, 3);
				record.setUnderno(underno);
			}
			List<DepartmentData> list=idds.queryDeptListByLoginPersonService(record);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
*/	
	/*根据登录人的部门 查询其所在公司下的所有部门*/
	@RequestMapping("/getMyDeptList")
	@ResponseBody
	public Map<String,Object> getMyDeptList(String holderno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			 
			List<Map<String, Object>> list=idds.getMyDeptListService(holderno);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 删除部门时 先查看部门是否有人存在*/
	@RequestMapping("/queryHolderListByDept")
	@ResponseBody
	public Map<String,Object> queryHolderListByDeptController(String departmentno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<HolderData>  list=idds.queryHolderListByDeptService(departmentno);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据部门号查其 下级部门  underno*/
	@RequestMapping("/queryDeptListByUnder")
	@ResponseBody
	public Map<String,Object> queryDeptListByUnderController(String underno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<DepartmentData>  list=idds.queryDeptListByUnderService(underno);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason","查询数据成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","查询数据失败!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*String queryMaxDeptNoService(String underno);//查询最大部门号*/
	@RequestMapping("/queryMaxDeptNo")
	@ResponseBody
	public Map<String,Object> queryMaxDeptNo(String underno,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String departmentno=idds.queryMaxDeptNoService(underno);//查询最大部门号
			if(underno.length()==0){//没有上级部门时走这个路径
				departmentno=idds.queryMaxDeptNonService();
				departmentno=departmentno.substring(0,3);
			}
			if(departmentno==null && underno.length()==0){//没有上级部门  且最大部门编号为空
				departmentno="001";
			}else if(departmentno==null && underno.length()>0){//有上级部门  且下级部门最大编号为空
				departmentno=underno+"001";
			}else{
				//有或没有上级部门 最大部门编号不为空 
				int strlen=departmentno.length()/3;
				//拆分字符串 三个一组   001002005
				for(int i=0;i<strlen;i++){
					String s=departmentno.substring(3*i, 3*i+3);
					//判断 当有一个等于999时  已达到最大编号值
					if(s.equals("999")){
						map.put("flag", false);
						map.put("reason","对不起，该上级部门下的子部门已达到最大值"+departmentno+"!");
						map.put("result", departmentno);
						return map;
					}
				}
				//没有达到最大值时 
				Integer deptno=Integer.parseInt(departmentno)+1;//String转int
				String str=String.valueOf(deptno);//int转String
				int len=str.length();
				int i=len%3;
				if(i==1){
					departmentno="00"+str;
				}else if(i==2){
					departmentno="0"+str;
				}else{
					departmentno=str;
				}
			}
			map.put("flag", true);
			map.put("reason","查询成功!");
			map.put("result", departmentno);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*查询所有公司的部门树*/
	@RequestMapping("/getDeptTree")
	@ResponseBody
	public Map<String,Object> getDeptTree(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String, Object>>  list=idds.getDeptTreeService();
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*查询登录人所在公司下的部门树*/
	@RequestMapping("/getMyDeptTree")
	@ResponseBody
	public Map<String,Object> getMyDeptTree(HttpServletResponse resp,String holderno){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String, Object>>  list=idds.getMyDeptTreeService(holderno);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","对不起，请查看您是否已分配部门!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 所有的部门树 带复选框的*/
	@RequestMapping("/getDeptTreeCheck")
	@ResponseBody
	public Map<String,Object> getDeptTreeCheck(HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String, Object>>  list=idds.getDeptTreeCheckService();
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*登录人所在公司下的部门树 带复选框的*/
	@RequestMapping("/getMyDeptTreeCheck")
	@ResponseBody
	public Map<String,Object> getMyDeptTreeCheck(HttpServletResponse resp,String holderno){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String, Object>>  list=idds.getMyDeptTreeCheckService(holderno);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	
	/*部门导入*/
	@RequestMapping("/ajaxUploadExcel")
	@ResponseBody
	public Map<String,Object> ajaxUploadExcel(@RequestBody List<DepartmentData> arrlist,HttpServletRequest req,HttpServletResponse resp) throws RuntimeException{
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			map=idds.ajaxUploadExcel(arrlist);
		}catch(RuntimeException ex){
			map.put("flag", false);
			map.put("reason", "导入失败，部门重复了！");
		}catch(Exception ex) {
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 读取Excel中的数据
	 * @param file
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/readExcelData")
	public Map<String, Object> readExcelData(@RequestParam MultipartFile file,HttpServletResponse resp) throws Exception{
		Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		//List<List<Object>> getBankListByExcel
	    List<String[]> list =  ExcelUtil.readExcel(file);//获取表格中的所有数据
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
	 * 读取Excel中的数据
	 * @param file
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping("/readExcel")
	public Map<String, Object> readExcel(@RequestParam MultipartFile file,HttpServletResponse resp) throws Exception{
		Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		//List<List<Object>> getBankListByExcel
	    List<String[]> list =  ExcelUtil.readExcel(file);//获取表格中的所有数据
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
	
	/*List<Map<String, Object>> getHolderByDeptBatchService(List<String> list);//通过部门查人员  批量查询*/
	@RequestMapping("/getHolderByDeptBatch")
	@ResponseBody
	public Map<String,Object> getHolderByDeptBatch(HttpServletResponse resp,@RequestBody List<String> arrlist){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String, Object>>  list=idds.getHolderByDeptBatchService(arrlist);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*List<Map<String, Object>> getHolderByDeptService(Map m);//通过部门查人员*/
	@RequestMapping("/getHolderByDept")
	@ResponseBody
	public Map<String,Object> getHolderByDept(HttpServletResponse resp,String deptno){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("deptno", deptno);
			List<Map<String, Object>>  list=idds.getHolderByDeptService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason","查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason","暂无数据可查!");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
}
