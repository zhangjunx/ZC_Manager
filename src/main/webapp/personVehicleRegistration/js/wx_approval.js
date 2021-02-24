$(function(){
	//查询部门
	//queryApproveDeptList();
	initTree();
	//查询角色
	queryApproverRoleList();
	showHide();
	
})

//点击确定提交数据
$("#insertBtn").click(function(){
	//角色
	var code=$(".approval_role li.current").attr("data-code");
	var id=$(".approval_role li.current").attr("data-id");
	//审批人
	var arr=[];
	var str={"roleno":id,"rolecode":code,"arr":[]};
	for(var i=0;i<$(".approval_person li.cur").length;i++){
		var holderno=$(".approval_person li.cur").eq(i).attr("data-holderno");
		var holdername=$(".approval_person li.cur").eq(i).attr("data-holdername");
		var obj={"holderno":holderno,"holdername":holdername};
		str.arr.push(obj);
	}
	console.log(str);
	$.ajax({
		url:url+"/WX_Approver/insertApproverBatch",
		type:"POST",
		data:JSON.stringify(str),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:2000});
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
	
})


//点击移除 删除数据
$("#delBtn").click(function(){
	//角色
	var code=$(".approval_role li.current").attr("data-code");
	var id=$(".approval_role li.current").attr("data-id");
	//审批人
	var arr=[];
	var str={"rolecode":code,"arr":[]};
	for(var i=0;i<$(".approval_person li.cur").length;i++){
		var holderno=$(".approval_person li.cur").eq(i).attr("data-holderno");
		var holdername=$(".approval_person li.cur").eq(i).attr("data-holdername");
		var obj={"holderno":holderno,"holdername":holdername};
		str.arr.push(obj);
	}
	console.log(str);
	$.ajax({
		url:url+"/WX_Approver/deleteApproverBatch",
		type:"POST",
		data:JSON.stringify(str),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:2000});
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
	
})

//查询部门
function queryApproveDeptList(){
	$.ajax({
		url:url+"/DepartmentData/queryDeptList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			var res=data.result;
			$(".approval_dept").empty();
			if(data.flag){
				for(var item of res){
					var $li=$("<li data-deptno='"+item.departmentno+"'>"+item.departmentname+"</li>");
					$(".approval_dept").append($li);
				}
				
			}
		}
	})
}

/*//点击审批设置下的部门
$(document).on("click",".approval_dept li",function(){
	$(this).addClass("current").siblings().removeClass("current");
	var deptno=$(this).attr("data-deptno");
	console.log(deptno)
	queryHolderByDept(deptno);
})*/

//点击部门查人
function queryHolderByDept(deptno){
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/queryHolderListByDeptNo",
		type:"post",
		data:{"departmentno":deptno},
		dataType:"json",
		success:function(data){
			console.log(data);
			$(".approval_person").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderno==undefined)?"":item.holderno;
					var holdername=(item.holdername==undefined)?"":item.holdername;
					var departmentname=(item.departmentname==undefined)?"":item.departmentname;
					var $li=$("<li data-holderno='"+item.holderno
							+"' data-holdername='"+item.holdername+"'><div class='personPhoto'><img src='img/person.png'></div><div class='holderInfo'><p>工号:<span class='holderno'>"+holderno+"</span></p>" +
							"<p>姓名:<span class='holdername'>"+holdername
							+"</span></p><p>部门:<span>"+departmentname+"</span></p></div></li>");
					$(".approval_person").append($li);
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}


//点击审批设置下的审批人
$(document).on("click",".approval_person li",function(){
	if($(this).hasClass("cur")){
		var that=this;
		$(that).removeClass("cur");
		
	}else {
		$(this).addClass("cur")
	}
})


//点击角色查人
$(document).on("click",".approval_role li",function(){
	$(this).addClass("current").siblings().removeClass("current");
	var code=$(this).attr("data-code");
	console.log(code);
	queryHolderByRole(code);
})


//点击角色查人
function queryHolderByRole(code){
	$.ajax({
		url:url+"/WX_Approver/queryHolderListByRoleCode",
		type:"post",
		data:{"rolecode":code},
		dataType:"json",
		success:function(data){
			console.log(data);
			$(".approval_person").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderno==undefined)?"":item.holderno;
					var holdername=(item.holdername==undefined)?"":item.holdername;
					var departmentname=(item.departmentname==undefined)?"":item.departmentname;
					var $li=$("<li class='cur' data-holderno='"+item.holderno+"' data-holdername='"+item.holdername+"'><div class='personPhoto'><img src='img/person.png'></div><div class='holderInfo'><p>工号:<span class='holderno'>"+holderno+"</span></p>" +
							"<p>姓名:<span class='holdername'>"+holdername+"</span></p><p>部门:<span>"+departmentname+"</span></p></div></li>");
					$(".approval_person").append($li);
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})	
}

//查询角色
function queryApproverRoleList(){
	$.ajax({
		url:url+"/DepartmentData/queryDeptList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			//console.log(data)
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var name=(item.departmentname==undefined?"":item.departmentname+"领导");
					var $li=$("<li data-code='"+item.departmentno+"'>"+name+"</li>");
					$(".approval_role").append($li);
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//初始化树菜单
function initTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:{"res":"true"},
		success:function(data){
			//console.log(data);
			if(!data.flag){
				layer.msg(data.reason,{"time":2000});
				return;
			}
			layui.use('tree', function(){
			    var tree = layui.tree;
			    //渲染
			    var inst1 = tree.render({
			        elem: '#DeptTree',
			        data: data.result,
			        onlyIconControl:true,
					click: function(obj){
						$(".layui-tree-txt").css("color","#555");
				    	$(obj.elem).find(".layui-tree-txt").eq(0).css("color","skyblue");
						console.log(obj.data.id);
						queryHolderByDept(obj.data.id);
					}
			    });
			});
		},
		error:function(data){
			
		}
	})
}

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertBtn").hide();
		$("#delBtn").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="6007"){
				list.push(item);
			}
			
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertBtn").show();
			}
			if(item.Code=="delete"){
				$("#delBtn").show();
			}
		}
	}
