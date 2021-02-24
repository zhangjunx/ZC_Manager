var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	//加载餐厅类型
	initRestaurantType();
	
	//初始化table
	var obj={"curpage":curpage,"pagesize":pagesize};
	initTable(obj);
	getPage(total);
})


function initRestaurantType(){
	$.ajax({
		url:url+'/meeting/getComboList?typeName=restaurantType',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data,status){
			var html='';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].name+'">'+data.result[i].value+'</option>';
			}
			$("#RestaurantType").append(html);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	})
}

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
	            	initTable(obj);
				}
			}
		})
	})
}//end
//初始化table
function initTable(obj){
	$.ajax({
		url:url+'/restaurant/getRestaurantList',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data){
			console.log(data)
			total=data.count;
			//添加表格数据
			$("#cont").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				var RestaurantNo = data.result[i].RestaurantNo == undefined ? '':data.result[i].RestaurantNo;
				var RestaurantName = data.result[i].RestaurantName == undefined ? '':data.result[i].RestaurantName;
				var RestaurantLocl = data.result[i].RestaurantLocl == undefined ? '':data.result[i].RestaurantLocl;
				var RestaurantTypeName = data.result[i].RestaurantTypeName == undefined ? '':data.result[i].RestaurantTypeName;
				var remark = data.result[i].remark == undefined ? '':data.result[i].remark;
				var fstatus = data.result[i].fstatus == '1' ? '启用':'禁用';
				html = html + '<tr>';
				html = html + '<td>'+(i+1)+'</td>';
				html = html + '<td>'+RestaurantNo+'</td>';
				html = html + '<td>'+RestaurantName+'</td>';
				html = html + '<td>'+RestaurantLocl+'</td>';
				html = html + '<td>'+RestaurantTypeName+'</td>';
				html = html + '<td>'+fstatus+'</td>';
				html = html + '<td>'+remark+'</td>';
				html = html + '<td>'+
							  '<a href="javascript:;" onclick="updateInfo('+data.result[i].fid+')" class="mo layui-btn layui-btn-xs">修改</a>' +
							  '<a href="javascript:;" onclick="delInfo('+data.result[i].fid+')" class="shan layui-btn layui-btn-xs layui-btn-danger">删除</a>' +
							  '</td>';
				html = html + '</tr>';
			}
			$("#cont").append(html);
		},
		error:function(data){
			
		}
	})
}


//编辑
function updateInfo(fid){
	$.ajax({
		url:url+'/restaurant/getOneRestaurant?fid='+fid,
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			$(".title").html("修改餐厅");
			$("#RestaurantNo").val(data.result.RestaurantNo);
			$("#RestaurantName").val(data.result.RestaurantName);
			$("#RestaurantLocl").val(data.result.RestaurantLocl);
			$("#RestaurantType").val(data.result.RestaurantType);
			$("#fstatus").val(data.result.fstatus);
			$("#remark").val(data.result.remark);
			$("#fid").val(fid);
			
			$("#addDiv").fadeIn(500);
			$("#addDiv1").fadeIn(500);
		},
		error:function(data){
			
		}
	})
}

//删除
function delInfo(fid){
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+'/restaurant/delRestaurant?fid='+fid,
			dataType:'json',//数据类型
			type:'POST',//类型
			success:function(data){
				var obj={"curpage":curpage,"pagesize":pagesize};
				initTable(obj);
			},
			error:function(data){
				
			}
		})
	})
}
//打开新增弹窗
$(document).on("click","#openwin",function(){
		$("#addDiv").fadeIn(500);
		$("#addDiv1").fadeIn(500);
		$("#RestaurantNo").val("");
		$("#RestaurantName").val("");
		$("#RestaurantLocl").val("");
		$("#RestaurantType").val("1");
		$("#fstatus").val("1");
		$("#remark").val("");
		$("#fid").val("");
})

//点击弹出框的叉
$("#quxiao").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框的取消
$("#bottom_qx").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击餐厅管理弹出框的确认
$("#sureBtn").click(function(){
	var RestaurantNo = $("#RestaurantNo").val();
	var RestaurantName = $("#RestaurantName").val();
	var RestaurantLocl = $("#RestaurantLocl").val();
	var RestaurantType = $("#RestaurantType").val();
	var fstatus = $("#fstatus").val();
	var remark = $("#remark").val();
	var fid = $("#fid").val();
	if(RestaurantNo==""){
		layer.msg("请输入餐厅编号!",{time:2000});
		return;
	}
	if(RestaurantName==""){
		layer.msg("请输入餐厅名称!",{time:2000});
		return;
	}
	if(RestaurantLocl==""){
		layer.msg("请输入餐厅位置!",{time:2000});
		return;
	}
	var obj={
			"RestaurantNo":RestaurantNo,
			"RestaurantName":RestaurantName,
			"RestaurantLocl":RestaurantLocl,
			"RestaurantType":RestaurantType,
			"fstatus":fstatus,
			"remark":remark,
			"fid":fid
	}
	
	$.ajax({
		url:url+'/restaurant/addRestaurant',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data){
			$(".vehicleInfo_shadow").fadeOut(500);
			$(".vehicleInfo").fadeOut(500);
			
			var obj={"curpage":curpage,"pagesize":pagesize};
			initTable(obj);
		},
		error:function(data){
		}
	})
})
