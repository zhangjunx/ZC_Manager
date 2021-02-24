$(function() {
	getMenu(localStorage.id)
})//end
//修改前获取值
//$("#menucode2").val(localStorage.menucode).css("background","#f2f2f2");



//修改
$("#updateBtn").click(function(){
	update();
})//end
function update(){//修改
	var id=localStorage.id;
	var menucode=$("#menucode2").val();
	var menuname=$("#menuname2").val();
	var orderid=$("#orderid2").val();
	var remark=$("#remark2").val();
	var menupath=$("#menupath2").val();
	var menuimg=$("#menuimg2").val();
	var obj={"id":id,"menucode":menucode,"menuname":menuname,"menupath":menupath,"menuimg":menuimg,"orderid":orderid,"remark":remark};
	console.log(obj)
	$.ajax({
		url:url+"/ACL_MenuData/update",
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
	insert();
})//end
function insert(){//添加角色
	var menucode=$("#menucode").val();
	var menuname=$("#menuname").val();
	var orderid=$("#orderid").val();
	var remark=$("#remark").val();
	var menupath=$("#menupath").val();
	var menuimg=$("#menuimg").val();
	var obj={"menucode":menucode,"menuname":menuname,"menupath":menupath,"menuimg":menuimg,"orderid":orderid,"remark":remark};
	if(menucode.length==0 ){
		layer.msg("菜单编号不能为空！",{time:2000})
		return;
	}
	if(menuname.length==0){
		layer.msg("菜单名称不能为空！",{time:2000})
		return;
	}
	
	$.ajax({
		url:url+"/ACL_MenuData/insert",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
			if(!data.flag){
				return;
			}
			$("#menucode").val("");
			$("#menuname").val("");
			$("#orderid").val("");
			$("#remark").val("");
			$("#menupath").val("");
			$("#menuimg").val("");
		}
	})
}//end


//菜单列表
function getMenu(id){
	$.ajax({
		url:url+"/ACL_MenuData/getMenu",
		type:"POST",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				//layer.msg(data.reason,{time:2000})
				return;
			}
			$("#menucode2").val(data.result.menucode);
			$("#menuname2").val(data.result.menuname);
			$("#orderid2").val(data.result.orderid);
			$("#remark2").val(data.result.remark);
			$("#menupath2").val(data.result.menupath);
			$("#menuimg2").val(data.result.menuimg);
		}
	})
}