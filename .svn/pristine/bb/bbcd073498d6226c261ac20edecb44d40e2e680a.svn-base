$(function(){
	getRoomView();
})
function getRoomView(){
	$.ajax({
		url:url+"/meetingRoom/getRoomView",
		type:"POST",
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $div=$("<div class='search-box main-form'><h4>"+item.roomname+"</h4></div>");
					var $table=$("<table><tr><td>使用日期</td><td>使用时间</td><td>会议主题</td><td>会议类型</td><td>召集人</td></tr></table>");
					var meetinglist=item.meetinglist;
					for(var i=0;i<meetinglist.length;i++){
						var $tr=$("<tr><td>"+meetinglist[i].meetingdate+"</td><td>"+meetinglist[i].meetingtime+"</td><td>"+meetinglist[i].mettingtitle+"</td>" +
								"<td>"+meetinglist[i].mettingtypename+"</td><td>"+meetinglist[i].promotername+"</td></tr>");
						$table.append($tr);
					}
					$div.append($table);
					$(".main-table").append($div);
				}
			}
		}
	})
}