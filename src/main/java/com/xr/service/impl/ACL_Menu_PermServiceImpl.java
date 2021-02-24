package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ACL_Menu_PermMapper;
import com.xr.service.IACL_Menu_PermService;
import com.xr.util.TreeToolUtils;
@Service
public class ACL_Menu_PermServiceImpl implements IACL_Menu_PermService {

	@Autowired
	private ACL_Menu_PermMapper mpm;
	@Override
	public List<Map<String, Object>> getMenuPermTree() {
		//  菜单功能一体树形接口
		List<Map<String,Object>> list=mpm.getMenuPermTree();
		List<Map<String,Object>> treelist=new ArrayList<Map<String,Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treelist=tree.menuList(list, true);
		return treelist;
	}

}
