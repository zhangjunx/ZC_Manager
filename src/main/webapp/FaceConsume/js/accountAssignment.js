$(function(){
	//获取消费模式列表
	getConsumeTypeList();
	//获取账户列表
	getAccountRoleList("");
})
//点击消费模式下的li选项
$(document).on("click",".face_resturant li",function(){
	if($(this).hasClass("current")){
		$(this).removeClass("current");
		getAccountRoleList("");
	}else{
		$(".face_resturant li").removeClass("current");
		$(this).addClass("current");
		var fid=$(this).attr("data-fid");
		getAccountRoleList(fid);
	}
})

//点击账户下的li选项
$(document).on("click",".face_terminal li",function(){
	if($(".face_resturant li.current").length==0){
		layer.msg("请先选择一个消费模式!",{time:2000});
		return;
	}
	var consumeRoleID=$(".face_resturant li.current").attr("data-fid");
	var holderAccountID=$(this).attr("data-fid");
	var holderno=$(this).attr("data-holderno");
	if($(this).hasClass("current")){
		$(this).removeClass("current");
		updateConsumeTypeID(consumeRoleID,2,holderAccountID,holderno);
	}else{
		$(this).addClass("current");
		updateConsumeTypeID(consumeRoleID,1,holderAccountID,holderno);
	}
})

//消费模式分配或取消账户
function updateConsumeTypeID(consumeRoleID,optType,holderAccountID,holderno){
	$.ajax({
		url:url+"/holderAccount/updateConsumeTypeID",
		type:"post",
		data:{"consumeRoleID":consumeRoleID,"optType":optType,"holderAccountID":holderAccountID},
		success:function(data){
			console.log(data);
			if(data.flag){
				if(optType==1){
					synchroPerson(holderno);
				}
			}else{
				layer.msg("绑定失败!",{time:2000});
			}
		}
	})
}
//同步信息到设备上
function synchroPerson(holderno){
	$.ajax({
		url:url+"/facePay/synchroPerson",
		type:"post",
		data:{"holderNo":holderno},
		success:function(data){
			console.log(data);
			if(!data.flag){
				layer.msg("绑定失败!",{time:2000});
			}
		}
	})
}


//获取所有的消费模式
function getConsumeTypeList(){
	$.ajax({
		url:url+'/consumeType/getConsumeTypeList',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			console.log(data)
			$("#consumptionPattern").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $li=$("<li data-fid="+item.fid+">"+item.consumeName+"</li>");
					$("#consumptionPattern").append($li);
				}
			}
		}
	})
}

//获取账户列表
function getAccountRoleList(consumeRoleID){
	$.ajax({
		url:url+'/holderAccount/getAccountRoleList',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:{"consumeRoleID":consumeRoleID},
		success:function(data){
			console.log(data)
			$("#accounts").empty();
			if(data.flag){
				var res=data.result;
				if(consumeRoleID==""){
					for(var item of res){
						var holdername=item.holderName==undefined?"":item.holderName;
						var $li=$("<li data-fid="+item.fid+" data-holderno="+item.holderNo+">"+holdername+"</li>");
						$("#accounts").append($li);
					}
				}else{
					for(var item of res){
						var holdername=item.holderName==undefined?"":item.holderName;
						if(item.resultType==2){//可以被选择
							var $li=$("<li class='layui-elip' data-holderno="+item.holderNo+" title="+holdername+" data-fid="+item.fid+" data-resulttype="+item.resultType+">"+holdername+"</li>");
						}else if(item.resultType==1){//已经被选择
							var $li=$("<li class='layui-elip current' data-holderno="+item.holderNo+" title="+holdername+" data-fid="+item.fid+" data-resulttype="+item.resultType+">"+holdername+"</li>");
						}
						$("#accounts").append($li);
					}
				}
			}
		}
	})
}