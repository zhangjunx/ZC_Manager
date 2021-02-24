package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.ZX_HolderFile;

@Service
public interface IZX_HolderFileService {

	int updateByPrimaryKeySelectiveService(ZX_HolderFile record);

	ZX_HolderFile selectByPrimaryKeyService(String holderno);

	int insertSelectiveService(ZX_HolderFile record);

	int deleteByPrimaryKeyService(String holderno);

	List<Map<String, Object>> getHolderFileListService(Map<String, Object> m, PageInfo pageinfo);

	List<Map<String, Object>> getHolderFileListService(Map<String, Object> m);

}
