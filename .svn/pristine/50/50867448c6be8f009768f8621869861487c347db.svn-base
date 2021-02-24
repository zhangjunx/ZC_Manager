$(function(){	
	//查询进出数据
	queryMaxDataNo();//查询最大值maxdatano
	//queryIOCurrRecordList();
	
	//queryDoorUnitList();//查询门区
	var timer=setInterval(queryIOCurrRecordList,2000);
	var maxdatano;
	getDoorTree();
})

//点击开门
$("#openDoor").click(function(){
	var doorno=$("#doorno").val();
	var deviceno=$("#doorno").attr("data-deviceno");
	var doorname=$("#doorname").html();
	var iodate=getNowTime(0);
	var iotime=getNowTime(1);
	if(doorno==""){
		layer.msg("请先选择门区!",{time:2000});
		return;
	}
	layer.confirm("确定开门?",function(index){
		layer.close(index);
		$.ajax({
			url:url+"/Apple/ReceiveDoorOpenInstruction",
			type:"POST",
			data:JSON.stringify({"DoorNo":doorno,"OpenTime":"5"}),
			contentType:"application/json",
			success:function(data){
				console.log(data)
				if(!data.flag){
					layer.msg(data.reason,{time:2000});
					return;
				}
				layer.msg(data.reason,{time:1000});
				/*var obj={"holderno":window.top.holderno,"holdername":window.top.holdername,"deptno":window.top.deptno,"iostatus":"11",
						"deviceno":deviceno,"doorno":doorno,"doorname":doorname,"iodate":iodate,"iotime":iotime,"opentype":"9","opentypename":"电脑控制"};
				*/
				var obj={"holderno":window.top.holderno,"holdername":window.top.holdername,"deptno":window.top.deptno,"iostatus":"11",
						"deviceno":deviceno,"doorno":doorno,"doorname":doorname,"opentype":"9","opentypename":"电脑控制"};
				
				console.log(obj)
				$.ajax({
					url:url+"/appeme/AppletOpen",
					type:"POST",
					data:obj,
					dataType:"json",
					success:function(data){
						console.log(data)
						if(!data.flag){
							layer.msg(data.reason,{time:2000});
							return;
						}
					}
				})
			}
		})
	})
	
})

function getNowTime(iodate){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	var hour=date.getHours();
	var minute=date.getMinutes();
	var seconds=date.getSeconds();
	if(month<10){
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
	if(hour<10){
		hour="0"+hour;
	}
	if(minute<10){
		minute="0"+minute;
	}
	if(seconds<10){
		seconds="0"+seconds;
	}
	if(iodate==0){
		return year+"-"+month+"-"+day;
	}else{
		return hour+":"+minute+":"+seconds;
	}
	
}


//开门延时
$(".time_interval").change(function(){
	if($(this).val()>999){
		$(this).val("5");
		layer.msg("输入框最大数值为999");
	}
})

//点击刷新清屏
$(".refreshScreen").click(function(){
	$("#cont").empty();
})



//实时刷新
$(".subbtn span.checkbox").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		clearInterval(timer);
	}else{
		$(this).addClass("curr");
		timer=setInterval(queryIOCurrRecordList,2000);
	}
})
function queryIOCurrRecordList(){
	$.ajax({
		url:url+"/IOData/queryIOCurrRecordListByMaxDataNo",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			//$("#cont").empty();
			if(!data.flag){
				return;
			}
			var html="";
			var status="";
			$.each(data.result,function(i,val){
				var datano=(val.datano==undefined?"":val.datano);
				var holderno=(val.holderno==undefined?"":val.holderno);
				var holdername=(val.holdername==undefined?"":val.holdername);
				var doorname=(val.doorname==undefined?"":val.doorname);
				var iodate=(val.iodate==undefined?"":val.iodate);
				var iotime=(val.iotime==undefined?"":val.iotime);
				var iostatus=(val.iostatus==undefined?"":val.iostatus);
				var deptno=(val.deptno==undefined?"":val.deptno);
				var deptname=(val.deptname==undefined?"":val.deptname);
				var uid=(val.uid==undefined?"":val.uid);
				var cardno=(val.cardno==undefined?"":val.cardno);
				//var deviceno=(val.deviceno==undefined?"":val.deviceno);
				var devicename=(val.devicename==undefined?"":val.devicename);
				var dataphoto=(val.dataphoto==undefined?"":val.dataphoto);
				var iophoto=(val.iophoto==undefined?"":val.iophoto);
				var openType=(val.opentype==undefined?"":val.opentype);
				var temperatures=(val.temperatures==undefined?"":val.temperatures);
				if(iostatus==11){
					status="进入";
				}else if(iostatus==12){
					status="外出";
				}else if(iostatus==18){
					status="补打卡进入";
					openType="<img src='../img/buka.png'>";
				}else if(iostatus==19){
					status="补打卡外出";
					openType="<img src='../img/buka.png'>";
				}else{
					status="无效刷卡";
				}
				
				if(openType=="4"){//指纹
					openType="<img src='../img/zhiwen.png'>";
				}else if(openType=="2"){//人脸
					openType="<img src='../img/faceSb.png'>";
				}else if(openType=="1"){//刷卡
					openType="<img src='../img/shuKa.png' style='width:52px;height:52px'>";
				}else if(openType=="6"){//蓝牙
					openType="<img src='../img/bluetooth.png' style='width:52px;height:52px'>";
				}else if(openType=="9"){//电脑控制
					openType="<img src='../img/computer1.png'>";
				}else if(openType=="3"){//开门密码
					openType="<img src='../img/openDoorPassword.png' style='width:52px;height:52px'>";
				}else if(doorname=='公司中间门' && openType==undefined){
					openType="<img src='../img/twoCode.png' style='width:52px;height:52px'>";
				}
				
			     
				if(dataphoto.length==0){
					var p1="<img src='../img/person.png' style='width:56px;height:68px;'>";
				}else{
					var p1="<img src='data:image/png;base64,"+dataphoto+"' class='door_img' style='width:56px;height:68px;'>";
				}
				
				if(iophoto.length==0){
					var p2="<img src='../img/person.png' style='width:56px;height:68px;'>";
				}else{
					var p2="<img src='data:image/png;base64,"+iophoto+"' class='door_img' style='width:56px;height:68px;'>";
				}
				
				if(parseFloat(temperatures)<36.8){
					var txt=temperatures+"<img src='../img/green.png' style='width:20px'>";
				}else if(parseFloat(temperatures)>=36.8&&parseFloat(temperatures)<37.3){
					var txt=temperatures+"<img src='../img/yellow.png' style='width:20px'>";
				}else if(parseFloat(temperatures)>=37.3){
					var txt=temperatures+"<img src='../img/red.png' style='width:20px'>";
				}else {
					var txt="";
				}
				
				//判断是否是访客
                if(holderno.indexOf("V")!=-1){
                	console.log(holderno.indexOf("V"))
					var p1=p2;
					var p2="<img src='../img/person.png' style='width:56px;height:68px;'>";
				}
				html+="<tr><td>"+holderno+"</td><td>"+holdername+"</td><td>"+deptname
				+"</td><td>"+p1+"</td><td>"+p2+"</td><td>"
				+doorname+"</td><td>"+iodate+"</td><td>"+iotime
				+"</td><td>"+status+"</td><td>"+txt+"</td><td>"+uid+"</td><td>"
				+cardno+"</td><td>"+devicename+"</td><td>"+openType
				+"</td></tr>";
				
			})
			$("#cont").prepend(html);////在父级最前面追加一个子元素
		}
	})
}//end
 
//查询最大值maxdatano
function queryMaxDataNo(){
	$.ajax({
		url:url+"/IOData/queryMaxDataNo",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			//console.log(data);
			if(!data.flag){
				return;
			}
			maxdatano=data.result;
		}
	})
}

function queryDoorUnitList(){//查询门区列表
	$.ajax({
		//url:url+"/DoorUnit/queryDoorUnitList",
		url:url+"/DoorPermHolder/queryDoorListByHolder",
		//url:url+"/DoorPermHolder/getDoorTreeByHolder",
		type:"POST",
		data:{"holderno":window.top.holderno},
		dataType:"json",
		success:function(data){
			console.log(data);
			$("#doorno").find("option:not(:first)").remove();
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var doorno=(val.doorno==undefined?"":val.doorno);
				var doorname=(val.doorname==undefined?"":val.doorname);
				var deviceno=(val.deviceno==undefined?"":val.deviceno);
				html+="<option data-deviceno='"+deviceno+"' value='"+doorno+"'>"+doorname+"</option>";
			})	 
			$("#doorno").append(html);
		}
	})
}//end



//开门延时,点击加号
/*$(".delayed_add").click(function(){
	var time=$(".time_interval").val();
	time++;
	$(".time_interval").val(time);	
})
	//点击减号
$(".delayed_reduce").click(function(){
	var time=$(".time_interval").val();
	if(time<=0){
		return;
	}
	time--;
	$(".time_interval").val(time);	
})*/
		
	
	//鼠标经过照片的时候放大照片
$(document).on("mousemove","td .door_img",function(e){
	$("#bigPhoto").css("left",e.clientX+20+"px");
	$("#bigPhoto").css("top",e.clientY-200+"px");
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
	
	
/*	//点击第一行门状态
$(".doorControl").click(function(){
	if($(this).hasClass("current")){
		layer.confirm("取消"+$(this).html()+"?",function(index){
			layer.close(index);
		})
		$(this).removeClass("current");
	}else{
		layer.confirm("确定"+$(this).html()+"?",function(index){
			layer.close(index);
		})
		$(this).addClass("current").siblings().removeClass("current");
	}	
	
})*/
	
	//点击第二行紧急门状态
$(".doorStatus").click(function(){
	if($(this).hasClass("cur")){
		$(this).removeClass("cur");
	}else{
		$(this).addClass("cur").siblings().removeClass("cur");
	}	
})
	//点击群组，切换状态
$(".group").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr").siblings().removeClass("curr");
	}	
})	
	




//初始化树菜单
function getDoorTree(){
	$.ajax({
		//url:url+"/DoorUnit/getDoorTree",
		url:url+"/DoorPermHolder/getDoorTreeByHolder",
		data:{"holderno":window.top.holderno},
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			console.log(data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#doortree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node.data.id)
			        	var s=node.data.id.substring(0,1);
			        	if(s!="d"){
			        		layer.msg("对不起，您只能选择最底层的门区！",{time:2000});
			        		return;
			        	}
			        	$("#doorno").val(node.data.id.substring(1));
			        	$("#doorname").html(node.data.title);
			        	$("#doorno").attr("data-deviceno",node.data.deviceno);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='doorno']").val(node.id);
			        }
			    
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $(".layui-form-select").removeClass("layui-form-selected");
			    });
			});
		
		},
		error:function(data){}
	})
}






















