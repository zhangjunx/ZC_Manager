package com.xr.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.SY210AppSet;
import com.xr.entity.VisitorsCardAppSet;
import com.xr.service.ISY210AppSetService;
import com.xr.service.IVisitorsCardAppSetService;

@Controller
@RequestMapping("VisitorsCardAppSet")
public class VisitorsCardAppSetController {
	@Autowired
	private IVisitorsCardAppSetService ivas;
	@Autowired
	private ISY210AppSetService isys;
	
	/*int insertVisitorsCardAppSetBatchService(Map m); //批量添加*/
	@RequestMapping("/insertVisitorsCardAppSetBatch")
	@ResponseBody
	public Map<String,Object> insertVisitorsCardAppSetBatchController(@RequestBody List<Map<String,Object>> list,HttpServletRequest request){
		Map<String,Object> map=new HashMap<String,Object>();
		//Map<String,Object> ma=new HashMap<String,Object>();
		List<Map<String,Object>> lit=new ArrayList<Map<String,Object>>();
		List<VisitorsCardAppSet> liss=new ArrayList<VisitorsCardAppSet>();
		try{
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			for(int i=0;i<list.size();i++){
				VisitorsCardAppSet vas=new VisitorsCardAppSet();
				int visitorsinfoid=Integer.parseInt((String) list.get(i).get("visitorsinfoid"));
				String cardno=(String) list.get(i).get("cardno");
				String cardid=(String) list.get(i).get("cardid");
				String startdate=(String) list.get(i).get("startdate");
				String datedate=(String) list.get(i).get("datedate");
				vas.setVisitorsinfoid(visitorsinfoid);
				vas.setStartdate(sdf.parse(startdate));
				vas.setDatedate(sdf.parse(datedate));
				vas.setCardno(cardno);
				vas.setCardid(cardid);
				String holderno=(String) request.getSession().getAttribute("holderno");
				vas.setOperatorname(holderno);
				vas.setOperatordate(new Date());
				int deviceno=Integer.parseInt((String) list.get(i).get("deviceno"));
				List<Map<String,Object>> lis=(List<Map<String, Object>>) list.get(i).get("doorlist");
				String str="0000";
				/*//通过cardID和appsetkey查访客是否已被授权
				VisitorsCardAppSet vcas=ivas.queryVisitorsCardAppSetByCardIDService(cardid);
				if(vcas!=null && !"".equals(vcas)){//访客已存在
					map.put("flag", false);
					map.put("reason", "对不起，持有该证件内码的访客已分配权限！");
					return map;
				}
				//访客不存在时*/
				char[] c=str.toCharArray();
				//通过门区获取EntryReader值
				for(int j=0;j<lis.size();j++){
					int channel=Integer.parseInt((String) lis.get(j).get("doorchannel"));
					for(int k=0;k<c.length;k++){
						if(channel==(k+1)){
							c[k]='1';
						}
					}
				}
				//将改变后的c转化为String
				str=String.valueOf(c);
				//String entryreader=str;
				//根据deviceNo和EntryReader查AppSetNo主键
				SY210AppSet sy=new SY210AppSet();
				sy.setDeviceno((short) deviceno);
				sy.setEntryreader(str);
				List<SY210AppSet> sylist=isys.querySY210AppSetByDeviceNoAndEntryReaderService(sy);
				if(sylist.size()>0){
					vas.setAppsetkey(sylist.get(0).getAppsetkey());
					vas.setStatusappset("1");
					liss.add(vas);
				}else{
					lit.add(list.get(i));
					map.put("flag", false);
					map.put("reason", "权限下放失败，没有对应的AppSetKey！");
					return map;
				}
			}
			int i=0;
			if(liss.size()>0){
				i=ivas.insertVisitorsCardAppSetBatchService(liss);
			}
			if(i>0){
				map.put("flag", true);
				map.put("reason", "权限下放成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "权限下放失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
}
