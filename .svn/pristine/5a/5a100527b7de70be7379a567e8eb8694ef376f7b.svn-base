package com.xr.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.Applet_AccountData;
import com.xr.entity.Applet_AccountPhotoData;
import com.xr.entity.Applet_RoleModel;
import com.xr.service.Applet_ManageService;
import com.xr.tool.ImageSizeUtil;

import net.sf.json.JSONObject;

/**
 * @author csc
 *  小程序管理模块控制层
 */
@RestController
@RequestMapping("manage")
public class Applet_ManageController {

	/**引入小程序模块的业务控制层*/
	@Autowired
	private Applet_ManageService amgeservice;
	
	/**
	 * 新增账户并关联账户所拥有的权限
	 * @param revice
	 * @throws ParseException 
	 */
	@RequestMapping("/insertAccount")
	public Map<String, Object> insertAccoun(@RequestBody Map<String, Object> revice) throws ParseException{
		Map<String, Object> map = new HashMap<>();//定义一个map返回给前段
		
		String departmentno = (String)revice.get("departmentno");//作用的部门
		Applet_AccountData accountData = amgeservice.queryAccount(departmentno);
		
		revice.get("logophotos");
		
		if(accountData!=null){
			map.put("flag", false);
			map.put("reason", "一个公司只能允许有一个账户");
		}else{
     	  Integer accountid =	amgeservice.insertAccount(revice);
		
		List<Map<String, Object>> list = (List<Map<String, Object>>) revice.get("list");//获取权限的接口
		List<Map<String, Object>> canshu = new ArrayList<Map<String, Object>>();
		
			for(Map<String, Object> zhuanhuan:list){
				zhuanhuan.put("accountid", accountid);
				canshu.add(zhuanhuan);
			}
			amgeservice.insertAccountModel(canshu);
			map.put("flag", true);
			map.put("reason", "添加成功");
		}
		return map;
	}//end
	
	/**
	  * 调用两个方法
	 * 1,通过accountid查询账号的基本信息(selectOneAccount)
	 * 2,通过accountid查询账号所关联的模块(selectRoleModel)
	  * 用于修改时的查询
	 */
	@RequestMapping("/selectOneAccount")
	public Map<String, Object> selectOneAccount(Integer accountid){
		Map<String, Object> map = new HashMap<>();
		if(accountid==null){
			map.put("flag", false);
			map.put("reason", "编号不能为空");
		}else{
			Map<String, Object> appletAccount =	amgeservice.selectOneAccount(accountid);
		List<Applet_RoleModel> rolelist = amgeservice.selectRoleModel(accountid);
		
			if(appletAccount==null && rolelist.size()==0){
				map.put("flag", false);
				map.put("reason", "查询失败");
			}else{
				map.put("flag", true);
				map.put("reason", "查询成功");
				map.put("result", appletAccount);
				map.put("list", rolelist);
			}
		}
		return map;
	}//end
	
	/**
	 * 修改用户申请的账号状态
	 * 用于启用或者禁用
	 * @param account
	 */
	@RequestMapping("/updateAccountStatus")
	public Map<String, Object> updateAccountStatus(Applet_AccountData account){
		Map<String, Object> map = new HashMap<>();//定义一个Map返回给前段
		Integer accountid  = account.getAccountid();
		if(accountid==null){
			map.put("flag", false);
			map.put("reason", "编号不能为空");
		}else{
			amgeservice.updateAccountStatus(account);
			map.put("flag", true);
			map.put("reason", "修改成功");
		}
		return map;
	}//end
	
	/**
	 *  修改小程序账号
	 *  用于账户管理里面的修改
	 * @throws ParseException 
	 */
	@RequestMapping("/updateAccount")
	public Map<String, Object> updateAccount(@RequestBody Map<String, Object> revice) throws ParseException{
		Map<String, Object> map = new HashMap<String, Object>();
        //flay
		boolean flay = amgeservice.updateAccount(revice);
		if(flay) {
		   Integer accountid =	Integer.valueOf((String) revice.get("accountid"));
			amgeservice.deleteAccountModel(accountid);
			List<Map<String, Object>> list = (List<Map<String, Object>>) revice.get("list");//获取权限的接口
			List<Map<String, Object>> canshu = new ArrayList<Map<String, Object>>();
			
				for(Map<String, Object> zhuanhuan:list){
					zhuanhuan.put("accountid", accountid);
					canshu.add(zhuanhuan);
				}
				amgeservice.insertAccountModel(canshu);//重新添加权限
				map.put("flag", true);
				map.put("reason", "修改成功");
		}else {
			map.put("flag", false);
			map.put("reason", "修改失败");
		}
		return map;
	}//end
	
	
	
	
	/**
	 * 调用两个方法
	 * 1.删除申请账户的方法(deleteAccount)
	 * 2.删除账户关联权限的方法(deleteAccountModel)
	 * 3,删除账户设置的轮播图(deleteAccountPhoto)
	 * @param accounntid
	 * @return
	 */
	@RequestMapping("/deleteAccount")
	public Map<String, Object> deleteAccount(Integer accountid){
		Map<String, Object> map = new HashMap<>();//定义一个map返回给前段
		if(accountid==null){
			map.put("flag", false);
			map.put("reason", "编号不能为空");
		}else{
			amgeservice.deleteAccount(accountid);//删除账户
			amgeservice.deleteAccountModel(accountid);//删除账户关联的小程序模块
			amgeservice.deleteAccountPhoto(accountid);//删除账户设置的轮播图
			map.put("flag", true);
			map.put("reason", "删除成功");
		}
		return map;
	}//end
	
	/**
	 * 查询所有小程序用户的账户
	 * @return
	 */
	@RequestMapping("/selectAppletAccount")
	public  Map<String, Object> selectAppletAccount(@RequestBody JSONObject receive,HttpServletResponse resp){
		Map<String, Object> appletlist = amgeservice.selectAppletAccount(receive);
		appletlist.put("flag", true);
		appletlist.put("reason", "查询成功!");
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return appletlist;
	}//end
	
    
    
    /**
               * 通过模块的id来删除模块
     * @param modelno
     */
	@RequestMapping("/deleteAppletModel")
    public Map<String, Object> deleteAppletModel(Integer modelno){
    	Map<String, Object> map = new HashMap<>();//定义一个map返回给前段
    	if(modelno==null){
    		map.put("flag", false);
			map.put("reason", "模块编号不能为空");
    	}else{
    		amgeservice.deleteAppletModel(modelno);
    		map.put("flag", true);
			map.put("reason", "删除成功");
    	}
    	return map;
    }//end
    
    
    /**
               * 小程序照片的新增和修改、
               *用于个性设置中的照片 
     * @throws IOException 
     */
    @RequestMapping("/appletHandlePhoto")
    public Map<String, Object> appletHandlePhoto(@RequestParam(value="photo",required=false) MultipartFile photo,Applet_AccountPhotoData accountPhoto) throws IOException{
    	Map<String, Object> map = new HashMap<>();//定义一个map返回给前段
    	if(!photo.isEmpty()){	
    		accountPhoto.setAppletphoto(ImageSizeUtil.getFileBytes(photo));//将照片放入实体类中
    		Integer id = accountPhoto.getId();
        	if(id==null){
        		amgeservice.insertAccountPhoto(accountPhoto);
        		map.put("flag", true);
    			map.put("reason", "照片添加成功");
        	}else{
        		amgeservice.updateAccountPhoto(accountPhoto);
        		map.put("flag", true);
    			map.put("reason", "照片修改成功");
        	}
    	} else{
    		map.put("flag", false);
			map.put("reason", "照片不能为空");
    	}
    	return map;
    }//end
	
	/**
	 * 用于小程序登录成功后
	 * 查询accountid账号所拥有的相关模块
	 */
    @RequestMapping("/queryHaveModel")
    public Map<String, Object> queryHaveModel(Integer accountid){
    	Map<String, Object> map = new HashMap<>();//定义一个map返回给前段
    	    
      List<Map<String, Object>> modellist = amgeservice.queryHaveModel(accountid);
    	
       if(modellist.size()==0){
    	   map.put("flag", false);
		   map.put("reason", "您没有该模块功能");
       }else{
    	   map.put("flag", true);
		   map.put("reason", "查询成功");
		   map.put("result", modellist);
       }
    	return map;
    }//end

    /**
     * 查询小程序所有账户
	 * 用于管理照片
     */
    @RequestMapping("/queryAccountData")
    public Map<String, Object>  queryAccountData(){
    	Map<String, Object> map = new HashMap<>();//定义一个map返回个前段
       List<Map<String, Object>> accountlist =	amgeservice.queryAccountData();
       if(accountlist.size()==0){
    	   map.put("flag", false);
		   map.put("reason", "没有数据");
       }else{
    	   map.put("flag", true);
		   map.put("reason", "数据查询成功");
		   map.put("result", accountlist);
       }
    	return map;
    }//end
    
    /**
              * 通过accoountid查询账户下的照片
     * @return
     */
    @RequestMapping("/queryAccountPhoto")
    public Map<String, Object> queryAccountPhoto(Integer accountid){
    	Map<String, Object> map = new HashMap<>();//定义一个map返回个前端
    	if(accountid==null){
    		map.put("flag", false);
 		    map.put("reason", "编号不能为空");
    	}else{
    	 List<Applet_AccountPhotoData> accountPhotoList = 	amgeservice.queryAccountPhoto(accountid);
    	    if(accountPhotoList.size()==0){
    	    	map.put("flag", false);
     		    map.put("reason", "暂无数据可查");
    	    }else{
    	    	map.put("flag", true);
     		    map.put("reason", "查询成功");
    		    map.put("result", accountPhotoList);
    	    }
    	}
    	return map;
    }//end
    
    /**
               *  通过id删除账户照片
     */
    @RequestMapping("/deleteOneAccountPhoto")
    public Map<String, Object> deleteOneAccountPhoto(Integer id){
    	Map<String, Object> map = new HashMap<>();
    	if(id==null){
    		map.put("flag", false);
 		    map.put("reason", "编号不能为空");
    	}else{
    		amgeservice.deleteOneAccountPhoto(id);
    		map.put("flag", true);
 		    map.put("reason", "删除成功");
    	}
    	return map;
    }//end
    
    /**
	     * 通过小程序账户的accountid
	     * 来查询相关的LOGO和项目名称
	  *用于小程序和平台登录后的项目名称和LOGO 
     */
    @RequestMapping("/queryNameAndLogo")
    public Map<String, Object> queryNameAndLogo(@RequestParam(value="accountid",required=false,defaultValue="1")Integer accountid){
    	Map<String, Object> map = new HashMap<String, Object>();
    	if(accountid==null) {
    		map.put("flag", false);
 		    map.put("reason", "账户编号不能为空");
    	}else {
    		//通过accountid查询小程序账户的信息
    	  Map<String, Object> account =	amgeservice.selectOneAccount(accountid);	
	    	 if(account == null) {
	    		 map.put("flag", false);
				 map.put("reason", "暂未查到相关信息");
	    	 }else {
	    		 map.put("flag", true);
				 map.put("reason", "查询成功");
				 map.put("result", account);
	    	 }
    	}
    	return map;
    }//end
	
}
