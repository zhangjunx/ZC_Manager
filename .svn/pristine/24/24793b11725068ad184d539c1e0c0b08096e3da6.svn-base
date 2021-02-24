$(function() {
	queryMenuList(localStorage.menucode);
	getModel(localStorage.id);
})//end
//修改前获取值
//$("#modelno2").val(localStorage.id).css("background","#f2f2f2");


//修改
$("#updateBtn").click(function(){
	updateTitleData();
})//end
function updateTitleData(){//修改
	var id=localStorage.id;
	var modelcode=$("#modelcode2").val();
	var modelname=$("#modelname2").val();
	var menuno=$("#menuno2").val();
	var remark=$("#remark2").val();
	var modelpath=$("#modelpath2").val();
	var obj={"id":id,"modelcode":modelcode,"modelname":modelname,"modelpath":modelpath,"menucode":menuno,"remark":remark};
	console.log(obj)
	$.ajax({
		url:url+"/ACL_ModelData/update",
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
	var modelcode=$("#modelcode").val();
	var modelname=$("#modelname").val();
	var menuno=$("#menuno").val();
	var remark=$("#remark").val();
	var modelpath=$("#modelpath").val();
	var obj={"modelcode":modelcode,"modelname":modelname,"modelpath":modelpath,"menucode":menuno,"remark":remark};
	if(modelcode.length==0 ){
		layer.msg("模块编码不能为空！",{time:2000})
		return;
	}
	if(modelname.length==0){
		layer.msg("模块名称不能为空！",{time:2000})
		return;
	}
	console.log(obj)
	$.ajax({
		url:url+"/ACL_ModelData/insert",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
			if(!data.flag){
				return;
			}
			$("#modelcode").val("");
			$("#modelname").val("");
			$("#menuno").val("");
			$("#remark").val("");
			$("#modelpath").val("");
		}
	})
}//end

//菜单列表
function queryMenuList(mecode){
	$.ajax({
		url:url+"/ACL_MenuData/queryMenuList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			//$("#menuno").find("option:not first ").remove();
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var menuname=(val.menuname==undefined?"":val.menuname);
				var menucode=(val.menucode==undefined?"":val.menucode);
				html+="<option value='"+menucode+"'>"+menuname+"</option>";
			})
			$("#menuno").append(html);
			$("#menuno2").append(html).val(mecode);
		}
	})
}

//菜单列表
function getModel(id){
	$.ajax({
		url:url+"/ACL_MenuData/getModel",
		type:"POST",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			$("#modelcode2").val(data.result.modelcode);
			$("#modelname2").val(data.result.modelname);
			//$("#menuno2").val(data.result.menuno);
			//$("#menuno2 option").html(data.result.menuname);
			$("#remark2").val(data.result.remark);
			$("#modelpath2").val(data.result.modelpath);
			
		}
	})
}