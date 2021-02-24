package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entity.PageInfo;
import com.xr.entity.ZX_HolderTransfer;

@Service
public interface IZX_HolderTransferService {

	ZX_HolderTransfer selectByPrimaryKeyService(Integer id);

	int insertSelectiveService(ZX_HolderTransfer record);

	int deleteByPrimaryKeyService(Integer id);

	int updateByPrimaryKeySelectiveService(ZX_HolderTransfer record);

	List<Map<String, Object>> getHolderTransferListService(Map<String, Object> m);

	List<Map<String, Object>> getHolderTransferListService(Map<String, Object> m, PageInfo pageinfo);

}
