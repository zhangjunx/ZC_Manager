$(function(){
	getTableData();
})
var panelType=0;
var a_signin=[],a_signback=[];
var a_signinmap = [];
var a_signbackmap = [];

function getTableData(){
	$.ajax({
		url:url+'/meetingRoom/getDoorList',
		dataType:'json',//数据类型
		type:'POST',//类型
		timeout:2000,//超时
		async:false,
		success:function(data,status){
			//添加表格数据
			addTableData(data);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			if(textStatus==='timeout'){
				alert('請求超時');
				setTimeout(function(){
					alert('重新请求');
				},2000);
			}
		}
	})
}

//添加表格数据
function addTableData(data){
	var html='';
	var useredAreaID=[];
	for(var i=0;i<data.result.length;i++){
		var trHtml = '<tr>';
		var areaID = data.result[i].AreaID;
		var doorCheck='';
		
		if(useredAreaID.indexOf(areaID) != -1){
			continue;
		}
		useredAreaID.push(areaID);
		for(var j=0;j<data.result.length;j++){
			if(data.result[j].AreaID == areaID){
				doorCheck = doorCheck+'<span class="checkbox" style="width:20%;text-align:left" value='+data.result[j].DoorNo+'>'+data.result[j].DoorName+'</span>';
			}
		}
		
		trHtml = trHtml + '<td>'+data.result[i].AreaName+'</td>';
		trHtml = trHtml + '<td>'+doorCheck+'</td></tr>';
		html = html+trHtml
	}
	$("#b #cont1").empty();
	$("#b #cont1").append(html);
}

//tablePanel点击切换
$("#b .switchPanel").click(function(){
	$(".switchPanel").removeClass("curr");
	$(this).addClass("curr");
	panelType = $(this).attr("value");
	//刷新列表
	getTableData();
	
	//复选框赋值
	checkSetVal();
})

//复选框赋值回显
function checkSetVal(){
	if(panelType == 0){
		for(var i=0;i<$("#b span.checkbox").length;i++){
			var thisCheckVal = $("#b span.checkbox").eq(i).attr("value");
			for(var j =0;j<a_signin.length;j++){
				if(a_signin[j] == thisCheckVal){
					$("#b span.checkbox").eq(i).addClass("curr");
					continue;
				}
			}
		}
	}else{
		for(var i=0;i<$("#b span.checkbox").length;i++){
			var thisCheckVal = $("#b span.checkbox").eq(i).attr("value");
			for(var j =0;j<a_signback.length;j++){
				if(a_signback[j] == thisCheckVal){
					$("#b span.checkbox").eq(i).addClass("curr");
					continue;
				}
			}
		}
	}
}


//点击选中复选框
$(document).on("click","#b span.checkbox",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
	if(panelType == 0){
		a_signinmap=[];
		a_signin=[];
		for(var i=0;i<$("#b span.checkbox.curr").length;i++){
			a_signin.push($($("#b span.checkbox.curr")[i]).attr("value"));
			a_signinmap.push($($("#b span.checkbox.curr")[i]).attr("value")+':'+$($("#b span.checkbox.curr")[i]).html());
		}
	}else{
		a_signbackmap=[];
		a_signback=[];
		for(var i=0;i<$("#b span.checkbox.curr").length;i++){
			a_signback.push($($("#b span.checkbox.curr")[i]).attr("value"));
			a_signbackmap.push($($("#b span.checkbox.curr")[i]).attr("value")+':'+$($("#b span.checkbox.curr")[i]).html());
		}
	}
})

//点击确认按钮
function addCheck(){
	$("#a").show();
	$("#b").hide();
	init();
}

//点击取消按钮
function delCheck(){
	a_signin=[],a_signback=[];
	a_signinmap = [];
	a_signbackmap = [];
	$("#a").show();
	$("#b").hide();
}