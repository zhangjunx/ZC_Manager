$(function(){
	//查询数据
	getVisitorsStatic();
	getPage();
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  lay('.ipt').each(function() {
				laydate.render({
					elem: this,
					trigger: 'click'
				});
			});
	});
	
	
})
var page;//当前页
var limit;//每页显示条数
var total;
//分页
function getPage(){
	layui.use("laypage",function(){
		var laypage=layui.laypage;
		laypage.render({
			elem:"test",
			limit:limit,//每页显示条数
			count:total,//总条数
			curr:page,
			layout:['count','prev','page','next','limit','refresh','skip'],
			jump:function(obj,first){
				page=obj.curr;
				limit=obj.limit;
				if(!first){
					getVisitorsStatic();
				}
			}
		})
	})
}//end

//点击搜索
$("#queryBtn").click(function(){
	getVisitorsStatic();
	getPage();
})
function getVisitorsStatic(){
	var date1=$("#date1").val();
	var date2=$("#date2").val();
	var obj={"date1":date1,"date2":date2,"pageIndex":page,"pageSize":limit};
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/getVisitorsStatic",
		type:"POST",
		data:obj,
		dataType:"json",
		async:false,
		success:function(data){
			$("#cont").empty();
			$("#driver").html("0人");
			$("#fixed").html("0人");
			$("#temporary").html("0人");
			$("#sum").html("0人");
			console.log(data);
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				total=0;
				return;
			}
			page=data.page;
			limit=data.limit;
			total=data.total;
			//成功后
			var driver=0;
			var fixed=0;
			var temporary=0;
			var amount=0;
			for(var i=0;i<data.result.length;i++){
				var text1=0;
				var text2=0;
				var text3=0;
				var sum=0;
				for(var item of data.result[i].arrlist){
					if(item.visitorstype=="P"){//临时外协
						text3=item.count;
					}else if(item.visitorstype=="G"){//固定外协
						text2=item.count;
					}else if(item.visitorstype=="C"){//司机
						text1=item.count;
					}
				}
				sum=text1+text2+text3;
				amount+=parseInt(sum);
				driver+=parseInt(text1);
				fixed+=parseInt(text2);
				temporary+=parseInt(text3);
				var $tr=$("<tr><td>"+(i+1)+"</td><td>"+data.result[i].iodate+"</td><td>"+text1+"人</td>" +
						"<td>"+text2+"人</td><td>"+text3+"人</td><td>"+sum+"人</td></tr>");
				$("#cont").append($tr);
			}
			$("#driver").html(driver+"人");
			$("#fixed").html(fixed+"人");
			$("#temporary").html(temporary+"人");
			$("#sum").html(amount+"人");
		}
	})
}


