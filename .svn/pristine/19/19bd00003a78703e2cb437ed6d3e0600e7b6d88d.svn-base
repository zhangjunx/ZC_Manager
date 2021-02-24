package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.xr.entity.LPR_VehicleIOData;
import com.xr.entity.PageInfo;
import com.xr.service.ILPR_VehicleIODataService;

/**
 * @ClassName LPR_VehicleIODataController
 * @Description 车辆进出记录和实时进出的控制层
 * @Author csc
 * @Date 2019年12月10日 下午4:38:54
 */
@RestController
@RequestMapping("LPR_VehicleIOData")
public class LPR_VehicleIODataController {

	@Autowired
	private ILPR_VehicleIODataService vios;//引入车辆进出信息的业务层
	
	/*List<Map<String,Object>> queryVehicleLastIORecordService(Map m);//查询上一条记录 根据车牌号和id
	@RequestMapping("/queryVehicleLastIORecord")
	@ResponseBody
	public Map<String,Object> queryVehicleLastIORecordController(@RequestBody Map m){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			 Integer id=Integer.parseInt((String) m.get("id"));
			 m.put("id", id);
			 Map<String,Object> list = vios.queryVehicleLastIORecordService(m);
			if(list.size()>0){
					map.put("flag", true); 
					map.put("reason", "查询成功！");
					map.put("result", list);
				}else{
					map.put("flag",false);
					map.put("reason", "暂无上一条记录可查！");
				}
		}catch(Exception ex){
				map.put("flag", false);
				map.put("reason", "程序异常，请联系管理员！");
		}	 
		return map;
	}//end
*/	
	/*查询上一条记录 根据车牌号和id*/
	@RequestMapping("/queryVehicleLastIORecord")
	public Map<String,Object> queryVehicleLastIORecordController(@RequestBody LPR_VehicleIOData record){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		List<Map<String,Object>> lis=new ArrayList<Map<String,Object>>();
		
			List<Map<String,Object>> list = vios.queryVehicleLastIORecordService(record);
			Integer maxid=(Integer) list.get(0).get("id");
			for(int i=0;i<list.size();i++){
				Integer id=(Integer) list.get(i).get("id");
				boolean res=false;
				if(id>=maxid){
					maxid=id;
					res=true;
				}
				if(res){
					map.put("result", list.get(i));
				}
			}
			if(list.size()>0){
				map.put("flag", true); 
				map.put("reason", "查询成功！");
			}else{
				map.put("flag",false);
				map.put("reason", "暂无上一条记录可查！");
			}
		return map;
	}//end
	
	/* 车辆 进出记录查询*/
	@RequestMapping("/queryVehicleIORecordList")
	@ResponseBody
	public Map<String,Object> queryVehicleIORecordListController(@RequestBody Map m){
		Map<String,Object> map=new HashMap<String,Object>();
			 List<Map<String,Object>> list = vios.queryVehicleIORecordListService(m);
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
	
	/*车辆 进出记录查询 分页查询*/
	@ResponseBody
	@RequestMapping("/queryVehicleIORecordListByPage")
	public Map<String,Object> queryVehicleIORecordListByPageController(@RequestBody Map m,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
			 map.put("pageinfo",pageinfo);
			 List<Map<String,Object>> list = vios.queryVehicleIORecordListByPageService(m, pageinfo);
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
	
	/* 查询车辆进出记录的最大值 */
	@ResponseBody
	@RequestMapping("/queryVehicleIOMaxID")
	public Map<String,Object> queryVehicleIOMaxIDController(HttpSession session){
		Map<String,Object> map=new HashMap<String,Object>();
			Integer maxid = vios.queryVehicleIOMaxIDService();
			if(maxid>0){
				map.put("flag", true); 
				map.put("reason", "查询成功！");
				session.setAttribute("maxid", maxid);
			}else{
				map.put("flag",false);
				map.put("reason", "暂无数据可查！");
				session.setAttribute("maxid", 0);
			}
		return map;
	}//end
	
	/* 车辆  实时进出记录查询 */
	@RequestMapping("/queryVehicleCurrIORecordList")
	public Map<String,Object> queryVehicleCurrIORecordListController(HttpServletRequest request,HttpSession session){
		Map<String,Object> map=new HashMap<String,Object>();
			Integer id=null;
			Integer maxid=null;
			if(request.getSession().getAttribute("maxid")==null || "".equals(request.getSession().getAttribute("maxid"))){
				 maxid = vios.queryVehicleIOMaxIDService();
				session.setAttribute("maxid", maxid);
			}else{
				maxid=(Integer) request.getSession().getAttribute("maxid");
			}
			if(maxid==null || maxid.equals("")){
				maxid=0;
			}
			id=maxid;
			List<Map<String,Object>> list=vios.queryVehicleCurrIORecordListService(id);
			for(int i=0;i<list.size();i++){
				Integer id2=(Integer) list.get(i).get("id");
				if(id2>maxid){
					maxid=id2;
				}
			}
			session.setAttribute("maxid", maxid);
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
	
	
}
