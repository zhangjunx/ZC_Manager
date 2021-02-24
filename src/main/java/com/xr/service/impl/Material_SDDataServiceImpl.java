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
import com.xr.dao.MaterialStockDataMapper;
import com.xr.dao.Material_SDDataMapper;
import com.xr.entity.MaterialData;
import com.xr.entity.MaterialStockData;
import com.xr.entity.Material_SDData;
import com.xr.entity.PageInfo;
import com.xr.service.IMaterial_SDDataService;
@Service
public class Material_SDDataServiceImpl implements IMaterial_SDDataService {

	@Autowired
	private Material_SDDataMapper mm;
	@Autowired
	private MaterialStockDataMapper sm;

	@Override
	public int deleteByPrimaryKeyService(Integer datano) {
		// 删除数据
		return mm.deleteByPrimaryKey(datano);
	}

	@Override
	public int insertService(Material_SDData record) {
		//插入数据
		return mm.insertSelective(record);
	}

	@Override
	public Material_SDData selectByPrimaryKeyService(Integer datano) {
		//通过主键查询
		return mm.selectByPrimaryKey(datano);
	}

	@Override@Transactional
	public Map<String,Object> updateByPrimaryKeySelectiveService(Integer datano,String delreason,String holderno) throws Exception {
		// 更新数据
		Map<String,Object> map=new HashMap<String,Object>();
		Material_SDData record=mm.selectByPrimaryKey(datano);
		MaterialStockData sd=new MaterialStockData();
		String itemcode=record.getItemcode();
		BigDecimal price=record.getPrice();
		BigDecimal quantity=record.getQuantity();
		Integer warecode=record.getWarecode();
		String status=record.getSdstatus();
		sd.setItemcode(itemcode);
		sd.setPrice(price);
		sd.setWarecode(warecode);
		MaterialStockData sp=sm.queryMaterialStockByItemCodeAndWareCodeAndPrice(sd);
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
		record.setDeleted("0");
		record.setDeldate(new Date());
		record.setDelperson(holderno);
		record.setDelreason(delreason);
		int i=mm.updateByPrimaryKeySelective(record);
		if(i>0 && i1>0){
			map.put("flag", true);
			map.put("reason", "红冲成功！");
			return map;
		}else{
			throw new Exception();
		}
	}

	@Override
	public List<Map<String,Object>> queryMaterialSDDataListService(Map m) {
		// 查询数据列表 查所有列表 不分页
		List<Map<String,Object>> list=mm.queryMaterialSDDataListByPage(m);
		return list;
	}

	@Override@Transactional
	public Map<String,Object> insertMaterialSDDataBatchService(List<Material_SDData> list) throws Exception {
		// 批量添加订单以及对应的原材料   批量添加
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		int i1=0;
		int i2=0;
		for(int k=0;k<list.size();k++){
			i=mm.insertSelective(list.get(k));
			String itemcode=list.get(k).getItemcode();
			Integer warecode=list.get(k).getWarecode();
			BigDecimal price=list.get(k).getPrice();
			BigDecimal quantity=list.get(k).getQuantity();
			MaterialStockData sd=new MaterialStockData();
			sd.setItemcode(itemcode);
			sd.setWarecode(warecode);
			sd.setPrice(price);
			MaterialStockData psd=sm.queryMaterialStockByItemCodeAndWareCodeAndPrice(sd);
			if(psd!=null){//代表已存在
				psd.setStorage(psd.getStorage().add(quantity));
				psd.setSummoney(price.multiply(psd.getStorage()));
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
		//int i=mm.insertMaterialSDDataBatch(list);
		if((i>0 && i1>0) || (i>0 && i2>0)){
			map.put("flag", true);
			map.put("reason", "入库成功！");
		}else{
			map.put("flag", false);
			map.put("reason", "入库失败！");
		}
		return map;
	}
	
	@Override@Transactional
	public Map<String,Object> outMaterialSDDataBatchService(List<Material_SDData> list) throws Exception {
		// 出库 批量添加订单以及对应的原材料   批量添加
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		int i1=0;
		for(int k=0;k<list.size();k++){
			i=mm.insertSelective(list.get(k));
			String itemcode=list.get(k).getItemcode();
			Integer warecode=list.get(k).getWarecode();
			BigDecimal price=list.get(k).getPrice();
			BigDecimal quantity=list.get(k).getQuantity();
			MaterialStockData ms=new MaterialStockData();
			ms.setItemcode(itemcode);
			ms.setWarecode(warecode);
			ms.setPrice(price);
			MaterialStockData msd=sm.queryMaterialStockByItemCodeAndWareCodeAndPrice(ms);
			if(msd!=null){
				BigDecimal storage=msd.getStorage();//库存量
				int t=storage.compareTo(quantity);
				if(t==-1){
					throw new Exception("出库失败，出库数量大于库存量了！");
				}
				msd.setStorage(storage.subtract(quantity));
				msd.setSummoney(msd.getPrice().multiply(msd.getStorage()));
				msd.setUpdatedate(new Date());
				msd.setUpdateperson(list.get(k).getOperator());
				i1=sm.updateByPrimaryKeySelective(msd);
				if(i1<=0){
				    throw new Exception();
				 }
			}
		}
		//int i=mm.insertMaterialSDDataBatch(list);
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
	public List<Material_SDData> queryMaterialSDDataListByItemCodeService(String itemcode) {
	     //根据物品条码查询是否有出入库记录
		return mm.queryMaterialSDDataListByItemCode(itemcode);
	}

	@Override
	public List<Map<String,Object>> queryMaterialSDStockListByPageService(MaterialData record,PageInfo pageinfo) {
		//查询动态库存量b
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=mm.queryMaterialSDStockListByPage(record);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	@Override
	public List<Map<String,Object>>  queryMaterialSDStockByItemCodeAndWareCodeService(Material_SDData record) {
		// 根据仓库和条码查库存量
		return mm.queryMaterialSDStockByItemCodeAndWareCode(record);
	}

	@Override
	public List<Material_SDData> queryMaterialSDDataListByWareCodeService(Material_SDData record) {
		// 根据仓库或分区  查询是否有出入库记录 删除仓库或分区时先执行查询记录操作
		return mm.queryMaterialSDDataListByWareCode(record);
	}

	@Override
	public List<Map<String,Object>> queryMaterialSDDataListByPageService(Map m,PageInfo pageinfo) {
		//查询原材料列表
		PageHelper.startPage(pageinfo.getPageIndex(), pageinfo.getPageSize());
		List<Map<String,Object>> list=mm.queryMaterialSDDataListByPage(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageinfo.getPageSize()==0?total/pageinfo.getPageSize():total/pageinfo.getPageSize()+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}
	
}
