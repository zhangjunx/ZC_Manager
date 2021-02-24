package com.xr.controller;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xr.entity.NB_IOData;
import com.xr.service.NB_IODataService;
import com.xr.util.GetSystemDate;
import com.xr.util.ThreadLocalDateUtil;

/**
 * 健康打卡的控制层
 * @author csc
 */
@RestController
@RequestMapping("Healthy")
public class NB_IODataController {

	/**引入健康打卡的业务层*/
	@Autowired
	private NB_IODataService IOservice;
	
	/**
	 * 新增健康打卡
	 * 小程序专用
	 * @throws ParseException 
	 */
	@RequestMapping("/insertNBIOData")
	public Map<String, Object> insertNBIOData(NB_IOData nbiodata) throws ParseException{
		//定义一个map返回给前段
		Map<String, Object> resultMap = new HashMap<String, Object>();
		 if(nbiodata==null){
			 resultMap.put("flag", false);
			 resultMap.put("reason", "参数不能为空");
		 }else{
			 //放入健康打卡时间
			 nbiodata.setNbdate(ThreadLocalDateUtil.parse(GetSystemDate.getTodayByFormat("yyyy-MM-dd HH:mm:ss")));
			 IOservice.insertNBIOData(nbiodata);
			 resultMap.put("flag", true);
			 resultMap.put("reason", "添加成功");
		 }
		return resultMap;
	}//end
	
	/**
	 * 通过工号查询当天,
	 * 最后一次提交(也就是时间最大的健康记录打卡)的温度
	 */
	@RequestMapping("/queryMaxHealthRecord")
	public Map<String, Object> queryMaxHealthRecord(String holderno){
		
		Map<String, Object> map = new HashMap<>();
		
		if(holderno.equals("") || holderno == null){//判断工号是否为空
			map.put("flag", false);
			map.put("reason", "工号不可为空");
			map.put("result", null);
		}else{
			NB_IOData nbiodata = IOservice.queryMaxHealthRecord(holderno);
			if(nbiodata == null){
				map.put("flag", false);
				map.put("reason", "无健康打卡记录");
				map.put("result", nbiodata);
			}else{
				map.put("flag", true);
				map.put("reason", "查询成功");
				map.put("result", nbiodata);
			}
		}
		return map;
	}//end
	
	
	
	
	
	
	
}
