$(function(){
	console.log(localStorage.id)
	//查看详细
	queryDetailInfo(localStorage.id);
	 
})
 


//详情查看
function queryDetailInfo(){
	var id=localStorage.id;
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/queryDetailInfo",
		type:"POST",
		data:{"id":id},
		dataType:"json",
		success:function(data){
			console.log(data);
			//layer.close(index);
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			var res=data.result;
			var approverrolename1=(res.arrlist[0].approverrolename1==undefined)?"":res.arrlist[0].approverrolename1;
			var approverrolename2=(res.arrlist[0].approverrolename2==undefined)?"":res.arrlist[0].approverrolename2;
			var directorchargename=(res.arrlist[0].directorchargename==undefined)?"":res.arrlist[0].directorchargename;
			var directorname=(res.arrlist[0].directorname==undefined)?"":res.arrlist[0].directorname;
			if(res.visitorstype=="C"){//车辆信息
				var filldate=(res.arrlist[0].filldate==undefined)?"":res.arrlist[0].filldate;
				var filltime=(res.arrlist[0].filltime==undefined)?"":res.arrlist[0].filltime;
				var dringmodels=(res.arrlist[0].dringmodels==undefined)?"":res.arrlist[0].dringmodels;
				var carinfo=(res.arrlist[0].carinfo==undefined)?"":res.arrlist[0].carinfo;
				var note=(res.arrlist[0].note==undefined)?"":res.arrlist[0].note;
				var receiverpeopleid=(res.arrlist[0].receiverpeopleid==undefined)?"":res.arrlist[0].receiverpeopleid;
				var receiversname=(res.arrlist[0].receiversname==undefined)?"":res.arrlist[0].receiversname;
				var departmentsname=(res.arrlist[0].departmentsname==undefined)?"":res.arrlist[0].departmentsname;
				var approvertypename=(res.arrlist[0].approvertypename==undefined)?"":res.arrlist[0].approvertypename;
				var idcardno=(res.arrlist[0].idcardno==undefined)?"":res.arrlist[0].idcardno;
				var visitorsname=(res.arrlist[0].visitorsname==undefined)?"":res.arrlist[0].visitorsname;
				var visitorssextext=(res.arrlist[0].visitorssextext==undefined)?"":res.arrlist[0].visitorssextext;
				var id=(res.arrlist[0].id==undefined)?"":res.arrlist[0].id;
				var applystatusname=(res.arrlist[0].applystatusname==undefined)?"":res.arrlist[0].applystatusname;
				var visitorsstatus=(res.arrlist[0].visitorsstatus==undefined)?"":res.arrlist[0].visitorsstatus;
				if(visitorsstatus=="10"){
					visitorsstatus="已登记";
				}else if(visitorsstatus=="20"){
					visitorsstatus="已进入";
				}else if(visitorsstatus=="30"){
					visitorsstatus="已离开";
				}
				//车辆审批
				var $div1=$("<div class='approval_pending'><div class='approval_tit'><span class='checkbox' data-id='"+id+"' style='float:none'>车辆</span><p class='apply_time'>申请时间:<span>"+filldate+"|"+approvertypename+"|"+applystatusname+"</span></p></div>" +
						"<ul class='vehicleInfo'><li><span>车牌号码:</span>"+dringmodels+"</li><li><span>车牌类型:</span>"+carinfo+"</li><li><span>车身颜色:</span>"+note+"</li></ul><dl><dt class='infor_left'><img src='data:image/png;base64,"+res.arrlist[0].policephoto
						+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>警号:</span>"+receiverpeopleid+"</dd>" +
						"<dd><span class='policeName'>姓名:</span>"+receiversname+"</dd><dd><span class='job'>部门:</span>"+departmentsname
						+"</dd><dd><span class='infoTime'>时间:</span>"+filltime+"</dd></div></dl></div>");
				var $div2=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res.arrlist[0].visitorphoto+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>身份证号:</span>"+idcardno+"</dd><dd><span class='policeName'>人员姓名:</span>"+visitorsname
						+"</dd><dd><span>人员性别:</span>"+visitorssextext+"</dd><dd><span>进出状态:</span>"+visitorsstatus+"</dd></div></dl>")
				
				var $div3=$("<div class='layui-clear'></div><div class='rightTop'><a href='javascript:;' data-id='"+id+"' class='tongYi'>"+approverrolename1+"|"+approverrolename2+"</a><a href='javascript:;' data-id='"+id+"' class='boHui'>"+directorchargename+"|"+directorname+"</a></div>")
				$div1.append($div2);
				$div1.append($div3);
				$(".main-table").append($div1);
			}else if(res.visitorstype=="P"){
				var filldate=(res.arrlist[0].filldate==undefined)?"":res.arrlist[0].filldate;
				var filltime=(res.arrlist[0].filltime==undefined)?"":res.arrlist[0].filltime;
				var receiverpeopleid=(res.arrlist[0].receiverpeopleid==undefined)?"":res.arrlist[0].receiverpeopleid;
				var receiversname=(res.arrlist[0].receiversname==undefined)?"":res.arrlist[0].receiversname;
				var departmentsname=(res.arrlist[0].departmentsname==undefined)?"":res.arrlist[0].departmentsname;
				var approvertypename=(res.arrlist[0].approvertypename==undefined)?"":res.arrlist[0].approvertypename;
				var id=(res.arrlist[0].id==undefined)?"":res.arrlist[0].id;
				var applystatusname=(res.arrlist[0].applystatusname==undefined)?"":res.arrlist[0].applystatusname;
				var visitorsstatus=(res.arrlist[0].visitorsstatus==undefined)?"":res.arrlist[0].visitorsstatus;
				if(visitorsstatus=="10"){
					visitorsstatus="已登记";
				}else if(visitorsstatus=="20"){
					visitorsstatus="已进入";
				}else if(visitorsstatus=="30"){
					visitorsstatus="已离开";
				}
				//人员审批
				var $div1=$("<div class='approval_pending'><div class='approval_tit'><span class='checkbox' data-id='"+id
						+"' style='float:none'>人员</span><p class='apply_time'>申请时间:<span>"+filldate+"|"+approvertypename+"|"+applystatusname+"</span></p></div></div>");
				var $div5=$("<div class='scroll'></div>")
				var $div4=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res.arrlist[0].policephoto+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>警号:</span>"+receiverpeopleid
						+"</dd><dd><span class='policeName'>姓名:</span>"+receiversname
						+"</dd><dd><span class='job'>部门:</span>"+departmentsname
						+"</dd><dd><span class='infoTime'>时间:</span>"+filltime+"</dd></div></dl>")
				//var $div3=$("<div class='layui-clear'></div><div class='rightTop'><a href='javascript:;' data-id='"+id+"' class='tongYi'>批准</a><a href='javascript:;' data-id='"+id+"' class='boHui'>驳回</a></div>")
				var $div3=$("<div class='layui-clear'></div><div class='rightTop'><a href='javascript:;' data-id='"+id+"' class='tongYi'>"+approverrolename1+"|"+approverrolename2+"</a><a href='javascript:;' data-id='"+id+"' class='boHui'>"+directorchargename+"|"+directorname+"</a></div>")
				$div5.append($div4);
				for(var j=0;j<res.arrlist.length;j++){
					var idcardno=(res.arrlist[j].idcardno==undefined)?"":res.arrlist[j].idcardno;
					var visitorsname=(res.arrlist[j].visitorsname==undefined)?"":res.arrlist[j].visitorsname;
					var visitorssextext=(res.arrlist[j].visitorssextext==undefined)?"":res.arrlist[j].visitorssextext;
					var $div2=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res.arrlist[j].visitorphoto
						+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>身份证号:</span>"+idcardno
						+"</dd><dd><span class='policeName'>人员姓名:</span>"+visitorsname+"</dd><dd><span>人员性别:</span>"+visitorssextext
					    +"</dd><dd><span>进出状态:</span>"+visitorsstatus+"</dd></div></dl>");
					$div5.append($div2);
				}
				$div1.append($div5);
				$div1.append($div3);
				$(".main-table").append($div1);
			}
		}
	})
}

 




 