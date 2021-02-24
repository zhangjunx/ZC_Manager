var total;
var curpage=1;//当前页
var pagesize=10;//每页显示的条数
$(function(){
	//初始化表格
	var obj={"curpage":curpage,"pagesize":pagesize};
	initTable(obj);
	getPage(total);
	showHide();
})

//初始化表格
function initTable(obj){
	$.ajax({
		url:url+'/meeting/getMeetingList',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data){
			total = data.count;
			//添加表格数据
			var res=JSON.parse(data.result);
			addTableData(res);
		},
		error:function(data){
			console.log(data);
		}
	})
}

//点击查询按钮
$("#queryDeptListByConditionBtn").click(function(){
	curpage=1;
	var qmettingtitle = $("#qmettingtitle").val();
	var qpromotername = $("#qpromotername").val();
	var qmeetingdate = $("#qmeetingdate").val();
	var obj={"mettingtitle":qmettingtitle,"promotername":qpromotername,"meetingdate":qmeetingdate,"curpage":curpage,"pagesize":pagesize};
	initTable(obj);
	getPage(total);
})

//添加表格数据
function addTableData(data){
	$("#cont").empty();
	var list=[];
	for(var item of window.top.arr){
		if(item.ModelCode=="7003"){
			list.push(item);
		}
	}
	var html = "";
	var text1="";
	var text2="";
	var text3="";
	var text4="";
	var text5="";
	for(var i=0;i<data.length;i++){
		if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
			 text1="";
		 }else {
			 text1="<a href=\"javascript:;\" onclick=\"updateMeetingPage("+data[i].fno+","+data[i].meetingstatus+")\" class=\"mo layui-btn layui-btn-xs\">修改</a>";
		 }
		 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
			 text2="";
		  }else {
			 text2="<a href=\"javascript:;\" onclick=\"meetingCancle("+data[i].fno+","+data[i].meetingstatus+")\" class=\"mo layui-btn layui-btn-xs layui-btn-danger\">会议取消</a>";
		  }
		 if(list.findIndex(target=>target.Code=="add1")==-1&&window.top.arr.length!=0){
			 text3="";
		  }else {
			 text3="<a href=\"javascript:;\" onclick=\"meetingsummary('"+data[i].fno+"','"+data[i].meetingstatus+"','"+data[i].mettingtitle+"','"+data[i].meetingtime+"')\" class=\"mo layui-btn layui-btn-xs\">新建会议纪要</a>";
		  }
		 if(list.findIndex(target=>target.Code=="add2")==-1&&window.top.arr.length!=0){
			 text4="";
		  }else {
			 text4="<a href=\"meeting_signIn.html?meetingid="+data[i].fno+"&roomtype="+data[i].roomtype+"\" class=\"signIn layui-btn layui-btn-xs\">会议签到</a>";
		  }
		 if(list.findIndex(target=>target.Code=="add3")==-1&&window.top.arr.length!=0){
			 text5="";
		  }else {
			 text5="<a href=\"meeting_signBack.html?meetingid="+data[i].fno+"&roomtype="+data[i].roomtype+"\" class=\"mo layui-btn layui-btn-xs\">会议签退</a>";
		  }
		 if(text1==""&&text2==""&&text3==""&&text4==""&&text5==""){
			 text1="<a href=\"javascript:;\"  class=\"layui-bg-gray layui-btn layui-btn-xs\">修改</a>";
			 text2="<a href=\"javascript:;\" class=\"layui-bg-gray layui-btn layui-btn-xs layui-btn-danger\">会议取消</a>";
			 text3="<a href=\"javascript:;\" class=\"layui-bg-gray layui-btn layui-btn-xs\">新建会议纪要</a>";
			 text4="<a href=\"javascript:;\" class=\"layui-bg-gray  layui-btn layui-btn-xs\">会议签到</a>";
			 text5="<a href=\"javascript:;\" class=\"layui-bg-gray layui-btn layui-btn-xs\">会议签退</a>";
		 }
		var meetingtypename=(data[i].meetingtypename==undefined)?"":data[i].meetingtypename;
		var meetinglocation= (data[i].outroomname==undefined)?"":data[i].outroomname;
		var    mettingtitle= (data[i].mettingtitle==undefined)?"":data[i].mettingtitle;
		var promotername = (data[i].promotername==undefined)?"":data[i].promotername;
		var hostname = (data[i].hostname==undefined)?"":data[i].hostname;
		var roomname = (data[i].roomname==undefined)?"":data[i].roomname;
		var meetingdate = (data[i].meetingdate==undefined)?"":data[i].meetingdate;
		var meetingtime = (data[i].meetingtime==undefined)?"":data[i].meetingtime;
		var signintime = (data[i].signintime==undefined)?"":data[i].signintime;
		var signbacktime = (data[i].signbacktime==undefined)?"":data[i].signbacktime;
		var meetingstatus=(data[i].meetingstatus==undefined)?"":data[i].meetingstatus;
		
		var ms = "";
		if(meetingstatus.replace(/^\s+|\s+$/g,"") == 0){
			ms = '驳回';
		}else if(meetingstatus.replace(/^\s+|\s+$/g,"") == '1'){
			ms = '待审核';
		}else if(meetingstatus.replace(/^\s+|\s+$/g,"") == '2'){
			ms = '审核';
		}else if(meetingstatus.replace(/^\s+|\s+$/g,"") == '3'){
			ms = '会议中';
		}else if(meetingstatus.replace(/^\s+|\s+$/g,"") == '4'){
			ms = '会议结束';
		}else if(meetingstatus.replace(/^\s+|\s+$/g,"") == '5'){
			ms = '会议过期';
		}
		var arr1=[];
		for(var k=0;k<data[i].promoterList.length;k++){
			arr1.push(data[i].promoterList[k].HolderName);
		}
		var arr2=[];
		for(var k=0;k<data[i].hostList.length;k++){
			arr2.push(data[i].hostList[k].HolderName);
		}
		var trHtml = "<tr>";
		trHtml = trHtml + "<td style=\"display:none\">"+data[i].fno+"</td>";
		trHtml = trHtml + "<td>"+(i+1)+"</td>";
		trHtml = trHtml + "<td>"+meetingtypename+"</td>";
		trHtml = trHtml + "<td>"+mettingtitle+"</td>";
		trHtml = trHtml + "<td>"+arr1.join()+"</td>";
		trHtml = trHtml + "<td>"+arr2.join()+"</td>";
		trHtml = trHtml + "<td><a href=\"javascript:;\" onclick=\"openperonwin("+data[i].fno+")\">点击查看</a></td>";
		trHtml = trHtml + "<td>"+roomname+"</td>";
		trHtml = trHtml + "<td>"+meetinglocation+"</td>";
		trHtml = trHtml + "<td>"+meetingdate+"</td>";
		trHtml = trHtml + "<td>"+meetingtime+"</td>";
		trHtml = trHtml + "<td>"+signintime+"</td>";
		trHtml = trHtml + "<td>"+signbacktime+"</td>";
		trHtml = trHtml + "<td>"+ms+"</td>";
		trHtml = trHtml + "<td class=\"no-print\">"+text1+text2+text3+text4+text5+"</td></tr>"; 
		html = html + trHtml;
	}
	$("#cont").append(html);
}

//双击查看
$("tbody").on("dblclick","tr",function () {
	var meetingno = $(this).find("td").eq(0).html();
	window.location.href = 'meeting_watch_detail.html?meetingno='+meetingno; 
})

function updateRoomPage(meetingno){
	window.location.href = 'meeting_add.html?opttype=1&meetingno='+meetingno; 
}


//日期
layui.use('laydate', function() {
	var laydate = layui.laydate;
	// 执行一个laydate实例
	laydate.render({
		elem : '#qmeetingdate' // 指定元素
	});
	lay(".ipt").each(function() {
		laydate.render({
			elem : this, // 指定元素
			trigger : "click",
			type : "time",
		});
	})
})

function updateMeetingPage(meetingno,meetingstatus){
	if(meetingstatus != 1){
		layer.msg('会议不是初始状态，禁止操作！！',{icon:5,time:2000})
		return;
	}
	window.location.href = 'meeting_add.html?opttype=1&meetingno='+meetingno;
}

//打开弹窗
function openperonwin(meetingid){
	$("#roomWin").fadeIn(500);
	$("#roomWin1").fadeIn(500);
	//加载参会人员
	initPersonist(meetingid);
}
//点击弹出框的叉
$("#roomquxiao").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框的取消
$("#bottom_qx").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})


function initPersonist(meetingid){
	$.ajax({
		url:url+'/meeting/getJoinMeetingMember?meetingid='+meetingid,
		dataType:'json',//数据类型
		type:'POST',//类型
		timeout:2000,//超时
		success:function(data,status){
			console.log(data);
			$("#personList").empty();
			var html='';
			for(var i=0;i<data.result.length;i++){
				html+="<div style='float: left;margin: 10px; cursor:pointer'><img style='width:50px;height:50px' src='/files/meetingFile/test.jpg'>" +
					  "<p class='username' id='"+data.result[i].holderid+"'>"+data.result[i].holdername+"</p></div>";
			}
			$("#personList").append(html);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
		}
	})
}

function meetingCancle(meetingid,meetingstatus){
	if(meetingstatus == 1 || meetingstatus == 5){
		layer.confirm("确定取消?",{title:"提示信息"},function(index){
			layer.close(index);
			$.ajax({
				url:url+'/meeting/updteMeetingCancle?meetingid='+meetingid,
				dataType:'json',//数据类型
				type:'POST',//类型
				timeout:2000,//超时
				success:function(data,status){
					var obj={"curpage":curpage,"pagesize":pagesize};
					initTable(obj);
					getPage(total);
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
				}
			})
		})
		
	}else{
		layer.msg('该会议禁止操作！！',{time:2000})
		return;
	}
}

//新建会议纪要
function meetingsummary(meetingid,meetingstatus,mettingtitle,meetingdate){
	if(meetingstatus != 4){
		layer.msg('会议未结束，禁止操作！！',{icon:5,time:2000})
		return;
	}else{
		window.location.href = 'MeetingMinutes.html?meetingid='+meetingid+
		'&mettingtitle='+mettingtitle+'&meetingdate='+meetingdate;
	}
}

//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"pages",
			limit:pagesize,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				curpage=obj.curr;
				pagesize=obj.limit;
				if(!first){
					var qmettingtitle = $("#qmettingtitle").val();
	        		var qpromotername = $("#qpromotername").val();
	        		var qmeetingdate = $("#qmeetingdate").val();
	               	var obj1={"mettingtitle":qmettingtitle,"promotername":qpromotername,"meetingdate":qmeetingdate,"curpage":curpage,"pagesize":pagesize};
	            	initTable(obj1);
				}
			}
		})
	})
}//end

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertDepartmentData").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="7003"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertDepartmentData").show();
			}
		}
	}

