$(function(){
	queryIDCodeListByWarningName();//预警消息
	getPage();
})
var page;
var limit;
var total;
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
					queryIDCodeListByWarningName();
				}
			}
		})
	})
}//end
$("#queryWarningBtn").click(function(){
	queryIDCodeListByWarningName();
})
function queryIDCodeListByWarningName(){
	var idcode=$("#idcode").val();
	var holdername=$("#holdername").val();
	var diff=$("#diff").val();
	var obj={"idcode":idcode,"holdername":holdername,"diff":diff,"pageIndex":page,"pageSize":limit};
	var str=window.top.holderno;
	$.ajax({
		url:url+"/HolderData/queryRetireListByPage?str="+str,
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,//很重要
		//contentType:"application/json",
		success:function(data){
			$("#cont").empty();
			if(!data.flag){
				layer.msg(data.reason,{time:3000});
				total=0;
				return;
			}
			page=data.pageinfo.pageIndex;
			limit=data.pageinfo.pageSize;
			total=data.pageinfo.sumCount;
			var list=[];
			for(var item of window.top.arr){
				if(item.ModelCode=="2005"){
					list.push(item);
				}
			}
			var html="";
			var text="";
			$.each(data.result,function(i,val){
				var holderno=(val.holderno==undefined?"":val.holderno);
				var holdername=(val.holdername==undefined?"":val.holdername);
				var sexname=(val.sexname==undefined?"":val.sexname);
				var emptype=(val.emptype==undefined?"":val.emptype);
				var startdate=(val.startdate==undefined?"":val.startdate);
				var idcode=(val.idcode==undefined?"":val.idcode);
				var diff=(val.diff==undefined?"":val.diff);
				var warningname=(val.warningname==undefined?"":val.warningname);
				var departmentname=(val.departmentname==undefined?"":val.departmentname);
				var companyname=(val.companyname==undefined?"":val.companyname);
				var titlename=(val.titlename==undefined?"":val.titlename);
				if(warningname=="N"){
					var textName="不提示";
				}else{
					var textName="提示";
				}
				if(list.findIndex(target=>target.Code=="update")==-1&&window.top.arr.length!=0){
					 text="<a href='javascript:;'>"+textName+"</a>";
				 }else {
					 text="<a href='javascript:;' class='warning' name='"+warningname+"'>"+textName+"</a>";
				}
				html+="<tr><td>"+holderno+"</td><td>"+holdername+"</td><td>"+sexname
				+"</td><td>"+companyname+"</td><td>"+departmentname+"</td><td>"+titlename
				+"</td><td>"+emptype+"</td><td>"+idcode+"</td><td>"+startdate+"</td><td>"+diff
				+"</td><td>"+text+"</td></tr>";
				
			});
			$("#cont").append(html);	
		}
	})
}//end

//修改预警提示
$(document).on("click",".warning",function(){
	var holderno=$(this).parent().siblings().eq(0).html();
	var warningname=$(this).attr("name");
	layer.confirm("确定修改?",{title:"提示消息"},function(index){
		layer.close(index);
		if(warningname=='N'){
			warningname="Y";
		}else{
			warningname="N";
		}
		var obj={"holderno":holderno,"warningname":warningname};
		console.log(obj)
		$.ajax({
			url:url+"/HolderData/updateWarningName",
			type:"POST",
			data:obj,
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.flag){
					window.location.reload();
				}else{
					layer.msg(data.reason,{time:2000})
				}
			}
		})
	})
	
	
})//end
