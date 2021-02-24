package com.xr.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.dao.SpareParts_SDDataMapper;
import com.xr.dao.SpareParts_StockDataMapper;
import com.xr.entity.PageInfo;
import com.xr.entity.SparePartsData;
import com.xr.entity.SpareParts_SDData;
import com.xr.entity.SpareParts_StockData;
import com.xr.service.ISpareParts_SDDataService;
@Service
public class SpareParts_SDDataServiceImpl implements ISpareParts_SDDataService {

	@Autowired
	private SpareParts_SDDataMapper spm;
	@Autowired
	private SpareParts_StockDataMapper sm;


	@Override
	public int deleteByPrimaryKeyService(Integer datano) {
		// 删除数据
		return spm.deleteByPrimaryKey(datano);
	}

	@Override
	public int insertService(SpareParts_SDData record) {
		// 插入数据
		return spm.insertSelective(record);
	}

	@Override
	public SpareParts_SDData selectByPrimaryKeyService(Integer datano) {
		// 通过主键查询数据实体类
		return spm.selectByPrimaryKey(datano);
	}

	@Override@Transactional
	public Map<String,Object> updateByPrimaryKeySelectiveService(Integer datano,String delreason,String holderno) throws Exception {
		//更新数据
		Map<String,Object> map=new HashMap<String,Object>();
		SpareParts_SDData record=spm.selectByPrimaryKey(datano);
		SpareParts_StockData sd=new SpareParts_StockData();
		String itemcode=record.getItemcode();
		BigDecimal price=record.getPrice();
		BigDecimal quantity=record.getQuantity();
		Integer warecode=record.getWarecode();
		String status=record.getSdstatus();
		sd.setItemcode(itemcode);
		sd.setPrice(price);
		sd.setWarecode(warecode);
		SpareParts_StockData sp=sm.querySparePartsStockByItemCodeAndWareCodeAndPrice(sd);
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
		record.setDelperson(holderno);
		record.setDeldate(new Date());
		record.setDelreason(delreason);
		int i=spm.updateByPrimaryKeySelective(record);
		if(i>0 && i1>0){
			map.put("flag", true);
			map.put("reason", "红冲成功！");
			return map;
		}else{
			throw new Exception();
		}
	}

	

	@Override@Transactional
	public Map<String,Object> insertSparePartsSDDataBatchService(List<SpareParts_SDData> list) throws Exception {
		// 备品备件入库订单以及对应的物品  批量插入
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		int i1=0;
		int i2=0;
		for(int k=0;k<list.size();k++){
			i=spm.insertSelective(list.get(k));
			String itemcode=list.get(k).getItemcode();
			Integer warecode=list.get(k).getWarecode();
			BigDecimal price=list.get(k).getPrice();
			BigDecimal quantity=list.get(k).getQuantity();
			SpareParts_StockData sd=new SpareParts_StockData();
			sd.setItemcode(itemcode);
			sd.setWarecode(warecode);
			sd.setPrice(price);
			SpareParts_StockData psd=sm.querySparePartsStockByItemCodeAndWareCodeAndPrice(sd);
			if(psd!=null){//代表已存在
				psd.setStorage(psd.getStorage().add(quantity));
				psd.setSummoney(price.multiply(psd.getStorage().add(quantity)));
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
		//int i=spm.insertSparePartsSDDataBatch(list);
		if((i>0 && i1>0) || (i>0 && i2>0)){
			map.put("flag", true);
			map.put("reason", "入库成功！");
		}else{
			map.put("flag", false);
			map.put("reason", "入库失败！");
		} 
		return map;
	}//end
	
	@Override@Transactional
	public Map<String, Object> outSparePartsSDDataBatchService(List<SpareParts_SDData> list) throws Exception {
		// 出库
		Map<String,Object> map=new HashMap<String,Object>();
		int i=0;
		int i1=0;
		List<SpareParts_SDData> list1=new ArrayList<SpareParts_SDData>();
		for(int k=0;k<list.size();k++){
			i=spm.insertSelective(list.get(k));
			String itemcode=list.get(k).getItemcode();
			Integer warecode=list.get(k).getWarecode();
			BigDecimal price=list.get(k).getPrice();
			BigDecimal quantity=list.get(k).getQuantity();
			SpareParts_StockData sd=new SpareParts_StockData();
			sd.setItemcode(itemcode);
			sd.setWarecode(warecode);
			sd.setPrice(price);
			SpareParts_StockData psd=sm.querySparePartsStockByItemCodeAndWareCodeAndPrice(sd);
			if(psd!=null){
				BigDecimal storage=psd.getStorage();//库存量
				int t=storage.compareTo(quantity);
				if(t==-1){
					throw new Exception("出库失败，出库数量大于库存量了！");
				}
				psd.setStorage(storage.subtract(quantity));
				psd.setSummoney(price.multiply(psd.getStorage()));
				psd.setUpdatedate(new Date());
				psd.setUpdateperson(list.get(k).getOperator());
				i1=sm.updateByPrimaryKeySelective(psd);
				if(i1<=0){
				    throw new Exception();
				 }
			}else{
				list1.add(list.get(k));
			} 
		}
		//int i=spm.insertSparePartsSDDataBatch(list);
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
	public List<SpareParts_SDData> querySparePartsSDDataListByItemCodeService(String itemcode) {
		// 根据备品件条码 查询是否有出入库情况
		return spm.querySparePartsSDDataListByItemCode(itemcode);
	}

	
	@Override
	public List<Map<String,Object>> querySparePartsSDStockListByPageService(SparePartsData record,PageInfo pf) {
		//动态查询库存量
		PageHelper.startPage(pf.getPageIndex(), pf.getPageSize());
		List<Map<String,Object>> list=spm.querySparePartsSDStockListByPage(record);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pf.getPageSize()==0?total/pf.getPageSize():total/pf.getPageSize()+1);
		pf.setTotalPage(totalPage);
		pf.setSumCount((int) total);
		return list;
	}

	@Override
	public List<Map<String,Object>> querySparePartsSDStockByItemCodeAndWareCodeService(SpareParts_SDData record) {
		// 根据仓库和条码查库存量
		return spm.querySparePartsSDStockByItemCodeAndWareCode(record);
	}

	@Override
	public List<SpareParts_SDData> querySparePartsSDDataListByWareCodeService(SpareParts_SDData record) {
		// 根据仓库 或分区  查看出入库中是否有记录
		return spm.querySparePartsSDDataListByWareCode(record);
	}
	
	@Override
	public List<Map<String,Object>> querySparePartsSDDataListService(Map m) {
		// 查询备品备件出入库订单数据列表
		return spm.querySparePartsSDDataListByPage(m);
	}

	@Override
	public List<Map<String,Object>> querySparePartsSDDataListByPageService(Map m,PageInfo pageinfo) {
		// 根据角色下的部门 查仓库 再查仓库下的备品备件列表
		Map<String,Object> map=new HashMap<String,Object>();
		Integer pageIndex=pageinfo.getPageIndex();
		Integer pageSize=pageinfo.getPageSize();
		PageHelper.startPage(pageIndex, pageSize);
		List<Map<String,Object>> list=spm.querySparePartsSDDataListByPage(m);
		com.github.pagehelper.PageInfo<Map<String,Object>> p=new com.github.pagehelper.PageInfo<Map<String,Object>>(list);
		long total=p.getTotal();
		int totalPage=(int) (total%pageSize==0?total/pageSize:total/pageSize+1);
		pageinfo.setTotalPage(totalPage);
		pageinfo.setSumCount((int) total);
		return list;
	}

	
	
	
}
