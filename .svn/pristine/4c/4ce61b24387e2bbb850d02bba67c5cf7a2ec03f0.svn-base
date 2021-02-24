var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	//初始化table
	initTable();
	getPage(total);
})
//点击搜索
$("#queryListBtn").click(function(){
	initTable();
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
	            	initTable();
				}
			}
		})
	})
}//end
//初始化table
function initTable(){
	var obj={"curpage":curpage,"pagesize":pagesize};
	$.ajax({
		url:url+'/devicePlatform/getList',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			//添加表格数据
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var platFormCode=item.platFormCode==undefined?"":item.platFormCode;
					var platFormName=item.platFormName==undefined?"":item.platFormName;
					var platFormManufacture=item.platFormManufacture==undefined?"":item.platFormManufacture;
					var baseUrl=item.baseUrl==undefined?"":item.baseUrl;
					var userName=item.userName==undefined?"":item.userName;
					var password=item.password==undefined?"":item.password;
					var status=item.status==1?"启用":"禁用";
					var text="";
					if(status=="启用"){
						text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					}else{
						text="<a href='javascript:;' data-fid="+item.fid+" class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
					}
					
					var $tr=$("<tr><td>"+platFormCode+"</td><td>"+platFormName+"</td><td>"+platFormManufacture+"</td><td>"+baseUrl+"</td>" +
							"<td>"+userName+"</td><td>"+password+"</td><td>"+status+"</td><td><a href='platform_add.html?fid="+item.fid+"' class='mo layui-btn layui-btn-xs layui-btn-warm'>修改</a>"+text+"</td></tr>");
					$("#cont").append($tr);
				}
			}
		},
		error:function(data){
			
		}
	})
}
//点击删除
$(document).on("click",".shan",function(){
	var fid=$(this).attr("data-fid");
	console.log(fid)
	delInfo(fid)
})
//删除
function delInfo(fid){
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+'/devicePlatform/delOne?fid='+fid,
			dataType:'json',//数据类型
			type:'POST',//类型
			success:function(data){
				if(data.flag){
					layer.msg("删除成功!",{time:1000},function(){
						initTable();
					})
				}else{
					layer.msg(data.reason,{time:2000});
				}
			},
			error:function(data){
				
			}
		})
	})
}
