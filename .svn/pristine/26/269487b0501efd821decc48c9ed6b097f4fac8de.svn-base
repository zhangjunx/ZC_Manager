$(function(){
	$("#id").val(localStorage.id);
	$("#name").val(localStorage.name)
	$("#note").val(localStorage.note)
})

 

//点击确定提交数据
$("#updateBtn").click(function(){
	var id=$("#id").val();
	var name=$("#name").val();
	var note=$("#note").val();
	var obj={"id":id,"name":name,"note":note};
	console.log(obj)
	$.ajax({
		url:url+"/WX_VisitorsReasonType/updateVisitorsReasonType",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000},function(){
				window.location.reload();
			});
		}
	})
	
})

