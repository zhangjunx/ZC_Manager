package com.xr.service.impl;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ZC_OutStoreMapper;
import com.xr.service.ZC_OutStoreService;

@Service
public class ZC_OutStoreServiceImpl implements ZC_OutStoreService {

	@Autowired
	private ZC_OutStoreMapper outStoreMapper;
	
	/**
	 * 获取单据号：
	 * XR+YYYY+MM+DD+10位时间戳
	 */
	public static String getBillNo(){
		String result = "";
		Calendar calendar = Calendar.getInstance(); 
		int y = calendar.get(Calendar.YEAR);
		int m = calendar.get(Calendar.MONTH)+1;
		int d = calendar.get(Calendar.DATE);
		String yy = y+"";
		String mm = m+"";
		String dd = d+"";
		if(mm.length() == 1){
			mm = "0"+mm;
		}
		if(dd.length() == 1){
			dd = "0"+dd;
		}
		//获取当前时间戳10位
		long tt = System.currentTimeMillis();
		
		result = "XR"+String.valueOf(yy)+String.valueOf(mm)+String.valueOf(dd)+String.valueOf(tt/1000);
		System.out.println(result);
		return result;
	}
	
	/**
	 * 扫描标签获取物品详细信息
	 */
	@Override
	public Map<String, Object> getOneInfoWIthRFID(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map<String,Object> result = outStoreMapper.getOneInfoWIthRFID(map);
		if(result != null){
			resultMap.put("flag", true);
			resultMap.put("result", result);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "库中不存在该物品！");
		}
		return resultMap;
	}
	
	/**
	 * 物品出库
	 */
	@Override
	public Map<String, Object> outStoreService(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		//1、生成出库单号
		String bill = getBillNo();
		map.put("bill", bill);
		//2、保存出库信息
		int b1 =  outStoreMapper.saveOutStoreInfo(map);
		//3、保存出库物品信息
		map.put("outStoreID", b1);
		int b2 =  outStoreMapper.saveOutStoreGoodsInfo(map);
		//4、删除库存物品
		int b3 = outStoreMapper.deleteGoosFromStore(map);
		//5、.获取打印列表
		Map<String,Object> result = printOutStoreList(map);
		resultMap.put("result", b2);
		resultMap.put("printList", result.get("result"));
		resultMap.put("flag",true);
		resultMap.put("reason", "出库成功！");
		return resultMap;
	}

	/**
	 * 出库记录
	 */
	@Override
	public Map<String, Object> getOutStoreList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = outStoreMapper.getOutStoreList(map);
		int count = outStoreMapper.getOutStoreListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count > 0){
			resultMap.put("flag",true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag",false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 出库物品记录
	 */
	@Override
	public Map<String, Object> getOutStoreGoodsList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = outStoreMapper.getOutStoreGoodsList(map);
		int count = outStoreMapper.getOutStoreGoodsListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count > 0){
			resultMap.put("flag",true);
			resultMap.put("reason", "出库成功！");
		}else{
			resultMap.put("flag",false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}
	
	/**
	 * 打印出库单据
	 */
	@Override
	public Map<String, Object> printOutStoreList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = outStoreMapper.printOutStoreList(map);
		resultMap.put("result", list);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功！");
		return resultMap;
	}

	/**
	 * 物品重新出库
	 */
	@Override
	public Map<String, Object> addReOutStore(Map<String, Object> map) {
		//1、当前出库单更新为作废状态
		//2、该单据下的物品重新保存到库存中
		//3、获取该单据的列表信息，返回到前台页面重新修改入库
		return null;
	}

	/**
	 * 出库审核
	 */
	@Override
	public Map<String, Object> updateApprovalStatus(Map<String, Object> map) {
		//1、更新出库审核状态
		return null;
	}

	public static void main(String[] args) {
		getBillNo();
	}

}
