package com.xr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xr.entity.IOData;
@Repository
public interface IODataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(IOData record);

    int insertSelective(IOData record);

    IOData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(IOData record);

    int updateByPrimaryKey(IOData record);
    
    List<Map<String,Object>> queryIOCurrRecordListByMaxDataNo(Integer datano);//查询实时监控进出记录  进出实时监控时 点击刷新清屏后获取的数据 Integer maxdatano
    Integer queryMaxDataNo();//查询datano最大值
    
    List<Map<String,Object>> queryIORecordList(Map m);//查询进出记录 List<IOData>
    
    List<Map<String,Object>> queryIOLastAreaList(Map deptnos);//根据部门分组 查询部门下人员 再查人员最后进出位置 
    List<Map<String,Object>> getLastLeaveInfo(Map m);////根据部门分组 查询部门最后出差请假人员 的位置 
    
    IOData queryIOLastAreaByDataNo(Integer datano);//实时定位时 点击某个人查看其最后位置 信息  Integer datano
    List<IOData> queryIORecordByHolder(Map m);//根据工号查个人进出记录 小程序
    
    List<IOData> queryIORecordByBigData();//查进出记录 大数据显示的
}