var status=1;
$(function(){
	//启用开关初始化
	initSwitch();
	if(getQueryString("fid")!=null&&getQueryString("fid")!=undefined){
		initEditInfo(getQueryString("fid"));
	}
})
//点击确定，提交信息
$("#btnSure").click(function(){
	saveInfo();
})
//switch按钮初始化
function initSwitch(){
	layui.use('form', function(){
		 var form = layui.form; 
		 form.render('checkbox');
		 form.on('switch(formDemo)', function(data){
			 status=(data.elem.checked)?'1':'0';
		 });
	})
}
//保存设备信息
function saveInfo(){
	var platFormCode=$("#platFormCode").val();//平台编码
	var platFormName=$("#platFormName").val();//平台名称
	var platFormManufacture=$("#platFormManufacture").val();//平台厂家
	var baseUrl=$("#baseUrl").val();//平台地址
	var appKey=$("#appKey").val();//appkey
	var appId=$("#appId").val();//appid
	var appSecret=$("#appSecret").val();//appsecret
	var userName=$("#userName").val();//用户名
	var password=$("#password").val();//密码
	var fid=$("#fid").val();
	if(platFormCode==""){
		layer.msg("请填写平台编码!",{time:2000});
		return;
	}
	if(platFormName==""){
		layer.msg("请填写平台名称!",{time:2000});
		return;
	}
	if(platFormManufacture==""){
		layer.msg("请填写平台厂家!",{time:2000});
		return;
	}
	if(baseUrl==""){
		layer.msg("请填写平台地址!",{time:2000});
		return;
	}
	var reg=/^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/;
	if(!reg.test(baseUrl)){
		layer.msg("请输入IP地址或者域名!",{time:2000});
		return;
	}
	
	var obj={"platFormCode":platFormCode,"platFormName":platFormName,"platFormManufacture":platFormManufacture,
			"baseUrl":baseUrl,"appKey":appKey,"appId":appId,"appSecret":appSecret,"userName":userName,"password":password,
			"status":status,"fid":fid,"operator":window.top.holderno};
	console.log(obj);
	$.ajax({
		url:url+'/devicePlatform/saveInfo',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:2000},function(){
					window.location.href = 'platformManager.html';
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		},
		error:function(data){
		}
	})
}
//编辑参数赋值
function initEditInfo(fid){
	$(".main-tab .label a").html("修改平台");
	$.ajax({
		url:url+'/devicePlatform/getOne?fid='+fid,
		dataType:'json',//数据类型
		type:'POST',//类型
		success:function(data){
			console.log(data);
			$("#platFormCode").val(data.result.platFormCode);
			$("#platFormName").val(data.result.platFormName);
			$("#platFormManufacture").val(data.result.platFormManufacture);
			$("#baseUrl").val(data.result.baseUrl);
			$("#appKey").val(data.result.appKey);
			$("#appId").val(data.result.appId);
			$("#appSecret").val(data.result.appSecret);
			$("#userName").val(data.result.userName);
			$("#password").val(data.result.password);
			$("#fid").val(data.result.fid);
			status=data.result.status;
			//切换按钮赋值
			if(data.result.status=="0"){
				$("#status").attr("checked",false);
				layui.use('form', function(){
					 var form = layui.form;
					 form.render('checkbox');
				})
			}
		},
		error:function(data){
			
		}
	})
}
//获取页面跳转参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
       return decodeURI(r[2]);
    }else{
       return null;
    } 
}
