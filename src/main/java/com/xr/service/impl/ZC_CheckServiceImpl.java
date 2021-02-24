package com.xr.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.dao.ZC_CheckMapper;
import com.xr.service.ZC_CheckService;
import com.xr.util.ExcelUtil;

@Service
public class ZC_CheckServiceImpl implements ZC_CheckService {
	
	@Autowired
	private ZC_CheckMapper chenkMapper;

	/**
	 * excel表格导入
	 * @throws ParseException 
	 */
	@Override
	public Map<String, Object> insertCheckRecord(Map<String, Object> map,MultipartFile file) throws ParseException {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<String[]> list = ExcelUtil.queryExcel(file);
		List<String> RFIDList = new ArrayList<String>();
		for(int i=0;i<list.size();i++){
			RFIDList.add((list.get(i)[1]).replace(" ", ""));
		}
		//1、删除当天记录
		int b0 = chenkMapper.deleteCheckRecord(map);
		//2、保存盘点记录
		int b1 = chenkMapper.insertCheckRecord(map);
		//3、保存盘点物品记录
		map.put("RFIDList", RFIDList);
		map.put("checkID", b1);
		int b2 = chenkMapper.insertCheckRecordGoods(map);
		//4、记录当前时间点的库存物品
		int b3 = chenkMapper.insertCheckRecordGoodsStore(map);
		resultMap.put("flag", true);
		resultMap.put("result", 1);
		resultMap.put("reason", "数据导入成功！");
		return resultMap;
	}

	/**
	 * 物品盘点比对统计
	 * 返回异常结果
	 * map参数：
	 * 盘点日期：checkDate
	 * 盘点仓库：checkStore
	 */
	@Override
	public Map<String, Object> getCheckResult(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> waringList = new ArrayList<Map<String,Object>>();
		//1、获取盘点信息
		Map<String,Object> checkInfo = chenkMapper.getCheckInfo(map);
		if(checkInfo == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "暂无盘点记录！");
			return resultMap;
		}
		
		//2、获取库存中的物品
		map.put("checkID", checkInfo.get("fid"));
		List<Map<String,Object>> storeGoodsList = chenkMapper.getCheckStoreGoodsList(map);
		//3、获取库存盘点得到的标签列表
		List<Map<String,Object>> checkGoodsList = chenkMapper.getCheckGoodsList(map);
		
		//4、库存缺失，系统有，盘点无
		a:for(int i = 0;i<storeGoodsList.size();i++){
			String labelCode = storeGoodsList.get(i).get("labelCode").toString();
			for(int j=0;j<checkGoodsList.size();j++){
				String labelCode2 = checkGoodsList.get(j).get("labelCode").toString();
				if(labelCode.equals(labelCode2)){
					continue a;
				}else{
					if(j == checkGoodsList.size() - 1){
						Map<String,Object> oneInfo = storeGoodsList.get(i);
						oneInfo.put("checkResult", "库存缺失！");
						waringList.add(oneInfo);
					}
				}
			}
		}
		
		//5、库存多出，系统无，盘点有
		a:for(int i = 0;i<checkGoodsList.size();i++){
			String labelCode = checkGoodsList.get(i).get("labelCode").toString();
			for(int j=0;j<storeGoodsList.size();j++){
				String labelCode2 = storeGoodsList.get(j).get("labelCode").toString();
				if(labelCode.equals(labelCode2)){
					continue a;
				}else{
					if(j == storeGoodsList.size() - 1){
						Map<String,Object> oneInfo = checkGoodsList.get(i);
						oneInfo.put("checkResult", "库存多出！");
						waringList.add(oneInfo);
					}
				}
			}
		}
		
		if(waringList.size() == 0){
			resultMap.put("flag", true);
			resultMap.put("result", waringList);
			resultMap.put("reason", "库存无异常！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", waringList);
			resultMap.put("reason", "库存异常！");
		}
		return resultMap;
	}

}
