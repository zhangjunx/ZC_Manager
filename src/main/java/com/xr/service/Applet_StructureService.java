package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * 业务层
 * @author csc
 * 小程序结构表又称小程序菜单
 */
@Service
public interface Applet_StructureService {

	 /**
	   * 获取所有小程序菜单树形结构
	  */
	 List<Map<String, Object>> getAppletMenu(Boolean res);
	
}
