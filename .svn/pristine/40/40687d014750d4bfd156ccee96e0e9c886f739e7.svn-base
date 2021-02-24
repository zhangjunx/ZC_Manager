$(function(){
	//编辑查询
	queryProductSDData(localStorage.datano);
})

//点击确定提交
$("#updateProductSDDataBtn").click(function(){
	updateProductSDData();
})

function updateProductSDData(){
	var sdbill=$("#sdbill").val();
	var itemcode=$("#itemcode").val();
	var itemname=$("#itemname").val();
	var operator=$("#operator").val();
	var sdpersonname=$("#sdpersonname").val();
	var warename=$("#warename").val();
	var areaname=$("#areaname").val();
	var suppliername=$("#suppliername").val();
	var spec=$("#spec").val();
	var type=$("#type").val();
	var unitname=$("#unitname").val();
	var itemtype=$("#itemtype").val();
	var statusname=$("#statusname").val();
	var sddate=$("#sddate").val();
	var remark=$("#remark").val();
	var sdpersondeptname=$("#sdpersondeptname").val();
	var quantity=$("#quantity").val();
	var price=$("#price").val();
	var sumamount=$("#sumamount").val();
	var datano=localStorage.datano;
	/*var res={"sdbill":sdbill,"itemcode":itemcode,"itemname":itemname,"quantity":quantity,"sumamount":sumamount,
			"operator":operator,"sdpersonname":sdpersonname,"warename":warename,"areaname":areaname,"suppliername":suppliername,"spec":spec,"type":type,"unitname":unitname,
			"itemtype":itemtype,"statusname":statusname,"sddate":sddate,"remark":remark,"price":price,"sdpersondeptname":sdpersondeptname};
	*/
	var res={"datano":datano,"quantity":quantity,"sumamount":sumamount,"price":price,"remark":remark};
	$.ajax({
		url:url+"/Product_SDData/updateProductSDData",
		type:"POST",
		data:res,
		dataType:"json",
		success:function(data){
			console.log(data.reason)
			layer.msg(data.reason,{time:2000})
		}
	})
}//end

//价格失焦事件
$("#price").blur(function(){
	var price=$(this).val();
	var quantity=$("#quantity").val();
	$("#sumamount").val(price*quantity);
})
//数量失焦事件
$("#quantity").blur(function(){
	var quantity=$(this).val();
	var price=$("#price").val();
	$("#sumamount").val(price*quantity);
})


//编辑查询
function queryProductSDData(text){
	var obj={"datano":text};
	$.ajax({
		url:url+"/Product_SDData/queryProductSDData",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			if(!data.flag){
				return;
			}
			var val=data.result;
			var sdbill=(val.sdbill==undefined?"":val.sdbill);
			var itemcode=(val.itemcode==undefined?"":val.itemcode);
			var itemname=(val.itemname==undefined?"":val.itemname);
			var price=(val.price==undefined?"":val.price);
			var quantity=(val.quantity==undefined?"":val.quantity);
			var sumamount=(val.sumamount==undefined?"":val.sumamount);
			var operator=(val.operator==undefined?"":val.operator);
			var sdpersonname=(val.sdpersonname==undefined?"":val.sdpersonname);
			var warename=(val.warename==undefined?"":val.warename);
			var areaname=(val.areaname==undefined?"":val.areaname);
			var suppliername=(val.suppliername==undefined?"":val.suppliername);
			var spec=(val.spec==undefined?"":val.spec);
			var type=(val.type==undefined?"":val.type);
			var unitname=(val.unitname==undefined?"":val.unitname);
			var itemtype=(val.itemtype==undefined?"":val.itemtype);
			var statusname=(val.statusname==undefined?"":val.statusname);
			var sddate=(val.sddate==undefined?"":val.sddate);
			console.log(sddate)
			var remark=(val.remark==undefined?"":val.remark);
			var sdpersondeptname=(val.sdpersondeptname==undefined?"":val.sdpersondeptname);
			$("#sdbill").val(sdbill).css("background","#f2f2f2");
			$("#itemcode").val(itemcode).css("background","#f2f2f2");
			$("#itemname").val(itemname).css("background","#f2f2f2");
			$("#quantity").val(quantity);
			$("#sumamount").val(sumamount);
			$("#operator").val(operator).css("background","#f2f2f2");
			$("#sdpersonname").val(sdpersonname).css("background","#f2f2f2");
			$("#warename").val(warename).css("background","#f2f2f2");
			$("#areaname").val(areaname).css("background","#f2f2f2");
			$("#suppliername").val(suppliername).css("background","#f2f2f2");
			$("#spec").val(spec).css("background","#f2f2f2");
			$("#type").val(type).css("background","#f2f2f2");
			$("#unitname").val(unitname).css("background","#f2f2f2");
			$("#itemtype").val(itemtype).css("background","#f2f2f2");
			$("#statusname").val(statusname).css("background","#f2f2f2");
			$("#sddate").val(sddate).css("background","#f2f2f2");
			$("#remark").val(remark);
			$("#price").val(price);
			$("#sdpersondeptname").val(sdpersondeptname).css("background","#f2f2f2");
		},
		error:function(data){
			console.log("error");
		}
	})
}




