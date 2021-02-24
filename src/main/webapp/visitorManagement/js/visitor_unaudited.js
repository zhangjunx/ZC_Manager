$(function(){
	//查询待审批消息
	queryVisitorsInfoByHolderAndUnaudited();
	getPage();
	getDate();
})

function getDate() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;
		// 执行一个laydate实例
		laydate.render({
			elem : '#iodate', // 指定元素
			type : 'date',
			format:'yyyy-MM-dd',
			value:new Date()
		});
		lay(".ipt").each(function() {
			laydate.render({
				elem : this, // 指定元素
				trigger : "click",
				type : "time"
			});
		})
	})
}// end

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
					queryVisitorsInfoByHolderAndUnaudited();
				}
			}
		})
	})
}//end 
$("#queryBtn").click(function(){
	queryVisitorsInfoByHolderAndUnaudited();
	getPage();
})

//查询待审批消息
function queryVisitorsInfoByHolderAndUnaudited(){
	var visitorsname=$("#visitorsname").val();
	var iodate=$("#iodate").val();
	var intime=$("#intime").val();
	var outtime=$("#outtime").val();
	var obj1={"visitorsname":visitorsname,"iodate":iodate,
			"intime":intime,"outtime":outtime,"applystatus":"10","receiverpeopleid":window.top.holderno};
	var obj={"str":JSON.stringify(obj1),"pageIndex":page,"pageSize":limit};
	var loadIndex = layer.load(1, {
        shade: [0.1, '#fff']
    });
	$.ajax({
		//url:url+"/VisitorsInfo/queryVisitorsInfoByHolderAndUnaudited",
		url:url+"/VisitorsInfo/queryVisitorsInfoListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
			layer.close(loadIndex);
			$("#cont").empty();
			if(!data.flag){
				total=0;
				layer.msg(data.reason,{time:2000})
				return;
			}
			
			page=data.page;
			limit=data.limit;
			total=data.total;
			var html="";
			$.each(data.result,function(i,val){
				var id=val.id==undefined?"":val.id;
				var visitorsname=val.visitorsname==undefined?"":val.visitorsname;
				var visitorsreasontext=val.visitorsreasontext==undefined?"":val.visitorsreasontext;
				var idcardno=val.idcardno==undefined?"":val.idcardno;
				var phone=val.phone==undefined?"":val.phone;
				var visitorsdepartmentsname=val.visitorsdepartmentsname==undefined?"":val.visitorsdepartmentsname;
				var dringmodels=val.dringmodels==undefined?"":val.dringmodels;
				var filldate=val.filldate==undefined?"":val.filldate;
				var startdate=val.startdate==undefined?"":val.startdate;
				var enddate=val.enddate==undefined?"":val.enddate;
				var doorarr=(val.doorarr==undefined)?"":val.doorarr;
				if(idcardno.length==18){
					idcardno=idcardno.substring(0,6)+"********"+idcardno.substring(14,18);
				}
				//var t="<img class='visitorPhoto' src='data:image/png;base64,"+visitorsphoto+"' style='width:60px;cursor:pointer'>";
				//var t1="<a href='visitors_see.html' data-id='"+id+"' class='see layui-btn layui-btn-xs'>详情查看</a>";
				var t1="<a href='visitor_registrationDetail.html' data-id='"+id+"' class='see layui-btn layui-btn-xs'>详情查看</a>";
				
				var t2="<a href='javascript:;' data-id='"+id+"' class='mo layui-btn layui-btn-xs layui-btn-warm'>同意</a>";
				var t3="<a href='javascript:;' data-id='"+id+"' class='shan layui-btn layui-btn-xs layui-btn-danger'>拒绝</a>";
				html+="<tr><td>"+id
				        +"</td><td>"+visitorsname
				        +"</td><td>"+visitorsdepartmentsname
						+"</td><td>"+visitorsreasontext
						+"</td><td>"+filldate
						+"</td><td>"+startdate
						+"</td><td>"+enddate
						+"</td><td>"+idcardno
						+"</td><td>"+phone
						+"</td><td>"+dringmodels
						+"</td><td>"+doorarr
						+"</td><td>"+t1+t2+t3+"</td></tr>";
			})
			$("#cont").append(html);
		},
		error:function(data){
			layer.close(loadIndex);
		}
	})
}//end

//点击详情查看
$(document).on("click",".see",function(){
	var id=$(this).attr("data-id");
	localStorage.id=id;
})

//点击同意
$(document).on("click",".mo",function(){
	var id=$(this).attr("data-id");
	var applystatus="20";
	var applystatusname="同意";
	var obj={"id":id,"applystatus":applystatus,"applystatusname":applystatusname};
	updateVisitorsApplyStatus(obj);
})
//点击拒绝
$(document).on("click",".shan",function(){
	var id=$(this).attr("data-id");
	var applystatus="21";
	var applystatusname="不同意";
	var obj={"id":id,"applystatus":applystatus,"applystatusname":applystatusname};
	updateVisitorsApplyStatus(obj);
})
function updateVisitorsApplyStatus(obj){
	$.ajax({
		url:url+"/VisitorsInfo/updateVisitorsApplyStatus?holderno="+window.top.holderno,
		type:"POST",
		data:JSON.stringify(obj),
		contentType:"application/json",
		success:function(data){
			console.log(data);
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			layer.msg(data.reason,{time:2000},function(){
				queryVisitorsInfoByHolderAndUnaudited();
			});
			
		}
	})
}


//鼠标经过照片的时候放大照片
$(document).on("mousemove","td .visitorPhoto",function(e){
	$("#bigPhoto").css("left",e.clientX+20+"px");
	$("#bigPhoto").css("top",e.clientY-200+"px");
	$("#bigPhoto").css("display","inline-block");
	var imgSrc=$(this).attr("src");
	$("#bigPhoto img").attr("src",imgSrc).css({
		"width":"200px",
		"height":"200px"
	});	
})
$(document).on("mouseleave","td .visitorPhoto",function(e){
	$("#bigPhoto").css("display","none");
})