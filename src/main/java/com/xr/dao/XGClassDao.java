package com.xr.dao;

import java.util.List;
import java.util.Map;

import com.xr.entity.XGClass;

import net.sf.json.JSONObject;

 /**
  * @ClassName XGClassDao
  * @Description 巡更班次处理的数据操作层
  * @Author csc
  * @Date 2019年12月13日 下午3:18:40
  */
public interface XGClassDao {
  
     //批量添加班次
	  Integer insertClassInfor(List<JSONObject> list);

     //根据班次主键删除班次信息
	  boolean deleteClassInfor(Integer classid);

     //编辑班次信息
	  boolean updateClass(List<Map<String, Object>> xgcla);
	
	  /**
	   * 查询所有线路班次	
	   * @return
	   */
	  List<XGClass> queryAllClass();
	
	 //根据实体类查询对应的班次信息	
      List<Map<String,Object>> queryXGClass(XGClass glass);
		 
}
