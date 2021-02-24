var h_status=1;

//操作类型，1：编辑
var opttype = getQueryString("opttype");
var DeviceNO = getQueryString("DeviceNO");
$(function(){
	//设备类型combo
	initDeviceTypeCombo();
	
	//初始化设备厂家下拉框
	var DeviceTypeCode = $("#DeviceTypeCode").val();
	initFactoryCombo(DeviceTypeCode);
	
	//设备型号初始化
	var DataNo = $("#ManufacturerCode").val();
	initDeviceModel(DataNo);
	
	//设备ID初始化
	initDeviceID();
	
	//初始化区域下拉树
	initSelectTree();
	
	//启用开关初始化
	initSwitch();
	
	if($("#DeviceTypeCode").val() == '20'){
		document.getElementById("DeviceParmDiv").style.display="";
	}
	
	//编辑时渲染数据
	if(DeviceNO != null && DeviceNO != '' && DeviceNO != undefined){
		initEditInfo(DeviceNO);
	}
})

//设备类型combo
function initDeviceTypeCombo(){
	$.ajax({
		url:url+'/deviceUnit2/getDeviceTypeList',
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			$("#DeviceTypeCode").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].Code+'">'+data.result[i].TypeName+'</option>';
			}
			$("#DeviceTypeCode").append(html);
		},
		error:function(data){
			
		}
	})
}

//初始化设备厂家下拉框
function initFactoryCombo(DeviceTypeCode){
	$.ajax({
		url:url+'/deviceUnit2/getDeviceFactoryList?DeviceTypeCode='+DeviceTypeCode,
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			$("#ManufacturerCode").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].DataNo+'">'+data.result[i].Name+'</option>';
			}
			$("#ManufacturerCode").append(html);
		},
		error:function(data){
			
		}
	})
}

//设备型号下拉框
function initDeviceModel(DataNo){
	$.ajax({
		url:url+'/deviceUnit2/getDeviceModelList?DataNo='+DataNo,
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			$("#ControlType").empty();
			var html = '';
			for(var i=0;i<data.result.length;i++){
				html = html+'<option value="'+data.result[i].Code+'">'+data.result[i].Name+'</option>';
			}
			$("#ControlType").append(html);
		},
		error:function(data){
			
		}
	})
}

//区域下拉树初始化
function initSelectTree(){
	$.ajax({
		url:url+'/deviceUnit2/getAreaTree',
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
			    var $ = layui.jquery, tree = layui.tree;
			    tree.render({
			        elem: "#classtree",
			        data: data.result,
			        onlyIconControl:true,
			        click: function (node) {
			        	$("#AreaID").val(node.data.id);
			        	$("#AreaIDName").html(node.data.title);
			            var $select = $($(this)[0].elem).parents(".layui-form-select");
			            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='AreaID']").val(node.id);
			        }
			    
			    });
			    $(".downpanel").on("click", ".layui-select-title", function (e) {
			        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
			        $(this).parents(".downpanel").toggleClass("layui-form-selected");
			        layui.stope(e);
			    }).on("click", "dl i", function (e) {
			        layui.stope(e);
			    });
			    $(document).on("click", function (e) {
			        $(".layui-form-select").removeClass("layui-form-selected");
			    });
			});
		
		},
		error:function(data){}
	})
}

//设备ID初始化
function initDeviceID(){
	$("#DeviceID").empty();
	var html = '';
	for(var i=1;i<=99;i++){
		html = html+'<option value="'+i+'">'+i+'</option>';
	}
	$("#DeviceID").append(html);
}

//switch按钮初始化
function initSwitch(){
	layui.use('form', function(){
		 var form = layui.form; 
		 form.render('checkbox');
		 
		 form.on('switch(formDemo)', function(data){
			 if(opttype == 2){
				 data.elem.checked = !data.elem.checked;
				 return;
			 }
			 h_status=(data.elem.checked)?'1':'0';
		 });
	})
}

//设备类型选择
$("#DeviceTypeCode").change(function(){
	//人脸机室，显示参数控制按钮
	if($("#DeviceTypeCode").val() == '20'){
		document.getElementById("DeviceParmDiv").style.display="";
	}else{
		document.getElementById("DeviceParmDiv").style.display="none";
	}
	
	var DeviceTypeCode = $("#DeviceTypeCode").val();
	initFactoryCombo(DeviceTypeCode);
	
	var ManufacturerCode = $("#ManufacturerCode").val();
	initDeviceModel(ManufacturerCode);
});
//设备型号选择
$("#ManufacturerCode").change(function(){
	var ManufacturerCode = $("#ManufacturerCode").val();
	initDeviceModel(ManufacturerCode);
});



//保存设备信息
function saveInfo(){
	var DeviceCode=$("#DeviceCode").val();
	var DeviceTypeCode=$("#DeviceTypeCode").val();
	var ManufacturerCode=$("#ManufacturerCode").val();
	var ControlType=$("#ControlType").val();
	var DeviceName=$("#DeviceName").val();
	var AreaID=$("#AreaID").val();
	var IP=$("#IP").val();
	var Port=$("#Port").val();
	var DeviceID=$("#DeviceID").val();
	var InstallLocation=$("#InstallLocation").val();
	var ControlSN=$("#ControlSN").val();
	var UserName=$("#UserName").val();
	var PassWord=$("#PassWord").val();
	
	//设备其它参数
	var oneOne=$("#oneOne").val();
	var oneN=$("#oneN").val();
	var livenessSwitch = $("#livenessSwitch").val();
	var flashMode = $("#flashMode").val();
	var standyInterval = $("#standyInterval").val();
	var openDoor = $("#openDoor").val();
	var relayAddr = $("#relayAddr").val();
	var weigand = $("#weigand").val();
	var openInterval = $("#openInterval").val();
	var autoReboot = $("#autoReboot").val();
	var rebootInterval = $("#rebootInterval").val();
	var rebootTime = $("#rebootTime").val();
	var upAvatar = $("#upAvatar").val();
	var upBgFlag = $("#upBgFlag").val();
	var inOut = $("#inOut").val();
	var requestInterval = $("#requestInterval").val();
	var adminPassWord = $("#adminPassWord").val();
	var readCarInterval = $("#readCarInterval").val();

	if(DeviceCode.length=="0"){
		layer.msg("设备编号不能为空!",{time:2000});
		return;
	}
	if(DeviceName.length=="0"){
		layer.msg("设备名称不能为空!",{time:2000});
		return;
	}
	if(AreaID.length=="0"){
		layer.msg("所属区域不能为空!",{time:2000});
		return;
	}
	if(IP.length=="0"){
		layer.msg("设备IP不能为空!",{time:2000});
		return;
	}
	
	if(InstallLocation.length=="0"){
		layer.msg("安装位置不能为空!",{time:2000});
		return;
	}
	var obj={"DeviceCode":DeviceCode,
			 "DeviceTypeCode":DeviceTypeCode,
			 "ManufacturerCode":ManufacturerCode,
			 "ControlType":ControlType,
			 "DeviceName":DeviceName,
			 "AreaID":AreaID,
			 "IP":IP,
			 "Port":Port,
			 "DeviceID":DeviceID,
			 "InstallLocation":InstallLocation,
			 "ControlSN":ControlSN,
			 "UserName":UserName,
			 "PassWord":PassWord,
			 "DeviceEnabled":h_status,
			 "DeviceNO":DeviceNO,
			 
			 "oneOne":oneOne,
			 "oneN":oneN,
			 "livenessSwitch":livenessSwitch,
			 "flashMode":flashMode,
			 "standyInterval":standyInterval,
			 "openDoor":openDoor,
			 "relayAddr":relayAddr,
			 "weigand":weigand,
			 "openInterval":openInterval,
			 "autoReboot":autoReboot,
			 "rebootInterval":rebootInterval,
			 "rebootTime":rebootTime,
			 "upAvatar":upAvatar,
			 "upBgFlag":upBgFlag,
			 "inOut":inOut,
			 "requestInterval":requestInterval,
			 "adminPassWord":adminPassWord,
			 "readCarInterval":readCarInterval
	}
	$.ajax({
		url:url+'/deviceUnit2/saveDeviceInfo',
		dataType:'json',//数据类型
		type:'POST',//类型
		data:obj,
		success:function(data){
			if(data.flag){
				layer.msg(data.reason,{time:2000},function(){
					window.location.href = 'device_list.html';
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
function initEditInfo(DeviceNo){
	$(".main-tab .label a").html("修改设备");
	$.ajax({
		url:url+'/deviceUnit2/getOneDeviceInfo?DeviceNo='+DeviceNo,
		dataType:'json',//数据类型
		type:'POST',//类型
		async:false,
		success:function(data){
			console.log(data);
			if(data.result.DeviceTypeCode == '20'){
				document.getElementById("DeviceParmDiv").style.display="";
			}
			$("#DeviceCode").val(data.result.DeviceCode);
			
			$("#DeviceTypeCode").val(data.result.DeviceTypeCode);
			//初始化设备厂家下拉框
			var DeviceTypeCode = $("#DeviceTypeCode").val();
			initFactoryCombo(DeviceTypeCode);
			
			$("#ManufacturerCode").val(data.result.DataNo);
			//设备型号初始化
			var DataNo = $("#ManufacturerCode").val();
			initDeviceModel(DataNo);
			
			$("#ControlType").val(data.result.ControlType);
			$("#DeviceName").val(data.result.DeviceName);
			$("#AreaID").val(data.result.AreaID);
			$("#AreaIDName").html(data.result.AreaIDName);
			$("#IP").val(data.result.IP);
			$("#Port").val(data.result.Port);
			$("#DeviceID").val(data.result.DeviceID);
			$("#InstallLocation").val(data.result.InstallLocation);
			$("#ControlSN").val(data.result.ControlSN);
			$("#UserName").val(data.result.UserName);
			$("#PassWord").val(data.result.PassWord);
			
			$("#oneOne").val(data.result.oneOne);
			$("#oneN").val(data.result.oneN);
			$("#livenessSwitch").val(data.result.livenessSwitch);
			$("#flashMode").val(data.result.flashMode);
			$("#standyInterval").val(data.result.standyInterval);
			$("#openDoor").val(data.result.openDoor);
			$("#relayAddr").val(data.result.relayAddr);
			$("#weigand").val(data.result.weigand);
			$("#openInterval").val(data.result.openInterval);
			$("#autoReboot").val(data.result.autoReboot);
			$("#rebootInterval").val(data.result.rebootInterval);
			$("#rebootTime").val(data.result.rebootTime);
			$("#upAvatar").val(data.result.upAvatar);
			$("#upBgFlag").val(data.result.upBgFlag);
			$("#inOut").val(data.result.inOut);
			$("#requestInterval").val(data.result.requestInterval);
			$("#adminPassWord").val(data.result.adminPassWord);
			$("#readCarInterval").val(data.result.readCarInterval);
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

//打开弹窗
$(document).on("click","#openwin",function(){
	$("#DeviceParm").fadeIn(500);
	$("#DeviceParm1").fadeIn(500);
})

//点击弹出框的叉
$("#quxiao").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})
//点击弹出框的取消
$("#bottom_qx").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})

//点击弹出框的确认
$("#sureBtn").click(function(){
	$(".vehicleInfo_shadow").fadeOut(500);
	$(".vehicleInfo").fadeOut(500);
})