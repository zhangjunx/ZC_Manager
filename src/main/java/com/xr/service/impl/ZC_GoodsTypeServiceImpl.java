package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.dao.ZC_GoodsMapper;
import com.xr.dao.ZC_GoodsTypeMapper;
import com.xr.service.ZC_GoodsTypeService;
import com.xr.util.TreeToolUtils;

@Service
public class ZC_GoodsTypeServiceImpl implements ZC_GoodsTypeService {
	
	@Autowired
	private ZC_GoodsTypeMapper goodsTypeMapper;
	
	@Autowired
	private ZC_GoodsMapper goodsMapper;

	/**
	 * 获取物品类型树形菜单
	 */
	@Override
	public Map<String, Object> getList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		List<Map<String,Object>> list = goodsTypeMapper.getList(map);
		if(list==null || list.size() == 0){
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
			resultMap.put("result", null);
			return resultMap;
		}
		List<Map<String,Object>> treeList = new ArrayList<Map<String,Object>>();
		TreeToolUtils u = new TreeToolUtils();
		treeList = u.menuList(list,false);
		resultMap.put("flag", true);
		resultMap.put("reason", "查询成功！");
		resultMap.put("result", treeList);
		return resultMap;
	}

	/**
	 * 新增/编辑物品类别
	 */
	@Override
	public Map<String, Object> addInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("fid") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "fid不能为空！");
			return resultMap;
		}
		
		if(map.get("pId") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "pId不能为空！");
			return resultMap;
		}
		
		//物品名称验证
		Map<String,Object> checkInfo = goodsTypeMapper.getSumWithName(map);
		
		if(checkInfo != null){
			if(map.get("fid").toString().equals("")){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "物品类型已经存在！");
				return resultMap;
			}else if(!map.get("fid").toString().equals("") && !checkInfo.get("fid").toString().equals(map.get("fid").toString()) ){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "物品类型已经存在！");
				return resultMap;
			}
		}
		
		int b = 0;
		if(map.get("fid").toString().equals("")){//新增
			String v_fid="001";
			Map<String,Object> parmMap = new HashMap<String,Object>();
			parmMap.put("pId", map.get("pId"));
			int count = goodsTypeMapper.getCountWithPid(parmMap);//pId=#{pId}的数据量
			if(count>0){
				//获取pId=#{pId}的最大fid+1
				String thisFid = goodsTypeMapper.getMaxFidWithPid(parmMap);
				String str = "000"+(Integer.parseInt(thisFid) + 1);
				int length = thisFid.length();
				v_fid = str.substring(str.length()-length);
				System.out.println(v_fid);
			}else{
				if(map.get("pId").toString().equals("0")){
					v_fid = "001";
				}else{
					v_fid = map.get("pId").toString()+"001";
				}
			}
			map.put("v_fid", v_fid);
			b = goodsTypeMapper.addInfo(map);
		}else{//编辑
			String thisFid = goodsTypeMapper.getMaxFidWithPid(map);
			String str = "000"+(Integer.parseInt(thisFid) + 1);
			int length = thisFid.length();
			String v_fid = str.substring(str.length()-length);
			
			map.put("v_fid", v_fid);
			b = goodsTypeMapper.editInfo(map);
		}
		resultMap.put("flag", true);
		resultMap.put("result", 1);
		resultMap.put("reason", "更新成功！");
		return resultMap;
	}

	@Override
	public Map<String, Object> getOneInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		Map<String,Object> result = goodsTypeMapper.getOneInfo(map);
		if(result != null){
			resultMap.put("flag", true);
			resultMap.put("result", result);
			resultMap.put("reason", "数据查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "数据不存在！");
		}
		return resultMap;
	}

	/**
	 * 删除一条信息
	 * 只能删除其下没有物品的数据
	 */
	@Override
	public Map<String, Object> delOneInfo(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("type") == null || map.get("type").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		
		//根据物品类别获取物品列表
		List<Map<String,Object>> list = goodsMapper.getList(map);
		if(list.size()>0){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "不可删除数据！");
			return resultMap;
		}
		
		int b = goodsTypeMapper.delOneInfo(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", 0);
			resultMap.put("reason", "更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "更新失败！");
		}
		
		return resultMap;
	}

}
