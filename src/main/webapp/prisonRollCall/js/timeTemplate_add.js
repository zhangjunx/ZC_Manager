var delList=[];
$(function(){
	getDate();
	if(getUrlParam("fid")!=undefined){
		$(".main-tab .curr a").html("修改");
		getOneTimeMoldelInfo(getUrlParam("fid"));
	}
})
//日期
function getDate() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;
		lay(".ipt").each(function() {
			laydate.render({
				elem : this, // 指定元素
				trigger : "click",
				type : "time",
				format:"HH:mm",
			});
		})
	})
}// end
//点击加号
$(document).on("click",".add",function(){
	var $div=$("<div><label style='margin-right:4px'>时段：</label><input type='text' class='ipt date1'>--<input type='text' class='ipt date2'>" +
			"<div class='operation' style='margin-left:15px !important'><a href='javascript:;' class='add operation-btn fl' title='新增'><img src='../images/icons/add.png'></a>" +
			"<a href='javascript:;' class='delete operation-btn fl' title='删除'><img src='../images/icons/remove.png'></a></div></div>");
	$(".weekTime").append($div);
	getDate();
})
//点击减号
$(document).on("click",".delete",function(){
	var fid=$(this).attr("data-fid");
	if($(".operation").length!=1){
		$(this).parent().parent().remove();
		if(fid!=""||fid!=null||fid!=undefined){
			delList.push({"fid":fid});
		}
	}
})
//点击确定提交数据
$("#addBtn").click(function(){
	saveInfo();
})
//提交信息
function saveInfo(){
	$(".weekTime .ipt").css("border-color","#ddd");
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	var templateName=$("#templateName").val();
	if(templateName==""){
		layer.msg("请填写模板名称!");
		return;
	}
		//时间段不能为空
		var len=$(".weekTime .ipt").length;
		for(var k=0;k<len;k++){
			if($(".weekTime .ipt").eq(k).val()==""){
				layer.msg("时段不能为空!",{time:2000},function(){
					$(".weekTime .ipt").eq(k).css("border-color","red");
				});
				return;
			}
		}
		//验证时间段大小
		for(var i=0;i<$(".date1").length;i++){
			var date1=new Date(year+"/"+month+"/"+day+" "+$(".date1").eq(i).val()).getTime();
			var date2=new Date(year+"/"+month+"/"+day+" "+$(".date2").eq(i).val()).getTime();
			if(date2<date1){
				layer.msg("结束时间不能小于开始时间!",{time:2000},function(){
					$(".date2").eq(i).css("border-color","red");
				});
				return;
			}
		}
		
		if(getUrlParam("fid")!=undefined){//修改
			var addList1=[];
			var updateList=[];
			for(var i=0;i<$(".date1").length;i++){
				var startTime=$(".date1").eq(i).val();//开始时间
				var endTime=$(".date2").eq(i).val();//结束时间
				var fid=$(".date1").eq(i).attr("data-fid");
				if(fid==""||fid==null||fid==undefined){
					//新数据
					var obj1={
							"startTime":startTime,
							"endTime":endTime,
							"fid":"",
					}
					addList1.push(obj1);
				}else{
					//老数据
					var obj2={
							"startTime":startTime,
							"endTime":endTime,
							"fid":fid
					}
					updateList.push(obj2);
				}
			}
			var reg={"fid":getUrlParam("fid"),"modelName":templateName,"addList":addList1,"updateList":updateList,"delList":delList};
		}else{//新增
			var addList=[];
			for(var i=0;i<$(".date1").length;i++){
				var startTime=$(".date1").eq(i).val();//开始时间
				var endTime=$(".date2").eq(i).val();//结束时间
				var obj={
						"startTime":startTime,
						"endTime":endTime,
						"timeModelID":""
				}
				addList.push(obj);
			}
			var reg={"fid":"","modelName":templateName,"addList":addList};
		}
	$.ajax({
		url:url+"/callTimesModel/addTimeMoldel",
		type:"POST",
		contentType:"application/json",
		data:JSON.stringify(reg),
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					window.location.href="timeTemplate.html";
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//从url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
//获取一条数据
function getOneTimeMoldelInfo(fid){
	$.ajax({
		url:url+"/callTimesModel/getOneTimeMoldelInfo",
		type:"post",
		data:{"fid":fid},
		dataType:"json",
		success:function(data){
			if(data.flag){
				var res=data.result;
				$("#templateName").val(res.modelName);
				$(".weekTime").empty();
				for(var item of res.timeList){
					var $div=$("<div><label style='margin-right:4px'>时段：</label><input type='text' class='ipt date1' value="+item.startTime+" data-fid="+item.fid+">--<input type='text' class='ipt date2' data-fid="+item.fid+" value="+item.endTime+">" +
							"<div class='operation' style='margin-left:15px !important'><a href='javascript:;' class='add operation-btn fl' title='新增'><img src='../images/icons/add.png'></a>" +
							"<a href='javascript:;' class='delete operation-btn fl' title='删除' data-fid="+item.fid+"><img src='../images/icons/remove.png'></a></div></div>");
					$(".weekTime").append($div);
				}
				getDate();
			}
		}
	})
}

