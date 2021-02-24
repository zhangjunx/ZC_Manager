$(function(){
	queryVisitorsInfoByID();
})

$(".goBack").click(function(){
	window.history.go(-1);
})

function queryVisitorsInfoByID(){
	var id=localStorage.id;
	$.ajax({
		url:url+"/VisitorsInfo/queryByPrimaryKey",
		type:"POST",
		data:{"id":id},
		dataType:"json",
		//contentType:"application/json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				return;
			}
			var val=data.result;
			var visitorsphoto=(val.visitorsphoto==undefined?"":val.visitorsphoto);
			var visitorsname=(val.visitorsname==undefined?"":val.visitorsname);
			var visitorssextext=(val.visitorssextext==undefined?"":val.visitorssextext);
			var nationality=(val.nationality==undefined?"":val.nationality);
			var idcardno=(val.idcardno==undefined?"":val.idcardno);
			var cardno=(val.carno==undefined?"":val.carno);
			var dringmodels=(val.dringmodels==undefined?"":val.dringmodels);
			var visitorsdate=(val.visitorsdate==undefined?"":val.visitorsdate);
			visitorsdate=timestampToTime(visitorsdate);
			var visitorsreasontext=(val.visitorsreasontext==undefined?"":val.visitorsreasontext);
			var goodsinfo=(val.goodsinfo==undefined?"":val.goodsinfo);
			var phone=(val.phone==undefined?"":val.phone);
			var visitorsdepartmentsname=(val.visitorsdepartmentsname==undefined?"":val.visitorsdepartmentsname);
			var visitorsaddress=(val.visitorsaddress==undefined?"":val.visitorsaddress);
			
			var receiversname=(val.receiversname==undefined?"":val.receiversname);
			var departmentsname=(val.departmentsname==undefined?"":val.departmentsname);
			var fixedtelephone=(val.fixedtelephone==undefined?"":val.fixedtelephone);
			var receiversposition=(val.receiversposition==undefined?"":val.receiversposition);
			var receiversphone=(val.receiversphone==undefined?"":val.receiversphone);
			var note=(val.note==undefined?"":val.note);
			var holderphoto=(val.holderphoto==undefined?"":val.holderphoto);
			if(visitorsphoto.length==0){
				$("#visitorPhoto").attr("src","../img/person.png");
			}else{
				$("#visitorPhoto").attr("src","data:image/png;base64,"+visitorsphoto);
			}
			
			if(holderphoto.length==0){
				$("#reveicerPhoto").attr("src","../img/person.png");
			}else{
				$("#reveicerPhoto").attr("src","data:image/png;base64,"+holderphoto)
			}
			//访客
			$("#visitorName").val(visitorsname);
			$("#visitorSex").val(visitorssextext);
			$("#nationality").val(nationality);
			$("#idcardno").val(idcardno);
			$("#cardno").val(cardno);
			$("#carNumber").val(dringmodels);
			$("#visitorTime").val(visitorsdate);
			$("#visitorThings").val(visitorsreasontext);
			$("#things").val(goodsinfo);
			$("#mobilePhone").val(phone);
			$("#unitName").val(visitorsdepartmentsname);
			$("#address").val(visitorsaddress);
			//被访人
			$("#receiverName").val(receiversname);
			$("#departmentsname").val(departmentsname);
			$("#extensionNumber").val(fixedtelephone);
			$("#location").val(receiversposition);
			$("#telephone").val(receiversphone);
			$("#remark").text(note);
		}
	})
}//end

function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate()<10?"0"+(date.getDate()):date.getDate()) + ' ';
    var h = (date.getHours()<10?"0"+(date.getHours()):date.getHours()) + ':';
    var m = (date.getMinutes()<10?"0"+(date.getMinutes()):date.getMinutes()) + ':';
    var s = (date.getSeconds()<10?"0"+(date.getSeconds()):date.getSeconds());
    return Y + M + D + h + m + s;
}
