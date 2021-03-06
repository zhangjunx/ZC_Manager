package com.xr.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.xr.service.ZC_GoodsService;

@RequestMapping("/zcGoods")
@Controller
public class ZC_GoodsController {
	
	@Autowired
	private ZC_GoodsService goodsService;
	
	/**
	 * 获取商品列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = goodsService.getList(map);
		return resultMap;
	}
	
	/**
	 * 新增/编辑商品信息
	 * @param map
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/addInfo")
	@ResponseBody
	public Map<String,Object> addInfo(@RequestParam(value="file",required=false) MultipartFile file,String str,HttpServletRequest request) throws IOException{
		Map<String,Object> map = JSONObject.parseObject(str);
		String s1=request.getSession().getServletContext().getRealPath("/goodsImage/");//获取图片的绝对路径
		map.put("goodsImgPath", s1);
		Map<String,Object> resultMap = goodsService.addInfo(map,file);
		return resultMap;
	}
	
	/**
	 * 获取一条商品信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOne")
	@ResponseBody
	public Map<String,Object> getOne(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = goodsService.getOne(map);
		return resultMap;
	}
	
	/**
	 * 删除一条商品信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOne")
	@ResponseBody
	public Map<String,Object> delOne(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = goodsService.delOne(map);
		return resultMap;
	}
}
