$(function(){
	getDeptTree();//查询部门
	getDoorTree();
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
        queryPermRecordList();
        getPage();//分页相关
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
					queryPermRecordList();
				}
			}
		})
	})	
}//end

//点击权限下发
$(document).on("click",".permissionSend",function(){
	var holderno=$(this).attr("data-holderno");
	holderno="'"+holderno+"'";
	var doorno=$(this).attr("data-doorno");
	doorno="'"+doorno+"'";
	var weekzone=$(this).attr("data-weekzone");
	var updatestatus=$(this).attr("data-updatestatus");
	var id=$(this).attr("data-id");
	layer.confirm("确定下发?",{title:"提示信息"},function(index){
		if(updatestatus=="D"){
			deleteUserLimit(holderno,doorno,id);
		}else{
			addUserLimit(holderno,doorno,weekzone,id)
		}
		layer.close(index);
	})
})

//删除成功回调
function deleteUserLimit(personArr,doorArr,id){
	var i=layer.load(2);
	$.ajax({
		url:url+"/ufaceOffLine/delUserLimit",
		type:"post",
		data:{"personArr":personArr,"doorArr":doorArr,"id":id},
		success:function(data){
			layer.msg("权限下发成功",{time:1000},function(){
				layer.close(i);
			});
			queryPermRecordList();
		}
	})
}
//成功回调
function addUserLimit(personArr,doorArr,timeList,id){
	var i=layer.load(2);
	$.ajax({
		url:url+"/ufaceOffLine/addUserLimit",
		type:"post",
		data:{"personArr":personArr,"doorArr":doorArr,"timeList":timeList,"id":id},
		success:function(data){
			layer.msg("权限下发成功",{time:1000},function(){
				layer.close(i)
			});
			queryPermRecordList();
		}
	})
}

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
$("#queryBtn").click(function(){
	queryPermRecordList();
	getPage();
}); 
function queryPermRecordList(){
	var status=$("#status").val();
	var holderno=$("#holderno").val();
	var doorno=$("#doorno").val();
	var obj={"status":status,"holderno":holderno,
			"doorno":doorno,"pageIndex":page,"pageSize":limit};
	console.log(obj)
	$.ajax({
		url:url+"/DoorPermHolderRecord/queryPermRecordList",
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
			page=data.page;
			limit=data.limit;
			total=data.total;
			var date=new Date();
			var day=date.getDay();
			if(day==0){
				day=7;
			}
			var html="";
			$.each(data.result,function(i,val){
				var id=(val.id==undefined?"":val.id);
				var holderno=(val.holderno==undefined?"":val.holderno);
				var holdername=(val.holdername==undefined?"":val.holdername);
				var cardid=(val.cardid==undefined?"":val.cardid);
				var devicename=(val.devicename==undefined?"":val.devicename);
				var doorname=(val.doorname==undefined?"":val.doorname);
				var weekzone1=(val.weekzone1==undefined?"":val.weekzone1);
				var weekzone2=(val.weekzone2==undefined?"":val.weekzone2);
				var weekzone3=(val.weekzone3==undefined?"":val.weekzone3);
				var weekzone4=(val.weekzone4==undefined?"":val.weekzone4);
				var weekzone5=(val.weekzone5==undefined?"":val.weekzone5);
				var weekzone6=(val.weekzone6==undefined?"":val.weekzone6);
				var weekzone7=(val.weekzone7==undefined?"":val.weekzone7);
				var updateperson=(val.updateperson==undefined?"":val.updateperson);
				var updatedate=(val.updatedate==undefined?"":val.updatedate);
				var updatestatus=(val.updatestatus==undefined?"":val.updatestatus);
				var status=(val.status==undefined?"":val.status);
				var grade=(val.grade==undefined?"":val.grade);
				var weekzone;
				if(day==1){
					weekzone=weekzone1;
				}else if(day==2){
					weekzone=weekzone2;
				}else if(day==3){
					weekzone=weekzone3;
				}else if(day==4){
					weekzone=weekzone4;
				}else if(day==5){
					weekzone=weekzone5;
				}else if(day==6){
					weekzone=weekzone6;
				}else if(day==7){
					weekzone=weekzone7;
				}
				weekzone=weekzone.replace(/\;/g,",").replace(/\-/g,",");
				var text="";
				if(status=='1'){
					status="已下发";
					text="<a href='javascript:;' class='layui-btn layui-btn-xs layui-bg-gray'>权限下发</a>";
				}else if(status=='0'){
					status="未下发";
					text="<a href='javascript:;' class='layui-btn layui-btn-xs layui-bg-orange permissionSend' data-id="+id+" data-updatestatus="+updatestatus+" data-weekzone='"+weekzone+"' data-doorno="+val.doorNo+" data-holderno="+holderno+">权限下发</a>";
				}
				
				if(updatestatus=="A"){//指纹
					updatestatus="增";
				}else if(updatestatus=="D"){//人脸
					updatestatus="删";
				}else if(updatestatus=="U"){//刷卡
					updatestatus="改";
				} 
				
				if(holderno.charAt(0)=="V"){
					var txt="";
				}else{
					var txt="<a href='week_zone_see.html?id="+id+"' class='layui-btn layui-btn-xs see' data-id='"+id+"'>通行时段</a></td>";
				}
				html+="<tr><td class='no-print'><span class='checkbox' style='float:none' data-id='"+id+"'></span></td><td>"+holderno
				+"</td><td>"+holdername
				+"</td><td>"+cardid
				+"</td><td>"+devicename
				+"</td><td>"+doorname
				+"</td><td>"+grade
				+"</td><td>"+updatestatus
				+"</td><td>"+status
				+"</td><td>"+updateperson
				+"</td><td>"+updatedate
				+"</td><td>"+txt
				/*+"</td><td>"+weekzone1
				+"</td><td>"+weekzone2
				+"</td><td>"+weekzone3
				+"</td><td>"+weekzone4
				+"</td><td>"+weekzone5
				+"</td><td>"+weekzone6
				+"</td><td>"+weekzone7*/
				+"</td><td>"+text+"<a href='javascript:;' class='layui-btn layui-btn-xs layui-btn-danger del' data-id='"+id+"'>删除</a></td></tr>";
			})
			$("#cont").append(html);
		}
	})	
}//end

//批量删除
$("#delBtn").click(function(){
	var arr=[];
	var cks=$("#cont").children().find("span.curr");
	for(i=0;i<cks.length;i++){
		//var holderno=cks.eq(i).parent().siblings().eq(0).html();
		var id=cks.eq(i).attr("data-id");
		arr.push(id);
	}
	console.log(arr)
	if(arr.length==0){
		layer.msg("请先选中要删除的行！");
		return;
	}
	deleteBatch(arr);
})

 

//行内删除
$(document).on("click",".del",function(){
	var id=$(this).attr("data-id");
	console.log(id);
	var arr=[];
	arr.push(id);
	deleteBatch(arr);
})
//删除
function deleteBatch(arr){
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
	$.ajax({
		url:url+"/DoorPermHolderRecord/deleteRecordBatch",
		type:"POST",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		async:false,
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:2000},function(){
				queryPermRecordList();
				getPage();
			})
		}
	})
	})
}


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


 
    
 
})

/**
 * 导出Excel
 */
$("#daochu").click(function(){
    var table = document.querySelector("#dayindaju1");
    var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
    openDownloadDialog(sheet2blob(sheet),'员工信息.xlsx');
});

//区域下拉树初始化
function getDeptTree(){
	$.ajax({
		url:url+'/DepartmentData/getDeptTree',
		type:'POST',//类型
		data:{"res":"true"},
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
			            getHolderByDept(node.data.id);
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

//查询人员列表
function getHolderByDept(deptno){
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

//复选
$(document).on('click', '.checkbox', function () {
	if ($(this).attr("id") == "selectAll") { //全选
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').removeClass('curr');
            })
        } else {
            $(this).addClass('curr');
            $("#cont").children().each(function () {
                $('span.checkbox').addClass('curr');
            })
        }
    } else {
        if ($(this).hasClass('curr')) {
            $(this).removeClass('curr');
            $('#selectAll').removeClass('curr');
        } else {
            $(this).addClass('curr');
            var arr=$("#cont").children().find("span.checkbox")
           	var str=$("#cont").children().find("span.curr");
           	if(arr.length==str.length){
           		$('#selectAll').addClass('curr');
           	}
        }
    }           	
})//end

//初始化树菜单
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
