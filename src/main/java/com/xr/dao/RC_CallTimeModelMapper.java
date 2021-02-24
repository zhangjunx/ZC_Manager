package com.xr.dao;

import java.util.List;
import java.util.Map;

public interface RC_CallTimeModelMapper {

	List<Map<String, Object>> getTimeMoldelList(Map<String, Object> map);
	
	int getTimeMoldelListCount(Map<String, Object> map);

	Map<String, Object> getSumWithName(Map<String, Object> map);

	int addTimeMoldel(Map<String, Object> map);

	int editTimeMoldel(Map<String, Object> map);

	Map<String, Object> getOneTimeMoldelInfo(Map<String, Object> map);
	
	int delOneTimeMoldelInfo(Map<String, Object> map);

	List<Map<String, Object>> getTimeMoldelMemberList(Map<String, Object> map);

	int addTimeMoldelMember(Map<String, Object> map);

	int editTimeMoldelMember(Map<String, Object> map);

	Map<String, Object> getOneTimeMoldelMemberInfo(Map<String, Object> map);

	int delOneTimeMoldelMemberInfo(Map<String, Object> map);

}
