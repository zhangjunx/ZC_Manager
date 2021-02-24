var meetingno=getQueryString("meetingno");
$(function(){
	getOneInfo(meetingno);
})
function getOneInfo(meetingno){
	$.ajax({
		url:url+"/meeting/getOneMeetingInfo?meetingno="+meetingno,
		type:"POST",
		success:function(data1){
			var data = JSON.parse(data1.result);
			console.log(data);
			//审核人
			var approvername = [];
			if(data.ApproverList != null && data.ApproverList != ''
				&& data.ApproverList != undefined){
				for(var i=0;i<data.ApproverList.length;i++){
					approvername.push(data.ApproverList[i].HolderName);
				}
			}
			//主持人
			var hostname = [];
			if(data.hostList != null && data.hostList != ''
				&& data.hostList != undefined){
				for(var i=0;i<data.hostList.length;i++){
					hostname.push(data.hostList[i].HolderName);
				}
			}
			//参议人
			var persons = [];
			if(data.person != null && data.person != ''
				&& data.person != undefined){
				for(var i=0;i<data.person.length;i++){
					persons.push(data.person[i].holdername);
				}
			}
			//召集人
			var prompters = [];
			if(data.promoterList != null && data.promoterList != ''
				&& data.promoterList != undefined){
				for(var i=0;i<data.promoterList.length;i++){
					prompters.push(data.promoterList[i].HolderName);
				}
			}
			//参议人员
			var value1="";
			for(var item of persons){
				value1+=item+"&nbsp;&nbsp;";
			}
			//主持人
			var value2="";
			for(var item of hostname){
				value2+=item+"&nbsp;&nbsp;";
			}
			//召集人
			var value3="";
			for(var item of prompters){
				value3+=item+"&nbsp;&nbsp;";
			}
			$("#meetingtype").html(data.typename);
			$("#meetingtitle").html(data.mettingtitle);
			$("#approver").html(value3);
			$("#host").html(value2);
			$("#roomname").html(data.roomname);
			$("#roomplace").html(data.outroomname);
			$("#summaryname").html("<a href='javascript:;' onclick=downloadFile("+data.fno+")><font color='blue'>"+(data.summaryname==undefined?'':data.summaryname)+'</font></a>');
			$("#meetingdate").html(data.meetingdate);
			$("#meetingtime").html(data.meetingtime);
			$("#persons").html(value1);
		}
	})
}

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

//下载会议纪要
function downloadFile(meetingid){
	$.ajax({
		url:url+"/meetingsummary/getSummaryFile?meetingid="+meetingno,
		type:"POST",
		success:function(response, status, request){
			var disp = request.getResponseHeader('Content-Disposition');
	        if (disp && disp.search('attachment') != -1) {
	            var form = $('<form method="POST" action="' + url+"/meetingsummary/getSummaryFile?meetingid="+meetingno + '">');
	            form.append($('<input type="hidden">'));
	            $('body').append(form);
	            form.submit();
	        }
		}
	})
}
