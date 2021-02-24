package com.xr.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.xr.entity.IOData;
import com.xr.entity.PageInfo;

/**
 * 打卡记录的相关方法
 * @author csc
 * 业务层接口
 */
@Service
public interface IIODataService {
	
	 int insert(IOData record);
	 int insertSelective(IOData record);
	
	 Map<String,Object> queryIOCurrRecordListByMaxDataNoService(HttpServletRequest request,HttpSession session);//进出实时监控时 获取的数据 Integer maxdatano
	 Integer queryMaxDataNoService();//查询datano最大值 点击刷新清屏后获取的数据 Integer maxdatano
	 
	 List<Map<String,Object>> queryIORecordListService(Map m);//分页查询进出记录
	 List<Map<String,Object>> queryIORecordListByPageService(Map m,PageInfo pageinfo);//分页查询进出记录
	 
	 Map<String,Object> queryIOLastAreaListService(HttpServletRequest request,String str);//根据部门分组 查询部门下人员 再查人员最后进出位置
	 List<Map<String,Object>> getLastLeaveInfoService(Map m);////根据部门分组 查询部门最后出差请假人员 的位置
	 
	 IOData queryIOLastAreaByDataNoService(Integer datano);//实时定位时 点击某个人查看其最后位置 信息  Integer datano
	 List<IOData> queryIORecordByHolderService(Map m);//根据工号查个人进出记录 小程序
	 
	 
	 
}
