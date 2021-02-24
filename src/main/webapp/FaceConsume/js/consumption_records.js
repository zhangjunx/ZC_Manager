$(function(){
	var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://192.168.1.196:8080/websocket");
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
        initTable(res);
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

//点击刷新清屛
$(".refreshScreen").click(function(){
	$("#cont").empty();
})

//获取消费记录
function initTable(data){
	var $tr=$("<tr><td>"+data.HolderNo+"</td><td>"+data.HolderName+"</td><td>"+data.DepartmentName+"</td>" +
			"<td><img class='face_img' style='height:80px' src=data:image;base64,"+data.photo+"></td><td><img class='face_img' style='height:80px' src=data:image;base64,"+data.DataPhoto+"></td><td>"+data.consumeDate+"</td><td>"+data.consumeTime+"</td>" +
			"<td>"+data.consumeAccount+"</td><td>"+data.RestaurantName+"</td><td>"+data.balance+"</td><td>"+data.faceType+"</td></tr>");
	if($("#cont tr").length!=0){
		$tr.insertBefore($("#cont tr").eq(0));
	}else{
		$("#cont").append($tr);
	}
}
//鼠标经过照片的时候放大照片
$(document).on("mousemove","td .face_img",function(e){
	$("#bigPhoto").css("left",e.clientX+20+"px");
	$("#bigPhoto").css("top",e.clientY+"px");
	$("#bigPhoto").css("display","inline-block");
	var imgSrc=$(this).attr("src");
	$("#bigPhoto img").attr("src",imgSrc).css({
		"width":"200px",
		"height":"200px"
	});	
})
$(document).on("mouseleave","td img",function(e){
	$("#bigPhoto").css("display","none");
})