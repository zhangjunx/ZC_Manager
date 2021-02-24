$(function(){
	initTree();
	queryHolderByDept("");
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
//点击部门查人
function queryHolderByDept(deptno){
	var index=layer.load(2);
	$.ajax({
		url:url+"/zcApproval/getApproverList",
		type:"post",
		data:{"departmentNo":deptno},
		dataType:"json",
		success:function(data){
			layer.close(index);
			$(".approval_person").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderNo==undefined)?"":item.holderNo;
					var holdername=(item.holderName==undefined)?"":item.holderName;
					var departmentname=(item.departmentName==undefined)?"":item.departmentName;
					var text="";
					if(item.ifApproverZC=="1"){
						text="cur";
					}
					var $li=$("<li class='"+text+"' data-holderno='"+holderno+"'><div class='personPhoto'><img src='img/person.png'></div><div class='holderInfo'><p>工号:<span class='holderno'>"+holderno+"</span></p>" +
							"<p>姓名:<span class='holdername'>"+holdername+"</span></p><p>部门:<span>"+departmentname+"</span></p></div></li>");
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
	var holderno=$(this).data("holderno");
	if($(this).hasClass("cur")){
		$(this).removeClass("cur");
		var obj={"optType":2,"holderNo":holderno};
		setApproverList(obj);
	}else {
		$(this).addClass("cur");
		var obj={"optType":1,"holderNo":holderno};
		setApproverList(obj);
	}
})
//设置或取消审批人
function setApproverList(obj){
	$.ajax({
		url:url+"/zcApproval/setApproverList",
		type:"post",
		data:obj,
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000});
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
						queryHolderByDept(obj.data.id);
					}
			    });
			});
		},
		error:function(data){
			
		}
	})
}
