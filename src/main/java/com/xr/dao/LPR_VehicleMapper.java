package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.xr.entity.LPR_Vehicle;
import com.xr.entity.PageInfo;
/**
 * @ClassName LPR_VehicleMapper
 * @Description 车辆信息的数据操作层
 * @Author csc
 * @Date 2019年12月10日 上午9:21:24
 */
@Repository
public interface LPR_VehicleMapper {
	
	/**
	 * 分页查询车辆信息
	 * @param pageinfo
	 */
	List<LPR_Vehicle> queryVehicleByPage(PageInfo pageinfo);
	/**
	 * 根据条件查询车辆信息
	 * @param record
	 */
	List<LPR_Vehicle> queryVehicleByWheres(LPR_Vehicle record);
     /**
      * 根据id单条数据用于修改
      * @param id
      */
	LPR_Vehicle queryByPrimaryKey(Integer id);
	/**
	 * 模糊查询
	 * 根据条件查询相关员工的信息
	 * 查询(姓名,工号,部门编号,部门名称)
	 * @param can
	 */
	List<Map<String,Object>> queryVehicleByWhere(String can);
	
	/**
	 * 根据主键批量删除
	 * @param ids
	 */
    int deleteByPrimaryKeys(Integer[] ids);//根据主键批量删除
     /**
      * 根据主键删除单条数据
      * @param id
      */
    int deleteByPrimaryKey(Integer id);
     /**
      * 动态插入车辆信息(新增车辆)
      * @param record
      */
    int insertSelective(LPR_Vehicle record);
    /**
     * 修改车辆信息
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(LPR_Vehicle record);//修改车辆信息
    /**
     * 修改车辆进出状态
     * @param record
     */
    int updateVehicleStatus(LPR_Vehicle record);
    /**
     * 根据id查询车辆照片
     * @param id
     */
    LPR_Vehicle queryVehiclePhoto(Integer id);
     /**
      * 根据车牌号和车牌内码查询是否重复,用于新增车辆信息
      * @return
      */
    String queryVehicleCheck(@Param("strPlateID")String strPlateID,@Param("strCode")String strCode);
    
    /**
     * 通过工号查询部门编号,用户车辆管理的excel的批量导入
     */
    String querydeptno(String holderno);
    /**
     * 批量添加车辆信息,暂时只用于Excel批量导入
     */
    void insertBatchVehicle(List<Map<String, Object>> data);    
    
}