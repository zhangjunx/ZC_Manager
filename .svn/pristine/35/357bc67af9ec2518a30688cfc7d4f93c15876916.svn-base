var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	getList();
	getPage(total);
	initDate();
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
					getList();
				}
			}
		})
	})
}//end
//初始化日期
function initDate(){
	layui.use("laydate", function() {
	    var laydate = layui.laydate
	    lay('.test-item').each(function() {
			laydate.render({
				elem: this,
				trigger:"click"
			});
		});
	})
}
//点击复选框
$(document).on("click","#cont span.checkbox",function(){
	$("#cont span.checkbox").removeClass("curr");
	$(this).addClass("curr");
})
//点击搜索
$("#supplierSearch").click(function(){
	getList();
	getPage(total);
})
//点击打印
$("#printInStorage").click(function(){
	if($("#cont span.curr").length==0){
		layer.msg("请选择要打印的单据!",{time:2000});
	}else{
		var bill=$("#cont span.curr").attr("data-bill");
		printInStorage(bill);
	}
	
})
//打印
function printInStorage(bill){
	$.ajax({
		url:url+"/zcOutStore/printOutStoreList",
		type:"post",
		data:{"bill":bill},
		success:function(data){
			console.log(data);
			if(data.flag){
				createPrintTable(data.result);
			}
		}
		
	})
}
function createPrintTable(res){
	$("#printDanJu tr:gt(0)").empty();
	for(var item of res){
		var $tr=$("<tr><td>"+item.bill+"</td><td>"+item.typeName+"</td><td>"+item.goodsName+"</td><td>"+item.model+"</td>" +
				"<td>"+item.brand+"</td><td>"+item.specs+"</td><td>"+item.size+"</td><td>"+item.sumval+"</td><td>"+item.outDate+"</td>" +
			    "<td>"+item.receiver+"</td></tr>");
		$("#printDanJu").append($tr);
	}
	printTable('printDanJu');
}
//初始化物品入库记录列表
function getList(){
	var startDate=$("#startDate").val();
	var endDate=$("#endDate").val();
	var bill=$("#bill").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"startDate":startDate,"endDate":endDate,"bill":bill};
	$.ajax({
		url:url+"/zcOutStore/getOutStoreList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				var index=1;
				for(var item of res){
					var bill=item.bill==undefined?"":item.bill;
					var operatorName=item.operatorName==undefined?"":item.operatorName;
					var outDate=item.outDate==undefined?"":item.outDate;
					var receiveUnitName=item.receiveUnitName==undefined?"":item.receiveUnitName;
					var receiverName=item.receiver==undefined?"":item.receiver;
					var receiverPhone=item.receiverPhone==undefined?"":item.receiverPhone;
					var approverName=item.approverName==undefined?"":item.approverName;
					var remark=item.remark==undefined?"":item.remark;
					outDate=timestampToTime(outDate);
					var $tr=$("<tr><td><span class='checkbox' data-bill="+bill+" style='float:none'></span></td><td>"+index+"</td><td>"+bill+"</td><td>"+remark+"</td><td>"+operatorName+"</td><td>"+outDate+"</td>" +
							"<td>"+receiverName+"</td><td>"+receiverPhone+"</td><td>"+approverName+"</td>" +
							"<td><a href='itemOutStorageRecord.html?fid="+item.fid+"&bill="+item.bill+"' class='mo layui-btn layui-btn-xs'>详情</a></td></tr>");
					index++;
					$("#cont").append($tr);
				}
			}
		}
	})
}
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D;
}