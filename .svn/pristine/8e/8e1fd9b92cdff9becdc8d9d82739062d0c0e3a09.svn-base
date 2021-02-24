$(function(){
	queryVisitorsRegisterRecordList();
	getPage();
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  //执行一个laydate实例
		  laydate.render({
		    elem: '#visitorsdate', //指定元素
		    trigger:"click",
		  });
	});
})

//分页查找
var page;//设置首页页面
var limit;//每页显示的条数
var total;//总条数
//分页查询
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,//每页显示条数
			count:total,//数据总条数，从服务端得到
			curr:page,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;//改变当前页
				limit=obj.limit;//每页显示数
				//首次不执行
				if(!first){
					queryVisitorsRegisterRecordList();
				}
			}
		})
	})
}//end 

//条件查询
$("#queryBtn").click(function(){
	queryVisitorsRegisterRecordList();
	getPage();
})

function queryVisitorsRegisterRecordList(){
	var visitorstype=$("#visitorstype").val();
	var receiversname=$("#receiversname").val();
	var approvertype=$("#approvertype").val();
	var visitorsdate=$("#visitorsdate").val();
	var obj={"visitorstype":visitorstype,"receiversname":receiversname,
			"filldate":visitorsdate,"approvertype":approvertype,
			"pageIndex":page,"pageSize":limit};
	console.log(obj)
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/queryVisitorsRegisterRecordList",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		//contentType:"application/json",
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(!data.flag){
				total=0;
				layer.msg(data.reason,{time:2000});
				return;
			}
			page=data.pageinfo.pageIndex;
			limit=data.pageinfo.pageSize;
			total=data.pageinfo.sumCount;
			var html="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var approvertypename=(val.approvertypename==undefined?"":val.approvertypename);
				var receiversname=(val.receiversname==undefined?"":val.receiversname);
				var departmentsname=(val.departmentsname==undefined?"":val.departmentsname);
				var visitorsreasontext=(val.visitorsreasontext==undefined?"":val.visitorsreasontext);
				var filldate=(val.filldate==undefined?"":val.filldate);
				var filltime=(val.filltime==undefined?"":val.filltime);
				var applystatus=(val.applystatus==undefined?"":val.applystatus);
				var applystatusname=(val.applystatusname==undefined?"":val.applystatusname);
				var visitorstype=(val.visitorstype==undefined?"":val.visitorstype);
				if(visitorstype=="P"){
					visitorstype="人员";
				}else{
					visitorstype="车辆";
				}
				var txt="<a href='detailInfo.html' class='see layui-btn layui-btn-xs' data-id="+id+">详情查看</a>";
				html+="<tr><td>"+(i+1)+"</td><td>"+receiversname+"</td><td>"+departmentsname
				+"</td><td>"+filldate+"</td><td>"+filltime+"</td><td>"+visitorsreasontext
				+"</td><td>"+applystatusname+"</td><td>"+approvertypename
				+"</td><td>"+visitorstype+"</td><td>"+txt+"</td></tr>";
			})
			$("#cont").append(html);
		}
	})
}//end

$(document).on("click",".see",function(){
	var id=$(this).attr("data-id");
	console.log(id);
	localStorage.id=id;
})