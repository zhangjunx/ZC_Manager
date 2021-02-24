var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	var obj={"curpage":curpage,"pagesize":pagesize};
	getRecordList(obj);
	getPage(total);
})


//点击全部下发
$("#sendAll").click(function(){
	layer.confirm("确定全部下发?",{title:"提示信息"},function(i){
		layer.close(i);
		var index=layer.load(2);
		$.ajax({
			url:url+"/facePayRecord/sentCommandToDevice",
			type:"post",
			data:{"fid":""},
			success:function(data){
				layer.close(index);
				if(data.flag){
					layer.msg("下发成功!",{time:2000});
					var obj={"curpage":curpage,"pagesize":pagesize};
					getRecordList(obj);
					getPage(total);
				}else{
					layer.msg(data.reason,{time:2000});
				}
			},
			error:function(data){
				layer.close(index);
			}
		})
	})
})
//点击下发
$(document).on("click",".mo",function(){
	var fid=$(this).attr("data-fid");
	layer.confirm("确定下发?",{title:"提示信息"},function(i){
		layer.close(i);
		var index=layer.load(2);
		$.ajax({
			url:url+"/facePayRecord/sentCommandToDevice",
			type:"post",
			data:{"fid":fid},
			success:function(data){
				layer.close(index);
				if(data.flag){
					layer.msg("下发成功!",{time:2000});
					var obj={"curpage":curpage,"pagesize":pagesize};
					getRecordList(obj);
					getPage(total);
				}else{
					layer.msg(data.reason,{time:2000});
				}
			},
			error:function(data){
				layer.close(index);
			}
		})
	})
})

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
					var obj={"curpage":curpage,"pagesize":pagesize};
					getRecordList(obj);
				}
			}
		})
	})
}//end
//获取操作记录
function getRecordList(obj){
	$.ajax({
		url:url+"/facePayRecord/getRecordList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			if(data.flag){
				$("#cont").empty();
				var res=data.result;
				for(var item of res){
					var description=item.description==undefined?"":item.description;
					if(item.fstatus==0){
						var fstatus="未下发";
						var txt="<a href='javascript:;' data-fid="+item.fid+" class='mo layui-btn layui-btn-xs'>下发</a>";
					}else{
						var fstatus="已下发";
						var txt="<a href='javascript:;' data-fid="+item.fid+" class='layui-btn layui-btn-xs layui-bg-gray'>下发</a>";
					}
					var $tr=$("<tr><td>"+description+"</td><td>"+fstatus+"</td>" +
							"<td>"+txt+"</td></tr>");
					$("#cont").append($tr);
				}
			}
		}
	})
}