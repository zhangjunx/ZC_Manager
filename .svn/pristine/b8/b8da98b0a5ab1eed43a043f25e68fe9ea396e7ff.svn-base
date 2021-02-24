$(function(){
	queryVehicleIOMaxID();//查询车辆实时进出的最大id值maxid
	queryDoorUnitList();//查询门区
	//实时进出记录
	//queryVehicleCurrIORecordList();
	//定时器
	var timer=setInterval(function(){queryVehicleCurrIORecordList()},1000);
	//点击实时刷新
	$(".subbtn span.checkbox").click(function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			clearInterval(timer);
		}else{
			$(this).addClass("curr");
			timer=setInterval(function(){queryVehicleCurrIORecordList()},1000);
		}
	})
})	

//点击刷新清屛
$(".refreshScreen").click(function(){
	$("#cont").empty();
})
//实时进出记录
function queryVehicleCurrIORecordList(){
	$.ajax({
		url:url+"/LPR_VehicleIOData/queryVehicleCurrIORecordList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var vehicleuse=(val.vehicleuse==undefined?"":val.vehicleuse);
				var userunit=(val.userunit==undefined?"":val.userunit);
				var vehicletype=(val.vehicletype==undefined?"":val.vehicletype);
				var license=(val.license==undefined?"":val.license);
				var lprtype=(val.lprtype==undefined?"":val.lprtype);
				var vehiclecolor=(val.vehiclecolor==undefined?"":val.vehiclecolor);
				var rclocation=(val.rclocation==undefined?"":val.rclocation);
				var iodate=(val.iodate==undefined?"":val.iodate);
				var iotime=(val.iotime==undefined?"":val.iotime);
				var iodatastatus=(val.iodatastatus==undefined?"":val.iodatastatus);
				var photograph=(val.photograph==undefined?"":val.photograph);
				if(iodatastatus==12){
					iodatastatus="外出";
				}else if(iodatastatus==11){
					iodatastatus="进入";
				}else{
					iodatastatus="无效刷卡";
				} 
				if(photograph.length==0){
					var p="<img src='img/che.png' style='width:86px;height:86px;'>";
				}else{
					var p="<img src='data:image/png;base64,'+photograph style='width:86px;height:86px;'>";
				}
				html+="<tr><td>"+(i+1)+"</td><td>"+vehicleuse+"</td><td>"+userunit+"</td><td>"+p
				+"</td><td>"+license+"</td><td>"+iodate
				+"</td><td>"+iotime+"</td><td>"+rclocation+"</td><td>"+iodatastatus
				+"</td><td><a href='javascript:;' data-license='"+license+"' data-id='"+id+"' " +
				"data-vehicleuse='"+vehicleuse+"' " +
				"data-userunit='"+userunit+"' class='layui-btn layui-btn-xs prevRecord'>上一条记录</a></td></tr>";
			})
			$("#cont").prepend(html);//在父级最前面追加一个子元素
		}
	})
}//end
	
	//点击上一条记录
	$(document).on("click",".prevRecord",function(){
		var license=$(this).attr("data-license");
		var id=$(this).attr("data-id");
		var vehicleuse=$(this).attr("data-vehicleuse");
		var userunit=$(this).attr("data-userunit");
		var obj={"license":license,"id":id};
		console.log(obj);
		$.ajax({
			url:url+"/LPR_VehicleIOData/queryVehicleLastIORecord",
			type:"POST",
			data:JSON.stringify(obj),
			//data:obj,
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				console.log(data);
				//$(".layer_bottom").empty();
				if(!data.flag){
					$(".layer_bottom").empty().html("暂无记录");
					$(".realTime_cover").fadeIn(500);
					$(".realTime_layer").fadeIn(500);
					return;
				}
				//var vehicleuse=(data.result.vehicleuse==undefined?"":data.result.vehicleuse);
				//var userunit=(data.result.userunit==undefined?"":data.result.userunit);
				var license=(data.result.license==undefined?"":data.result.license);
				var iodatastatus=(data.result.iodatastatus==undefined?"":data.result.iodatastatus);
				var iodate=(data.result.iodate==undefined?"":data.result.iodate);
				var iotime=(data.result.iotime==undefined?"":data.result.iotime);
				var photograph=(data.result.photograph==undefined?"":data.result.photograph);
				if(iodatastatus==11){
					iodatastatus="进入";
				}else if(iodatastatus==12){
					iodatastatus="外出";
				}else{
					iodatastatus="无效刷卡";
				}
				if(photograph.length==0){
					var p1="<img src='img/che.png' alt='暂无图片' class='bottom_l' id='photo' style='opacity:1;margin-top: 40px;height: 100px;'>";
				}else{
					var p1="<img src='data:image/png;base64,"+photograph+"' alt='暂无图片' class='bottom_l' id='photo' style='opacity:1;margin-top: 40px;height: 100px;'>";
				}
				var html=p1+"<div class='bottom_r'><p>车主姓名:<span class='vehicleUse'>"+vehicleuse+"</span></p>" +
				"<p>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:<span class='deptname'>"+userunit+"</span></p>" +
				"<p>车牌号码:<span class='license'>"+license+"</span></p>" +
				"<p>进出状态:<span class='iostatus'>"+iodatastatus+"</span></p>" +
				"<p>进出日期:<span class='iodate'>"+iodate+"</span></p>" +
				"<p>进出时间:<span class='iotime'>"+iotime+"</span></p></div>";
				
				$(".realTime_cover").fadeIn(500);
				$(".realTime_layer").fadeIn(500);
				$(".layer_bottom").html(html);
				
			}
			
		})
	})
	
	//点击背景
	$(".realTime_cover").click(function(){
		$(".realTime_cover").fadeOut(500);
		$(".realTime_layer").fadeOut(500);
	})
	//点击弹窗的叉
	$(".quxiao").click(function(){
		$(".realTime_cover").fadeOut(500);
		$(".realTime_layer").fadeOut(500);
	})
	//开门延时
$(".time_interval").change(function(){
	if($(this).val()>999){
		$(this).val("5");
		layer.msg("输入框最大数值为999");
	}
})

	//点击第一行门状态
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
	
})
	
function queryDoorUnitList(){//查询门区列表
		$.ajax({
			url:url+"/DeviceUnit/queryLPRDeviceList",
			type:"POST",
			success:function(data){
				$("#doorno").find("option:not(:first)").remove();
				console.log(data);
				if(!data.flag){
					return;
				}
				var html="";
				$.each(data.result,function(i,val){
					var deviceno=(val.deviceno==undefined?"":val.deviceno);
					var devicename=(val.devicename==undefined?"":val.devicename);
					html+="<option value='"+deviceno+"'>"+devicename+"</option>";
				})	 
				$("#doorno").append(html);
			}
		})	
}	
	
function queryVehicleIOMaxID(){//查询车辆实时进出的最大id值maxid
	$.ajax({
		url:url+"/LPR_VehicleIOData/queryVehicleIOMaxID",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			if(!data.flag){
				return;
			}
			var maxid=(data.result==undefined?0:data.result); 
		}
	})		
}	
	
