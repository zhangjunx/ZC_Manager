$(function(){
	//查询部门
	queryHolderListByDoorBatch();
	//门禁权限配置页面的标题
	$("#title_doorname").html(localStorage.doorname);
	$("#title_doorname").attr("data-doorno",localStorage.doorno);
	$("#title_doorname").attr("data-doorchannel",localStorage.doorchannel);
	$("#title_doorname").attr("data-controlid",localStorage.controlid);
	$("#title_doorname").attr("data-controlname",localStorage.controlname);
})
//初始化加载
//提交对应门区下的所有人员工号
function queryHolderListByDoorBatch(){
	var arrr=localStorage.arr.split(",");
	var arr=[];
	for(var i=0;i<arrr.length;i++){
		var holderno=arrr[i];
		arr.push({"holderno":holderno})
	}
	//console.log(JSON.stringify(arr));
	$.ajax({
		url:url+"/CAP_TimeZoneDoorHolder/queryHolderListByDoorBatch",
		type:"POST",
		data:JSON.stringify({"arr":arr}),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var $tr=$("<tr></tr>");
					var $td1=$("<td data-deptno='"+item.departmentno+"' class='dept'></td>");
					var $td2=$("<td class='text_location'></td>");
					var $span2=$("<span class='img"+item.departmentno+" add' data-deptno='"+item.departmentno+"' style='border:1px solid #2f8eed'><img src='images/more1.png'></span>")
					if(item.holderlist!=undefined){
						item.holderlist.forEach(val=>{
							var $span=$("<span data-holderno='"+val.holderno+"' class='holder'></span>");
							$span.append(val.holdername);
							$td2.append($span);
						})
					}
					$td1.append(item.departmentname);
					$td2.append($span2)
					$tr.append($td1);
					$tr.append($td2);
					$("#door_perm_seeSet").append($tr);
				}
			 }
		  }
	})
}
//加号弹窗的点击事件
var no;
$(document).on("click",".add",function(){
	var deptno=$(this).attr("data-deptno");
	no=deptno;
	var deptname=$(this).parent().prev().html();
	var list=$(this).siblings();
	var arr=[];
	for(var i=0;i<list.length;i++){
		var holderno=list.eq(i).attr("data-holderno");
		var holdername=list.eq(i).html();
		var obj={"holderno":holderno,"holdername":holdername};
		arr.push(obj);
	}
	console.log(arr)
	$.ajax({
		url:url+"/CAP_TimeZoneDoorHolder/queryHolderDataByDepartmentNo",
		type:"post",
		data:JSON.stringify({
			"deptno":deptno,
			"deptname":deptname,
			"arrlist":arr
		}),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			$(".holder_top").empty();
			if(!data.flag){
				var $p=$("<p></p>");
				$p.append("没有更多的人了！")
				$(".holder_top").append($p);
				return;
			}
			var res=data.result;
			for(var item of res){
				var $p=$("<p></p>");
				var $span=$("<span class='checkbox' data-holderno='"+item.holderno+"'></span>");
				$span.append(item.holdername);
				$p.append($span);
				$(".holder_top").append($p);
			}
		}
	})
	$(".holder_add").fadeIn(500);
	$(".holder_box").fadeIn(500);
})


//点击弹窗里的复选框
$(document).on("click",".holder_top span.checkbox",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})
//点击确定添加人员
$(document).on("click",".bottom_sure",function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
	for(var i=0;i<$(".holder_top .curr").length;i++){
		var holderno=$(".holder_top .curr").eq(i).attr("data-holderno");
		var holdername=$(".holder_top .curr").eq(i).html();
		var $span=$("<span data-holderno='"+holderno+"' class='holder'></span>");
		$span.append(holdername);
		$(".img"+no).before($span);
	}
})


//点击取消
$(document).on("click",".bottom_qx",function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
})
$(document).on("click",".quxiao",function(){
	$(".holder_add").fadeOut(500);
	$(".holder_box").fadeOut(500);
})

//双击移除
$(document).on("dblclick",".holder",function(){
	$(this).remove();
})


//点击保存提交数据
$("#sure").click(function(){
	var doorno=$("#title_doorname").attr("data-doorno");
	var doorname=$("#title_doorname").html();
	var doorchannel=$("#title_doorname").attr("data-doorchannel");
	var controlid=$("#title_doorname").attr("data-controlid");
	var controlname=$("#title_doorname").attr("data-controlname");
	var arr=[];
	for(var i=0;i<$(".dept").length;i++){
		var deptno=$(".dept").eq(i).attr("data-deptno");
		var deptname=$(".dept").eq(i).html();
		var obj={"doorno":doorno,"doorname":doorname,"doorchannel":doorchannel,
			"controlid":controlid,"controlname":controlname,
			"departmentno":deptno,"departmentname":deptname,
			"arrlist":[]
			};
		//console.log(obj);
		var holderlist=$(".text_location").eq(i).find(".holder");
		for(var j=0;j<holderlist.length;j++){
			var holderno=holderlist.eq(j).attr("data-holderno");
		    var holdername=holderlist.eq(j).html();
		    var obj1={"holderno":holderno,"holdername":holdername};
		    console.log(obj1);
		    obj.arrlist.push(obj1);
		}
		arr.push(obj);
	}
	//将人员等于空的部门不提交
	/*var arrs=[];
	for(var j=0;j<arr.length;j++){
		var arrlist=arr[j].arrlist;
		if(arrlist.length>0){
			arrs.push(arr[j]);
		} 
	} 
	console.log(arrs);
	if(arrs.length==0){
		return;
	}
	console.log(JSON.stringify(arrs))*/
	$.ajax({
		url:url+"/CAP_TimeZoneDoorHolder/insertOrUpdateDoorHolderByDoorBatch",
		type:"post",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			layer.msg(data.reason,{time:3000});
		}
	})
})
	
