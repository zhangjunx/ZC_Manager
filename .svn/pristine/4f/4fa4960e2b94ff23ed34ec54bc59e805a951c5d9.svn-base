var sta=1;
$(function(){
	initSwitch();
	if(getUrlParam("fid")!=undefined){
		$(".main-tab .label a").html("修改监区");
		getOnePrisonInfo();
	}
	
})
//switch按钮初始化
function initSwitch(){
	layui.use('form', function(){
		 var form = layui.form; 
		 form.render('checkbox');
		 form.on('switch(formDemo)', function(data){
			 sta=(data.elem.checked)?'1':'2';
		 });
	})
}
//点击确定提交数据
$("#insertPrisonArea").click(function(){
	addPrisonInfo();
})
function addPrisonInfo(){
	var prisonName=$("#prisonName").val();//监区名称
	var localtion=$("#location").val();//监区位置
	var leader=$("#leader").val();//负责人
	if(prisonName==""){
		layer.msg("请输入监区名称!",{time:2000});
		return;
	}
	if(localtion==""){
		layer.msg("请输入监区位置!",{time:2000});
		return;
	}
	if(leader==""){
		layer.msg("请输入负责人!",{time:2000});
		return;
	}
	var obj={"fid":getUrlParam("fid"),"prisonName":prisonName,"localtion":localtion,"leader":leader,"status":sta,"operator":window.top.holderno};
	console.log(obj);
	$.ajax({
		url:url+"/prison/addPrisonInfo",
		type:"post",
		data:obj,
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					window.location.href="prisonAreaManagement.html";
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//获取一条监区信息
function getOnePrisonInfo(){
	$.ajax({
		url:url+"/prison/getOnePrisonInfo",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		success:function(data){
			console.log(data);
			if(data.flag){
				var prisonName=data.result.prisonName==undefined?"":data.result.prisonName;
				var localtion=data.result.localtion==undefined?"":data.result.localtion;
				var leader=data.result.leader==undefined?"":data.result.leader;
				var status=data.result.status;
				sta=status;
				$("#prisonName").val(prisonName);
				$("#location").val(localtion);
				$("#leader").val(leader);
				if(status=="2"){//禁用
					$("#prisonAreaEnabled").attr("checked",false);
					layui.use('form', function(){
						 var form = layui.form; 
						 form.render('checkbox');
					})
				}
			}
		}
	})
}
//url地址解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}