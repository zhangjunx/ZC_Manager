$(function(){
	 getList();
	 getPage();
	 getDate();
})
//日期
function getDate() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;
		// 执行一个laydate实例
		laydate.render({
			elem : '#visitorsdate' // 指定元素
		});
		lay(".ipt").each(function() {
			laydate.render({
				elem : this, // 指定元素
				trigger : "click",
				type : "time",
			});
		})
	})
}// end

var page;// 当前页数
var limit;//每页显示数
var total;//总条数
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,//总条数
			limit:limit,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					getList();
				}
			}
		})
	})
}//end

//条件查询
$("#queryBtn").click(function(){
	getList();
	getPage();
})
function getList(){
	var receiversname=$("#receiversname").val();
	var visitorsname=$("#visitorsname").val();
	var visitorsdate=$("#visitorsdate").val();
	var intime=$("#intime").val();
	var outtime=$("#outtime").val();
	var visitorsstatusname=$("#visitorsstatusname").val();
	var obj1={"receiversname":receiversname,
			"visitorsname":visitorsname,"visitorsdate":visitorsdate,
			"intime":intime,"outtime":outtime,
			"visitorsstatusname":visitorsstatusname};
	 var obj={"str":JSON.stringify(obj1),"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/VisitorsInfo/queryVisitorsInfoListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				total=0;
				return;
			}
			page=data.page;
			limit=data.limit;
			total=data.total;
			var html="";
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="5005"){
					list.push(item);
				}
			}
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var visitorsname=(val.visitorsname==undefined?"":val.visitorsname);
				var carno=(val.carno==undefined?"":val.carno);
				var dringmodels=(val.dringmodels=="undefined"?"":val.dringmodels);
				var phone=(val.phone==undefined?"":val.phone);
				var visitorsdepartmentsname=(val.visitorsdepartmentsname==undefined?"":val.visitorsdepartmentsname);
				var visitorsdate=(val.visitorsdate1==undefined?"":val.visitorsdate1);
				var visitorstime=(val.visitorstime==undefined?"":val.visitorstime);
				var visitorsstatusname=(val.visitorsstatusname==undefined?"":val.visitorsstatusname);
				var visitorsreasontext=(val.visitorsreasontext==undefined?"":val.visitorsreasontext);
				var receiversname=(val.receiversname==undefined?"":val.receiversname);
				var departmentsname=(val.departmentsname==(undefined+" ")?"":val.departmentsname);
				var doorarr=(val.doorarr==undefined)?"":val.doorarr;
				if(list.findIndex(target=>target.Code=="query")==-1&&window.top.arr.length!=0){
					 var text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs layui-btn-warm'>查看详情</a>";
				 }else {
					 var text="<a href='visitor_registrationDetail.html' class='layui-btn layui-btn-xs layui-btn-warm see' name='"+id+"'>查看详情</a>";
				 }
				html+="<tr name='"+id+"'><td>"+id
				+"</td><td>"+visitorsname
				+"</td><td>"+carno
				+"</td><td>"+dringmodels
				+"</td><td>"+phone+"</td><td>"+visitorsdepartmentsname+"</td><td>"+visitorsdate
				+"</td><td>"+visitorstime+"</td><td>"+visitorsstatusname
				+"</td><td>"+visitorsreasontext+"</td><td>"+receiversname
				+"</td><td>"+departmentsname
				+"</td><td>"+doorarr
				+"</td><td>"+text+"</td></tr>";
			})
			$("#cont").append(html);
		}
	})
}//end

//点击查看
$(document).on("click",".see",function(){
	var id=$(this).attr("name");
	localStorage.id=id;
})

//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#printTable").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="5005"){
				list.push(item);
			}
			
		})
		for(var item of list){
			if(item.Code=="print"){
				$("#printTable").show();
			}
		}
	}


