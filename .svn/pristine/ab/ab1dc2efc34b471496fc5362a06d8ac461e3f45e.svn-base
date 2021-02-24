package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.LPR_VehicleMapper;
import com.xr.entity.LPR_Vehicle;
import com.xr.entity.PageInfo;
import com.xr.service.ILPR_VehicleService;

/**
 * @ClassName LPR_VehicleServiceImpl
 * @Description 车辆信息的业务实现层
 * @Author csc
 * @Date 2019年12月10日 上午10:34:32
 */
@Service
public class LPR_VehicleServiceImpl implements ILPR_VehicleService {

	@Autowired
	private LPR_VehicleMapper vm;
	
	 
	@Override
	public List<LPR_Vehicle> queryVehicleByWheresByPageService(LPR_Vehicle record,PageInfo pageinfo) {
		//查询车辆信息
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<LPR_Vehicle> list=vm.queryVehicleByWheres(record);
		com.github.pagehelper.PageInfo<LPR_Vehicle> p=new com.github.pagehelper.PageInfo<LPR_Vehicle>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():(total/pageinfo.getPageSize()+1));
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}//end
	 

	@Override
	public List<LPR_Vehicle> queryVehicleByWheresService(LPR_Vehicle record) {
		// 查询车辆信息
		return vm.queryVehicleByWheres(record);
	}
	
	 
	@Override
	public List<Map<String,Object>> queryVehicleByWhereService(String can) {
		//根据条件查询个别的信息
		return vm.queryVehicleByWhere(can);
	}
	 
	@Override
	public LPR_Vehicle queryByPrimaryKeyService(Integer id) {
		//根据id查询单条数据
		return vm.queryByPrimaryKey(id);
	}
	
 
	@Override
	public int deleteByPrimaryKeysService(Integer[] id) {
		// 根据id批量删除车辆信息
		return vm.deleteByPrimaryKeys(id);
	}
 
	@Override
	public int deleteByPrimaryKeyService(Integer id) {
		//根据id删除
		return vm.deleteByPrimaryKey(id);
	}

	
	@Override
	public int insertSelectiveService(LPR_Vehicle record) {
		// 动态插入车辆信息
		return vm.insertSelective(record);
	}

	 
	@Override
	public int updateByPrimaryKeySelectiveService(LPR_Vehicle record) {
		// 修改车辆信息
		return vm.updateByPrimaryKeySelective(record);
	}

	 
	@Override
	public int updateVehicleStatusService(LPR_Vehicle record) {
		// 修改车辆进出状态
		return vm.updateVehicleStatus(record);
	}


	@Override
	public LPR_Vehicle queryVehiclePhotoService(Integer id) {
		// 查询车辆照片
		return vm.queryVehiclePhoto(id);
	}//end


	@Override
	public String queryVehicleCheck(String strPlateID, String strCode) {
		//根据车牌号和车卡内码查询是否重复,用于新增车辆信息
		return vm.queryVehicleCheck(strPlateID, strCode);
	}//end


	@Override
	public String querydeptno(String holderno) {
		// 通过工号查询部门编号,用户车辆管理的excel的批量导入
		return vm.querydeptno(holderno);
	}//end


	@Override
	public void insertBatchVehicle(List<Map<String, Object>> data) {
		// 批量添加车辆信息,暂时只用于Excel批量导入
		vm.insertBatchVehicle(data);
	}//end

 
	
}
