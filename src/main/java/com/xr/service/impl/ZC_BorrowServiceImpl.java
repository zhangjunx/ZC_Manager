package com.xr.service.impl;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ZC_BorrowMapper;
import com.xr.service.ZC_BorrowService;

@Service
public class ZC_BorrowServiceImpl implements ZC_BorrowService {

	@Autowired
	private ZC_BorrowMapper borrowMapper;
	
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
	 * 查询借用单据
	 */
	@Override
	public Map<String, Object> getBorrowedBillList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = borrowMapper.getBorrowedBillList(map);
		int count = borrowMapper.getBorrowedBillListCount(map);
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
	 * 获取借出物品列表
	 */
	@Override
	public Map<String, Object> getBorrowedList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = borrowMapper.getBorrowedList(map);
		int count = borrowMapper.getBorrowedListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据获取成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 物品借出
	 */
	@Override
	public Map<String, Object> updateBorrowInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("labelCode") == null){
			resultMap.put("flag", false);
			resultMap.put("reason", "标签不能为空！");
		}
		//更新库存状态为借出状态
		map.put("storeStatus", 2);
		int b1 = borrowMapper.updateStoreGoodsStatus(map);
		//2、添加借出记录
		map.put("bill", getBillNo());
		int b2 = borrowMapper.insertBorrowRecord(map);
		//3、添加借出记录物品
		map.put("borrowID", b2);
		int b3 = borrowMapper.insertBorrowRecordGoods(map);
		resultMap.put("flag", true);
		resultMap.put("result", 1);
		resultMap.put("reason", "借出成功！");
		return resultMap;
	}

	/**
	 * 物品正常归还
	 */
	@Override
	public Map<String, Object> updatereturnInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("labelCode") == null){
			resultMap.put("flag", false);
			resultMap.put("reason", "标签不能为空！");
		}
		//1、更新库存物品状态
		map.put("storeStatus", 1);//更新库存状态为已归还
		int b1 = borrowMapper.updateStoreGoodsStatus(map);
		//2、更新借出记录物品状态及归还类别（正常/非正常）
		map.put("borrowStatus", 2);//更新借出记录状态为已归还
		int b2 = borrowMapper.updateBorrowGoodsStatus(map);
		resultMap.put("flag", true);
		resultMap.put("result", 1);
		resultMap.put("reason", "借出成功！");
		return resultMap;
	}
	
	/**
	 * 非正常归还
	 */
	@Override
	public Map<String, Object> updatereturnInfo2(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("oldLabelCode") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "oldLabelCode标签不能为空！");
			return resultMap;
		}
		if(map.get("newLabelCode") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "newLabelCode标签不能为空！");
			return resultMap;
		}
		
		Map<String,Object> checkInfo = borrowMapper.getSumWithLabelCode(map);
		if(checkInfo != null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "新标签已经存在！");
			return resultMap;
		}
		//1、更新借出记录物品信息
		map.put("borrowStatus", 2);//更新借出记录状态为已归还
		map.put("returnType", 2);//非正常归还
		int b2 = borrowMapper.updateBorrowGoodsStatus2(map);
		//2、更新库存标签编码及状态
		int b3 = borrowMapper.updateBorrowGoodsLabel(map);
		//3、添加物品标签更换记录
		int b4 = borrowMapper.insertLabelChangeRecord(map); 
		resultMap.put("flag", true);
		resultMap.put("result", 1);
		resultMap.put("reason", "归还成功！");
		return resultMap;
	}

}
