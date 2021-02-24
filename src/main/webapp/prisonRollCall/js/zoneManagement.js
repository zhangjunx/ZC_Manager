$(function(){
	getPrisonAreaList();//获取监区信息
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
					getPrisonAreaList();
				}
			}
		})
	})
}//end
//点击删除
$(document).on("click",".del",function(){
	var fid=$(this).attr("data-fid");
	var that=this;
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		$.ajax({
			url:url+"/prisonArea/delOnePrisonArea",
			type:"post",
			data:{"fid":fid},
			success:function(data){
				layer.close(index);
				if(data.flag){
					$(that).parent().parent().remove();
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})
//点击搜索
$("#queryPrisonAreaByConditionBtn").click(function(){
	getPrisonAreaList();
})
//获取区域信息列表
function getPrisonAreaList(){
	var areaName=$("#areaName").val();
	var areaSize=$("#areaSize").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"areaName":areaName,"areaSize":areaSize};
	$.ajax({
		url:url+"/prisonArea/getPrisonAreaList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				for(var item of data.result){
					var areaName=item.areaName==undefined?"":item.areaName;
					var areaSize=item.areaSize==undefined?"":item.areaSize;
					var personSize=item.personSize==undefined?"":item.personSize;
					var labelCode=item.labelCode==undefined?"":item.labelCode;
					var str="";
					var text="";
					if(item.status=="1"){//启用
						str="已启用";
						text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					}else if(item.status=="2"){//禁用
						str="已禁用";
						text="<a href='javascript:;' data-fid='"+item.fid+"' class='del layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					}
					var $tr=$("<tr><td>"+item.tindex+"</td><td>"+areaName+"</td><td>"+areaSize+"㎡</td>" +
							"<td>"+personSize+"</td><td>"+labelCode+"</td>" +
							"<td>"+str+"</td><td><a href='zone_add.html?fid="+item.fid+"' class='layui-btn layui-btn-xs'>修改</a>" +
							text+"</td></tr>");
					$("#cont").append($tr);
				}
			}
		}
	})
}
