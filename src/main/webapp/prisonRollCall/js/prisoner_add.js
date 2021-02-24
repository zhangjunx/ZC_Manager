$(function(){
	queryDictDataList();//添加用户时 民族，政治面貌，工种，学历下拉框
	openReader();
	getDate();
	getPrisonList();
	if(getUrlParam("fid")!=undefined){//修改页面
		$(".main-tab .label a").html("修改人员");
		getOnePrison();
	}
})//end
//获取一条信息
function getOnePrison(){
	$.ajax({
		url:url+"/prisoner/getOnePrison",
		type:"post",
		data:{"fid":getUrlParam("fid")},
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result;
				var inStartTime=timestampToTime(res.inStartTime);
				var startTime=timestampToTime(res.startTime);
				var endTime=timestampToTime(res.endTime);
				
				$("#prisonerName").val(res.prisonerName);
				$("#prisonerName2").val(res.prisonerName2);
				$("#sex").val(res.sex);
				$("#age").val(res.age);
				$("#IDCard").val(res.IDCard);
				$("#nationality").val(res.nationality);
				$("#nation").val(res.nation);
				$("#homeLocal").val(res.homeLocal);
				$("#skill").val(res.skill);
				$("#political").val(res.political);
				$("#graduationSchool").val(res.graduationSchool);
				$("#major").val(res.major);
				$("#marriage").val(res.marriage);
				$("#prisonID").val(res.prisonID);
				$("#inStartTime").val(inStartTime);
				$("#inReason").val(res.inReason);
				$("#arrestingOrgan").val(res.arrestingOrgan);
				$("#judgmentOrgan").val(res.judgmentOrgan);
				$("#startTime").val(startTime);
				$("#endTime").val(endTime);
				$("#status").val(res.status);
				if(res.photoBase64!=undefined){
					$("#digitalPhoto").attr("src","data:image/png;base64,"+res.photoBase64);
				}
			}
		}
	})
}
//获取监区信息
function getPrisonList(){
	$.ajax({
		url:url+"/prison/getPrisonList",
		type:"post",
		async:false,
		success:function(data){
			$("#prisonID").empty();
			if(data.flag){
				for(var item of data.result){
					var $opt=$("<option value="+item.fid+">"+item.prisonName+"</option>");
					$("#prisonID").append($opt);
				}
			}
		}
	})
}
//时间戳转换日期
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10?"0"+date.getDate():date.getDate() + ' ';
    return Y+M+D;
}

//url解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

//点击确定提交数据
$("#insertPrisonerSureBtn").click(function(){
	savePrisonerInfo();
})
//提交人员数据信息
function savePrisonerInfo(){
	var prisonerName=$("#prisonerName").val();//姓名
	var prisonerName2=$("#prisonerName2").val();//曾用名
	var sex=$("#sex").val();//姓名
	var age=$("#age").val();//年龄
	var IDCard=$("#IDCard").val();//身份证号
	var nationality=$("#nationality").val();//籍贯
	var nation=$("#nation").val();//民族
	var homeLocal=$("#homeLocal").val();//家庭住址
	var skill=$("#skill").val();//特殊技能
	var political=$("#political").val();//政治面貌
	var graduationSchool=$("#graduationSchool").val();//毕业院校
	var major=$("#major").val();//所学专业
	var marriage=$("#marriage").val();//婚姻状况
	var prisonID=$("#prisonID").val();//归属监区
	var inStartTime=$("#inStartTime").val();//拘留时间
	var inReason=$("#inReason").val();//拘留原因
	var arrestingOrgan=$("#arrestingOrgan").val();//逮捕机关
	var judgmentOrgan=$("#judgmentOrgan").val();//判决机关
	var startTime=$("#startTime").val();//刑期开始时间
	var endTime=$("#endTime").val();//刑期结束时间
	var status=$("#status").val();//在押状态
	if(prisonerName==""){
		layer.msg("请输入姓名!",{time:2000});
		return;
	}
	if(IDCard==""){
		layer.msg("请输入身份证号!",{time:2000});
		return;
	}
	var reg2=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
	if(!reg2.test(IDCard)&&IDCard!=""){
		layer.msg("请正确输入身份证号！",{time:2000});
		$("#IDCard").css("border-color","red");
		return;
	}else{
		$("#IDCard").css("border-color","#ddd");
	}	
	if(nationality==""){
		layer.msg("请输入籍贯!",{time:2000});	
		return;
	}
	if(homeLocal==""){
		layer.msg("请输入家庭地址!",{time:2000});
		return;
	}
	if(inStartTime==""){
		layer.msg("请选择拘留时间!",{time:2000});
		return;
	}
	if(inReason==""){
		layer.msg("请输入拘留原因!",{time:2000});
		return;
	}
	if(arrestingOrgan==""){
		layer.msg("请输入逮捕机关!",{time:2000});
		return;
	}
	if(judgmentOrgan==""){
		layer.msg("请输入判决机关!",{time:2000});
		return;
	}
	if(startTime==""){
		layer.msg("请选择刑期开始时间!",{time:2000});
		return;
	}
	if(endTime==""){
		layer.msg("请选择刑期结束时间!",{time:2000});
		return;
	}
	//实例化formData
	var formData = new FormData();
    var src=$("#digitalPhoto").attr("src");
    var file="";
    if(src.indexOf('data:image')!=-1){
   	   // base64 图片操作
   	 	file=dataUrlToFile(src,"idphoto.png");
    }else if(src!="img/person.png"){//input选择
    	file = document.getElementById("avatarSlect").files[0];
    }
    var obj={"fid":getUrlParam("fid"),"operator":window.top.holderno,"prisonerName":prisonerName,"prisonerName2":prisonerName2,"sex":sex,"age":age,"IDCard":IDCard,"nationality":nationality,"nation":nation,
    		"homeLocal":homeLocal,"skill":skill,"political":political,"graduationSchool":graduationSchool,"major":major,"marriage":marriage,"prisonID":prisonID,
    		"inStartTime":inStartTime,"inReason":inReason,"arrestingOrgan":arrestingOrgan,"judgmentOrgan":judgmentOrgan,"startTime":startTime,"endTime":endTime,"status":status
    }
    console.log(obj);
    formData.append("prisoner",JSON.stringify(obj));
    formData.append("file", file);
    var index=layer.load(2);
    $.ajax({
    	url:url+"/prisoner/updatePrisonerList",
    	type:"post",
    	data:formData,
    	dataType:"json",
        cache:false,
        async:false,
        contentType: false,
        processData: false,
        success:function(data){
        	layer.close(index);
        	if(data.flag){
        		layer.msg(data.reason,{time:1000},function(){
        			window.location.href="prisonerManagement.html";
        		})
        	}else{
        		layer.msg(data.reason,{time:2000});
        	}
        },
        error:function(data){
        	layer.close(index);
        }
    })
}
//选择时间
function getDate(){
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
}//end
//身份证号输入框的失焦事件
$("#IDCard").blur(function(){
	var reg2=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
	var idcode=$("#IDCard").val();
	if(!reg2.test(idcode)&&idcode!=""){
		layer.msg("请正确输入身份证号！",{time:2000});
		$("#IDCard").css("border-color","red");
	}else{
		$("#IDCard").css("border-color","#ddd");
	}	
})
//将base64转file文件
function dataUrlToFile(dataurl,filename){
	/*dataUrlToFile(dataurl,filename)*/
		var arr=dataurl.split(',');
		var mime=arr[0].match(/:(.*?);/)[1];
		var bstr=atob(arr[1]);
		//var bstr=window.atob(arr[1]);
		var n=bstr.length;
		var u8arr=new Uint8Array(n);
		while(n--){
			u8arr[n]=bstr.charCodeAt(n);
		}
		//转换成file对象
		var obj= new File([u8arr],filename,{type:mime});
		//转换成blob对象
		//var obj=new Blob([u8arr],{type:mime});
		return obj;
}//end
$("#avatarSlect").change(function() {
	var imgUrl = getObjectURL(this.files[0]);
	$("#digitalPhoto").attr("src", imgUrl);
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
function queryDictDataList(){//查询字典数据 包括政治面貌，民族，学历，工种等
	$.ajax({
		url:url+"/DictionaryData/queryDictDataList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			if(!data.flag){
				return;
			}
			var htm="";
			$.each(data.result,function(i,val){
				var typename=(val.typename==undefined?"":val.typename);
				var value=(val.value==undefined?"":val.value);
				if(typename=='nationname'){
					htm+="<option value='"+value+"'>"+value+"</option>";
				}
			})
			$("#nation").append(htm);
		}
	})
}//end
var stream;
var media=0;
//访问用户媒体设备的兼容方法
function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
    }
}

let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');	

function success(stream) {
    //兼容webkit核心浏览器
    let CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源   
    stream = stream;
    //video.src = CompatibleURL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
}
function error(error) {
    console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
}
//点击人脸采集
$("#Unlicensed_taking").click(function(){
	if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
	    //调用用户媒体设备, 访问摄像头
	    getUserMedia({ video: { width: 533, height: 432 } }, success, error);
	} else {
	    layer.msg('不支持访问用户媒体');
	}
	layer.open({
		type:1,
		title:"拍摄取照",
		content:$("#personFace"),
		btn:["确定","取消"],
		area:["600px","600px"],
		yes:function(index){
			if(video.srcObject==null){
				layer.msg("请连接摄像头!",{time:2000});
				return;
			}
			context.drawImage(video, 27,60,433,370,0,0,533,432);
			// 获取图片base64链接
			var image = canvas.toDataURL('image/png');
			// 定义一个img
			var img = document.getElementById("digitalPhoto");
			//将图片添加到页面中
			img.src = image;
			if(video.srcObject!=null){
	 			video.srcObject.getTracks()[0].stop(); //结束关闭流
	 		}
			layer.close(index);
		}
	})
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
							document.getElementById("prisonerName").value = msgJson.name;  //姓名  
							$("#sex").val(msgJson.sex);//性别
							$("#nation").attr(msgJson.nation+"族");//民族
							document.getElementById("homeLocal").value = msgJson.address; //住址  
							document.getElementById("IDCard").value = msgJson.certNo; //身份证号码
							if(msgJson.department.indexOf("公安局")!=-1){
								var nativeplace=msgJson.department.substring(0,msgJson.department.length-3);
								document.getElementById("nationality").value = nativeplace;  //签发机关    
							}else{
								document.getElementById("nationality").value = msgJson.department;
							}
							document.getElementById("digitalPhoto").src = "data:image/jpeg;base64,"+msgJson.base64Data;  //身份证头像，base64格式数据
							posBeep();
						}
						else if(msgJson.rCode == "-2"){
							layer.msg("请放身份证",{time:2000});
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
							document.getElementById("bankcard").value = msgJson.bankCard;
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
}//end
//读取身份证物理ID
$("#holdercard").click(function(){
	ReadCertID();
})
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
}//end
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
}//end
//蜂鸣器控制，可以自己选择是否蜂鸣
function posBeep() {
	if (socket.readyState == 1) {
			socket.send("EST_PosBeep#");
		}
		else {
			layer.msg("未找到控件，请检查控件是否安装.",{time:2000});
		}
}//end
//读取身份证信息
$("#readID").click(function(){
	readIDCard();
})
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
}//end
