package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.xr.service.IDoorUnitService;
import com.xr.util.GetSystemDate;

/**
 * 相当于一个服务器
 * @ClassName AppletDockingController
 * @Description  小程序开门时所用到的业务处理
 *    作用1,接收小程序发送过来的开门指令
 *    作用2,向乔工推送小程序的开门指令
 *    作用3,向田工发送小程序的开门指令
 *    其他作用
 * @Author csc
 * @Date 2019年12月23日 上午11:00:00
 */
@RestController
@RequestMapping("Apple")
public class AppletDockingController {
	
	
	/**
	 * 定义该变量,用于以下方法保证单一运行. 不会出现数据流失
	 */
	private static String A = "锁";

	/**引入门区的业务层*/
	@Autowired
	private IDoorUnitService doorSice;

	/**
	 * 根据业务需求,需要将开门指令分区域来储存.每个区域都不会重复,但是开门指令会有多个. 所以用一下数据类型来满足需求。key唯一.开门指令有多个
	 * Map<String, List<JSONObject>>一个key -对应多个开门指令- List<JSONObject>
	 */
	
    /**用于动态生成节点信息所对应的存储空间也就是Key(用于储存给乔工发送的开门命令)*/
	Map<String, List<JSONObject>> PutQiaoGong = new HashMap<String, List<JSONObject>>();

	/**用于动态生成节点信息所对应的存储空间也就是Key(用于储存给田工发送的开门命令)*/
	Map<String, List<JSONObject>> PutTianGong = new HashMap<String, List<JSONObject>>();
	
	 /**向乔工返回开门数据(数据集合定义在外面,避免list被重复创建)*/
	 private  static List<JSONObject> SendQiaoGong = new ArrayList<JSONObject>();
	 
	 /**向田工返回开门数据(数据集合定义在外面,避免list被重复创建)*/
	 private  static List<JSONObject> SendTianGong = new ArrayList<JSONObject>();
	 
	 
	/**
	 * 下发开门指令 接收小程序传过来的开门指令
	 */
	@RequestMapping("/ReceiveDoorOpenInstruction")
	public Map<String, Object> ReceiveDoorOpenInstruction(@RequestBody JSONObject receive) {
		Map<String, Object> map = new HashMap<String, Object>();// 定义一个map想前段返回数据
		synchronized (A) {
			// 首先获取前台传入的门区编号
			String doorNo = (String) receive.get("DoorNo");
			// 通过门区编号查询该门区属于哪一个节点
			Map<String, Object> resultMap = doorSice.querySingleNode(doorNo);

			if (resultMap == null) {// 如果没有查询到该门区属于哪一个节点(地区)
				map.put("flag", false);
				map.put("reason", "未查到该门区属于哪一个节点,下发失败!");
			} else {// 如果查询节点不等于空
				String NodeCode = (String) resultMap.get("NodeCode");
				/**
				 * SendQiaoGong-SendTianGong这两个集合只判断一个就行了.
				 * 具体原因请看Init对两个集合的说明
				 */
                 if(PutQiaoGong.containsKey(NodeCode)){//如果存在该key值
                	//放入当前时间
                	receive.put("DateTime", GetSystemDate.getTodayByFormat("yyyy-MM-dd HH:mm:ss"));
                	
                	List<JSONObject> Qlist = PutQiaoGong.get(NodeCode);
                	if(Qlist==null){Qlist=new ArrayList<JSONObject>();}
                	Qlist.add(receive);
                	List<JSONObject> Tlist = PutTianGong.get(NodeCode);
                	if(Tlist==null){Tlist=new ArrayList<JSONObject>();}
                	Tlist.add(receive);
                	map.put("flag", true);
                	map.put("reason", "开门指令下发成功!");
                 }else{//如果查询到数据库中共有对应的节点(节点就是地区)信息,但是没有对应的key值
                	 /**
     				 * 如果没有对应的key(NodeCode)值就向两个集合中放入对应的key，和一个新得List集合
     				 * 生成一个全新的key值
     				 */
     				List<JSONObject> list = new ArrayList<JSONObject>();
     				PutQiaoGong.put(NodeCode, list);//将新的key值放入乔工的集合
     				PutTianGong.put(NodeCode, list);//将新的key值放入田工的集合
                	//放入当前时间
                	receive.put("DateTime", GetSystemDate.getTodayByFormat("yyyy-MM-dd HH:mm:ss"));
                	list.add(receive);//将开门数据放入乔工的集合
                	PutQiaoGong.put(NodeCode, list);//在将对应的数据重新放入容器中
                	PutTianGong.put(NodeCode, list);//在将对应的数据重新放入容器中
                	map.put("flag", true);
                	map.put("reason", "开门指令下发成功!");
                 }
			}//end 如果查询节点不等于空
			return map;
		}//end 同步 
	}// end 方法

	/**
	 * 给乔工发送开门数据
	 */
	@RequestMapping("/SendDoorOpenInstruction")
	public Map<String, Object> SendDoorOpenInstruction(String NodeCode, HttpServletResponse resp) {
		Map<String, Object> map = new HashMap<>();// 定义一个map返回给前段
		synchronized (A) {
			SendQiaoGong.clear();//首先清除向乔工发送数据的集合
			List<JSONObject> qiaolist = PutQiaoGong.get(NodeCode);//通过key获取到对应的值
			SendQiaoGong.addAll(qiaolist);//然后将开门指令全部放入向乔工发送命令的集合
			qiaolist=new ArrayList<>();
			PutQiaoGong.put(NodeCode, qiaolist);//将空的集合放入对应的key中.清除以前的数据
			 if(SendQiaoGong.size()==0){
			    	map.put("flag", false);
			    	map.put("reason", "暂时没有数据");
			    	map.put("result", SendQiaoGong);
			    }else{
			    	map.put("flag", true);
			    	map.put("reason", "数据查询成功");
			    	map.put("result", SendQiaoGong);
			    }
			resp.setHeader("Access-Control-Allow-Origin", "*");// 解决跨域问题
			return map;
		}
	}// end 发送消息

	/**
	 * 给田工发送数据
	 * @return
	 */
	@RequestMapping("/SendDoorOpenTianGong")
	public Map<String, Object> SendDoorOpenTianGong(String NodeCode, HttpServletResponse resp) {
		Map<String, Object> map = new HashMap<>();// 定义一个map返回给前段
		synchronized (A) {
			SendTianGong.clear();//首先清除向田工发送数据的集合
			List<JSONObject> Tianlist = PutTianGong.get(NodeCode);//通过key获取到对应的值
			SendTianGong.addAll(Tianlist);//然后将开门指令全部放入向田工发送命令的集合
			Tianlist = new ArrayList<>();
			PutTianGong.put(NodeCode, Tianlist);
			   if(SendTianGong.size()==0){
			    	map.put("flag", false);
			    	map.put("reason", "暂时没有数据");
			    	map.put("result", SendTianGong);
			    }else{
			    	map.put("flag", true);
			    	map.put("reason", "数据查询成功");
			    	map.put("result", SendTianGong);
			    }
			resp.setHeader("Access-Control-Allow-Origin", "*");// 解决跨域问题
			return map;
		}
	}// end 发送消息

	/**
	 * 该类在方法中只执行一次. 将数据库中原有的节点发送给
	 */
	@PostConstruct
	public void Init() {
		// 查询节点表中的所有节点
		List<Map<String, Object>> nihao = doorSice.queryOpenNode();
		for (int i = 0; i < nihao.size(); i++) {// 循环所有节点,读取节点中的NodeCode
			if (PutQiaoGong.containsKey(nihao.get(i).get("NodeCode"))) {
				/**
				 * 如果乔工的Map存在该key值,就跳过
				 * 因为该方法是给SendTianGong,SendQiaoGong两个集合动态生成Key
				 * +两个集合为初始化状态.所以只判断其中一个是否拥有某一个Key值就行了
				 */
				continue;
			} else {
				/**
				 * 如果没有改key(NodeCode)值就向两个集合中放入对应的key，和一个新得List集合
				 */
				List<JSONObject> list = new ArrayList<JSONObject>();
				PutTianGong.put((String) nihao.get(i).get("NodeCode"), list);
				PutQiaoGong.put((String) nihao.get(i).get("NodeCode"), list);
			}
		}
	}// end 方法

	/**
	 * 实现InitializingBean接口必须实现的一个方法. 该方法会在类加载后执行,并且只执行一次
	 */

		
}
