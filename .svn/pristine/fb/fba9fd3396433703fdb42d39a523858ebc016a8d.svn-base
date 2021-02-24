var sta=1;
$(function(){
	initSwitch();
	if(getUrlParam("fid")!=undefined){
		$(".main-tab .label a").html("修改区域");
		getOnePrisonArea();
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
	addPrisonArea();
})
function addPrisonArea(){
	var areaName=$("#areaName").val();//区域名称
	var areaSize=$("#areaSize").val();//区域大小
	var personSize=$("#personSize").val();//容纳人数
	if(areaName==""){
		layer.msg("请输入区域名称!",{time:2000});
		return;
	}
	if(areaSize==""){
		layer.msg("请输入区域大小!",{time:2000});
		return;
	}
	if(personSize==""){
		layer.msg("请输入容纳人数!",{time:2000});
		return;
	}
	var obj={"status":sta,"fid":getUrlParam("fid"),"areaName":areaName,"areaSize":areaSize,"personSize":personSize,"operator":window.top.holderno};
	$.ajax({
		url:url+"/prisonArea/addPrisonArea",
		type:"post",
		data:obj,
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					window.location.href="zoneManagement.html";
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//获取一条监区信息
function getOnePrisonArea(){
	$.ajax({
		url:url+"/prisonArea/getOnePrisonArea",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		success:function(data){
			console.log(data);
			if(data.flag){
				var areaName=data.result.areaName==undefined?"":data.result.areaName;
				var areaSize=data.result.areaSize==undefined?"":data.result.areaSize;
				var personSize=data.result.personSize==undefined?"":data.result.personSize;
				var status=data.result.status;
				sta=status;
				$("#areaName").val(areaName);
				$("#areaSize").val(areaSize);
				$("#personSize").val(personSize);
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