var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	initDate();
	borrowStroageReviewed();
	getPage(total);
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
						borrowStroageReviewed();
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
				trigger:"click",
			});
		});
	})
}

//点击复选框
$(document).on("click","#cont3 span.checkbox",function(){
	$("#cont3 span.checkbox").removeClass("curr");
	$(this).addClass("curr");
})
//点击打印
$("#printBorrow").click(function(){
	if($("#cont3 span.curr").length==0){
		layer.msg("请选择要打印的单据!",{time:2000});
	}else{
		var bill=$("#cont3 span.curr").attr("data-bill");
		printInStorage(bill);
	}
})
//打印
function printInStorage(bill){
	$.ajax({
		url:url+"/zcBorrow/getBorrowedBillList",
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
		var bill=item.bill==undefined?"":item.bill;
		var borrowDate=item.borrowDate==undefined?"":item.borrowDate;
		if(borrowDate!=undefined&&borrowDate!=null&&borrowDate!=""){
			borrowDate=timestampToTime(borrowDate);
		}
		var operatorName=item.operatorName==undefined?"":item.operatorName;
		var sumval=item.sumVal==undefined?"":item.sumVal;
		var borrowUnitNme=item.borrowUnitNme==undefined?"":item.borrowUnitNme;
		var borrowPerName=item.borrowPerName==undefined?"":item.borrowPerName;
		var phone=item.phone==undefined?"":item.phone;
		var remark=item.remark==undefined?"":item.remark;
		var $tr=$("<tr><td>"+bill+"</td><td>"+borrowDate+"</td><td>"+operatorName+"</td>" +
				"<td>"+sumval+"</td><td>"+borrowUnitNme+"</td><td>"+borrowPerName+"</td>" +
				"<td>"+phone+"</td><td>"+remark+"</td></td></tr>");
		$("#printDanJu").append($tr);
	}
	printTable('printDanJu');
}


//点击借用搜索
$("#borrowStorageSearch").click(function(){
	borrowStroageReviewed();
	getPage(total);
})

//借用
function borrowStroageReviewed(){
	var bill=$("#borrowBill").val();
	var operateDate=$("#operateDate").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"bill":bill,"operateDate":operateDate};
	$.ajax({
		url:url+"/zcBorrow/getBorrowedBillList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont3").empty();
			if(data.flag){
				var res=data.result;
				var index=1;
				for(var item of res){
					var bill=item.bill==undefined?"":item.bill;
					var borrowDate=item.borrowDate==undefined?"":item.borrowDate;
					if(borrowDate!=undefined&&borrowDate!=null&&borrowDate!=""){
						borrowDate=timestampToTime(borrowDate);
					}
					var operatorName=item.operatorName==undefined?"":item.operatorName;
					var sumval=item.sumVal==undefined?"":item.sumVal;
					var borrowUnitNme=item.borrowUnitNme==undefined?"":item.borrowUnitNme;
					var borrowPerName=item.borrowPerName==undefined?"":item.borrowPerName;
					var phone=item.phone==undefined?"":item.phone;
					var remark=item.remark==undefined?"":item.remark;
					var $tr=$("<tr><td><span class='checkbox' data-bill='"+bill+"' style='float:none'></span></td><td>"+index+"</td><td>"+bill+"</td><td>"+borrowDate+"</td><td>"+operatorName+"</td>" +
							"<td>"+sumval+"</td><td>"+borrowUnitNme+"</td><td>"+borrowPerName+"</td>" +
							"<td>"+phone+"</td><td>"+remark+"</td><td><a href='goodsBorrowDetails.html?fid="+item.fid+"&bill="+item.bill+"' class='layui-btn layui-btn-xs layui-btn-warm'>详情</a></td></tr>");
					$("#cont3").append($tr);
					index++;
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
