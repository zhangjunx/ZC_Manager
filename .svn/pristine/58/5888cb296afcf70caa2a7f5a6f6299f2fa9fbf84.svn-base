package com.xr.service;

import java.util.List;
import java.util.Map;

import com.xr.entity.XGClass;

import net.sf.json.JSONObject;

//巡更班次管理业务操作
public interface XGClassService {

	    /**
	     * 批量添加班次
	     * @param list
	     */
      Integer insertClassInfor(List<JSONObject> list);
    
 
      /**
       * 根据班次主键删除班次信息
       * @param classid
       */
      boolean deleteClassInfor(Integer classid);
    

      /**
       * 编辑班次信息
       * @param xgcla
       */
      boolean updateClass(List<Map<String, Object>> xgcla);

     
     /**
      * 查询所有班次	
      * @return
      */
      List<XGClass> queryAllClass();

     
     /**
      * 根据实体类查询对应的班次信息	
      * @param glass
      */
      List<Map<String,Object>> queryXGClass(XGClass glass);

	
	
	
}
