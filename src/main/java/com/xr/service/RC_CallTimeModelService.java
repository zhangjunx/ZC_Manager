package com.xr.service;

import java.util.Map;

public interface RC_CallTimeModelService {

	Map<String, Object> getTimeMoldelList(Map<String, Object> map);

	Map<String, Object> addTimeMoldel(Map<String, Object> map);

	Map<String, Object> getOneTimeMoldelInfo(Map<String, Object> map);

	Map<String, Object> delOneTimeMoldelInfo(Map<String, Object> map);

	Map<String, Object> getTimeMoldelMemberList(Map<String, Object> map);

}
