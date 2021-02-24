package com.xr.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.AdminData;
import com.xr.service.IAdminDataService;

@Controller
@RequestMapping("AdminData")
public class AdminDataController {
	@Autowired
	private IAdminDataService iads;
	
	/*通过工号查管理员所在公司*/
	@RequestMapping("/queryAdminDataByHolderNo")
	@ResponseBody
	public Map<String,Object> queryAdminDataByHolderNoController(String holderno,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			String holderno1=(String) request.getSession().getAttribute("holderno");
			List<AdminData> list=iads.queryAdminDataByHolderNoService(holderno1);
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

}
