var meetingid = getQueryString("meetingid");
var mettingtitle = getQueryString("mettingtitle");
var meetingdate = getQueryString("meetingdate");
$(function(){
	$("#mettingtitle").val(mettingtitle);
	$("#meetingdate").val(meetingdate);
	//加载已经上传的会议纪要
	initSummary();
})

function initSummary(){
	$.ajax({
		url:url+'/meetingsummary/getOneSummaryInfo',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:{"meetingid":meetingid},
		success:function(data,status){
			console.log(data);
			if(data.result != null && data.result != ''){
				$("#name").val(data.result.name);
				$("#recorder").val(data.result.recorder);
				$("#context").val(data.result.context);
			}
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	})
}

function insertMeetingMinutes(){
	if($("#name").val().length==0){
		layer.msg("请填写纪要名称!",{time:2000});
		return;
	}
	if($("#recorder").val().length==0){
		layer.msg("请填写记录人!",{time:2000});
		return;
	}
	var obj={
			"meetingid":meetingid,
			"name":$("#name").val(),
			"recorder":$("#recorder").val(),
			"context":$("#context").val()
	};
	//获取文件
	var formData = new FormData();
	formData.append("file", $("#upload")[0].files[0]);
	formData.append("json",JSON.stringify(obj));
	$.ajax({
		url:url+'/meetingsummary/saveOneSummaryInfo',
		dataType:'json',//数据类型
		type:'POST',//类型
		contentType: false,
		processData: false,
		mimeType: "multipart/form-data",
		data:formData,
		async:false,
		success:function(data,status){
			window.location.href = 'meetingList.html';
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	})
}

//选择文件
$("#upload").change(function(){
	var file=document.getElementById("upload").files[0];
	var filename=file.name;
	$("#filename").html(filename);
})

$("#insertMeetingMinutes").click(function(){
	insertMeetingMinutes();
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