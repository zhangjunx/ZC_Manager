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
		url:url+'/meetingRoom/getRoomList',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data,status){
			total = data.count;
			//添加表格数据
			addTableData(data);
		},
		error:function(data){
			console.log(data);
		}
	})
}

//点击查询按钮
$("#queryDeptListByConditionBtn").click(function(){
	curpage=1;
	var qroomname = $("#qroomname").val();
	var obj={"roomname":qroomname,"curpage":curpage,"pagesize":pagesize};
	initTable(obj);
	getPage(total);
})

//添加表格数据
function addTableData(data){
	$("#cont").empty();
	var list=[];
	for(var item of window.top.arr){
		if(item.ModelCode=="7001"){
			list.push(item);
		}
	}
	var html = "";
	var text1="";
	var text2="";
	for(var i=0;i<data.result.length;i++){
		if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
			 text1="";
		 }else {
			 text1="<a href=\"javascript:;\" onclick=\"updateRoomPage("+data.result[i].fno+")\" class=\"mo layui-btn layui-btn-xs\">修改</a>";
		 }
		 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
			 text2="";
		  }else {
			 text2="<a href=\"javascript:;\" class=\"shan layui-btn layui-btn-xs layui-btn-danger\">删除</a>";
		  }
		 if(text1==""&&text2==""){
			 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs'>修改</a>";
			 text2="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-danger'>删除</a>";
		 }
		var usergoodsname = data.result[i].usergoodsname==undefined?'':data.result[i].usergoodsname;
		var trHtml = "<tr>";
		trHtml = trHtml + "<td style=\"display:none\">"+data.result[i].fno+"</td>";
		trHtml = trHtml + "<td>"+(i+1)+"</td>";
		trHtml = trHtml + "<td>"+data.result[i].roomname+"</td>";
		trHtml = trHtml + "<td>"+data.result[i].roomplace+"</td>";
		trHtml = trHtml + "<td>"+usergoodsname+"</td>";
		trHtml = trHtml + "<td>"+data.result[i].roomsize+"</td>";
		trHtml = trHtml + "<td>"+(data.result[i].status==1?"启用":"禁用")+"</td>";
		trHtml = trHtml + "<td class=\"no-print\">"+text1+text2+"</td></tr>";
		html = html + trHtml;
	}
	
	$("#cont").append(html);
}

//双击查看
$("tbody").on("dblclick","tr",function () {
	var meetingno = $(this).find("td").eq(0).html();
	window.location.href = 'meetingRoomManagement_watch.html?opttype=2&meetingno='+meetingno; 
})

function updateRoomPage(meetingno){
	window.location.href = 'meetingRoom_add.html?opttype=1&meetingno='+meetingno; 
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
	                   var qroomname = $("#qroomname").val();
	            	   var obj={"roomname":qroomname,"curpage":curpage,"pagesize":pagesize};
	            	   initTable(obj);
				}
			}
		})
	})
}//end
//点击删除
$(document).on("click",".shan",function(){
	layer.confirm("确定删除?",{title:"提示信息"},function(index){
		layer.close(index);
		
	})
})

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertDepartmentData").hide();
		$("#seeMeetingRoom").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="7001"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertDepartmentData").show();
			}
			if(item.Code=="query"){
				$("#seeMeetingRoom").show();
			}
		}
	}

