
$(function() {
	queryTitleDataList();
	getPage();
	showHide();//跟权限有关
})//end

var page;//当前页
var limit;//每页显示条数
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
		    		queryTitleDataList();
		    	}
		    }
		})
	})
}//end
//搜索
$("#Titlesearch").click(function(){
	queryTitleDataList();
	getPage();
})//end
function queryTitleDataList(){//获取职务列表
	var titleno = $("#titleno1").val();
	var titlename = $("#titlename1").val();
	var obj = {"titleno":titleno,"titlename":titlename,"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/TitleData/queryTitleDataListByPage",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,//很重要
		success:function(data){
			//console.log(data)
			//layer.msg(data.reason,{time:2000});
			$("#cont").empty();
			if(!data.flag){
				total=0;
				return;
			}
			page=data.pageinfo.pageIndex;
			limit=data.pageinfo.pageSize;
			total=data.pageinfo.sumCount;
			//权限
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="2006"){
					list.push(item);
				}
			}
			
			var html="";
			var text="";
			var text1="";
			 if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
				 text="";
			  }else {
				 text="<a href='title_update.html' class='layui-btn layui-btn-xs updata' lay-event='edit'>编辑</a>";
			  }
			 
			 if(list.findIndex(target=>target.Code=="delete")==-1&&window.top.arr.length!=0){
				 text1="";
			  }else {
				 text1="<a href='javascript:;'  class='layui-btn layui-btn-danger layui-btn-xs del' lay-event='del'>删除</a>";
			  }
			 if(text==""&&text1==""){
				 text="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-xs' lay-event='edit'>编辑</a>";
				 text1="<a href='javascript:;' class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
			 }
			$.each(data.result,function(i,val){
				var titleno=(val.titleno==undefined?"":val.titleno);
				var titlename=(val.titlename==undefined?"":val.titlename);
				var sal=(val.sal==undefined?"":val.sal);
				var comm=(val.comm==undefined?"":val.comm);
				var remark=(val.remark==undefined?"":val.remark);
				html+="<tr><td class='no-print'><span class='checkbox' style='float:none'></span></td><td>"+titleno+"</td><td>"
				+titlename+"</td><td>"+sal+"</td><td>"+comm+"</td><td>"+remark
				+"</td><td class='center no-print'>"+text+text1+"</td></tr>";
			})
			$("#cont").append(html);	
			
		}
	})
}//end


//复选框
$(document).on("click",".checkbox",function(){
	if($(this).attr("id")=="selectAll"){
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
})

//批量删除
$(".delMain").click(function(){
	deleteTitleDataBatch();
})
function deleteTitleDataBatch(){//批量删除
	var arr=[];
	var chs=$("#cont").children().find("span.curr");
	for(i=0;i<chs.length;i++){
		var titleno=chs.eq(i).parent().siblings().eq(0).html();
		var obj={"titleno":titleno};
		arr.push(obj);
	}
	if(arr.length==0){
		layer.msg("请先选中要删除的行！");
		return;
	}
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/TitleData/deleteTitleDataBatch",
			type:"POST",
			data:JSON.stringify(arr),
			dataType:"json",
			contentType:"application/json",
			success:function(data){
				if(data.flag){
					window.location.reload();
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
	
}//end
//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#insertTitleData").hide();
		$("#deleteTitleData").hide();
		$("#printTitleData").hide();
		var arrList=window.top.arr;
		var list=[];
		arrList.forEach(item=>{
			if(item.ModelCode=="2006"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="add"){
				$("#insertTitleData").show();
			}
			if(item.Code=="delete"){
				$("#deleteTitleData").show();
			}
			if(item.Code=="print"){
				$("#printTitleData").show();
			}
		}
}//end
//删除
$(document).on("click",".del",function(){//删除职务编号
	var titleno=$(this).parent().siblings().eq(1).html();
	var obj={"titleno":titleno};
	layer.confirm("确定删除?",{title:"提示"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/TitleData/deleteTitleData",
			type:"POST",
			data:obj,
			success:function(data){
				layer.msg(data.reason,{time:2000});
				if(!data.flag){
					return;
				}
				window.location.reload();
			}
		})
	})
})
//更新
$(document).on("click",".updata",function(){
	var titleno = $(this).parent().siblings().eq(1).text();
	var titlename = $(this).parent().siblings().eq(2).text();
	var sal = $(this).parent().siblings().eq(3).text();
	var comm = $(this).parent().siblings().eq(4).text();
	var remark = $(this).parent().siblings().eq(5).text();
	localStorage.titleno=titleno;
	localStorage.titlename=titlename;
	localStorage.sal=sal;
	localStorage.comm=comm;
	localStorage.remark=remark;
});
 


/**
 * 导出Excel
 */
$("#daochu").click(function(){
    var table1 = document.querySelector("#dayindaju1");
    var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
    openDownloadDialog(sheet2blob(sheet),'员工信息.xlsx');
});