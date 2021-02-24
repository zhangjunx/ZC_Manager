$(function(){
	openReader();
	//获取当前时间
	var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    $("#expiredate").val(currentdate);
    
//工号输入框失焦事件
$("#holderno").blur(function(){
	var reg3=/^[0-9a-zA-Z]*$/g;
	var holderno=$("#holderno").val();
	if(!reg3.test(holderno)){
		layer.msg("请输入数字或字母！",{time:2000});
		$("#holderno").css("border-color","red");
	}else{
		$("#holderno").css("border-color","#ddd");
	}
})
//卡号输入框失焦事件
$("#holdercard").blur(function(){
	var reg4=/^[0-9a-zA-Z]*$/g;
	var holdercard=$("#holdercard").val();
	if(!reg4.test(holdercard)){
		layer.msg("请输入数字或字母！",{time:2000});
		$("#holdercard").css("border-color","red");
	}else{
		$("#holdercard").css("border-color","#ddd");
	}
})
    
    
	//输入工号，获取员工信息
	$("#holderno").bind("keypress",function(event){
		
		var holderno=$(this).val();
		console.log(holderno)
	    if(event.keyCode == "13")
	    {
	    	$("#departmentno").val("");
			$("#titleno").val("");
			$("#emptype").val("");
			$("#holdercard").val("");
			$("#holdername").val("");
			$("#sexname").val("");
			$("#nationname").val("");
			$("#idcode").val("");
			$("#nativeplace").val("");
			$("#phone").val("");
			$("#superiorno2").val("");
			$("#startdate").val("");
			$("#bankcard").val("");
			$("#email").val("");
			$("#maxeducation").val("");
			$("#politicface").val("");
			$("#graduateschool").val("");
			$("#majorsubject").val("");
			$("#marrystatus").val("");
			$("#loginpassword").val("");
			$("#birthday").val("");
	    	
	    	
	    	queryHolderDataByPrimaryKey(holderno);
	    }
	});
	layui.use(['laydate'], function () {
		var laydate = layui.laydate;
		//日期
		lay('.test-item').each(function () {
			laydate.render({
				elem: this,
				trigger: 'click'
			});
		});
	});
	 
	/*//下拉框
	$(".ipt").click(function() {
	     $(this).siblings().slideToggle()
	 });//end
	 $(document).on("click", ".sel li", function() {
	       $(this).parent().siblings().val($(this).html())
	       $(this).parent().css("display", "none")
	 });//end
	 $(".ipt").blur(function() {
		$(this).siblings().slideUp()
	});//end
*/});

$("#holdercard").click(function(){
	readM1Card();
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
							document.getElementById("holdername").value = msgJson.name;  //姓名  
							$("#sexname option[value="+msgJson.sex+"]").attr("selected","selected");//性别
							$("#nationname option[value="+msgJson.nation+"族]").attr("selected","selected");//民族
							//document.getElementById("text_birthday").value = msgJson.birth; //出生日期                  
							document.getElementById("superiorno2").value = msgJson.address; //住址  
							document.getElementById("idcode").value = msgJson.certNo; //身份证号码      
							document.getElementById("nativeplace").value = msgJson.department;  //签发机关    
							document.getElementById("avatarPreview").src = "data:image/jpeg;base64,"+msgJson.base64Data;  //身份证头像，base64格式数据
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
							document.getElementById("holdercard").value = msgJson.UID; //IC卡卡号
							$.ajax({
								url:url+"/HolderData/queryHolderDataByHolderCard",
								type:"post",
								data:{"holdercard":msgJson.UID},
								success:function(data){
									console.log(data)
									if(data.flag){
										var holderno=(data.result.holderno==undefined?"":data.result.holderno);
										var holdername=(data.result.holdername==undefined?"":data.result.holdername);
										var sexname=(data.result.sexname==undefined?"":data.result.sexname);
										var holdercard=(data.result.holdercard==undefined?"":data.result.holdercard);
										var titlename=(data.result.titlename==undefined?"":data.result.titlename);
										var emptype=(data.result.emptype==undefined?"":data.result.emptype);
										var departmentno=(data.result.departmentno==undefined?"":data.result.departmentno);
										var deptname=(data.result.departmentname==undefined?"":data.result.departmentname);
										var companyno=(data.result.companyno==undefined?"":data.result.companyno);
										var companyname=(data.result.companyname==undefined?"":data.result.companyname);
										var birthday=(data.result.birthday==undefined?"":data.result.birthday);
										var phone=(data.result.phone==undefined?"":data.result.phone);
										var email=(data.result.email==undefined?"":data.result.email);
										var startdate=(data.result.startdate==undefined?"":data.result.startdate);
										var idcode=(data.result.idcode==undefined?"":data.result.idcode);
										var nationname=(data.result.nationname==undefined?"":data.result.nationname);
										var nativeplace=(data.result.nativeplace==undefined?"":data.result.nativeplace);
										var superiorno2=(data.result.superiorno2==undefined?"":data.result.superiorno2);
										var bankcard=(data.result.bankcard==undefined?"":data.result.bankcard);
										var maxeducation=(data.result.maxeducation==undefined?"":data.result.maxeducation);
										var politicface=(data.result.politicface==undefined?"":data.result.politicface);
										var graduateschool=(data.result.graduateschool==undefined?"":data.result.graduateschool);
										var majorsubject=(data.result.majorsubject==undefined?"":data.result.majorsubject);
										var marrystatus=(data.result.marrystatus==undefined?"":data.result.marrystatus);
										var loginpassword=(data.result.loginpassword==undefined?"":data.result.loginpassword);
										var holderstatus=(data.result.holderstatus==undefined?"":data.result.holderstatus);
										var holderpower=(data.result.rolename==undefined?"":data.result.rolename);
										$("#holderno").val(holderno)
										$("#departmentno").val(deptname);
										$("#titleno").val(titlename);
										$("#emptype").val(emptype);
										$("#holdercard").val(holdercard);
										$("#holdername").val(holdername);
										$("#sexname").val(sexname);
										$("#nationname").val(nationname);
										$("#idcode").val(idcode);
										$("#nativeplace").val(nativeplace);
										$("#phone").val(phone);
										$("#superiorno2").val(superiorno2);
										$("#startdate").val(startdate);
										$("#bankcard").val(bankcard);
										$("#email").val(email);
										$("#maxeducation").val(maxeducation);
										$("#politicface").val(politicface);
										$("#graduateschool").val(graduateschool);
										$("#majorsubject").val(majorsubject);
										$("#marrystatus").val(marrystatus);
										$("#loginpassword").val(loginpassword);
										$("#birthday").val(birthday);
										
									}
								}
							})
							
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




 
   
function queryHolderDataByPrimaryKey(holderno){
	var obj={"holderno":holderno};
	$.ajax({
		url:url+"/HolderData/queryHolderDataByPrimaryKey",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			if(!data.flag){
				return;
			}
			var holderno=(data.result.holderno==undefined?"":data.result.holderno);
			var holdername=(data.result.holdername==undefined?"":data.result.holdername);
			var sexname=(data.result.sexname==undefined?"":data.result.sexname);
			var holdercard=(data.result.holdercard==undefined?"":data.result.holdercard);
			var titlename=(data.result.titlename==undefined?"":data.result.titlename);
			//var titleno=(data.result.titleno==undefined?"":data.result.titleno);
			var emptype=(data.result.emptype==undefined?"":data.result.emptype);
			var departmentno=(data.result.departmentno==undefined?"":data.result.departmentno);
			var deptname=(data.result.departmentname==undefined?"":data.result.departmentname);
			var companyno=(data.result.companyno==undefined?"":data.result.companyno);
			var companyname=(data.result.companyname==undefined?"":data.result.companyname);
			var birthday=(data.result.birthday==undefined?"":data.result.birthday);
			var phone=(data.result.phone==undefined?"":data.result.phone);
			var email=(data.result.email==undefined?"":data.result.email);
			var startdate=(data.result.startdate==undefined?"":data.result.startdate);
			var idcode=(data.result.idcode==undefined?"":data.result.idcode);
			var nationname=(data.result.nationname==undefined?"":data.result.nationname);
			var nativeplace=(data.result.nativeplace==undefined?"":data.result.nativeplace);
			var superiorno2=(data.result.superiorno2==undefined?"":data.result.superiorno2);
			var bankcard=(data.result.bankcard==undefined?"":data.result.bankcard);
			var maxeducation=(data.result.maxeducation==undefined?"":data.result.maxeducation);
			var politicface=(data.result.politicface==undefined?"":data.result.politicface);
			var graduateschool=(data.result.graduateschool==undefined?"":data.result.graduateschool);
			var majorsubject=(data.result.majorsubject==undefined?"":data.result.majorsubject);
			var marrystatus=(data.result.marrystatus==undefined?"":data.result.marrystatus);
			var loginpassword=(data.result.loginpassword==undefined?"":data.result.loginpassword);
			var holderstatus=(data.result.holderstatus==undefined?"":data.result.holderstatus);
			var holderpower=(data.result.rolename==undefined?"":data.result.rolename);
			$("#departmentno").val(deptname);
			$("#titleno").val(titlename);
			$("#emptype").val(emptype);
			$("#holdercard").val(holdercard);
			$("#holdername").val(holdername);
			$("#sexname").val(sexname);
			$("#nationname").val(nationname);
			$("#idcode").val(idcode);
			$("#nativeplace").val(nativeplace);
			$("#phone").val(phone);
			$("#superiorno2").val(superiorno2);
			$("#startdate").val(startdate);
			$("#bankcard").val(bankcard);
			$("#email").val(email);
			$("#maxeducation").val(maxeducation);
			$("#politicface").val(politicface);
			$("#graduateschool").val(graduateschool);
			$("#majorsubject").val(majorsubject);
			$("#marrystatus").val(marrystatus);
			$("#loginpassword").val(loginpassword);
			$("#birthday").val(birthday);
		}
	})
}//end

//添加离职人员
$("#insertDepartureDataBtn").click(function(){
	insertDepartureData();
})
function insertDepartureData(){
		var holderno=$("#holderno").val();
		var holdername=$("#holdername").val();
		var sexname=$("#sexname").val();
		var loginpassword=$("#loginpassword").val();
		var leavereason=$("#leavereason").val();
		var idcode=$("#idcode").val();
		var holdercard=$("#holdercard").val();
		var bankcard=$("#bankcard").val();
		var titleno=$("#titleno").val();
		var emptype=$("#emptype").val();
		var departmentno=$("#departmentno").val();
		var nativeplace=$("#nativeplace").val();
		var maxeducation=$("#maxeducation").val();
		var nationname=$("#nationname").val();
		var politicface=$("#politicface").val();
		var graduateschool=$("#graduateschool").val();
		var majorsubject=$("#majorsubject").val();
		var marrystatus=$("#marrystatus").val();
		var superiorno2=$("#superiorno2").val();
		var phone=$("#phone").val();
		var email=$("#email").val();
		var startdate=$("#startdate").val();
		var expiredate=$("#expiredate").val();
		var leavetype=$("#leavetype").val();
		var birthday=$("#birthday").val();
		var obj="";
		var reg3=/^[0-9a-zA-Z]*$/g;
		if(!reg3.test(holderno)||holderno==""){
			layer.msg("请输入工号！",{time:2000});
			$("#holderno").css("border-color","red");
			return;
		}else{
			$("#holderno").css("border-color","#ddd");
		}
		if(expiredate==""){
			layer.msg("请输入离职日期!");
			$("#expiredate").css("border-color","red");
			return;
		}else{
			$("#expiredate").css("border-color","#ddd");
		}
		if(leavereason==""){
			layer.msg("请输入离职原因!");
			$("#leavereason").css("border-color","red");
			return;
		}else{
			$("#leavereason").css("border-color","#ddd");
		}
		obj={"holderno":holderno,"birthday":birthday,"holdername":holdername,
				"sexname":sexname,"loginpassword":loginpassword,
				"startdate":startdate,"expiredate":expiredate,"idcode":idcode,
				"holdercard":holdercard,"bankcard":bankcard,"emptype":emptype,
				"nativeplace":nativeplace,"maxeducation":maxeducation,
				"nationname":nationname,"politicface":politicface,
				"graduateschool":graduateschool,"majorsubject":majorsubject,
				"marrystatus":marrystatus,"superiorno2":superiorno2,
				"phone":phone,"email":email,"leavetype":leavetype,
				"leavereason":leavereason};
		console.log(obj);
		$.ajax({
		url:url+"/DepartureData/insertDepartureData",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000})
		}
	})
}//end	
        


