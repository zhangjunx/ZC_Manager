$(function(){
	getId();
})

function getId(){
	$.ajax({
		url:url+"/WX_VisitorsReasonType/queryMaxId",
		type:"POST",
		dataType:"json",
		contentType:"application/json",//必须
		success:function(data){
			console.log(data);
			$("#id").val(data.result);
		}
	})
}


//点击确定提交数据
$("#addBtn").click(function(){
	var name=$("#name").val();
	var note=$("#note").val();
	if(name==""){
		layer.msg("请填写事由内容!",{time:2000});
		return;
	}
	var obj={"name":name,"note":note};
	console.log(obj)
	$.ajax({
		url:url+"/WX_VisitorsReasonType/insertVisitorsReasonType",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			if(data.flag){
				$("#name").val("");
				$("#note").val("");
				layer.msg(data.reason,{time:2000},function(){
					window.location.reload();
				});
				
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
	
})

