$(function(){
	getList();
	getPage();//分页
	getDate();
	showHide();
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

// 分页查询
var page;//当前页数
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
/*function getList(){
	var visitorsname=$("#visitorsname").val();
	var iodate=$("#iodate").val();
	var intime=$("#intime").val();
	var outtime=$("#outtime").val();
	var iostatus=$("#iostatus").val();
	var obj1={"visitorsname":visitorsname,"iodate":iodate,
			"intime":intime,"outtime":outtime,
			"iostatus":iostatus};
	var obj={"str":JSON.stringify(obj1),"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/VisitorsInfo/queryVisitorsInfoIORecordListByPage",
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
			$.each(data.result,function(i,val){
				var datano=(val.datano==undefined?"":val.datano);
				var holderno=(val.holderno==undefined?"":val.holderno);
				var holdername=(val.holdername==undefined?"":val.holdername);
				var doorname=(val.visitorsdepartmentsname==undefined?"":val.visitorsdepartmentsname);
				var doorno=(val.carno==undefined?"":val.carno);
				var deviceno=(val.dringmodels==undefined?"":val.dringmodels);
				var devicename=(val.devicename==undefined?"":val.devicename);
				var opentype=(val.opentype==undefined?"":val.opentype);
				var opentypename=(val.opentypename==undefined?"":val.opentypename);
				var iostatus=(val.iostatus==undefined?"":val.iostatus);
				if(iostatus=='11'){
					iostatus="进入";
				}else if(iostatus=='12'){
					iostatus="外出";
				}else{
					iostatus="无效刷卡";
				}
				html+="<tr><td>"+visitorsname+"</td><td>"+visitorsdepartmentsname+"</td><td>"+carno
				+"</td><td>"+dringmodels+"</td><td>"+iodate+"</td><td>"+iotime
				+"</td><td>"+doorname+"</td><td>"+iostatus+"</td></tr>";
			})
			$("#cont").append(html);
		}
	})
}//end
*/
function getList(){
	var visitorsname=$("#visitorsname").val();
	var iodate=$("#iodate").val();
	var intime=$("#intime").val();
	var outtime=$("#outtime").val();
	var iostatus=$("#iostatus").val();
	var obj1={"holdername":visitorsname,"iodate1":iodate,
			"intime":intime,"outtime":outtime,
			"iostatus":iostatus};
	var obj={"str":JSON.stringify(obj1),"pageIndex":page,"pageSize":limit};
	console.log(obj)
	$.ajax({
		url:url+"/VisitorsInfo/queryVisitorsInfoIORecordListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(!data.flag){
				total=0;
				layer.msg(data.reason,{time:2000});
				return;
			}
			var page=data.page;
			var limit=data.limit;
			var total=data.total;
			var html="";
			var status="";
			$.each(data.result,function(i,val){
				var datano=(val.datano==undefined?"":val.datano);
				var holderno=(val.holderno==undefined?"":val.holderno);
				var holdername=(val.holdername==undefined?"":val.holdername);
				var doorname=(val.doorname==undefined?"":val.doorname);
				var iodate=(val.iodate==undefined?"":val.iodate);
				var iotime=(val.iotime==undefined?"":val.iotime);
				var iostatus=(val.iostatus==undefined?"":val.iostatus);
				var deptno=(val.deptno==undefined?"":val.deptno);
				var deptname=(val.deptname==undefined?"":val.deptname);
				var uid=(val.uid==undefined?"":val.uid);
				var cardno=(val.cardno==undefined?"":val.cardno);
				var deviceno=(val.deviceno==undefined?"":val.deviceno);
				var devicename=(val.devicename==undefined?"":val.devicename);
				var openType=(val.opentype==undefined?"":val.opentype);
				var temperatures=(val.temperatures==undefined?"":val.temperatures);
				if(iostatus==11){
					status="进入";
				}else if(iostatus==12){
					status="外出";
				}else if(iostatus==18){
					status="补打卡进入";
					openType="<img src='../img/buka.png'>";
				}else if(iostatus==19){
					status="补打卡外出";
					openType="<img src='../img/buka.png'>";
				}else{
					status="无效刷卡";
				}
				
				if(openType=="4"){//指纹
					openType="<img src='../img/zhiwen.png'>";
				}else if(openType=="2"){//人脸
					openType="<img src='../img/faceSb.png'>";
				}else if(openType=="1"){//刷卡
					openType="<img src='../img/shuKa.png' style='width:52px;height:52px'>";
				}else if(openType=="6"){//蓝牙
					openType="<img src='../img/bluetooth.png' style='width:52px;height:52px'>";
				}else if(openType=="9"){//电脑控制
					openType="<img src='../img/computer1.png'>";
				}else if(openType=="3"){//开门密码
					openType="<img src='../img/openDoorPassword.png' style='width:52px;height:52px'>";
				}else if(doorname=='公司中间门' && openType==undefined){
					openType="<img src='../img/twoCode.png' style='width:52px;height:52px'>";
				}
			
				var t="<a href='visitors_IO_see.html' class='see layui-btn layui-btn-xs' data-id='"+datano+"' data-vid='"+holderno+"'>详情查看</a>";
				html+="<tr><td>"+datano
				+"</td><td>"+holderno
				+"</td><td>"+holdername
				+"</td><td>"+deptname
				+"</td><td>"+doorname
				+"</td><td>"+iodate
				+"</td><td>"+iotime
				+"</td><td>"+status
				+"</td><td>"+uid
				+"</td><td>"+cardno
				+"</td><td>"+devicename
				+"</td><td>"+openType
				+"</td><td>"+t+"</td></tr>";
				
			})
			$("#cont").prepend(html);////在父级最前面追加一个子元素
		}
	})
}//end

//查看详情
$(document).on("click",".see",function(){
	var id=$(this).attr("data-id");
	//var str=$(this).attr("data-vid");
	//console.log(vid)
	//var vid=str.split("_")[1];
	//console.log(vid)
	localStorage.id=id;
	//localStorage.vid=vid;
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
			if(item.ModelCode=="5006"){
				list.push(item);
			}
			
		})
		for(var item of list){
			if(item.Code=="print"){
				$("#printTable").show();
			}
		}
	}