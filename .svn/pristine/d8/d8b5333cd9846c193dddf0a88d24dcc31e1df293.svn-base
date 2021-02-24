$(function(){
	if(getUrlParam("fid")!=undefined){
		$(".main-tab .label a").html("修改终端");
		getOneAppDevice();
	}
})
//点击确定提交数据
$("#insertPrisonAppDevice").click(function(){
	addAppDevice();
})
function addAppDevice(){
	var deviceAppName=$("#deviceAppName").val();//终端名称
	var deviceAppSn=$("#deviceAppSn").val();//终端SN
	var deviceAppIp=$("#deviceAppIp").val();//终端IP
	var deviceAppPort=$("#deviceAppPort").val();//终端端口
	if(deviceAppName==""){
		layer.msg("请输入终端名称!",{time:2000});
		return;
	}
	if(deviceAppSn==""){
		layer.msg("请输入终端SN!",{time:2000});
		return;
	}
	if(deviceAppIp==""){
		layer.msg("请输入终端IP!",{time:2000});
		return;
	}
	if(deviceAppPort==""){
		layer.msg("请输入终端端口!",{time:2000});
		return;
	}
	var obj={"fid":getUrlParam("fid"),"deviceAppName":deviceAppName,"deviceAppSn":deviceAppSn,"deviceAppIp":deviceAppIp,"deviceAppPort":deviceAppPort};
	$.ajax({
		url:url+"/prisonAppDevice/addAppDevice",
		type:"post",
		data:obj,
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					window.location.href="prisonAppDevice.html";
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//获取一条监区信息
function getOneAppDevice(){
	$.ajax({
		url:url+"/prisonAppDevice/getOneAppDevice",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		success:function(data){
			console.log(data);
			if(data.flag){
				var deviceAppName=data.result.deviceAppName==undefined?"":data.result.deviceAppName;
				var deviceAppSn=data.result.deviceAppSn==undefined?"":data.result.deviceAppSn;
				var deviceAppIp=data.result.deviceAppIp==undefined?"":data.result.deviceAppIp;
				var deviceAppPort=data.result.deviceAppPort==undefined?"":data.result.deviceAppPort;
				
				$("#deviceAppName").val(deviceAppName);
				$("#deviceAppSn").val(deviceAppSn);
				$("#deviceAppIp").val(deviceAppIp);
				$("#deviceAppPort").val(deviceAppPort);
				if(status=="0"){//禁用
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