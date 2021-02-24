$(function(){
	//queryDeptNoList();//查询部门
	getDeptTree();//查询部门
	getDoorTree();
	//queryDoorUnitList();//查询门区
	//queryHolderNoList();//查询人员列表
	showHide();//跟权限有关
	//nowDate();
	//日期
	layui.use("laydate", function() {
        var laydate = layui.laydate
        lay('.date').each(function() {
			laydate.render({
				elem: this,
				trigger: 'click'
			});
		});
        lay('.ipt').each(function() {
			laydate.render({
				elem: this,
				type: 'time',
				trigger: 'click'
			});
		});
        queryIORecordList();
        getPage();//分页相关
 })
 
 //点击复选框
 $(".checkbox").click(function(){
	 if($(this).hasClass("curr")){
		 $(this).removeClass("curr");
	 }else{
		 $(this).addClass("curr");
	 }
	
 })


 
var page;
var limit;
var total;
 //分页相关
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,
			limit:limit,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					queryIORecordList();
				}
			}
		})
	})	
}//end

function nowDate(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	if(month<10){
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
	$("#date1").val(year+"-"+month+"-"+day);
	
}
 
//条件查询
$("#queryIORecordListBtn").click(function(){
	queryIORecordList();
	getPage();
}); 
function queryIORecordList(){
	var begindate=$("#date1").val();
	var enddate=$("#date2").val();
	var begintime=$("#date3").val();
	var endtime=$("#date4").val();
	var iostatus=$("#iostatus").val();
	var deptno=$("#departmentno").val();
	var holderno=$("#holderno").val();
	var doorno=$("#doorno").val();
    var st="";
    var dat="";
	//有效进出记录被选中
    var status=$("#status").hasClass("curr");
    var datano=$("#datano").hasClass("curr");
    console.log(status,datano)
	if(status){//有效进出记录被选中
		st="1";
	}
	//两笔记录被选中
	if(datano){
		 dat="1";
	}
	var obj={"begindate":begindate,"enddate":enddate,
			"begintime":begintime,"endtime":endtime,
			"iostatus":iostatus,"deptno":deptno,"holderno":holderno,
			"doorno":doorno,"pageIndex":page,"pageSize":limit};
	console.log(obj)
	$.ajax({
		url:url+"/IOData/queryIORecordList?st="+st+"&dat="+dat,
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
			$("#cont").empty();
			if(!data.flag){
				total=0;
				layer.msg(data.reason,{time:3000});
				return;
			}
			page=data.pageinfo.pageIndex;
			limit=data.pageinfo.pageSize;
			total=data.pageinfo.sumCount;
			var html="";
			var status="";
			$.each(data.result,function(i,val){
				var holderno=(val.holderno==undefined?"":val.holderno);
				var holdername=(val.holdername==undefined?"":val.holdername);
				var doorno=(val.doorno==undefined?"":val.doorno);
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
					status="补打卡进出";
					openType="刷卡出入";
				}else if(iostatus==19){
					status="补打卡外出";
					openType="刷卡出入";
				}else{
					status="无效记录";
				}
				
				if(openType=="4"){//指纹
					openType="指纹识别";
				}else if(openType=="2"){//人脸
					openType="人脸识别";
				}else if(openType=="1"){//刷卡
					openType="刷卡出入";
				}else if(openType=="6"){//蓝牙
					openType="手机蓝牙";
				}else if(openType=="9"){//电脑控制
					openType="电脑控制";
				}else if(openType=="3"){//开门密码
					openType="开门密码";
				}else if(doorname=='公司中间门' && openType==undefined){
					openType="二维码";
				}
				if(parseFloat(temperatures)<36.8){
					var txt=temperatures+"<img src='../img/green.png' style='width:20px'>";
				}else if(parseFloat(temperatures)>=36.8&&parseFloat(temperatures)<37.3){
					var txt=temperatures+"<img src='../img/yellow.png' style='width:20px'>";
				}else if(parseFloat(temperatures)>=37.3){
					var txt=temperatures+"<img src='../img/red.png' style='width:20px'>";
				}else {
					var txt="";
				}
				html+="<tr><td>"+holderno+"</td><td>"+holdername+"</td><td>"+deptname+"</td><td>"
				+deptno+"</td><td>"
				+doorname+"</td><td>"+iodate+"</td><td>"+iotime
				+"</td><td>"+status+"</td><td>"+txt+"</td><td>"+uid+"</td><td>"
				+cardno+"</td><td>"+devicename+"</td><td>"+openType
				+"</td></tr>";
			})
			$("#cont").append(html);
		}
	})	
}//end




//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#daochu").hide();
	$("#print").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="MyIORecord"){
			list.push(item);
		}
	})
	for(var item of list){
		if(item.Code=="export"){
			$("#daochu").show();
		}
		if(item.Code=="print"){
			$("#print").show();
		}
		
	}
}//end


    
/*//点击部门显示对应的人员
$(document).on("change",".dept",function(){
	queryHolderNoList();
})*/
    

    
//查询部门
function queryDeptNoList(){
  $.ajax({
	url:url+"/DepartmentData/queryDeptListByLoginPerson",
	type:"POST",
	dataType:"json",
	contentType:"application/json",
	success:function(data){
		console.log(data)
		$(".dept").find("option:not(:first)").remove();
		if(!data.flag){
			return;
		}
		var html="";
		$.each(data.result,function(i,val){
			 var departmentno=(val.departmentno==undefined?"":val.departmentno);
			 var departmentname=(val.departmentname==undefined?"":val.departmentname);
			    html+="<option value='"+departmentno+"'>"+departmentname+"</option>";
		});
			 $(".dept").append(html);
	  }
	})
 }//end
})

function queryDoorUnitList(){//门区列表
	$.ajax({
		url:url+"/DoorUnit/queryDoorUnitList",
		type:"POST",
		success:function(data){
			$("#doorno").find("option:not(:first)").remove();
			console.log(data);
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				var doorno=(val.doorno==undefined?"":val.doorno);
				var doorname=(val.doorname==undefined?"":val.doorname);
				html+="<option value='"+doorno+"'>"+doorname+"</option>";
			})	 
			$("#doorno").append(html);
		}
	})
}//end

/**
 * 导出Excel
 */
$("#daochu").click(function(){
    var table = document.querySelector("#dayindaju1");
    var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
    openDownloadDialog(sheet2blob(sheet),'员工信息.xlsx');
});
//查询人员列表
function queryHolderNoList(deptno){
    var obj={"deptno":deptno};
    $.ajax({
        url:url+"/DepartmentData/getHolderByDept",
        type:"POST",
        dataType:"json",
        data:obj,
        success:function(data){
        	console.log(data)
         $(".holder").find("option:not(:first)").remove();
         if(!data.flag){
        	 return;
          }
         var html="";
         $.each(data.result,function(i,val){
             var holderno=(val.holderno==undefined?"":val.holderno);
             var holdername=(val.holdername==undefined?"":val.holdername);
              html+="<option value='"+holderno+"'>"+holdername+"</option>";
          })
       $(".holder").append(html);	
      }
  })  	
}//end
//区域下拉树初始化
function getDeptTree(){
	$.ajax({
		//url:url+"/DepartmentData/getDeptTree",
		//url:url+"/DepartmentData/getMyDeptTree",
		url:url+"/ACL_Roles/getDeptTreeByMyRole",
		type:'POST',//类型
		data:{"holderno":window.top.holderno},
		dataType:'json',//数据类型
		//contentType:"application/json",
		success:function(data){
			console.log(data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node.data.id)
			        	$("#departmentno").val(node.data.id);
			        	$("#departmentname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
			           
			            queryHolderNoList(node.data.id);
			        }
			    
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $(".layui-form-select").removeClass("layui-form-selected");
			    });
			});
		
		},
		error:function(data){}
	})
}

//初始化门区树菜单
function getDoorTree(){
	$.ajax({
		url:url+"/DoorUnit/getDoorTree",
		data:{"res":"true"},
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			console.log("---"+data)
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#doortree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	console.log(node.data.id)
			        	$("#doorno").val(node.data.id.substring(1));
			        	$("#doorname").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='doorno']").val(node.id);
			        }
			    
			    });
			   /* $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $(".layui-form-select").removeClass("layui-form-selected");
			    });*/
			});
		
		},
		error:function(data){}
	})
}