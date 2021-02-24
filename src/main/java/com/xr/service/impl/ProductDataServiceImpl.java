package com.xr.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ProductDataMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.ProductData;
import com.xr.service.IProductDataService;

/**
 * @ClassName ProductDataServiceImpl
 * @Description 成品库基本资料表的业务实现层
 * @Author csc
 * @Date 2019年12月24日 下午8:32:09
 */
@Service
public class ProductDataServiceImpl implements IProductDataService {

	@Autowired
	private ProductDataMapper pdm;

	@Override
	public int deleteByPrimaryKeyService(String productcode) {
		// 删除数据
		return pdm.deleteByPrimaryKey(productcode);
	}

	@Override
	public int insertService(ProductData record) {
		// 插入数据
		return pdm.insert(record);
	}

	@Override
	public ProductData selectByPrimaryKeyService(String productcode) {
		// 通过主键插叙数据
		return pdm.selectByPrimaryKey(productcode);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ProductData record) {
		// 更新数据
		return pdm.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<Map<String,Object>> getProductListByPageService(Map m,PageInfo pageinfo) {
		// 查询成品信息列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=pdm.getProductList(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}
	@Override
	public List<Map<String,Object>> getProductListService(Map m) {
		// 查询成品信息列表
		return pdm.getProductList(m);
	}

	@Override
	public int deleteBatchService(List<String> list) {
		// 批量删除
		return pdm.deleteBatch(list);
	}

	/*@Override
	public int updateProductDataBatchService(List<ProductData> list) {
		// 批量修改  物理删除
		return pdm.updateProductDataBatch(list);
	}*/

	@Override
	public String queryRepeatItemcode(String itemcode) {
		// 通过成品库的编码,查询编码是否存在* 用于Excel导入时的验证
		return pdm.queryRepeatItemcode(itemcode);
	}

	@Override
	public void insertExcelProduct(List<Map<String, Object>> list) {
      pdm.insertExcelProduct(list);
	}
	
}
