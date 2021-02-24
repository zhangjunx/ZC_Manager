package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.Applet_StructureDao;
import com.xr.service.Applet_StructureService;
import com.xr.util.TreeToolUtils;

/**
 * 业务实现层
 * @author csc
 * 小程序结构又称小程序菜单
 */
@Service
public class Applet_StructureServiceImpl implements Applet_StructureService {

	 @Autowired
	 private Applet_StructureDao structuredao;//引入数据操作层

	 
	@Override
	public List<Map<String, Object>> getAppletMenu(Boolean res) {
		//*获取所有小程序菜单的树形结构
		List<Map<String, Object>> list=structuredao.getAppletMenu();
		List<Map<String, Object>> treeList=new ArrayList<Map<String,Object>>();
		TreeToolUtils u=new TreeToolUtils();
		treeList=u.menuList(list, res);
		return treeList;
	}//end
	 
	 
	 
	 
	
}
