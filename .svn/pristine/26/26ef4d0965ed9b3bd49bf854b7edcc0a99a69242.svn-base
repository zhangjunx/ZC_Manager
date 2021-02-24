var h_status=1;

//操作类型，1：编辑，2：查看
var opttype = getQueryString("opttype");
var meetingno = getQueryString("meetingno");

$(function(){
	//获取物品列表
	getGoodsList();
	//查看、编辑时调用的方法
	getOneRoomOnfo();
}) 

//获取物品列表
function getGoodsList(){
	$.ajax({
		url:url+'/meetingRoom/getGoodsList',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data,status){
			addGoodsData(data);
		},
		error:function(data){
			console.log(data);
		}
	})
}

//获取一条信息，回显
function getOneRoomOnfo(){
	if(meetingno == null || meetingno == '' || meetingno == 'undefined'){
		return;
	}
	$.ajax({
		url:url+'/meetingRoom/getOneRoomInfo?fno='+meetingno,
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			var res=JSON.parse(data.result);
			//根据查询的结果为表单赋值
			setFormValue(res);
			//禁止操作
			if(opttype == 2){
				setDisabled();
			}
		},
		error:function(data){
			console.log(data);
		}
	})
}

//为表单赋值
function setFormValue(data){
	//输入框赋值
	$("#roomno").val(data.roomno);
	$("#roomname").val(data.roomname);
	$("#roomplace").val(data.roomplace);
	$("#roomsize").val(data.roomsize);
	$("#remark").val(data.remark);
	//物品赋值
	if(data.goodslist != undefined){
		for(var i=0;i<data.goodslist.length;i++){
			for(var j=0;j<$("#goods").find(".checkbox").length;j++){
				if($("#goods").find(".checkbox").eq(j).attr("value") == data.goodslist[i].name){
					$("#goods").find(".checkbox").eq(j).addClass("curr");
				}
			}
		}
	}
	
	//签到点赋值
	var signinmap1=[];
	for(var i=0;i<data.signinlist.length;i++){
		signinmap1.push(data.signinlist[i].DoorNo+":"+data.signinlist[i].DoorName);
	}
	selectedsignin(signinmap1);
	
	//签退点赋值
	var signbackmap1=[];
	for(var i=0;i<data.signbacklist.length;i++){
		signbackmap1.push(data.signbacklist[i].DoorNo+":"+data.signbacklist[i].DoorName);
	}
	selectedsignback(signbackmap1);
	
	//switch按钮切换
	if(data.status==0){
		$("#checkbox").attr("checked",false);
		layui.use('form', function(){
			 var form = layui.form; 
			 form.render('checkbox');
		})
	}
}

//门区选择后返回的参数
function init(){
	$("#selectedsignin span").remove();
	$("#selectedsignback span").remove();
	//根据已选择的会议室赋值
	if((a_signinmap != null && a_signinmap != '') || (a_signbackmap != null && a_signbackmap != '')){
		selectedsignin(a_signinmap);
		selectedsignback(a_signbackmap);
	}
}

//签到点赋值
function selectedsignin(signinmap){
	var html = '';
	for(var i=0;i<signinmap.length;i++){
		var keyandvalue = signinmap[i].split(":");
		html=html+"<span class='checkInPoint' value="+keyandvalue[0]+">"+keyandvalue[1]+"</span>";
	}
	$("#selectedsignin").append(html);
}

//签退点赋值
function selectedsignback(signbackmap){
	var html = '';
	for(var i=0;i<signbackmap.length;i++){
		var keyandvalue = signbackmap[i].split(":");
		html=html+'<span class="checkInPoint" value='+keyandvalue[0]+'>'+keyandvalue[1]+'</span>';
	}
	$("#selectedsignback").append(html);
}

//双击签到签退点删除
$(document).on("dblclick",".checkInPoint",function(){
	$(this).remove();
	var id=$(this).attr("value");
	
})

//---------------------------------------------物品
//打开物品弹窗
$("#openGoodsWin").click(function(){
	if(opttype == 2){
		return;
	}
	$("#goodsWin").fadeIn(500);
	$("#goodsWin1").fadeIn(500);
	$('#inputDiv').empty();
	var html = '<div style="text-align:center;margin-bottom:20px">';
	html = html + '<input type="text" class="input layer_goods">';
	html = html + '<span><img class="addInput" alt="" src="img/add1.png"></span>&nbsp;&nbsp;';
	html = html + '<span><img class="cutInput" alt="" src="img/cut1.png"></span>';
	html = html + '</div>';
	$("#inputDiv").append(html);
})

//点击物品加号
$(document).on("click",".addInput",function(){
	var html = '<div style="text-align:center;margin-bottom:20px">';
	html = html + '<input type="text" class="input layer_goods">';
	html = html + '<span><img class="addInput" alt="" src="img/add1.png"></span>&nbsp;&nbsp;';
	html = html + '<span><img class="cutInput" alt="" src="img/cut1.png"></span>';
	html = html + '</div>';
	$("#inputDiv").append(html);
})

//添加物品列表
function addGoodsData(data){
	$("#goods").empty();
	var html = "";
	for(var i=0;i<data.result.length;i++){
		html=html+"<span class=\"checkbox\" value="+data.result[i].name+">"+data.result[i].value+"</span>";
	}
	$("#goods").append(html);
}

//点击物品减号
$(document).on("click",".cutInput",function(){
	if($(".cutInput").length==1){
		return;
	}
	$($(this.parentNode.parentNode)).remove();
	
})

//保存物品信息
function saveGoodsInfos(goodsName){
	$.ajax({
		url:url+'/meetingRoom/addGoodsToDictionary',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:"goodsName="+goodsName,
		success:function(data,status){
			getGoodsList();
		},
		error:function(data){
			console.log(data);
		}
	})
}

//点击物品复选框
$(document).on("click","#a span.checkbox",function(){
	if(opttype == 2){
		return;
	}
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})
//-----------------------------------------------物品end

//禁止编辑
function setDisabled(){
	$("#roomno").attr("readOnly",true);
	$("#roomname").attr("readOnly",true);
	$("#roomplace").attr("readOnly",true);
	$("#roomsize").attr("readOnly",true);
	$("#remark").attr("readOnly",true);
	$("#a a").attr("onclick", "return false;");
}

//添加会议室信息
function saveroominfo(){
	var roomno=$("#roomno").val();
	var roomname=$("#roomname").val();
	var roomplace=$("#roomplace").val();
	var roomsize=$("#roomsize").val();
	var remark=$("#remark").val();
	var signinplace=[];
	var signbackplace=[];
	var status = h_status;
	var usergoods=[];
	//物品
	for(var i=0;i<$("#goods").find(".checkbox.curr").length;i++){
		usergoods.push($("#goods").find(".checkbox.curr").eq(i).attr("value"));
	}
	//签到点
	for(var i=0;i<$("#selectedsignin .checkInPoint").length;i++){
		var id=$("#selectedsignin .checkInPoint").eq(i).attr("value");
		signinplace.push(id);
	}
	//签退点
	for(var i=0;i<$("#selectedsignback .checkInPoint").length;i++){
		var id=$("#selectedsignback .checkInPoint").eq(i).attr("value");
		signbackplace.push(id);
	}
	if(roomno==""){
		layer.msg("请输入编号!",{time:2000});
		return;
	}
	if(roomname==""){
		layer.msg("请输入会议室名称!",{time:2000});
		return;
	}
	if(roomplace==""){
		layer.msg("请输入会议室位置!",{time:2000});
		return;
	}
	if(roomsize==""){
		layer.msg("请输入容纳人数!",{time:2000});
		return;
	}
	if(signinplace.length==0){
		layer.msg("请选择会议签到点!",{time:2000});
		return;
	}
	if(signbackplace.length==0){
		layer.msg("请选择会议签退点!",{time:2000});
		return;
	}
	signinplace=signinplace.join();
	signbackplace=signbackplace.join();
	var obj = {"fno":meetingno,
			   "roomno":roomno,
			   "roomname":roomname,
			   "roomplace":roomplace,
			   "roomsize":roomsize,
			   "remark":remark,
			   "signinplace":signinplace,
			   "signbackplace":signbackplace,
			   "status":status,
			   "usergoods":usergoods.join()};
	
	$.ajax({
		url:url+'/meetingRoom/saveRoomInfo',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:JSON.stringify(obj),
		contentType:"application/json",
		success:function(data){
			window.location.href = 'meetingRoomManagement.html';
		},
		error:function(data){
			console.log(data);
		}
	})
}

//取消按钮
function returnroomlist(){
	window.location.href = 'meetingRoomManagement.html';
}

//点击弹出框的叉
$(".quxiao").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框的取消
$(".bottom_qx").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框的确定
$("#goodsBtn").click(function(){
	//保存物品信息
	var arr=[];
	for(var i=0;i<$(".layer_goods").length;i++){
		var goods=$(".layer_goods").eq(i).val();
		 arr.push(goods);
	}
	
	saveGoodsInfos(arr.join());
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})

$("#signBtn").click(function(){
	//保存物品信息
	var arr=[];
	for(var i=0;i<$(".layer_goods").length;i++){
		var goods=$(".layer_goods").eq(i).val();
		 arr.push(goods);
	}
	
	saveGoodsInfos(arr.join());
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})

//点击弹出框中的方框
$(".door_center").click(function(){
	$(this).addClass("current").siblings().removeClass("current");
})


layui.use('form', function(){
	 var form = layui.form; 
	 form.render('checkbox');
	 
	 form.on('switch(formDemo)', function(data){
		 if(opttype == 2){
			 data.elem.checked = !data.elem.checked;
			 return;
		 }
		 h_status=(data.elem.checked)?'1':'0';
	 });
})

$("#signin").click(function(){
	$("#b .switchPanel").eq(0).addClass("curr").siblings().removeClass("curr");
	$("#b table span.checkbox").removeClass("curr");
	if($("#selectedsignin span").length!=0){
		var arr=[];
		a_signinmap=[];
		for(var i=0;i<$("#selectedsignin span").length;i++){
			var doorno=$("#selectedsignin span").eq(i).attr("value");
			var doorname=$("#selectedsignin span").eq(i).html();
			arr.push(doorno);
			a_signinmap.push(doorno+':'+doorname);
		}
		for(var i=0;i<$("#b table span.checkbox").length;i++){
			for(var k=0;k<arr.length;k++){
				if($("#b table span.checkbox").eq(i).attr("value")==arr[k]){
					$("#b table span.checkbox").eq(i).addClass("curr");
				}
			}
		}
		a_signin=arr;
	}else{
		a_signin=[];
		a_signinmap=[];
	}
	if($("#selectedsignback span").length!=0){
		var arr=[];
		a_signbackmap=[];
		for(var i=0;i<$("#selectedsignback span").length;i++){
			var doorno=$("#selectedsignback span").eq(i).attr("value");
			var doorname=$("#selectedsignback span").eq(i).html();
			arr.push(doorno);
			a_signbackmap.push(doorno+':'+doorname);
		}
		a_signback=arr;
	}else {
		a_signback=[];
		a_signbackmap=[];
	}
	$("#b").show();
	$("#a").hide();
})

$("#signback").click(function(){
	$("#b .switchPanel").eq(1).addClass("curr").siblings().removeClass("curr");
	$("#b table span.checkbox").removeClass("curr");
	if($("#selectedsignback span").length!=0){
		var arr=[];
		a_signbackmap=[];
		for(var i=0;i<$("#selectedsignback span").length;i++){
			var doorno=$("#selectedsignback span").eq(i).attr("value");
			var doorname=$("#selectedsignback span").eq(i).html();
			a_signbackmap.push(doorno+':'+doorname);
			arr.push(doorno);
		}
		for(var i=0;i<$("#b table span.checkbox").length;i++){
			for(var k=0;k<arr.length;k++){
				if($("#b table span.checkbox").eq(i).attr("value")==arr[k]){
					$("#b table span.checkbox").eq(i).addClass("curr");
				}
			}
		}
		a_signback=arr;
	}else{
		a_signback=[];
		a_signbackmap=[];
	}
	if($("#selectedsignin span").length!=0){
		var arr=[];
		a_signinmap=[];
		for(var i=0;i<$("#selectedsignin span").length;i++){
			var doorno=$("#selectedsignin span").eq(i).attr("value");
			var doorname=$("#selectedsignin span").eq(i).html();
			a_signinmap.push(doorno+':'+doorname);
			arr.push(doorno);
		}
		a_signin=arr;
	}else{
		a_signin=[];
		a_signinmap=[];
	}
	$("#b").show();
	$("#a").hide();
})

//获取页面跳转参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
       return decodeURI(r[2]);
    }else{
       return null;
    } 
}