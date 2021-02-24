$(function(){
	//查询外协信息
	getList();
	getPage();
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  lay('.ipt').each(function() {
				laydate.render({
					elem: this,
					trigger: 'click'
				});
			});
	});
	
	
})
var page;//当前页
var limit;//每页显示条数
var total;
//分页
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,//每页显示条数
			count:total,//总条数
			curr:page,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					getVisitorsStatic();
				}
			}
		})
	})
}//end

//点击搜索
$("#queryBtn").click(function(){
	getVisitorsStatic();
	getPage();
})
//外协信息回显
function getList(){
	var title=$("#title").val();
	var obj={"title":title,"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/LH_FaceRecogParam/getFaceParamList",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var i=0;i<res.length;i++){
					var id=(res[i].id==undefined)?"":res[i].id;
					var title=(res[i].title==undefined)?"":res[i].title;
					var path=(res[i].path==undefined)?"":res[i].path;
					var remark=(res[i].remark==undefined)?"":res[i].remark;
					
					/*
					if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
						 var txt1="";
					  }else {
						  var txt1="<a href='face_recog_param_update.html' class='update layui-btn layui-btn-xs' data-id="+id+">修改</a>";
					  }
					 
					 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
						 var txt2="";
					  }else {
						  var txt2="<a href='javascript:;' class='del layui-btn layui-btn-xs' data-id="+id+">删除</a>";
					  }
					 
					 if(txt1==""&&txt2==""){
						 txt1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
						 txt2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>删除</a>";
					 }*/
					
					var txt1="<a href='face_recog_param_update.html' class='update layui-btn layui-btn-xs' data-id="+id+">修改</a>";
					var txt2="<a href='javascript:;' class='del layui-btn layui-btn-xs' data-id="+id+">删除</a>";
					var $tr=$("<tr><td>"+id+"</td><td>"+title+"</td><td>"+path+"</td><td>"+remark+"</td><td>"+txt1+txt2+"</td></tr>");
					$("#cont").append($tr);
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//删除事由
$(document).on("click",".del",function(){
	var id=$(this).attr("data-id");
	layer.confirm("确定删除?",{title:'提示'},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/LH_FaceRecogParam/delete",
			type:"POST",
			data:{"id":id},
			dataType:"json",
			success:function(data){
				console.log(data);
				if(data.flag){
					layer.msg(data.reason,{time:2000},function(){
						window.location.reload();
					});
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
	
})//end

//修改
$(document).on("click",".update",function(){
	var id=$(this).attr("data-id");
	localStorage.id=id;
})

/*//修改
$(document).on("click",".update",function(){
	//点击修改弹出页面 调用查询接口
	var id=$(this).attr("data-id");
	$.ajax({
		url:url+"LH_FaceRecogParam/getFaceParamList",
		type:"POST",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			$("#title").val(data.result[0].data);
			$("#path").val(data.result[0].path);
			$("#remark").val(data.result[0].remark);
		}
	}) 
})

//点击修改弹出的确定按钮提交修改操作
$(document).on("click",".sure",function(){
	var id=$(this).attr("data-id");
	var title=$("#title").val();
	var path=$("#path").val();
	var remark=$("#remark").val();
	var obj={"id":id,"title":title,"path":path,"remark":remark}; 
	$.ajax({
		url:url+"LH_FaceRecogParam/update",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:200},function(){
				getList();
				page();
			});
		}
	})
})

//添加
$(document).on("click","#add",function(){
	//先弹出新增页面，点确定再调用一下按钮
	var title=$("#title").val();
	var path=$("#path").val();
	var remark=$("#remark").val();
	var obj={"title":title,"path":path,"remark":remark}; 
	$.ajax({
		url:url+"LH_FaceRecogParam/insert",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:200},function(){
				getList();
				page();
			});
		}
	})
})*/

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertVisitorsReason").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="6006"){
				list.push(item);
			}
			
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertVisitorsReason").show();
			}
		}
	}

