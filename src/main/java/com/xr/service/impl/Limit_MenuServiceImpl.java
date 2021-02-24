package com.xr.service.impl;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.xr.dao.Limit_MenuMapper;
import com.xr.dao.Limit_MenuPublicMapper;
import com.xr.service.Limit_MenuService;
import com.xr.util.TreeToolUtils;

@Service
public class Limit_MenuServiceImpl implements Limit_MenuService {
	
	@Autowired
	private Limit_MenuMapper mapper;
	
	@Autowired
	private Limit_MenuPublicMapper publicMapper;

	/**
	 * 获取菜单及按钮列表
	 */
	@Override
	public Map<String, Object> getList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		List<Map<String,Object>> list=null;
		if(map.get("thisHolderNo") == null){
			resultMap.put("result", null);
			resultMap.put("flag", false);
			resultMap.put("reason", "用户过期！");
			return resultMap;
		}
		if(map.get("thisHolderNo").toString().equals("administrator")
				|| map.get("thisHolderNo").toString().equals("Administrator")){
			list = publicMapper.getUserLimitListWithAdministrator(map);
		}else{
			list = mapper.getList(map);
		}
		//TreeToolUtils tr =new TreeToolUtils();
		//List<Map<String,Object>> treeList = tr.menuList(list, true);
		if(list != null && list.size()>0){
			resultMap.put("result", list);
			resultMap.put("flag", true);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("result", null);
			resultMap.put("flag", false);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 根据角色获取权限列表
	 */
	@Override
	public Map<String, Object> getHasLimitList(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		List<Map<String,Object>> btnList = mapper.getBtnListWithRole(map);
		String btnStr = "'-1'";
		if(btnList != null && btnList.size()>0){
			for(int i=0;i<btnList.size();i++){
				btnStr = btnStr + ",'" + btnList.get(i).get("id").toString()+"'";
			}
		}
		
		map.put("btnStr", btnStr);
		List<Map<String,Object>> list = mapper.getHasLimitList(map);
		if(list.size()>0){
			resultMap.put("flag", true);
			resultMap.put("result", list);
			resultMap.put("reason", "查询成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", null);
			resultMap.put("reason", "暂无数据！");
		}
		return resultMap;
	}

	/**
	 * 添加菜单操作
	 * 此操作只有administrator用户有操作权限
	 * optType=z：添加菜单
	 * optType=y：添加页面
	 * optType=o：添加操作按钮
	 * 此操作只有administrator用户有操作权限
	 * @throws IOException 
	 */
	@Override
	public Map<String, Object> addMenu(Map<String, Object> map,MultipartFile file) throws IOException {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		
		//验证菜单名称不能重复
		if(map.get("optType") != null && map.get("optType").toString().startsWith("z")){
			Map<String,Object> checkInfo = mapper.getSumWithMenuName(map);
			if(checkInfo != null){
				if(map.get("menuCode1") == null || map.get("menuCode1").toString().equals("")){
					resultMap.put("flag", false);
					resultMap.put("result", 0);
					resultMap.put("reason", "菜单名称已经存在！");
					return resultMap;
				}else if(!map.get("menuCode1").toString().equals("") && !checkInfo.get("MenuName").toString().equals(map.get("menuName1").toString()) ){
					resultMap.put("flag", false);
					resultMap.put("result", 0);
					resultMap.put("reason", "菜单名称已经存在！");
					return resultMap;
				}
			}
		}
		
		//验证页面名称不能重复
		if(map.get("optType") != null && map.get("optType").toString().startsWith("y")){
			Map<String,Object> checkInfo = mapper.getSumWithPageName(map);
			if(checkInfo != null){
				if(map.get("modelCode2") == null || map.get("modelCode2").toString().equals("")){
					resultMap.put("flag", false);
					resultMap.put("result", 0);
					resultMap.put("reason", "页面名称已经存在！");
					return resultMap;
				}else if(!map.get("modelCode2").toString().equals("") && !checkInfo.get("ModelName").toString().equals(map.get("modelName2").toString()) ){
					resultMap.put("flag", false);
					resultMap.put("result", 0);
					resultMap.put("reason", "页面名称已经存在！");
					return resultMap;
				}
			}
		}
		
		int b=0;
		
		if(map.get("optType") != null && map.get("optType").toString().startsWith("z")){
			byte[] imageInByte = null;
			if(file!= null){
				byte[] imgByte = file.getBytes();
				ByteArrayInputStream in1 = new ByteArrayInputStream(imgByte);    //将b作为输入流；
				BufferedImage image1 = ImageIO.read(in1);     //将in作为输入流，读取图片存入image中，而这里in可以为ByteArrayInputStream();
				BufferedImage photo = zoomOutImage(image1, 3);
				
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				ImageIO.write( photo, "png", baos );
				baos.flush();
				imageInByte = baos.toByteArray();
				baos.close();
			}
			map.put("menuImg1", imageInByte);
			if(map.get("menuCode1") == null || map.get("menuCode1").toString().equals("")){
				map.put("parentID1", map.get("parentID1").toString().replace("z_", ""));
				b = mapper.addMenu1(map);
			}else{
				map.put("menuCode1", map.get("menuCode1").toString().replace("z_", ""));
				map.put("parentID1", map.get("parentID1").toString().replace("z_", ""));
				b = mapper.editMenu1(map);
			}
		}else if(map.get("optType") != null && map.get("optType").toString().startsWith("y")){
			if(map.get("modelCode2") == null || map.get("modelCode2").toString().equals("")){
				map.put("menuCode2", map.get("menuCode2").toString().replace("z_", ""));
				b = mapper.addMenu2(map);
			}else{
				map.put("modelCode2", map.get("modelCode2").toString().replace("y_", ""));
				map.put("menuCode2", map.get("menuCode2").toString().replace("z_", ""));
				b = mapper.editMenu2(map);
			}
		}else if(map.get("optType") != null && map.get("optType").toString().startsWith("o")){
			if(map.get("ID3") == null || map.get("ID3").toString().equals("")){
				map.put("modelCode3", map.get("modelCode3").toString().replace("y_", ""));
				b = mapper.addMenu3(map);
			}else{
				map.put("ID3", map.get("ID3").toString().replace("o_", ""));
				map.put("modelCode3", map.get("modelCode3").toString().replace("y_", ""));
				b = mapper.editMenu3(map);
			}
		}
		
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", b);
			resultMap.put("reason", "更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "更新失败！");
		}
		return resultMap;
	}
	
	public static BufferedImage zoomOutImage(BufferedImage  originalImage, Integer times){
        int width = 200;
        int height = 200;
        int tType = originalImage.getType(); 
        if(0 == tType){
        	tType = 5; 
        }
        BufferedImage newImage = new BufferedImage(width,height, tType);
        Graphics g = newImage.getGraphics();
        g.drawImage(originalImage, 0,0,width,height,null);
        g.dispose();
        return newImage;
    }

	/**
	 * 获取一条数据
	 */
	@Override
	public Map<String, Object> getOneMenu(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		/*Map<String,Object> oneInfo = null;
		if(map.get("menuCode1") != null && map.get("menuCode1").toString().startsWith("z_")){
			map.put("menuCode1", map.get("menuCode1").toString().replace("z_", ""));
			oneInfo = mapper.getOneMenu1(map);
		}else if(map.get("modelCode2") != null && map.get("modelCode2").toString().startsWith("y_")){
			map.put("modelCode2", map.get("modelCode2").toString().replace("y_", ""));
			oneInfo = mapper.getOneMenu2(map);
		}else if(map.get("ID3") != null && map.get("ID3").toString().startsWith("o_")){
			map.put("ID3", map.get("ID3").toString().replace("o_", ""));
			oneInfo = mapper.getOneMenu3(map);
		}
		if(oneInfo == null){
			resultMap.put("flag", false);
			resultMap.put("result", null);
			resultMap.put("reason", "暂无数据！");
		}else{
			resultMap.put("flag", true);
			resultMap.put("result", oneInfo);
			resultMap.put("reason", "查询成功！");
		}*/
		return resultMap;
	}

	/**
	 * 删除菜单/页面/按钮
	 */
	@Override
	public Map<String, Object> delOneMenu(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		int b = mapper.delOneMenu(map);
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", b);
			resultMap.put("reason", "更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "更新失败！");
		}
		return resultMap;
	}

	/**
	 * * 为角色分配权限
	 * optType=1:添加权限
	 * optType=2:取消权限
	 */
	@Override
	public Map<String, Object> addUserLimit(Map<String, Object> map) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if(map.get("optType") == null){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "optType不能为空！");
			return resultMap;
		}
		
		if((List<Map<String,Object>>)map.get("perMissionList") == null || ((List<Map<String,Object>>)map.get("perMissionList")).size() == 0){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "没有相关操作权限！");
			return resultMap;
		}
		int b = 0;
		if(map.get("optType").toString().equals("1")){
			b = mapper.addUserLimit(map);
		}
		
		if(map.get("optType").toString().equals("2")){
			b = mapper.cancleUserLimit(map);
		}
		
		if(b>=0){
			resultMap.put("flag", true);
			resultMap.put("result", b);
			resultMap.put("reason", "更新成功！");
		}else{
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "更新失败！");
		}
		return resultMap;
	}

}
