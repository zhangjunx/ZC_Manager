$(function(){
	//初始化监区门区
	getPrisonerDoor();
	renderTableLeft(arr1);
	getScreenFullTitle();
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
//点击开门
$(document).on("click",".openDoor",function(){
	var doorno=$(this).attr("data-doorno");
	var doorname=$(".doorName").eq($(this).index()).html();
	layer.confirm("确定开门?",{title:"提示信息"},function(index){
		layer.close(index);
		var obj={"CommonData":doorno,"CommonAction":1};
		openDoorLimit(obj,doorname);
	})
})
//点击自控
$(document).on("click",".closeDoor",function(){
	var doorno=$(this).attr("data-doorno");
	var doorname=$(".doorName").eq($(this).index()).html();
	layer.confirm("确定自控?",{title:"提示信息"},function(index){
		layer.close(index);
		var obj={"CommonData":doorno,"CommonAction":4};
		openDoorLimit(obj,doorname);
	})
})
//点击常开
$(document).on("click",".longTimeOpen",function(){
	var doorno=$(this).attr("data-doorno");
	var doorname=$(".doorName").eq($(this).index()).html();
	layer.confirm("确定常开?",{title:"提示信息"},function(index){
		layer.close(index);
		var obj={"CommonData":doorno,"CommonAction":2};
		openDoorLimit(obj,doorname);
	})
})
//点击常关
$(document).on("click",".longTimeClose",function(){
	var doorno=$(this).attr("data-doorno");
	var doorname=$(".doorName").eq($(this).index()).html();
	layer.confirm("确定常关?",{title:"提示信息"},function(index){
		layer.close(index);
		var obj={"CommonData":doorno,"CommonAction":5};
		openDoorLimit(obj,doorname);
	})
})
//点击一键自控，
$(document).on("click",".con_doorClose",function(){
	layer.confirm("确定一键自控?",{title:"提示信息"},function(index){
		layer.close(index);
		autoControlDoorAll();
	})
})
//点击一键全开
$(document).on("click",".con_doorOpen",function(){
	layer.confirm("确定一键全开?",{title:"提示信息"},function(index){
		layer.close(index);
		openDoorLimitLongAll();
	})
})
//一键自控，
function autoControlDoorAll(){
	var arr=[];
	for(var i=0;i<$(".layui-card-body li").length;i++){
    	var doorno=$(".layui-card-body li").eq(i).attr("data-doorno");
    	arr.push({
    		"CommonData":doorno
    	});
    }
	$.ajax({
		url:url+"/doorControlPrisoner/autoControlDoorAll",
		type:"post",
		data:JSON.stringify({"CommonAction":4,"CommonDataList":arr}),
		contentType:"application/json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
			if(data.flag){
				//生成记录
				var IODateTime=getTime();
				var HolderNo=window.top.holderno;
				var HolderName=window.top.holdername;
				for(var i=0;i<$(".layui-card-body li").length;i++){
			    	var doorname=$(".doorName").eq(i).html();
			    	arr1.push({
						"IODateTime":IODateTime,
						"HolderNo":HolderNo,
						"HolderName":HolderName,
						"DepartMentName":null,
						"DoorName":doorname
					});
			    }
				renderTableLeft(arr1);
			}
		}
	})
}
//一键全开
function openDoorLimitLongAll(){
	var arr=[];
	for(var i=0;i<$(".layui-card-body li").length;i++){
    	var doorno=$(".layui-card-body li").eq(i).attr("data-doorno");
    	arr.push({
    		"CommonData":doorno
    	});
    }
	$.ajax({
		url:url+"/doorControlPrisoner/openDoorLimitLongAll",
		type:"post",
		contentType:"application/json",
		data:JSON.stringify({"CommonAction":2,"CommonDataList":arr}),
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
			if(data.flag){
				//生成记录
				var IODateTime=getTime();
				var HolderNo=window.top.holderno;
				var HolderName=window.top.holdername;
				for(var i=0;i<$(".layui-card-body li").length;i++){
			    	var doorname=$(".doorName").eq(i).html();
			    	arr1.push({
						"IODateTime":IODateTime,
						"HolderNo":HolderNo,
						"HolderName":HolderName,
						"DepartMentName":null,
						"DoorName":doorname
					});
			    }
				renderTableLeft(arr1);
			}
		}
	})
}

//开门  1   自控 4  常开2   常关5
function openDoorLimit(obj,doorname){
	console.log(obj);
	$.ajax({
		url:url+"/doorControlPrisoner/openDoorLimit",
		type:"post",
		data:JSON.stringify(obj),
		contentType:"application/json",
		success:function(data){
			layer.msg(data.reason,{time:2000});
			if(data.flag){
				//生成记录
				var IODateTime=getTime();
				var HolderNo=window.top.holderno;
				var HolderName=window.top.holdername;
				var DoorName=doorname;
				arr1.push({
					"IODateTime":IODateTime,
					"HolderNo":HolderNo,
					"HolderName":HolderName,
					"DepartMentName":null,
					"DoorName":DoorName
				});
				renderTableLeft(arr1);
			}
		}
	})
}

var arr1=[];
function renderTableLeft(arr1){
	layui.use('table', function(){
		  var table = layui.table;
		  //第一个实例
		  table.render({
		    elem: '#demo',
			height: 'full-722',
		    cols: [[ //表头
		      {field: 'IODateTime', title: '时间', width:300,sort: true},
		      {field: 'HolderNo', title: '编号', width:300},
		      {field: 'HolderName', title: '姓名', width:300, },
		      {field: 'DepartMentName', title: '监区', width:400},
		      {field: 'DoorName', title: '位置', width: 497},
		    ]],
		    data:arr1
		  });
	});
}
//初始化监区门区
function getPrisonerDoor(){
	$.ajax({
		url:url+"/doorControlPrisoner/getInitPrisonerDoor",
		type:"post",
		data:{"thisHolderNo":window.top.holderno},
		success:function(data){
			$(".layui-card-body").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var image="<img src='image/closeDoor3.png' data-doorno="+item.doorNo+">";
					if(item.IOStatus=="2"){//开
						image="<img src='image/openDoor3.png' data-doorno="+item.doorNo+">";
					}
					var $li=$("<li class='layui-inline' data-doorno="+item.doorNo+"><h3 class='doorName layui-elip' title='"+item.doorName+"'>"+item.doorName+"</h3>" +
							image+"<div class='doorControl'><p><button class='layui-btn layui-btn-sm doorBg openDoor' data-doorno="+item.doorNo+">开门</button>" +
							"<button class='layui-btn layui-btn-sm doorBg closeDoor' data-doorno="+item.doorNo+">自控</button></p><p><button class='layui-btn layui-btn-sm doorBg longTimeOpen' data-doorno="+item.doorNo+">常开</button>" +
							"<button class='layui-btn layui-btn-sm doorBg longTimeClose' data-doorno="+item.doorNo+">常关</button></p></div></li>");
					$(".layui-card-body").append($li);
				}
			}
		}
	})
}

//获取标题
function getScreenFullTitle(){
	$.ajax({
		url:url+"/DictionaryData/getScreenFullTitle",
		type:"post",
		data:{"typeName":"screenFullTitle_B"},
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
		data:{"typeName":"screenFullTitle_B","value":value},
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
function getTime() {
	   var date = new Date();
	   var seperator1 = "/";
	   var year = date.getFullYear();
	   var month = date.getMonth() + 1;
	   var strDate = date.getDate();
	   var hour = date.getHours(); //得到小时
	   var minu = date.getMinutes(); //得到分钟
	   var sec = date.getSeconds(); //得到秒
	   if (hour < 10) hour = "0" + hour;
	   if (minu < 10) minu = "0" + minu;
	   if (sec < 10) sec = "0" + sec;
	   if (month >= 1 && month <= 9) {
	       month = "0" + month;
	   }
	   if (strDate >= 0 && strDate <= 9) {
	       strDate = "0" + strDate;
	   }
	   var myddy = date.getDay(); //获取存储当前日期
	   var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	   var currentdate = year + seperator1 + month + seperator1 + strDate+"("+weekday[myddy]+")";
	   var currentTime = hour + ":" + minu + ":" + sec;
	   return currentdate+""+currentTime;
}
