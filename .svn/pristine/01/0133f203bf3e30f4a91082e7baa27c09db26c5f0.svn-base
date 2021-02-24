$(function(){
	//获取充值退费记录
	var obj={"curpage":curpage,"pagesize":pagesize};
	getRechargingRecordList(obj);
	getPage(total);
})
var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
//获取充值退费记录
function getRechargingRecordList(obj){
	$.ajax({
		url:url+"/holderAccount/getRechargingRecordList",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		async:false,
		success:function(data){
			total=data.count;
			console.log(data);
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=(item.holderNo==undefined?"":item.holderNo);
					var holdername=(item.holderName==undefined?"":item.holderName);
					var rechargingAmount=(item.rechargingAmount==undefined?"":item.rechargingAmount);
					var afterRecharging=(item.afterRecharging==undefined?"":item.afterRecharging);
					var $tr=$("<tr><td>"+holderno+"</td><td>"+holdername+"</td><td></td><td></td><td></td><td>"+rechargingAmount+"</td><td>"+afterRecharging+"</td></tr>")
					$("#cont").append($tr);
				}
			}
		}
	})
}

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
					getRechargingRecordList(obj);
				}
			}
		})
	})
}//end


//从url中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}