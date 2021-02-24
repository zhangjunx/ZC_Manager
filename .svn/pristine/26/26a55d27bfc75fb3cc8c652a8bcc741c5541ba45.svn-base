$(function() {
	//console.log(localStorage.titleno)
})//end
//修改前获取值
$("#titleno2").val(localStorage.titleno).css("background","#f2f2f2");
$("#titlename2").val(localStorage.titlename);
$("#sal2").val(localStorage.sal);
$("#comm2").val(localStorage.comm);
$("#remark2").val(localStorage.remark);


//编辑页面薪资的失焦事件
$("#sal2").blur(function(){
	var reg = new RegExp("^[0-9]*$");
	var sal=$("#sal2").val();
	if(!reg.test(sal)){
		$("#sal2").focus();
		$(".sal_reg").show();
		return;
	}else{
		$(".sal_reg").hide();
	}
})

//修改页面奖金的失焦事件
$("#comm2").blur(function(){
	var reg = new RegExp("^[0-9]*$");
	var comm=$("#comm2").val();
	if(comm.length!=0){
		if(!reg.test(comm)){
			$("#comm2").focus();
			$(".comm_reg").show();
			return;
		}else{
			$(".comm_reg").hide();
		}
	}else{
		$(".comm_reg").hide();
	}
})
//修改
$("#updataTitleDataBtn").click(function(){
	updateTitleData();
})//end
function updateTitleData(){//修改
	//var titleno=localStorage.titleno;
	var titleno=$("#titleno2").val();
	var titlename=$("#titlename2").val();
	var sal=$("#sal2").val();
	var comm=$("#comm2").val();
	var remark=$("#remark2").val();
	var obj={"titleno":titleno,"titlename":titlename,"sal":sal,"comm":comm,"remark":remark};
	
	$.ajax({
		url:url+"/TitleData/updateTitleData",
		type:"POST",
		data:obj,
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	})
}//end

//新增页面薪资的失焦事件
$("#sal").blur(function(){
	var reg = new RegExp("^[0-9]*$");
	var sal=$("#sal").val();
	if(!reg.test(sal)){
		$("#sal").focus();
		$(".sal_reg").show();
		return;
	}else{
		$(".sal_reg").hide();
	}
})
//新增页面奖金的失焦事件
$("#comm").blur(function(){
	var reg = new RegExp("^[0-9]*$");
	var comm=$("#comm").val();
	if(comm.length!=0){
		if(!reg.test(comm)){
			$("#comm").focus();
			$(".comm_reg").show();
			return;
		}else{
			$(".comm_reg").hide();
		}
	}else{
		$(".comm_reg").hide();
	}
})


//新增
$("#insertDeptBtn").click(function(){
	insertTitleData();
})//end
function insertTitleData(){//添加角色
	var titleno=$("#titleno").val();
	var titlename=$("#titlename").val();
	var sal=$("#sal").val();
	var comm=$("#comm").val();
	var remark=$("#remark").val();
	var html={"titleno":titleno,"titlename":titlename,"sal":sal,"comm":comm,"remark":remark};
	if(titleno.length==0 || titlename.length==0 || sal.length==0){
		layer.msg("带*号的不能为空！",{time:2000})
		return;
	}
	var reg = new RegExp("^[0-9]*$");
	if(!reg.test(sal)){
		$("#sal").focus();
		$(".sal_reg").show();
		return;
	}else{
		$(".sal_reg").hide();
	}
	if(comm.length!=0){
		if(!reg.test(comm)){
			$("#comm").focus();
			$(".comm_reg").show();
			return;
		}else{
			$(".comm_reg").hide();
		}
	}
	
	$.ajax({
		url:url+"/TitleData/insertTitleData",
		type:"POST",
		data:html,
		dataType:"json",
		success:function(data){
			layer.msg(data.reason,{time:2000});
		}
	})
}//end