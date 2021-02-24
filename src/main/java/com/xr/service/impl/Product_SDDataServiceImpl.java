package com.xr.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.ProductStockDataMapper;
import com.xr.dao.Product_SDDataMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.ProductData;
import com.xr.entity.ProductStockData;
import com.xr.entity.Product_SDData;
import com.xr.service.IProduct_SDDataService;
@Service
public class Product_SDDataServiceImpl implements IProduct_SDDataService {

	@Autowired
	private Product_SDDataMapper pm;
	@Autowired
	private ProductStockDataMapper sm;

	@Override
	public int deleteByPrimaryKeyService(Integer datano) {
		// 删除数据
		return pm.deleteByPrimaryKey(datano);
	}

	@Override
	public int insertService(Product_SDData record) {
		// 插入数据
		return pm.insertSelective(record);
	}

	@Override
	public Product_SDData selectByPrimaryKeyService(Integer datano) {
		//查询数据实体类
		return pm.selectByPrimaryKey(datano);
	}

	@Override@Transactional
	public Map<String,Object> updateByPrimaryKeySelectiveService(Integer datano,String delreason,String holderno) throws Exception {
		// 更新数据 数据作废
		Map<String,Object> map=new HashMap<String,Object>();
		Product_SDData record =pm.selectByPrimaryKey(datano);
		ProductStockData sd=new ProductStockData();
		String itemcode=record.getItemcode();
		BigDecimal price=record.getPrice();
		BigDecimal quantity=record.getQuantity();
		Integer warecode=record.getWarecode();
		String status=record.getSdstatus();
		sd.setItemcode(itemcode);
		sd.setPrice(price);
		sd.setWarecode(warecode);
		ProductStockData sp=sm.queryProductStockByItemCodeAndWareCodeAndPrice(sd);
		if(status.equals("11")){//入库回滚 执行减法操作
			BigDecimal storage=sp.getStorage();
			sp.setUpdatedate(new Date());
			sp.setUpdateperson(holderno);
			sp.setStorage(storage.subtract(quantity));
			sp.setSummoney(price.multiply(sp.getStorage()));
		}else if(status.equals("12")){//出库回滚   执行添加操作
			BigDecimal storage=sp.getStorage();
			sp.setUpdatedate(new Date());
			sp.setUpdateperson(holderno);
			sp.setStorage(storage.add(quantity));
			sp.setSummoney(price.multiply(sp.getStorage()));
		}
		int i1=sm.updateByPrimaryKeySelective(sp);
		record.setDelreason(delreason);
		record.setDelperson(holderno);
		record.setDeldate(new Date());
		record.setDeleted("0");
		int i=pm.updateByPrimaryKeySelective(record);
		if(i>0 && i1>0){
			map.put("flag", true);
			map.put("reason", "红冲成功！");
			return map;
		}else{
			throw new Exception();
		}
	}

	@Override
	public List<Map<String,Object>> queryProductSDDataListService(Map m) {
		// 查询成品出入库订单列表
		List<Map<String,Object>> list=pm.queryProductSDDataListByPage(m);
		return list;
	}

	@Override@Transactional
	public Map<String,Object> insertProductSDDataBatchService(List<Product_SDData> list) throws Exception {
		//成品入库订单以及对应的物品  批量插入
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		int i1=0;
		int i2=0;
		for(int k=0;k<list.size();k++){
			i=pm.insertSelective(list.get(k));
			String itemcode=list.get(k).getItemcode();
			Integer warecode=list.get(k).getWarecode();
			BigDecimal price=list.get(k).getPrice();
			BigDecimal quantity=list.get(k).getQuantity();
			ProductStockData sd=new ProductStockData();
			sd.setItemcode(itemcode);
			sd.setWarecode(warecode);
			sd.setPrice(price);
			ProductStockData psd=sm.queryProductStockByItemCodeAndWareCodeAndPrice(sd);
			if(psd!=null){//代表已存在
				psd.setStorage(psd.getStorage().add(quantity));
				psd.setSummoney(psd.getPrice().multiply(psd.getStorage()));
				psd.setUpdatedate(new Date());
				psd.setUpdateperson(list.get(k).getOperator());
				i1=sm.updateByPrimaryKeySelective(psd);//只需要更新数量和金额即可
				if(i1<=0){
				    throw new Exception();
				 }
			}else{//代表不存在 添加新数据
				sd.setItemcode(itemcode);
				sd.setStorage(quantity);
				sd.setSummoney(price.multiply(quantity));
				sd.setItemname(list.get(k).getItemname());
				sd.setWarename(list.get(k).getWarename());
				sd.setCreateperson(list.get(k).getOperator());
				i2=sm.insertSelective(sd);//添加库存
				if(i2<=0){
				    throw new Exception();
				 }
			}
		}
		//int i=pm.insertProductSDDataBatch(list);
		if((i>0 && i1>0) || (i>0 && i2>0)){
			map.put("flag", true);
			map.put("reason", "入库成功！");
		}else{
			map.put("flag", false);
			map.put("reason", "入库失败！");
		}
		return map;
	}
	
	
	@Override
	@Transactional
	public Map<String,Object> outProductSDDataBatchService(List<Product_SDData> list) throws Exception {
		//成品出库订单以及对应的物品  批量插入
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		int i1=0;
		for(int k=0;k<list.size();k++){
			 i=pm.insertSelective(list.get(k));
			String itemcode=list.get(k).getItemcode();
			Integer warecode=list.get(k).getWarecode();
			BigDecimal price=list.get(k).getPrice();
			BigDecimal quantity=list.get(k).getQuantity();
			ProductStockData sd=new ProductStockData();
			sd.setItemcode(itemcode);
			sd.setWarecode(warecode);
			sd.setPrice(price);
			ProductStockData psd=sm.queryProductStockByItemCodeAndWareCodeAndPrice(sd);
			if(psd!=null){
				BigDecimal storage=psd.getStorage();
				int t=storage.compareTo(quantity);
				if(t==-1){
					throw new Exception("出库失败，出库数量大于库存量了！");
				}
				psd.setStorage(storage.subtract(quantity));//减法
				psd.setSummoney(psd.getPrice().multiply(psd.getStorage()));//乘法求 总价格
				psd.setUpdatedate(new Date());
				psd.setUpdateperson(list.get(k).getOperator());
			    i1=sm.updateByPrimaryKeySelective(psd);
			    if(i1<=0){
			    	throw new Exception();
			    }
			} 
		}
		//int i=pm.insertProductSDDataBatch(list);
		if(i>0 && i1>0){
			map.put("flag", true);
			map.put("reason", "出库成功！");
		}else{
			map.put("flag", false);
			map.put("reason", "出库失败！");
		}
		return map;
	}

	@Override
	public List<Product_SDData> queryProductSDDataListByItemCodeService(String itemcode) {
		// 根据物品条码查看出入库中是否有记录
		return pm.queryProductSDDataListByItemCode(itemcode);
	}

	@Override
	public List<Map<String,Object>> queryProductSDStockListByPageService(ProductData record,PageInfo pageinfo) {
		// 查询动态库存量
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=pm.queryProductSDStockListByPage(record);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public List<Map<String,Object>> queryProductSDStockByItemCodeAndWareCodeService(ProductStockData record) {
		// 根据仓库和条码查库存量
		List<Map<String,Object>> map=pm.queryProductSDStockByItemCodeAndWareCode(record);
		return map;
	}

	@Override
	public List<Product_SDData> queryProductSDDataListByWareCodeService(Product_SDData record) {
		//  根据仓库或分区   查看出入库中是否有记录   执行删除仓库或分区时先查询记录是否存在
		return pm.queryProductSDDataListByWareCode(record);
	}

	@Override
	public List<Map<String,Object>> queryProductSDDataListByPageService(Map m,PageInfo pageinfo) {
		// 查询成品出入库订单列表
		PageHelper.startPage(pageinfo.getPageIndex(),pageinfo.getPageSize());
		List<Map<String,Object>> list=pm.queryProductSDDataListByPage(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setSumCount((int) total);
		pageinfo.setTotalPage(totalPage);
		return list;
	}

	@Override
	public List<Map<String, Object>> queryHolderListByDeptnoService(String departmentno) {
		// 根据部门查人员
		return pm.queryHolderListByDeptno(departmentno);
	}

	 
	
}
