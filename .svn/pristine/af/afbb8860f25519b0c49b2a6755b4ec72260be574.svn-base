package com.xr.controller;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.service.RC_PrisonerService;
import com.xr.util.ExcelUtil;

/**
 * 监狱犯人管理
 * @author Administrator
 */
@RequestMapping("/prisoner")
@Controller
public class RC_PrisonerController {
	
	@Autowired
	private RC_PrisonerService prisonerService;
	
	/**
	 * 获取犯人列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getPrisonerList")
	@ResponseBody
	public Map<String,Object> getPrisonerList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonerService.getPrisonerList(map);
		return resultMap;
	}
	
	/**
	 * 添加/新增犯人信息
	 * fid不为空则是编辑，否则添加
	 * @param map
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@RequestMapping("/updatePrisonerList")
	@ResponseBody
	public Map<String,Object> updatePrisonerList(@RequestParam Map<String,Object> map,MultipartFile file) throws IllegalStateException, IOException{
		Map<String,Object> resultMap = prisonerService.updatePrisonerList(map,file);
		return resultMap;
	}
	
	/**
	 * 删除一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOnePrison")
	@ResponseBody
	public Map<String,Object> delOnePrison(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonerService.delOnePrison(map);
		return resultMap;
	}
	
	/**
	 * 获取一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOnePrison")
	@ResponseBody
	public Map<String,Object> getOnePrison(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = prisonerService.getOnePrison(map);
		return resultMap;
	}
	
	/**
	 * 读取excel表格数据
	 * @param file
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/selectPerWithImport")
	@ResponseBody
	public Map<String,Object> selectPerWithImport(@RequestParam(required=false) MultipartFile file) throws Exception{
		Map<String,Object> resultMap = new HashMap<String, Object>();
		//List<List<Object>> list = importExcel(file,-1,1);
		List<String[]> list = ExcelUtil.queryExcel(file);
		resultMap.put("result", list);
		resultMap.put("flag", true);
		resultMap.put("reason", "数据解析成功！");
		return resultMap;
	}
	
	/**
	 * 保存表格数据
	 * @param file
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/insertPerWithImport")
	@ResponseBody
	public Map<String,Object> insertPerWithImport(@RequestParam Map<String,Object> map) throws Exception{
		JSONArray jsonArray = JSONArray.parseArray(map.get("parmList").toString());
		
		Map<String,Object> resultMap = prisonerService.insertPerWithImport(jsonArray);
		return resultMap;
	}

	/**
	 * 犯人绑定标签
	 * optType=1为绑卡
	 * optType=2为换卡
	 * @param map
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/updatePerLabel")
	@ResponseBody
	public Map<String,Object> updatePerLabel(@RequestParam Map<String,Object> map) throws Exception{
		Map<String,Object> resultMap = prisonerService.updatePerLabel(map);
		return resultMap;
	}
	
}
