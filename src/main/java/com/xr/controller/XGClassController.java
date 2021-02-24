package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xr.entity.XGClass;
import com.xr.service.XGClassService;

import net.sf.json.JSONObject;

/**
 * @ClassName XGClassController
 * @Description 班次处理的接口层
 * @Author csc
 * @Date 2019年11月19日 上午11:47:10
 */
@RestController
@RequestMapping("Class")
public class XGClassController {

	 @Autowired
	 private XGClassService clservice;
	 //批量添加班次
	  @RequestMapping("/insertClassInfor")
	  public Map<String, Object> insertClassInfor(@RequestBody List<JSONObject> list){
		  Map<String,Object> map=new HashMap<>();
	      Integer flay =  clservice.insertClassInfor(list);
	      if(flay!=null){
	    	    map.put("flag", true);
				map.put("reason", "添加成功");
	      }else{
	    	    map.put("flag", false);
				map.put("reason", "添加失败");
	      }
		  return map;
	  }
	  //根据ID删除班次信息
	  @RequestMapping("/deleteClassInfor")
	  public Map<String, Object> deleteClassInfor(Integer classid){
		  Map<String,Object> map=new HashMap<>();
			 boolean flay = clservice.deleteClassInfor(classid);
			 if(flay){
				  map.put("flag", true);
				  map.put("reason", "删除成功");
			 }else{
				  map.put("flag", false);
				  map.put("reason", "删除失败");
			 }
		  return map;
	  }
	  //编辑排班信息
	 @RequestMapping("/updateClass")
     public Map<String, Object> updateClass(@RequestBody List<Map<String, Object>> xgcla){
			Map<String,Object> map=new HashMap<>();
			boolean flay = clservice.updateClass(xgcla);
			if(flay){
				map.put("flag", true);
				map.put("reason", "修改成功");
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败");
			}
			return map;
		}
	 
	    //查询所有班次
		@RequestMapping("/queryAllClass")
		public Map<String, Object> queryAllClass(@RequestParam(defaultValue="1",required=true,value="pageNo") Integer pageNo,
				@RequestParam(defaultValue="1",required=true,value="pageSize") Integer pageSize){
			Map<String,Object> map=new HashMap<>();
			//分页查询
	        PageHelper.startPage(pageNo, pageSize);
			List<XGClass> classlist = clservice.queryAllClass();
			PageInfo<XGClass> pageInfo=new PageInfo<XGClass>(classlist);
			if(classlist.size()==0 || classlist ==null){
				map.put("flag", false);
				map.put("reason", "暂无班次信息!");
			}else{
				map.put("flag", true);
				map.put("reason", "排班查询成功!");
				map.put("result", pageInfo);
			}
			return map;
		}//end
	
		 //根据路线ID查询所有班次(线路巡更班次表)
		 @RequestMapping("/queryXGClass")
		 public Map<String, Object> queryXGClass(XGClass glass){
				Map<String,Object> map=new HashMap<>();
				List<Map<String, Object>> xgclasslist = clservice.queryXGClass(glass);
				if(xgclasslist.size()==0 || xgclasslist ==null){
					map.put("flag", false);
					map.put("reason", "暂时没有数据!");
				}else{
					map.put("flag", true);
					map.put("reason", "排班查询成功!");
					map.put("result", xgclasslist);
				}
				return map;
			}//end
		
	
	
}
