package com.xr.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Transformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.xr.entity.PageInfo;
import com.xr.entity.VisitorsInfo;
import com.xr.service.IVisitorsInfoService;

@Controller
@RequestMapping("VisitorsInfo")
public class VisitorsInfoController {
	@Autowired
	private IVisitorsInfoService ivis;
	
	/*添加访客 访客登记*/
	@RequestMapping("/insertVisitorsInfoAndPhoto")
	@ResponseBody
	public Map<String,Object> insertVisitorsInfoAndPhoto(@RequestParam("photo") MultipartFile file,String str,String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			VisitorsInfo record=JSON.parseObject(str, VisitorsInfo.class);
			int i=ivis.insertVisitorsInfoAndPhotoService(file, record,holderno);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "访客登记成功！");
				map.put("result", record);
				if(!file.isEmpty()){
					map.put("photo", file.getBytes());
				}else{
					map.put("photo", null);
				}
			}else{
				map.put("flag", false);
				map.put("reason", "访客登记失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*访客登记记录查询列表*/
	@RequestMapping("/queryVisitorsInfoList")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoListController(@RequestBody Map m){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=ivis.queryVisitorsInfoListService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*分页查询  访客登记记录查询列表*/
	@RequestMapping("/queryVisitorsInfoListByPage")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoListByPageController(String str, PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m=JSON.parseObject(str);
			List<Map<String,Object>> list=ivis.queryVisitorsInfoListByPageService(m,pageinfo);
			if(list.size()>0){
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
			map.put("reason", "程序异常,请联系管理员！");
		}
		return map;
	}//end
	
	/*  访客进出记录查询列表*/
	@RequestMapping("/queryVisitorsInfoIORecordList")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoIORecordListController(@RequestBody Map m){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=ivis.queryVisitorsInfoIORecordListService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/* 分页查询    访客进出记录查询列表*/
	@RequestMapping("/queryVisitorsInfoIORecordListByPage")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoIORecordListByPageController(String str,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Map<String,Object> m=JSON.parseObject(str);
			List<Map<String,Object>> list=ivis.queryVisitorsInfoIORecordListByPageService(m,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("page", pageinfo.getPageIndex());
				map.put("limit", pageinfo.getPageSize());
				map.put("total", pageinfo.getSumCount());
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*通过主键查询*/
	@RequestMapping("/queryByPrimaryKey")
	@ResponseBody
	public Map<String,Object> selectByPrimaryKeyController(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			Map<String,Object> vi=ivis.queryByPrimaryKeyService(id);
			if(vi!=null){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", vi);
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
	
	/*根据姓名查被访人员信息*/
	@RequestMapping("/queryVisitoredHolderByName")
	@ResponseBody
	public Map<String,Object> queryVisitoredHolderByNameController(String str){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=ivis.queryVisitoredHolderByNameService(str);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "该员工不存在！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据身份证号查访客*/
	@RequestMapping("/queryVisitorsInfoByIDCardNo")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoByIDCardNoController(String idcardno,String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			ma.put("idcardno", idcardno);
			ma.put("str", str);
			List<Map<String,Object>> list=ivis.queryVisitorsInfoByIDCardNoService(ma);
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
	
	
	/*小程序中添加访客 访客登记*/
	@RequestMapping("/insertVisitorsInfoByChat")
	@ResponseBody
	public Map<String,Object> insertVisitorsInfoByChat(@RequestParam("photo") MultipartFile photo,VisitorsInfo record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			 int i=ivis.insertVisitorsInfoAndPhotoByWechat(photo, record);
			 if(i>0){
					map.put("flag", true);
					map.put("reason", "登记成功！");
					map.put("result", record);
					map.put("kmpass", record.getPhone().substring(5));
					if(!photo.isEmpty()){
						map.put("photo", photo.getBytes());
					}else{
						map.put("photo", null);
					}
				}else{
					map.put("flag", false);
					map.put("reason", "登记失败！");
				}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/*根据登录人工号 查自己待审批的访客消息*/
	@RequestMapping("/queryVisitorsInfoByHolderAndUnaudited")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoByHolderController(String str,String receiverpeopleid,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			if(str!=null && !"".equals(str)){
				m=JSON.parseObject(str);
			}
			m.put("receiverpeopleid", receiverpeopleid);
			List<Map<String,Object>> list=ivis.queryVisitorsInfoByHolderAndUnauditedService(m,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("total", pageinfo.getSumCount());
				map.put("page", pageinfo.getTotalPage());
				map.put("limit", pageinfo.getPageSize());
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
	
	/*根据登录人工号 查已审批的所有的访客信息*/
	@RequestMapping("/queryVisitorsInfoByHolderAndAudited")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoByHolderAndAuditedController(String str,String receiverpeopleid,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			if(str!=null && !"".equals(str)){
				m=JSON.parseObject(str);
			}
			m.put("receiverpeopleid", receiverpeopleid);
			 List<Map<String,Object>> list=ivis.queryVisitorsInfoByHolderAndAuditedService(m,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("total", pageinfo.getSumCount());
				map.put("page", pageinfo.getTotalPage());
				map.put("limit", pageinfo.getPageSize());
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
	
	/* 根据登录人工号 查待自己所有的访客信息*/
	@RequestMapping("/queryVisitorsInfoByLoginHolder")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoByLoginHolderController(String str,String receiverpeopleid,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			if(str!=null && !"".equals(str)){
				m=JSON.parseObject(str);
			}
			m.put("receiverpeopleid", receiverpeopleid);
			List<Map<String,Object>> list=ivis.queryVisitorsInfoByLoginHolderService(m,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("total", pageinfo.getSumCount());
				map.put("page", pageinfo.getTotalPage());
				map.put("limit", pageinfo.getPageSize());
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
	
	/*访客申请审批  被访人点击 同意或不同意*/
	@RequestMapping("/updateVisitorsApplyStatus")
	@ResponseBody
	public Map<String,Object> updateVisitorsApplyStatusController(@RequestBody VisitorsInfo record,String holderno){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			record.setBackdate(new Date());
			int i=ivis.updateVisitorsApplyStatusService(record,holderno);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "审核成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "审核失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end

	/*根据访客姓名和电话查是否已有历史信息*/
	@RequestMapping("/queryVisitorsByNameAndPhone")
	@ResponseBody
	public Map<String,Object> queryVisitorsByNameAndPhone(String visitorsname,String phone){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			ma.put("visitorsname", visitorsname);
			ma.put("phone", phone);
			Map<String, Object> map1=ivis.queryVisitorsByNameAndPhoneService(ma);
			if(map1!=null && !"".equals(map1)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", map1);
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
	
	/*根据访客openid查是否最新的历史信息*/
	@RequestMapping("/queryVisitorsInfoByOpenId")
	@ResponseBody
	public Map<String,Object> queryVisitorsInfoByOpenId(String openid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("openid", openid);
			Map<String, Object> map1=ivis.queryVisitorsInfoByOpenIdService(m);
			String str=(String) map1.get("doorarr");
			List<Short> doornos=new ArrayList<Short>();
			if(str!=null && !"".equals(str)){
				List<String> arr=Arrays.asList(str.split(","));
				CollectionUtils.collect(arr, new Transformer(){
					@Override
					public Object transform(Object o) {
						return Short.parseShort(o.toString());
					}
				}, doornos);
				//doornos不为空
				List<Map<String,Object>> doorlist=ivis.getVDoorPermService(doornos);
				if(doorlist.size()>0){
					map.put("doorperm", doorlist);
				}
			}
			if(map1!=null ){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", map1);
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
	
	/*根据访客姓名和电话查是否已有历史信息*/
	@RequestMapping("/queryVisitorsListByNameAndPhone")
	@ResponseBody
	public Map<String,Object> queryVisitorsListByNameAndPhone(String visitorsname,String phone,PageInfo pageinfo){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> ma=new HashMap<String,Object>();
		try{
			ma.put("visitorsname", visitorsname);
			ma.put("phone", phone);
			List<Map<String, Object>> list=ivis.queryVisitorsListByNameAndPhoneService(ma,pageinfo);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("total", pageinfo.getSumCount());
				map.put("limit", pageinfo.getPageSize());
				map.put("page", pageinfo.getPageIndex());
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
	
	/*根据访客姓名和电话查是否已有历史信息*/
	@RequestMapping("/getVDoorPerm")
	@ResponseBody
	public Map<String,Object> getVDoorPerm(Integer id){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", id);
			Map<String, Object> record=ivis.getDoorArrByIdService(m);
			if(record==null || "".equals(record)){
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
				return map;
			}
			List<Short> doornos=new ArrayList<Short>();
			String doorarr=(String) record.get("doorarr");
			List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
			if(doorarr!=null && !"".equals(doorarr)){
				List<String> arr=Arrays.asList(doorarr.split(","));
				CollectionUtils.collect(arr, new Transformer(){
					@Override
					public Object transform(Object o) {
						return Short.parseShort(o.toString());
					}
				}, doornos);
				//doornos不为空
				list=ivis.getVDoorPermService(doornos);
			}
			
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
	 * 访客进出记录 详情查看
	 */
	@RequestMapping("/getVisitorsIORecord")
	@ResponseBody
	public Map<String,Object> getVisitorsIORecord(Integer datano){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("datano", datano);
			Map<String, Object> record=ivis.getVisitorsIORecordService(m);
			if(record!=null && !"".equals(record)){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", record);
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
