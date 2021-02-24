$(function(){
	queryWareHouseAreaList();
	getPage();
	queryWareHouseNoList();//添加仓库分区时 选择仓库 
	showHide();//跟权限有关
});
var page;//当前页
var limit;//每页显示条数
var total;//总条数
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			count:total,//总条数
			limit:limit,//每页显示条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					queryWareHouseAreaList();
				}
			}
		})
	})
}//end
//搜索
$("#wareareasearch").click(function(){
	queryWareHouseAreaList();
	getPage();
});
function queryWareHouseAreaList(){//查询仓库区域列表
	var areaname = $("#areaname1").val();
	var warename = $("#warename1").val();
	//var obj = {"areaname":areaname,"warename":warename,"pageIndex":page,"pageSize":limit};
	var obj = {"areaname":areaname,"warename":warename};
	var str=window.top.holderno;
	console.log(obj)
	$.ajax({
		url:url+"/WareHouse_AreaData/queryWareHouseAreaListByPage?str="+str,
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,//很重要
		success:function(data){
			console.log(data)
			$("#cont").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				total=0;
				return;
			}
			page=data.pageinfo.pageIndex;
			limit=data.pageinfo.pageSize;
			total=data.pageinfo.sumCount;
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="16002"){
					list.push(item);
				}
			}
				var html="";
				var text="";
				var text1="";
				if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 text="";
				  }else {
					 text="<a href='wareHouseArea_update.html' class='layui-btn layui-btn-xs areaedit' lay-event='edit'>编辑</a>";
				  }
				 
				 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
					 text1="";
				  }else {
					 text1="<a class='layui-btn layui-btn-danger layui-btn-xs del' lay-event='del'>删除</a>";
				  }
				 if(text==""&&text1==""){
					 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs' lay-event='edit'>编辑</a>";
					 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
				 }
				$.each(data.result,function(i,val){
					var areacode=(val.areacode==undefined?"":val.areacode);
					var areaname=(val.areaname==undefined?"":val.areaname);
					var warecode=(val.warecode==undefined?"":val.warecode);
					var warename=(val.warename==undefined?"":val.warename);
					var remark=(val.remark==undefined?"":val.remark);
			html+="<tr><td class='no-print'><span class='checkbox' style='float: none;' name='"+areacode+"' value='"+warecode+"'></td><td>"
			+warename+"</td><td>"+areaname+"</td><td>"+remark
			+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
		})
	   $("#cont").append(html);
		}
	})
}//end

function queryWareHouseNoList(){//添加仓库列表 条件查询仓库时的条件下拉框
	$.ajax({
		url:url+"/WareHouseData/queryWareHouseList",
		type:"POST",
		data:{"str":window.top.holderno},
		dataType:"json",
		//contentType:"application/json",
		success:function(data){
			console.log(data);
			$("#warecode11").find("option:not(:first)").remove();
			$("#warecode2").find("option:not(:first)").remove();
			if(!data.flag){
				return;
			}
			var htm="";
			$.each(data.result,function(i,val){
				var warecode=(val.warecode==undefined?"":val.warecode);
				var warename=(val.warename==undefined?"":val.warename);
				htm+="<option value='"+warecode+"'>"+warename+"</option>";
			})
		    $("#warecode11").append(htm);
			$("#warecode2").append(htm);
			$("#warecode2").val(warecode);
			$("#warecode2 option:selected").html(warename);
		}
	})
}//end
//批量删除
$(".delMain").click(function(){
	deleteAreaHouseBatch();
})
function deleteAreaHouseBatch(){
	var arr=[];
	var cks=$("#cont").children().find("span.curr");
	for(var i=0;i<cks.length;i++){
		var areacode=cks.eq(i).attr("name");
		var obj={"areacode":areacode};
		arr.push(obj);
	}
	if(arr.length==0){
		layer.msg("请先选择要删除的行！");
		return;
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index)
		$.ajax({
		url:url+"/WareHouse_AreaData/deleteAreaHouseBatch",
		type:"POST",
		data:JSON.stringify(arr),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			//layer.msg(data.reason,{time:2000})
			if(data.flag){
				window.location.reload();
			}else{
				layer.msg(data.reason,{time:2000})
			}
		}
   })
	})
	
}//end

//复选框
$(document).on("click",".checkbox",function(){
	if($(this).attr("id")=="selectAll"){//全选
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			$("#cont").children().each(function(){
				$("span.checkbox").removeClass("curr");
			})
		}else{
			$(this).addClass("curr");
			$("#cont").children().each(function(){
				$("span.checkbox").addClass("curr");
			})
		}
	}else{
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
			$("#selectAll").removeClass("curr");
		}else{
			$(this).addClass("curr");
			var arr=$("#cont").children().find("span.checkbox");
			var str=$("#cont").children().find("span.curr");
			if(arr.length==str.length){
				$("#selectAll").addClass("curr");
			}
		}
	}
})//end

//跟权限有关
function showHide(){
	var arrList=window.top.arr;
	if(window.top.arr.length==0){
		return;
	}
	$("#insertWareHouseAreaData").hide();
	$("#deleteWareHouseAreaData").hide();
	$("#printWareHouseAreaData").hide();
	var list=[];
	arrList.forEach(item=>{
		if(item.ModelCode=="16002"){
			list.push(item);
		}
	})
	for(var item of list){
		if(item.Code=="add"){
			$("#insertWareHouseAreaData").show();
		}
		if(item.Code=="delete"){
			$("#deleteWareHouseAreaData").show();
		}
		if(item.Code=="print"){
			$("#printWareHouseAreaData").show();
		}
	}
}//end


$(document).on("click",".areaedit",function(e){	
	var areacode = $(this).parent().siblings().eq(0).find("span").attr("name");
	console.log(areacode)
	var warecode = $(this).parent().siblings().eq(0).find("span").attr("value");
	console.log(warecode)
	var warename = $(this).parent().siblings().eq(1).html();
	var areaname = $(this).parent().siblings().eq(2).html();
	var remark = $(this).parent().siblings().eq(3).html();
	localStorage.areacode=areacode;
	localStorage.areaname=areaname;
	localStorage.warecode=warecode;
	localStorage.warename=warename;
	localStorage.remark=remark;
})
$("#areaname2").val(localStorage.areaname);
var warecode=localStorage.warecode;
var warename=localStorage.warename;
$("#remark2").val(localStorage.remark);

//删除
$(document).on("click",".del",function(){//删除仓库区域
	var areacode = $(this).parent().siblings().eq(0).find("span").attr("name");
	//console.log("areacode==="+areacode)
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/WareHouse_AreaData/deleteWareHouseArea",
			type:"POST",
			data:{"areacode":areacode},
			success:function(data){
				if(data.flag){
					window.location.reload();
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
	
})//end

//更新
$("#updateWareHouseAreaBtn").click(function(){
	updateWareHouseArea();
});
function updateWareHouseArea(){//修改仓库分区
	var areacode=localStorage.areacode
	var areaname=$("#areaname2").val();
	var warecode=$("#warecode2").val();
	var warename=$("#warecode2 option:selected").text();
	var remark=$("#remark2").val();
	if(areaname.length==0){
		layer.msg("分区名称不能为空！",{time:2000})
		return;
	}
	if(warecode.length==0){
		layer.msg("所属仓库不能为空！",{time:2000})
		return;
	}
	var obj={"areacode":areacode,"areaname":areaname,"warecode":warecode,"warename":warename,"remark":remark};
	$.ajax({
		url:url+"/WareHouse_AreaData/updateWareHouseAreaData",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	})
}//end

//添加
$("#insertWareHouseAreaBtn").click(function(){
	insertWareHouseArea();
});
function insertWareHouseArea(){//添加仓库分区
	var areaname=$("#areaname").val();
	var warecode=$("#warecode11").val();
	var remark=$("#remark").val();
	var obj={"areaname":areaname,"warecode":warecode,"remark":remark};
	if(areaname.length==0){
		layer.msg("分区名称不能为空！",{time:2000})
		return;
	}
	if(warecode.length==0){
		layer.msg("所属仓库不能为空！",{time:2000})
		return;
	}
	$.ajax({
		url:url+"/WareHouse_AreaData/insertWareHouseArea",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
		    layer.msg(data.reason,{time:2000});
		    if(!data.flag){
		    	return;
		    }
		    $("#areaname").val("");
			$("#warecode11").val("");
			$("#remark").val("");
		}
	})
}//end





