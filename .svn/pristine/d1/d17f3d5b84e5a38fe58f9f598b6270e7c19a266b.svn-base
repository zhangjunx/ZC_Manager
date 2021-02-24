package com.xr.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.entity.PageInfo;
import com.xr.entity.VisitorsInfo;

@Service
public interface IVisitorsInfoService {
	
	List<Map<String,Object>> queryVisitorsInfoListService(Map m);//访客登记记录查询列表
	List<Map<String,Object>> queryVisitorsInfoListByPageService(Map m,PageInfo pageinfo);//分页查询  访客登记记录查询列表
	List<Map<String,Object>> queryVisitorsInfoIORecordListService(Map m);//访客进出记录查询列表
	List<Map<String,Object>> queryVisitorsInfoIORecordListByPageService(Map m,PageInfo pageinfo);//分页查询  访客进出记录查询列表
	List<Map<String,Object>> queryVisitoredHolderByNameService(String str);//根据姓名查被访人员信息
	
	 List<Map<String,Object>> queryVisitorsInfoByIDCardNoService(Map m);//根据身份证号查访客
	 
	 List<Map<String,Object>> queryVisitorsInfoByHolderAndUnauditedService(Map m,PageInfo pageinfo);//根据登录人工号 查待审批的访客消息
	 List<Map<String,Object>> queryVisitorsInfoByHolderAndAuditedService(Map m,PageInfo pageinfo);//根据登录人工号 查已审批的所有的访客信息
	 
	 List<Map<String,Object>> queryVisitorsInfoByLoginHolderService(Map m,PageInfo pageinfo);//根据登录人工号 查待自己所有的访客信息
	 int updateVisitorsApplyStatusService(VisitorsInfo record,String holderno);//访客申请审批 同意或不同意
	 
	 int insertVisitorsInfoAndPhotoByWechat(MultipartFile photo,VisitorsInfo record) throws IOException;//添加访客和对应访客照片
	int insertVisitorsInfoAndPhotoService(MultipartFile file,VisitorsInfo record,String holderno) throws IOException;//添加访客 访客登记
	 
	 Map<String,Object> queryByPrimaryKeyService(Integer id);//查看访客详情
	 
	 Map<String, Object> queryVisitorsByNameAndPhoneService(Map m);//根据访客姓名和电话查是否已有历史信息
     List<Map<String,Object>> queryVisitorsListByNameAndPhoneService(Map m,PageInfo pageinfo);//根据访客姓名和电话查是否已有历史信息
     Map<String,Object> queryVisitorsInfoByOpenIdService(Map m);//根据openid查是否已有历史信息
     
     List<Map<String,Object>> getVDoorPermService(List<Short> list);//通过门区编号查名称  查询访客的可进门区列表
     Map<String,Object> getDoorArrByIdService(Map m);//根据id查doorarr
	Map<String, Object> getVisitorsIORecordService(Map<String, Object> m);//访客进出记录 详情查看
}
