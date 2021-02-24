package com.xr.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.xr.entity.LPR_Vehicle;
import com.xr.entity.PageInfo;

/**
 * @ClassName ILPR_VehicleService
 * @Description 车辆信息管理的业务层
 * @Author csc
 * @Date 2019年12月11日 下午6:24:51
 */
@Service
public interface ILPR_VehicleService {

	LPR_Vehicle queryByPrimaryKeyService(Integer id);//根据id查询单条数据
	
	List<LPR_Vehicle> queryVehicleByWheresByPageService(LPR_Vehicle record,PageInfo pageinfo);//根据条件查询所有的信息
	
	/**
	 * 根据条件查询车辆信息
	 * @param record
	 */
	List<LPR_Vehicle> queryVehicleByWheresService(LPR_Vehicle record);//根据条件查询所有的信息
	
	/**
	 * 模糊查询
	 * 根据条件查询相关员工的信息
	 * 查询(姓名,工号,部门编号,部门名称)
	 * @param can
	 */
	List<Map<String,Object>> queryVehicleByWhereService(String can);
	
	int deleteByPrimaryKeysService(Integer[] ids);//根据主键批量删除

	int deleteByPrimaryKeyService(Integer id);//根据主键删除单条数据
	
    int insertSelectiveService(LPR_Vehicle record);//动态插入车辆信息
    
    int updateByPrimaryKeySelectiveService(LPR_Vehicle record);//修改车辆信息
    
    int updateVehicleStatusService(LPR_Vehicle record);//修改进出状态
    /**
      * 查询车辆照片
      * @param id
      */
    LPR_Vehicle queryVehiclePhotoService(Integer id);
    
    /**
     * 根据车牌号和车卡内码查询是否重复,用于新增车辆信息
     * @return
     */
   String queryVehicleCheck(String strPlateID,String strCode);
   
   /**
    * 通过工号查询部门编号,用户车辆管理的excel的批量导入
    */
   String querydeptno(String holderno);
   /**
    * 批量添加车辆信息,暂时只用于Excel批量导入
    */
   void insertBatchVehicle(List<Map<String, Object>> data);  
}
