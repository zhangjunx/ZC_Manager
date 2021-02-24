$(function(){
	var obj={"curpage":curpage,"pagesize":pagesize};
	getAccountList(obj);
	getPage(total);
})
var total;
var curpage=1;//当前页
var pagesize=20;//每页显示的条数

//点击禁用/启用
$(document).on("click",".shan",function(){
	var text=$(this).html();
	var fid=$(this).attr("data-fid");
	var fstatus=$(this).attr("data-fstatus");
	var holderno=$(this).attr("data-holderno");
	var name=$(this).attr("data-name");
	var iDNumber=$(this).attr("data-idnumber");
	var idcardNum=$(this).attr("data-idcardnum");
	if(fstatus=="0"){
		fstatus=1;
		var optType=1;
	}else{
		fstatus=0;
		var optType=2;
	}
	layer.confirm("确定"+text+"?",{title:"提示信息"},function(index){
		layer.close(index);
		$.ajax({
			url:url+"/holderAccount/updateAccountStatus",
			type:"post",
			data:{"fid":fid,"fstatus":fstatus,"holderNo":holderno,"name":name,"iDNumber":iDNumber,"idcardNum":idcardNum},
			success:function(data){
				console.log(data);
				if(data.flag){
					var obj={"curpage":curpage,"pagesize":pagesize};
					getAccountList(obj);
					updateAddAccountStatus(data.resultList,optType);
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
})

function updateAddAccountStatus(result,optType){
	$.ajax({
		url:url+"/facePayRecord/updateAddAccountStatus",
		type:"post",
		data:{"data":result,"optType":optType},
		success:function(data){
		}
	})
}
//点击充值
$(document).on("click",".investMoney",function(){
	$("#czMoney").val("");
	var balance=$(this).attr("data-balance");
	var fid=$(this).attr("data-fid");
	var holderno=$(this).attr("data-holderno");
	$("#accountMoney").val(balance);
	var consumeRoleID=$(this).attr("data-consumeroleid");
	layer.open({
		type:1,
		title:"充值",
		content:$("#open"),
		area:["400px","250px"],
		btn:["确定","取消"],
		yes:function(index,layero){
			var money=$("#czMoney").val();
			var afterRecharging=parseInt(balance)+parseInt(money);
			if(money==0){
				layer.msg("请输入充值金额",{time:2000});
				return;
			}
			var obj={"fid":fid,"beforeRecharging":balance,"afterRecharging":afterRecharging,"rechargingAmount":money,
					"rechargingType":1,"optType":1,"updator":window.top.holderno,"holderNo":holderno,"consumeRoleID":consumeRoleID};
			$.ajax({
				url:url+"/holderAccount/updateRecharging",
				type:"post",
				data:obj,
				success:function(data){
					console.log(data);
					if(data.flag){
						layer.close(index);
						var obj={"curpage":curpage,"pagesize":pagesize};
						getAccountList(obj);
						var res=data.resultList;
						$.ajax({
							url:url+"/facePayRecord/updateAddAccountVal",
							type:"post",
							data:{"data":res,"optType":1},
							success:function(data){
								console.log(data);
							}
						})
					}
				}
			})
			
		}
	})
})

//点击退费
$(document).on("click",".refund",function(){
	$("#tfMoney").val("");
	var balance=$(this).attr("data-balance");
	var fid=$(this).attr("data-fid");
	var holderno=$(this).attr("data-holderno");
	$("#tf_accountMoney").val(balance);
	var consumeRoleID=$(this).attr("data-consumeroleid");
	layer.open({
		type:1,
		title:"退费",
		content:$("#tF"),
		area:["400px","250px"],
		btn:["确定","取消"],
		yes:function(index,layero){
			
			var money=$("#tfMoney").val();
			var afterRecharging=parseInt(balance)-parseInt(money);
			if(money==0){
				layer.msg("请输入退费金额",{time:2000});
				return;
			}
			if(parseInt(money)>parseInt(balance)){
				layer.msg("余额不足!",{time:2000});
				return;
			}
			var obj={"fid":fid,"beforeRecharging":balance,"afterRecharging":afterRecharging,"rechargingAmount":money,
					"rechargingType":1,"optType":2,"updator":window.top.holderno,"holderNo":holderno,"consumeRoleID":consumeRoleID};
			$.ajax({
				url:url+"/holderAccount/updateRecharging",
				type:"post",
				data:obj,
				success:function(data){
					if(data.flag){
						layer.close(index);
						var obj={"curpage":curpage,"pagesize":pagesize};
						getAccountList(obj);
						var res=data.resultList;
						$.ajax({
							url:url+"/facePayRecord/updateAddAccountVal",
							type:"post",
							data:{"data":res,"optType":2},
							success:function(data){
								console.log(data);
							}
						})
					}
				}
			})
		}
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
					getAccountList(obj);
				}
			}
		})
	})
}//end
//获取账户列表
function getAccountList(obj){
	$.ajax({
		url:url+"/holderAccount/getAccountList",
		type:"post",
		data:obj,
		async:false,
		success:function(data){
			total=data.count;
			$("#cont").empty();
			if(data.flag){
				var res=data.result;
				for(var item of res){
					var holderno=item.HolderNo==undefined?"":item.HolderNo;
					var holdername=item.HolderName==undefined?"":item.HolderName;
					var departmentName=item.departmentName==undefined?"":item.departmentName;
					var accountno=item.accountNo==undefined?"":item.accountNo;
					var fstatus=item.fstatus==undefined?"":item.fstatus;
					var Balance=item.Balance==undefined?"":item.Balance;
					var consumeName=item.consumeName==undefined?"":item.consumeName;
					
					if(fstatus==1){
						var status="已启用";
						var fst="<a href='javascript:;' data-idnumber="+item.iDNumber+" data-idcardnum="+item.idcardNum+" data-name="+item.name+"  data-holderno="+holderno+" data-fid="+item.fid+" data-fstatus="+fstatus+" class='shan layui-btn layui-btn-xs layui-btn-danger'>禁用</a>";
					}else{
						var status="已禁用";
						var fst="<a href='javascript:;' data-idnumber="+item.iDNumber+" data-idcardnum="+item.idcardNum+" data-name="+item.name+" data-holderno="+holderno+" data-fid="+item.fid+"  data-fstatus="+fstatus+"  class='shan layui-btn layui-btn-xs'>启用</a>";
					}
					var $tr=$("<tr><td>"+holderno+"</td><td>"+holdername+"</td><td>"+departmentName+"</td>" +
							"<td>"+consumeName+"</td><td>"+accountno+"</td><td>"+Balance+"元</td><td>"+status+"</td><td>" +
							"<a href='javascript:;' data-consumeroleid="+item.consumeRoleID+" data-holderno="+holderno+" data-balance="+Balance+" data-fid="+item.fid+" class='layui-btn layui-btn-xs layui-bg-blue investMoney'>充值</a>" +
							"<a href='javascript:;' data-consumeroleid="+item.consumeRoleID+" data-holderno="+holderno+" data-balance="+Balance+" data-fid="+item.fid+" class='layui-btn layui-btn-xs layui-btn-warm refund'>退费</a>"+fst+"" +
							"<a href='rechargeRecord.html?fid="+item.fid+"' class='layui-btn layui-btn-xs'>查看详细</a></td></tr>");
					$("#cont").append($tr);
				}
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}