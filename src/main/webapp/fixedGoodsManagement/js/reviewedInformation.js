var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数
$(function(){
	initDate();
	inStroageReviewed();
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
					if($(".main-tab .curr a").html()=="入库待审核"){
						inStroageReviewed();
					}else if($(".main-tab .curr a").html()=="出库待审核"){
						outStroageReviewed();
					}else if($(".main-tab .curr a").html()=="借用待审核"){
						borrowStroageReviewed();
					}
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
//选项卡
$(".main-tab .label").click(function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".box").eq($(this).index()).show().siblings().hide();
	$("#test").show();
	if($(this).index()==0){//入库
		inStroageReviewed();
		getPage(total);
	}else if($(this).index()==1){//出库
		outStroageReviewed();
		getPage(total);
	}else if($(this).index()==2){//借用
		borrowStroageReviewed();
		getPage(total);
	}
})
//点击入库搜索
$("#inStorageSearch").click(function(){
	inStroageReviewed();
	getPage(total);
})
//点击出库搜索
$("#outStorageSearch").click(function(){
	outStroageReviewed();
	getPage(total);
})
//点击借用搜索
$("#borrowStorageSearch").click(function(){
	borrowStroageReviewed();
	getPage(total);
})
//点击入库同意
$(document).on("click",".mo1",function(){
	var bill=$(this).attr("data-bill");
	updateApprovalInStore(bill);
})
function updateApprovalInStore(bill){
	$.ajax({
		url:url+"/zcApproval/updateApprovalInStore",
		type:"post",
		data:{"bill":bill},
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					inStroageReviewed();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//点击出库同意
$(document).on("click",".mo2",function(){
	var bill=$(this).attr("data-bill");
	updateApprovalOutStore(bill);
})
function updateApprovalOutStore(bill){
	$.ajax({
		url:url+"/zcApproval/updateApprovalOutStore",
		type:"post",
		data:{"bill":bill},
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					outStroageReviewed();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//点击借用同意
$(document).on("click",".mo3",function(){
	var bill=$(this).attr("data-bill");
	updateApprovalBorrow(bill);
})
function updateApprovalBorrow(bill){
	$.ajax({
		url:url+"/zcApproval/updateApprovalBorrow",
		type:"post",
		data:{"bill":bill},
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					borrowStroageReviewed();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//入库
function inStroageReviewed(){
	var bill=$("#inBill").val();
	var inDate=$("#inDate").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"approvalResult":0,"thisHolderNo":window.top.holderno,"bill":bill,"inDate":inDate};
	$.ajax({
		url:url+"/zcApproval/getApprovalInStoreList",
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
					var inDate=item.inDate==undefined?"":item.inDate;
					inDate=timestampToTime(inDate);
					var operatorName=item.operatorName==undefined?"":item.operatorName;
					var sumval=item.sumVal==undefined?"":item.sumVal;
					var remark=item.remark==undefined?"":item.remark;
					var $tr=$("<tr><td>"+index+"</td><td>"+bill+"</td><td>"+inDate+"</td><td>"+operatorName+"</td>" +
							"<td>"+sumval+"</td><td>"+remark+"</td><td><a href='itemInStorageRecord.html?fid="+item.fid+"&bill="+bill+"' class='layui-btn layui-btn-xs layui-btn-warm'>详情</a>" +
							"<a href='javascript:;' data-bill="+bill+"  class='mo1 layui-btn layui-btn-xs'>同意</a></td></tr>");
					$("#cont").append($tr);
					index++;
				}
			}
		}
	})
}

//出库
function outStroageReviewed(){
	var bill=$("#outBill").val();
	var outDate=$("#outDate").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"approvalResult":0,"thisHolderNo":window.top.holderno,"bill":bill,"outDate":outDate};
	$.ajax({
		url:url+"/zcApproval/getApprovalOutStoreList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			console.log(data);
			total=data.count;
			$("#cont2").empty();
			if(data.flag){
				var res=data.result;
				var index=1;
				for(var item of res){
					var bill=item.bill==undefined?"":item.bill;
					var outDate=item.outDate==undefined?"":item.outDate;
					outDate=timestampToTime(outDate);
					var operatorName=item.operatorName==undefined?"":item.operatorName;
					var sumval=item.sumval==undefined?"":item.sumval;
					var receiver=item.receiver==undefined?"":item.receiver;
					var remark=item.remark==undefined?"":item.remark;
					var $tr=$("<tr><td>"+index+"</td><td>"+bill+"</td><td>"+outDate+"</td><td>"+operatorName+"</td>" +
							"<td>"+sumval+"</td><td>"+receiver+"</td><td>"+remark+"</td><td><a href='itemOutStorageRecord.html?fid="+item.fid+"&bill="+bill+"' class='layui-btn layui-btn-xs layui-btn-warm'>详情</a>" +
							"<a href='javascript:;' data-bill="+bill+"  class='mo2 layui-btn layui-btn-xs'>同意</a></td></tr>");
					$("#cont2").append($tr);
					index++;
				}
			}
		}
	})
}
//借用
function borrowStroageReviewed(){
	var bill=$("#borrowBill").val();
	var operateDate=$("#operateDate").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"approvalResult":0,"thisHolderNo":window.top.holderno,"bill":bill,"operateDate":operateDate};
	$.ajax({
		url:url+"/zcApproval/getApprovalBorrowList",
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
					var operateDate=item.operateDate==undefined?"":item.operateDate;
					operateDate=timestampToTime(operateDate);
					var operatorName=item.operatorName==undefined?"":item.operatorName;
					var sumval=item.sumVal==undefined?"":item.sumVal;
					var borrowUnitNme=item.borrowUnitNme==undefined?"":item.borrowUnitNme;
					var borrowPerName=item.borrowPer==undefined?"":item.borrowPer;
					var phone=item.phone==undefined?"":item.phone;
					var remark=item.remark==undefined?"":item.remark;
					var $tr=$("<tr><td>"+index+"</td><td>"+bill+"</td><td>"+operateDate+"</td><td>"+operatorName+"</td>" +
							"<td>"+sumval+"</td><td>"+borrowPerName+"</td>" +
							"<td>"+phone+"</td><td>"+remark+"</td><td><a href='goodsBorrowDetails.html?fid="+item.fid+"&bill="+bill+"' class='layui-btn layui-btn-xs layui-btn-warm'>详情</a>" +
							"<a href='javascript:;' data-bill="+bill+"  class='mo3 layui-btn layui-btn-xs'>同意</a></td></tr>");
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
