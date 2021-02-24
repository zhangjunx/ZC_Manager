$(function(){
	
	var audited=getUrlParam("audited");
	if(audited==0){
		$(".main-tab .label").eq(1).addClass("curr").siblings().removeClass("curr");
		$(".search-box").hide();
		$(".approval_self").hide();
		$("#insertDeptBtn").hide();
		queryVisitorsInfoByLeadAudited();
	}else{
		//查询待审批
		queryVisitorsInfoByLeadUnaudited();
	}
})
//url地址解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

//选项卡
$(".main-tab .label").click(function(){
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".approval_pending").remove();
	if($(this).index()==0){//待我审批
		$(".search-box").show();
		$(".approval_self").hide();
		$("#insertDeptBtn").hide();
		queryVisitorsInfoByLeadUnaudited();//查询待审批
	}else if($(this).index()==1){//审批记录
		$(".search-box").hide();
		$(".approval_self").hide();
		$("#insertDeptBtn").hide();
		queryVisitorsInfoByLeadAudited();
	}
})
//点击批量批准
$("#sure").click(function(){
	var arr=[];
	for(var i=0;i<$(".approval_pending").length;i++){
		if($(".approval_pending").eq(i).find("span").hasClass("curr")){
			var id=$(".approval_pending").eq(i).find("span.curr").attr("data-id");
			arr.push({"id":id});
		}
	}
	console.log(arr);
	var obj={"ids":arr,"holderno":window.top.holderno};
	if(arr.length==0){
		layer.msg("请先选择要批量批准的信息！",{time:2000});
		return;
	}
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/updateApplyStatusAgreeBatch",
		type:"POST",
		data:JSON.stringify(obj),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:2000},function(){
					window.location.reload();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
})
//点击批量驳回
$("#no").click(function(){
	var arr=[];
	for(var i=0;i<$(".approval_pending").length;i++){
		if($(".approval_pending").eq(i).find("span").hasClass("curr")){
			var id=$(".approval_pending").eq(i).find("span.curr").attr("data-id");
			arr.push({"id":id});
		}
	}
	console.log(arr);
	var obj={"ids":arr,"holderno":window.top.holderno};
	if(arr.length==0){
		layer.msg("请先选择要批量驳回的信息！",{time:2000});
		return;
	}
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/updateApplyStatusNoAgreeBatch",
		type:"POST",
		data:JSON.stringify(obj),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:2000},function(){
					window.location.reload();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
})



//查询待我审批
function queryVisitorsInfoByLeadUnaudited(){
	var index=layer.load(2,{shade:[0.5,'#fff']});
	$.ajax({
		//url:url+"/WX_VisitorsInfo/queryVisitorsInfoByLeadUnaudited",
		url:url+"/WX_VisitorsInfoAdd/queryUnauditedByMy",
		type:"POST",
		data:{"holderno":window.top.holderno},
		dataType:"json",
		success:function(data){
			layer.close(index);
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			var res=data.result;
			for(var i=0;i<res.length;i++){
				if(res[i].visitorstype=="C"){//车辆信息
					var filldate=(res[i].arrlist[0].filldate==undefined)?"":res[i].arrlist[0].filldate;
					var dringmodels=(res[i].arrlist[0].dringmodels==undefined)?"":res[i].arrlist[0].dringmodels;
					var carinfo=(res[i].arrlist[0].carinfo==undefined)?"":res[i].arrlist[0].carinfo;
					var note=(res[i].arrlist[0].note==undefined)?"":res[i].arrlist[0].note;
					var receiverpeopleid=(res[i].arrlist[0].receiverpeopleid==undefined)?"":res[i].arrlist[0].receiverpeopleid;
					var receiversname=(res[i].arrlist[0].receiversname==undefined)?"":res[i].arrlist[0].receiversname;
					var departmentsname=(res[i].arrlist[0].departmentsname==undefined)?"":res[i].arrlist[0].departmentsname;
					var approvertypename=(res[i].arrlist[0].approvertypename==undefined)?"":res[i].arrlist[0].approvertypename;
					var idcardno=(res[i].arrlist[0].idcardno==undefined)?"":res[i].arrlist[0].idcardno;
					var visitorsname=(res[i].arrlist[0].visitorsname==undefined)?"":res[i].arrlist[0].visitorsname;
					var visitorssextext=(res[i].arrlist[0].visitorssextext==undefined)?"":res[i].arrlist[0].visitorssextext;
					var visitorsreasontext=(res[i].arrlist[0].visitorsreasontext==undefined)?"":res[i].arrlist[0].visitorsreasontext;
					var id=(res[i].arrlist[0].id==undefined)?"":res[i].arrlist[0].id;
					//车辆审批
					var $div1=$("<div class='approval_pending'><div class='approval_tit'><span class='checkbox' data-id='"+id+"' style='float:none'>车辆</span><p class='apply_time'>申请时间:<span>"+filldate+"  |  "+approvertypename+"</span><span>|  "+visitorsreasontext+"</span></p></div>" +
							"<ul class='vehicleInfo'><li><span>车牌号码:</span>"+dringmodels+"</li><li><span>车牌类型:</span>"+carinfo+"</li><li><span>车身颜色:</span>"+note+"</li></ul><dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].policephoto
							+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>警号:</span>"+receiverpeopleid+"</dd>" +
							"<dd><span class='policeName'>姓名:</span>"+receiversname+"</dd><dd><span class='job'>部门:</span>"+departmentsname
							+"</dd></div></dl></div>");
					var $div2=$("<dl><dt class='infor_left'><img style='width:112px;height:139px' src='data:image/png;base64,"+res[i].arrlist[0].visitorphoto
							+"'></dt><div class='infor_right'><dd><span class='alarm'>身份证号:</span>"+idcardno+"</dd>" +
							"<dd><span class='policeName'>人员姓名:</span>"+visitorsname
							+"</dd><dd><span>人员性别:</span>"+visitorssextext+"</dd></div></dl>")
					var $div3=$("<div class='layui-clear'></div><div class='rightTop'><a href='javascript:;' data-id='"+id+"' class='tongYi'>批准</a><a href='javascript:;' data-id='"+id+"' class='boHui'>驳回</a></div>")
					$div1.append($div2);
					$div1.append($div3);
					$(".main-table").append($div1);
				}else if(res[i].visitorstype=="P"){
					var filldate=(res[i].arrlist[0].filldate==undefined)?"":res[i].arrlist[0].filldate;
					var receiverpeopleid=(res[i].arrlist[0].receiverpeopleid==undefined)?"":res[i].arrlist[0].receiverpeopleid;
					var receiversname=(res[i].arrlist[0].receiversname==undefined)?"":res[i].arrlist[0].receiversname;
					var departmentsname=(res[i].arrlist[0].departmentsname==undefined)?"":res[i].arrlist[0].departmentsname;
					var approvertypename=(res[i].arrlist[0].approvertypename==undefined)?"":res[i].arrlist[0].approvertypename;
					var visitorsreasontext=(res[i].arrlist[0].visitorsreasontext==undefined)?"":res[i].arrlist[0].visitorsreasontext;
					var id=(res[i].arrlist[0].id==undefined)?"":res[i].arrlist[0].id;
					//人员审批
					var $div1=$("<div class='approval_pending'><div class='approval_tit'><span class='checkbox' data-id='"+id
							+"' style='float:none'>人员</span><p class='apply_time'>申请时间:<span>"+filldate+" | "+approvertypename+"</span><span>|  "+visitorsreasontext+"</span></p></div></div>");
					var $div5=$("<div class='scroll'></div>")
					var $div4=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].policephoto
							+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>警号:</span>"+receiverpeopleid
							+"</dd><dd><span class='policeName'>姓名:</span>"+receiversname
							+"</dd><dd><span class='job'>部门:</span>"+departmentsname+"</dd></div></dl>")
					var $div3=$("<div class='layui-clear'></div><div class='rightTop'><a href='javascript:;' data-id='"+id+"' class='tongYi'>批准</a><a href='javascript:;' data-id='"+id+"' class='boHui'>驳回</a></div>")
					$div5.append($div4);
					for(var j=0;j<res[i].arrlist.length;j++){
						var idcardno=(res[i].arrlist[j].idcardno==undefined)?"":res[i].arrlist[j].idcardno;
						var visitorsname=(res[i].arrlist[j].visitorsname==undefined)?"":res[i].arrlist[j].visitorsname;
						var visitorssextext=(res[i].arrlist[j].visitorssextext==undefined)?"":res[i].arrlist[j].visitorssextext;
						var $div2=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[j].visitorphoto
							+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>身份证号:</span>"+idcardno+"</dd>" +
						"<dd><span class='policeName'>人员姓名:</span>"+visitorsname+"</dd><dd><span>人员性别:</span>"+visitorssextext+"</dd></div></dl>");
						$div5.append($div2);
					}
					$div1.append($div5);
					$div1.append($div3);
					$(".main-table").append($div1);
				}
			}
		}
	})
}

//查询我已审批
function queryVisitorsInfoByLeadAudited(){
	var index=layer.load(2,{shade:[0.5,'#fff']});
	$.ajax({
		//url:url+"/WX_VisitorsInfo/queryVisitorsInfoByLeadAudited",
		url:url+"/WX_VisitorsInfoAdd/queryAuditedByMy",
		type:"POST",
		data:{"holderno":window.top.holderno},
		dataType:"json",
		success:function(data){
			//console.log(data);
			$(".approval_pending").remove();
			layer.close(index);
			if(!data.flag){
				layer.msg(data.reason,{time:2000});
				return;
			}
			var res=data.result;
			for(var i=0;i<res.length;i++){
				if(res[i].visitorstype=="C"){//车辆信息
					var filldate=(res[i].arrlist[0].filldate==undefined)?"":res[i].arrlist[0].filldate;
					var dringmodels=(res[i].arrlist[0].dringmodels==undefined)?"":res[i].arrlist[0].dringmodels;
					var carinfo=(res[i].arrlist[0].carinfo==undefined)?"":res[i].arrlist[0].carinfo;
					var note=(res[i].arrlist[0].note==undefined)?"":res[i].arrlist[0].note;
					var receiverpeopleid=(res[i].arrlist[0].receiverpeopleid==undefined)?"":res[i].arrlist[0].receiverpeopleid;
					var receiversname=(res[i].arrlist[0].receiversname==undefined)?"":res[i].arrlist[0].receiversname;
					var departmentsname=(res[i].arrlist[0].departmentsname==undefined)?"":res[i].arrlist[0].departmentsname;
					var approvertypename=(res[i].arrlist[0].approvertypename==undefined)?"":res[i].arrlist[0].approvertypename;
					var idcardno=(res[i].arrlist[0].idcardno==undefined)?"":res[i].arrlist[0].idcardno;
					var visitorsname=(res[i].arrlist[0].visitorsname==undefined)?"":res[i].arrlist[0].visitorsname;
					var visitorssextext=(res[i].arrlist[0].visitorssextext==undefined)?"":res[i].arrlist[0].visitorssextext;
					var visitorsreasontext=(res[i].arrlist[0].visitorsreasontext==undefined)?"":res[i].arrlist[0].visitorsreasontext;
					var id=(res[i].arrlist[0].id==undefined)?"":res[i].arrlist[0].id;
					if(res[i].arrlist[0].applystatus=="20"||res[i].arrlist[0].applystatus=="30"){
						var applystatusname="批准";
					}else{
						var applystatusname="驳回";
					}
					//车辆审批
					var $div1=$("<div class='approval_pending'><div class='approval_tit'><h4 class='approval_audited'>车辆 |"+applystatusname+"</h4><p class='apply_time'>申请时间:<span>"+filldate+" | "+approvertypename+"</span><span>|  "+visitorsreasontext+"</span></p></div>" +
							"<ul class='vehicleInfo'><li><span>车牌号码:</span>"+dringmodels+"</li><li><span>车牌类型:</span>"+carinfo
							+"</li><li><span>车身颜色:</span>"+note
							+"</li></ul><dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].policephoto
							+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>警号:</span>"+receiverpeopleid+"</dd>" +
							"<dd><span class='policeName'>姓名:</span>"+receiversname+"</dd><dd><span class='job'>部门:</span>"+departmentsname
							+"</dd></div></dl></div>");
					var $div2=$("<dl><dt class='infor_left'><img style='width:112px;height:139px' src='data:image/png;base64,"+res[i].arrlist[0].visitorphoto+"'></dt><div class='infor_right'><dd><span class='alarm'>身份证号:</span>"+idcardno+"</dd>" +
							"<dd><span class='policeName'>人员姓名:</span>"+visitorsname+"</dd><dd><span>人员性别:</span>"+visitorssextext+"</dd></div></dl>")
					$div1.append($div2);
					$(".main-table").append($div1);
					if(applystatusname=="批准"){
						$div1.find(".approval_audited").css("color","green").css("font-weight","bold");
					}else if(applystatusname=="驳回"){
						$div1.find(".approval_audited").css("color","red").css("font-weight","bold");
					}
				}else if(res[i].visitorstype=="P"){
					var filldate=(res[i].arrlist[0].filldate==undefined)?"":res[i].arrlist[0].filldate;
					var receiverpeopleid=(res[i].arrlist[0].receiverpeopleid==undefined)?"":res[i].arrlist[0].receiverpeopleid;
					var receiversname=(res[i].arrlist[0].receiversname==undefined)?"":res[i].arrlist[0].receiversname;
					var departmentsname=(res[i].arrlist[0].departmentsname==undefined)?"":res[i].arrlist[0].departmentsname;
					var approvertypename=(res[i].arrlist[0].approvertypename==undefined)?"":res[i].arrlist[0].approvertypename;
					var visitorsreasontext=(res[i].arrlist[0].visitorsreasontext==undefined)?"":res[i].arrlist[0].visitorsreasontext;
					var id=(res[i].arrlist[0].id==undefined) ? "":res[i].arrlist[0].id;
					if(res[i].applystatus=="20"||res[i].applystatus=="30"){
						var applystatusname="批准";
					}else{
						var applystatusname="驳回";
					}
					//人员审批
					var $div1=$("<div class='approval_pending'><div class='approval_tit'><h4 class='approval_audited'>人员  | "+applystatusname+"</h4><p class='apply_time'>申请时间:<span>"+filldate+" | "+approvertypename+"</span><span>|  "+visitorsreasontext+"</span></p></div></div>");
					var $div5=$("<div class='scroll'></div>")
					var $div4=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].policephoto
							+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>警号:</span>"+receiverpeopleid
							+"</dd><dd><span class='policeName'>姓名:</span>"+receiversname
							+"</dd><dd><span class='job'>部门:</span>"+departmentsname+"</dd></div></dl>")
					$div5.append($div4);
					for(var j=0;j<res[i].arrlist.length;j++){
						var idcardno=(res[i].arrlist[j].idcardno==undefined)?"":res[i].arrlist[j].idcardno;
						var visitorsname=(res[i].arrlist[j].visitorsname==undefined)?"":res[i].arrlist[j].visitorsname;
						var visitorssextext=(res[i].arrlist[j].visitorssextext==undefined)?"":res[i].arrlist[j].visitorssextext;
						var $div2=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[j].visitorphoto
						+"' style='width:112px;height:139px'></dt><div class='infor_right'><dd><span class='alarm'>身份证号:</span>"+idcardno+"</dd>" +
						"<dd><span class='policeName'>人员姓名:</span>"+visitorsname+"</dd><dd><span>人员性别:</span>"+visitorssextext+"</dd></div></dl>");
						$div5.append($div2);
					}
					$div1.append($div5);
					$(".main-table").append($div1);
					if(applystatusname=="批准"){
						$div1.find(".approval_audited").css("color","green").css("font-weight","bold");
					}else if(applystatusname=="驳回"){
						$div1.find(".approval_audited").css("color","red").css("font-weight","bold");
					}
				}
			}
		}
	})
}


//点击批准
$(document).on("click",".tongYi",function(){
	var id=$(this).attr("data-id");
	console.log(id);
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/updateApplyStatusAgree",
		type:"POST",
		data:{"holderno":window.top.holderno,"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.flag){
				layer.msg("已批准!",{time:2000},function(){
					window.location.reload();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
})
//点击驳回
$(document).on("click",".boHui",function(){
	var id=$(this).attr("data-id");
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/updateApplyStatusNoAgree",
		type:"POST",
		data:{"holderno":window.top.holderno,"id":id},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.flag){
				layer.msg("已驳回!",{time:2000},function(){
					window.location.reload();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
})
//点击复选框
$(document).on("click",".checkbox",function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
	if($(".approval_pending span.curr").length==$(".approval_pending .checkbox").length){
		$("#selectAll").addClass("curr");
	}else{
		$("#selectAll").removeClass("curr");
	}
})

//点击全选
$("#selectAll").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
		$(".approval_pending .checkbox").removeClass("curr");
	}else{
		$(this).addClass("curr");
		$(".approval_pending .checkbox").addClass("curr");
	}
	
})



//点击确定提交数据
$("#insertDeptBtn").click(function(){
	//当前被选中的部门编号
	var deptno=$(".approval_dept li.current").attr("data-deptno");
	//当前被选中的审批人
	for(var i=0;i<$(".approval_person li.cur").length;i++){
		var holderno=$(".approval_person li.cur .holderno").eq(i).html();
	}
})
