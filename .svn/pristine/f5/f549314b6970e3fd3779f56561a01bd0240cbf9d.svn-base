package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.IACL_Menu_PermService;

@Controller
@RequestMapping("ACL_Menu_Perm")
public class ACL_Menu_PermController {
	@Autowired
	private IACL_Menu_PermService imps;
	
	/*菜单功能一体树形接口*/
	@RequestMapping("getMenuPermTree")
	@ResponseBody
	public Map<String,Object> getMenuPermTree(){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			List<Map<String,Object>> list=imps.getMenuPermTree();
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功!");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception e){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	

}
