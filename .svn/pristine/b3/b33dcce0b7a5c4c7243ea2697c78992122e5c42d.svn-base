$(function(){
	query(localStorage.id);
})

//查询
function query(id){
	$.ajax({
		url:url+"/LH_FaceRecogParam/getFaceParamList",
		type:"POST",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			$("#title2").val(data.result[0].title);
			$("#path2").val(data.result[0].path);
			$("#remark2").val(data.result[0].remark);
		}
	}) 
}
 
//点击修改弹出的确定按钮提交修改操作
$(document).on("click","#updateBtn",function(){
	var id=localStorage.id;
	var title=$("#title2").val();
	var path=$("#path2").val();
	var remark=$("#remark2").val();
	var obj={"id":id,"title":title,"path":path,"remark":remark}; 
	$.ajax({
		url:url+"/LH_FaceRecogParam/update",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000},function(){
				getList();
				page();
			});
		}
	})
})

//添加
$(document).on("click","#addBtn",function(){
	//先弹出新增页面，点确定再调用一下按钮
	var title=$("#title").val();
	var path=$("#path").val();
	var remark=$("#remark").val();
	var obj={"title":title,"path":path,"remark":remark}; 
	$.ajax({
		url:url+"/LH_FaceRecogParam/insert",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000},function(){
				getList();
				page();
			});
		}
	})
})

