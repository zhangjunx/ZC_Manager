package com.xr.controller.device;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.java_websocket.WebSocket;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft_6455;
import org.java_websocket.handshake.ServerHandshake;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.xr.entity.IOData;
import com.xr.entity.IODataPhoto;
import com.xr.entity.NB_IOData;
import com.xr.service.ICardDataService;
import com.xr.service.IDoorPermHolderRecordService;
import com.xr.service.IDoorUnitService;
import com.xr.service.IHolderDataService;
import com.xr.service.IIODataPhotoService;
import com.xr.service.IIODataService;
import com.xr.service.NB_IODataService;
import com.xr.util.CallingInterfaceUtil;
import com.xr.util.SenseLinkConfig;
import com.xr.util.ThreadLocalDateThree;
import com.xr.util.ThreadLocalDateUtil;
import com.xr.util.TimeUtil;
import com.xr.util.TypeConversionUtil;
/**
 * @ClassName: SenPassQuartz
 * @Description: 
 * 该类用于对接SenseLink平台.
 * @author: 作者名
 * @Company: 公司名
 * @date: 2020年3月25日 下午4:46:12
 */

public class SenPassQuartz {
	
	private SenPassQuartz(){};//构造方法私有化
	
    static Logger logger = Logger.getLogger(SenPassQuartz.class); 
    
	 
	 /**引入员工业务层*/
	 @Autowired
	 private IHolderDataService holderService;
	 
	 /**引入员工卡表业务层*/
	 @Autowired
	 private ICardDataService cardService;
	 
	 /**引入打卡记录相关的业务层*/
	 @Autowired
	 private IIODataService ioService;
	 
	 /**打卡记录表对应的现场照片表*/
	 @Autowired
	 private IIODataPhotoService idser;
	 
	/**引入健康打卡的业务层*/
	@Autowired
	private NB_IODataService nbservice;
	
	/**引入门区的业务层*/
	@Autowired
	private IDoorUnitService doorService;
	
	/**引入门禁权限记录生成的业务层*/
	@Autowired
	private IDoorPermHolderRecordService permService;
	 
	  //创建打卡记录表相关联的照片表
    IODataPhoto iodataPhoto = new IODataPhoto();
   	 //创建打卡记录表
	IOData iodata = new IOData();
	 
	 
	 /**
	  * 与SenseLink平台对接员工
	  * 该方法用于同步部门下的员工
	  * 接口 : /v1/user/list  是查询人员的接口.请求方式GET 具体请看接口文档.这里通过工号(jobNumber)查询
	  * 接口: /v1/user 是添加员工的接口,请求方式是POST：form-data.需要上传一个File。具体请看接口文档
	  * 接口: /v1/user/update/{id} 是修改员工的的接口.请求方式是POST:form-data
	 * @throws ParseException 
	  */
	 @SuppressWarnings("unchecked")
	 @Scheduled(cron="*/5 * * * * ?")
	 private void synchronizationStaff() throws ParseException{
		 //查询所有员工的基本信息
		 List<Map<String, Object>> holderlist  =  holderService.getAllStaff();
		 //如果员工信息为空
		 if(holderlist.size()==0 || holderlist==null){
			System.out.println("没有");
		 }else{//如果员工信息不为空
			 for (int i = 0; i < holderlist.size(); i++) {
				 Map<String, String> params = new HashMap<String, String>();//定义一个map返回给前段
				 //获取员工工号
				  String holderno =  (String) holderlist.get(i).get("holderno");
				  
				  //通过工号查询SenseLink平台的对应的信息
				  Map<String, Object> Result =  selectSenseLinkUser(holderno);
				  
				  List<Map<String, Object>>  dataMap =  (List<Map<String, Object>>) Result.get("data");
				  if(Result.get("code").equals(200) && dataMap.size()>0){
                    //获取Syris平台的修改时间
					String updatedate =  (String) holderlist.get(i).get("updatedate");
					Date syrisupdate = null;
					if(updatedate!=null){
						 syrisupdate =  ThreadLocalDateThree.parse(updatedate, "yyyy-MM-dd HH:mm");
							
						  //获取设备返回的修改时间
						String update_at =   (String) dataMap.get(0).get("update_at");
						Date update_atLong =  ThreadLocalDateThree.parse(update_at, "yyyy-MM-dd HH:mm");
						if(syrisupdate.getTime()>update_atLong.getTime()){//如果Syris平台的修改时间大于SENSELINK的时间
							Map<String, String> parames = new HashMap<String, String>();
							String id = String.valueOf(dataMap.get(0).get("id"));//获取用户的ID
							parames.putAll(SenseLinkConfig.CommonlySplicing());//放入鉴权参数
							parames.put("icNumber", (String)dataMap.get(0).get("ic_number"));//卡号
							parames.put("idNumber", String.valueOf(holderlist.get(i).get("idcode")));//身份证号
							parames.put("jobNumber", holderno);//工号
							parames.put("mobile", String.valueOf(dataMap.get(0).get("mobile")));//手机号
							parames.put("name", String.valueOf(holderlist.get(i).get("holdername")));//姓名
							parames.put("remark", "修改");//备注
							List<Map<String, Object>> groupListMap =  (List<Map<String, Object>>) dataMap.get(0).get("groupList");
							List<String> groupList = new ArrayList<String>();
							for (int j = 0; j < groupListMap.size(); j++) {
								groupList.add(String.valueOf(groupListMap.get(j).get("id")));
							}
							String groups =  String.join(",", groupList);
							if("".equals(groups) || groups==null){
								parames.put("groups","");
							}else{
								parames.put("groups",groups);
							}
							String updateUrl=SenseLinkConfig.URL+"/v1/user/update/"+id;
							File file = null;
				             if( holderlist.get(i).get("dataPhoto")==null){
				            	 CallingInterfaceUtil.upLoadFile(updateUrl, parames, file);
				             }else{
				             String classpath =	this.getClass().getClassLoader().getResource("/").getPath(); 
					         String webappRoot = classpath.replaceAll("WEB-INF/classes/", "");
				             byte[] dataPhoto =  (byte[]) holderlist.get(i).get("dataPhoto");
				             file = TypeConversionUtil.getFileByBytes(dataPhoto, webappRoot+"images/", "csc.jpg");
				             CallingInterfaceUtil.upLoadFile(updateUrl, parames, file);
				             }
						 }else{continue;}
					}else{continue;}
					
				  }else{//同步SenseLink中没有的人员.新增人员
					   List<Map<String, Object>> programlist =  cardService.querySmallProgram(holderno);
					    params.put("force", "1");//是否强制添加 默认0不强制,1强制
						params.put("groups", "");//人员组列表,默认值根据type决定
						if(programlist.size()==0 || programlist==null){
							params.put("icNumber", "");//ic卡号,可以为空串,长度45
						}else{
							params.put("icNumber", String.valueOf(programlist.get(0).get("cardid")));//ic卡号,可以为空串,长度45
						}
						params.put("jobNumber", holderno);//人员工号，可以为空串，长度限制 45
						params.put("mobile",  String.valueOf(holderlist.get(i).get("mobilephone")));//手机号，可以为空串，长度限制 20
						params.put("name", String.valueOf(holderlist.get(i).get("holdername")));//人员名称
						params.put("remark", "");//必须参数  备注 可为空
						params.putAll(SenseLinkConfig.CommonlySplicing());
						
						Map<String, Object> deptMap = getDeptID();
						
						 if(deptMap.get("code").equals(200)) {
							Map<String, Object> data = (Map<String, Object>) deptMap.get("data");
							if(data!=null) {
							String id =	data.get("id").toString();
							params.put("departmentId", id);//部门 id//有待扩展
							}else {
							params.put("departmentId", "");//部门 id//有待扩展
							}
						 }
						
						String addUserUrl=SenseLinkConfig.URL+"/v1/user";
						File file  = null;
						if( holderlist.get(i).get("dataPhoto")==null){
						String ui =	CallingInterfaceUtil.upLoadFile(addUserUrl, params, file);
						 //System.out.println(ui);
						}else{
							String classpath =	this.getClass().getClassLoader().getResource("/").getPath(); 
				             String webappRoot = classpath.replaceAll("WEB-INF/classes/", "");
							byte[] dataPhoto =  (byte[]) holderlist.get(i).get("dataPhoto");
							 file = TypeConversionUtil.getFileByBytes(dataPhoto, webappRoot+"images/", "xx.jpg");
							 String ui =	CallingInterfaceUtil.upLoadFile(addUserUrl, params, file);
							 //System.out.println(ui);
						}
				  }
			}//end 循环员工
		 }//end 员工信息不为空
	 }//end 方法

      /**
       * 该方法用于同步识别记录
       * 接口:ws://222.191.249.42:5051/websocket/record 是获取识别记录的接口 请求方式是POST
       * 这是一个长连接的(webSocket)接口
       * 接口 : /v1/device 请求方式 GET 具体看文档
       */
	    public static WebSocketClient client;
	  // @PostConstruct//该方法在类加载是自动执行
	   private  void synchronizationRecord()   {
		 try {
			Map<String, String> map = SenseLinkConfig.CommonlySplicing();
			String webSocketURL="ws://222.191.249.42:5051";
			String socketURI=webSocketURL+"/websocket/record/"+"%7B"+map.get("app_key")+"%7D"+"/"+"%7B"+map.get("timestamp")+"%7D"+"/"+"%7B"+map.get("sign")+"%7D"+"";
			
			   client = new WebSocketClient(new URI(socketURI),new Draft_6455()) {

					@Override
	                public void onOpen(ServerHandshake serverHandshake) {
	                	 logger.info("握手成功");
	                }
	 
					 /**
					  * 该方法是接收Link平台的发送过来信息的方法*/
	                @Override
	                public void onMessage(String msg) {
	                    try {
	                 //将推送信息转变成Map 	
	  	              Map<String, Object> resultMap = TypeConversionUtil.stringToMap(msg);
	  	              
	  	            if(resultMap.get("code").equals(30000)){//如果code等于30000
	  	              
	  	              //查询所有添加在平台上的设备信息
		                List<Map<String, Object>> devicelist =	doorService.getSenseLinkDevice();
		                //循环读取设备的信息
		                for (int i = 0; i < devicelist.size(); i++) {
		                	//获取数据库查询到的SN
		                 String localSN =	(String) devicelist.get(i).get("sn");
		                 //获取推送消息的DATA主题信息,并强转成Map
		                  Map<String, Object> dataMap =   (Map<String, Object>) resultMap.get("data");
		                  //获取推送消息中的设备的SN
		                  String LinkSN = (String) dataMap.get("sn");
		                  if(localSN.equals(LinkSN)){//如果双方的SN相同.
		                	  
		                	 String holderno =   (String) dataMap.get("jobNumber");//获取工号 
		                	 iodata.setHolderno(holderno);//放入工号
		                	 iodata.setHoldername((String)dataMap.get("name"));//获取名称
		                		//通过工号查询的部门
		                	HashMap<String, Object> deptMap = holderService.queryDepartmentNameByHolderno(holderno);
		                	if(deptMap!=null){
		                		iodata.setDeptno((String)deptMap.get("departmentno"));//放入部门编号
		                		iodata.setDeptname((String)deptMap.get("departmentname"));//放入部门名称
		                	}
		                	//查询当天,最大时间(就是最后一次健康打卡的温度)
		    	    		NB_IOData nbiodata = nbservice.queryMaxHealthRecord(holderno);
		    	    		if(nbiodata!=null){
		    	    			BigDecimal bd=new BigDecimal(nbiodata.getTemperature());
		    	    			iodata.setTemperatures(bd);
		    	    		}else{
		    	    			iodata.setTemperatures(new BigDecimal(0));
		    	    		}
		                	iodata.setDevicename((String) dataMap.get("deviceName"));//放入设备名称
		                	iodata.setDeviceno(Short.valueOf(devicelist.get(i).get("deviceno").toString()));//放入设备编号
		                	//放入打卡时间iodate
							iodata.setIodate(ThreadLocalDateUtil.parse(TimeUtil.timeStamp2Date(String.valueOf(dataMap.get("signTime")))));
							// 放入打卡时间iotime
							iodata.setIotime(TimeUtil.timeStamp1Date(String.valueOf(dataMap.get("signTime"))));
							iodata.setOpentype(2);iodata.setOpentypename("人脸识别");//方式2
							iodata.setDoorno(Short.valueOf(devicelist.get(i).get("doorno").toString()));//放入门区编号
							iodata.setDoorname((String)devicelist.get(i).get("doorname"));//放入名称
							 String exitreadersn = (String) devicelist.get(i).get("exitreadersn");
							iodata.setDevicetypeno("20");
							 if(exitreadersn==null || "".equals(exitreadersn)){
								 iodata.setIostatus(new Short("11"));//11是进入
								 iodata.setIostatuslang("进入");
							 }else{iodata.setIostatus(new Short("12"));iodata.setIostatuslang("外出");}
							// 执行添加
							 ioService.insertSelective(iodata);
							 //拼接 识别头像
							 String scenePhotoFile=SenseLinkConfig.PHOTO_PATH+(String)dataMap.get("signAvatar");
							 String classpath =	this.getClass().getClassLoader().getResource("/").getPath(); 
				             String webappRoot = classpath.replaceAll("WEB-INF/classes/", "");
				             String photo_name=webappRoot+"images/"+"csc.jpg";
							 TypeConversionUtil.saveToFile(scenePhotoFile,photo_name);
							 byte[] zhaopian =  TypeConversionUtil.InputStream2ByteArray(photo_name);
							 if(zhaopian.length!=0){
								 Integer datano = iodata.getDatano();//添加成功后返回新增后的主键
								 iodataPhoto.setIodataid(datano);//放入iodata新增后返回的id
								 iodataPhoto.setPhoto(zhaopian);
								 idser.insertAppletOpenPhoto(iodataPhoto);
							    	}
		                  }else{logger.debug("该设备在Syris平台不存在.所以不读取它的识别记录");}
						}//end  循环读取devicelist设备集合
	  	             }else{logger.debug("没有刷脸数据");}
	                
	                    } catch (NumberFormatException e) {
							e.printStackTrace();
						} catch (ParseException e) {
							e.printStackTrace();
					     } catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
	                }//end onMessage方法
	 
	                @Override
	                public void onClose(int i, String s, boolean b) {
	                	 logger.info("链接已关闭");
	                }
	 
	                @Override
	                public void onError(Exception e){
	                    e.printStackTrace();
	                    logger.info("发生错误已关闭");
	                }
	            };
	        } catch (URISyntaxException e) {
	            e.printStackTrace();
	        }
	 
	        client.connect();
	        logger.info(client.getDraft());
	      //如果没有连接成功.将会一直连接
	       while(!client.getReadyState().equals(WebSocket.READYSTATE.OPEN)){
	    	   logger.debug("正在连接...");
	        }
		   client.send("哈喽,连接一下啊");
		 }//end  方法
	 
	 //创建部门
	   /**
	    * 该方法是创建部门的接口.
	    * /v2/department/search/code 是通过code来查询部门的接口.请求方式是GET
	    * code是1233456然后通过MD5生成的加密.确保别的部门不会跟我们的重复.并作为唯一标识
	    *如果要单独使用,要将 @Scheduled换成 @Scheduled
	    */
	    //@Scheduled(cron="0 0 5 * * ?")
	    private void createDepartment() {
		//定义一个map用于给接提供参数
		 Map<String, String> parames = new HashMap<String, String>();
		 parames.put("code", SenseLinkConfig.DEPARTMETN_CODE);//SyrisCode部门的code
		 parames.putAll(SenseLinkConfig.CommonlySplicing());//放入鉴权参数
		 String departUrl =SenseLinkConfig.URL+"/v2/department/search/code";
		 String resultlist =  CallingInterfaceUtil.sendGet(departUrl, parames);
		 Map<String, Object> resultMap = TypeConversionUtil.stringToMap(resultlist);
		  if(resultMap.get("code").equals(200)) {
			  logger.debug("部门已存在");
		   }else {//创建部门
			    Map<String, String> params = new HashMap<String, String>();//传参的Map
				params.put("code",SenseLinkConfig.DEPARTMETN_CODE);//部门编码
				params.putAll(SenseLinkConfig.CommonlySplicing());
				String url = SenseLinkConfig.URL+"/v2/department";
				CallingInterfaceUtil.sendPost(url, params);
		  }
	}//end
	    
	     /**
		  * 这是同步服务
		  * 将员工的权限下发与SenseLink平台(中的员工组)对接
		  * /v1/user/list  是查询人员的接口.请求方式GET 具体请看接口文档.这里通过工号(jobNumber)查询
		  * /v1/user/add/group 是批量添加人员到组 .请求方式是POST具体请看接口文档
		  */
	     //@Scheduled(cron="*/5 * * * * ?")
		 public void insertGroupByHolder(){
			 //查询是否有权限下发记录
			List<Map<String, Object>> recordlist = permService.getPermRecord();
			//用于下发成功的记录id.来修改记录的下发状态
			List<String> list = new ArrayList<String>();
			if(recordlist.size()==0){
				logger.debug("没有下发记录");
			}else{//如果有下发记录
				
				for (int i = 0; i < recordlist.size(); i++) {//循环读取下发记录
					//获取记录的id
				  String recordid = recordlist.get(i).get("id").toString();
					//获取操作状态.A是新增,D是删除
				  String updatestatus = (String) recordlist.get(i).get("updatestatus");
				  //获取Syris平台设备中存放的员工组.
				  String SyrisGroupID =  Arrays.asList(recordlist.get(i).get("emergencygroup").toString().split(",")).get(0);
				  
				 //获取员工工号
				  String holderno =	(String) recordlist.get(i).get("holderno");
				  //通过工号查询员工
				  Map<String, Object> resultMap = selectSenseLinkUser(holderno);
				  //获取员工基本信息
				  List<Map<String, Object>>  dataMap =  (List<Map<String, Object>>) resultMap.get("data");
				 if(resultMap.get("code").equals(200) && dataMap.size()>0){//如果 查询成功,在SenseLink平台中有这个人
				   if(updatestatus.equals("A")){//如果下发状态是A,代表添加
					  /**获取SenseLink平台中的员工工号对应的员工id.
					           因为是通过工号查询的个人信息所以所以用0就行*/
					 String userid =  dataMap.get(0).get("id").toString(); 
					Map<String, Object> jieguo = addUserInGroup(SyrisGroupID,userid);
					if(jieguo.get("code").equals(200)){
						list.add(recordid);
					}
				   }else{//否则代表删除
					   String userid =  dataMap.get(0).get("id").toString(); 
					   Map<String, Object> jieguo =   delUserInGroup(SyrisGroupID,userid);
					   if(jieguo.get("code").equals(200)){
							list.add(recordid);
						}
				   }//updatestatus 下发 
				 }else{logger.debug("SenseLink平台中没有"+holderno);}
				}//end recordlist循环
				if(list.size()!=0) {
				permService.updatePremRecordStatus(list);
				list.clear();
				}
			}//end recordlist是否为空的判断
		 }//end insertGroupByHolder()
		 
		 //通过组类型,来获取组的信息(1,是员工.2是访客)
		 private static String selectGroup(String type) {
			 //定义一个map用于给接提供参数
			 Map<String, String> params = new HashMap<String, String>();
			 params.putAll(SenseLinkConfig.CommonlySplicing());
			 params.put("page", "1");//第一页
			 params.put("size", "50");//每页五十个
			 params.put("type", type);
			 String groupUrl = SenseLinkConfig.URL+"/v1/group";
			 String resultMap = CallingInterfaceUtil.sendGet(groupUrl, params);
			 return resultMap;
		 }//end
		 
		 
		 /**通过工号查询SenseLink平台中是否存在该员工*/
		 private static Map<String, Object>  selectSenseLinkUser(String holderno) {
			 //定义一个map用于给接提供参数
			 Map<String, String> params = new HashMap<String, String>();
			 params.putAll(SenseLinkConfig.CommonlySplicing());
			 params.put("jobNumber", holderno);
			 String groupUrl = SenseLinkConfig.URL+"/v1/user/list";
			 String result = CallingInterfaceUtil.sendGet(groupUrl, params);
			Map<String, Object> resultMap =  TypeConversionUtil.stringToMap(result);
			 return resultMap;
		 }//end
	 
		 /**
		  * groupId -组id
		  * userIds list 是 批量添加的人员 id。每次操作的最大值为2000 人
		  * /v1/user/add/group 是批量添加人员到组 .请求方式是POST具体请看接口文档
		  */
		 private static  Map<String, Object> addUserInGroup(String groupId,String userIds){
			 //定义一个map用于给接提供参数
			 Map<String, String> params = new HashMap<String, String>();
			 params.putAll(SenseLinkConfig.CommonlySplicing());
			 params.put("groupId", groupId);
			 params.put("userIds", userIds);
			 String addUserUrl = SenseLinkConfig.URL+"/v1/user/add/group";
			 String result = CallingInterfaceUtil.sendPost(addUserUrl, params);
			Map<String, Object> resultMap =  TypeConversionUtil.stringToMap(result);
			return resultMap;
		 }//end 
		 
		 
		 /**
		  * groupId -组id
		  * userIds list 是 批量添加的人员 id。每次操作的最大值为2000 人
		  * /v1/user/remove/group 是批量添加人员到组 .请求方式是POST具体请看接口文档
		  */
		 private static  Map<String, Object> delUserInGroup(String groupId,String userIds){
			 //定义一个map用于给接提供参数
			 Map<String, String> params = new HashMap<String, String>();
			 params.putAll(SenseLinkConfig.CommonlySplicing());
			 params.put("groupId", groupId);
			 params.put("userIds", userIds);
			 String addUserUrl = SenseLinkConfig.URL+"/v1/user/remove/group";
			 String result = CallingInterfaceUtil.sendPost(addUserUrl, params);
			Map<String, Object> resultMap =  TypeConversionUtil.stringToMap(result);
			return resultMap;
		 }//end 
		 
		 /**
		  * 通过Syris公司特殊并唯一的(code)来查询部门
		  * /v2/department/search/code 是通过code来查询该接口是否存在
		  * @return
		  */
		 private static Map<String, Object> getDeptID(){
			Map<String, String> params = new HashMap<String, String>();
			params.put("code",SenseLinkConfig.DEPARTMETN_CODE);//SyrisCode部门编码
			params.putAll(SenseLinkConfig.CommonlySplicing());//放入鉴权参数
			String departUrl = SenseLinkConfig.URL+"/v2/department/search/code";
			String resultlist =  CallingInterfaceUtil.sendGet(departUrl, params);
			Map<String, Object> deptMap = TypeConversionUtil.stringToMap(resultlist);
			return deptMap;
		 }
		 
		 private static Map<String, Object> erweima(){
				Map<String, String> params = new HashMap<String, String>();
				params.put("user_id","5911");
				params.putAll(SenseLinkConfig.CommonlySplicing());//放入鉴权参数
				String departUrl = SenseLinkConfig.URL+"/v3/qr/content";
				String resultlist =  CallingInterfaceUtil.sendGet(departUrl, params);
				Map<String, Object> deptMap = TypeConversionUtil.stringToMap(resultlist);
				return deptMap;
			 }
		 
		 
		 
} //classe
	 
	 
	
	 
