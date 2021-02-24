$(function(){
	//查询角色
	queryRoleList();
	showHide();//跟权限有关
	getDeptTree();
	 
})
//点击人员下的li、
$(document).on("click","#holder li",function(){
	if($(this).hasClass("cur")){
		$(this).removeClass("cur");
	}else{
		$(this).addClass("cur");
	}
})
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






//点击保存
$(".toolbar_save").click(function(){
	updateRoleIDBatch();//
})
function updateRoleIDBatch(){//给多个用户赋予角色  批量修改holderpower
	var roleid=$(".approval_role li.current").data("id");
	var arr=[];
	for(var i=0;i<$("#holder li").length;i++){
		if($("#holder li").eq(i).hasClass("cur")){
			var holderno=$("#holder li").eq(i).attr("data-holderno")
			var obj={
					"holderno":holderno,
					"roleid":roleid
			}
			arr.push(obj);
		}
	}
	console.log(JSON.stringify(arr))
	if(arr.length==0){
		layer.msg("请先选中角色和人员！",{time:2000});
		return;
	}
	$.ajax({
		url:url+"/ACL_Roles/updateRoleIDBatch?str="+window.top.holderno,
		type:"POST",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
		}
	})
}//end



//点击保存
$(".toolbar_remove").click(function(){
	removeBatch();//
})
function removeBatch(){//给多个用户赋予角色  批量修改holderpower
	var roleid=$("#Role tr.current").children().eq(1).attr("name");
	var arr=[];
	for(var i=0;i<$("#holder li").length;i++){
		if($("#holder li").eq(i).hasClass("cur")){
			var holderno=$("#holder li").eq(i).attr("data-holderno")
			var obj={
					"holderno":holderno,
					"roleid":roleid
			}
			arr.push(obj);
		}
	}
	console.log(JSON.stringify(arr))
	if(arr.length==0){
		layer.msg("请先选中角色和人员！",{time:2000});
		return;
	}
	$.ajax({
		url:url+"/ACL_Roles/removeBatch?str="+window.top.holderno,
		type:"POST",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
		}
	})
}//end


//点击角色查人
$(document).on("click",".approval_role li",function(){
	$(this).addClass("current").siblings().removeClass("current");
	var roleid=$(this).attr("data-id");
	getHolderListByRoleId(roleid);
})
function getHolderListByRoleId(roleid){
	$.ajax({
   	     url:url+"/ACL_Roles/getHolderListByRoleId",
	     type:"POST",
	     data:{"roleid":roleid},
	     dataType:'json',
	     success:function(data){
	    	 $("#holder").empty();
		    	if(!data.flag){
		    		layer.msg(data.reason,{time:2000});
		    		return;
		    	}
		    	var html="";
	   		    $.each(data.result,function(i,val){
					 var holdername=(val.holdername==undefined?"":val.holdername);
					 var holderno=(val.holderno==undefined?"":val.holderno);
					 var departmentname=(val.departmentname==undefined?"":val.departmentname);
					 html+="<li class='cur' data-holderno="+holderno
					 +"><div class='personPhoto'><img src='img/person.png'></div>" +
					 "<div class='holderInfo'><p>工号:<span class='holderno'>"+holderno
					 +"</span></p><p>姓名:<span class='holdername'>"+holdername
					 +"</span></p><p>部门:<span class='deptname'>"+departmentname
					 +"</span></p></div></li>";
	   	    	 })
	   		   $("#holder").append(html);
	     }
     })
}//end


//点击角色下的全选
$(".toolbar_selectAll").click(function(){
	$("#Role .checkbox").addClass("curr");
	$("#Role tr").addClass("current");
})
//点击角色下的清空
$(".toolbar_selectNone").click(function(){
	$("#Role .checkbox").removeClass("curr");
	$("#Role tr").removeClass("current");
})
//点击人员下的全选
$(".toolbar_all").click(function(){
	$("#holder li").addClass("cur");
})

//点击清空
$(".toolbar_empty").click(function(){
	$("#holder li").removeClass("cur");
})
//批量删除
$(".toolbar_del").click(function(){
	deleteACLRoleBatch();
})
function deleteACLRoleBatch(){
	var id="";
	for(var i=0;i<$(".approval_role li").length;i++){
		if($(".approval_role li").eq(i).hasClass("current")){
			id=$(".approval_role li").eq(i).data("id");
		}
	}
	if(id.length==0){
		layer.msg("请选择要删除的角色！");
		return;
	}
	var obj={"id":id};
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/ACL_Roles/deleteRoleData",
			type:"POST",
			data:obj,
			dataType:"json",
			//contentType:"application/json",
			success:function(data){
				layer.msg(data.reason,{time:2000});
				if(!data.flag){
					return;
				}
				//查询角色
				queryRoleList();
			}
		})
	})
}//end
//点击角色修改
$(document).on("click",".toolbar_update",function(){//修改
	if($(".approval_role li.current").length==0){
		layer.msg("请选择一个要修改的角色!",{time:2000});
	}else{
		var rolename=$(".approval_role li.current").html();
		$(".rolename_update").val(rolename);
	}
});
//点击修改输入框 回车事件
$('.rolename_update').bind('keyup', function(event) {
	　　if (event.keyCode == "13") {
	　　　　//回车执行查询
	　　　var rolename=$(".rolename_update").val();
		var reg =/^[^\s]*$/;
		if(rolename==""||!reg.test(rolename)){
			layer.msg("角色名不能为空!",{time:2000});
			return;
		}
		if($(".approval_role li.current").length==1){
			$(".approval_role li.current").html(rolename);
			var id=$(".approval_role li.current").data("id");
			$.ajax({
				url:url+"/ACL_Roles/updateRoleData",
				type:"POST",
				data:{"id":id,"name":rolename},
				success:function(data){
					if(data.flag){
						layer.msg(data.reason,{time:2000})
						
					}else{
						layer.msg(data.reason,{time:2000});
					}
				}
			})
		}
	　　}
});
//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$(".toolbar_add").hide();
	$(".toolbar_del").hide();
	$(".toolbar_update").hide();
	$(".toolbar_save").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="18003"){
			list.push(item);
			$(".toolbar_save").show();
			$(".toolbar_add").show();
			$(".toolbar_del").show();
			$(".toolbar_update").show();
		}
	})
	/*for(var item of list){
		if(item.Code=="add"){
			$(".toolbar_add").show();
		}
		if(item.Code=="delete"){
			$(".toolbar_del").show();
		}
		if(item.Code=="update"){
			$(".toolbar_update").show();
		}
		if(item.Code=="save"){
			$(".toolbar_save").show();
		}
	}*/
}//end



//获取部门数据
function getDeptTree(){
	layui.use(['tree', 'util'], function(){
		  var tree = layui.tree,
		  layer = layui.layer,
		  util = layui.util
		  $.ajax({
			  url:url+'/DepartmentData/getDeptTree',
			  type:'post',
			  dataType:'json',
			  data:{"res":"true"},
			  success:function(data){
				    tree.render({
				    elem: '#classtree',
				    data:  data.result,
				    id: 'demoId1',
				    isJump: true ,//是否允许点击节点时弹出新窗口跳转
				    click: function(obj){
				    	$(".layui-tree-txt").css("color","#555");
				    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");
						queryHolderByDept(obj.data.id);
				    },
				/*    oncheck: function(obj){
			        	  var arrlist=[];
						  for(var i=0;i<$(".layui-form-checked").length;i++){
					  	  var id=$(".layui-form-checked").eq(i).parent().parent().parent().attr("data-id");
					  	  arrlist.push(id);
					    }
						 layui.use(['tree','util'],function(){
							 var tree=layui.tree,
							 layer=layui.layer,
							 util=layui.util
							 $.ajax({
						    	url:url+"/DepartmentData/getHolderByDeptBatch",
							     type:"POSt",
							     dataType:"json",
							     data:JSON.stringify(arrlist),
							     contentType:"application/json", // 指定这个协议很重要
							     success:function(data){
							    	 var arr=[];
							    	 for(var i=0;i<$("#holder li.cur").length;i++){
							    		 var holderno=$("#holder li.cur").eq(i).attr("data-holderno");
							    		 arr.push(holderno);
							    	 }
							    	 $("#holder").empty();
								    	if(!data.flag){
								    		//layer.msg(data.reason,{time:2000});
								    		return;
								    	}
								    	var html="";
							   		    $.each(data.result,function(i,val){
											 var holdername=(val.holdername==undefined?"":val.holdername);
											 var holderno=(val.holderno==undefined?"":val.holderno);
											 html+="<li data-holderno="+holderno
											 +"><div class='personPhoto'><img src='img/person.png'></div>" +
											 "<div class='holderInfo'><p>工号:<span class='holderno'>"+holderno+"</span></p>" +
											 "<p>姓名:<span class='holdername'>"+holdername+"</span></p></div></li>";
							   	    	 })
							   		   $("#holder").append(html);
							   		    for(var item of arr){
							   		    	$("#holder li[data-holderno="+item+"]").addClass("cur");
							   		    }
							     }
						      })
							 
						 })
						     
					  }*/
				  });
			  }
		  })
	})
}


//点击部门查人
function queryHolderByDept(deptno){
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/queryHolderListByDeptNo",
		type:"post",
		data:{"departmentno":deptno},
		dataType:"json",
		success:function(data){
			console.log(data);
			var arr=[];
	    	 for(var i=0;i<$("#holder li.cur").length;i++){
	    		 var holderno=$("#holder li.cur").eq(i).attr("data-holderno");
	    		 arr.push(holderno);
	    	 }
			$("#holder").empty();
	    	if(!data.flag){
	    		layer.msg(data.reason,{time:2000});
	    		return;
	    	}
	    	var html="";
   		    $.each(data.result,function(i,val){
				 var holdername=(val.holdername==undefined?"":val.holdername);
				 var holderno=(val.holderno==undefined?"":val.holderno);
				 var departmentname=(val.departmentname==undefined?"":val.departmentname);
				 html+="<li data-holderno="+holderno
				 +"><div class='personPhoto'><img src='img/person.png'></div>" +
				 "<div class='holderInfo'><p>工号:<span class='holderno'>"+holderno
				 +"</span></p><p>姓名:<span class='holdername'>"+holdername
				 +"</span></p><p>部门:<span class='deptname'>"+departmentname
				 +"</span></p></div></li>";
   	    	 })
   		   $("#holder").append(html);
   		  for(var item of arr){
		    	$("#holder li[data-holderno="+item+"]").addClass("cur");
		    }
		}
	})
}


//部门下拉树初始化
/*function getDeptTree1(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		data:{"res":"true"},
		dataType:'json',//数据类型
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        showCheckbox: true,  //是否显示复选框
			        click: function (node) {
			        	var id=node.data.id;
			        	console.log(id)
			            queryHolderDataListByDepartmentNo(node.data.id);
			        }
			    });
			});
		
		},
		error:function(data){}
	})
}*/

/*//根据部门查询人员
function queryHolderDataListByDepartmentNo(deptno){
	$.ajax({
		url:url+'/HolderData/queryHolderDataListByDepartmentNo',
		type:"post",
		data:{"departmentno":deptno},
		success:function(data){
			console.log(data)
			 $("#holder").empty();
		    	if(!data.flag){
		    		layer.msg(data.reason,{time:2000});
		    		return;
		    	}
		    	var html="";
	   		    $.each(data.result,function(i,val){
					 var holdername=(val.holdername==undefined?"":val.holdername);
					 var holderno=(val.holderno==undefined?"":val.holderno);
					 html+="<li data-holderno="+holderno+"><img src='img/g.png'><div><p class='layui-elip'>"+holdername+"</p><p>"+holderno+"</p></div></li>";
	   	    	 })
	   		   $("#holder").append(html);
		}
	})
}*/
