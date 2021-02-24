$(function(){
	queryAuditedRecordList();
})

//点击刷新清屏
$(".refreshScreen").click(function(){
	$("#cont").empty();
})

/*var timer=setInterval(queryHolderListByDeptNos,2000);
	//点击刷新
	$(".realTime_refresh").click(function(){
		window.location.reload();
	})
	
	//点击实时刷新,切换复选框状态
	$(".checkbox").click(function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			clearInterval(timer);
		}else{
			$(this).addClass("curr");
			timer=setInterval(queryHolderListByDeptNos,2000);
		}
	}) 
*/
setInterval(queryAuditedRecordList,2000);
function queryAuditedRecordList(){
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/queryAuditedRecordList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var receiversname=(val.receiversname==undefined?"":val.receiversname);
				var departmentsname=(val.departmentsname==undefined?"":val.departmentsname);
				var filldate=(val.filldate==undefined?"":val.filldate);
				var visitorstype=(val.visitorstype==undefined?"":val.visitorstype);
				var approvertypename=(val.approvertypename==undefined?"":val.approvertypename);
				var approverrolename1=(val.approverrolename1==undefined?"":val.approverrolename1);
				var approverrolename2=(val.approverrolename2==undefined?"":val.approverrolename2);
				var directorchargename=(val.directorchargename==undefined?"":val.directorchargename);
				var directorname=(val.directorname==undefined?"":val.directorname);
				var applystatusname=(val.applystatusname==undefined?"":val.applystatusname);
				var visitorsreasontext=(val.visitorsreasontext==undefined?"":val.visitorsreasontext);
				if(visitorstype=="P"){
					visitorstype="人员";
				}else{
					visitorstype="车辆";
				}
				var txt="<a href='detailInfo.html' class='see layui-btn layui-btn-xs' data-id="+id+">详情查看</a>";
				html+="<tr><td>"+(i+1)+"</td><td>"+receiversname+"</td><td>"+departmentsname
				+"</td><td>"+filldate+"</td><td>"+visitorstype+"</td><td>"+approvertypename
				+"</td><td>"+approverrolename1+"</td><td>"+approverrolename2+"</td><td>"+directorchargename
				+"</td><td>"+directorname+"</td><td>"+applystatusname+"</td><td>"+visitorsreasontext+"</td><td>"+txt
				+"</td></tr>";
			})
			$("#cont").append(html);
		}
	})
}//end

//查看详情
$(document).on("click",".see",function(){
	var id=$(this).attr("data-id");
	console.log(id)
	localStorage.id=id;
	console.log(localStorage.id)
})