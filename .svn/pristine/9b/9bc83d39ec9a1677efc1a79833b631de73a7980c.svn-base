package com.xr.controller;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.KQ_Analysis;
import com.xr.entity.KQ_ArrangeData;
import com.xr.entity.KQ_ShiftData;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.service.IKQ_AnalysisService;
import com.xr.service.IKQ_ArrangeDataService;
import com.xr.service.IKQ_ShiftDataService;
import com.xr.util.ExcelUtil;
import com.xr.util.TimeUtil;
import com.xr.util.TypeConversionUtil;

import net.sf.json.JSONObject;


/**
 * 设置排班
 * @author csc
 * 控制层
 */
@RestController
@RequestMapping("KQ_Arrange")
public class KQ_ArrangeController {

	/**引入排班操作的业务层*/
	@Autowired
	private IKQ_ArrangeDataService iads;
	
	@Autowired
	private IKQ_AnalysisService iasis;//引入考勤分析
	
	@Autowired
	private IKQ_ShiftDataService shiftds;//引入班次业务层
	
	KQ_ShiftSeek seek = new KQ_ShiftSeek();
	//用于考勤分析
	KQ_Analysis analysis = new KQ_Analysis();
	
	/**
	 * 通过登录人的工号
	 * 和排版人员所选中的部门来查询部门下的人员
	 * 该接口用于排版中心中的选择人员
	 */
	 @RequestMapping("/queryDapartmentStaff")
	 public Map<String, Object> queryDapartmentStaff(@RequestBody List<JSONObject> list,HttpSession session){
		//定义一个map像前端返回数据
			Map<String, Object> map = new HashMap<>();
		 //获取员工登录后的工号
			String holderno = (String) session.getAttribute("holderno");
			
			if(list.size()==0 || list.equals(null)){
				   map.put("flag", false);
				   map.put("reason", "对不起请您选择部门");
			}else{
			//执行查询部门中的员工共信息
			List<Map<String, Object>> result = iads.queryDapartmentStaff(holderno, list);
			
			if(result.size()==0){
				   map.put("flag", false);
				   map.put("reason", "对不起这些部门暂时没有员工信息!");
			}else{
				   map.put("flag", true);
				   map.put("reason", "查询成功");
				   map.put("result", result);
			      }
			}//最外层的IF
			return map;
	 }//end
	 
	  /**
	     * 对选中人员进行排班
	     * 批量添加用于排班
	     * @param list
	     */
	 @RequestMapping("/insertArrangeData")
	 public Map<String, Object> insertArrangeData(@RequestBody List<Map<String, Object>> list){
		 
		//定义一个map像前端返回数据
			Map<String, Object> map = new HashMap<>();
		 
		 if(list.size()==0){
			   map.put("flag", false);
			   map.put("reason", "请选择排班人员");
		 }else{
		 
		 List<Map<String, Object>>  queryList = new ArrayList<Map<String, Object>>();//用于批量查询
		 List<Map<String, Object>>  insList = new ArrayList<Map<String, Object>>();//用于批量添加
		 
		 List<Map<String, Object>> iadslist = new ArrayList<Map<String,Object>>();
		 
	 	    seek.setYearno((String)list.get(0).get("yearno"));//获取年
		    seek.setMonthno((String)list.get(0).get("monthno"));//获取月
		    
		 for (int i = 0; i < list.size(); i++) {
			int poinTem=200;
			queryList.add(list.get(i));//循环将数据填入载体list
			if (poinTem == queryList.size() || i == list.size() - 1) {   //载体list达到要求,进行批量操作
				iadslist = iads.queryArrangeData(queryList);//执行批量查询,查看是否有人被重复的排班，并将查询到的数据放入集合中
				queryList.clear();;//每次批量操作后,清空载体list,等待下次的数据填入
				if(iadslist.size()!=0){
					for (int j = 0; j < iadslist.size(); j++) {
						String holderno = (String)iadslist.get(j).get("holderno");//获取被排班人的工号，放入实体类
						seek.setHolderno(holderno);iads.delArrange(seek);
						}//删除已经被排过班的人的排班信息
					}//end for
				}else{continue;}
 		 }//end 批量查询
			    //一次插入的条数，也就是分批的list大小
			    int pointsDataLimit = 200;
	            for (int i = 0; i < list.size(); i++) {
	                //分批次处理
	            	insList.add(list.get(i));//循环将数据填入载体list
	                if (pointsDataLimit == insList.size() || i == list.size() - 1) {  //载体list达到要求,进行批量操作
	                	iads.insertArrangeData(insList); //调用批量插入
	                	insList.clear();//每次批量操作后,情况载体list,等待下次的数据填入
	                }
	            }//end for 批量插入
	            map.put("flag", true);
	            if(iadslist.size()!=0){
			      map.put("reason", "排班成功!部分人员已被重新排班");
	            }else{
	              map.put("reason", "排班成功");
	            }
		 }
	     return map;	 
	 }//end
	
	 
	 /**
	  * 通过工号查询班次信息中的
      * (序号,班次名称,班次简称,颜色编号)
      * 用于排班中心
	  * @return
	  */
	 @RequestMapping("/queryshiftdata")
	 public Map<String, Object> queryshiftdata(String holderno){
		    //定义一个map像前端返回数据
			Map<String, Object> map = new HashMap<>();
		 
		 LocalDate today = LocalDate.now();//获取系统当前时间
		 
		 //查询班次的基本信息,用于排班中心
		 List<KQ_ShiftData> shiftlist = iads.queryshiftdata(holderno);
		 
		 if(shiftlist.size()==0 || shiftlist == null){
			   map.put("flag", false);
			   map.put("reason", "对不起您没有权限查询");
			   map.put("systime", today);
		 }else{
			   map.put("flag", true);
			   map.put("reason", "查询成功");
			   map.put("systime", today);
			   map.put("result", shiftlist);
		 }
	     return map;	
	 }//end
	 
	 /**
	       * 查询人员的班次信息
                   * 用于人员班表修查
	  */
	 @RequestMapping("/selectArrange")
	public Map<String, Object> selectArrange(KQ_ShiftSeek seek) throws ParseException{
		 //查询人员的班次信息
		 Map<String, Object> resultMap = iads.selectArrange(seek);
		 return resultMap;
	 }//end
	 /**
	      * 通过区域来查询门区
	  */
	 @RequestMapping("/getDoorList")
	 public Map<String, Object> getDoorList(){
		 Map<String, Object> map= new HashMap<>();//定义一个map返回给前段
		 List<Map<String, Object>> doorlist = iads.getDoorList();
		 if(doorlist.size()==0){
			 map.put("flag", false);
			 map.put("reason", "暂无数据可查"); 
		 }else{
			 map.put("flag", true);
			 map.put("reason", "查询成功"); 
			 map.put("result", doorlist);
		 }
		 return map;
 	 }//end
	 
	 
	 /**
	      * 查询人员查用班次
      * 用于班次分配中的查询
	  */
	 @RequestMapping("/selectDistributionShift")
	 public Map<String, Object> selectDistributionShift(KQ_ShiftSeek seek){
		 Map<String, Object> map= new HashMap<String, Object>();
		 //通过参数查询
		 List<Map<String, Object>> distrshiftlist =  iads.selectDistributionShift(seek);
		 
		 List<Map<String, Object>> child= new ArrayList<Map<String,Object>>();
		 
		 Map<String,Object> sondata= new HashMap<>();
		 
		 String compareid=null;
		 
		 List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		   for (int i = 0; i < distrshiftlist.size(); i++) {
			 //获取班次编号
			String holderno =  (String) distrshiftlist.get(i).get("holderno");
			if(!holderno.equals(compareid)) 
			{
			 String holdername =  (String) distrshiftlist.get(i).get("holdername");//员工名称
			 String departmentname =  (String) distrshiftlist.get(i).get("departmentname");//部门名称
				 if(distrshiftlist!=null)
				 {
					 if(child.size()==0){
						 sondata= new HashMap<>();
						 child= new ArrayList<Map<String,Object>>();
					  }else 
					  { sondata.put("child",child);
						data.add(sondata);
						sondata= new HashMap<>();
						child= new ArrayList<Map<String,Object>>();
					   }
				 }
						 child.add(distrshiftlist.get(i));
						 sondata.put("holderno", holderno);
						 sondata.put("holdername", holdername);
						 sondata.put("departmentname", departmentname);
			}else {child.add(distrshiftlist.get(i));}
			    compareid=holderno;
		   }//end for循环
		   if(child.size()!=0)
			 {sondata.put("child",child);
		      data.add(sondata);
			 }
		    if(distrshiftlist.size()==0 || distrshiftlist==null){
		    	map.put("flag", false);
				map.put("reason", "暂时没有数据");
		    }else{
		    	map.put("flag", true);
				map.put("reason", "数据查询成功");
				map.put("result", data);
	        }
		 return map;
	 }//end
	 
	 
	 /**
	      * 作用:给员工分配常用班次
	  * @param receive
	  */
	 @RequestMapping("/insertDistributionShift")
	 public Map<String, Object> insertDistributionShift(@RequestBody Map<String, Object> receive){
		   Map<String, Object> map = new HashMap<String, Object>();
		   //获取前台传入的参数
		  List<Map<String, Object>>  list =  (List<Map<String, Object>>) receive.get("list");
		   //用于批量查询
		  List<Map<String, Object>> iadslist = new ArrayList<Map<String,Object>>();
		  //用于存放查询到的结果
		  List<Map<String, Object>> resultlist = new ArrayList<Map<String,Object>>();
		  
		  for (int i = 0; i < list.size(); i++) {
			  int poinTem=200;
			  iadslist.add(list.get(i));
			  if (poinTem == iadslist.size() || i == list.size() - 1) { //载体list达到要求,进行批量操作
				  resultlist=iads.queryBatchHolderShift(iadslist);//批量查询结果
				  iadslist.clear();//每次批量操作查询后,清空载体list,等待下次的数据填入
			  }
		  }
		  if(resultlist.size()==0) {
		  	   //用于分批添加 
		  	 List<Map<String, Object>> contrastlist = new ArrayList<Map<String, Object>>();
		  	  for (int m = 0; m < list.size(); m++) {
				int poinTam =200;
				contrastlist.add(list.get(m));
				if(poinTam == contrastlist.size() || m == list.size()-1) {
					iads.insertDistributionShift(contrastlist);//进行批量添加
					contrastlist.clear();
				}
			  }
		  	  map.put("flag", true);
		  	  map.put("reason", "添加成功");
		  }else {
			  map.put("flag", false);
		  	  map.put("reason", "添加失败");
		  	  map.put("result", resultlist);
		  }
		   return map;
	 }//end
	 
	 /**
	      * 批量删除员工常用的班次数据
	  */
	 @RequestMapping("/deleteDistributionShift")
	 public Map<String, Object> deleteDistributionShift(@RequestParam Map<String, Object> revice){
		 Map<String, Object> resultMap = new HashMap<String, Object>();
		 
		String liststring = (String) revice.get("list");
		 if(liststring==null) {
			 resultMap.put("flag", false);
			 resultMap.put("reason", "无删除数据"); 
		 }else {
			 List<Map<String, Object>> list = TypeConversionUtil.stringToListMap(liststring);
			 iads.deleteDistributionShift(list);
			 resultMap.put("flag", true);
			 resultMap.put("reason", "删除成功"); 
		 }
		 return resultMap;
	 }//end
	 
	 
	 
	// 以下是自动分析人员所用到的考勤班次
	@RequestMapping("/insertAutomaticShift")
	public Map<String, Object> insertAutomaticShift(KQ_ShiftSeek seek) throws ParseException {
		// 定义一个map返回给前端
		Map<String, Object> map = new HashMap<String, Object>();
		String yearno = seek.getYearno();// 获取年
		String monthno = seek.getMonthno();// 获取月

		// 通过年月来获取改月有多少天
		Integer days = TimeUtil.getDayOfMonth(Integer.parseInt(yearno), Integer.parseInt(monthno));

		// 查询工号
		List<Map<String, Object>> holdershiftlist = iads.selectHolderNo(seek);

		// 用于存放分析后的班次结果
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

		// 用于存放单个的人员班次情况
		Map<String, Object> reveice = null;

		if (holdershiftlist.size() != 0) {
			// 循环读取员工和常用的班次编号
			int holdershiftlistSize = holdershiftlist.size();
			for (int i = 0; i < holdershiftlistSize; i++) {
				String holderno = (String) holdershiftlist.get(i).get("holderno");// 获取人员的工号
				seek.setHolderno(holderno);
				seek.setDay(null);
				iads.delArrange(seek);// 删除原来的排班
				// * 通过查询人员经常使用的班次中的,上班的worktime(工作时间)来排序的
				List<Map<String, Object>> shiftlist = iads.selectShiftno(holderno);
				if (shiftlist.size() != 0) {// 判断是否存在经常用的班次
					for (int j = 1; j <= days; j++) {// 循环天数
						Set<Integer> setjudge = new HashSet<Integer>();
						int shiftlistSize = shiftlist.size();
						for (int k = 0; k < shiftlistSize; k++) {
							Integer shiftno = (Integer) shiftlist.get(k).get("shiftno");

							// 通过班次编号查询对应的班次和班段信息
							List<Map<String, Object>> shiftSection = shiftds.queryShiftUnionSection(shiftno);

							String[] array = { yearno + "-", monthno + "-", String.format("%02d", j) };// 将年月日放入数组中准备拼接
							String analyDate = StringUtils.join(array);// 拼接时间内年月日(格式:yyyy-MM-dd)
							int shiftSectionSize = shiftSection.size();
							for (int l = 0; l <shiftSectionSize; l++) {
								String sectionstatus = (String) shiftSection.get(l).get("sectionstatus");

								String whichearliest = (String) shiftSection.get(l).get("whichearliest");
								String workearliest = (String) shiftSection.get(l).get("workearliest");// 最早打卡时间

								String whichwork = (String) shiftSection.get(l).get("whichwork");
								String worktime = (String) shiftSection.get(l).get("worktime");

								if (sectionstatus.equals("上班")) {

									// 通过状态将时间拼接在一起
									String checkInzuizao = TimeUtil.fenxiTime(whichearliest, analyDate, workearliest);
									// 获取签到最晚时间
									String checkInzuiwan = TimeUtil.fenxiTime(whichwork, analyDate, worktime);
									// 工号
									analysis.setHolderno(holderno);
									analysis.setStarttime(checkInzuizao);
									analysis.setEndtime(checkInzuiwan);

									// 第一个班段的开始时间
									Map<String, Object> liesandwork = iasis.selectIodate(analysis);
									// 当打卡结果不为空时.将当前班次放入集合中
									if (liesandwork != null) {
										setjudge.add(shiftno);
									} else {
										continue;
									}
								} else {// 下班
									String whichlatest = (String) shiftSection.get(l).get("whichlatest");
									String worklatest = (String) shiftSection.get(l).get("worklatest");// 最晚打卡
									// 通过状态将时间拼接在一起
									String checkInzuizao = TimeUtil.fenxiTime(whichwork, analyDate, worktime);
									// 获取签到最晚时间
									String checkInzuiwan = TimeUtil.fenxiTime(whichlatest, analyDate, worklatest);
									// 工号
									analysis.setHolderno(holderno);
									analysis.setStarttime(checkInzuizao);
									analysis.setEndtime(checkInzuiwan);

									// 第一个班段的开始时间
									Map<String, Object> liesandwork = iasis.selectIodate(analysis);
									
									// 当打卡结果不为空时.将当前班次放入集合中
									if (liesandwork != null) {
										setjudge.add(shiftno);
									} else {
										continue;
									}
								} // end 下班
							} // 循环班次信息
						} // end 循环班次编号

						if (setjudge.size() == 0) {
							reveice = new HashMap<String, Object>();
							reveice.put("yearno", yearno);// 放入年
							reveice.put("monthno", monthno);// 放入月
							reveice.put("day", String.format("%02d", j));// 放入天
							reveice.put("shiftno", 0);
							reveice.put("holderno", holderno);
							result.add(reveice);// 放入第j天的考勤班次
						} else if (setjudge.size() == 1) {
							List<Integer> bancilist = new ArrayList<Integer>(setjudge);
							reveice = new HashMap<String, Object>();
							reveice.put("yearno", yearno);// 放入年
							reveice.put("monthno", monthno);// 放入月
							reveice.put("day", String.format("%02d", j));// 放入天
							reveice.put("shiftno", bancilist.get(0));// 集合中只有一个集合编号
							reveice.put("holderno", holderno);
							result.add(reveice);// 放入第j天的考勤班次
						} else {// 如果是其它情况考勤班次分析就定义成异常
							reveice = new HashMap<String, Object>();
							reveice.put("yearno", yearno);// 放入年
							reveice.put("monthno", monthno);// 放入月
							reveice.put("day", String.format("%02d", j));// 放入天
							reveice.put("shiftno", -1);
							reveice.put("holderno", holderno);
							result.add(reveice);// 放入第j天的考勤班次
						}
						setjudge.clear();// 清空用来判断每天上的班的依据[集合]

					} // end 循环 天数
				} else {
					continue;
				} // end 如果没有查询到经常使用的班次跳过
			} // end 循环读取人和班次编号
		     //用于批量插入
			List<Map<String, Object>> inslist = new ArrayList<Map<String, Object>>();
			int resultSize = result.size();
			for (int i = 0; i < resultSize; i++) {
				int poinTem = 100;
				inslist.add(result.get(i));
				if (poinTem == inslist.size() || i == resultSize - 1) { // 载体list达到要求,进行批量操作
					iads.insertArrangeData(inslist);
					inslist.clear();// 每次批量操作查询后,清空载体list,等待下次的数据填入
				}
			}
			map.put("flag", true);
			map.put("reason", "分析成功");
		} else {
			map.put("flag", false);
			map.put("reason", "没有查询到相关信息,无法排班");
		}
		return map;
	}// end
	 
	 /**
	  * 删除单个人员的常用班次
	  */
	 @RequestMapping("/deleteOneShift")
	 public Map<String, Object> deleteOneShift(Integer shiftno,String holderno){
		 Map<String, Object> map = new HashMap<String, Object>();
		 boolean flay = iads.deleteOneShift(shiftno,holderno);
		if(flay) {
			map.put("flag", true);
			map.put("reason", "删除成功");
		}else {
			map.put("flag", false);
			map.put("reason", "删除失败");
		}
		 return map;
	 }//end
	 
	 
	 /**
	  * 用于班表修查
	  * 修改个人中某一天的班次
	  */
	 @RequestMapping("/updateArrange")
	 public Map<String, Object>  updateShiftArrange(KQ_ArrangeData arrange){
		   //定义一个map像前端返回数据
			Map<String, Object> map = new HashMap<>();
		 //执行修改
		 boolean flay = iads.updateArrange(arrange);
		   if(flay){
			   map.put("flag", true);
			   map.put("reason", "修改成功");
		   }else{
			   map.put("flag", false);
			   map.put("reason", "修改失败");
		   }
		 return map;
	 }//end
	 
	 /**
	  * 用于页面上显示成缺勤的人点击时是添加
	  * @param arrange
	  */
	 @RequestMapping("/insertArrange")
	 public Map<String, Object> insertArrange(KQ_ArrangeData arrange){
		 
		 Map<String, Object> map = new HashMap<String, Object>();
		 boolean flay =  iads.insertArrange(arrange);
		   if(flay){
			   map.put("flag", true);
			   map.put("reason", "添加成功");
		   }else{
			   map.put("flag", false);
			   map.put("reason", "添加失败");
		   }
		 return map;
	 }//end
	  /**
		 * 读取Excel中的数据
		 * @param file
		 * @throws Exception 
		 */
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
		    	 map.put("reason", "数据查询失败");
		      } else{
		    	  map.put("flag", true);
			      map.put("reason", "数据查询成功");
			      map.put("result", excel);
		      }
	            resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
				return map;
	 }//end
		/**
		 * excel导入排班数据
		 * @return
		 */
		@RequestMapping("/ImportExcelArray")
		public Map<String, Object> ImportExcelArray(@RequestBody Map<String, Object> revice){
			 Map<String, Object> map = new HashMap<String, Object>();
			 
			 //获取传入的数据excel数据
			 List<Map<String, Object>> list = (List<Map<String, Object>>) revice.get("list");
		
			 KQ_ShiftSeek seek = new KQ_ShiftSeek();
			 
			 String fuben = null;
			 //删除以前的数据
			  for (int i = 0; i < list.size(); i++) 
			  {  String holderno = (String) list.get(i).get("holderno");
			     String yearno = (String) list.get(i).get("yearno");
			     String monthno = (String) list.get(i).get("monthno");
			     seek.setHolderno(holderno);
			     seek.setYearno(yearno);
			     seek.setMonthno(monthno);
			     if(!holderno.equals(fuben)) {
						  iads.delArrange(seek);
			     }
			     fuben= holderno;
			  }//end 结束删除以前的数据
			  //用于放入最终的数据
			  List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
			  
			  Map<String, Object> fangru = null;
			  for (int k = 0; k < list.size(); k++) 
			  {   String nickname = (String) list.get(k).get("nickname");
			      String holderno = (String) list.get(k).get("holderno");
			      String yearno = (String) list.get(k).get("yearno");
			      String monthno = (String) list.get(k).get("monthno");
			      String day = (String) list.get(k).get("day");
			      if(nickname.equals("缺")) {
			    	  fangru = new HashMap<String, Object>();
			    	  fangru.put("shiftno", 0);
			    	  fangru.put("holderno", holderno);
			    	  fangru.put("yearno", yearno);
			    	  fangru.put("monthno", monthno);
			    	  fangru.put("day", day);
			    	  result.add(fangru);
			      }else 
			      {  Map<String, Object> data =  shiftds.queryNoShift(nickname);
				     if(data==null) {
				    	 continue;
				     }else {
				    	  Integer shiftno = (Integer) data.get("shiftno");
				    	  fangru = new HashMap<String, Object>();
				    	  fangru.put("shiftno", shiftno);
				    	  fangru.put("holderno", holderno);
				    	  fangru.put("yearno", yearno);
				    	  fangru.put("monthno", monthno);
				    	  fangru.put("day", day);
				    	  result.add(fangru);}
			      }
			  }//结束班次分析的判断
			  
			  //用于批量添加
			  List<Map<String, Object>> insertlist = new ArrayList<Map<String,Object>>();
			  for (int i = 0; i < result.size(); i++) 
			  {   int poinTem=100;
			      insertlist.add(result.get(i));
				  if (poinTem == insertlist.size() || i == result.size() - 1) { //载体list达到要求,进行批量操作
					  iads.insertArrangeData(insertlist);
					  insertlist.clear();//每次批量操作查询后,清空载体list,等待下次的数据填入
				  }
			  }//end 结束删除以前的数据
               map.put("flay", true);	 
			   map.put("reason", "导入成功");
			 return map;
		}//end
	 
	
}
