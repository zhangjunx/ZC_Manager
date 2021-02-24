package com.xr.service.impl;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.xr.dao.WX_VisitorsInfoAddMapper;
import com.xr.entity.DepartmentData;
import com.xr.entity.PageInfo;
import com.xr.entity.WX_VisitorsInfo;
import com.xr.entity.WX_VisitorsInfoAdd;
import com.xr.entity.WX_VisitorsPhoto;
import com.xr.service.IWX_VisitorsInfoAddService;
@Service
public class WX_VisitorsInfoAddServiceImpl implements IWX_VisitorsInfoAddService {

	@Autowired
	private WX_VisitorsInfoAddMapper vam;
	 
	 
	@Override
	public Map<String, Object> queryHolderInfoByCarNoService(String cardid) {
	   // 根据卡号查干警信息
		return vam.queryHolderInfoByCarNo(cardid);
	}

	
	@Override
	@Transactional
	public int insertPeopleAutoRegisterService(String str1,String str2,MultipartFile[] photo) throws IOException {
		// 添加人员自助登记信息
		WX_VisitorsInfo v=JSON.parseObject(str1,WX_VisitorsInfo.class);
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<WX_VisitorsInfoAdd> list=null;
		//先获取前端取到的登记端信息
		String receiversname=v.getReceiversname();
		String approvertype=v.getApprovertype();
		if(approvertype.equals("22")){
			v.setApproverrole2(v.getApproverrole1());
			v.setApproverrolename2(v.getApproverrolename1());
			String holderno=v.getApproverrole1();
			String deptname=vam.queryApproverDeptByholder(holderno);
			String rolecode=vam.queryApproverRoleCodeByholder(holderno);
			v.setApproverrole1(rolecode);
			v.setApproverrolename1(deptname);
		}
		v.setApplystatus("10");
		v.setApplystatusname("填写申请");
		v.setFlowtracing(receiversname+"于"+(sdf.format(new Date()))+"填写申请！");
		v.setVisitorstype("P");
		v.setFilldate(new Date());
		int i=vam.insertVisitorsInfo(v);
		Integer id=v.getId();
		System.out.println(id);
		if(i>0){
			 //封装的外协人员信息
			list=JSONArray.parseArray(str2,WX_VisitorsInfoAdd.class);
			for(int k=0;k<list.size();k++){
				WX_VisitorsInfoAdd va=list.get(k);
				va.setVisitorsinfoid(v.getId());
				va.setRectypetext("二代身份证");
				va.setVisitorstype("P");
				va.setVisitorsstatus("10");
				va.setVisitorsstatusname("已登记");
				va.setVisitorsdate(new Date());
				i=vam.insertSelective(va);
				if(i>0){
					Integer visitorsid=va.getId();
					WX_VisitorsPhoto vp=new WX_VisitorsPhoto();
					vp.setVisitorsid(visitorsid);
					vp.setIdphoto(photo[2*k].getBytes());
					vp.setPhotodata(photo[2*k+1].getBytes());
					i=vam.insertVisitorsPhoto(vp);
				}
			}
		}
		return i;
	}//end

	@Override
	@Transactional
	public int insertVehicleAutoRegisterService(String str1, String str2, MultipartFile[] photo) throws IOException  {
		// 车辆自助登记
		WX_VisitorsInfo v=JSONObject.parseObject(str1, WX_VisitorsInfo.class);
		String receiversname=v.getReceiversname();
		String approvertype=v.getApprovertype();
		if(approvertype.equals("22")){//非工作日审批
			v.setApproverrole2(v.getApproverrole1());
			v.setApproverrolename2(v.getApproverrolename1());
			String holderno=v.getApproverrole1();//查所选审批人工号
			String deptname=vam.queryApproverDeptByholder(holderno);
			String rolecode=vam.queryApproverRoleCodeByholder(holderno);
			v.setApproverrole1(rolecode);
			v.setApproverrolename1(deptname);
		}
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		v.setApplystatus("10");
		v.setApplystatusname("提交申请");
		v.setFilldate(new Date());
		v.setVisitorstype("C");
		v.setFlowtracing(receiversname+"于"+(sdf.format(new Date()))+"填写申请！");
		int i=vam.insertVisitorsInfo(v);
		if(i>0){
			WX_VisitorsInfoAdd va=JSONObject.parseObject(str2, WX_VisitorsInfoAdd.class);
			Integer visitorsinfoid=v.getId();
			va.setVisitorsinfoid(visitorsinfoid);
			va.setVisitorsdate(new Date());
			va.setRectypetext("二代身份证");
			va.setVisitorstype("C");
			va.setVisitorsstatus("10");
			va.setVisitorsstatusname("已登记");
			i=vam.insertSelective(va);
			if(i>0){
				Integer visitorsid=va.getId();
				WX_VisitorsPhoto vp=new WX_VisitorsPhoto();
				vp.setVisitorsid(visitorsid);
				vp.setIdphoto(photo[0].getBytes());
				vp.setPhotodata(photo[1].getBytes());
				i=vam.insertVisitorsPhoto(vp);
			}
		}
		return i;
	}//end

	@Override
	public List<DepartmentData> queryApproveDeptListService() {
		// 查询所有参与审批的部门
		List<DepartmentData> list=vam.queryApproveDeptList();
		return list;
	}

	@Override
	public List<Map<String,Object>> queryHolderListByDeptNoService(String departmentno) {
		// 通过部门查改部门下的人
		return vam.queryHolderListByDeptNo(departmentno);
	}

	
	@Override
	public List<Map<String, Object>> queryVisitorsRegisterRecordListService(PageInfo pageinfo,WX_VisitorsInfo record) {
		// 查询所有的访客记录
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=vam.queryVisitorsRegisterRecordList(record);
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():(total/pageinfo.getPageSize()+1));
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public int updateApplyStatusNoAgreeService(Integer id,String holderno) {
		// 审批不同意
		WX_VisitorsInfo record=vam.queryVisitorsInfoByPrimary(id);
		String applystatus=record.getApplystatus();
		String approvertype=record.getApprovertype();//11工作时间审批  22 非工作时间审批
		String flowtracing=record.getFlowtracing();
		String holdername=vam.queryHolderNameByHolderno(holderno);//审批人的姓名
		String deptname=vam.queryApproverDeptByholder(holderno);//查审批人的审批部门
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(approvertype.equals("11")){//判断是否是  11工作时间审批   经二次审批
			if(applystatus.equals("10")){//第一次审批不同意
				record.setApplystatus("21");
				record.setApplystatusname(deptname+holdername+"第一次审批驳回");
				record.setDirectorchargeappdate(new Date());
				record.setDirectorchargecode(holderno);//登录人id
				record.setDirectorchargename(holdername);
				record.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"第一次审批驳回!");
			}else{//第二次审批不同意
				record.setApplystatus("31");
				record.setApplystatusname(deptname+holdername+"第二次审批驳回");
				record.setDirectornameappdate(new Date());
				record.setDirectorcode(holderno);//登录人id
				record.setDirectorname(holdername);
				record.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"第二次审批驳回!");
			}
		}else if(approvertype.equals("22")){//领导特批  22 非工作时间审批   一次审批
			record.setApplystatus("31");
			record.setApplystatusname(deptname+holdername+"审批驳回");
			record.setDirectorchargeappdate(new Date());
			record.setDirectorchargecode(holderno);//登录人id
			record.setDirectorchargename(holdername);
			record.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"审批驳回!");
		}
		
		int i=vam.updateApplyStatusAgreeOrNoAgree(record);
		return i;
	}

	@Override
	public synchronized  int updateApplyStatusAgreeService(Integer id,String holderno) {
		// 审批同意
		WX_VisitorsInfo record=vam.queryVisitorsInfoByPrimary(id);
		String applystatus=record.getApplystatus();
		String flowtracing=record.getFlowtracing();
		String approvertype=record.getApprovertype();//11工作日审批  22非工作日审批
		String holdername=vam.queryHolderNameByHolderno(holderno);//查询审批人的姓名
		String deptname=vam.queryApproverDeptByholder(holderno);//查询审批人所属的审批部门领导
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(approvertype.equals("11")){//是否是工作日审批 11  经两次审批
			if(applystatus.equals("10")){//第一次审批同意
				record.setApplystatus("20");
				record.setApplystatusname(deptname+holdername+"第一次审批同意");
				record.setDirectorchargeappdate(new Date());
				record.setDirectorchargecode(holderno);//登录人id
				record.setDirectorchargename(holdername);
				record.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"第一次审批同意！");
			}else if(applystatus.equals("20")){//第二次审批同意
				record.setApplystatus("30");
				record.setApplystatusname(deptname+holdername+"第二次审批同意");
				record.setDirectornameappdate(new Date());
				record.setDirectorcode(holderno);//登录人id
				record.setDirectorname(holdername);
				record.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"第二次审批同意！");
			}
		}else if(approvertype.equals("22")){//非工作日审批  22 经一次审批 领导
			record.setApplystatus("30");
			record.setApplystatusname(deptname+holdername+"审批同意");
			record.setDirectorchargeappdate(new Date());
			record.setDirectorchargecode(holderno);//登录人id
			record.setDirectorchargename(holdername);
			record.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"审批同意！");
		}
		int i=vam.updateApplyStatusAgreeOrNoAgree(record);
		return i;
	}//end

	
	@Override
	public synchronized int updateApplyStatusAgreeBatchService(Map m) {
		//批量审批 同意
		List<Map<String,Object>> ids=(List<Map<String,Object>>) m.get("ids");
		String holderno=(String) m.get("holderno");
		List<WX_VisitorsInfo> list=new ArrayList<WX_VisitorsInfo>();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for(int i=0;i<ids.size();i++){
			String id=(String) ids.get(i).get("id");
			WX_VisitorsInfo v=vam.queryVisitorsInfoByPrimary(Integer.parseInt(id));
			String applystatus=v.getApplystatus();
			String flowtracing=v.getFlowtracing();
			String approvertype=v.getApprovertype();//11 工作日审批  22 非工作日审批
			String holdername=vam.queryHolderNameByHolderno(holderno);//查询审批人的姓名
			String deptname=vam.queryApproverDeptByholder(holderno);//查询审批人所属的审批部门
			if(approvertype.equals("11")){//是否是工作日审批 11  经两次审批
				if(applystatus.equals("10")){//第一次审批同意
					v.setApplystatus("20");
					v.setApplystatusname(deptname+holdername+"第一次审批同意");
					v.setDirectorchargeappdate(new Date());
					v.setDirectorchargecode(holderno);//登录人id
					v.setDirectorchargename(holdername);
					v.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"第一次审批同意!");
				}else if(applystatus.equals("20")){//第二次审批同意
					v.setApplystatus("30");
					v.setApplystatusname(deptname+holdername+"第二次审批同意");
					v.setDirectornameappdate(new Date());
					v.setDirectorcode(holderno);//登录人id
					v.setDirectorname(holdername);
					v.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"第二次审批同意!");
				}
			}else if(approvertype.equals("22")){//非工作日审批  22 经一次审批 领导
				v.setApplystatus("30");
				v.setApplystatusname(deptname+holdername+"审批同意");
				v.setDirectorchargeappdate(new Date());
				v.setDirectorchargecode(holderno);//登录人id
				v.setDirectorchargename(holdername);
				v.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"审批同意!");
			}
			list.add(v);
		}
		int i=0;
		if(list.size()>0){
			i=vam.updateApplyStatusAgreeOrNoAgreeBatch(list);
		}
		return i;
	}//end
	
	@Override
	public int updateApplyStatusNoAgreeBatchService(Map m) {
		//批量审批不同意  
		List<Map<String,Object>> ids=(List<Map<String,Object>>) m.get("ids");
		String holderno=(String) m.get("holderno");
		List<WX_VisitorsInfo> list=new ArrayList<WX_VisitorsInfo>();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for(int i=0;i<ids.size();i++){
			Integer id=Integer.parseInt((String) ids.get(i).get("id"));
			WX_VisitorsInfo v=vam.queryVisitorsInfoByPrimary(id);
			String applystatus=v.getApplystatus();
			String flowtracing=v.getFlowtracing();
			String approvertype=v.getApprovertype();
			String holdername=vam.queryHolderNameByHolderno(holderno);//查询审批人姓名
			String deptname=vam.queryApproverDeptByholder(holderno);//查询审批人所属审批部门
			if(approvertype.equals("11")){//判断是否是  11工作时间审批   经二次审批
				if(applystatus.equals("10")){//第一次审批不同意
					v.setApplystatus("21");
					v.setApplystatusname(deptname+holdername+"第一次审批驳回");
					v.setDirectorchargeappdate(new Date());
					v.setDirectorchargecode(holderno);//登录人id
					v.setDirectorchargename(holdername);
					v.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"第一次审批驳回!");
				}else if(applystatus.equals("20")){//第二次审批不同意
					v.setApplystatus("31");
					v.setApplystatusname(deptname+holdername+"第二次审批驳回");
					v.setDirectornameappdate(new Date());
					v.setDirectorcode(holderno);//登录人id
					v.setDirectorname(holdername);
					v.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"第二次审批驳回!");
				}
			}else if(approvertype.equals("22")){//领导特批  22 非工作时间审批   一次审批
				v.setApplystatus("31");
				v.setApplystatusname(deptname+holdername+"审批驳回");
				v.setDirectorchargeappdate(new Date());
				v.setDirectorchargecode(holderno);//登录人id
				v.setDirectorchargename(holdername);
				v.setFlowtracing(flowtracing+deptname+"审批人"+holdername+"于"+sdf.format(new Date())+"审批驳回!");
			}
			list.add(v);
		}
		int i=0;
		if(list.size()>0){
			i=vam.updateApplyStatusAgreeOrNoAgreeBatch(list);
		}
		return i;
	}//end

	@Override
	public Map<String, Object> queryVisitorsInfoByUnauditedService(String str) {
		// 登记端查 待审批信息
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list2=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list1=vam.queryVisitorsInfoByUnaudited(str);
		for(int i=0;i<list1.size();i++){
			Object id1=list1.get(i).get("id");
			boolean res=false;
			for(int j=i+1;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					res=true;
				}
			}
			//去除id相同的
			if(!res){
				list2.add(list1.get(i));
			}
		}
		//将id相同的封装到一起
		for(int i=0;i<list2.size();i++){
			Map<String,Object> map1=new HashMap<String,Object>();
			Object id1=list2.get(i).get("id");
			String visitorstype=(String) list2.get(i).get("visitorstype");//P:人员  C:车辆
			String approvertypename=(String) list2.get(i).get("approvertypename");//11 工作日审批  22非工作日审批
			String applystatus=(String) list2.get(i).get("applystatus");// 10 20
			if(applystatus.equals("20")){//一级审批人已审核过
				String directorchargecode=list2.get(i).get("directorchargecode").toString();
				String deptname=vam.queryApproverDeptByholder(directorchargecode);
				map1.put("approverrolename", deptname);
			}
			map1.put("visitorstype", visitorstype);
			map1.put("approvertypename", approvertypename);//11工作日审批  22 非工作日审批
			map1.put("applystatus", applystatus);
			map1.put("id", id1);
			List<Map<String,Object>> list3=new ArrayList<Map<String,Object>>();
			for(int j=0;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					list3.add(list1.get(j));
				}
			}
			map1.put("arrlist", list3);
			list.add(map1);
		}
		if(list.size()>0){
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", list);
		}else{
			map.put("flag", false);
			map.put("reason", "暂无数据可查！");
		}
		return map;
	}//end

	@Override
	public Map<String, Object> queryVisitorsInfoByAuditedService(String str) {
		//登记端  查 已审批信息
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list2=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list1=vam.queryVisitorsInfoByAudited(str);
		for(int i=0;i<list1.size();i++){
			Object id1=list1.get(i).get("id");
			boolean res=false;
			for(int j=i+1;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					res=true;
				}
			}
			//去除id相同的
			if(!res){
				list2.add(list1.get(i));
			}
		}
		//将id相同的封装到一起
		for(int i=0;i<list2.size();i++){
			Map<String,Object> map1=new HashMap<String,Object>();
			Object id1=list2.get(i).get("id");
			String visitorstype=(String) list2.get(i).get("visitorstype");//P:人员  C:车辆
			String approvertypename=(String) list2.get(i).get("approvertypename");//11 工作日审批  22非工作日审批
			String applystatus=(String) list2.get(i).get("applystatus");// 21 30 31
			map1.put("visitorstype", visitorstype);
			map1.put("approvertypename", approvertypename);//11工作日审批  22 非工作日审批
			map1.put("applystatus", applystatus);
			map1.put("id", id1);
			List<Map<String,Object>> list3=new ArrayList<Map<String,Object>>();
			for(int j=0;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					list3.add(list1.get(j));
				}
			}
			map1.put("arrlist", list3);
			list.add(map1);
		}
		if(list.size()>0){
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", list);
		}else{
			map.put("flag", false);
			map.put("reason", "暂无数据可查！");
		}
		return map;
	}//end
	
	@Override
	public Map<String, Object> queryMyCurrNewsInfoService(String holderno,HttpServletRequest request,HttpSession session) {
		// 待我审批 消息提醒 实时刷新提示
		Map<String, Object> map=new HashMap<String, Object>();
		String rolecode=vam.queryApproverRoleCodeByholder(holderno);//查询审批人所属审批代号
		if(rolecode==null){
			map.put("flag", false);
			map.put("reason", "对不起，你没有审批权限！");
			return map;
		}
		Integer maxid=null;
		//如果为空再次重新取下maxid 没有待你审批的消息
		if(request.getSession().getAttribute("maxid")==null || "".equals(request.getSession().getAttribute("maxid"))){
			//代表登录人有审批权限
			List<Map<String, Object>> litt=new ArrayList<Map<String, Object>>();
			List<Map<String, Object>> litt1=vam.queryMyNewsInfo(rolecode);
			//只取id不同的数据
			for(int i=0;i<litt1.size();i++){
				Object id1=litt1.get(i).get("id");
				boolean res=false;
				for(int j=i+1;j<litt1.size();j++){
					Object id2=litt1.get(j).get("id");
					if(id1.equals(id2)){
						res=true;
					}
				}
				if(!res){
					litt.add(litt1.get(i));
				}
			}
			List<Map<String, Object>> litt2=new ArrayList<Map<String, Object>>();
			//将applystatus=20的 同意审批部门审批过的 去除
			for(int i=0;i<litt.size();i++){
				String applystatus=(String) litt.get(i).get("applystatus");
				if(applystatus.equals("20")){
					String directorchargecode=(String) litt.get(i).get("directorchargecode");//查询第一次审批人员的工号
					String deptno1=vam.queryApproverRoleCodeByholder(directorchargecode);//查询第一次审批人员的所属审批部门
					String deptno2=vam.queryApproverRoleCodeByholder(holderno);//查询登录人所属的审批的部门
					if(deptno2.equals(deptno1)){//相等的话代表同一个部门已有其他人审批过了
						litt2.add(litt.get(i));//将重复的添加到List2集合
					}
				}
			}
			//去除经过一级审批后 同部门的审批人审批过的
			litt.removeAll(litt2);
			if(litt.size()>0){
				 maxid=Integer.parseInt(litt.get(0).get("id").toString());
				//取出当前  待我审批的消息的最大id
				for(int i=0;i<litt.size();i++){
					Integer id2=Integer.parseInt(litt.get(i).get("id").toString());
					if(id2>maxid){
						maxid=id2;
					}  
				}
				 //如果maxid 大于0代表有需要审批的消息
				//maxid=(Integer) request.getSession().getAttribute("maxid");
			}else{
				maxid=0;
			}
			//session.setAttribute("maxid", maxid);
		}else{
			//待我审批的消息不为空 maxid>0
		    maxid=(Integer) request.getSession().getAttribute("maxid");
		}
		List<Map<String, Object>> list=new ArrayList<Map<String, Object>>();
		Map<String, Object> ma=new HashMap<String, Object>();
		ma.put("rolecode", rolecode);
		ma.put("maxid", maxid);
		List<Map<String, Object>> list1=vam.queryMyCurrNewsInfo(ma);//rolecode,maxid
		//只取id不同的数据
		for(int i=0;i<list1.size();i++){
			Object id1=list1.get(i).get("id");
			boolean res=false;
			for(int j=i+1;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					res=true;
				}
			}
			if(!res){
				list.add(list1.get(i));
			}
		}
		List<Map<String, Object>> list2=new ArrayList<Map<String, Object>>();
		//将applystatus=20的 同意审批部门审批过的 去除
		for(int i=0;i<list.size();i++){
			String applystatus=(String) list.get(i).get("applystatus");
			if(applystatus.equals("20")){
				String directorchargecode=(String) list.get(i).get("directorchargecode");//查询第一次审批人员的工号
				String deptno1=vam.queryApproverRoleCodeByholder(directorchargecode);//查询第一次审批人员的所属审批部门
				String deptno2=vam.queryApproverRoleCodeByholder(holderno);//查询登录人所属的审批的部门
				if(deptno2.equals(deptno1)){//相等的话代表同一个部门已有其他人审批过了
					//list.remove(list.get(i));
					list2.add(list.get(i));//将统一部门审批过的20添加到集合里
				}
			}
		}
		//移除20  同部门已审批过的
		list.removeAll(list2);
		 //如果maxid 大于0代表有需要审批的消息
		if(list.size()>0){
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", list.size());
			//取出当前  待我审批的消息的最大id
			for(int i=0;i<list.size();i++){
				Integer id2=Integer.parseInt(list.get(i).get("id").toString());
				if(id2>maxid){
					maxid=id2;
				}
			}
			session.setAttribute("maxid", maxid);
		}else{
			map.put("flag", false);
			map.put("reason", "暂无消息可查！");
		}
		return map;
	}//end  待我审批
	
	@Override
	public Map<String, Object> queryUnauditedByMyService(String holderno) {
		// 待我审批
		Map<String, Object> map=new HashMap<String, Object>();
		String rolecode=vam.queryApproverRoleCodeByholder(holderno);//查询审批人所属审批代号
		if(rolecode==null){
			map.put("flag", false);
			map.put("reason", "对不起，你没有审批权限！");
			return map;
		}
		List<Map<String, Object>> list=new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> list1=vam.queryUnauditedByMy(rolecode);
		List<Map<String, Object>> list2=new ArrayList<Map<String, Object>>();
		//只取id不同的数据
		for(int i=0;i<list1.size();i++){
			Object id1=list1.get(i).get("id");
			boolean res=false;
			for(int j=i+1;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					res=true;
				}
			}
			if(!res){
				list2.add(list1.get(i));
			}
		}
		List<Map<String, Object>> list22=new ArrayList<Map<String, Object>>();
		//将applystatus=20的 同一审批部门审批过的   放到一个集合里    去除
		for(int i=0;i<list2.size();i++){
			String applystatus=(String) list2.get(i).get("applystatus");
			if(applystatus.equals("20")){
				String directorchargecode=(String) list2.get(i).get("directorchargecode");//查询第一次审批人员的工号
				String deptname1=vam.queryApproverDeptByholder(directorchargecode);//查询第一次审批人员的所属审批部门
				String deptname2=vam.queryApproverDeptByholder(holderno);//查询登录人所属的审批的部门
				if(deptname1.equals(deptname2)){//相等的话代表同一个部门已有其他人审批过了
					//list2.remove(list2.get(i));
					list22.add(list2.get(i));
				}
			}
		}
		
		//将list2中的List22去除
		list2.removeAll(list22);
		
		//将id相同的外协封装到一起
		for(int i=0;i<list2.size();i++){
			Map<String, Object> map1=new HashMap<String, Object>();
			Object id1=list2.get(i).get("id");
			String visitorstype=(String) list2.get(i).get("visitorstype");//P人员  C车辆
			String approvertype=(String) list2.get(i).get("approvertype");//11 工作日审批  22 非工作日审批
			String applystatus=(String) list2.get(i).get("applystatus");
			map1.put("visitorstype", visitorstype);
			map1.put("approvertype", approvertype);
			map1.put("applystatus", applystatus);
			map1.put("id", id1);
			List<Map<String, Object>> list3=new ArrayList<Map<String, Object>>();
			for(int j=0;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					list3.add(list1.get(j));
					map1.put("arrlist", list3);
				}
			}
			list.add(map1);
		} 
		if(list.size()>0){
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", list);
		}else{
			map.put("flag", false);
			map.put("reason", "对不起，暂无消息可查！！");
		}
		
		return map;
	}//end  待我审批

	@Override
	public Map<String, Object> queryAuditedByMyService(String holderno) {
		// 我已审批
		Map<String, Object> map=new HashMap<String, Object>();
		List<Map<String, Object>> list=new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> list2=new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> list1=vam.queryAuditedByMy(holderno);
		for(int i=0;i<list1.size();i++){//将id重复的去除
			Object id1=list1.get(i).get("id");
			boolean res=false;
			for(int j=i+1;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					res=true;
				}
			}
			if(!res){
				list2.add(list1.get(i));
			}
		}//将id重复的去除
		
		for(int i=0;i<list2.size();i++){
			Map<String, Object> map1=new HashMap<String, Object>();
			List<Map<String, Object>> list3=new ArrayList<Map<String, Object>>();
			Object id1=list2.get(i).get("id");
			String visitorstype=(String) list2.get(i).get("visitorstype");
			String approvertype=(String) list2.get(i).get("approvertype");
			String applystatus=(String) list2.get(i).get("applystatus");
			for(int j=0;j<list1.size();j++){
				Object id2=list1.get(j).get("id");
				if(id1.equals(id2)){
					list3.add(list1.get(j));
					map1.put("arrlist", list3);
				}
			}
			map1.put("id", id1);
			map1.put("visitorstype", visitorstype);
			map1.put("approvertype", approvertype);
			map1.put("applystatus", applystatus);
			list.add(map1);
		}
		if(list.size()>0){
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", list);
		}else{
			map.put("flag", false);
			map.put("reason", "对不起，你还未审批过信息！！");
		}
		return map;
	}//end 我已审批

	@Override
	public List<Map<String, Object>> queryAuditedRecordListService() {
		// 查询所有已审核访客记录
		return vam.queryAuditedRecordList();
	}

	@Override
	public Map<String, Object> queryDetailInfoService(Integer id) {
		// 查看详情
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String, Object>> list=new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> list1=vam.queryDetailInfo(id);
		Map<String,Object> map1=new HashMap<String,Object>();
		String visitorstype=(String) list1.get(0).get("visitorstype");
		String applystatusname=(String) list1.get(0).get("applystatusname");
		String approvertypename=(String) list1.get(0).get("approvertypename");
		map1.put("id", id);
		map1.put("visitorstype", visitorstype);
		map1.put("applystatusname", applystatusname);
		map1.put("approvertypename", approvertypename);
		for(int i=0;i<list1.size();i++){
			list.add(list1.get(i));
		}
		map1.put("arrlist", list);
		if(map1!=null){
			map.put("flag", true);
			map.put("reason", "查询成功！");
			map.put("result", map1);
		}else{
			map.put("flag", false);
			map.put("reason", "暂无数据可查！");
		}
		return map;
	}

	@Override
	public List<Map<String, Object>> getVisitorsStaticService(Map m,PageInfo pageinfo) {
		//  统计司机，固定外协，临时外协人员
		//PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String, Object>> list=vam.getVisitorsStatic(m);//车辆，临时外协人
		List<Map<String, Object>> list2=vam.getHolderCount(m);//员工，固定外协
		List<Map<String, Object>> list1=new ArrayList<Map<String, Object>>();
		//遍历list 去除iodate相同的
		
		for(int i=0;i<list.size();i++){
			String iodate1=list.get(i).get("iodate").toString();
			if("".equals(iodate1) || iodate1==null){
				
			}
			Map<String,Object> m1=new HashMap<String,Object>();
			boolean res=false;
			for(int j=i+1;j<list.size();j++){
				String iodate2=list.get(j).get("iodate").toString();
				if(iodate1.equals(iodate2)){
					res=true;
				}
			}
			if(!res){
				m1.put("iodate", iodate1);
				list1.add(m1);
			}
		}
		
		/*for(int i=0;i<list2.size();i++){
			String iodate1=list2.get(i).get("iodate").toString();
			if("".equals(iodate1) || iodate1==null){
				
			}
			Map<String,Object> m1=new HashMap<String,Object>();
			boolean res=false;
			for(int j=i+1;j<list2.size();j++){
				String iodate2=list2.get(j).get("iodate").toString();
				if(iodate1.equals(iodate2)){
					res=true;
				}
			}
			if(!res){
				m1.put("iodate", iodate1);
				m1.put("count", list2.get(i).get("count").toString());
				m1.put("visitorstype", "G");
				list1.add(m1);
			}
		}*/
		
		//将日期相同的集合封装到一个map中 封装list 
		for(int i=0;i<list1.size();i++){
			String iodate1=list1.get(i).get("iodate").toString();
			List<Map<String, Object>> list3=new ArrayList<Map<String, Object>>();
			for(int j=0;j<list.size();j++){
				String iodate2=list.get(j).get("iodate").toString();
				if(iodate1.equals(iodate2)){
					list3.add(list.get(j));
				}
			}
			list1.get(i).put("arrlist", list3);
		}
		//将结果序列排序
		Collections.sort(list1, new Comparator<Map<String, Object>>(){
			@Override
			public int compare(Map<String, Object> o1, Map<String, Object> o2) {
				String date1=o1.get("iodate").toString();
				String date2=o2.get("iodate").toString();
				Calendar c1=Calendar.getInstance();
				Calendar c2=Calendar.getInstance();
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
				try {
					c1.setTime(sdf.parse(date1));
					c2.setTime(sdf.parse(date2));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				long time1=c1.getTimeInMillis();
				long time2=c2.getTimeInMillis();
				return (int) (time2-time1);
			}
		});
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		com.github.pagehelper.PageInfo<Map<String, Object>> p=new com.github.pagehelper.PageInfo<Map<String, Object>>(list1);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list1;
	}//end
	
	
	
	
	
}
