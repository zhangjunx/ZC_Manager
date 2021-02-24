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

//入库
function inStroageReviewed(){
	var bill=$("#inBill").val();
	var startDate=$("#startDate").val();
	var endDate=$("#endDate").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"bill":bill,"startDate":startDate,"endDate":endDate};
	$.ajax({
		url:url+"/zcReport/getInStoreListReport",
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
					var goodsName=item.goodsName==undefined?"":item.goodsName;
					var typeName=item.typeName==undefined?"":item.typeName;
					//inDate=timestampToTime(inDate);
					var type=item.type==undefined?"":item.type;
					var brand=item.brand==undefined?"":item.brand;
					var specs=item.specs==undefined?"":item.specs;
					var size=item.size==undefined?"":item.size;
					var sumVal=item.sumVal==undefined?"":item.sumVal;
					var operateDate=item.operateDate==undefined?"":item.operateDate;
					operateDate=timestampToTime(operateDate);
					var $tr=$("<tr><td>"+index+"</td><td>"+goodsName+"</td><td>"+typeName+"</td><td>"+type+"</td>" +
							"<td>"+brand+"</td><td>"+specs+"</td><td>"+size+"</td><td>"+sumVal+"</td></tr>");
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
	var startDate=$("#startDate2").val();
	var endDate=$("#endDate2").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"bill":bill,"startDate":startDate,"endDate":endDate};
	$.ajax({
		url:url+"/zcReport/getOutStoreListReport",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			$("#cont2").empty();
			if(data.flag){
				var res=data.result;
				var index=1;
				for(var item of res){
					var goodsName=item.goodsName==undefined?"":item.goodsName;
					var typeName=item.typeName==undefined?"":item.typeName;
					//inDate=timestampToTime(inDate);
					var type=item.type==undefined?"":item.type;
					var brand=item.brand==undefined?"":item.brand;
					var specs=item.specs==undefined?"":item.specs;
					var size=item.size==undefined?"":item.size;
					var sumVal=item.sumVal==undefined?"":item.sumVal;
					var operateDate=item.operateDate==undefined?"":item.operateDate;
					operateDate=timestampToTime(operateDate);
					var $tr=$("<tr><td>"+index+"</td><td>"+goodsName+"</td><td>"+typeName+"</td><td>"+type+"</td>" +
							"<td>"+brand+"</td><td>"+specs+"</td><td>"+size+"</td><td>"+sumVal+"</td></tr>");
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
	var startDate=$("#startDate3").val();
	var endDate=$("#endDate3").val();
	var obj={"curpage":curpage,"pagesize":pagesize,"bill":bill,"startDate":startDate,"endDate":endDate};
	$.ajax({
		url:url+"/zcReport/getBorrowedStoreListReport",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			$("#cont3").empty();
			if(data.flag){
				var res=data.result;
				var index=1;
				for(var item of res){
					var goodsName=item.goodsName==undefined?"":item.goodsName;
					var typeName=item.typeName==undefined?"":item.typeName;
					//inDate=timestampToTime(inDate);
					var type=item.type==undefined?"":item.type;
					var brand=item.brand==undefined?"":item.brand;
					var specs=item.specs==undefined?"":item.specs;
					var size=item.size==undefined?"":item.size;
					var sumVal=item.sumVal==undefined?"":item.sumVal;
					var operateDate=item.operateDate==undefined?"":item.operateDate;
					operateDate=timestampToTime(operateDate);
					var $tr=$("<tr><td>"+index+"</td><td>"+goodsName+"</td><td>"+typeName+"</td><td>"+type+"</td>" +
							"<td>"+brand+"</td><td>"+specs+"</td><td>"+size+"</td><td>"+sumVal+"</td></tr>");
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
