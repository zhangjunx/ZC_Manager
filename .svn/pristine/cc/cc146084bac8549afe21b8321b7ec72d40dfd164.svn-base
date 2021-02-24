package com.xr.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.IOData;
import com.xr.entity.IODataPhoto;
import com.xr.entity.KQ_Approver;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.entity.KQ_Theme;
import com.xr.entity.NB_IOData;
import com.xr.service.IDepartmentDataService;
import com.xr.service.IIODataPhotoService;
import com.xr.service.IIODataService;
import com.xr.service.IKQ_ApproverService;
import com.xr.service.IKQ_ThemeService;
import com.xr.service.IVisitorsPhotoService;
import com.xr.service.NB_IODataService;
import com.xr.util.GetSystemDate;
import com.xr.util.ThreadLocalDate;
import com.xr.util.ThreadLocalDateUtil;

/**
 * @ClassName KQ_ApproverThemeController
 * @Description  申请和审批的控制层.合二为一
 * 出差,请假,补打卡,加班,调休
 * @Author csc
 * @Date 2019年10月18日 下午3:48:24
 */
@RestController
@RequestMapping("appeme")
public class KQ_ApproverThemeController {

	/**引入审批人的业务层*/
	@Autowired
	private IKQ_ApproverService vers;
	
	/*** 引入出差,请假,补打卡,加班,调休的业务层*/
	@Autowired
	private IKQ_ThemeService emes;
	
	@Autowired
	private IDepartmentDataService idepartmetservice;//引入部门业务层
	
	/**打卡记录表的service*/
	@Autowired
	private IIODataService dser;
	
	/**打卡记录表对应的现场照片表*/
	@Autowired
	private IIODataPhotoService idser;
	
	/**引入健康打卡的业务层*/
	@Autowired
	private NB_IODataService nbservice;
	
	/**引入访客的照片的业务层*/
	@Autowired
	private IVisitorsPhotoService ivps;
	
	KQ_Theme theme = new KQ_Theme();//主题表
	
	KQ_Approver approver = new KQ_Approver();//审批记录表
	
	IOData iodata = new  IOData();//打卡记录表
	
	
	
	//查询登录人的信息
	@RequestMapping("/queryLoginHolder")
	public Map<String, Object> queryLoginHolder(KQ_ShiftSeek seek){
		//定义一个map像前端返回数据
	    Map<String, Object> map = new HashMap<>();
		List<Map<String, Object>> holderlist =  vers.queryHolder(seek);//查询登录人信息
		
		if(holderlist.size()==0){
			 map.put("flag", false);
			 map.put("reason", "查询失败");
		}else{
			 map.put("flag", true);
			 map.put("reason", "查询成功");
			 map.put("result", holderlist);
		}
		return map;
	}//end
	
	//查找审批人
	@RequestMapping("/queryHolder")
	public Map<String, Object> queryHolder(KQ_ShiftSeek seek){
		//定义一个map像前端返回数据
	    Map<String, Object> map = new HashMap<>();
		
		List<Map<String, Object>> holderlist = vers.queryHolder(seek);//通过工号和部门编号
		
		if(holderlist.size()==0){
			 map.put("flag", false);
			 map.put("reason", "暂时没有人员信息");
		}else{
			map.put("flag", true);
			map.put("reason", "查询成功");
			map.put("result", holderlist);
		}
		return map;
	}//end
	
	
	//添加出差
	@RequestMapping("/insertEvection")
	public Map<String, Object> insertEvection(KQ_Theme theme) throws ParseException{
		//定义一个map像前端返回数据
	    Map<String, Object> map = new HashMap<>();
		//检测数据是存在
		List<Map<String, Object>> checklist = emes.queryCheckApply(theme);
		
		if(checklist.size()==0){//查询是同一时间段是否有其他的申请操作
			boolean flay =  emes.insertEvection(theme);//添加出差
			
			  if(flay){
				    map.put("flag", true);
					 map.put("reason", "出差添加成功");
			  }else{
					 map.put("flag", false);
					 map.put("reason", "出差添加失败");
			  }
		}else{
			  map.put("flag", "no");
			  map.put("reason", "该时间段内有其他申请");
		}
		return map;
	}//end
	
	
	//添加请假
	@RequestMapping("/insertLeave")
	public Map<String, Object> insertLeave(KQ_Theme theme){
		//定义一个map像前端返回数据
	    Map<String, Object> map = new HashMap<>();
		//检测同意时间段内是否有其他申请
		List<Map<String, Object>> checklist = emes.queryCheckApply(theme);
		
		if(checklist.size()==0){//如果没有
			boolean flay = emes.insertLeave(theme);//添加请假
			 if(flay){
				 map.put("flag", true);
				 map.put("reason", "请假申请成功！");
			 }else{
				 map.put("flag", false);
				 map.put("reason", "请假申请失败!");
			 }
		}else{
			  map.put("flag", "no");
			  map.put("reason", "该时间段内有其他申请");
		}
		return map;
	}//end 
	
	
	//添加补打卡
	@RequestMapping("/insertPunchCard")
	public Map<String, Object> insertPunchCard(KQ_Theme theme){
		//定义一个map像前端返回数据
	    Map<String, Object> map = new HashMap<>();
		boolean flay = emes.insertPunchCard(theme);//添加请假
		     
		 if(flay){
			 map.put("flag", true);
			 map.put("reason", "补卡申请成功！");
		 }else{
			 map.put("flag", false);
			 map.put("reason", "补卡申请失败!");
		 }
		return map;
	}//end 
	
	    //添加加班申请
		@RequestMapping("/insertWorkOverTime")
		public Map<String, Object> insertWorkOverTime(KQ_Theme theme){
			//定义一个map像前端返回数据
		    Map<String, Object> map = new HashMap<>();
			//检测同一时间段内是否有其他申请
			List<Map<String, Object>> checklist = emes.queryCheckApply(theme);
			if(checklist.size()==0){
				boolean flay = emes.insertWorkOverTime(theme);//添加请假
				 if(flay){
					 map.put("flag", true);
					 map.put("reason", "加班申请成功！");
				 }else{
					 map.put("flag", false);
					 map.put("reason", "加班申请失败!");
				 }
			}else{
				 map.put("flag", "no");
				 map.put("reason", "该时间段内有其他申请");
			}
			return map;
		}//end 
		
	
	       //添加调休申请
			@RequestMapping("/insertRest")
			public Map<String, Object> insertRest(KQ_Theme theme){
				//定义一个map像前端返回数据
			    Map<String, Object> map = new HashMap<>();
				//检测同一时间段内是否有其他申请
				List<Map<String, Object>> checklist = emes.queryCheckApply(theme);
				  
				if(checklist.size()==0){
					boolean flay = emes.insertRest(theme);//添加调休
				     
					 if(flay){
						 map.put("flag", true);
						 map.put("reason", "调休申请成功！");
					 }else{
						 map.put("flag", false);
						 map.put("reason", "调休申请失败!");
					 }
				}else{
					 map.put("flag", "no");
					 map.put("reason", "该时间段内有其他申请");
				}
				return map;
			}//end 
			
	
			//以上是(出差,请假,调休,补打卡,加班等各种申请)的添加方法
	     
			
	    /**通过传入实体类中的topictype和登录人的工号
	     * 查询(出差,请假,调休,补打卡,加班等各种申请)的申请信息
	     */
		@RequestMapping("/queryAllApplyFor")
		public Map<String, Object>  queryAllApplyFor(KQ_Theme theme,HttpSession session){
			//动态SQL查询各种申请信息
		    Map<String, Object> applylist =	emes.queryAllApplyFor(theme);
		    applylist.put("flag", true);
		    applylist.put("reason", "查询成功");
			return applylist;
		}//end
	    
	    /**通过主键查询用户的申请详情*/
	    @RequestMapping("/queryOneApply")
	    public Map<String, Object>  queryOneApply(Integer themeno){
	    	//定义一个map像前端返回数据
			Map<String, Object> map = new HashMap<>();
			
			//通过编号查询申请的详情
			HashMap<String, Object> onedata = emes.queryOneApply(themeno);
			
			if(onedata==null){
				map.put("flag", false);
		    	map.put("reason", "查询失败");
			}else{
				map.put("flag", true);
		    	map.put("reason", "查询成功");
		    	map.put("result", onedata);
			}
			return map;
	    }//end
	    
	    /**
	                * 通过传入的实体类
	               * 修改(出差,请假,调休,补打卡,加班等各种申请)的信息
	     */
	    @RequestMapping("/updateTheme")
	    public Map<String, Object> updateTheme(KQ_Theme theme){
	    	//定义一个map像前端返回数据
			Map<String, Object> map = new HashMap<>();
			
		   boolean flay =	emes.updateTheme(theme);//执行修改
		   if(flay){
			   map.put("flag", true);
		       map.put("reason", "修改成功");
		   }else{
			   map.put("flag", false);
		       map.put("reason", "修改失败");
		   }
			return map;
	    }//end 
	
	     /**申请取消功能*/
	     @RequestMapping("/delTheme")
	     public Map<String, Object> delTheme(Integer themeno){
	    	   //定义一个map像前端返回数据
				Map<String, Object> map = new HashMap<>();
				//删除申请的方法(根据前段传过来的编号进行删除)
			   boolean  flay =	emes.delTheme(themeno);
				
			   if(flay){
				   map.put("flag", true);
			       map.put("reason", "取消成功");
			   }else{
				   map.put("flag", false);
			       map.put("reason", "未知错误!取消失败");
			   }
	    	    return map;
	     }//end
	     
	     /**
		      * 通过前段传入的工号
		      * 查询用户待我审批的信息
	      */
	     @RequestMapping("/queryApprovalMsg")
	     public Map<String, Object> queryApprovalMsg(KQ_Theme theme){
				//查询该用户审批的信息
			Map<String, Object> msglist = emes.queryApprovalMsg(theme);
			msglist.put("flag", true);
			msglist.put("reason", "查询成功");
	    	 return msglist;
	     }//end
	     
	     
	     /**
		      * 请假,出差,加班,调休,补打卡
		      * 等申请的驳回和同意操作
	      * @throws ParseException 
	      */
	     @RequestMapping("/updateOperation")
	     public Map<String, Object> updateOperation(KQ_Theme theme,HttpServletRequest request) throws ParseException{
	    	   //定义一个map像前端返回数据
				Map<String, Object> map = new HashMap<>();
				
		    String topictype =  theme.getTopictype();//获取前段传入的申请类型
		    
		    String auditstatus = theme.getAuditstatus();//审批状态
		    
		   String holderno = theme.getHolderno();//获取工号
		    
		    Integer themeno = theme.getThemeno(); //获取该条申请的主键
		    
		    if(topictype.equals("cc")){//如果是出差
		    	theme.setOperationstatus("1");//一级审批
		        boolean flay =	emes.updateTheme(theme);//进行修改
			    if(flay){
			    	approver.setHolderno(holderno);approver.setRankno("1");
			    	approver.setThemeno(themeno);approver.setAuditstatus(auditstatus);
			    	approver.setRemark(theme.getRemark());vers.insertApprover(approver);//执行添加
			    	map.put("flag", true);
				    map.put("reason", "审批成功");
			    }else{
			    	map.put("flag", false);
				    map.put("reason", "审批失败");
			    }
		    }else if(topictype.equals("jb")){//如果是加班
		    	theme.setOperationstatus("1");//一级审批
		        boolean flay =	emes.updateTheme(theme);//进行修改
			    if(flay){
			    	approver.setHolderno(holderno);approver.setRankno("1");
			    	approver.setThemeno(themeno);approver.setAuditstatus(auditstatus);
			    	approver.setRemark(theme.getRemark());vers.insertApprover(approver);//执行添加
			    	map.put("flag", true);
				    map.put("reason", "审批成功");
			    }else{
			    	map.put("flag", false);
				    map.put("reason", "审批失败");
			    }
		    }else if(topictype.equals("tx")){//如果是调休
		        boolean flay =	emes.updateTheme(theme);//进行修改
			    if(flay){
			    	approver.setHolderno(holderno);approver.setRankno("1");
			    	approver.setThemeno(themeno);approver.setAuditstatus(auditstatus);
			    	approver.setRemark(theme.getRemark());vers.insertApprover(approver);//执行添加
			    	map.put("flag", true);
				    map.put("reason", "审批成功");
			    }else{
			    	map.put("flag", false);
				    map.put("reason", "审批失败");
			    }
		    }else if(topictype.equals("bk")){//如果是补卡
		    	theme.setOperationstatus("1");//一级审批
		    	
		    	if(auditstatus.equals("12")){
		    		 boolean flay =	emes.updateTheme(theme);//进行修改
		    		    if(flay){
		    		    String pholderno =	request.getParameter("pholderno");//获取申请人的工号
		    		    	
		    		    	approver.setHolderno(holderno);approver.setRankno("1");
					    	approver.setThemeno(themeno);approver.setAuditstatus(auditstatus);
					    	approver.setRemark(theme.getRemark());
					    	vers.insertApprover(approver);//执行添加
					    	
					    	
					    	iodata.setDeviceno(theme.getDeviceno().shortValue());//补打卡时添加控制器deviceno
					    	iodata.setDoorno((short)Integer.parseInt((String)theme.getPlace()));//打卡数据表
					    	iodata.setIodate(theme.getPunchtime());iodata.setHolderno(pholderno);
					    	iodata.setIotime(ThreadLocalDate.formatDate(theme.getPunchtime()));
					    	iodata.setIostatus((short)Integer.parseInt(theme.getCausetype()));//进或者出
					    	iodata.setDeptno(theme.getDepartmentno());iodata.setDoorname(theme.getDoorname());
					    	iodata.setHoldername(theme.getHoldername());iodata.setDeptname(theme.getDeptname());
					    	dser.insertSelective(iodata);//执行添加
					    	map.put("flag", true);
						    map.put("reason", "批准成功");
					    }else{
					    	map.put("flag", false);
						    map.put("reason", "批准失败");
					    }
		    	}else{
		    		emes.updateTheme(theme);//进行修改
		    		approver.setHolderno(holderno);approver.setRankno("1");
			    	approver.setThemeno(themeno);approver.setAuditstatus(auditstatus);
			    	approver.setRemark(theme.getRemark());vers.insertApprover(approver);//执行添加
			    	map.put("flag", true);
				    map.put("reason", "驳回成功");
		    	}
		        boolean flay =	emes.updateTheme(theme);//进行修改
		    }else{//最后一种是请假
		        boolean flay =	emes.updateTheme(theme);//进行修改
			    if(flay){
			    	approver.setHolderno(holderno);approver.setRankno(theme.getOperationstatus());
			    	approver.setThemeno(themeno);
			    	 if(auditstatus.equals("11")||auditstatus.equals("12")){
			    		 approver.setAuditstatus("12");
			    	 }else{
			    		 approver.setAuditstatus("13");
			    	 }
			    	
			    	approver.setRemark(theme.getRemark());vers.insertApprover(approver);//执行添加
			    	map.put("flag", true);
				    map.put("reason", "审批成功");
			    }else{
			    	map.put("flag", false);
				    map.put("reason", "审批失败");
			    }
		    }// end topictype
		    return map;
	     }//end方法
	     
	     
	       /**通过传入实体类中的topictype和登录人的工号
		    * 查询(出差,请假,调休,补打卡,加班等)
		    * 审批记录的查询，带有分页
		    */
	     @RequestMapping("/queryApprover")
	     public Map<String, Object> queryApprover(KQ_Theme theme){
	    	 //查询是否有审批记录
             Map<String, Object> verlist =  vers.queryApprover(theme);
             verlist.put("flag", true);
             verlist.put("reason", "查询成功");
	    	 return  verlist;
	     }//end方法
	     
	     /**
	                 * 小程序专用开门,增加一条打卡记录
	     * @throws IOException 
	     * @throws ParseException 
	      */
	     @RequestMapping("/AppletOpen")
         public Map<String, Object> AppletOpen(IOData iodata) throws IOException, ParseException{
	    	 Map<String, Object> map = new HashMap<>();
	    	String holderno = iodata.getHolderno();//工号
	    	if(holderno==null)
	    	 {     map.put("flag", false);
			       map.put("reason", "工号为空不允许开门");
	    	  }else
		     {     
	    		String deptno =  iodata.getDeptno();//部门编号
	    		
	    		String deptname = idepartmetservice.queryDeptName(deptno);
	    		if(deptname==null){
	    			 map.put("flag", false);
				     map.put("reason", "部门名称查询为空");
	    		}else{
	    		//查询当天,最大时间(就是最后一次健康打卡的温度)
	    		NB_IOData nbiodata = nbservice.queryMaxHealthRecord(holderno);
	    		if(nbiodata!=null){
	    			BigDecimal bd=new BigDecimal(nbiodata.getTemperature());
	    			iodata.setTemperatures(bd);
	    		}
	    		  iodata.setIodate(ThreadLocalDateUtil.parse(GetSystemDate.getTodayByFormat("yyyy-MM-dd HH:mm:ss")));
	    		  iodata.setIotime(GetSystemDate.getTodayByFormat("HH:mm:ss"));
	    		  iodata.setDeptname(deptname);
	    		  dser.insertSelective(iodata);//执行添加
		    		map.put("flag", true);
					map.put("reason", "开门成功");
	    		}
	    	 }
	    	 return map;
	     }//end
	     
	     
	     /**
	     * 小程序专用开门,增加一条打卡记录 访客开门
	     * @throws IOException 
	     * @throws ParseException 
	      */
	     @RequestMapping("/AppletOpenV")
         public Map<String, Object> AppletOpenV(IOData iodata,Integer id) throws IOException, ParseException{
	    	 Map<String, Object> map = new HashMap<>();
	    	 String holderno = iodata.getHolderno();//工号
	    	 if(holderno==null)
	    	 {     map.put("flag", false);
			       map.put("reason", "工号为空不允许开门");
	    	  }else{     
	    		  iodata.setIodate(ThreadLocalDateUtil.parse(GetSystemDate.getTodayByFormat("yyyy-MM-dd HH:mm:ss")));
	    		  iodata.setIotime(GetSystemDate.getTodayByFormat("HH:mm:ss"));
	    		 int i= dser.insertSelective(iodata);//执行添加
	    		 if(id!=null){
	    			 Map<String, Object> m = new HashMap<>();
	    			 m.put("visitorsid", id);
   				      IODataPhoto record=new IODataPhoto();
   				      record.setPhoto((byte[]) ivps.getPhotoService(m).get("photodata"));
		    		  record.setIodataid(iodata.getDatano());
		    		  i=idser.insertAppletOpenPhoto(record);
   			     }
	    		 if(i>0){
	    			 map.put("flag", true);
					 map.put("reason", "开门成功");
					 map.put("result", iodata);
	    		 }else{
	    			 map.put("flag", false);
					 map.put("reason", "开门失败");
					 map.put("result", iodata);
	    		 }
	    	 }
	    	 return map;
	     }//end
	     
	     
	     
	     /**
	                 * 人脸对比,新增一条打卡记录
	      * @throws IOException
	      * @throws ParseException 
	      */
	     @RequestMapping("/AppletOpenPhoto")
	     public Map<String, Object> AppletOpenPhoto(@RequestParam("file") MultipartFile photo,IOData iodata) throws IOException, ParseException{
	    	 Map<String, Object> map = new HashMap<>();
	    	 
	    	 IODataPhoto iodataPhoto = new IODataPhoto();
	    	String holderno = iodata.getHolderno();//工号
	    	if(holderno==null)
	    	 {     map.put("flag", false);
			       map.put("reason", "工号为空不允许开门");
	    	  }else{     
		    		String deptno =  iodata.getDeptno();//部门编号
		    		String deptname = idepartmetservice.queryDeptName(deptno);
			    		if(deptname==null){
			    			 map.put("flag", false);
						     map.put("reason", "部门名称查询为空");
			    		}else{
			    			//查询当天,最大时间(就是最后一次健康打卡的温度)
				    		NB_IOData nbiodata = nbservice.queryMaxHealthRecord(holderno);
				    		if(nbiodata!=null){
				    			BigDecimal bd=new BigDecimal(nbiodata.getTemperature());
				    			iodata.setTemperatures(bd);
				    		}
			    		  iodata.setDeptname(deptname);
			    		  iodata.setIodate(ThreadLocalDateUtil.parse(GetSystemDate.getTodayByFormat("yyyy-MM-dd HH:mm:ss")));
			    		  iodata.setIotime(GetSystemDate.getTodayByFormat("HH:mm:ss"));
			    		  dser.insertSelective(iodata);//执行添加
		    		  
		    		byte[] zhaopian = photo.getBytes();
		    		  
		    		 if(zhaopian.length!=0){
			    	   Integer datano = iodata.getDatano();//添加成功后返回新增后的主键
			    	   iodataPhoto.setIodataid(datano);//放入iodata新增后返回的id
			    	   iodataPhoto.setPhoto(zhaopian);
			    	   idser.insertAppletOpenPhoto(iodataPhoto);
		    		 }
			    		map.put("flag", true);
						map.put("reason", "开门成功");
		    		}
	    	  }
			return map;
	     }//end
	    
}
