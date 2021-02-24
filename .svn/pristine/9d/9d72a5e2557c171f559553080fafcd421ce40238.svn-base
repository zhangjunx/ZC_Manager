package com.xr.controller;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.xr.entity.HY_MeetingSummary;
import com.xr.service.RC_PrisonAppDeviceService;
import com.xr.util.FilePathCreate;
import com.xr.util.FtpUtil;

@RequestMapping("/prisonAppDevice")
@Controller
public class RC_PrisonAppDeviceController {
	
	@Autowired
	private RC_PrisonAppDeviceService appdeviceService;
	
	/**
	 * 获取APP设备列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getAppDeviceList")
	@ResponseBody
	public Map<String,Object> getAppDeviceList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.getAppDeviceList(map);
		return resultMap;
	}
	
	/**
	 * APP设备信息注册
	 * @param map
	 * @return
	 */
	@RequestMapping("/addAppDevice")
	@ResponseBody
	public Map<String,Object> addAppDevice(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.addAppDevice(map);
		return resultMap;
	}
	
	/**
	 * 设备审核
	 * @param map
	 * @return
	 */
	@RequestMapping("/updateAppDeviceStatus")
	@ResponseBody
	public Map<String,Object> updateAppDeviceStatus(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.updateAppDeviceStatus(map);
		return resultMap;
	}
	
	/**
	 * 获取一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getOneAppDevice")
	@ResponseBody
	public Map<String,Object> getOneAppDevice(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.getOneAppDevice(map);
		return resultMap;
	}
	
	/**
	 * 删除一条信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/delOneAppDevice")
	@ResponseBody
	public Map<String,Object> delOneAppDevice(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.delOneAppDevice(map);
		return resultMap;
	}
	
	/**
	 * 获取设备已经选择的用户列表
	 * 返回结果：
	 * resultType=1：已选的用户
	 * resultType=2：未选的用户
	 * @param map
	 * @return
	 */
	@RequestMapping("/getHolderList")
	@ResponseBody
	public Map<String,Object> getHolderList(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.getHolderList(map);
		return resultMap;
	}
	
	/**
	 * app绑定/解除用户
	 * optType=1：添加
	 * optType=2：删除
	 * @param map
	 * @return
	 */
	@RequestMapping("/addAppUserRelation")
	@ResponseBody
	public Map<String,Object> addAppUserRelation(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.addAppUserRelation(map);
		return resultMap;
	}
	
	/**
	 * app登录
	 * 参数包含：
	 * APP设备SN：deviceSn
	 * 登录用户：userName
	 * 登录密码：password
	 * @param map
	 * @param resp
	 * @param request
	 * @return
	 */
	@RequestMapping("/mobileLogin")
	@ResponseBody
	public Map<String,Object> mobileLogin(@RequestParam Map<String,Object> map,HttpServletResponse resp,HttpServletRequest request) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		HttpSession session = request.getSession();//获取session
		if(map.get("userName") == null || map.get("userName").toString().equals("")
				|| map.get("password") == null || map.get("password").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "用户名或密码不能为空！");
			return resultMap;
		}
		
		if(map.get("deviceSn") == null || map.get("deviceSn").toString().equals("")){
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "设备序列号不能为空！");
			return resultMap;
		}
		
		String userCode = map.get("userName").toString();//登录时传的用户名
		Map<String, Object> user = null;
		try {
			user = appdeviceService.checkLogin(map);
		} catch (Exception e) {
			e.printStackTrace();
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "程序异常，请联系管理员！");
			return resultMap;
		}
		
		if (user != null) {
			String base = request.getServletContext().getContextPath();
			String basePath = request.getScheme() + "://" + request.getServerName() + (request.getServerPort() == 80 ? "" : (":" + request.getServerPort())) + base;
			session.setAttribute("base", base);
			session.setAttribute("basePath", basePath);

			// 查询用户是否在其他地方登录过了 保持单用户
			HttpSession tmpSession = (HttpSession) session.getServletContext().getAttribute(userCode);
			if (tmpSession != null && session != tmpSession) {//如果用户在一个session登录还是放行的！
				try {
					session.getServletContext().removeAttribute(userCode);//从统计人数中删除
					tmpSession.invalidate();// 踢下线
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
			session.getServletContext().setAttribute(userCode, session);
		} else {
			resultMap.put("flag", false);
			resultMap.put("result", 0);
			resultMap.put("reason", "用户名或者密码错误!");
			return resultMap;
		}
		resultMap.put("SESSIONID", session.getId());
		resultMap.put("user", user);
		resultMap.put("flag", true);
		resultMap.put("result", 1);
		resultMap.put("reason", "登陆成功！");
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 同步监区数据
	 * map参数：设备中已存在的监区ID以及更新时间
	 * 返回结果：
	 * addList：新增的监区信息
	 * delList：删除的监区信息
	 * updateList：更新的监区信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/downLoadPrison")
	@ResponseBody
	public Map<String,Object> downLoadPrison(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.downLoadPrison(map);
		return resultMap;
	}
	
	/**
	 * 同步区域数据
	 * map参数：设备中已存在的区域ID以及更新时间
	 * 返回结果：
	 * addList：新增的区域信息
	 * delList：删除的区域信息
	 * updateList：更新的区域信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/downLoadPrisonArea")
	@ResponseBody
	public Map<String,Object> downLoadPrisonArea(@RequestParam Map<String,Object> map){
		Map<String,Object> resultMap = appdeviceService.downLoadPrisonArea(map);
		return resultMap;
	}
	
	/**
	 * 犯人信息
	 * map参数：
	 * updateDate：设备同步人员的最新时间，第一次同步updateDate为空
	 * 返回结果：
	 * addList：新增的犯人信息
	 * delList：删除的犯人信息
	 * updateList：更新的犯人信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/downLoadPrisoner")
	@ResponseBody
	public Map<String,Object> downLoadPrisoner(@RequestParam Map<String,Object> map,HttpServletResponse resp){
		Map<String,Object> resultMap = appdeviceService.downLoadPrisoner(map);
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return resultMap;
	}
	
	/**
	 * 同步犯人信息头像
	 * map参数：犯人ID
	 * @param map
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/downLoadPrisonerPic")
	@ResponseBody
	public void downLoadPrisonerPic(@RequestParam Map<String,Object> map,HttpServletResponse resp,HttpServletRequest request) throws IOException{
		Map<String,Object> resultMap = appdeviceService.downLoadPrisonerPic(map);//根据犯人ID获取犯人存储路径
		if(resultMap.get("photoPath") != null && !resultMap.get("photoPath").toString().equals("")){
			String base64 = FilePathCreate.getPhotoBase64(resultMap.get("photoPath").toString());
			if(!base64.equals("-1")){
				download(resultMap.get("photoPath").toString(),resp,request);//将下载到本地的图片返回给app
			}
		}
	}
	
	/**
	 * 返回图片流到app
	 * @param filePath
	 * @param response
	 * @param request
	 */
	public static void download(String filePath,HttpServletResponse response,HttpServletRequest request){
	    try {
	      //获取文件名
	      String fileName = filePath.substring(filePath.lastIndexOf("\\")+1);
	      response.setCharacterEncoding("utf-8");
	      response.setContentType("application/octet-stream");
	      //response.setContentType("application/force-download");
	      //处理下载弹出框名字的编码问题
	      response.setHeader("Content-Disposition", "attachment;fileName=" + new String( fileName.getBytes("gb2312"), "ISO8859-1" ));
	      //利用输入输出流对文件进行下载
	      InputStream inputStream = new FileInputStream(filePath);
	      
	      //图片缩放
	      BufferedImage originalImage = ImageIO.read(inputStream); 
	      BufferedImage bf = zoomOutImage(originalImage, 3);
	      String format = "png";
	      ImageIO.write(bf, format, response.getOutputStream());
	 
	    } catch (FileNotFoundException e) {
	      e.printStackTrace();
	    } catch (IOException e) {
	      e.printStackTrace();
	    }
	}
	
	/**
     * 对图片进行缩小
     * @param originalImage 原始图片
     * @param times 缩小倍数
     * @return 缩小后的Image
     */
    public static BufferedImage  zoomOutImage(BufferedImage  originalImage, Integer times){
        int width = 71;
        int height = 99;
        BufferedImage newImage = new BufferedImage(width,height,originalImage.getType());
        Graphics g = newImage.getGraphics();
        g.drawImage(originalImage, 0,0,width,height,null);
        g.dispose();
        return newImage;
    }
    
    public static void main(String[] args) {
    	  String line="/prisonImg/prisonImg2/1587438053799.png";
	   	  String pattern = "/\\S+/";
	   	  Pattern r = Pattern.compile(pattern);
	   	  Matcher m = r.matcher(line);
	   	  System.out.println(m.find());
	   	  System.out.println(m.group());
	}
}
