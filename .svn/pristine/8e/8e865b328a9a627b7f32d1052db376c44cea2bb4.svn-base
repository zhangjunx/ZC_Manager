$(function() {
	queryModelList();
})//end
//点击模块
$(document).on("click","ul.model li",function(){
	var id=$(this).attr("data-id");
	if($(this).hasClass("current")){
		$(this).removeClass("current");
		//取消
		var obj={"limitStatus":0,"ID":id};
		updateMenuPublicLimit(obj)
	}else{
		$(this).addClass("current");
		//添加
		var obj={"limitStatus":1,"ID":id};
		updateMenuPublicLimit(obj)
	}
})
//点击勾选模块
function updateMenuPublicLimit(obj){
	$.ajax({
		url:url+"/menuPublic/updateMenuPublicLimit",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	})
}

function queryModelList(){//获取模块列表
	$.ajax({
		url:url+"/menuPublic/getList",
		type:"POST",
		dataType:"json",
		success:function(data){
			$(".model").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					if(item.publicLimit=="1"){
						var $li=$("<li class='current' data-id="+item.id+">"+item.MenuName+"</li>");
					}else if(item.publicLimit=="0"){
						var $li=$("<li data-id="+item.id+">"+item.MenuName+"</li>");
					}
					$(".model").append($li);
				}
			}
		}
	})
}//end
