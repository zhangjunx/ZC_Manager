package com.xr.controller;
 
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.Applet_AccountData;
import com.xr.entity.HolderData;
import com.xr.entity.PageInfo;
import com.xr.service.Applet_ManageService;
import com.xr.service.IACL_RolesService;
import com.xr.service.IHolderDataService;
import com.xr.util.ExcelUtil;
import com.xr.util.FacePayDevice;

import jxl.read.biff.BiffException;

@Controller
@RequestMapping("HolderData")
public class HolderDataController {

	@Autowired
	private IHolderDataService ihds;
	@Autowired
	private IACL_RolesService irs;
	/**引入小程序模块的业务层*/
	@Autowired
	private Applet_ManageService amservice;
	 
	/*修改个人密码*/
	@RequestMapping("/updateMyPWD")
	@ResponseBody
	public Map<String,Object> updatePWD(@RequestBody Map m,HttpServletResponse resp,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		try{
			map=ihds.updateMyPWDService(m);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*修改开门密码   用于微信小程序*/
	@RequestMapping("/updateKMPWDByWechat")
	@ResponseBody
	public Map<String,Object> updateKMPWDByWeChat(HolderData record,HttpServletResponse resp,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		try{
			map=ihds.updateKMPWDByWeChatService(record);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	//忘记密码
	@ResponseBody
	@RequestMapping("/updateForget")
	public Map<String, Object> updateForget(HolderData record,HttpServletResponse resp,HttpSession session){
		Map<String,Object> map=new HashMap<String,Object>();
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		try{
			int i=ihds.updatePWDService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
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
	
	/*通过主键查询实体类信息 HolderData*/
	@RequestMapping("/queryHolderInfoByHolder")
	@ResponseBody
	public Map<String,Object> queryHolderInfoByHolderController(String holderno,HttpServletRequest request,HttpServletResponse resp){
		Map<String,Object> map=new HashMap<String,Object>();
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		try{
			map=ihds.queryHolderInfoByHolderService(holderno);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*添加新用户  管理员或有权限之人*/
	@RequestMapping("/insertHolderData")
	@ResponseBody
	public Map<String,Object> insertHolderDataController(MultipartFile file1,MultipartFile file2,String str2,String str,String holderno,HttpServletRequest request,HttpServletResponse resp){
		Map<String,Object> map=new HashMap<String,Object>();
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		try{
			map=ihds.insertSelectiveService(file1,file2,str,str2,holderno);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	

	/*更新用户信息  管理员或有权限之人*/
	@RequestMapping("/updateHolderData")
	@ResponseBody
	public Map<String,Object> updateHolderData(MultipartFile file1,MultipartFile file2,String str,String str1,HttpServletResponse resp){
		Map<String,Object> map=new HashMap<String,Object>();
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		try{
			map=ihds.updateHolderService(file1, file2, str, str1);
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*
	 * 查询用户列表信息 超级管理员*/
	@RequestMapping("/queryHolderDataListByPage")
	@ResponseBody
	public Map<String,Object> queryHolderDataListByPageController(HolderData record,PageInfo pageinfo,HttpServletRequest request,HttpServletResponse resp,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			List<String> deptnos=new ArrayList<String>();
			List<Map<String,Object>> list=irs.queryDeptNoListByLoginPersonService(str);
			if(list.size()>0){
				for(int i=0;i<list.size();i++){
					deptnos.add(list.get(i).get("deptno").toString());
				}
			}else{
				deptnos.add("000");
			}
			map.put("pageinfo", pageinfo);
			ma.put("list", deptnos);
			ma.put("holderno", record.getHolderno());
			ma.put("holdername", record.getHoldername());
			ma.put("departmentno", record.getDepartmentno());
			ma.put("idcode", record.getIdcode());
			ma.put("holdercard", record.getHoldercard());
			list=ihds.queryHolderDataListByPageService(ma,pageinfo);
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
	 * 查询用户列表信息 超级管理员*/
	@RequestMapping("/queryHolderDataList")
	@ResponseBody
	public Map<String,Object> queryHolderDataListController(HolderData record,HttpServletRequest request,HttpServletResponse resp,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		try{
			List<String> deptnos=new ArrayList<String>();
			List<Map<String,Object>> list=irs.queryDeptNoListByLoginPersonService(str);
			if(list.size()>0){
				for(int i=0;i<list.size();i++){
					deptnos.add(list.get(i).get("deptno").toString());
				}
			}else{
				deptnos.add("000");
			}
			ma.put("list", deptnos);
			ma.put("holderno", record.getHolderno());
			ma.put("holdername", record.getHoldername());
			ma.put("departmentno", record.getDepartmentno());
			ma.put("idcode", record.getIdcode());
			ma.put("holdercard", record.getHoldercard());
			list=ihds.queryHolderDataListService(ma);
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
	
	/**
	 * 登录接口
	 * @return
	 */
	@RequestMapping("/queryLoginCheck")
	@ResponseBody
	public Map<String, Object> queryLoginCheckController(@RequestBody HolderData record, HttpSession session,
			HttpServletResponse resp) {
		resp.setHeader("Access-Control-Allow-Origin", "*");// 解决跨域问题
		Map<String, Object> map = new HashMap<>();
		try {
			if(record.getHolderno().equals("administrator") || record.getHolderno().equals("Administrator")){//超级管理员登录
				Map<String,Object> resultMap = new HashMap<String,Object>();
				Properties properties = new Properties();
				try {
					properties = PropertiesLoaderUtils.loadAllProperties("loadParm.properties");
					String supper_password = (String) properties.get("supper_password");
					String password = record.getLoginpassword();
					String passwordMd5 = DigestUtils.md5DigestAsHex(password.getBytes());
					if(!supper_password.equals(passwordMd5.toUpperCase())){
						resultMap.put("flag", false);
						resultMap.put("reason", "用户名或者密码错误");
						return resultMap;
					}
					Map<String,Object> superMap = new HashMap<String,Object>();
					superMap.put("holderno", "administrator");
					superMap.put("holdername", "超级管理员");
					resultMap.put("flag", true);
					resultMap.put("reason", "登录成功");
					resultMap.put("result",superMap);
					session.setAttribute("holderno", record.getHolderno());
					return resultMap;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
			// 用户名存在 且有登录权限时 判断密码是否有误
			HolderData holderData = ihds.queryLoginCheckService(record);
			// 用户名或密码有误时 登录失败
			if (holderData == null || "".equals(holderData)) {
				map.put("flag", false);
				map.put("reason", "用户名或者密码错误");
			} else {
				// 获取登录权限
				String holderstatus = holderData.getHolderstatus();
				if (!holderstatus.equals("11")) {// 如果权限不等于11,则没有登录权限
					map.put("flag", false);
					map.put("reason", "该用户没有登录权限!");
				} else {
					// 首先查询底层部门是否有账号
					Applet_AccountData accountdata = amservice.queryAccount(holderData.getDepartmentno());

					// 在查询顶级部门是否有账号
					Applet_AccountData account = amservice
							.queryCheckHolder(holderData.getDepartmentno().subSequence(0, 3).toString());

					if (accountdata == null && account == null) {
						map.put("flag", true);
						map.put("reason", "登录成功");
						map.put("result", holderData);
						session.setAttribute("holderno", holderData.getHolderno());
					} else if (accountdata != null && account != null) {// 顶级和底层部门都不为空
						// 放入底层部门的accountid
						holderData.setAccountid(accountdata.getAccountid());
						map.put("flag", true);
						map.put("reason", "登录成功");
						map.put("result", holderData);
						session.setAttribute("holderno", holderData.getHolderno());
					} else if (accountdata != null && account == null) {// 底层部门不为空
						// 放入底层部门的accountid
						holderData.setAccountid(accountdata.getAccountid());
						map.put("flag", true);
						map.put("reason", "登录成功");
						map.put("result", holderData);
						session.setAttribute("holderno", holderData.getHolderno());
					} else {// 顶级部门不为空
							// 放入底层部门的accountid
						holderData.setAccountid(account.getAccountid());
						map.put("flag", true);
						map.put("reason", "登录成功");
						map.put("result", holderData);
						session.setAttribute("holderno", holderData.getHolderno());
					} // end
				}
			}
		} catch (Exception ex) {
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}// end
	
	
	
	/*查询信息  通过主键查询数据 根据工号查姓名 单表查询*/
	@RequestMapping("/queryHolderData")
	@ResponseBody
	public Map<String,Object> queryLoginCheckController(String holderno,HttpServletRequest request,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<>();
		try{
			HolderData holderData=ihds.queryHolderByHolderService(holderno);
			map.put("flag", true);
			map.put("reason", "查询成功!");
			map.put("result", holderData);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*查询信息  通过主键查询数据*/
	@RequestMapping("/queryHolderDataByHolderNo")
	@ResponseBody
	public Map<String,Object> queryHolderDataByHolderNo(String holderno,HttpServletRequest request,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<>();
		try{
			HolderData holderData=ihds.selectByPrimaryKeyService(holderno);
			if(holderData!=null && !"".equals(holderData)){
				    map.put("flag", true);
					map.put("reason", "查询成功!");
					map.put("result", holderData);
			 }else{
				   map.put("flag", false);
				   map.put("reason", "暂无数据可查!");
			 }
		}catch(Exception ex){
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
	@RequestMapping("/checkExcelData")
	public Map<String, Object> checkExcelData(@RequestParam MultipartFile file,HttpServletResponse resp) throws Exception{
		Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
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
	 * 作者:csc
	 * 作用:Excel批量导入
	 * @throws IOException 
	 * @throws BiffException 
	 */
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping("/ExcelAdd")
	public Map<String, Object> ExcelAdd(@RequestBody Map<String, Object> accept,HttpServletResponse resp,HttpSession session) throws BiffException, IOException{
		Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		//获取登录人的员工工号
		String holderno = (String)session.getAttribute("holderno");
		
		List<Map<String, Object>> IDlist = (List<Map<String, Object>>) accept.get("IDlist");//获取所有身份证号
		
		List<Map<String, Object>> NOlist = (List<Map<String, Object>>) accept.get("NOlist");//获取所有工号
		
		
		/*List<Map<String, Object>> Cardlist=  (List<Map<String, Object>>) accept.get("Cardlist");//获取所有卡号*/	
		
		List<Map<String, Object>> Deptlist = (List<Map<String, Object>>) accept.get("Deptlist");//获取所有提交的部门
		
		
		List<String> nothavedept = new ArrayList<String>();//用于存放不存在的部门
		List<String>  havedept = new ArrayList<String>();//用于存放存在的部门
		for (int i = 0; i < Deptlist.size(); i++) {
		 String departmentname  =	(String) Deptlist.get(i).get("dept");//部门名称
		 String departmentno =  ihds.queryExcelDeptno(departmentname, holderno);//查询该部门是否存在
		 if(departmentno==null || departmentno==""){
			 nothavedept.add(departmentname);//不存在的放入不存在的集合
		 }else{
			 havedept.add(departmentno);
		  }
		}//end for
		
         List<String> Holderdata = new ArrayList<String>();//用于存放已经存在的工号
		for (int i = 0; i < NOlist.size(); i++) {//工号
			  String gonghao = (String) NOlist.get(i).get("holderno");
		  String userno =  ihds.queryExcelHoderNo(gonghao);
		   if(userno!=null){
			   Holderdata.add(userno);
		   }
		}//end for  工号
		
	     List<String>  idcodedata = new ArrayList<String>();//用于存放已经存在身份证号
		
		 for (int i = 0; i < IDlist.size(); i++) {//身份证号
			String idcode= (String) IDlist.get(i).get("idcode");
		   String  useridcode = ihds.queryExcelIdCode(idcode);
		   if(useridcode!=null){
			   idcodedata.add(useridcode);
		   }
		 }//end for  身份证号
		
	/*	List<String> carddata = new ArrayList<String>();//用于存放已经存在的卡号
		
		for (int i = 0; i < Cardlist.size(); i++) {
		  String holdercard =	(String) Cardlist.get(i).get("holdercard");
		  String cardno =	ihds.queryExcelCardNo(holdercard);
		  if(cardno!=null){
			  carddata.add(cardno);//放入已经存在
		  }
		}//end for 卡号
*/		
		if((nothavedept.size()==0) && (Holderdata.size()==0) && (idcodedata.size()==0)){
			
		  List<Map<String, Object>> list = 	 (List<Map<String, Object>>) accept.get("Datalist");//获取所有表格数据
		  List<Map<String, Object>> newlist = new ArrayList<Map<String, Object>>(); 
		        for (int j = 0; j < list.size(); j++) {
		        	Map<String, Object> zhong =	list.get(j);
		        	zhong.put("departmentno", havedept.get(j));
		        	zhong.remove("deptno");
		        	newlist.add(zhong);
		         }
		   
		        List<Map<String, Object>> zuihou = new ArrayList<Map<String, Object>>(); 
		         for (int i = 0; i < newlist.size(); i++) {
					int point=100;//定义一次添加多少个
					  zuihou.add(newlist.get(i));
		        	 if(point==zuihou.size() || i==newlist.size()-1){
		        		 ihds.insertBatchHolderData(zuihou);
		        		 zuihou.clear();
		        	 }
				}
		       map.put("flag", true);
			   map.put("reason", "数据添加成功");
		}else{
			   map.put("flag", false);
			   map.put("reason", "数据重复或者不存在!添加失败");
			   map.put("holdernolist", Holderdata);//重复的工号
			   map.put("idnumberlist", idcodedata);//重复的身份证号
			   map.put("notdeptlist", nothavedept);//不存在的部门
			  // map.put("cardlist", carddata);//重复的卡号
		}
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	
	/*
	 * 修改 是否授权
	*/
	@RequestMapping("/updateHolderStatus")
	@ResponseBody
	public Map<String,Object> updateHolderStatusController(HolderData record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ihds.updateHolderStatusService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改授权成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "修改授权失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*修改 是否预警提示*/
	@RequestMapping("/updateWarningName")
	@ResponseBody
	public Map<String,Object> updateWarningNameController(HolderData record,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ihds.updateWarningNameService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改提示成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "修改提示失败！");
			} 
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*查询   退休预警  */
	@RequestMapping("/queryRetireList")
	@ResponseBody
	public Map<String,Object> queryRetireListController(Map m,HttpServletRequest request,HttpServletResponse resp,String str){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
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
			m.put("list", deptnos);
			List<Map<String, Object>> list=ihds.queryRetireListService(m);
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
		
	/*查询   退休预警  */
	@RequestMapping("/queryRetireListByPage")
	@ResponseBody
	public Map<String,Object> queryRetireListByPageController(String idcode,String holdername,String diff,PageInfo pageinfo,HttpServletRequest request,HttpServletResponse resp,String str){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
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
			ma.put("idcode", idcode);
			ma.put("holdername", holdername);
			ma.put("diff", diff);
			map.put("pageinfo", pageinfo);
			List<Map<String, Object>> list=ihds.queryRetireListByPageService(ma,pageinfo);
			if(list.size()>0 ){
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
	
	/*批量删除  逻辑删除  即是批量修改*/
	@RequestMapping("/updateHolderDataBatchs")
	@ResponseBody
	public Map<String,Object> updateHolderDataBatchsController(@RequestBody List<HolderData> list,HttpServletRequest request,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		List<HolderData> lis=new ArrayList<HolderData>();
		try{
			for(int i=0;i<list.size();i++){
				HolderData h=new HolderData();
				h.setHolderno(list.get(i).getHolderno());
				h.setUpdatedate(new Date());
				h.setUpdateperson((String)request.getSession().getAttribute("holderno"));
				lis.add(h);
			}	
			int i=0;
			if(lis.size()>0){
				i=ihds.updateHolderDataBatchsService(lis);
			}
			if(i>0){
				map.put("flag", true);
				map.put("reason", "批量删除成功！");
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
	
	
		
	/*退出系统*/
	@RequestMapping("/loginExit")
	@ResponseBody
	public Map<String,Object> loginExitController(HttpSession session,HttpServletRequest request,HttpServletResponse response,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		/*Cookie cookie=new Cookie("myCookie",null);
		cookie.setMaxAge(0);
		cookie.setPath("/");
		response.addCookie(cookie);*/
		try{
			request.getSession().removeAttribute("holderno");
			//request.getSession().removeAttribute("deptnos");
			request.getSession().removeAttribute("maxdatano");
			request.getSession().removeAttribute("maxid");
			//session.invalidate();//清除session对象中的所有信息
			request.getSession().invalidate();//清除session对象中的所有信息
			map.put("flag", true);
			map.put("reason", "退出成功！");
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/*通过卡号查询实体类信息  出库时刷卡获取领取人信息*/
	@RequestMapping("/queryHolderDataByHolderCard")
	@ResponseBody
	public Map<String,Object> queryHolderDataByHolderCardController(String holdercard,HttpServletRequest request,HttpServletResponse resp){
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Map<String,Object> holderData=ihds.queryByHolderCardService(holdercard);
			if(holderData!=null && !"".equals(holderData)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", holderData);
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
	

	/*通过卡号查询实体类信息  出库时刷卡获取领取人信息*/
	@RequestMapping("/getNextHolder")
	@ResponseBody
	public Map<String,Object> getNextHolder(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String holderno=ihds.getNextHolderService();
			map.put("flag", true);
			map.put("result", holderno);
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
}


