package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.xr.dao.KQ_ArrangeDataMapper;
import com.xr.entity.KQ_ArrangeData;
import com.xr.entity.KQ_ShiftData;
import com.xr.entity.KQ_ShiftSeek;
import com.xr.service.IKQ_ArrangeDataService;
import com.xr.util.GetSystemDate;

import net.sf.json.JSONObject;

/**
 * 排班的相关操作
 * @author csc
 *  业务实现层
 */
@Service
public class KQ_ArrangeDataServiceImpl implements IKQ_ArrangeDataService {

	@Autowired
	private KQ_ArrangeDataMapper adm;//引入排班的数据操作层
	

	 /**
     * 作用:通过部门编号来查询部门下的人员
     * 用于排班时通过部门选择人员
     * @param holderno
     * @param list
     */
	@Override
	public List<Map<String, Object>> queryDapartmentStaff(String holderno, List<JSONObject> list) {
		return adm.queryDapartmentStaff(holderno, list);
	}
    /**
     * 对于选中的人进行排班时
     * 进行批量查询,查询是否存在排班重复
     * @param list
     */
	@Override
	public List<Map<String, Object>> queryArrangeData(List<Map<String, Object>> list) {
		return adm.queryArrangeData(list);
	}//end
	/**
     * 对选中人员进行排班
     * 批量添加用于排班
     * @return
     */
	@Override
	public void insertArrangeData(List<Map<String, Object>> list) {
		 adm.insertArrangeData(list);
	}//end
   /**
     * 通过工号查询班次信息中的
     * (序号,班次名称,班次简称,颜色编号)
     *  用于排班中心
     * @param holderno
     */
	@Override
	public List<KQ_ShiftData> queryshiftdata(String holderno) {
		return adm.queryshiftdata(holderno);
	}//end
	/**
     * 通过当月(monthno)和班次编号(shiftno)
     * 查询班次是否在使用中
     */
	@Override
	public List<Map<String, Object>> checkUseArrange(Integer shiftno) {
		return adm.checkUseArrange(shiftno);
	}
	 /**
     *  查询人员的班次信息
     * 用于人员班次管理
     * @return
     */
	@Override
	public Map<String, Object> selectArrange(KQ_ShiftSeek seek) {
		 //定义一个map像前端返回数据
		Map<String, Object> map = new HashMap<>();
		//查询人员的班次信息
		 List<Map<String, Object>> arrgelist =	adm.selectArrange(seek);
		 String systime = GetSystemDate.getTodayByFormat("yyyy-M-d");//获取系统当前时间
		 
		  String temid=null;//临时存放id
		  
		  Map<String,Object> sondata= new HashMap<>();
		  
		  List<Map<String, Object>> child= new ArrayList<Map<String,Object>>();
		  
		  List<Map<String, Object>> data=new ArrayList<Map<String,Object>>();
		 for (int i = 0; i < arrgelist.size(); i++) {
			 String holderno =  (String) arrgelist.get(i).get("holderno");
			
			if(!holderno.equals(temid)){
				String holdername =  (String) arrgelist.get(i).get("holdername");
				 if(temid!=null)
				 {
						 sondata.put("child",child);
						 data.add(sondata);
						 sondata= new HashMap<>();
						 child= new ArrayList<Map<String,Object>>();
				 }
				   child.add(arrgelist.get(i));
				   sondata.put("holdername", holdername);
				   sondata.put("holderno", holderno);
			}else{
				child.add(arrgelist.get(i));
			}
			temid=holderno;
		}
		 if(child.size()!=0)
		 {
			 sondata.put("child",child);
			 data.add(sondata);
		 }
		    if(arrgelist.size()==0 || arrgelist==null){
		    	map.put("flag", false);
				map.put("reason", "暂时没有数据");
				map.put("systime", systime);
		    }else{
		    	map.put("flag", true);
				map.put("reason", "数据查询成功");
				map.put("systime", systime);
				map.put("result", data);
		    }
		return map;
	}
	
	@Override
	public List<Integer> selectOneArrange(KQ_ArrangeData arrange) {
		//  * 查询是否有重复的班次
		return adm.selectOneArrange(arrange);
	}


	/**
	  * 通过排班表实体类修改 用于人员的班次管理
	 */
	@Override
	public boolean updateArrange(KQ_ArrangeData arrange) {
		return adm.updateArrange(arrange);
	}//end
	
	@Override
	public boolean insertArrange(KQ_ArrangeData arrange) {
		 KQ_ShiftSeek seek = new KQ_ShiftSeek();
			
			seek.setHolderno(arrange.getHolderno());
			seek.setYearno(arrange.getYearno());
			seek.setMonthno(arrange.getMonthno());
			seek.setDay(arrange.getDay());
			
			adm.delArrange(seek);
		// 用于页面上显示成缺勤的人点击时是添加
		return adm.insertArrange(arrange);
	}

	 /**
     * 通过(工号,年,月)将已经排过班的信息删除.
     * 以便于人再次排班
     * @param seek
     */
	@Override
	public void delArrange(KQ_ShiftSeek seek) {
        adm.delArrange(seek);		
	}//end

	/**
	 * 通过区域查询查询门区
	 */
	@Override
	public List<Map<String, Object>> getDoorList() {
		return adm.getDoorList();
	}

	 //以下人员班次分配中的接口
	@Override
	public List<Map<String, Object>> selectDistributionShift(KQ_ShiftSeek seek) {
		//* 查询人员常用班次* 用于班次分配中的查询
		return adm.selectDistributionShift(seek);
	}
	@Override
	public List<Map<String, Object>> queryBatchHolderShift(List<Map<String, Object>> oftenShiftlist) {
		//  * 批量查询* 作用:给员工分配常用班次时,查询该员工是否已经分配相同的常用班次
		return adm.queryBatchHolderShift(oftenShiftlist);
	}
	
	@Override
	public void insertDistributionShift(List<Map<String, Object>> oftenShiftlist) {
		//  * 批量添加* 作用:给员工分配常用班次
		adm.insertDistributionShift(oftenShiftlist);
	}
	@Override
	public void deleteDistributionShift(List<Map<String, Object>> oftenshiftlist) {
		// 人员常用班次的批量删除 
		adm.deleteDistributionShift(oftenshiftlist);
	}
	@Override
	public List<Map<String, Object>> selectShiftno(String holderno) {
		//  * 通过工号查询员工经常上的班次
		return adm.selectShiftno(holderno);
	}
	@Override
	public List<Map<String, Object>> selectHolderNo(KQ_ShiftSeek seek) {
		//  * 参数(传入的参数)根据参数查询所被排版人员的工号* 用于分析没人每天所上的班
		return adm.selectHolderNo(seek);
	}
	@Override
	public boolean deleteOneShift(Integer shiftno, String holderno) {
		// * 删除单个人员的常用班次
		return adm.deleteOneShift(shiftno, holderno);
	}
	

	
}
