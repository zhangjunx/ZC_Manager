package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xr.entity.KQ_ShiftData;
import com.xr.entity.KQ_ShiftSection;
import com.xr.service.IKQ_ArrangeDataService;
import com.xr.service.IKQ_ShiftDataService;
import com.xr.service.IKQ_ShiftSectionService;

import net.sf.json.JSONArray;



/**
 * 班次基本信息
 * @author csc
 * 控制层
 */
@RestController
@RequestMapping("KQ_ShiftData")
public class KQ_ShiftDataController {
	
	 @Autowired
	 private IKQ_ShiftDataService shiftService;//引入班次的业务层.
	 @Autowired
	 private IKQ_ShiftSectionService SectionService;//引入班段详细信息业务层
	 @Autowired
	 private IKQ_ArrangeDataService arrangeService;//引入排班表的业务层
	 
	
	/**
	 * 添加班次和班段的方法
	 * @param shift
	 */
	@RequestMapping("/insertRulesWork")
	public Map<String, Object> insertKQ_Shift(@RequestBody Map<String, Object> revice){
		Map<String, Object> map = new HashMap<>();//定义一个Map返回给前端
		shiftService.insertShiftAndSenction(revice);
		map.put("flag", true);
		map.put("reason", "添加成功");
		return map;
	}//end
	

	/**
     * 查询班次和班段的基本信息
     */
	@RequestMapping("/queryShiftAndSection")
	public Map<String, Object> queryShiftAndSection(String holderno){
		 Map<String, Object> map = new HashMap<>();//定义一个Map返回给前端
		
		/**通过登录人的工号 *查询班次和班段的基本信息*/
			List<Map<String, Object>> shiftsection  =  shiftService.queryShiftAndSection(holderno);

			  Integer compareid=null;
			  
			  Map<String,Object> sondata= new HashMap<>();
			  
			  List<Map<String, Object>> child= new ArrayList<Map<String,Object>>();
			  
			  List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
			 for (int i = 0; i < shiftsection.size(); i++) {
				Integer shiftno =  (Integer) shiftsection.get(i).get("shiftno");
				if(!shiftno.equals(compareid)){
					//获取班次名称
					String shiftname = (String) shiftsection.get(i).get("shiftname");
					String nickname = (String) shiftsection.get(i).get("nickname");
					String codeno = (String) shiftsection.get(i).get("codeno");
					 if(shiftsection!=null)
					 {
						 if(child.size()==0){
							 sondata= new HashMap<>();
								child= new ArrayList<Map<String,Object>>();
						 }else{
						sondata.put("child",child);
						data.add(sondata);
						sondata= new HashMap<>();
						child= new ArrayList<Map<String,Object>>();}
					 }
					 child.add(shiftsection.get(i));
					 sondata.put("codeno", codeno);
					 sondata.put("nickname", nickname);
					 sondata.put("shiftname", shiftname);
					 sondata.put("shiftno", shiftno);
				}else{
					child.add(shiftsection.get(i));
				}
				compareid=shiftno;
			}
			 if(child.size()!=0)
			 {
				 sondata.put("child",child);
				 data.add(sondata);
			 }
			    if(shiftsection.size()==0 || shiftsection==null){
			    	map.put("flag", false);
					map.put("reason", "暂时没有数据");
			    }else{
			    	map.put("flag", true);
					map.put("reason", "数据查询成功");
					map.put("result", data);
			}//IF最外层
		return map;
	}//end
	
	/**
	 * 删除班次和班段的方法
	 */
	@RequestMapping("/deleteShiftAndSection")
	public Map<String, Object> deleteShiftAndSection(Integer shiftno){
		 Map<String, Object> map = new HashMap<>();//定义一个Map返回给前端
			
	    //执行查询,查看班次是否在当月中被使用.
	    List<Map<String, Object>> checklist = arrangeService.checkUseArrange(shiftno);
		
	    if(checklist.size()==0 || checklist==null){
				
			   boolean flay = shiftService.deleteShiftData(shiftno);//删除班次表中记录和班段表
			    if(flay){
			    	map.put("flag", true);
					map.put("reason", "删除成功");
			    }else {
			    	map.put("flag", false);
					map.put("reason", "删除成功");
			    }
	    }else{
	    	map.put("flag", false);
			map.put("reason", "班次正在使用中！不可删除");
	    }
		return map;
	}//end
	
	/**
	 * 通过班次编号
     * 查询班次和班段的所有信息
     * @param shiftno
	 */
	@RequestMapping("/queryShiftUnionSection")
	public Map<String, Object> queryShiftUnionSection(Integer shiftno){
		 Map<String, Object> map = new HashMap<>();//定义一个Map返回给前端
			
		// 执行查询方法
		List<Map<String, Object>> shiftlist = shiftService.queryShiftUnionSection(shiftno);
		Integer compareid = null;

		Map<String, Object> sondata = new HashMap<>();

		List<Map<String, Object>> child = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		for (int i = 0; i < shiftlist.size(); i++) {
			Integer shiftn = (Integer) shiftlist.get(i).get("shiftno");
			if (!shiftn.equals(compareid)) {
				// 获取班次名称remark
				String remark = (String) shiftlist.get(i).get("remark");
				String shiftname = (String) shiftlist.get(i).get("shiftname");
				String nickname = (String) shiftlist.get(i).get("nickname");
				String codeno = (String) shiftlist.get(i).get("codeno");
				if (shiftlist != null) {
					sondata.put("child", child);
					data.add(sondata);
					sondata = new HashMap<>();
					child = new ArrayList<Map<String, Object>>();
				}
				child.add(shiftlist.get(i));
				sondata.put("codeno", codeno);
				sondata.put("remark", remark);
				sondata.put("nickname", nickname);
				sondata.put("shiftname", shiftname);
				sondata.put("shiftno", shiftn);
			} else {
				child.add(shiftlist.get(i));
			}
			compareid = shiftn;
		}
		if (child.size() != 0) {
			sondata.put("child", child);
			data.add(sondata);
		}
		/** 通过当前月份和班次编号* 查询当前被修改的班次是否正在使用中 */
		List<Map<String, Object>> arrlist = arrangeService.checkUseArrange(shiftno);

		
		if (shiftlist.size() == 0 || shiftlist == null) {
			map.put("flag", false);
			map.put("reason", "暂时没有数据");
		} else {
			map.put("flag", true);
			map.put("reason", "数据查询成功");
			if(arrlist.size()!=0){
				map.put("status", "real");
			}else{
				map.put("status",null);
			}
			map.put("result", data);
		} // IF最外层
		return map;
	}//end
	
	/**
	 * 修改方法
	 * 班次的基本信息和对应的班段
	 * @param resp
	 */
	@SuppressWarnings("rawtypes") 
	@RequestMapping("/updateShiftUnionSection")
	public Map<String, Object> updateShiftUnionSection(@RequestBody Map receive) {
		 Map<String, Object> map = new HashMap<>();//定义一个Map返回给前端
		 
		Integer shiftno = Integer.parseInt((String) receive.get("shiftno"));// 班次编号
		String shiftname = (String) receive.get("shiftname");// 班次名称
		String nickname = (String) receive.get("nickname");// 班次简称
		String remark = (String) receive.get("remark");// 注释
		String codeno = (String) receive.get("codeno");// 颜色编号

		//执行添加班段
		JSONArray userJson =  JSONArray.fromObject(receive.get("list").toString());
  	  List<KQ_ShiftSection> shiftsectinos =  JSONArray.toList(userJson,KQ_ShiftSection.class);
		
		// 给实体类赋值
		KQ_ShiftData shift = new KQ_ShiftData(shiftno, shiftname, nickname, remark, codeno);

		boolean flay = shiftService.updateShiftData(shift);// 首先执行班次
		
		List<Integer> sections = SectionService.queryShiftno(shiftno);//通过shiftno查询班段表对应的所有sectionno
		
		SectionService.deleteShiftSection(sections);//执行批量删除,删除对应的班段

		if (flay) {
         	 SectionService.insertShiftSection(shiftsectinos);
			map.put("flag", true);
			map.put("reason", "修改成功");
		} else {
			map.put("flag", false);
			map.put("reason", "修改失败!");
		} // 最外层IF
		return map;
	}// end
	
	
}
