$(function(){
	//查询待审批消息
	getList();
	getPage();
	getDate();
})

function getDate() {
	layui.use('laydate', function() {
		var laydate = layui.laydate;
		// 执行一个laydate实例
		laydate.render({
			elem : '#iodate' // 指定元素
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
					getList();
				}
			}
		})
	})
}//end 

$("#queryBtn").click(function(){
	getList();
	getPage();
})

//查询待审批消息
function getList(){
	var visitorsname=$("#visitorsname").val();
	var iodate=$("#iodate").val();
	var intime=$("#intime").val();
	var outtime=$("#outtime").val();
	var obj1={"visitorsname":visitorsname,"iodate":iodate,
			"intime":intime,"outtime":outtime};
	var obj={"str":JSON.stringify(obj1),"receiverpeopleid":window.top.holderno,"pageIndex":page,"pageSize":limit};
	var loadIndex = layer.load(1, {
        shade: [0.1, '#fff']
    });
	$.ajax({
		url:url+"/VisitorsInfo/queryVisitorsInfoByLoginHolder",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			$("#cont").empty();
			layer.close(loadIndex);
			if(!data.flag){
				total=0;
				layer.msg(data.reason,{time:2000})
				return;
			}
			page=data.page;
			limit=data.limit;
			total=data.total;
			//var res=data.result;
			//createTableVisitor(res);
			
			$.each(data.result,function(i,val){
				var id=val.id==undefined?"":val.id;
				var visitorsphoto=val.visitorsphoto==undefined?"":val.visitorsphoto;
				var visitorsname=val.visitorsname==undefined?"":val.visitorsname;
				var visitorsreasontext=val.visitorsreasontext==undefined?"":val.visitorsreasontext;
				var idcardno=val.idcardno==undefined?"":val.idcardno;
				var phone=val.phone==undefined?"":val.phone;
				var visitorsdepartmentsname=val.visitorsdepartmentsname==undefined?"":val.visitorsdepartmentsname;
				var dringmodels=val.dringmodels==undefined?"":val.dringmodels;
				var filldate=val.filldate==undefined?"":val.filldate;
				var startdate=val.startdate==undefined?"":val.startdate;
				var enddate=val.enddate==undefined?"":val.enddate;
				var doorarr=val.doorarr==undefined?"":val.doorarr;
				if(idcardno.length==18){
					idcardno=idcardno.substring(0,6)+"********"+idcardno.substring(14,18);
				}
				
				//var txt1="<a href='visitors_see.html' class='see layui-btn layui-btn-xs' data-id='"+val.id+"'>详情查看</a>";
				var t1="<a href='visitor_registrationDetail.html' data-id='"+id+"' class='see layui-btn layui-btn-xs'>详情查看</a>";
				
				var html="<tr><td>"+id
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
						+"</td><td>"+t1
						+"</td></tr>";
				$("#cont").append(html);
				
			})
			
			
		},
		error:function(data){
			layer.close(loadIndex);
		}
	})
}
function createTableVisitor(data){
	for(var item of data){
		var visitorsphoto=item.visitorsphoto==undefined?"":item.visitorsphoto;
		var visitorsname=item.visitorsname==undefined?"":item.visitorsname;
		var visitorsreasontext=item.visitorsreasontext==undefined?"":item.visitorsreasontext;
		var idcardno=item.idcardno==undefined?"":item.idcardno;
		var phone=item.phone==undefined?"":item.phone;
		var visitorsdepartmentsname=item.visitorsdepartmentsname==undefined?"":item.visitorsdepartmentsname;
		var dringmodels=item.dringmodels==undefined?"":item.dringmodels;
		
		var $tr=$("<tr><td><img class='visitorPhoto' src='data:image/png;base64,"+visitorsphoto+"' style='width:60px;cursor:pointer'></td><td>"+visitorsname+"</td>" +
				"<td>"+visitorsreasontext+"</td><td>"+idcardno+"</td><td>"+phone+"</td><td>"+visitorsdepartmentsname+"</td>" +
				"<td>"+dringmodels+"</td></tr>");
		$("#cont").append($tr);
	}
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

//查看详情
$(document).on("click",".see",function(){
	var id=$(this).attr("data-id");
	localStorage.id=id;
})