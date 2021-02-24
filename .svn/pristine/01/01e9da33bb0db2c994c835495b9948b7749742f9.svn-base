package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ACL_RolesMapper;
import com.xr.dao.IODataMapper;
import com.xr.entity.IOData;
import com.xr.entity.PageInfo;
import com.xr.service.IIODataService;


@Service
public class IODataServiceImpl implements IIODataService{

	 @Autowired
	 private IODataMapper iodm;//引入打卡数据操作层
	 @Autowired
	 private ACL_RolesMapper rm;//引入打卡数据操作层

	@Override
	public List<Map<String,Object>> queryIORecordListByPageService(Map m,PageInfo pageinfo) {
		// 查询出入记录
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=iodm.queryIORecordList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public Map<String,Object> queryIOLastAreaListService(HttpServletRequest request,String str) {
		// 根据部门分组 查询部门下人员 再查人员最后进出位置
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<String> deptnos=new ArrayList<String>();
		List<Map<String,Object>> list1=rm.queryDeptNoListByLoginPerson(str);
		if(list1.size()>0){
			for(int i=0;i<list1.size();i++){
				deptnos.add(list1.get(i).get("deptno").toString());
			}
		}else{
			deptnos.add("000");
		}
		 m.put("list", deptnos);
		 List<Map<String,Object>> list=iodm.queryIOLastAreaList(m);
		 List<Map<String,Object>> list2=iodm.getLastLeaveInfo(m);
		 
		 if(list.size()>0){
			 map.put("flag", true);
			 map.put("reason", "查询成功!");
			 map.put("result", list);
			 map.put("result2", list2);
		 }else{
			 map.put("flag", false);
			 map.put("reason", "暂无数据可查！");
		 } 
		return map;
	}

	@Override
	public  IOData queryIOLastAreaByDataNoService(Integer datano) {
		// 实时定位时 点击某个人查看其最后位置 信息  Integer datano
		IOData record=iodm.queryIOLastAreaByDataNo(datano);
		return record;
	}

	@Override
	public List<IOData> queryIORecordByHolderService(Map m) {
		// 根据工号查个人进出记录 小程序
		return iodm.queryIORecordByHolder(m);
	}

	@Override
	public int insert(IOData record) {
		//添加方法
		return iodm.insert(record);
	}

	@Override
	public int insertSelective(IOData record) {
		// 添加数据
		return iodm.insertSelective(record);
	}

	@Override
	public Map<String,Object> queryIOCurrRecordListByMaxDataNoService(HttpServletRequest request,HttpSession session) {
		// 进出实时监控 获取的数据 Integer maxdatano 
		 Map<String,Object> map=new HashMap<String,Object>();
		Integer datano=null;//
		 Integer maxdatano=null;
		 if(request.getSession().getAttribute("maxdatano")==null || "".equals(request.getSession().getAttribute("maxdatano"))){
			  maxdatano=iodm.queryMaxDataNo();//获取最大值
			 session.setAttribute("maxdatano", maxdatano);
		 }else{
			 maxdatano=(Integer) request.getSession().getAttribute("maxdatano");
		 } 
		 if(maxdatano==null || "".equals(maxdatano)){
			 maxdatano=0;
		 }
		 datano=maxdatano;  
		 List<Map<String,Object>> list=iodm.queryIOCurrRecordListByMaxDataNo(datano);
		 for(int i=0;i<list.size();i++){
			 Integer datano2=Integer.parseInt(list.get(i).get("datano").toString());
			 if(datano2>maxdatano){
				 maxdatano=datano2;
			 }
		 }
		 session.setAttribute("maxdatano", maxdatano);//不能放开 不然数据一闪而过 
		 if(list.size()>0){
			 map.put("flag", true);
			 map.put("reason", "查询成功");
			 map.put("result", list);
		 }else{
			 map.put("flag", false);
			 map.put("reason", "暂无数据可查！");
		 }
		return map;
	}

	@Override
	public Integer queryMaxDataNoService() {
		// 查询datano最大值 点击刷新清屏后获取的数据 Integer maxdatano
		return iodm.queryMaxDataNo();
	}

	@Override
	public List<Map<String, Object>> queryIORecordListService(Map m) {
		// TODO Auto-generated method stub
		return iodm.queryIORecordList(m);
	}

	@Override
	public List<Map<String, Object>> getLastLeaveInfoService(Map m) {
		// TODO Auto-generated method stub
		return null;
	}


}
