$(function(){
	var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket(ws+"/SyrisFactory/websocket");
    }
    else {
        layer.msg('当前浏览器 Not support websocket',{time:2000});
    }
    //连接发生错误的回调方法
    websocket.onerror = function () {
        console.log("WebSocket连接发生错误");
    };
    //连接成功建立的回调方法
    websocket.onopen = function () {
        console.log("WebSocket连接成功");
    }
    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        var res=JSON.parse(event.data);
        console.log(res)
        initRecord(res);
    }
    //连接关闭的回调方法
    websocket.onclose = function () {
        console.log("WebSocket连接关闭");
    }
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
    	 websocket.close();
    }
    //发送消息
    function send() {
        websocket.send(message);
    }
    
})
//生成记录
function initRecord(res){
	var prisonerName=res.prisonerName==undefined?"":res.prisonerName;
	var prisonName=res.prisonName==undefined?"":res.prisonName;
	var areaName=res.areaName==undefined?"":res.areaName;
	callNameTime=timestampToTime(res.callNameTime);
	var caller=res.callerName==undefined?"":res.callerName;
	var callResult=res.callResult==undefined?"":res.callResult;
	var $tr=$("<tr><td>"+prisonerName+"</td><td>"+prisonName+"</td><td>"+areaName+"</td><td>"+callNameTime+"</td>" +
			"<td>"+caller+"</td><td>"+callResult+"</td></tr>");
	$("#cont").append($tr);
}
//时间戳转换日期
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10?"0"+date.getDate():date.getDate() + ' ';
    return Y+M+D;
}
