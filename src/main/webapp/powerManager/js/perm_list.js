
$(function() {
	queryPermList();
	getPage();
	showHide();//跟权限有关
})//end

var page;//当前页
var limit;//每页显示条数
var total;//总条数
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,//总条数
			limit:limit,
			layout:['count','prev','page','next','limit','refresh','skip'],
		    jump:function(obj,first){
		    	page=obj.curr;
		    	limit=obj.limit;
		    	if(!first){
		    		queryPermList();
		    	}
		    }
		})
	})
}//end
//搜索
$("#queryBtn").click(function(){
	queryPermList();
	getPage();
})//end
function queryPermList(){//获取职务列表
	var code = $("#code").val();
	var name = $("#name").val();
	var obj = {"code":code,"name":name,"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/ACL_Permissions/queryPermListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,//很重要
		success:function(data){
			console.log(data)
			$("#cont").empty();
			if(!data.flag){
				total=0;
				return;
			}
			page=data.page;
			limit=data.limit;
			total=data.total;
			//权限
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="MyTitle"){
					list.push(item);
				}
			}
			
			var html="";
			var txt="";
			var txt1="";
			 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
				 txt="";
			  }else {
				 txt="<a href='perm_update.html' class='layui-btn layui-btn-xs updata' lay-event='edit'>编辑</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
				 txt1="";
			  }else {
				 txt1="<a  class='layui-btn layui-btn-danger layui-btn-xs del' lay-event='del'>删除</a>";
			  }
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var code=(val.code==undefined?"":val.code);
				var name=(val.name==undefined?"":val.name);
				var modelno=(val.modelno==undefined?"":val.modelno);
				var modelcode=(val.modelcode==undefined?"":val.modelcode);
				var modelname=(val.modelname==undefined?"":val.modelname);
				var description=(val.description==undefined?"":val.description);
				html+="<tr><td class='no-print'><span class='checkbox' style='float:none' data-id='"+id+"'></span></td><td>"+code+"</td><td>"+name
				+"</td><td>"+modelcode
				+"</td><td>"+modelname
				+"</td><td>"+description
				+"</td><td class='center no-print' data-id='"+id+"' data-modelno='"+modelno+"'>"+txt+txt1+"</td></tr>";
			})
			$("#cont").append(html);	
		}
	})
}//end


//复选框
$(document).on("click",".checkbox",function(){
	if($(this).attr("id")=="selectAll"){
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
			var arr=$("#cont").children().find("span.checkbox");
			var str=$("#cont").children().find("span.curr");
			if(arr.length==str.length){
				$("#selectAll").addClass("curr");
			}
		}
	}
})

//批量删除
$(".delMain").click(function(){
	deleteBatch();
})
function deleteBatch(){//批量删除
	var arr=[];
	var chs=$("#cont").children().find("span.curr");
	for(i=0;i<chs.length;i++){
		//var id=chs.eq(i).parent().siblings().eq(0).html();
		var id=chs.eq(i).attr("data-id");
		//var obj={"id":id};
		arr.push(id);
	}
	console.log(arr)
	if(arr.length==0){
		layer.msg("请先选中要删除的行！");
		return;
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/ACL_Permissions/deleteBatch",
			type:"POST",
			data:JSON.stringify(arr),
			dataType:"json",
			//async:false,
			contentType:"application/json",
			success:function(data){
				console.log(data)
				layer.msg(data.reason,{time:2000},function(){
					window.location.reload();
				});
			}
		})
	})
	
}//end
//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertTitleData").hide();
		$("#deleteTitleData").hide();
		$("#printTitleData").hide();
		var arrList=window.top.arr;
		var list=[];
		arrList.forEach(item=>{
			if(item.ModelCode=="MyTitle"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertTitleData").show();
			}
			if(item.Code=="delete"){
				$("#deleteTitleData").show();
			}
			if(item.Code=="print"){
				$("#printTitleData").show();
			}
		}
}//end
//删除
$(document).on("click",".del",function(){//删除职务编号
	//var id=$(this).parent().siblings().eq(1).html();
	var id=$(this).parent().attr("data-id");
	var obj={"id":id};
	console.log(obj)
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/ACL_Permissions/delete",
			type:"POST",
			data:obj,
			dataType:"json",
			success:function(data){
				layer.msg(data.reason,{time:2000});
				if(!data.flag){
					return;
				}
				window.location.reload();
			}
		})
	})
})
//更新
$(document).on("click",".updata",function(){
	var id=$(this).parent().attr("data-id");
	var modelcode=$(this).parent().siblings().eq(3).html();
	localStorage.id=id;
	localStorage.modelcode=modelcode;
});
 

