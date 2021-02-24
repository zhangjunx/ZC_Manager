$(function() {
		openReader();
        //获取当前时间
        getTime();
        setInterval(getTime, 1000);
        
        //监听页面操作，如果没有操作那么自动跳转到首页
        var maxTime = 60*2; // seconds
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
                        	//清除定时器
                        	clearInterval(timer);
                        		$.ajax({
                        			//url:url+"/WX_VisitorsInfo/queryVisitorsInfoByAudited",
                        			url:url+"/WX_VisitorsInfoAdd/queryVisitorsInfoByAudited",
                        			type:"POST",
                        			data:{"str":msgJson.certNo,"strr":"2"},
                        			//data:{"str":msgJson.certNo,"strr":"2"},
                        			dataType:"json",
                        			success:function(data){
                        				//console.log(data);
                        				timer=setInterval(function(){
                        					readIDCard();
                        					readM1Card();
                        				}, 1000);
                        				$(".main-content").empty();
                        				if(!data.flag){
                        					layer.msg(data.reason,{time:2000});
                        					return;
                        				}
                        				var res=data.result;
                    					for(var i=0;i<res.length;i++){
                    						//人员登记
                    						var approvertypename=(res[i].approvertypename==undefined)?"":res[i].approvertypename;
                        					
                    						if(res[i].visitorstype=="P"){
                        						if(res[i].applystatus=="30"){
                        							var applystatusname="批准";
                        						}else{
                        							var applystatusname="驳回";
                        						}
                        						//警察信息
                        						var departmentsname=(res[i].arrlist[0].departmentsname==undefined)?"":res[i].arrlist[0].departmentsname;
                        						var filldate=(res[i].arrlist[0].filldate==undefined)?"":res[i].arrlist[0].filldate;
                        						var filltime=(res[i].arrlist[0].filltime==undefined)?"":res[i].arrlist[0].filltime;
                        						var receiverpeopleid=(res[i].arrlist[0].receiverpeopleid==undefined)?"":res[i].arrlist[0].receiverpeopleid;
                        						var receiversname=(res[i].arrlist[0].receiversname==undefined)?"":res[i].arrlist[0].receiversname;
                        						var applystatusname1=(res[i].arrlist[0].applystatusname==undefined)?"":res[i].arrlist[0].applystatusname;
                        						var $div1=$("<div class='approval_pending'><div class='approval_tit'><h4 class='approval_status'>人员|"+applystatusname+"|"+applystatusname1
                        								+"</h4><p class='apply_time'>申请时间:<span>"+filldate+"|"+approvertypename+"</span></p></div></div>")
                        						var $div2=$("<div class='scroll_approvalPending'><dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].policephoto
                        								+"' style='width:110px;height:139px'></dt><div class='infor_right'><dd><label class='alarm'>警号:</label><span class='receiverpeopleid'>"+receiverpeopleid+"</span></dd>" +
                        								"<dd><label class='pliceName'>姓名:</label><span class='receiversname'>"+receiversname
                        								+"</span></dd><dd><label class='prison'>部门:</label><span class='jianQu'>"+departmentsname+"</span></dd>" +
                        								"<dd><label class='infoTime'>时间:</label><span class='shijian'>"+filltime+"</span></dd></div></dl></div>");
                        						//外协信息
                    							var idcardno=(res[i].arrlist[0].idcardno==undefined)?"":res[i].arrlist[0].idcardno;
                    							var visitorsname=(res[i].arrlist[0].visitorsname==undefined)?"":res[i].arrlist[0].visitorsname;
                    							var visitorssextext=(res[i].arrlist[0].visitorssextext==undefined)?"":res[i].arrlist[0].visitorssextext;
                    							var visitorsstatus=(res[i].arrlist[0].visitorsstatus==undefined)?"":res[i].arrlist[0].visitorsstatus;
                    							if(visitorsstatus=="10"){
                    								visitorsstatus="已登记";
                    							}else if(visitorsstatus=="20"){
                    								visitorsstatus="已进出";
                    							}else if(visitorsstatus=="30"){
                    								visitorsstatus="已离开";
                    							}
                    							var $dl=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].visitorphoto
                    									+"' style='width:110px;height:140px'></dt><div class='infor_right'><dd><label class='cardNumber'>身份证号:</label><span class='outsourcing_number'>"+idcardno+"</span></dd>" +
                    									"<dd><label class='peopleName'>人员姓名:</label><span class='outsourcing_name'>"+visitorsname+"</span></dd>" +
                    									"<dd><label>人员性别:</label><span class='personType'>"+visitorssextext
                    									+"</span></dd><dd><label class='readTime'>进出状态:</label><span class='outsourcing_time'>"+visitorsstatus+"</span></dd></div></dl>")
                    							$div2.append($dl);
                        						$div1.append($div2);
                        						$(".main-content").append($div1);	
                        					}else if(res[i].visitorstype=="C"){//车辆登记
                        						if(res[i].applystatus=="30"){
                        							var applystatusname="批准";
                        						}else{
                        							var applystatusname="驳回";
                        						}
                        						var carinfo=(res[i].arrlist[0].carinfo==undefined)?"":res[i].arrlist[0].carinfo;
                        						var dringmodels=(res[i].arrlist[0].dringmodels==undefined)?"":res[i].arrlist[0].dringmodels;
                        						var note=(res[i].arrlist[0].note==undefined)?"":res[i].arrlist[0].note;
                        						
                        						//警察信息
                        						var departmentsname=(res[i].arrlist[0].departmentsname==undefined)?"":res[i].arrlist[0].departmentsname;
                        						var filldate=(res[i].arrlist[0].filldate==undefined)?"":res[i].arrlist[0].filldate;
                        						var filltime=(res[i].arrlist[0].filltime==undefined)?"":res[i].arrlist[0].filltime;
                        						var receiverpeopleid=(res[i].arrlist[0].receiverpeopleid==undefined)?"":res[i].arrlist[0].receiverpeopleid;
                        						var receiversname=(res[i].arrlist[0].receiversname==undefined)?"":res[i].arrlist[0].receiversname;
                        						var applystatusname1=(res[i].arrlist[0].applystatusname==undefined)?"":res[i].arrlist[0].applystatusname;
                        						var $div1=$("<div class='approval_pending'><div class='approval_tit'><h4 class='approval_status'>车辆|"+applystatusname+"|"+applystatusname1
                        								+"</h4><p class='apply_time'>申请时间:<span>"+filldate+"|"+approvertypename+"</span></p></div></div>")
                        						var $div2=$("<div class='scroll_approvalPending'><ul class='vehicleInfo'><li><label>车牌号码:</label><span class='vehicle_number'>"+carinfo+"</span></li>" +
                        								"<li><label>车牌类型:</label><span class='vehicle_type'>"+dringmodels
                        								+"</span></li><li><label>车身颜色:</label><span class='vehicle_color'>"+note
                        								+"</span></li></ul><dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].policephoto
                        								+"' style='width:110px;height:139px'></dt><div class='infor_right'><dd><label class='alarm'>警号:</label><span class='receiverpeopleid'>"+receiverpeopleid+"</span></dd>" +
                        								"<dd><label class='pliceName'>姓名:</label><span class='receiversname'>"+receiversname+"</span></dd><dd><label class='prison'>部门:</label><span class='jianQu'>"+departmentsname+"</span></dd>" +
                        								"<dd><label class='infoTime'>时间:</label><span class='shijian'>"+filltime+"</span></dd></div></dl></div>");
                        						var idcardno=(res[i].arrlist[0].idcardno==undefined)?"":res[i].arrlist[0].idcardno;
                        						var visitorsname=(res[i].arrlist[0].visitorsname==undefined)?"":res[i].arrlist[0].visitorsname;
                        						var visitorssextext=(res[i].arrlist[0].visitorssextext==undefined)?"":res[i].arrlist[0].visitorssextext;
                        						var visitorsstatus=(res[i].arrlist[0].visitorsstatus==undefined)?"":res[i].arrlist[0].visitorsstatus;
                    							if(visitorsstatus=="10"){
                    								visitorsstatus="已登记";
                    							}else if(visitorsstatus=="20"){
                    								visitorsstatus="已进出";
                    							}else if(visitorsstatus=="30"){
                    								visitorsstatus="已离开";
                    							}	
                        						var $dl=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].visitorphoto
                        								+"' style='width:110px;height:140px'></dt><div class='infor_right'><dd><label class='cardNumber'>身份证号:</label><span class='outsourcing_number'>"+idcardno+"</span></dd>" +
                        									"<dd><label class='peopleName'>人员姓名:</label><span class='outsourcing_name'>"+visitorsname+"</span></dd>" +
                        									"<dd><label>人员性别:</label><span class='personType'>"+visitorssextext+"</span></dd><dd><label class='readTime'>进出状态:</label><span class='outsourcing_time'>"+visitorsstatus+"</span></dd></div></dl>")
                        						$div2.append($dl);
                        						$div1.append($div2);
                        						$(".main-content").append($div1);
                        					}

                        				}
                        				
                        			},
                        			error:function(data){
                        				timer=setInterval(function(){
                        					readIDCard();
                        					readM1Card();
                        				}, 1000);
                        			}
                        		})
                            //document.getElementById("card_photo").src = "data:image/png;base64," + msgJson.base64Data; //身份证号码      
                            //posBeep();
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
                            //清除定时器
                            clearInterval(timer);
                        		$.ajax({
                        			//url:url+"/WX_VisitorsInfo/queryVisitorsInfoByAudited",
                        			url:url+"/WX_VisitorsInfoAdd/queryVisitorsInfoByAudited",
                        			type:"POST",
                        			data:{"str":arr,"strr":"1"},
                        			dataType:"json",
                        			success:function(data){
                        				console.log(data)
                        				timer=setInterval(function(){
                        					readIDCard();
                        					readM1Card();
                        				}, 1000);
                        				
                        				$(".main-content").empty();
                        				
                        				if(!data.flag){
                        					layer.msg(data.reason,{time:2000});
                        					return;
                        				}
                        				console.log(data.result.arrlist);
                        				var res=data.result;
                        				for(var i=0;i<res.length;i++){
                        					//人员登记
                        					var approvertypename=(res[i].approvertypename==undefined)?"":res[i].approvertypename;
                        					if(res[i].visitorstype=="P"){
                        						if(res[i].applystatus=="30"){
                        							var applystatusname="批准";
                        						}else{
                        							var applystatusname="驳回";
                        						}
                        							//警察信息
                            						var departmentsname=(res[i].arrlist[0].departmentsname==undefined)?"":res[i].arrlist[0].departmentsname;
                            						var filldate=(res[i].arrlist[0].filldate==undefined)?"":res[i].arrlist[0].filldate;
                            						var filltime=(res[i].arrlist[0].filltime==undefined)?"":res[i].arrlist[0].filltime;
                            						var receiverpeopleid=(res[i].arrlist[0].receiverpeopleid==undefined)?"":res[i].arrlist[0].receiverpeopleid;
                            						var receiversname=(res[i].arrlist[0].receiversname==undefined)?"":res[i].arrlist[0].receiversname;
                            						var applystatusname1=(res[i].arrlist[0].applystatusname==undefined)?"":res[i].arrlist[0].applystatusname;
                            						var $div1=$("<div class='approval_pending'><div class='approval_tit'><h4 class='approval_status'>人员|"+applystatusname+"|"+applystatusname1
                            								+"</h4><p class='apply_time'>申请时间:<span>"+filldate+"|"+approvertypename+"</span></p></div></div>")
                            						var $div2=$("<div class='scroll_approvalPending'><dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].policephoto
                            								+"' style='width:110px;height:139px'></dt><div class='infor_right'><dd><label class='alarm'>警号:</label><span class='receiverpeopleid'>"+receiverpeopleid
                            								+"</span></dd><dd><label class='pliceName'>姓名:</label><span class='receiversname'>"+receiversname+"</span></dd><dd><label class='prison'>部门:</label><span class='jianQu'>"+departmentsname
                            								+"</span></dd><dd><label class='infoTime'>时间:</label><span class='shijian'>"+filltime+"</span></dd></div></dl></div>");
                        						
                        					for(var j=0;j<res[i].arrlist.length;j++){
                        							var idcardno=(res[i].arrlist[j].idcardno==undefined)?"":res[i].arrlist[j].idcardno;
                        							var visitorsname=(res[i].arrlist[j].visitorsname==undefined)?"":res[i].arrlist[j].visitorsname;
                        							var visitorssextext=(res[i].arrlist[j].visitorssextext==undefined)?"":res[i].arrlist[j].visitorssextext;
                        							var visitorsstatus=(res[i].arrlist[j].visitorsstatus==undefined)?"":res[i].arrlist[j].visitorsstatus;
                        							if(visitorsstatus=="10"){
                        								visitorsstatus="已登记";
                        							}else if(visitorsstatus=="20"){
                        								visitorsstatus="已进出";
                        							}else if(visitorsstatus=="30"){
                        								visitorsstatus="已离开";
                        							}
                        							var $dl=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[j].visitorphoto
                        									+"' style='width:110px;height:140px'></dt><div class='infor_right'><dd><label class='cardNumber'>身份证号:</label><span class='outsourcing_number'>"+idcardno
                        									+"</span></dd><dd><label class='peopleName'>人员姓名:</label><span class='outsourcing_name'>"+visitorsname+"</span></dd>" +
                        											"<dd><label>人员性别:</label><span class='personType'>"+visitorssextext
                        											+"</span></dd><dd><label class='readTime'>进出状态:</label><span class='outsourcing_time'>"+visitorsstatus+"</span></dd></div></dl>")
                        							$div2.append($dl);
                        						}
                        						$div1.append($div2);
                        						$(".main-content").append($div1);
                        					}else if(res[i].visitorstype=="C"){//车辆登记
                        						if(res[i].applystatus=="30"){
                        							var applystatusname="批准";
                        						}else{
                        							var applystatusname="驳回";
                        						}
                        						var carinfo=(res[i].arrlist[0].carinfo==undefined)?"":res[i].arrlist[0].carinfo;
                        						var dringmodels=(res[i].arrlist[0].dringmodels==undefined)?"":res[i].arrlist[0].dringmodels;
                        						var note=(res[i].arrlist[0].note==undefined)?"":res[i].arrlist[0].note;
                        						
                        						//警察信息
                        						var departmentsname=(res[i].arrlist[0].departmentsname==undefined)?"":res[i].arrlist[0].departmentsname;
                        						var filldate=(res[i].arrlist[0].filldate==undefined)?"":res[i].arrlist[0].filldate;
                        						var filltime=(res[i].arrlist[0].filltime==undefined)?"":res[i].arrlist[0].filltime;
                        						var receiverpeopleid=(res[i].arrlist[0].receiverpeopleid==undefined)?"":res[i].arrlist[0].receiverpeopleid;
                        						var receiversname=(res[i].arrlist[0].receiversname==undefined)?"":res[i].arrlist[0].receiversname;
                        						var applystatusname1=(res[i].arrlist[0].applystatusname==undefined)?"":res[i].arrlist[0].applystatusname;
                        						var $div1=$("<div class='approval_pending'><div class='approval_tit'><h4 class='approval_status'>车辆|"+applystatusname+"|"+applystatusname1
                        								+"</h4><p class='apply_time'>申请时间:<span>"+filldate+"|"+approvertypename+"</span></p></div></div>")
                        						var $div2=$("<div class='scroll_approvalPending'><ul class='vehicleInfo'><li><label>车牌号码:</label><span class='vehicle_number'>"
                        							+carinfo+"</span></li><li><label>车牌类型:</label><span class='vehicle_type'>"+dringmodels
                        							+"</span></li><li><label>车身颜色:</label><span class='vehicle_color'>"+note
                        							+"</span></li></ul><dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].policephoto
                        							+"' style='width:110px;height:139px'></dt><div class='infor_right'><dd><label class='alarm'>警号:</label><span class='receiverpeopleid'>"
                        							+receiverpeopleid+"</span></dd><dd><label class='pliceName'>姓名:</label><span class='receiversname'>"+receiversname
                        							+"</span></dd><dd><label class='prison'>部门:</label><span class='jianQu'>"+departmentsname
                        							+"</span></dd><dd><label class='infoTime'>时间:</label><span class='shijian'>"+filltime
                        							+"</span></dd></div></dl></div>");
                        						var idcardno=(res[i].arrlist[0].idcardno==undefined)?"":res[i].arrlist[0].idcardno;
                        						var visitorsname=(res[i].arrlist[0].visitorsname==undefined)?"":res[i].arrlist[0].visitorsname;
                        						var visitorssextext=(res[i].arrlist[0].visitorssextext==undefined)?"":res[i].arrlist[0].visitorssextext;
                        						var visitorsstatus=(res[i].arrlist[0].visitorsstatus==undefined)?"":res[i].arrlist[0].visitorsstatus;
                    							if(visitorsstatus=="10"){
                    								visitorsstatus="已登记";
                    							}else if(visitorsstatus=="20"){
                    								visitorsstatus="已进出";
                    							}else if(visitorsstatus=="30"){
                    								visitorsstatus="已离开";
                    							}	
                        						var $dl=$("<dl><dt class='infor_left'><img src='data:image/png;base64,"+res[i].arrlist[0].visitorphoto
                        								+"' style='width:110px;height:140px'></dt><div class='infor_right'><dd><label class='cardNumber'>身份证号:</label><span class='outsourcing_number'>"+idcardno+"</span></dd>" +
                        									"<dd><label class='peopleName'>人员姓名:</label><span class='outsourcing_name'>"+visitorsname+"</span></dd>" +
                        									"<dd><label>人员性别:</label><span class='personType'>"+visitorssextext
                        									+"</span></dd><dd><label class='readTime'>进出状态:</label><span class='outsourcing_time'>"+visitorsstatus+"</span></dd></div></dl>")
                        						$div2.append($dl);
                        						$div1.append($div2);
                        						$(".main-content").append($div1);
                        					}
                        				}
                        			},
                        			error:function(data){
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
        if (socket.readyState == 1) {
            socket.send("EST_ReadM1Card#");
        } else {
            //console.log("未找到控件，请检查控件是否安装.", { time: 2000 });
        }
}

//蜂鸣器控制，可以自己选择是否蜂鸣
function posBeep() {
    if (socket.readyState == 1) {
        socket.send("EST_PosBeep#");
    } else {
        layer.msg("未找到控件，请检查控件是否安装.", { time: 2000 });
    }
}

//读取身份证信息
function readIDCard() {
        if (socket.readyState == 1) {
            socket.send("EST_Reader_ReadIDCard#");
        } else {
            //console.log("未找到控件，请检查控件是否安装.", { time: 2000 });
        }
}



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
}