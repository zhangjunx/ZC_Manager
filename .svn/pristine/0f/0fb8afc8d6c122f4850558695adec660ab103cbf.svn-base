package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.service.FP_HolderAccountService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 账户管理
 * @author lwb
 */
@RequestMapping("/holderAccount")
@Controller
public class FP_HolderAccountController {

	@Autowired
	private FP_HolderAccountService holderAccountDataService;
	
	/**
	 * 获取账户列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getAccountList")
	@ResponseBody
	public Map<String,Object> getAccountList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = holderAccountDataService.getAccountList(map);
		if(!resultMap.get("count").toString().equals("0")){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "查询失败，数据不存在!");
		}
		
		return resultMap;
	}
	
	/**
	 * 查询未分配账户的用户信息
	 * （用于添加心账户）
	 * @param map
	 * @return
	 */
	@RequestMapping("/getHolderList")
	@ResponseBody
	public Map<String,Object> getHolderList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = holderAccountDataService.getHolderList(map);
		if(!resultMap.get("count").equals("0")){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "查询失败，数据不存在!");
		}
		
		return resultMap;
	}
	
	/**
	 * 批量添加账户
	 * @param map
	 * @return
	 */
	@RequestMapping("/addAccountList")
	@ResponseBody
	public Map<String,Object> addAccountList(@RequestParam Map<String,Object> map){
		map.put("list", JSONArray.fromObject(map.get("list")));
		Map<String,Object> resultMap = holderAccountDataService.addAccountList(map);
		
		if(!resultMap.get("result").equals("-1")){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据更新成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "数据更新失败!");
		}
		
		return resultMap;
	}
	
	/**
	 * 停用/启用账户
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateAccountStatus")
	@ResponseBody
	public Map<String,Object> updateAccountStatus(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = holderAccountDataService.updateAccountStatus(map);
		if(!resultMap.get("result").equals("-1")){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据更新成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "数据更新失败!");
		}
		return resultMap;
	}
	
	/**
	 * 查询充值记录
	 * @param map
	 * @return
	 */
	@RequestMapping("/getRechargingRecordList")
	@ResponseBody
	public Map<String,Object> getRechargingRecordList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = holderAccountDataService.getRechargingRecordList(map);
		if(!resultMap.get("count").equals("0")){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "查询失败，数据不存在!");
		}
		return resultMap;
	}
	
	/**
	 * 账户充值/退费
	 * optType=1:充值
	 * optType=2:退费
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateRecharging")
	@ResponseBody
	public Map<String,Object> updateRecharging(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = holderAccountDataService.updateRecharging(map);
		if(!resultMap.get("result").equals("-1")){
			resultMap.put("flag", true);
			resultMap.put("reason", "数据更新成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", 0);
		}
		return resultMap;
	}
	
	/**
	 * 查询身份下的账户列表
	 * 返回结果：
	 * resultType=1：已经被该身份绑定的账户
	 * resultType=2：未被该身份绑定的账户
	 * @param map
	 * @return
	 */
	@RequestMapping("/getAccountRoleList")
	@ResponseBody
	public Map<String,Object> getAccountRoleList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = holderAccountDataService.getAccountRoleList(map);
		if(!resultMap.get("count").equals("0")){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功!");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "查询失败，数据不存在!");
		}
		return resultMap;
	}
	
	/**
	 * 为人员分配消费模式
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateConsumeTypeID")
	@ResponseBody
	public Map<String,Object> updateConsumeTypeID(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap=new HashMap<String,Object>();
		int b = holderAccountDataService.updateConsumeTypeID(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("reason", "更新数据成功！");
			resultMap.put("result", 1);
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "更新数据为空！");
			resultMap.put("result", 0);
		}
		return resultMap;
	}
}
