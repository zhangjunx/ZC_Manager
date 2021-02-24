var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	//初始化仓库列表
	getList();
	getPage(total);
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
					getList();
				}
			}
		})
	})
}//end
//点击新增弹出层
$("#insertWareHouseData").click(function(){
	$("#fid").val("");
	$("#storeName").val("");
	$("#storeLocal").val("");
	$("#manager").val("");
	$("#remark").val("");
	$("#size").val("");
	layer.open({
		type:1,
		title:"新增仓库",
		content:$("#wareHouse"),
		area:["500px","500px"],
		btn:["确定","取消"],
		yes:function(index){
			saveInfo(index);
		}
	})
})
//点击修改
$(document).on("click",".mo",function(){
	$("#fid").val("");
	$("#storeName").val("");
	$("#storeLocal").val("");
	$("#manager").val("");
	$("#remark").val("");
	$("#size").val("");
	var fid=$(this).attr("data-fid");
	getOne(fid);
	layer.open({
		type:1,
		title:"修改仓库",
		content:$("#wareHouse"),
		area:["500px","500px"],
		btn:["确定","取消"],
		yes:function(index){
			saveInfo(index);
		}
	})
})
//点击删除
$(document).on("click",".shan",function(){
	var fid=$(this).attr("data-fid");
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		$.ajax({
			url:url+"/zcStore/delOne",
			type:"post",
			data:{"fid":fid},
			success:function(data){
				layer.close(index);
				if(data.flag){
					layer.msg(data.reason,{time:1000},function(){
						getList();
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})
//提交信息
function saveInfo(index){
	var fid=$("#fid").val();
	var storeName=$("#storeName").val();//仓库名称
	var storeLocal=$("#storeLocal").val();//仓库位置
	var manager=$("#manager").val();//负责人
	var remark=$("#remark").val();//备注
	var size=$("#size").val();
	if(storeName==""){
		layer.msg("请填写仓库名称!",{time:2000});
		return;
	}
	if(storeLocal==""){
		layer.msg("请填写仓库位置!",{time:2000});
		return;
	}
	if(size==""){
		layer.msg("请填写仓库大小!",{time:2000});
		return;
	}
	if(manager==""){
		layer.msg("请填写负责人!",{time:2000});
		return;
	}
	var obj={"fid":fid,"storeName":storeName,"storeLocal":storeLocal,"manager":manager,"remark":remark,"size":size,"operator":window.top.holderno};
	$.ajax({
		url:url+"/zcStore/saveInfo",
		type:"post",
		data:obj,
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					layer.close(index);
					getList();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//修改时获取一条信息
function getOne(fid){
	$.ajax({
		url:url+"/zcStore/getOne",
		type:"post",
		data:{"fid":fid},
		success:function(data){
			console.log(data);
			if(data.flag){
				var fid=data.result.fid;
				var storeName=data.result.storeName;
				var storeLocal=data.result.storeLocal;
				var manager=data.result.manager;
				var remark=data.result.remark;
				var size=data.result.size;
				$("#fid").val(fid);
				$("#storeName").val(storeName);
				$("#storeLocal").val(storeLocal);
				$("#manager").val(manager);
				$("#remark").val(remark);
				$("#size").val(size);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//初始化仓库列表
function getList(){
	var obj={"curpage":curpage,"pagesize":pagesize};
	$.ajax({
		url:url+"/zcStore/getList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				var index=1;
				for(var item of res){
					var storeName=item.storeName==undefined?"":item.storeName;
					var storeLocal=item.storeLocal==undefined?"":item.storeLocal;
					var size=item.size==undefined?"":item.size;
					var manager=item.manager==undefined?"":item.manager;
					var remark=item.remark==undefined?"":item.remark;
					var $tr=$("<tr><td>"+index+"</td><td>"+storeName+"</td><td>"+storeLocal+"</td><td>"+size+"</td><td>"+manager+"</td>" +
							"<td>"+remark+"</td><td><a href='javascript:;' data-fid="+item.fid+" class='mo layui-btn layui-btn-xs'>修改</a>" +
						    "<a href='javascript:;' data-fid="+item.fid+" class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a></td></tr>");
					index++;
					$("#cont").append($tr);
				}
			}
		}
	})
}
