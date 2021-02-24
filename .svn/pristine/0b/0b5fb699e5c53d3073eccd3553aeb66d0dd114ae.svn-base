var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	//查询审批记录
	queryApprover();
	getPage(total);
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
						if($(".main-tab .curr a").html()=="考勤审批记录"){
							queryApprover();
						}else if($(".main-tab .curr a").html()=="会议审批记录"){
							getMeetingLit();
						}
					}
				}
			})
		})
	}//end
//分页
function getPageMeeting(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test_meeting",
			limit:pagesize,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				curpage=obj.curr;
				pagesize=obj.limit;
				if(!first){
					if($(".main-tab .curr a").html()=="考勤审批记录"){
						queryApprover();
					}else if($(".main-tab .curr a").html()=="会议审批记录"){
						getMeetingLit();
					}
				}
			}
		})
	})
}//end
//选项卡
$(".main-tab .label").click(function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".approval table").eq($(this).index()).show().siblings().hide();
	if($(this).index()==0){
		//考勤
		$("#content1").show();
		$("#content2").hide();
		queryApprover();
		getPage(total);
	}else if($(this).index()==1){
		//会议
		$("#content1").hide();
		$("#content2").show();
		getMeetingLit();
		getPageMeeting(total);
	}
})

//点击搜索
$("#queryDeptListByConditionBtn").click(function(){
	queryApprover();
	getPage(total);
})

function queryParmMeeting(){
	getMeetingLit();
}

//会议审批记录
function getMeetingLit(){
	var mettingtitle = $("#mettingtitle").val();
	var obj={"thisuserid":window.top.holderno,"meetingstatus":"0,2,3,4","mettingtitle":mettingtitle,"curpage":curpage,"pagesize":pagesize};
	$.ajax({
		url:url+'/meeting/getMeetingApproval',
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			$("#meetingcont").empty();
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
				html=html+ '<td class="no-print">'+(data.result[i].meetingstatus==0?'驳回':'审批')+'</td>';
				html=html+'</tr>';
			}
			$("#meetingcont").append(html);
		}
	})
}

//查询审批记录
function queryApprover(){
	var type=$(".type").val();
	var obj={"holderno":window.top.holderno,"topictype":type,"curpage":curpage,"pagesize":pagesize};
	$.ajax({
		url:url+"/appeme/queryApprover",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			$("#cont").empty();
			total=data.count;
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderno==undefined?"":item.holderno);
					var holdername=(item.holdername==undefined?"":item.holdername);
					var deptname=(item.departmentname==undefined?"":item.departmentname);
					var applytime=(item.applytime==undefined?"":item.applytime);
					var topictype=(item.topictype==undefined?"":item.topictype);
					var begintime=(item.begintime==undefined?"":item.begintime);
					var endtime=(item.endtime==undefined?"":item.endtime);
					var causetype=(item.causetype==undefined?"":item.causetype);
					var tremark=(item.tremark==undefined?"":item.tremark);
					var place=(item.place==undefined?"":item.place);
					var detailedplace=(item.detailedplace==undefined?"":item.detailedplace);
					var auditstatus=(item.auditstatus==undefined?"":item.auditstatus);
					var tauditstatus=(item.tauditstatus==undefined?"":item.tauditstatus);
					var aremark=(item.aremark==undefined?"":item.aremark);
					var punchtime=(item.punchtime==undefined?"":item.punchtime);
					var $tr=$("<tr></tr>");
					var $td1=$("<td>"+holderno+"</td>");
					var $td2=$("<td>"+holdername+"</td>");
					var $td3=$("<td>"+deptname+"</td>");
					var $td4=$("<td>"+applytime+"</td>");
					var $td5=$("<td></td>");
					var $td6=$("<td>"+begintime+"</td>");
					var $td7=$("<td>"+endtime+"</td>");
					var $td8=$("<td>"+causetype+"</td>");
					var $td9=$("<td>"+tremark+"</td>");
					var $td10=$("<td>"+aremark+"</td>");
					var $td11=$("<td></td>");
					var $td12=$("<td></td>");
					var $td13=$("<td></td>");
					if(topictype=="cc"){
						$td5.append("出差");
						$td11.append(place+"&nbsp;&nbsp;&nbsp;&nbsp"+detailedplace);
					}else if(topictype=="qj"){
						$td5.append("请假");
						$td11.append(detailedplace)
					}else if(topictype=="bk"){
						$td5.append("补打卡");
						$td6.append(punchtime);
						$.ajax({
							url:url+"/DoorUnit/queryDoorByDoorNo",
							type:"POST",
							data:{"doorno":place},
							async:false,
							success:(data)=>{
								if(data.flag){
									var res=data.result;
									$td8.append().empty();
									$td8.append(res[0].doorname);
								}
							}
							
						})
					}else if(topictype=="jb"){
						$td5.append("加班");
						$td8.append(detailedplace);
					}else if(topictype=="tx"){
						$td5.append("调休");
					}
					if(auditstatus=="12"){
						$td13.append("同意").css("color","green");
					}else{
						$td13.append("驳回").css("color","red");
					}
					if(tauditstatus=="11"){
						$td12.append("审批中");
					}else if(tauditstatus=="12"){
						$td12.append("同意");
					}else{
						$td12.append("驳回");
					}
					$tr.append($td1);
					$tr.append($td2);
					$tr.append($td3);
					$tr.append($td4);
					$tr.append($td5);
					$tr.append($td6);
					$tr.append($td7);
					$tr.append($td8);
					$tr.append($td11);
					$tr.append($td9);
					$tr.append($td10);
					$tr.append($td12);
					$tr.append($td13);
					$("#cont").append($tr);
				}
			}
		}
	})
}//end