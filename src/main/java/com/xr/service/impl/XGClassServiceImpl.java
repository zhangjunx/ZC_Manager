package com.xr.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.XGClassDao;
import com.xr.entity.XGClass;
import com.xr.service.XGClassService;

import net.sf.json.JSONObject;

/**
 * @ClassName XGClassServiceImpl
 * @Description 巡更班次的业务实现层
 * @Author csc
 * @Date 2019年12月13日 下午3:19:15
 */
@Service
public class XGClassServiceImpl implements XGClassService {

	@Autowired
	private XGClassDao classDao;
	
	
	@Override
	public Integer insertClassInfor(List<JSONObject> list) {
		// TODO Auto-generated method stub
		return classDao.insertClassInfor(list);
	}

	@Override
	public boolean deleteClassInfor(Integer classid) {
		// TODO Auto-generated method stub
		return classDao.deleteClassInfor(classid);
	}

	@Override
	public boolean updateClass(List<Map<String, Object>> xgcla) {
		// 编辑班次信息
		return classDao.updateClass(xgcla);
	}

	 
	@Override
	public List<XGClass> queryAllClass() {
		//查询所有班次
		return classDao.queryAllClass();
	}
	
	//根据实体类查询对应的班次信息	
	@Override
	public List<Map<String, Object>> queryXGClass(XGClass glass) {
		return classDao.queryXGClass(glass);
	}

	
	
	
}
