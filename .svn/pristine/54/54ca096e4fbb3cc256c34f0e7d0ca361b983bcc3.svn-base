$(function(){
	getTimeMoldelList();
	getPage(total)
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
					getTimeMoldelList();
				}
			}
		})
	})
}//end
//点击删除
$(document).on("click",".del",function(){
	var fid=$(this).attr("data-fid");
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		$.ajax({
			url:url+"/callTimesModel/delOneTimeMoldelInfo",
			type:"post",
			data:{"fid":fid},
			success:function(data){
				console.log(data);
				layer.close(index);
				if(data.flag){
					layer.msg(data.reason,{time:1000},function(){
						getTimeMoldelList();
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})
//获取时间模板信息
function getTimeMoldelList(){
	var obj={"curpage":curpage,"pagesize":pagesize};
	$.ajax({
		url:url+"/callTimesModel/getTimeMoldelList",
		type:"post",
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $tr=$("<tr><td>"+item.tindex+"</td><td>"+item.modelName+"</td></tr>");
					var $td=$("<td></td>");
					var $td2=$("<td><a href='timeTemplate_add.html?fid="+item.fid+"' class='layui-btn layui-btn-xs'>修改</a>" +
							"<a href='javascript:;' data-fid="+item.fid+" class='del layui-btn layui-btn-xs layui-btn-danger'>删除</a></td>");
					if(item.timeList==undefined){
						continue;
					}
					for(var current of item.timeList){
						var $span=$("<span style='margin:5px;'>"+current.startTime+"~"+current.endTime+"</span>");
						$td.append($span);
					}
					$tr.append($td);
					$tr.append($td2);
					$("#cont").append($tr);
				}
			}
		}
	})
}
