var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
//选项卡
$(".main-tab .label").click(function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".approval table").eq($(this).index()).show().siblings().hide();
	if($(this).index()==5){
		//会议
		queryMeeting();
		getPage(total);
	}
})
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
						queryMeeting();
					}
				}
			})
		})
	}//end
function queryMeeting(){
	$.ajax({
		url:url+'/meeting/getMeetingApproval?meetingstatus=1&thisuserid='+window.top.holderno,
		dataType:'json',//数据类型
		data:{"curpage":curpage,"pagesize":pagesize},
		type:'POST',//类型
		async:false,
		success:function(data,status){
			$("#cont6").empty();
			total=data.count;
			var html='';
			for(var i=0;i<data.result.length;i++){
				var arr1=[];
				for(var k=0;k<data.result[i].promoterList.length;k++){
					arr1.push(data.result[i].promoterList[k].HolderName);
				}
				var arr2=[];
				for(var k=0;k<data.result[i].hostList.length;k++){
					arr2.push(data.result[i].hostList[k].HolderName);
				}
				html=html+'<tr>';
				html=html+'<td>'+(i+1)+'</td>';
				html=html+'<td>'+data.result[i].meetingtypename+'</td>';
				html=html+'<td>'+data.result[i].mettingtitle+'</td>';
				html=html+'<td>'+arr1.join()+'</td>';
				html=html+'<td>'+arr2.join()+'</td>';
				html=html+'<td>'+data.result[i].roomname+'</td>';
				html=html+'<td>'+(data.result[i].outroomname==undefined?'':data.result[i].outroomname)+'</td>';
				html=html+ "<td class=\"no-print\">" +
				"<a href=\"javascript:;\" onclick=\"approveMeeting("+data.result[i].fno+","+data.result[i].meetingstatus+")\" class=\"layui-btn layui-btn-xs\">审批</a>" +
				"<a href=\"javascript:;\" onclick=\"unApproveMeeting("+data.result[i].fno+","+data.result[i].meetingstatus+")\" class=\"layui-btn layui-btn-xs\">驳回</a>" +
				'</td>';
				html=html+'</tr>';
			}
			$("#cont6").append(html);
		}
	})
}
//审批
function approveMeeting(meetingid,status){
	$.ajax({
		url:url+'/meeting/updateMeetingStatus?meetingid='+meetingid+'&status=2',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data,status){
			queryMeeting();
		}
	})
}

//驳回
function unApproveMeeting(meetingid,status){
	$.ajax({
		url:url+'/meeting/updateMeetingStatus?meetingid='+meetingid+'&status=0',
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data,status){
			queryMeeting();
		}
	})
}