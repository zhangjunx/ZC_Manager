var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	//初始化table
	var obj={"curpage":curpage,"pagesize":pagesize};
	getConsumeTypeList(obj);
	getPage(total);
})

//点击禁用/启用
$(document).on("click",".shan",function(){
	var text=$(this).html();
	var fid=$(this).attr("data-fid");
	var fstatus=$(this).attr("data-fstatus");
	if(fstatus=="0"){
		fstatus=1;
	}else{
		fstatus=0;
	}
	layer.confirm("确定"+text+"?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/consumeType/delConsumeType",
			type:"post",
			data:{"fid":fid,"fstatus":fstatus},
			success:function(data){
				if(data.flag){
					var obj={"curpage":curpage,"pagesize":pagesize};
					getConsumeTypeList(obj);
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})
//分页
function getPage(total){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:pagesize,//每页显示条数
			count:total,//总条数
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				curpage=obj.curr;
				pagesize=obj.limit;
				if(!first){
					var obj={"curpage":curpage,"pagesize":pagesize};
	            	getConsumeTypeList(obj);
				}
			}
		})
	})
}//end
//获取消费模式列表
function getConsumeTypeList(obj){
	$.ajax({
		url:url+'/consumeType/getConsumeTypeList',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			$("#cont").empty();
			total=data.count;
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var consumeName=item.consumeName==undefined?"":item.consumeName;
					var amount=item.amount==undefined?"":item.amount;
					var remark=item.remark==undefined?"":item.remark;
					if(item.fstatus==1){
						var fstatus="启用";
						var fst="<a href='javascript:;' data-fid="+item.fid+" data-fstatus="+item.fstatus+" class='shan layui-btn layui-btn-xs layui-btn-danger'>禁用</a>";
					}else{
						var fstatus="禁用";
						var fst="<a href='javascript:;' data-fid="+item.fid+" data-fstatus="+item.fstatus+" class='shan layui-btn layui-btn-xs'>启用</a>";
					}
					var $tr=$("<tr><td>"+consumeName+"</td></tr>");
					var $td1=$("<td></td>");
					var $td2=$("<td>"+fstatus+"</td><td>"+remark+"</td>" +
							"<td><a href='consumptionPattern_add.html?fid="+item.fid+"' class='mo layui-btn layui-btn-xs'>修改</a>"+fst+"</td>");
					for(var current of item.timesList){
						var mealTimesName=current.mealTimesName==undefined?"":current.mealTimesName;
						var startTime=current.startTime==undefined?"":current.startTime;
						var endTime=current.endTime==undefined?"":current.endTime;
						var amount=current.amount==undefined?"":current.amount;
						var restaurantName=current.restaurantName==undefined?"":current.restaurantName;
						var $div=$("<div class='consumptionPattern'><div>"+mealTimesName+"("+startTime+"--"+endTime+")</div><div class='amount'>"+amount+"元</div><div>"+restaurantName+"</div></div>");
						$td1.append($div);
					}
					$tr.append($td1);
					$tr.append($td2);
					$("#cont").append($tr);
				}
			}
		}
	})
}

//点击消费模式中的修改
$(document).on("click","#cont2 .mo",function(){
	var fid=$(this).attr("data-fid");
	$.ajax({
		url:url+"",
		type:"post",
		data:{"fid":fid},
		success:function(data){
			console.log(data);
		}
	})
})
