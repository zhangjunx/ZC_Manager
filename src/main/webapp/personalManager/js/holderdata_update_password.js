showHide();
//跟权限有关
function showHide(){
		if(window.top.arr.length==0){
			return;
		}
		$("#updatePWDBtn").hide();
		var list=[];
		var arrList=window.top.arr;
		arrList.forEach(item=>{
			if(item.ModelCode=="1001"){
				list.push(item);
			}
		})
		for(var item of list){
			if(item.Code=="update"){
				$("#updatePWDBtn").show();
			}
		}
	}
//密码的显示与隐藏
$("#eyesHide").click(function(){
	if($("#loginpassword").attr("type")=="password"){
        $("#loginpassword").attr('type','text');
        $("#eyesShow").show();
        $("#eyesHide").hide();
    }
})

$("#eyesShow").click(function(){
    if($("#loginpassword").attr("type")=="text"){
        $("#loginpassword").attr('type','password');
        $("#eyesShow").hide();
        $("#eyesHide").show();
    }
});

$("#eyesHide1").click(function(){
	if($("#loginpassword1").attr("type")=="password"){
        $("#loginpassword1").attr('type','text');
        $("#eyesShow1").show();
        $("#eyesHide1").hide();
    }
})

$("#eyesShow1").click(function(){
    if($("#loginpassword1").attr("type")=="text"){
        $("#loginpassword1").attr('type','password');
        $("#eyesShow1").hide();
        $("#eyesHide1").show();
    }
});

$("#eyesHide2").click(function(){
	if($("#loginpassword2").attr("type")=="password"){
        $("#loginpassword2").attr('type','text');
        $("#eyesShow2").show();
        $("#eyesHide2").hide();
    }
})

$("#eyesShow2").click(function(){
    if($("#loginpassword2").attr("type")=="text"){
        $("#loginpassword2").attr('type','password');
        $("#eyesShow2").hide();
        $("#eyesHide2").show();
    }
});

$("#eyesHide3").click(function(){
	if($("#openDoorPassword").attr("type")=="password"){
        $("#openDoorPassword").attr('type','text');
        $("#eyesShow3").show();
        $("#eyesHide3").hide();
    }
})

$("#eyesShow3").click(function(){
    if($("#openDoorPassword").attr("type")=="text"){
        $("#openDoorPassword").attr('type','password');
        $("#eyesShow3").hide();
        $("#eyesHide3").show();
    }
});

$("#eyesHide4").click(function(){
	if($("#openDoorPassword1").attr("type")=="password"){
        $("#openDoorPassword1").attr('type','text');
        $("#eyesShow4").show();
        $("#eyesHide4").hide();
    }
})

$("#eyesShow4").click(function(){
    if($("#openDoorPassword1").attr("type")=="text"){
        $("#openDoorPassword1").attr('type','password');
        $("#eyesShow4").hide();
        $("#eyesHide4").show();
    }
});

$("#eyesHide5").click(function(){
	if($("#openDoorPassword2").attr("type")=="password"){
        $("#openDoorPassword2").attr('type','text');
        $("#eyesShow5").show();
        $("#eyesHide5").hide();
    }
})

$("#eyesShow5").click(function(){
    if($("#openDoorPassword2").attr("type")=="text"){
        $("#openDoorPassword2").attr('type','password');
        $("#eyesShow5").hide();
        $("#eyesHide5").show();
    }
});


//验证密码
var reg=/^[\w]{6,12}$/;
$("#loginpassword").blur(function(){
	var password=$("#loginpassword").val();
	if(!reg.test(password)&&password!=""){
		layer.msg("请输入6~12位字母或数字!",{time:2000});
		$(this).focus();
		return;
	}
})
$("#loginpassword1").blur(function(){
	var password1=$("#loginpassword1").val();
	if(!reg.test(password1)&&password1!=""){
		layer.msg("请输入6~12位字母或数字!",{time:2000});
		$(this).focus();
		return;
	}
})
$("#loginpassword2").blur(function(){
	var password2=$("#loginpassword2").val();
	if(!reg.test(password2)&&password2!=""){
		layer.msg("请输入6~12位字母或数字!",{time:2000});
		$(this).focus();
		return;
	}
})

$('input#openDoorPassword').keyup(function(){
   var c=$(this);
   if(/[^\d]/.test(c.val())){//替换非数字字符
    var temp_amount=c.val().replace(/[^\d]/g,'');
    $(this).val(temp_amount);
   }
}) 
$('input#openDoorPassword1').keyup(function(){
   var c=$(this);
   if(/[^\d]/.test(c.val())){//替换非数字字符
    var temp_amount=c.val().replace(/[^\d]/g,'');
    $(this).val(temp_amount);
   }
}) 
$('input#openDoorPassword2').keyup(function(){
   var c=$(this);
   if(/[^\d]/.test(c.val())){//替换非数字字符
    var temp_amount=c.val().replace(/[^\d]/g,'');
    $(this).val(temp_amount);
   }
}) 
//点击复选框
$(".updateLoginPassword span.checkbox").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})
//修改密码点取消按钮时清空数据
$("#updatePWDCancelBtn").click(function(){
	$("#loginpassword").val("");
	$("#loginpassword1").val("");
	$("#loginpassword2").val("");
	$("#openDoorPassword").val("");
	$("#openDoorPassword1").val("");
	$("#openDoorPassword2").val("");
});

//修改密码
$("#updatePWDBtn").click(function(){
	var holderno=window.top.holderno;
	var str="";
	var arrlist=[];
		var loginpassword=$("#loginpassword").val();
		var loginpassword1=$("#loginpassword1").val();
		var loginpassword2=$("#loginpassword2").val();
		if(loginpassword==""){
			layer.msg("请输入旧密码!",{time:2000});
			return;
		}
		if(loginpassword1==""){
			layer.msg("请输入新密码!",{time:2000});
			return;
		}
		if(loginpassword2==""){
			layer.msg("请再次输入新密码!",{time:2000});
			return;
		}
		if(loginpassword1!=loginpassword2){
			layer.msg("请保持新密码一致!",{time:2000});
			return;
		}
		var obj1={"newpassword":loginpassword1,"oldpassword":loginpassword,"str1":"dl"};
		arrlist.push(obj1);	 
	var obj={"str":"dl","holderno":holderno,"arrlist":arrlist};
	console.log(obj.arrlist.length)
	$.ajax({
		url:url+"/HolderData/updateMyPWD",
		type:"POST",
		data:JSON.stringify(obj),
		dataType:"json",
		contentType:"application/json",
		success:function(data){
			console.log(data)
			layer.msg(data.reason,{time:2000});
			/*$("#loginpassword").val();
			 $("#loginpassword1").val();
			 $("#loginpassword2").val();
			 $("#openDoorPassword").val();
			 $("#openDoorPassword1").val();
			 $("#openDoorPassword2").val();*/	 
		}
	})
	
});
