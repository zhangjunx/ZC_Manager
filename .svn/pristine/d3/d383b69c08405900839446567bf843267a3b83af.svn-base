var DeviceNO = getQueryString("DeviceNO");
$(function(){
	watchInfo();
})

//设备类型combo
//查看详情
function watchInfo(){
	$.ajax({
		url:url+'/deviceUnit2/getOneDeviceInfo?DeviceNo='+DeviceNO,
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			console.log(data);
			$("#DeviceCode").html(data.result.DeviceCode);
			$("#DeviceTypeCodeName").html(data.result.DeviceTypeCodeName);
			$("#ManufacturerCodeName").html(data.result.ManufacturerCodeName);
			$("#ControlTypeName").html(data.result.ControlTypeName);
			$("#DeviceName").html(data.result.DeviceName);
			$("#AreaIdName").html(data.result.AreaIDName);
			$("#IP").html(data.result.IP);
			$("#Port").html(data.result.Port);
			$("#DeviceID").html(data.result.DeviceID);
			$("#InstallLocation").html(data.result.InstallLocation);
			$("#ControlSN").html(data.result.ControlSN);
			$("#UserName").html(data.result.UserName);
			$("#PassWord").html(data.result.PassWord);
			//切换按钮赋值
			if(data.result.DeviceEnabled=="0"){
				$("#DeviceEnabled").attr("checked",false);
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
