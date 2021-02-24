$(function(){
	//树形数据
	getMenuTree();
	//查询角色
	queryRoleList();
	showHide();//跟权限有关

})//end

// 点击全选
$(".toolbar_all").click(function() {
	var loadIndex = layer.load(1,{
		shade:[0.1,"#fff"]
	});
	//最里层的复选框如果被选中，就点击一次
	for(var i=0;i<$(".layui-icon-file").length;i++){
		if($(".layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")!=true){
			$(".layui-icon-file").eq(i).parent().next().next().click();
		}
	}
	layer.close(loadIndex);
})
// 点击清空
$(".toolbar_empty").click(function() {
	var loadIndex = layer.load(1,{
		shade:[0.1,"#fff"]
	});
	//最里层的复选框如果被选中，就点击一次
	for(var i=0;i<$(".layui-icon-file").length;i++){
		if($(".layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")==true){
			$(".layui-icon-file").eq(i).parent().next().next().click();
		}
	}
	layer.close(loadIndex);
})

//点击保存
$(".toolbar_save").click(function(){
	insertRolePermBatch();
})
function insertRolePermBatch(){//批量添加 给角色添加权限
	var roleid=$(".current").children().eq(1).html();
	var arr=[];
		for(var k=0;k<$(".layui-form-checked").length;k++){
		if($(".layui-form-checked").eq(k).siblings().eq(0).children().hasClass("layui-icon-file")){
			var id=$(".layui-form-checked").eq(k).prev().attr("value");
			if(id.substring(0,1)=='p' && id.indexOf("p")!=-1){
				id=id.substr(1);
				var obj={roleId:roleid,
						permissionId:id,
				}
				arr.push(obj);
			}
			
		}
	}
	if(roleid==undefined || arr.length==0){
		layer.msg("请先选择角色和功能！",{time:2000})
		return;
	}
	console.log(JSON.stringify(arr))
	$.ajax({
		url:url+"/ACL_Roles_Permissions/insertRolePermBatch",
		type:"POST",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000})
		}
	})
}//end


//获取部门数据
function getMenuTree(){
	layui.use(['tree', 'util'], function(){
		  var tree = layui.tree,
		  layer = layui.layer,
		  util = layui.util
		  $.ajax({
			  //url:url+"/ACL_MenuData/getMenuTree",
			  url:url+"/ACL_MenuData/getMenuPermTree",
			  type:'post',
			  dataType:'json',
			  data:{"res":"true"},
			  success:function(data){
				  console.log(data)
				    tree.render({
				    elem: '#test1',
				    data:  data.result,
				    showCheckbox: true,  //是否显示复选框
				    id: 'demoId1',
				    isJump: true ,//是否允许点击节点时弹出新窗口跳转
				    click: function(obj){
				    },
				    oncheck: function(obj){
				    	 /* var arr=[];
			        	  var arrlist=[];
						  for(var i=0;i<$(".layui-form-checked").length;i++){
					  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
					  	  var name=$(".layui-form-checked").eq(i).siblings("span.layui-tree-txt").text();
					  	  arrlist.push(id);
					  	  arr.push(name);
						  }
						 console.log(JSON.stringify(arrlist))
						  console.log(JSON.stringify(arr))*/
					  }
				  });
			  }
		  })
		})
}

//查询角色
function queryRoleList(){
	$.ajax({
		url:url+"/ACL_Roles/queryRoleList",
		type:"POST",
		success:function(data){
			console.log(data)
			var res=data.result
			if(data.flag){
				for(var i=0;i<res.length;i++){
					var $td1=$("<td></td>");
					var $td2=$("<td></td>");
					var $td3=$("<td></td>");
					var $tr=$("<tr></tr>");
					var $span=$("<span class='checkbox'></span>");
					$td1.append($span);
					$td2.append(res[i].id);
					$td3.append(res[i].name);
					$tr.append($td1);
					$tr.append($td2);
					$tr.append($td3);
					$("#Role").append($tr);
				}
			}
		}
	})
}//end


$(document).on("click","#Role tr",function(){	
	$(".checkbox").removeClass("curr");
	$(this).addClass("current").siblings().removeClass("current");
	if ($(this).hasClass("current")) {
		$(this).children().find(".checkbox").addClass("curr");
	} else {
		$(this).children().find(".checkbox").removeClass("curr");
	}
	//最里层的复选框如果被选中，就点击一次
	for(var i=0;i<$(".layui-icon-file").length;i++){
		if($(".layui-icon-file").eq(i).parent().next().next().hasClass("layui-form-checked")==true){
			$(".layui-icon-file").eq(i).parent().next().next().click();
		}
	}
	var roleid=$(this).children().eq(1).html();
	queryPermTreeListByRoleId(roleid);
})

function queryPermTreeListByRoleId(roleid){
	var loadIndex = layer.load(1,{
		shade:[0.1,"#fff"]
	});
	var obj={"roleId":roleid};
	$.ajax({
		url:url+"/ACL_Roles_Permissions/queryPermTreeListByRoleId",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				layer.close(loadIndex);
				layer.msg(data.reason,{time:2000});
				return;
			}
			var res=data.result;
			//数组中的对象去重
			var hash = {}; 
			res = res.reduce((preVal, curVal) => {
				hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal); 
				return preVal 
			}, [])
			//根据最里层复选框判断id是否相等
			for(var i=0;i<$(".layui-icon-file").length;i++){
				var perssionid=$(".layui-icon-file").eq(i).parent().next().attr("value");
				if(perssionid.indexOf("p")!=-1){
					perssionid=perssionid.substr(1);
				}
				for(var k=0;k<res.length;k++){
					if(perssionid==res[k].id){
						$(".layui-icon-file").eq(i).parent().next().next().click();
					}
				}
			}
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
		if(item.ModelCode=="18004"){
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

