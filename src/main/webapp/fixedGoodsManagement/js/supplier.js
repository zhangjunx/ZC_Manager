var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
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
$("#insertSupplier").click(function(){
	$("#fid").val("");
	$("#supplierName").val("");
	$("#country").val("");
	$("#manager").val("");
	$("#managerPhone").val("");
	$("#email").val("");
	$("#location").val("");
	$("#remark").val("");
	layer.open({
		type:1,
		title:"新增供应商",
		content:$("#supplier"),
		area:["500px","550px"],
		btn:["确定","取消"],
		yes:function(index){
			saveInfo(index);
		}
	})
})
//点击修改弹出层
$(document).on("click",".mo",function(){
	$("#fid").val("");
	$("#supplierName").val("");
	$("#country").val("");
	$("#manager").val("");
	$("#managerPhone").val("");
	$("#email").val("");
	$("#location").val("");
	$("#remark").val("");
	var fid=$(this).attr("data-fid");
	getOne(fid)
	layer.open({
		type:1,
		title:"修改供应商",
		content:$("#supplier"),
		area:["500px","550px"],
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
			url:url+"/zcSupplier/delOne",
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
	var supplierName=$("#supplierName").val();//供应商名称
	var country=$("#country").val();
	var manager=$("#manager").val();
	var managerPhone=$("#managerPhone").val();
	var email=$("#email").val();
	var location=$("#location").val();
	var remark=$("#remark").val();
	if(supplierName==""){
		layer.msg("请填写供应商名称!",{time:2000});
		return;
	}
	var obj={"fid":fid,"name":supplierName,"country":country,"manager":manager,"managerPhone":managerPhone,"email":email,
			"location":location,"remark":remark,"operator":window.top.holderno};
	$.ajax({
		url:url+"/zcSupplier/saveInfo",
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
		url:url+"/zcSupplier/getOne",
		type:"post",
		data:{"fid":fid},
		success:function(data){
			console.log(data);
			if(data.flag){
				var fid=data.result.fid;
				var supplierName=data.result.name;
				var country=data.result.country;
				var manager=data.result.manager;
				var managerPhone=data.result.managerPhone;
				var email=data.result.email;
				var location=data.result.location;
				var remark=data.result.remark;
				$("#fid").val(fid);
				$("#supplierName").val(supplierName);
				$("#country").val(country);
				$("#manager").val(manager);
				$("#managerPhone").val(managerPhone);
				$("#email").val(email);
				$("#location").val(location);
				$("#remark").val(remark);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//点击搜索
$("#supplierSearch").click(function(){
	getList();
	getPage(total);
})
//初始化供应商列表
function getList(){
	var supplierName=$("#supplierName1").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"name":supplierName};
	$.ajax({
		url:url+"/zcSupplier/getList",
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
					var supplierName=item.name==undefined?"":item.name;
					var country=item.country==undefined?"":item.country;
					var manager=item.manager==undefined?"":item.manager;
					var managerPhone=item.managerPhone==undefined?"":item.managerPhone;
					var email=item.email==undefined?"":item.email;
					var location=item.location==undefined?"":item.location;
					var remark=item.remark==undefined?"":item.remark;
					var $tr=$("<tr><td>"+index+"</td><td>"+supplierName+"</td><td>"+country+"</td><td>"+manager+"</td><td>"+managerPhone+"</td>" +
							"<td>"+email+"</td><td>"+location+"</td><td>"+remark+"</td><td><a href='javascript:;' data-fid="+item.fid+" class='mo layui-btn layui-btn-xs'>修改</a>" +
						    "<a href='javascript:;' data-fid="+item.fid+" class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a></td></tr>");
					index++;
					$("#cont").append($tr);
				}
			}
		}
	})
}
