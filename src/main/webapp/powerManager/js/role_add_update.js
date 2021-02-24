$(function(){
	console.log(localStorage.id)
});

$("#id2").val(localStorage.id);
$("#code2").val(localStorage.code);
$("#name2").val(localStorage.name);
$("#description2").val(localStorage.description);
 
//更新
$("#updateRoleDataBtn").click(function(){
	updateRoleData();
});
function updateRoleData(){//更新角色
	var id=localStorage.id;
	var code=$("#code2").val();
	var name=$("#name2").val();
	var description=$("#description2").val();
	var html={"id":id,"code":code,"name":name,"description":description};
	$.ajax({
		url:url+"/ACL_Roles/updateRoleData",
		type:"POST",
		data:html,
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:2000},function(){
					window.location.href="ACL_Role_Holderno.html";
				})
				
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}//end

//新增
$("#insertRoleBtn").click(function(){
	insertRoleData();
});
function insertRoleData(){//添加角色
	var code=$("#code").val();
	var name=$("#name").val();
	var description=$("#description").val();
	if(code.length==0 || name.length==0){
		layer.msg("带*号的不能为空！",{time:2000})
		return;
	}
	var html={"code":code,"name":name,"description":description};
	$.ajax({
		url:url+"/ACL_Roles/insertRoleData",
		type:"POST",
		data:html,
		success:function(data){
			
			if(data.flag){
				layer.msg(data.reason,{time:2000},function(){
					window.location.href="ACL_Role_Holderno.html";
				});
				
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}//end

 