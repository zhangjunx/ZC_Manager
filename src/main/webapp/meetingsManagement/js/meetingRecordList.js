var total;
var curpage=1;//当前页
var pagesize=10;//每页显示的条数
$(function(){
	//初始化表格
	var obj={"curpage":curpage,"pagesize":pagesize};
	initTable(obj);
	getPage(total);
})

//初始化表格
function initTable(obj){
	$.ajax({
		url:url+'/meeting/getMeetingRecordList',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data){
			
			total = data.count;
			var res=JSON.parse(data.result);
			//添加表格数据
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
		if(item.ModelCode=="7004"){
			list.push(item);
		}
	}
	var html = "";
	var text1="";
	for(var i=0;i<data.length;i++){
		if(list.findIndex(target=>target.Code=="query")==-1&&window.top.arr.length!=0){
			 text1="<a href=\"javascript:;\" class=\"layui-bg-gray layui-btn layui-btn-xs layui-btn-warm\">查看详情</a>";
		 }else {
			 text1="<a href=\"javascript:;\" onclick=\"getOneMeetingInfo("+data[i].fno+")\" class=\"mo layui-btn layui-btn-xs layui-btn-warm\">查看详情</a>";
		 }
		var summaryName="";
		if(data[i].summaryinfo != undefined){
			summaryName = data[i].summaryinfo.name;
		}
		var meetingtypename=(data[i].meetingtypename==undefined)?"":data[i].meetingtypename;
		var meetinglocation = (data[i].outroomname==undefined)?"":data[i].outroomname;
		var mettingtitle = (data[i].mettingtitle==undefined)?"":data[i].mettingtitle;
		var promotername = (data[i].promotername==undefined)?"":data[i].promotername;
		var hostname = (data[i].hostname==undefined)?"":data[i].hostname;
		var roomname = (data[i].roomname==undefined)?"":data[i].roomname;
		var meetingdate = (data[i].meetingdate==undefined)?"":data[i].meetingdate;
		var meetingtime = (data[i].meetingtime==undefined)?"":data[i].meetingtime;
		var attendP = (data[i].attendP==undefined)?"":data[i].attendP;
		var arr1=[];
		for(var k=0;k<data[i].promoterList.length;k++){
			arr1.push(data[i].promoterList[k].HolderName);
		}
		var arr2=[];
		for(var k=0;k<data[i].hostList.length;k++){
			arr2.push(data[i].hostList[k].HolderName);
		}
		var trHtml = "<tr>";
		trHtml = trHtml + "<td data-meetingid="+data[i].fno+">"+(i+1)+"</td>";
		trHtml = trHtml + "<td>"+meetingtypename+"</td>";
		trHtml = trHtml + "<td>"+mettingtitle+"</td>";
		trHtml = trHtml + "<td>"+arr1.join()+"</td>";
		trHtml = trHtml + "<td>"+arr2.join()+"</td>";
		trHtml = trHtml + "<td>"+roomname+"</td>";
		trHtml = trHtml + "<td>"+meetinglocation+"</td>";
		trHtml = trHtml + "<td>"+summaryName+"</td>";//会议内容
		trHtml = trHtml + "<td>"+meetingdate+"</td>";
		trHtml = trHtml + "<td>"+meetingtime+"</td>";
		trHtml = trHtml + "<td>"+(data[i].attendP+data[i].unAttendP)+"</td>";//应到人数
		trHtml = trHtml + "<td>"+attendP+"</td>";//实到人数
		trHtml = trHtml + "<td class=\"no-print\">" +
				"<a href=\"javascript:;\" onclick=\"getOneMeetingInfo("+data[i].fno+")\" class=\"mo layui-btn layui-btn-xs layui-btn-warm\">查看详情</a>" +
				"</td></tr>"; 
		html = html + trHtml;
	}
	
	$("#cont").append(html);
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
//双击查看
$("tbody").on("dblclick","tr",function () {
	var meetingno = $(this).find("td").eq(0).attr("data-meetingid");
	window.location.href = 'meeting_watch.html?meetingno='+meetingno; 
})
function getOneMeetingInfo(meetingid){
	window.location.href = 'meeting_watch.html?meetingno='+meetingid;
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
					//调用加载函数加载数据
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
