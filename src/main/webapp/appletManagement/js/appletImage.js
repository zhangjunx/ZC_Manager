$(function(){
	initAccount();
	$(".uploadImage").css("display","none");
})
//点击保存
$(".toolbar_save").click(function(){
	saveInfo();
})

//点击角色查人
$(document).on("click",".approval_role li",function(){
	$(this).addClass("current").siblings().removeClass("current");
	$(".uploadImage").css("display","inline-block");
	var accountid=$(this).attr("data-accountid");
	queryPhoto(accountid);
})
$(".addBox").click(function(e){
	if($(".approval_role li.current").length==0){
		layer.msg("请先选择账户!",{time:2000});
		return;
	}
})
$(document).on("change",".uploadImage",function(){
	var imgUrl = getObjectURL(this.files[0]);
	var $div=$("<div class='form-term fl clearfix space_box'>" +
	"<div class='img_box'><img src='"+imgUrl+"' class='img'></div></div>");
	$div.insertBefore($(".addBox"));
	saveInfo(this);
})
function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) {
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}//end

//双击删除图片
$(document).on("dblclick",".space_box",function(e){
	var that=this;
	var id=$(that).attr("data-id");
	layer.confirm("确定删除?",function(index){
		layer.close(index);
		$.ajax({
			url:url+"/manage/deleteOneAccountPhoto",
			type:"POST",
			data:{"id":id},
			success:function(data){
				layer.msg(data.reason,{time:2000});
				if(data.flag){
					$(that).remove();
				}
			}
		})
	})
})
//创建图片盒子
function createImgBox(){
	var $div=$("<div class='form-term fl clearfix space_box'>" +
			"<div class='img_box'><img src='' class='img'></div></div>");
	$div.insertBefore($(".addBox"));
}
function initAccount(){
	$.ajax({
		url:url+"/manage/queryAccountData",
		type:"POST",
		success:function(data){
			$(".approval_role").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $li=$("<li data-accountid='"+item.accountid+"'>"+item.corporatename+"</li>");	
					$(".approval_role").append($li);
				}
			}
		}
	})
}
function  saveInfo(that){
	var accountid=$(".approval_role li.current").attr("data-accountid");
	var formdata=new FormData();
	var file=that.files[0];
	formdata.append("accountid",accountid);
	formdata.append("photo",file);
	$.ajax({
		url:url+"/manage/appletHandlePhoto",
		type:"POST",
		data:formdata,
		dataType:"json",
		cache: false,//上传文件无需缓存
		contentType:false,//必须
		processData:false,//用于对data参数进行序列化处理 这里必须false
		success:function(data){
			if(data.flag){
				var accountid=$(".approval_role li.current").attr("data-accountid");
				queryPhoto(accountid);
			}
		}
	})
}
function queryPhoto(accountid){
	var  loadIndex = layer.load(1, {
        shade: [0.1, '#fff']
    });
	$.ajax({
		url:url+"/manage/queryAccountPhoto",
		type:"POST",
		data:{"accountid":accountid},
		success:function(data){
			layer.close(loadIndex);
			$(".space_box").remove();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $div=$("<div class='form-term fl clearfix space_box' data-id='"+item.id+"'>" +
							"<div class='img_box'><img src='data:image/png;base64,"+item.appletphoto+"' class='img'></div></div>");
					$div.insertBefore($(".addBox"));
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		},
		error:function(data){
			layer.close(loadIndex);
		}
	})
}