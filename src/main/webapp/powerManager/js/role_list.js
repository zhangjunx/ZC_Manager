$(function(){
	queryRoleList();
	getPage();
	showHide();//跟权限有关
});
var page;//当前页码
var limit;//每页显示数
var total;//总页数
//分页
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,//数据总数，从服务端得到
			limit:limit,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;//每页显示数
				if(!first){
					queryRoleList();
				}
			}
		})
	})
}//end
//条件查询
$(document).on("click","#queryRoleListByConditionBtn",function(){
	queryRoleList();
	getPage();
})
function queryRoleList(){//查询角色列表
	var name=$("#name1").val();
	var obj={"name":name,"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/ACL_Roles/queryRoleListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,//很重要
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				total=0;
				return;
			}
			page=data.pageinfo.pageIndex;
			limit=data.pageinfo.pageSize;
			total=data.pageinfo.sumCount;
				var html="";
				var text="";
				var text1="";
				if(window.top.arr.findIndex(target=>target.Code=="updateRoleData")==-1&&window.top.arr.length!=0){
					 text="";
				  }else {
					 text="<a href='role_update.html'  class='mo layui-btn layui-btn-xs'>修改</a>";
				  }
				 
				 if(window.top.arr.findIndex(target=>target.Code=="deleteRoleData")==-1&&window.top.arr.length!=0){
					 text1="";
				  }else {
					 text1="<a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
				  }
				$.each(data.result,function(i,val){
					var id=(val.id==undefined?"":val.id);
					var code=(val.code==undefined?"":val.code);
					var name=(val.name==undefined?"":val.name);
					var description=(val.description==undefined?"":val.description);
					html+="<tr><td class='no-print'><span class='checkbox ' style='float:none' name='"+id+"'></span></td><td>"+code+"</td><td>"+name+"</td><td>"+description
					+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
				})
				$("#cont").append(html);
		}
	})
}//end


//删除
$(document).on("click",".shan",function(){//删除角色
	var id=$(this).parent().siblings().eq(0).find("span.checkbox").attr("name");
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/ACL_Roles/deleteRoleData",
			type:"POST",
			data:{"id":id},
			success:function(data){
				layer.msg(data.reason,{time:2000});
				if(!data.flag){
					return;
				}
				window.location.reload();//执行成功后刷新当前页面
			}
		})
	})
	
})//end

//批量删除
$(".delMain").click(function(){
	deleteACLRoleBatch();
})
function deleteACLRoleBatch(){
	var arr=[];
	var cks=$("#cont").children().find("span.curr");
	for(var i=0;i<cks.length;i++){
		var id=cks.eq(i).attr("name");
		var obj={"id":id};
		arr.push(obj);
	}
	if(arr.length==0){
		layer.msg("请选择要删除的行！");
		return;
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/ACL_Roles/deleteRoleDataBatch",
			type:"POST",
			data:JSON.stringify(arr),
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				layer.msg(data.reason,{time:2000});
				if(!data.flag){
					return;
				}
				window.location.reload();
			}
		})
	})
	
}//end

//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#insertRoleData").hide();
	$("#deleteRoleData").hide();
	$("#exportRoleData").hide();
	$("#printRoleData").hide();
	arrList.forEach(item=>{
		if(item.Code=="insertRoleData"){
			$("#insertRoleData").show();
		}
		if(item.Code=="deleteRoleData"){
			$("#deleteRoleData").show();
		}
		if(item.Code=="exportRoleData"){
			$("#exportRoleData").show();
		}
		if(item.Code=="printRoleData"){
			$("#printRoleData").show();
		}
	})
}//end


//修改
$("#description1").val(localStorage.description);
$(document).on("click",".mo",function(){//修改
	var id=$(this).parent().siblings().eq(0).find("span").attr("name");
	var code=$(this).parent().siblings().eq(1).html();
	var name=$(this).parent().siblings().eq(2).html();
	var description=$(this).parent().siblings().eq(3).html();
	localStorage.id=id;
	localStorage.code=code;
	localStorage.name=name;
	localStorage.description=description;
});

//复选框
$(document).on("click",".checkbox",function(){
	if($(this).attr("id")=="selectAll"){//全选
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			$("#cont").children().each(function(){
				$("span.checkbox").removeClass("curr");
			})
		}else{
			$(this).addClass("curr");
			$("#cont").children().each(function(){
				$("span.checkbox").addClass("curr");
			})
		}
	}else{
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			$("#selectAll").removeClass("curr");
		}else{
			$(this).addClass("curr");
			var arr=$("#cont").children().find(".checkbox");
			var str=$("#cont").children().find("span.curr");
			if(arr.length==str.length){
				$("#selectAll").addClass("curr");
			}
		}
	}
})//end

/**
 * 导出Excel
 */
$("#exportRoleData").click(function(){
    var table1 = document.querySelector("#dayindaju1");
    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
    openDownloadDialog(sheet2blob(sheet),'员工信息.xlsx');
});
