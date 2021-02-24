$(function(){
	//获取餐厅数据
	getRestaurantList();
	//获取设备数据
	getDeviceList();
})
//点击餐厅下的li选项
$(document).on("click",".face_resturant li",function(){
	if($(this).hasClass("current")){
		$(this).removeClass("current");
		getDeviceList();
	}else{
		$(".face_resturant li").removeClass("current");
		$(this).addClass("current");
		var fid=$(this).attr("data-fid");
		getRestaurantListByFid(fid);
	}
})
//点击刷脸终端设备下的li选项
$(document).on("click",".face_terminal li",function(){
	if($(".face_resturant li.current").length==0){
		layer.msg("请先选择一个餐厅!",{time:2000});
		return;
	}
	var fid=$(".face_resturant li.current").attr("data-fid");
	var deviceno=$(this).attr("data-deviceno");
	if($(this).hasClass("current")){
		$(this).removeClass("current");
		apportionDevices(fid,2,deviceno);
	}else{
		$(this).addClass("current");
		apportionDevices(fid,1,deviceno);
	}
})
//餐厅分配或取消设备
function apportionDevices(fid,optType,deviceno){
	$.ajax({
		url:url+"/restaurant/apportionDevices",
		type:"post",
		data:{"restaurantID":fid,"optType":optType,"deviceNo":deviceno,"creator":window.top.holderno},
		success:function(data){
			console.log(data)
			if(data.flag){
				updateAddDevice(data.resultList,optType);
			}else{
				layer.msg("绑定失败!",{time:2000});
			}
		}
	})
}
function updateAddDevice(data,optType){
	$.ajax({
		url:url+"/facePayRecord/updateAddDevice",
		type:"post",
		data:{"data":data,"optType":optType},
		success:function(data){
			console.log(data);
		}
	})
}

//根据餐厅fid获取设备数据
function getRestaurantListByFid(fid){
	$.ajax({
		url:url+"/restaurant/getDeviceList",
		type:"post",
		data:{"restaurantID":fid},
		success:function(data){
			$(".face_terminal").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					if(item.resultType==1){//可选的设备
						var $li=$("<li class='layui-elip' title="+item.DeviceName+" data-deviceno="+item.DeviceNo+" data-resulttype="+item.resultType+">"+item.DeviceName+"</li>");
					}else if(item.resultType==2){//已被选中的设备
						var $li=$("<li class='layui-elip current'  title="+item.DeviceName+" data-deviceno="+item.DeviceNo+" data-resulttype="+item.resultType+">"+item.DeviceName+"</li>");
					}
					$(".face_terminal").append($li);
				}
			}
		}
	})
}


//获取餐厅列表
function getRestaurantList(){
	$.ajax({
		url:url+"/restaurant/getRestaurantList",
		type:"post",
		success:function(data){
			$(".face_resturant").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $li=$("<li data-fid="+item.fid+">"+item.RestaurantName+"</li>");
					$(".face_resturant").append($li);
				}
			}
		}
	})
}
//获取设备列表
function getDeviceList(){
	$.ajax({
		url:url+"/restaurant/getDeviceList",
		type:"post",
		success:function(data){
			$(".face_terminal").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $li=$("<li class='layui-elip' title="+item.DeviceName+" data-deviceno="+item.DeviceNo+" data-resulttype="+item.resultType+">"+item.DeviceName+"</li>");
					$(".face_terminal").append($li);
				}
			}
		}
	})
}