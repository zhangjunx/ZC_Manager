$(function(){
	getPrisonList();//获取监区信息
	getPage(total);
})
var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:pagesize,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				curpage=obj.curr;
				pagesize=obj.limit;
				if(!first){
					getPrisonList();
				}
			}
		})
	})
}//end
//点击删除
$(document).on("click",".del",function(){
	var fid=$(this).attr("data-fid");
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		delPrisonInfo(fid,index);
	})
})
function delPrisonInfo(fid,index){
	$.ajax({
		url:url+"/prison/delOnePrisonInfo",
		type:"post",
		data:{"fid":fid},
		success:function(data){
			layer.close(index);
			if(data.flag){
				getPrisonList();
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//点击搜索
$("#queryPrisonAreaByConditionBtn").click(function(){
	getPrisonList();
})
//获取监区信息列表
function getPrisonList(){
	var prisonName=$("#prisonName").val();
	var location=$("#location").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"prisonName":prisonName,"localtion":location};
	$.ajax({
		url:url+"/prison/getPrisonList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				for(var item of data.result){
					var prisonName=item.prisonName==undefined?"":item.prisonName;
					var localtion=item.localtion==undefined?"":item.localtion;
					var leader=item.leader==undefined?"":item.leader;
					var labelCode=item.labelCode==undefined?"":item.labelCode;
					var str="";
					var text="";
					if(item.status=="1"){//启用
						str="已启用";
						text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					}else if(item.status=="2"){//禁用
						str="已禁用";
						text="<a href='javascript:;' data-fid="+item.fid+" class='del layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					}
					var $tr=$("<tr><td>"+item.tindex+"</td><td>"+prisonName+"</td><td>"+localtion+"</td>" +
							"<td>"+leader+"</td><td>"+labelCode+"</td><td>"+str+"</td>" +
							"<td><a href='prisonArea_add.html?fid="+item.fid+"' class='layui-btn layui-btn-xs'>修改</a>" +
							text+"</td></tr>");
					$("#cont").append($tr);
				}
			}
		}
	})
}

