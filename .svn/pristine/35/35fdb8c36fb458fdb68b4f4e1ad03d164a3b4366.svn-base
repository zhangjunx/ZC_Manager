$(function(){
	//查询部门
	getDeptTree();
	//查询角色
	queryRoleList();
	showHide();//跟权限有关
})//end

//点击全选
$(".toolbar_all").click(function(){
	var loadIndex = layer.load(1,{
		shade:[0.1,"#fff"]
	});
	//最里层的复选框如果被选中，就点击一次
	for(var i=0;i<$(".layui-icon-file").length;i++){
		if($(".layui-icon-file").eq(i).parent().siblings().eq(1).hasClass("layui-form-checked")!=true){
			$(".layui-icon-file").eq(i).parent().siblings().eq(1).click();
		}
	}
	layer.close(loadIndex);
})

//点击清空
$(".toolbar_empty").click(function(){
	var loadIndex = layer.load(1,{
		shade:[0.1,"#fff"]
	});
	//最里层的复选框如果被选中，就点击一次
	for(var i=0;i<$(".layui-icon-file").length;i++){
		if($(".layui-icon-file").eq(i).parent().siblings().eq(1).hasClass("layui-form-checked")==true){
			$(".layui-icon-file").eq(i).parent().siblings().eq(1).click();
		}
	}
	layer.close(loadIndex);
})



//点击保存
$(".toolbar_save").click(function(){
	insertRoleDeptBatch();
})
function getParent(){
	var deptno=['004001'];
	var str=[];
	if(deptno.length>3){
		deptno=substring(0,3);
	}else{
		return deptno;
	}
}


function insertRoleDeptBatch(){//角色部门分配
	var arr=[];
	var str=[];
	var roleid=$(".approval_role li.current").data("id");
	for(var k=0;k<$(".layui-form-checked").length;k++){
	if($(".layui-form-checked").eq(k).siblings().eq(0).children().hasClass("layui-icon-file")){
		var id=$(".layui-form-checked").eq(k).parent().parent().parent().attr("data-id");
		for(var i=1;i<=id.length/3;i++){
			str.push(id.substring(0,3*i));
		}
	}
    }
	//将str去重复
	str=Array.from(new Set(str));
	for(var i=0;i<str.length;i++){
		var id=str[i];
		var obj={roleId:roleid,deptno:id}
		arr.push(obj);
	}
	console.log(arr)
	$.ajax({
		url:url+"/ACL_Roles_Dept/insertRoleDeptBatch",
		type:"POST",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}//end


//查询角色列表
function queryRoleList(){
	$.ajax({
		url:url+"/ACL_Roles/queryRoleList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			$(".approval_role").empty();
			var res=data.result
			if(data.flag){
				for(var i=0;i<res.length;i++){
					var $li=$("<li data-id='"+res[i].id+"'>"+res[i].name+"</li>");
					$(".approval_role").append($li);
				}
			}
		}
	})
}//end
$(document).on("click",".approval_role li",function(){
	$(this).addClass("current").siblings().removeClass("current");
	var roleId=$(this).attr("data-id");
	//最里层的复选框如果被选中，就点击一次
	for(var i=0;i<$(".layui-icon-file").length;i++){
		if($(".layui-icon-file").eq(i).parent().siblings().eq(1).hasClass("layui-form-checked")==true){
			$(".layui-icon-file").eq(i).parent().siblings().eq(1).click();
		}
	}
	queryACLRoleDeptListByRoleId(roleId);
})
//根据角色id   查询部门 查出的部门处于被选中状态
function queryACLRoleDeptListByRoleId(roleId){
	var loadIndex = layer.load(1,{
		shade:[0.1,"#fff"]
	});
	$.ajax({
		url:url+"/ACL_Roles_Dept/queryACLRoleDeptListByRoleId",
		type:"POST",
		data:{"roleId":roleId},
		dataType:"json",
		success:function(data){
			console.log(data);
			layer.close(loadIndex);
			var res=data.result;
			if(data.flag){
				//根据最里层复选框判断id是否相等
				for(var i=0;i<$(".layui-icon-file").length;i++){
					var perssionid=$(".layui-icon-file").eq(i).parent().parent().parent().parent().attr("data-id");
					for(var k=0;k<res.length;k++){
						if(perssionid==res[k].deptno){
							$(".layui-icon-file").eq(i).parent().siblings().eq(1).click();
						}
					}
				}
			}else{
				layer.msg(data.reason,{time:2000})
			}
		},
		error:function(data){
			layer.close(loadIndex);
		}
		
	})
}//end




//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$(".toolbar_save").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="18005"){
			list.push(item);
			$(".toolbar_save").show();
		}
	})
	/*for(var item of list){
		if(item.Code=="save"){
			$(".toolbar_save").show();
		}
	}*/
}//end
//部门下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		data:{"res":"true"},
		dataType:'json',//数据类型
		success:function(data){
			console.log(data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#dept",
			        data: data.result,
				    showCheckbox: true,
			    });
			});
		},
		error:function(data){}
	})
}



