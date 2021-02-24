$(function(){
	getMeeingNoticeList();
})

function getMeeingNoticeList(){
	$.ajax({
		url:url+"/noticeData/getMeeingNoticeList?thisuserid="+window.top.holderno,
		type:"POST",
		success:function(data){
			console.log(data);
			$("#context").empty();
			var html='';
			for(var i=0;i<data.result.length;i++){
				html = html+'<div class="meetingNotice" onclick="updateWatchSatus('+data.result[i].fno+','+data.result[i].objectid+')">';
				html = html+'<dl class="meeting_left">';
				html = html+'<dt data-status='+data.result[i].status+'>会议</dt>';
				html = html+'<div class="dl_right">';
				html = html+'<dd>会议主题：<span class="meetingType">'+data.result[i].mettingtitle+'</span></dd>';
				html = html+'<dd>会议类型：<span class="meetingType">'+data.result[i].meetingtypename+'</span></dd>';
				html = html+'</div>';
				html = html+'</dl>';
				html = html+'<div class="meeting_right">';
				html = html+'<p>'+data.result[i].meetingtime+'</p>';
				html = html+'<p>'+data.result[i].meetingdate+'</p>';
				html = html+'</div>';
				html = html+'</div>';
			}
			$("#context").append(html);
			for(var i=0;i<$(".meetingNotice").length;i++){
				if($(".meetingNotice dt").eq(i).attr("data-status")=="1"){//已读
					$(".meetingNotice dt").eq(i).css("background","#eee").css("color","#666");
				}
			}
		}
	})
}
function updateWatchSatus(noticeno,meetingno){
	var obj={"noticeno":noticeno,"noticestatus":1,"thisuserid":window.top.holderno};
	$.ajax({
		url:url+"/noticeData/updateWatchSatus",
		type:"POST",
		data:obj,
		success:function(data){
			parent.getMeeingNoticeList();
			parent.totalMessage();
			window.location.href = 'meeting_watch_detail.html?meetingno='+meetingno; 
		}
	})
}
