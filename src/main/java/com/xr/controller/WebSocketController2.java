/** 
* @Title: WebSocketController2.java 
* @Package com.xr.controller 
* @Description: TODO(用一句话描述该文件做什么) 
* @author Lenovo 
* @date 2020年4月14日 
* @version V1.0 
*/
package com.xr.controller;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.java_websocket.WebSocket;

import com.alibaba.fastjson.JSONObject;



/**  
 * @ApplicationName: SyrisFactory
 * @Title: WebSocketController2.java
 * @author: csc
 * @date: 2020年4月14日 下午3:51:27
 */
@ServerEndpoint("/websocket2")
public class WebSocketController2 {

	//静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static int onlineCount = 0;

    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
    private static CopyOnWriteArraySet<WebSocketController2> webSocketSet = new CopyOnWriteArraySet<WebSocketController2>();

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;  

    /**
     * 连接建立成功调用的方法
     * @param session  可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    @OnOpen
    public void onOpen(Session session){
        this.session = session;
        webSocketSet.add(this);     //加入set中
        addOnlineCount();           //在线数加1
        System.out.println("有新连接加入！当前在线人数为" + getOnlineCount());
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(){
        webSocketSet.remove(this);  //从set中删除
        subOnlineCount();           //在线数减1
        System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     * @throws EncodeException 
     * @throws IOException 
     */
    @OnMessage
    public void onMessage(String message ,Session session) throws EncodeException, IOException {
    	   //群发消息
          for(WebSocketController2 item: webSocketSet){
              try {
                  item.sendMessage(message);
              } catch (IOException e) {
                  e.printStackTrace();
                  continue;
              }
          }
          
    }//end

    /**
     * 发生错误时调用
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error){
        System.out.println("发生错误");
        error.printStackTrace();
    }

    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     * @param message
     * @throws IOException
     * @throws EncodeException 
     */
    public void sendMessage(String message) throws IOException, EncodeException{
        this.session.getBasicRemote().sendText(message);
        //this.session.getAsyncRemote().sendText(message);
    }
    
      

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
    	WebSocketController2.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
    	WebSocketController2.onlineCount--;
    }

}
