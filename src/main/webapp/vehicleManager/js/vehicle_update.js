$(function(){
	openReader();
	//通过id查询要修改的数据
	selectVehicleById();
	
	//日期
	layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  //常规用法
		  lay('.dateYx').each(function() {
				laydate.render({
					elem: this,
					trigger: 'click'
				});
			});
	})

var socket;
function openReader() {
	var host = "ws://localhost:33666";
	if(socket == null){
		socket = new WebSocket(host);
	}else{
		console.log("已初始化.");
	}
	try {
		socket.onopen = function () {
			console.log("初始化成功.");
			//getVersion(); 
		};
		socket.onclose = function () {
			console.log("读卡服务已经断开.");
		};
		socket.onerror = function(){
			console.log("请检查控件是否正常安装.");
		};
		socket.onmessage = function (msg) {
			if (typeof msg.data == "string") {
				var msgM=msg.data+"";
				var msgJson = JSON.parse(msgM);
				//resultMsg(msgM);        
				switch(msgJson.fun) {

					case "EST_GetVersion#":
						layer.msg("版本号："+msgJson.errMsg,{time:2000})
					break;
						
					case "EST_Reader_ReadIDCard#":
						if (msgJson.rCode == "0") {
							console.log(msgJson)
							document.getElementById("idcode1").value = msgJson.certNo; //身份证号码      
							posBeep();
							//ReadCertID()
						}
						else if(msgJson.rCode == "-2"){
							layer.msg("请放身份证",{time:2000})
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000});
						}
						break;

					case "EST_ReadCertID#":
						if (msgJson.rCode == "0") {
							document.getElementById("holdercard").value = msgJson.UID;  
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000})
						}
					break;
					
					case "EST_ReadBankCard#":
						if (msgJson.rCode == "0") {
							document.getElementById("text_Bank_ID").value = msgJson.bankCard;
							posBeep();
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000});
						}
						break;

					case "EST_ReadM1Card#":
						if (msgJson.rCode == "0") {
							console.log(msgJson)
							document.getElementById("holdercard1").value = msgJson.UID; //IC卡卡号
							
							posBeep();
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000});
						}
						break;

					case "EST_ReadSocialCard#":   //社保卡信息，个别地区社保卡不按国家规范来的，会读取信息不全
						if (msgJson.rCode == "0") { 
							document.getElementById("S_text_name").value = msgJson.XM;  //社保卡姓名  
							document.getElementById("S_text_sex").value = msgJson.XB;  //社保卡性别             
							document.getElementById("S_text_nation").value = msgJson.MZ;  //社保卡民族                      
							document.getElementById("S_text_birthday").value = msgJson.CSRQ; //社保卡出生日期                  
							document.getElementById("S_text_idNum").value = msgJson.SHBZHM; //社保卡身份证号      
							document.getElementById("S_text_effDate").value = msgJson.FKRQ; //社保卡有效期开始
							document.getElementById("S_text_expDate").value = msgJson.KYXQ; //社保卡有效期结束
							document.getElementById("S_text_kahao").value = msgJson.SBKH; //社保卡卡号
							posBeep();
						}
						else {
							layer.msg(msgJson.errMsg,{time:2000});
						}
						break;

					case "EST_IDRequest#":
							if (msgJson.rCode == "0") {
								layer.msg("找到身份证",{time:2000})
							}
							else {
								layer.msg(msgJson.errMsg,{time:2000});
							}
					break;

					default:
						break;
				}
			}
			else{
				layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
			}
		};
	}
	catch (ex) {
		layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
	}
}

//读取IC卡号，包括M1、CPU卡，8位16进制数据
function readM1Card() {
	try { 
		if (socket.readyState == 1) {
			socket.send("EST_ReadM1Card#");  
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
	}
	catch (ex) {
		layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
	}
}


//读取身份证物理ID，16位8进制数据，一般情况用不到，可以注释掉
function ReadCertID() {
	try { 
		if (socket.readyState == 1) {
			socket.send("EST_ReadCertID#"); 
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
	}
	catch (ex) {
		layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
	}
}



//蜂鸣器控制，可以自己选择是否蜂鸣
function posBeep() {
	if (socket.readyState == 1) {
			socket.send("EST_PosBeep#");
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
}


//读取身份证信息
function readIDCard() {
	try {
		if (socket.readyState == 1) {
			socket.send("EST_Reader_ReadIDCard#");    
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
	}
	catch (ex) {
		layer.msg("连接异常,请检查是否成功安装控件.",{time:2000});
	}
}

		  
	//点击车主信息选择
	$(".choose").click(function(){
		$(".vehicleInfo_shadow").fadeIn(500);
		$(".vehicleInfo").fadeIn(500);
		$(".vehicle_top_query").val("");
		$(".door_center ul").empty();
		
	})
	//点击弹窗叉
	$(".quxiao").click(function(){
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".vehicleInfo").fadeOut(500);
	})
	//点击弹窗确定
	$(".bottom_sure").click(function(){
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".vehicleInfo").fadeOut(500);
	})
	//点击弹窗取消
	$(".bottom_qx").click(function(){
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".vehicleInfo").fadeOut(500);
	})
	//点击弹窗中的人员盒子
	$(document).on("click",".door_center li",function(){
		$(this).addClass("current").siblings().removeClass("current");
	})
	
	//点击允许用于个人考勤记录复选框
	$(".personRecord").click(function(){
		if($(this).hasClass("curr")){
			$(this).removeClass("curr");
		}else{
			$(this).addClass("curr");
		}
	})
	
	
	//点击省会简称
	$(".province").click(function(){
		$(".vehicleInfo_shadow").fadeIn(500);
		$(".provinceJc").fadeIn(500);
	})
	//点击背景隐藏弹窗
	$(".vehicleInfo_shadow").click(function(){
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".provinceJc").fadeOut(500);
	})
	//点击省会弹窗简称赋值给文本框
	$(".provinceJc ul li").click(function(){
		$(".province").html($(this).html());
		$(".vehicleInfo_shadow").fadeOut(500);
		$(".provinceJc").fadeOut(500);
	})
		
	
	//车牌号验证
	$("#vehicleNumber").blur(function(){
		var reg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
		var numStr=$("#vehicleNumber").val();
		var JC=$(".province").html();
		var carNumber=JC+numStr;
		if(!reg.test(carNumber)&&numStr!=""){
			layer.msg("车牌输入错误！");
		}
	})
	
	//点击搜索
	$("#queryHolderInfo").click(function(){
		var vehicleuse=$(".vehicle_top_query").val();
		console.log(vehicleuse)
		$.ajax({
			url:url+'/LPR_Vehicle/queryVehicleBy',
			type:"post",
			data:{"can":vehicleuse},
			success:function(data){
				console.log(data);
				$(".door_center ul").empty();
				if(data.flag){
					var res=data.result;
					res.forEach(item=>{
						var $li=$("<li data-holderno='"+item.HolderNo+"' data-holdername='"+item.HolderName+"' data-dept='"+item.DepartmentName+"' data-deptno='"+item.DepartmentNo+"'></li>");
						var $div=$("<div class='personPhoto'><img src='img/person.png'></div>");
						var $div2=$("<div class='holderInfo'><p>姓名:<span>"+item.HolderName+"</span></p><p>工号:<span>"+item.HolderNo+"</span></p><p>部门:<span>"+item.DepartmentName+"</span></p></div>")
						$li.append($div);
						$li.append($div2);
						$(".door_center ul").append($li);
					})
					
				
				}else{
					layer.msg(data.reason,{time:2000});
				}
			}
		})
	})
	//点击搜索弹出框的确定
	$(".bottom_sure").click(function(){
		var holderno=$(".door_center li.current").attr("data-holderno");
		var holdername=$(".door_center li.current").attr("data-holdername");
		var dept=$(".door_center li.current").attr("data-dept");
		var deptno=$(".door_center li.current").attr("data-deptno");
		$("#vehicleName").val(holdername);
		$("#vehicleName").attr("data-holderno",holderno);
		$("#dept").val(dept);
		$("#dept").attr("data-deptno",deptno);
	})
	
	//点击确定提交数据到后台 更新车辆信息
	$("#updateVehicle").click(function(){
		var carOwner=$("#vehicleName").val();
		var dept=$("#dept").val();
		var carType=$(".vehicleType").val();
		var carNumber=$(".province").html()+$("#vehicleNumber").val();
		var carCard=$("#carCard").val();
		var carNumberType=$(".carType").val();
		var startTime=$("#startTime").val();
		var endTime=$("#endTime").val();
		var carColor=$(".carColor").val();
		var vehicleBrand=$("#vehicleBrand").val();
		
		/*var form_data=new FormData();
		form_data.append("vehiclephoto",$("#carPhoto")[0].files[0]);
		var obj={"vehicletype":carType,"strplateid":carNumber,"lprtype":carNumberType,"startdate":startTime,"enddate":endTime,"vehiclecolor":carColor,"vehiclebrand":vehicleBrand};
		form_data.append("obj",JSON.stringify(obj));
		console.log(form_data.get("obj"));
		console.log(form_data.get("vehiclephoto"));
		console.log(obj)*/
		if(carOwner==""){
			layer.msg("请选择车主!",{time:2000});
			return;
		}
		if(dept==""){
			layer.msg("请选择车主!",{time:2000});
			return;
		}
		if(carType==""){
			layer.msg("请选择车辆类型!",{time:2000});
			return;
		}
		var carNumber=$(".province").html()+$("#vehicleNumber").val();
		var reg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
		if($("#vehicleNumber").val()==""){
			layer.msg("请输入车牌号!",{time:2000});
			return;
		}
		if(!reg.test(carNumber)){
			layer.msg("车牌号输入错误！",{time:2000});
			return;
		}
		
		if(carCard==""){
			layer.msg("请输入车卡内码!",{time:2000});
			return;
		}
		if(carNumberType==""){
			layer.msg("请选择车牌类型!",{time:2000});
			return;
		}
		if(startTime==""||endTime==""){
			layer.msg("请输入车牌有效期!",{time:2000});
			return;
		}
		if(carColor==""){
			layer.msg("请选择车身颜色!",{time:2000});
			return;
		}
		if(vehicleBrand==""){
			layer.msg("请输入车辆品牌!",{time:2000});
			return;
		}
		var holderno=$("#vehicleName").attr("data-holderno");
		var deptno=$("#dept").attr("data-deptno");
		var file = document.getElementById("carPhoto").files[0];
		var formData = new FormData($("#fm1")[0]);
		//console.log("file=="+file)
		/*if(file==undefined){
			var src=$(".vehicleZP").attr("src");
			formData.append('carPhoto',src);
		}else{
			formData.append('carPhoto',file);
		}*/
		formData.append('carPhoto',file);
	    formData.append('strplateid',carNumber);
	    formData.append('holderno',holderno);
	    formData.append('useunitno',deptno);
	    formData.append('id',localStorage.id);
		$.ajax({
			url:url+"/LPR_Vehicle/updateVehicle",
			type:"POST",
			data:formData,
			async:false,
			cache:false,
			contentType:false,
			processData:false,
			success:function(data){
				//console.log(data);
				if(data.flag){
					layer.msg("修改成功!",{time:2000},function(){
						window.location.href="vehicle_info.html";
					})
					
				}
			}
		})
	})
	
	//选择照片
	$("#carPhoto").change(function() {
	var imgUrl = getObjectURL(this.files[0]);
	$("#img").attr("src", imgUrl);
	});

function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) {
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}//end

//
//查询修改页面数据
function selectVehicleById(){
	$.ajax({
		url:url+"/LPR_Vehicle/selectVehicleById",
		type:"POST",
		data:{"id":localStorage.id},
		dataType:"json",
		//traditional:true,
		success:function(data){
			//console.log(data)
			if(data.flag){
				var res=data.result;
				$("#vehicleName").val(res.vehicleuse);
				$("#vehicleName").attr("data-holderno",res.holderno);
				$("#dept").val(res.userunit);
				$("#dept").attr("data-deptno",res.useunitno);
				$(".vehicleType").val(res.vehicletype);
				strplateid=res.strplateid.substring(0,1);
				str=res.strplateid.substr(1);
				$("#vehicleNumber").val(str);
				$(".province").html(strplateid);
				$("#carCard").val(res.strcode);
				$(".carType").val(res.lprtype);
				$("#startTime").val(res.startdate);
				$("#endTime").val(res.enddate);
				$(".carColor").val(res.vehiclecolor);
				$("#vehicleBrand").val(res.vehiclebrand);
				$(".vehicleZP").attr("src","data:image/png;base64,"+res.vehiclephoto)
				
			}
		}
	})	
}

	
})