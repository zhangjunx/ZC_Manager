package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.MaterialDataMapper;
import com.xr.entity.MaterialData;
import com.xr.entity.PageInfo;
import com.xr.service.IMaterialDataService;
/**
 * @ClassName MaterialDataServiceImpl
 * @Description 原材料基本信息表的业务实现层
 * @Author csc
 * @Date 2019年12月24日 下午7:34:07
 */
@Service
public class MaterialDataServiceImpl implements IMaterialDataService {

	@Autowired
	private MaterialDataMapper mdm;

	@Override
	public int deleteByPrimaryKeyService(String itemcode) {
		// 删除数据
		return mdm.deleteByPrimaryKey(itemcode);
	}

	@Override
	public int insertService(MaterialData record) {
		// 添加数据
		return mdm.insert(record);
	}

	@Override
	public MaterialData selectByPrimaryKeyService(String itemcode) {
		// 通过主键查询数据
		return mdm.selectByPrimaryKey(itemcode);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(MaterialData record) {
		// 更新数据
		return mdm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String,Object>> getMaterialListByPageService(Map m,PageInfo pageinfo) {
		//查询列表
		 PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		 List<Map<String,Object>>  list=mdm.getMaterialList(m);
		 com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		 long total=p.getTotal();
		 int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		 pageinfo.setTotalPage(totalPage);
		 pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public List<Map<String,Object>> getMaterialListService(Map m) {
		//查询列表
		return mdm.getMaterialList(m);
	}
	
	@Override
	public int deleteBatchService(List<String> list) {
		// 批量删除
		return mdm.deleteBatch(list);
	}

	@Override
	public String queryRepeatItemcode(String itemcode) {
		//  * 通过原材料的编码查询编码是否存在* 用于Excel导入时的验证
		return mdm.queryRepeatItemcode(itemcode);
	}

	@Override
	public void insertExcelMaterial(List<Map<String, Object>> list) {
		mdm.insertExcelMaterial(list);
	}
	
}
