var delList=[];
$(function(){
	getDate();
})
if(getUrlParam("fid")!=null){//修改页面
	$(".main-tab .label a").html("修改消费模式");
	getOneConsumeType();
}else{//新增页面
	getRestaurantList();//获取餐厅数据
}
//获取一条消费模式信息
function getOneConsumeType(){
	$.ajax({
		url:url+"/consumeType/getOneConsumeType",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		success:function(data){
			console.log(data);
			$("table tr:gt(0)").remove();
			if(data.flag){
				var res=data.result;
				$("#consumeName").val(res.consumeName).attr("data-fid",res.fid);
				$("#fstatus").val(res.fstatus);
				$("#description").val(res.remark);
				for(var item of res.timesList){
					var $tr=$("<tr><td><select class='mealName'><option value=''>请选择</option><option value='早餐'>早餐</option><option value='中餐'>中餐</option>" +
							"<option value='晚餐'>晚餐</option><option value='夜宵'>夜宵</option></select></td><td><input type='text' class='startDate test-item' placeholder='请输入开始时间'></td>" +
							"<td><input type='text' class='endDate test-item' placeholder='请输入结束时间'></td><td><input type='number' class='amount' placeholder='请输入消费金额'></td>" +
							"<td><select class='resturant'></select></td><td><a href='javascript:;' data-fid="+item.fid+" class='layui-btn layui-btn-xs layui-btn-danger del'>删除</a></td></tr>")
					$tr.find(".mealName").val(item.mealTimesName).attr("data-fid",item.fid);
					$tr.find(".startDate").val(item.startTime);
					$tr.find(".endDate").val(item.endTime);
					$tr.find(".amount").val(item.amount);
							$(".grade").append($tr);
							$.ajax({
								url:url+"/restaurant/getRestaurantList",
								type:"post",
								async:false,
								success:function(data){
									if(data.flag){
										var result=data.result;
										for(var current of result){
											var $opt=$("<option value="+current.fid+">"+current.RestaurantName+"</option>");
											$tr.find(".resturant").append($opt);
										}
										$tr.find(".resturant").val(item.restaurantID); 
									}
								}
							})
				}
				getDate();
			}
		}
	})
}

//点击添加餐次
$(".addMeal").click(function(){
	var $tr=$("<tr><td><select class='mealName'><option value=''>请选择</option><option value='早餐'>早餐</option><option value='中餐'>中餐</option>" +
			"<option value='晚餐'>晚餐</option><option value='夜宵'>夜宵</option></select></td><td><input type='text' class='startDate test-item' placeholder='请输入开始时间'></td>" +
			"<td><input type='text' class='endDate test-item' placeholder='请输入结束时间'></td><td><input type='number' class='amount' placeholder='请输入消费金额'></td>" +
			"<td><select class='resturant'></select></td><td><a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-danger del'>删除</a></td></tr>")
	$(".grade").append($tr);
	$.ajax({
		url:url+"/restaurant/getRestaurantList",
		type:"post",
		success:function(data){
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value="+item.fid+">"+item.RestaurantName+"</option>");
					$tr.find(".resturant").append($opt);
				}
			}
		}
	})
	getDate();
})

//点击确定提交数据
$("#sureBtn").click(function(){
	if($("#consumeName").val()==""){
		layer.msg("请填写消费模式名称!",{time:2000});
		return;
	}
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	if(month<10){
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
	for(var i=0;i<$(".mealName").length;i++){
		if($(".mealName").eq(i).val()!=""){
			var startTime=$(".startDate").eq(i).val();
			var endTime=$(".endDate").eq(i).val();
			startTime=year+"/"+month+"/"+day+" "+startTime+":00";
			endTime=year+"/"+month+"/"+day+" "+endTime+":00";
			var date1=new Date(startTime);
			var date2=new Date(endTime);
			var time1=date1.getTime();
			var time2=date2.getTime();
			if(time2<time1){
				layer.msg("餐次结束时间不能小于餐次开始时间!",{time:2000});
				return;
			}
		}
	}
	if(getUrlParam("fid")!=null){//修改
		updateConsumeType();
	}else{//新增
		addConsumeType();
	}
})

//提交修改数据
function updateConsumeType(){
	var consumeName=$("#consumeName").val();
	var fid=$("#consumeName").attr("data-fid");
	var fstatus=$("#fstatus").val();
	var remark=$("#description").val();
	var arr=[];
	var arrs=[];
	for(var i=0;i<$(".mealName").length;i++){
		var mealId=$(".mealName").eq(i).attr("data-fid");
		if($(".mealName").eq(i).val()!=""&&mealId!=undefined){//要修改的原始数据
			var obj={
					"mealTimesName":$(".mealName").eq(i).val(),
					"startTime":$(".startDate").eq(i).val(),
					"endTime":$(".endDate").eq(i).val(),
					"amount":$(".amount").eq(i).val(),
					"restaurantID":$(".resturant").eq(i).val(),
					"fstatus":1,
					"mealTimesID":mealId
			}
			arr.push(obj);
		}else if($(".mealName").eq(i).val()!=""){//新增数据
			var obj1={
					"mealTimesName":$(".mealName").eq(i).val(),
					"startTime":$(".startDate").eq(i).val(),
					"endTime":$(".endDate").eq(i).val(),
					"amount":$(".amount").eq(i).val(),
					"restaurantID":$(".resturant").eq(i).val(),
					"fstatus":1,
			}
			arrs.push(obj1);
		}
	}
	$.ajax({
		url:url+"/consumeType/addConsumeType",
		type:"POST",
		data:{"consumeTypeID":fid,"creator":window.top.holderno,"consumeName":consumeName,"fstatus":fstatus,"remark":remark,"delList":JSON.stringify(delList),"addList":JSON.stringify(arrs),"updateList":JSON.stringify(arr)},
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg("修改成功!",{time:2000},function(){
					//window.location.href="consumptionPattern.html";
					updateRoleInfo(data.resultList);
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

function updateRoleInfo(data){
	$.ajax({
		url:url+"/facePayRecord/updateRoleInfo",
		type:"post",
		data:{'data':data},
		success:function(data){
			console.log(data)
		}
	})
}

//提交数据
function addConsumeType(){
	var consumeName=$("#consumeName").val();
	var fstatus=$("#fstatus").val();
	var remark=$("#description").val();
	var arr=[];
	for(var i=0;i<$(".mealName").length;i++){
		if($(".mealName").eq(i).val()!=""){
			var obj={
					"mealTimesName":$(".mealName").eq(i).val(),
					"startTime":$(".startDate").eq(i).val(),
					"endTime":$(".endDate").eq(i).val(),
					"amount":$(".amount").eq(i).val(),
					"restaurantID":$(".resturant").eq(i).val(),
					"fstatus":1,
			}
			arr.push(obj);
		}
	}
	if(arr.length==0){
		layer.msg("请完善餐次信息!",{time:2000});
		return;
	}
	$.ajax({
		url:url+"/consumeType/addConsumeType",
		type:"POST",
		data:{"fid":"","creator":window.top.holderno,"consumeName":consumeName,"fstatus":fstatus,"remark":remark,"addList":JSON.stringify(arr)},
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg("添加成功!",{time:2000},function(){
					window.location.href="consumptionPattern.html";
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//点击餐次列表删除
$(document).on("click",".del",function(){
	var that=this;
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		$(that).parent().parent().remove();
		var fid=$(that).attr("data-fid");
		if(fid!=undefined){
			var obj={
					"mealTimesID":fid
			};
			delList.push(obj);
		}
	})
})

//获取餐厅列表
function getRestaurantList(){
	$.ajax({
		url:url+"/restaurant/getRestaurantList",
		type:"post",
		success:function(data){
			$(".resturant").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $opt=$("<option value="+item.fid+">"+item.RestaurantName+"</option>");
					$(".resturant").append($opt);
				}
			}
		}
	})
}
//当点击文本框 可以选择时间
function getDate(){
	layui.use(['laydate'], function () {
		var laydate = layui.laydate;
		//日期
		lay('.test-item').each(function () {
			laydate.render({
				elem: this,
				type:"time",
				format:"HH:mm",
				trigger: 'click'
			});
		});		
	});
}//end
//从url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}