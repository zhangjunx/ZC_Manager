$(function(){
	initDate();
	getDate();
})
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
//获取当前日期时间
function getDate(){
	var date=new Date();
	var year = date.getFullYear();
	var month = (date.getMonth()+1)<=9?("0"+(date.getMonth()+1)):(date.getMonth()+1);
	var day =(date.getDate())<=9?("0"+(date.getDate())):(date.getDate());
	var hour=(date.getHours())<=9?("0"+(date.getHours())):(date.getHours());//date.getHours();
	var minute=(date.getMinutes())<=9?("0"+(date.getMinutes())):(date.getMinutes());//date.getMinutes();
	var second=(date.getSeconds())<=9?("0"+(date.getSeconds())):(date.getSeconds());//date.getSeconds();
	var html=year+"-"+month+"-"+day;
	var html2=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	$("#scrapDate").val(html)//给出入库日期 赋值
}//end
//读取RFID标签
/*$("#labelCode").keydown(function(event){
	if(event.keyCode==13){
		$("#supplierSearch")[0].click();
		$("#labelCode").val("");
	}
})*/ 
//点击保存
$("#saveScrap").click(function(){
	addScrapList();
})
function addScrapList(){
	if($(".labelCode").length==0){
		layer.msg("请添加物品!",{time:2000});
		return;
	}
	var arr=[];
	for(var i=0;i<$(".labelCode").length;i++){
		var obj={"labelCode":$(".labelCode").eq(i).html().toUpperCase(),"waringLocal":$(".warningLocal").eq(i).html()};
		arr.push(obj);
	}
	console.log(arr);
	$.ajax({
		url:url+"/zcGoodsWaring/addScrapList",
		type:"post",
		contentType:"application/json",
		data:JSON.stringify({
			"goodsList":arr,
			"operator":window.top.holderno,
			"operateDate":$("#scrapDate").val()
			}),
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					window.location.href="ScrapManagement.html";
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}

//点击删除
$(document).on("click",".shan",function(){
	$(this).parent().parent().remove();
})
//点击生成
$("#supplierSearch").click(function(){
	var labelCode=$("#labelCode").val();//rfid标签
	if(labelCode==""){
		layer.msg("RFID标签不能为空!",{time:2000});
		return;
	}
	for(var i=0;i<$(".labelCode").length;i++){
		if(labelCode==$(".labelCode").eq(i).html()){
			layer.msg("RFID标签重复!",{time:2000});
			return;
		}
	}
	var warningLocal=$("#warningLocal").val();
	$.ajax({
		url:url+"/zcOutStore/getOneInfoWIthRFID",
		type:"post",
		data:{"labelCode":labelCode},
		success:function(data){
			console.log(data);
			if(data.flag){
				var val=data.result;
				createTable(val,warningLocal);
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
})

function createTable(val,warningLocal){
	var len=$("#cont tr").length+1;
	var scrapDate=$("#scrapDate").val();
	var goodsType=val.goodsType==undefined?"":val.goodsType;
	var goodsName=val.goodsName==undefined?"":val.goodsName;
	var labelCode=val.labelCode==undefined?"":val.labelCode;
	var model=val.model==undefined?"":val.model;
	var brand=val.brand==undefined?"":val.brand;
	var specs=val.specs==undefined?"":val.specs;
	var size=val.size==undefined?"":val.size;
	var remark=val.remark==undefined?"":val.remark;
	var $tr=$("<tr><td>"+len+"</td><td>"+goodsType+"</td><td>"+goodsName+"</td><td class='labelCode'>"+labelCode+"</td>" +
			"<td>"+model+"</td><td>"+brand+"</td><td>"+specs+"</td><td>"+size+"</td><td>"+remark+"</td>" +
			"<td class='warningLocal'>"+warningLocal+"</td><td>"+scrapDate+"</td><td><a href='javascript:;' class='shan layui-btn layui-btn-xs layui-btn-danger'>删除</a></td></tr>")
	$("#cont").append($tr);
	$("#labelCode").val("");
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
