$(function() {
	queryModelList(localStorage.modelcode);
	getPerm(localStorage.id)
})//end
//修改前获取值
//$("#code2").val(localStorage.code).css("background","#f2f2f2");



 
//修改
$("#updateBtn").click(function(){
	updateTitleData();
})//end
function updateTitleData(){//修改
	var id=localStorage.id;
	var code=$("#code2").val();
	var name=$("#name2").val();
	var modelno=$("#modelno2").val();
	var remark=$("#remark2").val();
	var obj={"id":id,"code":code,"name":name,"modelcode":modelno,"description":remark};
	console.log(obj)
	$.ajax({
		url:url+"/ACL_Permissions/update",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
		}
	})
}//end

 


//新增
$("#addBtn").click(function(){
	insertTitleData();
})//end
function insertTitleData(){//添加角色
	var code=$("#code").val();
	var name=$("#name").val();
	var modelno=$("#modelno").val();
	var remark=$("#remark").val();
	var obj={"code":code,"name":name,"modelcode":modelno,"description":remark};
	if(code.length==0 || name.length==0){
		layer.msg("带*号的不能为空！",{time:2000})
		return;
	}
	console.log(obj)
	$.ajax({
		url:url+"/ACL_Permissions/insert",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
		}
	})
}//end


//菜单列表
function queryModelList(mocode){
	$.ajax({
		url:url+"/ACL_ModelData/queryModelList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			//$("#modelno").empty();
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var modelname=(val.modelname==undefined?"":val.modelname);
				var modelcode=(val.modelcode==undefined?"":val.modelcode);
				html+="<option value='"+modelcode+"'>"+modelname+"</option>";
			})
			$("#modelno").append(html);
			$("#modelno2").append(html).val(mocode);
		}
	})
}

//菜单列表
function getPerm(id){
	$.ajax({
		url:url+"/ACL_MenuData/getPerm",
		type:"POST",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				//layer.msg(data.reason,{time:2000})
				return;
			}
			$("#code2").val(data.result.code);
			$("#name2").val(data.result.name);
			//$("#modelno2").val(data.result.modelno);
			//$("#modelno2 option").html(data.result.modelname);
			$("#remark2").val(data.result.remark);
		}
	})
}