package com.xr.service.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.dao.RC_PrisonerMapper;
import com.xr.entity.HY_MeetingSummary;
import com.xr.service.RC_PrisonerService;
import com.xr.util.FilePathCreate;
import com.xr.util.FtpUtil;

@Service
public class RC_PrisonerServiceImpl implements RC_PrisonerService {

	@Autowired
	private RC_PrisonerMapper prisonerMapper;
	
	/**
	 * 获取犯人列表
	 */
	@Override
	public Map<String, Object> getPrisonerList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = prisonerMapper.getPrisonerList(map);
		int count = prisonerMapper.getPrisonerListCount(map);
		resultMap.put("result", list);
		resultMap.put("count", count);
		if(count>0){
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功。");
		}else{
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 更新/添加犯人信息
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@Override
	public Map<String,Object> updatePrisonerList(Map<String, Object> map1,MultipartFile file) throws IllegalStateException, IOException {
		Map<String,Object> map = JSONObject.parseObject(map1.get("prisoner").toString());//获取表单信息
		Map<String,Object> resultMap = new HashMap<String,Object>();//返回结果
		
		Map<String,Object> checkMap = checkUpdatePerParm(map);//参数验证
		
		if(checkMap.get("result").toString().equals("0")){
			return checkMap;
		}
		
		Map<String,Object> checkInfo = prisonerMapper.getSumWithIDCard(map);
		if(checkInfo != null){
			if(map.get("fid").toString().equals("")){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "库中已经存在身份证号为:"+map.get("IDCard")+"的人员！");
				return resultMap;
			}else if(!map.get("fid").toString().equals("") && !checkInfo.get("fid").toString().equals(map.get("fid").toString()) ){
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "库中已经存在身份证号为:"+map.get("IDCard")+"的人员！");
				return resultMap;
			}
		}
		
		int b = 0;
		if(map.get("fid") != null && !map.get("fid").equals("")){
			b = prisonerMapper.updatePrisonerList(map);
			if(file != null){
				resultMap = savePrisonerImg(map,file,Integer.valueOf(map.get("fid").toString()));//保存、上传头像信息
			}
		}else{
			b = prisonerMapper.addPrisonerList(map);
			if(file != null){
				resultMap = savePrisonerImg(map,file,b);//保存、上传头像信息
			}
		}
		
		if(b<0){
			resultMap.put("flag", false);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新失败！");
			return resultMap;
		}
		
		resultMap.put("flag", true);
		resultMap.put("result", 1);
		resultMap.put("reason", "数据更新成功！");
		
		return resultMap;
	}
	
	private Map<String,Object> savePrisonerImg(Map<String, Object> map, MultipartFile file,int b) throws IllegalStateException, IOException {
		Map<String,Object> resultMap = new HashMap<String,Object>();//返回结果
		String savePath = "\\prisonerImg";//文件保存路径
		
		Properties properties = new Properties();
		properties = PropertiesLoaderUtils.loadAllProperties("loadParm.properties");
		String basePath = (String) properties.get("filePath");//获取基础路径
		String uploadPath = basePath+savePath;//文件上传的完整路径
		
		boolean rs = FilePathCreate.checkExist(uploadPath);
		if(!rs){
			FilePathCreate.createPath(uploadPath);
		}
		
		if(!file.isEmpty() && file != null){
		    String fileRealName = FilePathCreate.uploadFile(file, uploadPath, Long.valueOf("1024000"));
		    if(fileRealName.equals("101")){
		    	resultMap.put("flag", false);
				resultMap.put("result", 0);
				resultMap.put("reason", "图片过大，上传失败！");
				return resultMap;
		    }
			
			Map<String,Object> parmMap = new HashMap<String,Object>();
			parmMap.put("photoPath", uploadPath + "\\" + fileRealName);
			parmMap.put("prisonerID", b);
			parmMap.put("operator", map.get("operator"));
			prisonerMapper.savePrisonImg(parmMap);
		}
		resultMap.put("flag", true);
		resultMap.put("result", 1);
		resultMap.put("reason", "文件上传成功！");
		return resultMap;
	}

	/**
	 * 参数验证
	 * @param map
	 * @return
	 */
	private Map<String, Object> checkUpdatePerParm(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		//判断名称不为空
		if(map.get("prisonerName") == null || map.get("prisonerName").equals("")){
			resultMap.put("reason", "姓名不能为空");
			resultMap.put("flag", false);
			resultMap.put("result", 0);
		}else if(map.get("IDCard") == null || map.get("IDCard").equals("")){
			resultMap.put("reason", "身份证号不能为空");
			resultMap.put("flag", false);
			resultMap.put("result", 0);
		}else if(map.get("homeLocal") == null || map.get("homeLocal").equals("")){
			resultMap.put("reason", "家庭住址不能为空");
			resultMap.put("flag", false);
			resultMap.put("result", 0);
		}else if(map.get("inStartTime") == null || map.get("inStartTime").equals("")){
			resultMap.put("reason", "入狱时间不能为空");
			resultMap.put("flag", false);
			resultMap.put("result", 0);
		}else if(map.get("inReason") == null || map.get("inReason").equals("")){
			resultMap.put("reason", "入狱原因不能为空");
			resultMap.put("flag", false);
			resultMap.put("result", 0);
		}else if(map.get("startTime") == null || map.get("startTime").equals("")){
			resultMap.put("reason", "服刑起始时间不能为空");
			resultMap.put("flag", false);
			resultMap.put("result", 0);
		}else if(map.get("endTime") == null || map.get("endTime").equals("")){
			resultMap.put("reason", "服刑结束时间不能为空");
			resultMap.put("flag", false);
			resultMap.put("result", 0);
		}else if(map.get("prisonID") == null || map.get("prisonID").equals("")){
			resultMap.put("reason", "归属监区不能为空");
			resultMap.put("flag", false);
			resultMap.put("result", 0);
		}else{
			resultMap.put("flag", true);
			resultMap.put("result", 1);
		}
		return resultMap;
	}

	/**
	 * 导入表格数据
	 */
	@Override
	public Map<String,Object> insertPerWithImport(JSONArray jsonArray) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map<String,Object> parmMap = new HashMap<String,Object>();//参数

		List<Map> parmList = JSONObject.parseArray(jsonArray.toJSONString(), Map.class);
		Map<String,Object> checkedList = checkedParm(parmList);//参数验证
		
		if(checkedList.get("result").toString().equals("0")){
			return checkedList;
		}
		
		parmMap.put("perList", checkedList.get("list"));
		int sum = prisonerMapper.getSumWithIDCardList(parmMap);
		if(sum > 0){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "导入的人员ID与库中的人员ID冲突！");
			return resultMap;
		}
		
		int b = prisonerMapper.insertPerWithImport(parmMap);
		
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新失败！");
		}
		
		return resultMap;
	}
	
	/**
	 * 批量导入参数验证
	 * @param parmList
	 * @return
	 */
	private Map<String, Object> checkedParm(List<Map> parmList) {
		Map<String, Object> resultMap = new HashMap<String,Object>();
		resultMap.put("result", 1);
		
		Map<String,Object> parmMap = new HashMap<String,Object>();
		List<Map<String,Object>> prisonList = prisonerMapper.getPrisoneList(parmMap);//获取监区列表
		
		for(int i=0;i<parmList.size();i++){
			//判断名称不为空
			if(parmList.get(i).get("prisonerName") == null || parmList.get(i).get("prisonerName").equals("")){
				resultMap.put("reason", "姓名不能为空");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			}else if(parmList.get(i).get("IDCard") == null || parmList.get(i).get("IDCard").equals("")){
				resultMap.put("reason", "身份证号不能为空");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			}else if(parmList.get(i).get("homeLocal") == null || parmList.get(i).get("homeLocal").equals("")){
				resultMap.put("reason", "家庭住址不能为空");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			}else if(parmList.get(i).get("inStartTime") == null || parmList.get(i).get("inStartTime").equals("")){
				resultMap.put("reason", "入狱时间不能为空");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			}else if(parmList.get(i).get("inReason") == null || parmList.get(i).get("inReason").equals("")){
				resultMap.put("reason", "入狱原因不能为空");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			}else if(parmList.get(i).get("startTime") == null || parmList.get(i).get("startTime").equals("")){
				resultMap.put("reason", "服刑起始时间不能为空");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			}else if(parmList.get(i).get("endTime") == null || parmList.get(i).get("endTime").equals("")){
				resultMap.put("reason", "服刑结束时间不能为空");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			}else if(parmList.get(i).get("prisonID") == null || parmList.get(i).get("prisonID").equals("")){
				resultMap.put("reason", "归属监区不能为空");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			}
			
			for(int j=0;j<prisonList.size();j++){
				if(parmList.get(i).get("prisonID").toString().trim().equals(prisonList.get(j).get("prisonName"))){
					parmList.get(i).put("prisonID2", prisonList.get(j).get("fid"));
					continue;
				}
			}
			
			 if(parmList.get(i).get("prisonID2") == null || parmList.get(i).get("prisonID2").equals("")){
				resultMap.put("reason", "归属监区不存在，请检查监区名称是否正确！！");
				resultMap.put("flag", false);
				resultMap.put("result", 0);
				break;
			 }
		}
		
		if(resultMap.get("result").toString().equals("1")){
			resultMap.put("list", parmList);
		}
		return resultMap;
	}

	/**
	 * 删除一个犯人信息
	 */
	@Override
	public Map<String, Object> delOnePrison(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！");
			return resultMap;
		}
		int b = prisonerMapper.delOnePrison(map);
		
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新失败！");
		}
		return resultMap;
	}

	/**
	 * 犯人分配、更换标签
	 * optType=1为绑卡
	 * optType=2为换卡
	 */
	@Override
	public Map<String, Object> updatePerLabel(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		if(map.get("prisonerID").toString().equals("") || map.get("labelCode").toString().equals("") ||
				map.get("optType").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "参数异常！！");
		}
		
		int sum = prisonerMapper.getSumWithLabelCode(map);
		if(sum > 0){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "标签已经在使用中！！");
			return resultMap;
		}
		
		int b = 0;
		if(map.get("optType").toString().equals("1")){//绑定标签
			b = prisonerMapper.updatePerLabel(map);
		}else if(map.get("optType").toString().equals("2")){//更换标签
			b = prisonerMapper.changePerLabel(map);
		}
		
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", b);
			resultMap.put("reason", "数据更新失败！");
		}
		return resultMap;
	}

	/**
	 * 获取一条信息
	 */
	@Override
	public Map<String, Object> getOnePrison(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map<String,Object> result = prisonerMapper.getOnePrison(map);
		if(result.get("photoPath") != null && !result.get("photoPath").toString().equals("")){
			String base64 = FilePathCreate.getPhotoBase64(result.get("photoPath").toString());
			if(!base64.equals("-1")){
				result.put("photoBase64", base64);
			}
		}
		
		if(map.get("fid") == null || map.get("fid").toString().equals("")){
			resultMap.put("result", 0);
			resultMap.put("flag", false);
			resultMap.put("reason", "参数异常，fid不能为空");
			return resultMap;
		}
		if(result != null){
			resultMap.put("flag", true);
			resultMap.put("result", result);
			resultMap.put("reason", "数据查询成功！");
		}
		
		return resultMap;
	}
}
