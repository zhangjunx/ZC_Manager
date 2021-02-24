package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.entity.CardData;
import com.xr.service.ICardDataService;

/**
 * @ClassName CardDataController
 * @Description 卡表的交互层
 * @Author csc
 * @Date 2019年12月26日 下午2:18:22
 */
@Controller
@RequestMapping("CardData")
public class CardDataController {
	@Autowired
	private ICardDataService icds;//引入卡表的业务层
	
	/**
	 * 通过工号查询用户的卡号.
	 * @param holderno
	 * 用于小程序开门时查询对应的卡内码
	 */
	@ResponseBody
	@RequestMapping("/querySmallProgram")
	public Map<String, Object> querySmallProgram(String holderno,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		if(holderno!=null){
		List<Map<String, Object>> card = icds.querySmallProgram(holderno); 
			if(card.size()==0){
				map.put("flag", false);
				map.put("reason", "暂无数据可查");
			}else{
				map.put("flag", true);
				map.put("reason", "查询成功");
				map.put("result", card);
			}
		}else{
		    map.put("flag", false);
			map.put("reason", "工号不能为空");
		}
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	/* 查询员工拥有的卡*/
	@ResponseBody
	@RequestMapping("/queryCardList")
	public Map<String, Object> queryCardList(String holderno,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		try{
			List<Map<String, Object>> list = icds.queryCardListService(holderno); 
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	/* 修改员工拥有的卡信息*/
	@ResponseBody
	@RequestMapping("/update")
	public Map<String, Object> update(CardData record,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		Map<String, Object> m = new HashMap<String, Object>();//定义一个Map向前端返回数据
		try{
			//判断卡内码是否重复
			/*m.put("cardid", record.getCardid());
			Map<String, Object> ma=icds.queryByCardIDService(m);
			if(ma!=null){
				map.put("flag", false);
				map.put("reason", "换卡失败，该卡片内码已被人领用！");
				return map;
			}*/
			int i=icds.updateByPrimaryKeySelective(record); 
			if(i>0){
				map.put("flag", true);
				map.put("reason", "换卡成功！");
				map.put("result", record);
			}else{
				map.put("flag", false);
				map.put("reason", "换卡失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	@RequestMapping("/updateStatus")
	@ResponseBody
	public Map<String,Object> updateStatus(CardData record){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=icds.updateByPrimaryKeySelective(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "修改成功！");
				map.put("result", i);
			}else{
				map.put("flag", false);
				map.put("reason", "修改失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/* 修改员工拥有的卡信息*/
	@ResponseBody
	@RequestMapping("/insert")
	public Map<String, Object> insert(CardData record,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		Map<String, Object> m = new HashMap<String, Object>();//定义一个Map向前端返回数据
		try{
			//判断卡内码是否重复
			m.put("cardid", record.getCardid());
			Map<String, Object> ma=icds.queryByCardIDService(m);
			if(ma!=null){
				map.put("flag", false);
				map.put("reason", "添加失败，卡内码重复了！");
				return map;
			}
			//获取卡号
			Integer cardno=icds.queryCardNoService();
			record.setCardno(cardno);
			record.setCardflag("1");
			record.setCardstopuse("0");
			int i=icds.insertSelectiveService(record); 
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
				map.put("result", record);
			}else{
				map.put("flag", false);
				map.put("reason", "添加失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	/* 删除员工拥有的卡信息*/
	@ResponseBody
	@RequestMapping("/delete")
	public Map<String, Object> delete(Integer cardno,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		Map<String, Object> m = new HashMap<String, Object>();//定义一个Map向前端返回数据
		try{
			int i=icds.deleteByPrimaryKeyService(cardno);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	/*批量删除  deleteBatch*/
	@ResponseBody
	@RequestMapping("/deleteBatch")
	public Map<String, Object> deleteBatch(@RequestBody List<Integer> list,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		Map<String, Object> m = new HashMap<String, Object>();//定义一个Map向前端返回数据
		try{
			int i=icds.deleteBatchService(list);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	/* 修改员工拥有的卡信息*/
	@ResponseBody
	@RequestMapping("/getCardTree")
	public Map<String, Object> getCardTree(@RequestBody List<String> list,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		try{
			List<Map<String, Object>> arrlist=icds.getCardTreeService(list);
			if(arrlist.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", arrlist);
			}else{
				map.put("flag", false);
				map.put("reason", "查询失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	/*queryCardNo*/
	@ResponseBody
	@RequestMapping("/queryCardNo")
	public Map<String, Object> queryCardNo(HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		try{
			Integer cardno=icds.queryCardNoService();
			if(cardno>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", cardno);
			}else{
				map.put("flag", false);
				map.put("reason", "查询失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end
	
	/* 通过部门查该部门下的人员与其拥有的卡的列表树*/
	@ResponseBody
	@RequestMapping("/getHolderCardTree")
	public Map<String, Object> getHolderCardTree(String deptno,HttpServletResponse resp){
		Map<String, Object> map = new HashMap<String, Object>();//定义一个Map向前端返回数据
		Map<String, Object> m= new HashMap<String, Object>();//定义一个Map向前端返回数据
		try{
			m.put("deptno", deptno);
			List<Map<String, Object>> list=icds.getHolderCardTreeService(m);
			if(list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		} 
		resp.setHeader("Access-Control-Allow-Origin", "*");//解决跨域问题
		return map;
	}//end

}
