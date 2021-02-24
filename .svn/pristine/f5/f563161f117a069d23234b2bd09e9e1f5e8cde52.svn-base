$(function(){
	//查询外协信息
	queryVisitorsReasonTypeList();
	showHide();
})
//外协信息回显
function queryVisitorsReasonTypeList(){
	$.ajax({
		url:url+"/WX_VisitorsReasonType/queryVisitorsReasonTypeList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				var list=[];
				for(var item of window.top.arr){
					if(item.ModelCode=="6006"){
						list.push(item);
					}
				}
				for(var i=0;i<res.length;i++){
					var id=(res[i].id==undefined)?"":res[i].id;
					var name=(res[i].name==undefined)?"":res[i].name;
					var note=(res[i].note==undefined)?"":res[i].note;
					
					//var txt1="<a href='javascript:' class='update layui-btn layui-btn-xs' data-id="+id+">修改</a>";
					
					if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
						 var txt1="";
					  }else {
						  var txt1="<a href='visitorsReason_update.html' class='update layui-btn layui-btn-xs' data-id="+id+">修改</a>";
					  }
					 
					 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
						 var txt2="";
					  }else {
						  var txt2="<a href='javascript:' class='del layui-btn layui-btn-xs' data-id="+id+">删除</a>";
					  }
					 
					 if(txt1==""&&txt2==""){
						 txt1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
						 txt2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>删除</a>";
					 }
					
					
					var $tr=$("<tr><td>"+id+"</td><td>"+name+"</td><td>"+note+"</td><td>"+txt1+txt2+"</td></tr>");
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
			url:url+"/WX_VisitorsReasonType/deleteVisitorsReasonType",
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
	var name=$(this).parent().siblings().eq(1).html();
	var note=$(this).parent().siblings().eq(2).html();
	localStorage.id=id;
	localStorage.name=name;
	localStorage.note=note;
})
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

