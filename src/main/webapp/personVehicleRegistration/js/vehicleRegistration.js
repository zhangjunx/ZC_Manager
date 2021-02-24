$(function() {
	approveTab();//判断当前是否是工作日
	openReader();
	queryApproverDeptList();
	//获取当前时间
    getTime();
    setInterval(getTime, 1000);
    queryVisitorsReasonList();
    queryApproverSuperList();
    
    //监听页面操作，如果没有操作那么自动跳转到首页
    var maxTime = 60; // seconds
    var time = maxTime;
    $('body').on('keydown mousemove mousedown', function(e) {
        time = maxTime; // reset
    });
    var intervalId = setInterval(function() {
        time--;
        if (time <= 0) {
            ShowInvalidLoginMessage();
            clearInterval(intervalId);
        }
    }, 1000)
    function ShowInvalidLoginMessage() {
         window.location.href = 'index.html';
    }
})

//查询进出区域
function queryVisitorsReasonList(){
	$.ajax({
		url:url+"/WX_Approver/queryVisitorsReasonList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			$(".visiterReason option").not("option:first").remove();
			if(!data.flag){
				return;
			}
			var res=data.result;
			for(var i=0;i<res.length;i++){
				var $opt=$("<option value='"+res[i].id+"'>"+res[i].name+"</option>");
				$(".visiterReason").append($opt);
			}
		}
	})
}//end

//查询进出区域
function queryApproverSuperList(){
	$.ajax({
		url:url+"/WX_Approver/queryApproverSuperList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			$(".approvePerson option").not("option:first").remove();
			if(!data.flag){
				return;
			}
			var res=data.result;
			for(var i=0;i<res.length;i++){
				var $opt=$("<option value='"+res[i].holderno+"'>"+res[i].holdername+"</option>");
				$(".approvePerson").append($opt);
			}
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

/*if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    //调用用户媒体设备, 访问摄像头
    getUserMedia({ video: { width: 533, height: 432 } }, success, error);
} else {
    alert('不支持访问用户媒体');
}*/

$(".submit_sure").on('click', function() {
	if($("#card_photo").attr("src")=="img/person.png"){
		layer.msg("未读取到证件照!",{time:2000});
		return;
	}
	//清空弹出层信息
	$(".discriminate .pass").hide();
	$(".discriminate .failed").hide();
	var index=layer.load(2,{shade:[0.5,'#fff']});
	if(video.srcObject==null){
		layer.close(index);
		layer.msg("请连接摄像头！",{time:2000});
		return;
	}
    context.drawImage(video, 27,60,433,370,0,0,533,432);
    // 获取图片base64链接
    var image = canvas.toDataURL('image/png');
    var file = dataURLtoFile(image, "aa.png");
    // 定义一个img
    var img = document.getElementById("img");
    //设置属性和src
    //img.id = "imgBoxxx";
    img.src = image;
    //将图片添加到页面中
    //document.body.appendChild(img);
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    var id_image = $("#card_photo").attr("src");
    if(id_image=="img/person1.png"){
    	layer.msg("未读取到证件照!",{time:2000});
    }
   /* var file1 = dataURLtoFile(image, "aa.png"); //现场照
    var file2 = dataURLtoFile(id_image, "bb.png"); //证件照
     var formData = new FormData();
     formData.append("photo", file1);
     formData.append("photo",file2);*/
    var obj={"file1":id_image,"file2":image};
     
     //身份证信息
     var peopleName=$(".personFace_name").html();
     var peopleNumber=$(".personFace_number").html();
     var peopleAddress=$(".personFace_name").attr("data-address");
     var peopleNation=$(".personFace_name").attr("data-nation");
     var peopleSex=$(".personFace_name").attr("data-sex");
     var peopleType=$(".personFace_number").attr("data-type");
     //警察信息
     var peopleTitlename=$(".personFace_titlename").html();
     var peopleDeptname=$(".personFace_departmentname").html();
     var peopleTitleno=$(".personFace_titlename").attr("data-titleno");
     var peopleDeptno=$(".personFace_departmentname").attr("data-deptno");
     var peopleCard=$(".personFace_number").attr("data-holdercard");
     var cardid=$(".personFace_number").attr("data-cardid");
     //外协信息
     var peopleId=$(".personFace_number").attr("data-id");
     var peopleCardid=$(".personFace_number").attr("data-cardid");
     var peopleNationality=$(".personFace_name").attr("data-nationality");
     var peopleCarno=$(".personFace_name").attr("data-carno");
     var peopleVisitorsReasontext=$(".personFace_titlename").html();
     var peopleVisitorssextext=$(".personFace_titlename").attr("data-visitorssextext");
     var peopleVisitorsreason=$(".personFace_titlename").attr("data-visitorsreason");
     
     $.ajax({
         /*type: "POST", // 数据提交类型
         url: url+"/contrast/ContrastFace", // 发送地址
         data: formData, //发送数据
         //async: true, // 是否异步
         processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
         contentType: false,*/
    	 url: url+"/LH_FaceRecog/recog", // 发送地址
         type: "POST", // 数据提交类型
         data: obj, //发送数据
         dataType:"json",
         success: function(data) {
        	 layer.close(index);
            console.log(data);
            if(data.resultcode=="0"){
            	
            	//如果是0 成功
            	var score=data.score==undefined?0:data.score;
            	if(score>0.6){
            		layer.msg("识别成功，相似度为"+score*100+"!",{time:3000});
            		$(".discriminate .pass").show();
                	$(".discriminate .failed").hide();
                	$(".discriminate .success").hide();
                	if(peopleType=="H"){//警察
              		  $(".police_photo").attr("src",id_image).attr("data-dataimgurl",data.dataimgurl).attr("data-idimgurl",data.idimgurl).css("width","147px").css("height","170px");
              		  $(".receiverpeopleid").html(peopleNumber).attr("data-holdercard",peopleCard).attr("data-cardid",cardid);
              		  $(".receiversname").html(peopleName);
              		  var date=getTime();
              		  $(".shiJian").html(date);
              		  $(".jianQu").html(peopleDeptname).attr("data-deptno",peopleDeptno);
              	  }else if(peopleType=="I"){//身份证
              		  $(".driver_photo").attr("src",id_image).attr("data-dataimgurl",data.dataimgurl).attr("data-idimgurl",data.idimgurl).attr("data-scenephoto",image).css("width","147px").css("height","170px");
              		  $(".idNumber").html(peopleNumber);
              		  $(".driver").html(peopleName).attr("data-nation",peopleNation).attr("data-sex",peopleSex).attr("data-address",peopleAddress);;
              		 $(".carType").html(peopleSex);
              		  var date=getTime();
              		  $(".carTime").html(date).attr("data-type","I");
              	  }
            	}else{
            		layer.msg("相似度太低，只有"+score*100+"!",{time:3000});
            		$(".discriminate .failed").hide();
                	$(".discriminate .pass").hide();
                 	$(".discriminate .success").show();
            	}
            	
            }else{
            	 $(".discriminate .failed").show();
            	 $(".discriminate .pass").hide();
             	 $(".discriminate .success").hide();
           	     layer.msg("比对失败,没有相似度!",{time:2000});
            }
            
         } 
    });
    
})



//点击提交审批
$(".sure").click(function(){
	var index=layer.load(2,{shade:[0.5,'#fff']});
	var receiverpeopleid=$(".receiverpeopleid").html();//警号
	var cardno=$(".receiverpeopleid").attr("data-holdercard");//干警卡号
	var cardid=$(".receiverpeopleid").attr("data-cardid")
	var receiversname=$(".receiversname").html();//干警姓名
	var departments=$(".jianQu").attr("data-deptno");//干警部门编号
	var departmentsname=$(".jianQu").html();//干警部门名称
	var visitorsreason=$(".visiterReason").val();//来访原因编码
	var visitorsreasontext=$(".visiterReason").find("option:selected").html();//来访原因
	
	//如果警察信息为空，则不能添加
	if(receiverpeopleid==""){
		layer.msg("请添加警察信息!",{time:2000});
		layer.close(index);
		return;
	}
	
	var formdata=new FormData();
	
		var nickname=$(".carTime").attr("data-type");
		var obj;
		//提交临时  外协人员信息
		if(nickname=="I"){
			var visitorsname=$(".driver").html();//姓名
			var visitorssextext=$(".driver").attr("data-sex");//性别
			var nationality=$(".driver").attr("data-nation");
			var idcardno=$(".idNumber").html();//证件号
			var visitorsaddress=$(".driver").attr("data-address");//家庭地址
			var idimgurl=$(".driver_photo").attr("data-idimgurl");//证件照
			var dataimgurl=$(".driver_photo").attr("data-dataimgurl");//现场照
			var dringmodels=$(".province").html()+$("#vehicleNumber").val();//车牌号
			var carinfo=$("#vehicleType").val();//车牌类型
			var note=$("#vehicleColor").val();//车身颜色
			//证件照和现场照 file
			var idphoto=$(".driver_photo").attr("src");
			var scenephoto=$(".driver_photo").attr("data-scenephoto");
			var file1=dataURLtoFile(idphoto,"a.png");
			var file2=dataURLtoFile(scenephoto,"a.png");
			formdata.append("photo",file1);
			formdata.append("photo",file2);
			//验证车牌号
			var reg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
			if(!reg.test(dringmodels)&&$("#vehicleNumber").val()!=""){
				layer.msg("车牌号输入错误！",{time:2000});
				layer.close(index);
				return;
			}
			if(carinfo==""){
				layer.msg("请选择车牌类型!",{time:2000});
				layer.close(index);
				return;
			}
			if(note==""){
				layer.msg("请选择车身颜色!",{time:2000});
				layer.close(index);
				return;
			}
			 obj={
					"visitorsname":visitorsname,
					"visitorssextext":visitorssextext,
					"nationality":nationality,
					"idcardno":idcardno,
					"visitorsaddress":visitorsaddress,
					"idimgurl":idimgurl,
					"dataimgurl":dataimgurl,
					"dringmodels":dringmodels,
					"carinfo":carinfo,
					"note":note,
					"visitorstype":"C"
			};
		}else{
			layer.msg("请添加人员",{time:2000});
			layer.close(index);
			return;
		}
		
	//console.log(formdata.getAll("photo"));
		//判断来访原因是否为空
		if($(".visiterReason").val()==""){
			layer.msg("请选择来访原因!",{time:2000});
			layer.close(index);
			return;
		}
		
	//如果是工作日审批，则两个部门必须全部选择
	var obj1;	
	if($(".tab li.current").html()=="工作时间审批"){
		if($(".dept_r1").val()==""||$(".dept_r2").val()==""){
			layer.msg("请选择部门",{ime:2000});
			layer.close(index);
			return;
		}
		if($(".dept_r1").val()==$(".dept_r2").val()){
			layer.msg("不能选择相同的部门",{ime:2000});
			layer.close(index);
			return;
		}
		
		var approverrole1=$(".dept_r1").val();
		var approverrolename1=$(".dept_r1").find("option:selected").html();
		var approverrole2=$(".dept_r2").val();
		var approverrolename2=$(".dept_r2").find("option:selected").html();
		var approvertype="11";
		var approvertypename="工作时间审批";
		 obj1={
				"receiverpeopleid":receiverpeopleid,
				"cardid":cardid,
				"receiversname":receiversname,
				"departments":departments,
				"departmentsname":departmentsname,
				"visitorsreason":visitorsreason,
				"visitorsreasontext":visitorsreasontext,
				"approverrole1":approverrole1,
				"approverrolename1":approverrolename1,
				"approverrole2":approverrole2,
				"approverrolename2":approverrolename2,
				"approvertype":approvertype,
				"approvertypename":approvertypename,
				"visitorstype":"C"
		};
	}else if($(".tab li.current").html()=="非工作时间审批"){
		if($(".approvePerson").val()==""){
			layer.msg("请选择审批人",{ime:2000});
			layer.close(index);
			return;
		}
		var holderno=$(".approvePerson").val();
		var holdername=$(".approvePerson").find("option:selected").html();
		var approvertype="22";
		var approvertypename="非工作时间审批";
		 obj1={
				"receiverpeopleid":receiverpeopleid,
				"cardid":cardid,
				"receiversname":receiversname,
				"departments":departments,
				"departmentsname":departmentsname,
				"visitorsreason":visitorsreason,
				"visitorsreasontext":visitorsreasontext,
				"approverrole1":holderno,
				"approverrolename1":holdername,
				"approvertype":approvertype,
				"approvertypename":approvertypename,
				"visitorstype":"C"
		};
	}
	console.log(obj);
	console.log(obj1)
	formdata.append("str1",JSON.stringify(obj1));
	formdata.append("str2",JSON.stringify(obj));
	//第一种
	 for (var value of formdata.values()) {
	    //console.log(value);
	 }
	$.ajax({
		url:url+"/WX_VisitorsInfoAdd/insertVehicleAutoRegister",
		type:"POST",
		data:formdata,
		dataType:"json",
		async:false,
		cache: false,//上传文件无需缓存
		contentType:false,//必须
		processData:false,//用于对data参数进行序列化处理 这里必须false
		success:function(data){
			layer.close(index);
			console.log(data);
			if(data.flag){
				layer.msg("登记成功!",{time:2000},function(){
					window.location.reload();
				});
			}else{
				layer.msg(data.reason,{time:2000});
			}
		},
		error:function(data){
			layer.close(index);
		}
	})
})



//base64转为file
function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
}


//点击关闭人脸识别
$(".close").click(function(){
	if(video.srcObject!=null){
		video.srcObject.getTracks()[0].stop(); //结束关闭流
	}
	media=0;
	//清空弹出层信息
	$(".police_information").empty();
	$("#card_photo").attr("src","img/person.png");
	$("#img").attr("src","img/person.png");
	$(".discriminate .failed").hide();
	$(".discriminate .pass").hide();
	$(".personFace").fadeOut(500);
	$(".shade").fadeOut(500);
})
/*//点击进出事由
$(".things_box").click(function(){
	$(this).addClass("current").siblings().removeClass("current");
	var val=$(this).children().eq(1).html();
	$(".carType").html(val);
	if(val=="生产车辆"){
		val="劳动改造科";
	}else if(val=="生活车辆"){
		val="生活卫生科";
	}else if(val=="垃圾车"){
		val="生活卫生科";
	}else if(val=="其他车辆"){
		val="狱政管理科";
	}
	if($("#selectArea").html()!="请选择"){
		$(".message").html("此次登记将由"+$("#selectArea").html()+"和"+val+"审批!");
	}
})*/

//点击责任科室
$("#selectArea").click(function(){
	$(".shade2").fadeIn(500);
	$(".areaName").fadeIn(500);
})
//点击责任科室里面的li
/*$(document).on("click",".areaName li",function(){
	$(this).addClass("cur").siblings().removeClass("cur");
	var deptno=$(this).attr("data-deptno");
	var html=$(this).html();
	$("#selectArea").html($(this).html()).attr("data-deptno",deptno);
	$(".shade2").fadeOut(500);
	$(".areaName").fadeOut(500);
	if($(".things_box.current").length!=0){
		var things=$(".things_box.current").children().eq(1).html();
		if(things=="生产车辆"){
			things="劳动改造科";
		}else if(things=="生活车辆"){
			things="生活卫生科";
		}else if(things=="垃圾车"){
			things="生活卫生科";
		}else if(things=="其他车辆"){
			things="狱政管理科";
		}
		$(".message").html("此次登记将由"+html+"和"+things+"审批!");
	}
})*/
//点击弹出层外的空白区域
$(".shade2").click(function(){
	$(".shade2").fadeOut(500);
	$(".areaName").fadeOut(500);
})

//点击车辆信息 省份简称
$(".vehicle_info .province").click(function(){
	$(".provinceJc").show().siblings().hide();
})
//点击省份简称 并赋值
$(".provinceJc div").click(function(){
	$(this).addClass("province_curr").siblings().removeClass("province_curr");
	var province=$(this).html();
	$(".province").html(province);
})
//点击车辆信息 车牌号
$(".vehicle_info #vehicleNumber").click(function(){
	$(".keyboard_number").show().siblings().hide();
})
//点击英文字母或数字 在输入框中显示
$(".keyboard_number div").click(function(){
	$(this).addClass("keyboardNumber_curr").siblings().removeClass("keyboardNumber_curr");
	setTimeout(function(){
		$(".keyboard_number div").removeClass("keyboardNumber_curr");
	},200)
	var iptVal=$("#vehicleNumber").val();
	var val=$(this).html();
	var vehicleNumber=iptVal+val;
	if(val=="退格"){
		var length=iptVal.length;
		iptVal=iptVal.substring(0,length-1);
		$("#vehicleNumber").val(iptVal);
	}else if(val=="清除"){
		$("#vehicleNumber").val("");
	}else{
		$("#vehicleNumber").val(vehicleNumber);
	}
	
})
//点击车辆信息 车牌类型
$(".vehicle_info #vehicleType").click(function(){
	$(".keyboard_vehicleType").show().siblings().hide();
})
//点击车牌类型里面的div
$(".keyboard_vehicleType div").click(function(){
	$(this).addClass("keyboardVehicle_curr").siblings().removeClass("keyboardVehicle_curr");
	var val=$(this).children().eq(1).html();
	$("#vehicleType").val(val);
})
//点击车辆信息 车身颜色
$(".vehicle_info #vehicleColor").click(function(){
	$(".keyboard_vehicleColor").show().siblings().hide();
})
//点击车身颜色 里面的div
$(".keyboard_vehicleColor div").click(function(){
	$(this).addClass("keyboardColor_curr").siblings().removeClass("keyboardColor_curr");
	var val=$(this).children().eq(1).html();
	$("#vehicleColor").val(val);
})


//读取身份证
var timer=setInterval(function(){
    	readIDCard();
    	readM1Card();
    }, 1000);
//读取身份证
var socket;
function openReader() {
    var host = "ws://localhost:33666";
    if (socket == null) {
        socket = new WebSocket(host);
    } else {
        console.log("已初始化.");
    }
    try {
        socket.onopen = function() {
            console.log("初始化成功.");
            //getVersion(); 
        };
        socket.onclose = function() {
            console.log("读卡服务已经断开.");
        };
        socket.onerror = function() {
            console.log("请检查控件是否正常安装.");
        };
        socket.onmessage = function(msg) {
            if (typeof msg.data == "string") {
                var msgM = msg.data + "";
                var msgJson = JSON.parse(msgM);
                //resultMsg(msgM);        
                switch (msgJson.fun) {

                    case "EST_GetVersion#":
                        layer.msg("版本号：" + msgJson.errMsg, { time: 2000 })
                        break;

                    case "EST_Reader_ReadIDCard#":
                        if (msgJson.rCode == "0") {
                        	$(".personFace").fadeIn(500);
                         	$(".shade").fadeIn(500);
                         	//判断摄像头是否被调用
                         	if(media==0){
                         		if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
                                    //调用用户媒体设备, 访问摄像头
                                    getUserMedia({ video: { width: 533, height: 432 } }, success, error);
                                    media=1;
                                } else {
                                    alert('不支持访问用户媒体');
                                }
                         	}
                         	  var $p1=$("<p><label>身份证号:</label><span data-type='I' class='personFace_number'>"+msgJson.certNo+"</span></p>");
                              var $p2=$("<p><label>人员姓名:</label><span data-nation='"+msgJson.nation+"' data-sex='"+msgJson.sex+"' data-address='"+msgJson.address+"' class='personFace_name'>"+msgJson.name+"</span></p>");
                              $(".police_information").empty();
                              $(".police_information").append($p1);
                              $(".police_information").append($p2);
                            document.getElementById("card_photo").src = "data:image/png;base64," + msgJson.base64Data; //身份证号码      
                            //ReadCertID()
                        } else if (msgJson.rCode == "-2") {
                            //layer.msg("请放身份证", { time: 2000 })
                        } else {
                            //layer.msg(msgJson.errMsg, { time: 2000 });
                        }
                        break;

                    case "EST_ReadCertID#":
                        if (msgJson.rCode == "0") {
                            document.getElementById("holdercard").value = msgJson.UID;
                        } else {
                            layer.msg(msgJson.errMsg, { time: 2000 })
                        }
                        break;

                    case "EST_ReadBankCard#":
                        if (msgJson.rCode == "0") {
                            document.getElementById("text_Bank_ID").value = msgJson.bankCard;
                            posBeep();
                        } else {
                            layer.msg(msgJson.errMsg, { time: 2000 });
                        }
                        break;

                    case "EST_ReadM1Card#":
                        if (msgJson.rCode == "0") {
                        	var uid=msgJson.UID;
                       	 	var arr = [];
                            for (var i = 0; i < uid.length; i++) {
                                if (i % 2 == 0) {
                                    var num = uid.substring(i, (i + 2));
                                    arr.push(num);
                                }
                            }
                            arr = arr.reverse().join("");
                            console.log(arr);
                        	$(".personFace").fadeIn(500);
                         	$(".shade").fadeIn(500);
                            console.log(msgJson)
                          //判断摄像头是否被调用
                         	if(media==0){
                         		if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
                                    //调用用户媒体设备, 访问摄像头
                                    getUserMedia({ video: { width: 533, height: 432 } }, success, error);
                                    media=1;
                                } else {
                                    alert('不支持访问用户媒体');
                                }
                         	}
                            //清楚定时器
                            clearInterval(timer);
                            //var index=layer.load(2,{shade:[0.5,'#fff']});
                            $.ajax({
                         		url:url+"/WX_VisitorsInfoAdd/queryPeopleInfoByCarNo",
                         		type:"post",
                         		data:{"str":arr},
                         		success:function(data){
                         			console.log(data);
                         			//layer.close(index);
                         			 timer=setInterval(function(){
                                     	readIDCard();
                                     	readM1Card();
                                     }, 1000);
                         			if(data.flag){
                         				var res=data.result;
                         				if(data.type=="H"){
                         					 var $p1=$("<p><label>警号:</label><span data-cardid='"+res.cardid+"' data-type='"+data.type+"' data-holdercard='"+res.holdercard+"' class='personFace_number'>"+res.holderno+"</span></p>");
                                             var $p2=$("<p><label>姓名:</label><span class='personFace_name'>"+res.holdername+"</span></p>");
                                             var $p3=$("<p><label>部门:</label><span data-deptno='"+res.departmentno+"'  class='personFace_departmentname'>"+res.departmentname+"</span></p>");
                                             $(".police_information").empty();
                                             $(".police_information").append($p1);
                                             $(".police_information").append($p2);
                                             $(".police_information").append($p3);
                                             $("#card_photo").attr("src","data:image/png;base64,"+res.dataphoto);
                         				}
                         			}else {
                         				layer.msg(data.reason,{time:2000});
                         			}
                         		},
                         		error:function(data){
                         			//layer.close(index);
                         			 timer=setInterval(function(){
                                      	readIDCard();
                                      	readM1Card();
                                      }, 1000);
                         		}
                         	})
                            
                            //document.getElementById("holdercard1").value = msgJson.UID; //IC卡卡号
                        } else {
                            //layer.msg(msgJson.errMsg, { time: 2000 });
                        }
                        break;

                    case "EST_ReadSocialCard#": //社保卡信息，个别地区社保卡不按国家规范来的，会读取信息不全
                        if (msgJson.rCode == "0") {
                            document.getElementById("S_text_name").value = msgJson.XM; //社保卡姓名  
                            document.getElementById("S_text_sex").value = msgJson.XB; //社保卡性别             
                            document.getElementById("S_text_nation").value = msgJson.MZ; //社保卡民族                      
                            document.getElementById("S_text_birthday").value = msgJson.CSRQ; //社保卡出生日期                  
                            document.getElementById("S_text_idNum").value = msgJson.SHBZHM; //社保卡身份证号      
                            document.getElementById("S_text_effDate").value = msgJson.FKRQ; //社保卡有效期开始
                            document.getElementById("S_text_expDate").value = msgJson.KYXQ; //社保卡有效期结束
                            document.getElementById("S_text_kahao").value = msgJson.SBKH; //社保卡卡号
                            posBeep();
                        } else {
                            layer.msg(msgJson.errMsg, { time: 2000 });
                        }
                        break;

                    case "EST_IDRequest#":
                        if (msgJson.rCode == "0") {
                            layer.msg("找到身份证", { time: 2000 })
                        } else {
                            layer.msg(msgJson.errMsg, { time: 2000 });
                        }
                        break;

                    default:
                        break;
                }
            } else {
                layer.msg("连接异常,请检查是否成功安装控件.", { time: 2000 });
            }
        };
    } catch (ex) {
        layer.msg("连接异常,请检查是否成功安装控件.", { time: 2000 });
    }
}

//读取IC卡号，包括M1、CPU卡，8位16进制数据
function readM1Card() {
    try {
        if (socket.readyState == 1) {
            socket.send("EST_ReadM1Card#");
        } else {
            console.log("未找到控件，请检查控件是否安装.", { time: 2000 });
        }
    } catch (ex) {
        consoloe.log("连接异常,请检查是否成功安装控件.", { time: 2000 });
    }
}

//蜂鸣器控制，可以自己选择是否蜂鸣
function posBeep() {
    if (socket.readyState == 1) {
        socket.send("EST_PosBeep#");
    } else {
       console.log("未找到控件，请检查控件是否安装.", { time: 2000 });
    }
}


//读取身份证信息
function readIDCard() {
    try {
        if (socket.readyState == 1) {
            socket.send("EST_Reader_ReadIDCard#");
        } else {
            console.log("未找到控件，请检查控件是否安装.", { time: 2000 });
        }
    } catch (ex) {
        console.log("连接异常,请检查是否成功安装控件.", { time: 2000 });
    }
}

//根据当前时间判断是否是工作日
function approveTab(){
	var date = new Date();
	var day=date.getDay();
	 var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
     var week = weeks[day];
     //非工作日
     if(week=="星期日"||week=="星期六"){
    	 $(".tab li").eq(1).addClass("current");
    	 $(".approvePerson").show();
    	 $(".dept_r1").hide();
    	 $(".dept_r2").hide();
     }else{//工作日
    	 $(".tab li").eq(0).addClass("current");
    	 $(".approvePerson").hide();
    	 $(".dept_r1").show();
    	 $(".dept_r2").show();
     }
}

//点击工作日审批或非工作日审批
$(document).on("click",".tab li",function(){
	if($(this).index()==0){//工作日审批
		$(this).addClass("current").siblings().removeClass("current");
		 $(".approvePerson").hide();
    	 $(".dept_r1").show();
    	 $(".dept_r2").show();
	}else if($(this).index()==1){//非工作日审批
		$(this).addClass("current").siblings().removeClass("current");
		$(".approvePerson").show();
	   	 $(".dept_r1").hide();
	   	 $(".dept_r2").hide();
	}
})



//查询进出区域
function queryApproverDeptList(){
	$.ajax({
		url:url+"/WX_Approver/queryDeptList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			$(".dept_r1 option:gt(0)").remove();
			$(".dept_r2 option:gt(0)").remove();
			if(data.flag){
				var res=data.result;
				for(var i=0;i<res.length;i++){
					var $opt=$("<option value='"+res[i].departmentno+"'>"+res[i].departmentname+"</option>");
					$(".dept_r1").append($opt);
				}
				/*$(".dept_r1 option:selected").html("公司领导");
				$(".dept_r1").val("001001022");
				$(".dept_r1").attr("disabled","disabled");*/
				for(var i=0;i<res.length;i++){
					var $opt=$("<option value='"+res[i].departmentno+"'>"+res[i].departmentname+"</option>");
					$(".dept_r2").append($opt);
				}
				
			}
		}
	})
}

/*//查询进出区域
function queryPrisonAreaList(){
	$.ajax({
		url:url+"/DepartmentData/queryDeptList",
		type:"POST",
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data);
			$(".dept_r1 option:gt(0)").remove();
			$(".dept_r2 option:gt(0)").remove();
			if(data.flag){
				var res=data.result;
				for(var i=0;i<res.length;i++){
					var $opt=$("<option value='"+res[i].departmentno+"'>"+res[i].departmentname+"</option>");
					$(".dept_r1").append($opt);
				}
				for(var i=0;i<res.length;i++){
					var $opt=$("<option value='"+res[i].departmentno+"'>"+res[i].departmentname+"</option>");
					$(".dept_r2").append($opt);
				}
				
			}
		}
	})
}*/




 //获取当前时间
function getTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
    	second = "0" + second;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    $(".person_hour").html(hour + ":" + minute+":"+second);
    $(".person_date").html(year + "-" + month + "-" + day);
    return year+"/"+month+"/"+day+" "+hour+":"+minute;

}