$(function(){
	getTime();
	getScreenFullTitle();
	getABDoorLimit();
	setInterval(getTime,1000);
	renderTableLeft(arr1);
	renderTableRight(arr2);
})
//双击标题可更改
$(".title_set").dblclick(function(){
	var text=$(this).html();
	$("#titleValue").val(text);
	layer.open({
		type:1,
		title:"修改标题",
		content:$("#titleSet"),
		area:["400px","200px"],
		btn:["确定","取消"],
		yes:function(index){
			var value=$("#titleValue").val();
			if(value==""){
				layer.msg("标题不能为空!",{time:2000});
				return;
			}
			layer.close(index);
			updateScreenFullTitle(value);
		}
	})
})
$(document).mousemove(function(event){
	var x=event.clientX; 
	var y=event.clientY;//监听鼠标位置;
	var width=document.body.clientWidth;
	var wx=width-x;
	if(wx<300&&y<85){
		//弹出关闭按钮
		$(".closeYeMian").css({
			"top":"12px",
			"transition":"all 0.5s ease"
		})
	}else{
		$(".closeYeMian").css({
			"top":"-100px",
			"transition":"all 0.5s ease"
		})
	}
})
$(".closeYeMian").click(function(){
	parent.layer.closeAll();
})
var arr1=[];
var arr2=[];
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
        if(res==null){
        	return;
        }
        if(res.IOStatusLang=="进入"){
        	for(var item of doorList){
        		if(res.doorNo==item){
        			//语音合成
        	        var utterThis = new window.SpeechSynthesisUtterance();
        	        utterThis.text = "验证通过，请放行！";
        	        utterThis.pitch="1";
        	        window.speechSynthesis.speak(utterThis);
        			if(arr2.length>5){
                		arr2=[];
                	}
        			$(".status").show();
                	$(".title_r").html(res.doorName);
                	if(res.basePhoto!=undefined&&res.basePhoto!=null&&res.basePhoto!=""){
                		$(".box_r .person_l_bg").attr("src","data:image/png;base64,"+res.basePhoto);
                	}else{
                		$(".box_l .person_l_bg").attr("src","image/person_bg.png");
                	}
                	if(res.photo!=undefined&&res.photo!=null&&res.photo!=""){
                		$(".box_r .person_r_bg").attr("src","data:image/png;base64,"+res.photo);
                	}else{
                		$(".box_l .person_r_bg").attr("src","image/person_bg.png");
                	}
                	$("#holdername_r").html(res.holderName);
                	$("#holderno_r").html(res.holderNo);
                	$("#dept_r").html(res.deptName);
                	$("#passageTime_r").html(res.IODate);
                	arr2.push(res);
                	renderTableRight(arr2);
        		}
        	}
        	
        }else if(res.IOStatusLang=="外出"){
        	for(var item of doorList){
        		if(res.doorNo==item){
        			//语音合成
        	        var utterThis1 = new window.SpeechSynthesisUtterance();
        	        utterThis1.text = "验证通过，请放行！";
        	        utterThis1.pitch="1";
        	        window.speechSynthesis.speak(utterThis1);
        			if(arr1.length>5){
                		arr1=[];
                	}
        			$(".status").show();
                	$(".title_l").html(res.doorName);
                	if(res.basePhoto!=undefined&&res.basePhoto!=null&&res.basePhoto!=""){
                		$(".box_l .person_l_bg").attr("src","data:image/png;base64,"+res.basePhoto);
                	}else{
                		$(".box_l .person_l_bg").attr("src","image/person_bg.png");
                	}
                	if(res.photo!=undefined&&res.photo!=null&&res.photo!=""){
                		$(".box_l .person_r_bg").attr("src","data:image/png;base64,"+res.photo);
                	}else{
                		$(".box_l .person_r_bg").attr("src","image/person_bg.png");
                	}
                	$("#holdername_l").html(res.holderName);
                	$("#holderno_l").html(res.holderNo);
                	$("#dept_l").html(res.deptName);
                	$("#passageTime_l").html(res.IODate);
                	arr1.push(res);
                	renderTableLeft(arr1);
        		}
        	}
        	
        }
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
    
//查询门区
var doorList=[];
function getABDoorLimit(){
    	var obj={"pageID":1,"holderNo":window.top.holderno}
    	$.ajax({
    		url:url+"/doorUnit2/getABDoorLimit",
    		type:"POST",
    		data:obj,
    		success:function(data){
    			console.log(data);
    			var res=data.result;
    			if(data.flag){
    				for(var item of res){
    					if(item.holderNo!=undefined){//已经与人员绑定
    						doorList.push(item.doorNo);
    					}
    				}
    			}
    		}
    	})
    }

function renderTableLeft(arr1){
	layui.use('table', function(){
		  var table = layui.table;
		  //第一个实例
		  table.render({
		    elem: '#demo',
		    height: 'full-602',
		    cols: [[ //表头
		      {field: 'doorName', title: '门信息', width:150},
		      {field: 'holderNo', title: '工号', width:80},
		      {field: 'IODate', title: '通行时间', width:170, sort: true},
		      {field: 'holderName', title: '通行人', width:170},
		      {field: 'deptName', title: '部门', width: 200},
		      {field: 'IOStatusLang', title: '状态', width: 92},
		    ]],
		    data:arr1
		  });
		});
}
function renderTableRight(arr2){
	layui.use('table', function(){
		  var table = layui.table;
		  //第一个实例
		  table.render({
		    elem: '#demo2',
		    height: 'full-602',
		    cols: [[ //表头
		    	 {field: 'doorName', title: '门信息', width:150},
			      {field: 'holderNo', title: '工号', width:80},
			      {field: 'IODate', title: '通行时间', width:170, sort: true},
			      {field: 'holderName', title: '通行人', width:170},
			      {field: 'deptName', title: '部门', width: 200},
			      {field: 'IOStatusLang', title: '状态', width: 92},
		    ]],
		    data:arr2
		  });
		});
}

//获取标题
function getScreenFullTitle(){
	$.ajax({
		url:url+"/DictionaryData/getScreenFullTitle",
		type:"post",
		data:{"typeName":"screenFullTitle_A"},
		success:function(data){
			if(data.flag){
				$(".title_set").html(data.result.value);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//修改标题
function updateScreenFullTitle(value){
	$.ajax({
		url:url+"/DictionaryData/updateScreenFullTitle",
		type:"post",
		data:{"typeName":"screenFullTitle_A","value":value},
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					$(".title_set").html(value);
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//获取当前时间
function getTime(){
	var date=new Date();
	var hour=date.getHours();
	var minute=date.getMinutes();
	var seconds=date.getSeconds();
	if (hour < 10) hour = "0" + hour;
	if (minute < 10) minute = "0" + minute;
	if (seconds < 10) seconds = "0" + seconds;
	var currentTime = hour + ":" + minute + ":" + seconds;
	$(".time").html(currentTime);
}